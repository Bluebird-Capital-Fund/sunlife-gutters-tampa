/**
 * Canonical sitemap URL rules for SunLife Gutters Tampa.
 * Location landings are served at /service-area/gutters-*-fl/ (Vercel rewrites),
 * not /locations/... — include those public paths and drop redirect stubs.
 *
 * Build output (via @astrojs/sitemap chunks + locale-sitemap-filenames):
 *   sitemap-en.xml — English URLs
 *   sitemap-es.xml — Spanish /es/ URLs
 *   sitemap-index.xml — index of both
 */

import { getLiveHreflangPair, LIVE_ES_PATHS, normalizePath, SITE_ORIGIN } from './i18n.js'

/** @type {string[]} Public location URLs (trailing slash). */
export const SERVICE_AREA_LOCATION_PATHS = [
  '/service-area/gutters-anna-maria-island-fl/',
  '/service-area/gutters-apollo-beach-fl/',
  '/service-area/gutters-bradenton-fl/',
  '/service-area/gutters-brandon-fl/',
  '/service-area/gutters-clearwater-fl/',
  '/service-area/gutters-cortez-fl/',
  '/service-area/gutters-dade-city-fl/',
  '/service-area/gutters-dover-fl/',
  '/service-area/gutters-ellenton-fl/',
  '/service-area/gutters-gibsonton-fl/',
  '/service-area/gutters-lakewood-ranch-fl/',
  '/service-area/gutters-land-o-lakes-fl/',
  '/service-area/gutters-largo-fl/',
  '/service-area/gutters-lithia-fl/',
  '/service-area/gutters-longboat-key-fl/',
  '/service-area/gutters-lutz-fl/',
  '/service-area/gutters-mulberry-fl/',
  '/service-area/gutters-odessa-fl/',
  '/service-area/gutters-parrish-fl/',
  '/service-area/gutters-plant-city-fl/',
  '/service-area/gutters-riverview-fl/',
  '/service-area/gutters-ruskin-fl/',
  '/service-area/gutters-saint-petersburg-fl/',
  '/service-area/gutters-san-antonio-fl/',
  '/service-area/gutters-sarasota-fl/',
  '/service-area/gutters-seffner-fl/',
  '/service-area/gutters-sun-city-center-fl/',
  '/service-area/gutters-thonotosassa-fl/',
  '/service-area/gutters-valrico-fl/',
  '/service-area/gutters-lakeland-fl/',
  '/service-area/gutters-wesley-chapel-fl/',
  '/service-area/gutters-wimauma-fl/',
  '/service-area/gutters-zephyrhills-fl/',
]

/** Astro redirect-only pages that should never appear in the sitemap. */
export const SITEMAP_REDIRECT_STUB_PATHS = new Set([
  '/apollo-beach-fl/',
  '/brandon-florida/',
  '/gutters-clearwater-fl/',
  '/gutters-largo-fl/',
  '/gutters-plant-city-fl/',
  '/gutters-riverview-florida/',
  '/gutters-saint-petersburg-fl/',
  '/gutters-seffner-fl/',
  '/projects/',
  '/screen-rooms-and-lanais/',
  '/seamless-gutters/',
  '/siding/',
  '/soffit-and-fascias/',
  '/super-gutters/',
  '/tampa-florida/',
  '/thank-you/',
  '/es/thank-you/',
])

/**
 * @param {string} page absolute URL
 * @returns {boolean}
 */
export function isSpanishSitemapUrl(page) {
  let pathname = ''
  try {
    pathname = new URL(page).pathname
  } catch {
    return false
  }
  if (!pathname.endsWith('/')) pathname = `${pathname}/`
  return pathname === '/es/' || pathname.startsWith('/es/')
}

/**
 * @param {string} siteOrigin e.g. https://sunlifegutters.com
 * @returns {string[]}
 */
export function sitemapCustomPages(siteOrigin) {
  const origin = String(siteOrigin || '').replace(/\/+$/, '')
  return SERVICE_AREA_LOCATION_PATHS.map((path) => `${origin}${path}`)
}

/**
 * @param {string} page absolute URL from @astrojs/sitemap
 * @returns {boolean}
 */
export function sitemapIncludePage(page) {
  let pathname = ''
  try {
    pathname = new URL(page).pathname
  } catch {
    return false
  }
  if (!pathname.endsWith('/')) pathname = `${pathname}/`

  if (pathname.includes('/lp/')) return false
  if (pathname.startsWith('/locations/')) return false
  if (SITEMAP_REDIRECT_STUB_PATHS.has(pathname)) return false

  // Only include live Spanish paths under /es/
  if (pathname === '/es/' || pathname.startsWith('/es/')) {
    return LIVE_ES_PATHS.has(pathname)
  }
  return true
}

/**
 * Add reciprocal hreflang links only for live EN↔ES pairs.
 * @param {import('@astrojs/sitemap').SitemapItem} item
 */
export function sitemapSerialize(item) {
  if (!item?.url) return item
  let pathname = '/'
  try {
    pathname = new URL(item.url).pathname
  } catch {
    return item
  }
  const pair = getLiveHreflangPair(pathname)
  if (!pair) return item
  const origin = SITE_ORIGIN.replace(/\/+$/, '')
  item.links = [
    { url: `${origin}${normalizePath(pair.en)}`, lang: 'en-US' },
    { url: `${origin}${normalizePath(pair.es)}`, lang: 'es-US' },
    { url: `${origin}${normalizePath(pair.en)}`, lang: 'x-default' },
  ]
  return item
}

/** @param {import('@astrojs/sitemap').SitemapItem} item */
export function sitemapChunkEn(item) {
  if (!item?.url || isSpanishSitemapUrl(item.url)) return undefined
  return item
}

/** @param {import('@astrojs/sitemap').SitemapItem} item */
export function sitemapChunkEs(item) {
  if (!item?.url || !isSpanishSitemapUrl(item.url)) return undefined
  return item
}
