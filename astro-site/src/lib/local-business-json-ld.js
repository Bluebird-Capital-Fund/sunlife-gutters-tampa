/**
 * JSON-LD for schema.org HomeAndConstructionBusiness (LocalBusiness).
 * Data from Site settings → Business + Business listings, plus canonical locals.
 */
import { POPULAR_SERVICE_AREA_CITIES } from './service-area-cities.js'
import { asStr, mediaUrl } from './sanity-strings.js'

/** Matches astro.config.mjs `site` — absolute URLs for image / @id */
export const CANONICAL_SITE_ORIGIN = 'https://sunlifegutters.com'

/** Canonical NAP used in LocalBusiness JSON-LD (street + city + state + ZIP). */
export const BUSINESS_SCHEMA_ADDRESS = {
  streetAddress: '1502 Lenna Ave',
  addressLocality: 'Seffner',
  addressRegion: 'FL',
  postalCode: '33584',
  addressCountry: 'US',
}

/** Google rating snapshot for AggregateRating (keep in sync with on-page review UI). */
export const BUSINESS_SCHEMA_RATING = {
  ratingValue: '4.9',
  reviewCount: '247',
  bestRating: '5',
  worstRating: '1',
}

/** Open 24/7 → schema.org openingHours */
export const BUSINESS_SCHEMA_OPENING_HOURS = 'Mo-Su 00:00-23:59'

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeSiteUrl(raw) {
  const s = String(raw || '').trim()
  if (!s) return CANONICAL_SITE_ORIGIN
  if (/^https?:\/\//i.test(s)) return s.replace(/\/+$/, '') || CANONICAL_SITE_ORIGIN
  return `${CANONICAL_SITE_ORIGIN.replace(/\/+$/, '')}/${s.replace(/^\/+/, '')}`
}

/**
 * @param {string} url
 * @param {string} siteOrigin
 * @returns {boolean}
 */
function isOwnSiteUrl(url, siteOrigin) {
  try {
    const u = new URL(url)
    const origin = new URL(siteOrigin)
    return u.origin === origin.origin
  } catch {
    return false
  }
}

/**
 * @param {Record<string, unknown>} settings siteSettings merge result
 * @param {string} [nameOverride] If set, used as schema.org `name` instead of `business.companyName`
 * @returns {string | null} Serialized JSON-LD or null if no business name
 */
export function buildHomeAndConstructionBusinessJsonLd(settings, nameOverride) {
  const business = settings?.business ?? {}
  const listings = settings?.businessListings ?? {}

  const name =
    (typeof nameOverride === 'string' && nameOverride.trim()) || asStr(business.companyName).trim()
  if (!name) return null

  const url = normalizeSiteUrl(asStr(business.websiteUrl))
  const telephone = asStr(business.phoneDisplay).trim() || formatTelForSchema(asStr(business.phoneTel))
  const email = asStr(business.email).trim()
  const description =
    asStr(business.descriptionShort).trim() || asStr(business.descriptionLong).trim()

  const logoPath = asStr(business.logoHorizontalBlack) || asStr(business.logoHorizontalWhite)
  const image = logoPath
    ? `${CANONICAL_SITE_ORIGIN.replace(/\/+$/, '')}${mediaUrl(logoPath)}`
    : undefined

  const address = {
    '@type': 'PostalAddress',
    ...BUSINESS_SCHEMA_ADDRESS,
  }

  const sameAs = [
    asStr(listings.googleMaps),
    asStr(listings.facebook),
    asStr(listings.instagram),
    asStr(listings.twitter),
    asStr(listings.linkedin),
    asStr(listings.yelp),
    asStr(listings.bingPlaces),
  ]
    .map((u) => u.trim())
    .filter((u) => /^https?:\/\//i.test(u))
    .filter((u) => !isOwnSiteUrl(u, url))
  const sameAsUnique = [...new Set(sameAs)]

  const hasMap = asStr(listings.googleMaps).trim()

  const areaServed = POPULAR_SERVICE_AREA_CITIES.map((city) => ({
    '@type': 'City',
    name: city.name,
  }))

  /** @type {Record<string, unknown>} */
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${url}#business`,
    name,
    url,
    ...(telephone ? { telephone } : {}),
    ...(email ? { email } : {}),
    ...(description ? { description } : {}),
    ...(image ? { image: { '@type': 'ImageObject', url: image } } : {}),
    address,
    openingHours: BUSINESS_SCHEMA_OPENING_HOURS,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_SCHEMA_RATING.ratingValue,
      reviewCount: BUSINESS_SCHEMA_RATING.reviewCount,
      bestRating: BUSINESS_SCHEMA_RATING.bestRating,
      worstRating: BUSINESS_SCHEMA_RATING.worstRating,
    },
    ...(hasMap ? { hasMap } : {}),
    ...(sameAsUnique.length ? { sameAs: sameAsUnique } : {}),
    areaServed,
  }

  const foundingDate = asStr(business.dateOpened).trim()
  if (foundingDate) {
    data.foundingDate = foundingDate
  }

  let json = JSON.stringify(data)
  json = json.replace(/</g, '\\u003c')
  return json
}

/**
 * @param {string} tel
 * @returns {string}
 */
function formatTelForSchema(tel) {
  const d = String(tel || '').replace(/\D/g, '')
  if (d.length === 10) return `+1${d}`
  if (d.length === 11 && d.startsWith('1')) return `+${d}`
  return String(tel || '').trim()
}
