/**
 * CANONICAL lead API — Vercel `/api/lead`. After edits, copy to `astro-site/api/lead.js` if your deploy uses that path.
 *
 * Verifies reCAPTCHA v2 (checkbox), then forwards JSON to Zapier.
 *
 * Env:
 * - ZAPIER_WEBHOOK_URL (required, https)
 * - RECAPTCHA_SECRET_KEY (required) — v2 secret from Google reCAPTCHA admin
 *
 * Site keys must be reCAPTCHA v2 "I'm not a robot" Checkbox keys (not v3).
 */

/** Visitor-submitted phone from forms → NNN-NNN-NNNN when US 10 digits. */
function formatUsPhoneDashes(value) {
  const d = String(value || '').replace(/\D/g, '');
  let n = d;
  if (d.length === 11 && d.startsWith('1')) n = d.slice(1);
  if (n.length === 10) return `${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6)}`;
  return String(value || '').trim();
}

function jsonResponse(data, status, extraHeaders = {}) {
  return Response.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      ...extraHeaders,
    },
  });
}

async function verifyRecaptchaV2(token, secret, remoteIp) {
  const params = new URLSearchParams();
  params.set('secret', secret);
  params.set('response', token);
  if (remoteIp) params.set('remoteip', remoteIp);
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) return { ok: false, reason: 'verify_http' };
  const data = await res.json();
  if (!data.success) return { ok: false, reason: 'verify_failed', raw: data };
  return { ok: true, raw: data };
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405, {
        Allow: 'POST, OPTIONS',
      });
    }

    const webhook = (process.env.ZAPIER_WEBHOOK_URL || '').trim();
    if (!webhook || !/^https:\/\//i.test(webhook)) {
      return jsonResponse({ ok: false, error: 'server_misconfigured' }, 503);
    }

    const recaptchaSecret = (process.env.RECAPTCHA_SECRET_KEY || '').trim();
    if (!recaptchaSecret) {
      return jsonResponse({ ok: false, error: 'recaptcha_misconfigured' }, 503);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
    }

    if (!body || typeof body !== 'object') {
      return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
    }

    const hp = body.website != null ? String(body.website).trim() : '';
    if (hp.length > 0) {
      return jsonResponse({ ok: true }, 200);
    }

    const recaptchaToken = String(body.recaptchaToken || '').trim();
    if (!recaptchaToken) {
      return jsonResponse({ ok: false, error: 'recaptcha_missing' }, 400);
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const remoteIp = forwardedFor ? forwardedFor.split(',')[0].trim() : undefined;
    let verify;
    try {
      verify = await verifyRecaptchaV2(recaptchaToken, recaptchaSecret, remoteIp);
    } catch {
      return jsonResponse({ ok: false, error: 'recaptcha_unreachable' }, 502);
    }
    if (!verify.ok) {
      return jsonResponse({ ok: false, error: 'recaptcha_failed' }, 400);
    }

    const name = String(body.name || '').trim().slice(0, 500);
    const email = String(body.email || '').trim().slice(0, 320);
    const phone = formatUsPhoneDashes(body.phone || '').slice(0, 80);
    const location = String(body.location || '').trim().slice(0, 200);
    const message = String(body.message || '').trim().slice(0, 5000);
    const formSource = String(body.formSource || 'unknown').trim().slice(0, 80);
    const pageUrl = String(body.pageUrl || '').trim().slice(0, 2000);
    const utm_source = String(body.utm_source || '').trim().slice(0, 200);
    const utm_medium = String(body.utm_medium || '').trim().slice(0, 200);
    const utm_campaign = String(body.utm_campaign || '').trim().slice(0, 200);
    const utm_term = String(body.utm_term || '').trim().slice(0, 200);
    const first_landing_url = String(body.first_landing_url || '').trim().slice(0, 2000);
    const first_landing_path = String(body.first_landing_path || '').trim().slice(0, 2000);
    const first_referrer = String(body.first_referrer || '').trim().slice(0, 2000);

    if (!name || !email || !phone) {
      return jsonResponse({ ok: false, error: 'missing_fields' }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: 'invalid_email' }, 400);
    }

    const smsConsent = body.smsMarketingConsent;
    if (smsConsent !== true && smsConsent !== 'yes') {
      return jsonResponse({ ok: false, error: 'sms_consent_required' }, 400);
    }

    const payload = {
      formSource,
      name,
      email,
      phone,
      location,
      message,
      smsMarketingConsent: true,
      submittedAt: new Date().toISOString(),
      pageUrl,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      first_landing_url,
      first_landing_path,
      first_referrer,
    };

    let zRes;
    try {
      zRes = await fetch(webhook, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'SGT-Lead-Form/1.0 (Vercel)',
        },
        body: JSON.stringify(payload),
      });
    } catch {
      return jsonResponse({ ok: false, error: 'upstream_unreachable' }, 502);
    }

    if (!zRes.ok) {
      return jsonResponse(
        {
          ok: false,
          error: 'upstream_error',
          zapierStatus: zRes.status,
        },
        502
      );
    }

    return jsonResponse({ ok: true }, 200);
  },
};
