import { asStr } from './sanity-strings.js'

/**
 * Text after " in " in the CMS hero headline (e.g. "… in Tampa Bay"), trimmed of trailing punctuation.
 * @param {unknown} headline
 */
export function extractCityFromHeadline(headline) {
  const h = asStr(headline).trim()
  const lower = h.toLowerCase()
  const marker = ' in '
  const idx = lower.indexOf(marker)
  if (idx === -1) return ''
  let rest = h.slice(idx + marker.length).trim()
  rest = rest.replace(/[.,;:!?)]+$/u, '').trim()
  return rest
}

/**
 * @param {unknown} headline
 * @param {unknown} addressShort
 */
export function cityFromHeroOrFallback(headline, addressShort) {
  const fromHeadline = extractCityFromHeadline(headline)
  if (fromHeadline) return fromHeadline
  const addr = asStr(addressShort).trim()
  if (addr) {
    const first = addr.split(',')[0]?.trim()
    if (first) return first
  }
  return 'Tampa Bay'
}
