/**
 * Spanish review copy + labels for /es/ pages.
 * Quotes are translations of Google reviews; UI notes that they were translated.
 */

import { asStr } from './sanity-strings.js'

export const ES_REVIEW_POSTED_ON = 'Reseña en Google'
export const ES_REVIEW_TRANSLATED_NOTE = 'Traducido al Español'

/** Homepage / shared CMS testimonials — keyed by author. */
const PLAIN_QUOTE_ES = {
  'Harold Swanson':
    '¡Fantástico! Excelente trabajo en la instalación y en la calidad. Vale totalmente la inversión. Kevin y su equipo fueron maravillosos. He adjuntado algunas fotos para que todos las vean. Los drenajes emergentes valieron la pena. El punto negativo: ¡me tomó 3 meses que lloviera para apreciar su trabajo! Los recomiendo muchísimo.',
  'Joshua Hurst':
    'La empresa hace un trabajo fantástico en marketing, comunicación y calidad de los productos. Fue un placer trabajar con el personal con el que hablé antes, durante y después de la instalación en mi casa. También están dispuestos a ayudarlo con cualquier problema que surja. En general, los recomiendo altamente si su hogar necesita canaletas.',
  'Alex Botardo':
    '¡SunLife Gutters superó mis expectativas! De principio a fin, su equipo fue profesional, receptivo y cortés. La instalación se completó rápido sin sacrificar la calidad, y la mano de obra se nota de verdad. El precio fue justo y transparente, sin sorpresas. Recomiendo ampliamente SunLife Gutters a cualquiera que busque un servicio de primera y una excelente relación calidad-precio.',
  'Bradley Tayloe':
    'Proceso muy sencillo: solicité un estimado, lo recibí, lo acepté y me programaron la instalación unas semanas después (un retraso de un par de semanas por el huracán Milton). Instalaron y se ve fantástico. Los recomiendo altamente.',
}

/**
 * @param {string} en
 * @returns {string}
 */
export function localizeTimeAgoEs(en) {
  const s = asStr(en).trim()
  if (!s) return ''
  const lower = s.toLowerCase()
  if (lower === 'just now' || lower === 'today') return 'hoy'
  if (lower === 'yesterday') return 'ayer'

  let m = s.match(/^(\d+)\s+years?\s+ago$/i)
  if (m) return Number(m[1]) === 1 ? 'hace 1 año' : `hace ${m[1]} años`
  m = s.match(/^(\d+)\s+months?\s+ago$/i)
  if (m) return Number(m[1]) === 1 ? 'hace 1 mes' : `hace ${m[1]} meses`
  m = s.match(/^(\d+)\s+weeks?\s+ago$/i)
  if (m) return Number(m[1]) === 1 ? 'hace 1 semana' : `hace ${m[1]} semanas`
  m = s.match(/^(\d+)\s+days?\s+ago$/i)
  if (m) return Number(m[1]) === 1 ? 'hace 1 día' : `hace ${m[1]} días`
  m = s.match(/^a\s+year\s+ago$/i)
  if (m) return 'hace 1 año'
  m = s.match(/^a\s+month\s+ago$/i)
  if (m) return 'hace 1 mes'
  m = s.match(/^a\s+week\s+ago$/i)
  if (m) return 'hace 1 semana'
  m = s.match(/^a\s+day\s+ago$/i)
  if (m) return 'hace 1 día'
  return s
}

/**
 * Localize a plain-text CMS/homepage testimonial.
 * @param {Record<string, unknown>} t
 */
export function localizePlainTestimonialEs(t) {
  const author = asStr(t?.author)
  const quoteEs = PLAIN_QUOTE_ES[author]
  const translated = Boolean(quoteEs)
  return {
    author,
    avatarSrc: asStr(t?.avatarSrc),
    timeAgo: localizeTimeAgoEs(asStr(t?.timeAgo)),
    quote: quoteEs || asStr(t?.quote),
    quoteHtml: '',
    translated,
  }
}

/**
 * Localize an LP-style review that already has Spanish quoteHtml.
 * @param {Record<string, unknown>} t
 */
export function localizeLpTestimonialEs(t) {
  return {
    author: asStr(t?.author),
    avatarSrc: asStr(t?.avatarSrc),
    timeAgo: localizeTimeAgoEs(asStr(t?.timeAgo)),
    quote: '',
    quoteHtml: asStr(t?.quoteHtml),
    translated: true,
  }
}
