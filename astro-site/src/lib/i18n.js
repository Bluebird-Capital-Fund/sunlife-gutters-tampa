/**
 * English ↔ Spanish locale helpers for /es/ subdirectory.
 * Missing pairs fall back to /es/ (ES) or / (EN).
 */

export const LOCALE_EN = 'en-US'
export const LOCALE_ES = 'es-US'
export const SITE_ORIGIN = 'https://sunlifegutters.com'

/** @type {Record<string, string>} English path → Spanish path (trailing slashes). */
export const EN_TO_ES_PATH = {
  '/': '/es/',
  '/thank-you/': '/es/thank-you/',
  '/about-us/': '/es/sobre-nosotros/',
  '/contact-us/': '/es/contacto/',
  '/gallery/': '/es/galeria/',
  '/reviews/': '/es/testimonios/',
  '/faqs/': '/es/preguntas-frecuentes/',
  '/service-area/': '/es/areas-de-servicio/',
  '/seamless-gutters-tampa-fl/': '/es/canaletas-seamless-tampa-fl/',
  '/gutter-installation-tampa-fl/': '/es/instalacion-canaletas-tampa-fl/',
  '/super-gutters-tampa-fl/': '/es/super-gutters-tampa-fl/',
  '/screen-rooms-lanais-tampa-fl/': '/es/screen-rooms-lanais-tampa-fl/',
  '/gutter-repair-tampa-fl/': '/es/reparacion-canaletas-tampa-fl/',
  '/emergency-gutter-repair-tampa-fl/': '/es/reparacion-urgente-canaletas-tampa-fl/',
  '/gutter-inspection-tampa-fl/': '/es/inspeccion-canaletas-tampa-fl/',
  '/gutter-replacement-tampa-fl/': '/es/reemplazo-canaletas-tampa-fl/',
  '/gutter-guards-tampa-fl/': '/es/protectores-canaletas-tampa-fl/',
  '/gutter-cleaning-tampa-fl/': '/es/limpieza-canaletas-tampa-fl/',
  '/gutter-maintenance-tampa-fl/': '/es/mantenimiento-canaletas-tampa-fl/',
  '/commercial-gutters-tampa-fl/': '/es/canaletas-comerciales-tampa-fl/',
  '/residential-gutters-tampa-fl/': '/es/canaletas-residenciales-tampa-fl/',
  '/half-round-gutters-tampa-fl/': '/es/canaletas-semicirculares-tampa-fl/',
  '/copper-gutters-tampa-fl/': '/es/canaletas-cobre-tampa-fl/',
  '/custom-gutters-tampa-fl/': '/es/canaletas-personalizadas-tampa-fl/',
  '/gutter-colors-options-tampa-fl/': '/es/colores-canaletas-tampa-fl/',
  '/downspouts-tampa-fl/': '/es/bajantes-tampa-fl/',
  '/underground-drainage-tampa-fl/': '/es/drenaje-subterraneo-tampa-fl/',
  '/french-drains-tampa-fl/': '/es/drenaje-frances-tampa-fl/',
  '/siding-tampa-fl/': '/es/siding-tampa-fl/',
  '/soffit-fascia-repair-tampa-fl/': '/es/reparacion-soffit-fascia-tampa-fl/',
}

/** Paths that are published and should emit hreflang + appear in sitemap-es. */
export const LIVE_ES_PATHS = new Set([
  '/es/',
  '/es/thank-you/',
  '/es/sobre-nosotros/',
  '/es/contacto/',
  '/es/galeria/',
  '/es/testimonios/',
  '/es/preguntas-frecuentes/',
  '/es/areas-de-servicio/',
])

/** @type {Record<string, string>} */
export const ES_TO_EN_PATH = Object.fromEntries(
  Object.entries(EN_TO_ES_PATH).map(([en, es]) => [es, en])
)

export function normalizePath(pathname) {
  if (!pathname || typeof pathname !== 'string') return '/'
  let p = pathname.trim()
  if (!p.startsWith('/')) p = `/${p}`
  if (!p.endsWith('/')) p = `${p}/`
  return p
}

export function isSpanishPath(pathname) {
  const p = normalizePath(pathname)
  return p === '/es/' || p.startsWith('/es/')
}

export function getLocaleFromPath(pathname) {
  return isSpanishPath(pathname) ? LOCALE_ES : LOCALE_EN
}

/**
 * Resolve alternate language URL for the switcher.
 * Falls back to /es/ or / when the pair is not mapped or not live.
 */
export function getAlternatePath(pathname, targetLocale) {
  const current = normalizePath(pathname)
  if (targetLocale === LOCALE_ES || targetLocale === 'es') {
    const mapped = EN_TO_ES_PATH[current]
    if (mapped && LIVE_ES_PATHS.has(mapped)) return mapped
    return '/es/'
  }
  const mapped = ES_TO_EN_PATH[current]
  return mapped || '/'
}

/** Prefer live pair for hreflang; return null if Spanish twin is not live. */
export function getLiveHreflangPair(pathname) {
  const current = normalizePath(pathname)
  if (isSpanishPath(current)) {
    if (!LIVE_ES_PATHS.has(current)) return null
    const en = ES_TO_EN_PATH[current]
    if (!en) return null
    return { en, es: current }
  }
  const es = EN_TO_ES_PATH[current]
  if (!es || !LIVE_ES_PATHS.has(es)) return null
  return { en: current, es }
}

export function absoluteUrl(path, origin = SITE_ORIGIN) {
  const base = String(origin || SITE_ORIGIN).replace(/\/+$/, '')
  return `${base}${normalizePath(path)}`
}

/**
 * Force Google Maps embed UI language (hl) for Spanish pages.
 * Keeps US region (gl=us) so place names/address stay local.
 */
export function localizeMapEmbedUrl(url, locale = LOCALE_EN) {
  const raw = String(url || '').trim()
  if (!raw) return ''
  const isEs = locale === LOCALE_ES || locale === 'es' || String(locale).toLowerCase().startsWith('es')
  if (!isEs) return raw
  try {
    const u = new URL(raw)
    if (!/google\.[^/]*\/maps/i.test(u.href) && !/maps\.google\./i.test(u.href)) return raw
    u.searchParams.set('hl', 'es')
    if (!u.searchParams.has('gl')) u.searchParams.set('gl', 'us')
    return u.toString()
  } catch {
    // Fallback for non-standard embed strings
    let out = raw.replace(/([?&])hl=[^&]*/gi, '$1').replace(/[?&]$/, '')
    out += (out.includes('?') ? '&' : '?') + 'hl=es'
    if (!/[?&]gl=/i.test(out)) out += '&gl=us'
    return out
  }
}

/** Shared Spanish form intro (hero + footer). */
export const ES_FORM_INTRO =
  'Comience con una consulta gratuita y obtenga recomendaciones honestas y precios transparentes de un equipo en el que confían los propietarios de Tampa Bay.'

/** Shared Spanish chrome labels. */
export const ES_NAV = {
  home: 'Inicio',
  gutters: 'Canaletas',
  moreServices: 'Más Servicios',
  about: 'Sobre Nosotros',
  gallery: 'Galería',
  reviews: 'Testimonios',
  faqs: 'Preguntas frecuentes',
  serviceArea: 'Áreas de Servicio',
  contact: 'Contacto',
  blog: 'Blog',
  callPrefix: 'Llamar:',
  bookConsultation: 'Solicitar Consulta Gratis',
  freeEstimate: 'Consulta Gratis',
  submit: 'Enviar',
  name: 'Nombre',
  email: 'Correo electrónico',
  phone: 'Teléfono',
  city: 'Ciudad',
  projectDetails: 'Detalles del proyecto',
  required: '*',
}

export const ES_GUTTERS_LINKS = [
  { label: 'Reparación de canaletas', href: '/es/reparacion-canaletas-tampa-fl/' },
  { label: 'Instalación de canaletas', href: '/es/instalacion-canaletas-tampa-fl/' },
  { label: 'Limpieza de canaletas', href: '/es/limpieza-canaletas-tampa-fl/' },
  { label: 'Protectores de canaletas', href: '/es/protectores-canaletas-tampa-fl/' },
  { label: 'Canaletas seamless', href: '/es/canaletas-seamless-tampa-fl/' },
  { label: 'Super Gutters', href: '/es/super-gutters-tampa-fl/' },
]

export const ES_MORE_SERVICES_LINKS = [
  { label: 'Siding', href: '/es/siding-tampa-fl/' },
  { label: 'Bajantes', href: '/es/bajantes-tampa-fl/' },
  { label: 'Drenaje subterráneo', href: '/es/drenaje-subterraneo-tampa-fl/' },
  { label: 'Drenaje Francés', href: '/es/drenaje-frances-tampa-fl/' },
  { label: 'Reparación de soffit y fascia', href: '/es/reparacion-soffit-fascia-tampa-fl/' },
  { label: 'Screen Rooms & Lanais', href: '/es/screen-rooms-lanais-tampa-fl/' },
]

export const ES_ABOUT_LINKS = [
  { label: 'Sobre Nosotros', href: '/es/sobre-nosotros/' },
  { label: 'Áreas de Servicio', href: '/es/areas-de-servicio/' },
  { label: 'Preguntas frecuentes', href: '/es/preguntas-frecuentes/' },
  { label: 'Contacto', href: '/es/contacto/' },
]
