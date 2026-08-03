/**
 * Helpers for Sanity payloads (strings, optional legacy `{ value }` on array items, templates).
 * Homepage required fields are validated in assert-sanity-homepage.js before render.
 */

export function asStr(x) {
  if (x == null) return ''
  if (typeof x === 'string') return x
  if (typeof x === 'object' && x !== null && 'value' in x) {
    return String(/** @type {{ value?: unknown }} */ (x).value ?? '')
  }
  return String(x)
}

export function asStrArray(arr) {
  if (!Array.isArray(arr)) return []
  return arr.map((x) => asStr(x))
}

/**
 * Replace `{{key}}` placeholders (non-HTML — escape output if embedding in HTML).
 * @param {string | null | undefined} template
 * @param {Record<string, string | number | undefined | null>} vars
 */
export function applyTemplate(template, vars) {
  if (template == null) return ''
  let out = String(template)
  for (const [k, v] of Object.entries(vars)) {
    const re = new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, 'g')
    out = out.replace(re, v != null && v !== '' ? String(v) : '')
  }
  return out
}

export function mediaUrl(relPath) {
  if (relPath == null || relPath === '') return ''
  let p = String(relPath).trim()
  // Legacy paths from the Mile High template pointed at Media (MHG)/…; assets now live under Media (SGT)/…
  if (p.startsWith('Media (MHG)/')) {
    p = `Media (SGT)/${p.slice('Media (MHG)/'.length)}`
  }
  // Encode spaces and parentheses so CSS url() + img src stay valid across browsers.
  return (
    '/' +
    p
      .split('/')
      .map((seg) => encodeURIComponent(seg).replace(/\(/g, '%28').replace(/\)/g, '%29'))
      .join('/')
  )
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function statLookup(statsValues, key) {
  if (!statsValues || key == null) return ''
  return asStr(statsValues[key])
}
