/**
 * CANONICAL lead API — Vercel `/api/lead`. After edits, copy to `astro-site/api/lead.js` if your deploy uses that path.
 *
 * Verifies reCAPTCHA v3, then forwards JSON to Zapier.
 *
 * Env:
 * - ZAPIER_WEBHOOK_URL (required, https)
 * - RECAPTCHA_SECRET_KEY (required) — from Google reCAPTCHA admin (v3 secret)
 * - RECAPTCHA_MIN_SCORE (optional, default 0.5) — v3 score threshold
 *
 * Attribution field mapping (documented — do not rename silently in Zapier without updating this):
 *   Website / API source → Zapier / GoHighLevel destination
 *   gclid        → gclid1          (GHL custom field)
 *   gbraid       → gbraid
 *   wbraid       → wbraid
 *   utm_source   → utm_source
 *   utm_medium   → lead_medium
 *   utm_campaign → lead_campaign
 *   utm_term     → lead_term
 *   utm_content  → utm_content
 *   utm_id       → utm_id
 *   first_page   → first_page
 *   landing_page → landing_page
 *   signup_page  → signup_page
 *   captured_at  → captured_at
 *   referrer     → referrer
 *
 * The webhook payload includes BOTH the source names and the destination aliases
 * so existing Zaps keep working while GHL can map the destination keys.
 * Legacy first_landing_* / first_referrer keys are still forwarded for older Zaps.
 */

/** Visitor-submitted phone from forms → NNN-NNN-NNNN when US 10 digits. */
function formatUsPhoneDashes(value) {
  const d = String(value || '').replace(/\D/g, '');
  let n = d;
  if (d.length === 11 && d.startsWith('1')) n = d.slice(1);
  if (n.length === 10) return `${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6)}`;
  return String(value || '').trim();
}

function trimField(value, max) {
  return String(value || '').trim().slice(0, max);
}

const RECAPTCHA_ACTION = 'lead_form';

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

async function verifyRecaptchaV3(token, secret, remoteIp) {
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
  if (data.action && data.action !== RECAPTCHA_ACTION) {
    return { ok: false, reason: 'action_mismatch', raw: data };
  }
  const score = typeof data.score === 'number' ? data.score : 0;
  const min = Number.parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.5');
  const threshold = Number.isFinite(min) ? min : 0.5;
  if (score < threshold) return { ok: false, reason: 'low_score', score, raw: data };
  return { ok: true, score, raw: data };
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
      verify = await verifyRecaptchaV3(recaptchaToken, recaptchaSecret, remoteIp);
    } catch {
      return jsonResponse({ ok: false, error: 'recaptcha_unreachable' }, 502);
    }
    if (!verify.ok) {
      const err =
        verify.reason === 'low_score'
          ? 'recaptcha_low_score'
          : verify.reason === 'action_mismatch'
            ? 'recaptcha_action_mismatch'
            : 'recaptcha_failed';
      return jsonResponse({ ok: false, error: err }, 400);
    }

    const name = trimField(body.name, 500);
    const email = trimField(body.email, 320);
    const phone = formatUsPhoneDashes(body.phone || '').slice(0, 80);
    const location = trimField(body.location, 200);
    const message = trimField(body.message, 5000);
    const formSource = trimField(body.formSource || 'unknown', 80);
    const pageUrl = trimField(body.pageUrl, 2000);

    // Attribution (source names from website)
    const gclid = trimField(body.gclid, 500);
    const gbraid = trimField(body.gbraid, 500);
    const wbraid = trimField(body.wbraid, 500);
    const utm_source = trimField(body.utm_source, 200);
    const utm_medium = trimField(body.utm_medium, 200);
    const utm_campaign = trimField(body.utm_campaign, 200);
    const utm_id = trimField(body.utm_id, 200);
    const utm_content = trimField(body.utm_content, 200);
    const utm_term = trimField(body.utm_term, 200);
    const first_page = trimField(body.first_page || body.landing_page || body.first_landing_path, 2000);
    const landing_page = trimField(body.landing_page || body.signup_page || body.first_landing_url || first_page, 2000);
    const signup_page = trimField(body.signup_page || landing_page, 2000);
    const captured_at = trimField(body.captured_at, 80);
    const referrer = trimField(body.referrer || body.first_referrer, 2000);
    const first_landing_url = trimField(body.first_landing_url || landing_page, 2000);
    const first_landing_path = trimField(body.first_landing_path || first_page, 2000);
    const first_referrer = trimField(body.first_referrer || referrer, 2000);

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

    /**
     * Zapier webhook body.
     * Source keys + explicit GHL destination aliases (see file header mapping).
     */
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

      // Source attribution keys (exact website field names)
      gclid,
      gbraid,
      wbraid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_id,
      utm_content,
      utm_term,
      first_page,
      landing_page,
      signup_page,
      captured_at,
      referrer,

      // GoHighLevel destination aliases (documented mapping)
      gclid1: gclid,
      lead_medium: utm_medium,
      lead_campaign: utm_campaign,
      lead_term: utm_term,

      // Legacy keys for existing Zapier paths
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
