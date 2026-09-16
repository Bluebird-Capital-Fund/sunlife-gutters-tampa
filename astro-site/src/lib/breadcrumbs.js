/**
 * Breadcrumb trail helpers.
 * Service pages → Home / Services / {service}
 * Location pages → Home / Service Area / {city}
 * Other pages → Home / {slug label} (optional parent)
 */
import { SERVICE_HUB_CATEGORIES } from './services-page-content.js'

/** @typedef {{ label: string, href?: string }} BreadcrumbItem */

const KNOWN_PATH_LABELS = {
  services: 'Services',
  'service-area': 'Service Area',
  'about-us': 'About Us',
  'contact-us': 'Contact Us',
  faqs: 'FAQs',
  gallery: 'Gallery',
  reviews: 'Reviews',
  blog: 'Blog',
  financing: 'Financing',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'thank-you': 'Thank You',
}

/** Explicit service labels keyed by slug (no Tampa / FL). */
const SERVICE_LABEL_OVERRIDES = {
  'gutter-colors-options-tampa-fl': 'Gutter Colors',
  'soffit-fascia-repair-tampa-fl': 'Soffit & Fascia Repair',
  'screen-rooms-lanais-tampa-fl': 'Screen Rooms & Lanais',
}

/** Multi-word location overrides keyed by internal location slug. */
const LOCATION_LABEL_OVERRIDES = {
  'land-o-lakes-florida': "Land O' Lakes",
  'gutters-saint-petersburg-fl': 'Saint Petersburg',
  'gutters-sun-city-center-fl': 'Sun City Center',
  'anna-maria-island-florida': 'Anna Maria Island',
  'lakewood-ranch-florida': 'Lakewood Ranch',
  'longboat-key-florida': 'Longboat Key',
  'dade-city-florida': 'Dade City',
  'apollo-beach-fl': 'Apollo Beach',
  'wesley-chapel-florida': 'Wesley Chapel',
  'sun-city-center-florida': 'Sun City Center',
  'saint-petersburg-florida': 'Saint Petersburg',
}

/** @type {Record<string, string>} */
const SERVICE_LABEL_BY_SLUG = (() => {
  /** @type {Record<string, string>} */
  const map = { ...SERVICE_LABEL_OVERRIDES }
  for (const category of SERVICE_HUB_CATEGORIES) {
    for (const link of category.links) {
      const slug = String(link.href || '')
        .replace(/^\/+|\/+$/g, '')
        .trim()
      if (slug && !map[slug]) map[slug] = link.label
    }
  }
  return map
})()

/**
 * @param {string} raw
 * @returns {string}
 */
export function titleCaseSlugPart(raw) {
  const s = String(raw || '')
    .trim()
    .replace(/^\/+|\/+$/g, '')
  if (!s) return ''
  if (KNOWN_PATH_LABELS[s]) return KNOWN_PATH_LABELS[s]
  return s
    .split(/[-_/]+/)
    .filter(Boolean)
    .map((part) => {
      if (part.toLowerCase() === 'faqs') return 'FAQs'
      if (part.toLowerCase() === 'us') return 'Us'
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    })
    .join(' ')
}

/**
 * Service crumb label: service name only (no Tampa / FL / location).
 * @param {string} slug
 * @param {string} [eyebrow]
 * @returns {string}
 */
export function serviceLabelFromSlug(slug, eyebrow) {
  const key = String(slug || '')
    .trim()
    .replace(/^\/+|\/+$/g, '')
  if (SERVICE_LABEL_BY_SLUG[key]) return SERVICE_LABEL_BY_SLUG[key]

  const fromEyebrow = String(eyebrow || '').trim()
  if (fromEyebrow) {
    // Drop trailing location phrases if CMS eyebrow includes them.
    return fromEyebrow
      .replace(/\s+in\s+Tampa(?:\s+Bay)?(?:,?\s*FL)?$/i, '')
      .replace(/,?\s*Tampa(?:\s+Bay)?(?:,?\s*FL)?$/i, '')
      .trim()
  }

  const stripped = key.replace(/-tampa-fl$/i, '').replace(/-tampa$/i, '')
  return titleCaseSlugPart(stripped)
}

/**
 * Location crumb label: city/place only (no "gutters" / FL keywords).
 * @param {string} slug internal locations/[slug] value
 * @returns {string}
 */
export function locationLabelFromSlug(slug) {
  const raw = String(slug || '').trim()
  if (!raw) return ''
  if (LOCATION_LABEL_OVERRIDES[raw]) return LOCATION_LABEL_OVERRIDES[raw]
  return raw
    .replace(/^gutters-/, '')
    .replace(/-florida$/, '')
    .replace(/-fl$/, '')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

/**
 * @param {string} label
 * @returns {BreadcrumbItem[]}
 */
export function serviceBreadcrumbItems(label) {
  return [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label },
  ]
}

/**
 * @param {string} label
 * @returns {BreadcrumbItem[]}
 */
export function locationBreadcrumbItems(label) {
  return [
    { label: 'Home', href: '/' },
    { label: 'Service Area', href: '/service-area/' },
    { label },
  ]
}

/**
 * @param {string} label
 * @param {{ label: string, href: string } | null} [parent]
 * @returns {BreadcrumbItem[]}
 */
export function simpleBreadcrumbItems(label, parent = null) {
  /** @type {BreadcrumbItem[]} */
  const items = [{ label: 'Home', href: '/' }]
  if (parent?.label && parent?.href) items.push({ label: parent.label, href: parent.href })
  items.push({ label })
  return items
}

/**
 * Build a trail from a pathname for generic/static pages.
 * @param {string} pathname
 * @param {string} [currentLabel]
 * @returns {BreadcrumbItem[]}
 */
export function breadcrumbItemsFromPath(pathname, currentLabel) {
  const path = String(pathname || '/')
    .split('?')[0]
    .replace(/\/+$/, '') || '/'
  if (path === '/' || path === '') return []

  const parts = path.split('/').filter(Boolean)
  if (parts[0] === 'lp' && parts[1]) {
    return simpleBreadcrumbItems(currentLabel || titleCaseSlugPart(parts[1]))
  }
  if (parts[0] === 'blog' && parts[1] === 'page' && parts[2]) {
    return simpleBreadcrumbItems(`Page ${parts[2]}`, { label: 'Blog', href: '/blog/' })
  }
  if (parts.length === 1) {
    return simpleBreadcrumbItems(currentLabel || titleCaseSlugPart(parts[0]))
  }
  // Fallback: last segment as current, previous as parent when known.
  const current = currentLabel || titleCaseSlugPart(parts[parts.length - 1])
  const parentSlug = parts[0]
  const parentLabel = titleCaseSlugPart(parentSlug)
  return simpleBreadcrumbItems(current, {
    label: parentLabel,
    href: `/${parentSlug}/`,
  })
}
