import { sanity } from './sanity.js'

function normalizeHref(href) {
  if (typeof href !== 'string') return href
  const trimmed = href.trim()
  const legacyServiceHrefMap = {
    '/seamless-gutters/': '/seamless-gutters-tampa-fl/',
    '/soffit-and-fascias/': '/soffit-fascia-repair-tampa-fl/',
    '/super-gutters/': '/super-gutters-tampa-fl/',
    '/screen-rooms-and-lanais/': '/screen-rooms-lanais-tampa-fl/',
    '/siding/': '/siding-tampa-fl/',
    '/underground-drainage/': '/underground-drainage-tampa-fl/',
  }
  const legacyLocationHrefMap = {
    '/tampa-florida/': '/',
    '/brandon-florida/': '/service-area/gutters-brandon-fl/',
    '/gutters-clearwater-fl/': '/service-area/gutters-clearwater-fl/',
    '/gutters-saint-petersburg-fl/': '/service-area/gutters-saint-petersburg-fl/',
    '/gutters-largo-fl/': '/service-area/gutters-largo-fl/',
    '/gutters-plant-city-fl/': '/service-area/gutters-plant-city-fl/',
    '/gutters-seffner-fl/': '/service-area/gutters-seffner-fl/',
    '/apollo-beach-fl/': '/service-area/gutters-apollo-beach-fl/',
    '/gutters-riverview-florida/': '/service-area/gutters-riverview-fl/',
  }
  if (legacyServiceHrefMap[trimmed]) return legacyServiceHrefMap[trimmed]
  if (legacyLocationHrefMap[trimmed]) return legacyLocationHrefMap[trimmed]
  if (trimmed === '/locations/tampa-florida/') {
    return '/'
  }
  if (trimmed === '/gutters-thonotosassa-fl/' || trimmed === '/locations/gutters-thonotosassa-fl/') {
    return '/service-area/gutters-thonotosassa-fl/'
  }
  if (trimmed === '/gutters-sun-city-center-fl/' || trimmed === '/locations/gutters-sun-city-center-fl/') {
    return '/service-area/gutters-sun-city-center-fl/'
  }
  if (trimmed === '/locations/gutters-seffner-fl/') {
    return '/service-area/gutters-seffner-fl/'
  }
  if (trimmed === '/gutters-san-antonio-fl/' || trimmed === '/locations/gutters-san-antonio-fl/') {
    return '/service-area/gutters-san-antonio-fl/'
  }
  if (trimmed === '/locations/gutters-saint-petersburg-fl/') {
    return '/service-area/gutters-saint-petersburg-fl/'
  }
  if (trimmed === '/anna-maria-island-florida/' || trimmed === '/locations/anna-maria-island-florida/') {
    return '/service-area/gutters-anna-maria-island-fl/'
  }
  if (trimmed === '/gutters-ruskin-fl/' || trimmed === '/locations/gutters-ruskin-fl/') {
    return '/service-area/gutters-ruskin-fl/'
  }
  if (trimmed === '/locations/gutters-riverview-florida/') {
    return '/service-area/gutters-riverview-fl/'
  }
  if (trimmed === '/locations/gutters-plant-city-fl/') {
    return '/service-area/gutters-plant-city-fl/'
  }
  if (trimmed === '/gutters-odessa-fl/' || trimmed === '/locations/gutters-odessa-fl/') {
    return '/service-area/gutters-odessa-fl/'
  }
  if (trimmed === '/locations/apollo-beach-fl/') {
    return '/service-area/gutters-apollo-beach-fl/'
  }
  if (trimmed === '/gutters-mulberry-florida/' || trimmed === '/locations/gutters-mulberry-florida/') {
    return '/service-area/gutters-mulberry-fl/'
  }
  if (trimmed === '/locations/gutters-largo-fl/') {
    return '/service-area/gutters-largo-fl/'
  }
  if (trimmed === '/locations/gutters-clearwater-fl/') {
    return '/service-area/gutters-clearwater-fl/'
  }
  if (trimmed === '/gutters-wimauma-fl/' || trimmed === '/locations/gutters-wimauma-fl/') {
    return '/service-area/gutters-wimauma-fl/'
  }
  if (trimmed === '/wesley-chapel-florida/' || trimmed === '/locations/wesley-chapel-florida/') {
    return '/service-area/gutters-wesley-chapel-fl/'
  }
  if (trimmed === '/lakewood-ranch-florida/' || trimmed === '/locations/lakewood-ranch-florida/') {
    return '/service-area/gutters-lakewood-ranch-fl/'
  }
  if (trimmed === '/land-o-lakes-florida/' || trimmed === '/locations/land-o-lakes-florida/') {
    return '/service-area/gutters-land-o-lakes-fl/'
  }
  if (trimmed === '/lithia-florida/' || trimmed === '/locations/lithia-florida/') {
    return '/service-area/gutters-lithia-fl/'
  }
  if (trimmed === '/zephyrhills-florida/' || trimmed === '/locations/zephyrhills-florida/') {
    return '/service-area/gutters-zephyrhills-fl/'
  }
  if (trimmed === '/gutters-valrico-fl/' || trimmed === '/locations/gutters-valrico-fl/') {
    return '/service-area/gutters-valrico-fl/'
  }
  if (trimmed === '/longboat-key-florida/' || trimmed === '/locations/longboat-key-florida/') {
    return '/service-area/gutters-longboat-key-fl/'
  }
  if (trimmed === '/lutz-florida/' || trimmed === '/locations/lutz-florida/') {
    return '/service-area/gutters-lutz-fl/'
  }
  if (trimmed === '/parrish-florida/' || trimmed === '/locations/parrish-florida/') {
    return '/service-area/gutters-parrish-fl/'
  }
  if (trimmed === '/sarasota-fl/' || trimmed === '/locations/sarasota-fl/') {
    return '/service-area/gutters-sarasota-fl/'
  }
  if (trimmed === '/gutters-lakeland-florida/') {
    return '/service-area/gutters-lakeland-fl/'
  }
  if (trimmed === '/bradenton-florida/' || trimmed === '/locations/bradenton-florida/') {
    return '/service-area/gutters-bradenton-fl/'
  }
  if (trimmed === '/locations/brandon-florida/') {
    return '/service-area/gutters-brandon-fl/'
  }
  if (trimmed === '/gibsonton-florida/' || trimmed === '/locations/gibsonton-florida/') {
    return '/service-area/gutters-gibsonton-fl/'
  }
  if (trimmed === '/ellenton-florida/' || trimmed === '/locations/ellenton-florida/') {
    return '/service-area/gutters-ellenton-fl/'
  }
  if (trimmed === '/dover-florida/' || trimmed === '/locations/dover-florida/') {
    return '/service-area/gutters-dover-fl/'
  }
  if (trimmed === '/dade-city-florida/' || trimmed === '/locations/dade-city-florida/') {
    return '/service-area/gutters-dade-city-fl/'
  }
  if (trimmed === '/cortez-florida/' || trimmed === '/locations/cortez-florida/') {
    return '/service-area/gutters-cortez-fl/'
  }
  if (trimmed === '/services/' || trimmed === '/services') return '/seamless-gutters-tampa-fl/'
  if (trimmed === '/projects/' || trimmed === '/projects') return '/gallery/'
  const servicesPrefixMatch = trimmed.match(/^\/services\/([^/]+)\/?$/)
  if (servicesPrefixMatch) return `/${servicesPrefixMatch[1]}/`
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return href
  }
  if (!trimmed.includes('.html')) return href
  return trimmed.replace(/\.html(?=$|[?#])/g, '/')
}

function normalizeLabel(label) {
  if (typeof label !== 'string') return label
  const v = label.trim().toLowerCase()
  if (v === 'gallery' || v === 'our projects' || v === 'projects') return 'Gallery'
  if (v === 'google reviews') return 'Reviews'
  if (v === 'our team') return 'About Us'
  return label
}

function normalizeProjectsHref(label, href) {
  if (typeof href === 'string') {
    const h = href.trim().toLowerCase()
    if (h === '/projects/' || h === '/gallery/') return '/gallery/'
  }
  if (typeof label !== 'string') return href
  const v = label.trim().toLowerCase()
  if (v === 'projects' || v === 'our projects' || v === 'gallery') return '/gallery/'
  return href
}

function normalizeReviewHref(label, href) {
  if (typeof label !== 'string') return href
  const v = label.trim().toLowerCase()
  if (v === 'reviews' || v === 'google reviews') return '/reviews/'
  return href
}

function normalizeAboutHref(label, href) {
  if (typeof label !== 'string') return href
  const v = label.trim().toLowerCase()
  if (v === 'about us' || v === 'our team') return '/about-us/'
  return href
}

function isInvalidNavHref(href) {
  if (typeof href !== 'string') return true
  const trimmed = href.trim()
  return !trimmed || trimmed.startsWith('#')
}

function buildAboutDropdownLinks() {
  return [
    { label: 'About Us', href: '/about-us/' },
    { label: 'Service Area', href: '/service-area/' },
    { label: 'FAQ', href: '/faqs/' },
    { label: 'Contact Us', href: '/contact-us/' },
  ]
}

function buildServicesDropdownLinks() {
  return [
    { label: 'Gutter Repair', href: '/gutter-repair-tampa-fl/' },
    { label: 'Gutter Installation', href: '/gutter-installation-tampa-fl/' },
    { label: 'Gutter Cleaning', href: '/gutter-cleaning-tampa-fl/' },
    { label: 'Gutter Guards', href: '/gutter-guards-tampa-fl/' },
    { label: 'Seamless Gutters', href: '/seamless-gutters-tampa-fl/' },
    { label: 'Super Gutters', href: '/super-gutters-tampa-fl/' },
  ]
}

function buildMoreServicesDropdownLinks() {
  return [
    { label: 'Siding', href: '/siding-tampa-fl/' },
    { label: 'Downspouts', href: '/downspouts-tampa-fl/' },
    { label: 'Underground Drainage', href: '/underground-drainage-tampa-fl/' },
    { label: 'French Drains', href: '/french-drains-tampa-fl/' },
    { label: 'Soffit & Fascia Repair', href: '/soffit-fascia-repair-tampa-fl/' },
    { label: 'Screen Rooms & Lanais', href: '/screen-rooms-lanais-tampa-fl/' },
  ]
}

function normalizeHeader(header) {
  if (!header || typeof header !== 'object') return header
  let navItems = Array.isArray(header.navItems)
    ? header.navItems
        .map((item) => {
          const label = normalizeLabel(item?.label)
          const href = normalizeAboutHref(
            item?.label,
            normalizeReviewHref(item?.label, normalizeProjectsHref(item?.label, normalizeHref(item?.href)))
          )
          const dropdown = Array.isArray(item?.dropdown)
            ? item.dropdown
                .map((link) => ({
                  ...link,
                  label: normalizeLabel(link?.label),
                  href: normalizeAboutHref(
                    link?.label,
                    normalizeReviewHref(link?.label, normalizeProjectsHref(link?.label, normalizeHref(link?.href)))
                  ),
                }))
                .filter((link) => !isInvalidNavHref(link?.href))
            : item?.dropdown
          return { ...item, label, href, dropdown }
        })
        .filter((item) => {
          const hasDropdown = Array.isArray(item?.dropdown) && item.dropdown.length > 0
          if (hasDropdown) return true
          return !isInvalidNavHref(item?.href)
        })
    : header.navItems

  if (Array.isArray(navItems)) {
    // Drop any existing More Services item so we can place a fresh one after Gutters.
    navItems = navItems.filter((item) => {
      const label = String(item?.label || '').trim().toLowerCase()
      return label !== 'more services'
    })

    const guttersIdx = navItems.findIndex((item) => {
      const label = String(item?.label || '').trim().toLowerCase()
      return (
        label === 'gutters' ||
        label === 'services' ||
        label === 'products & services' ||
        label === 'products and services'
      )
    })

    const guttersItem = {
      label: 'Gutters',
      href: '/seamless-gutters-tampa-fl/',
      dropdown: buildServicesDropdownLinks(),
    }
    const moreServicesItem = {
      label: 'More Services',
      href: '/siding-tampa-fl/',
      dropdown: buildMoreServicesDropdownLinks(),
    }

    if (guttersIdx >= 0) {
      navItems[guttersIdx] = {
        ...navItems[guttersIdx],
        ...guttersItem,
      }
      navItems.splice(guttersIdx + 1, 0, moreServicesItem)
    } else {
      navItems.unshift(guttersItem, moreServicesItem)
    }

    const aboutIdx = navItems.findIndex((item) => {
      const label = String(item?.label || '').trim().toLowerCase()
      return label === 'about us' || label === 'our team'
    })

    if (aboutIdx >= 0) {
      navItems[aboutIdx] = {
        ...navItems[aboutIdx],
        label: 'About Us',
        href: '/about-us/',
        dropdown: buildAboutDropdownLinks(),
      }
    } else {
      navItems.push({
        label: 'About Us',
        href: '/about-us/',
        dropdown: buildAboutDropdownLinks(),
      })
    }
  }
  return { ...header, navItems, offerBar: normalizeOfferBar(header.offerBar) }
}

function normalizeFooterColumns(columns) {
  if (!Array.isArray(columns)) return columns
  return columns.map((col) => {
    const heading = String(col?.heading || '').trim().toLowerCase()
    const isServicesColumn =
      heading === 'services' || heading === 'products & services' || heading === 'products and services'

    if (isServicesColumn) {
      return {
        ...col,
        heading: 'Services',
        ariaLabel: col?.ariaLabel || 'Footer services',
        links: buildServicesDropdownLinks(),
      }
    }

    return {
      ...col,
      links: Array.isArray(col?.links)
        ? col.links.map((link) => ({
            ...link,
            label: normalizeLabel(link?.label),
            href: normalizeAboutHref(
              link?.label,
              normalizeReviewHref(link?.label, normalizeProjectsHref(link?.label, normalizeHref(link?.href)))
            ),
          }))
        : col?.links,
    }
  })
}

function normalizeFooterSupport(support) {
  if (!support || typeof support !== 'object') return support
  const links = Array.isArray(support.links)
    ? support.links.map((link) => ({
        ...link,
        label: normalizeLabel(link?.label),
        href: normalizeAboutHref(
          link?.label,
          normalizeReviewHref(link?.label, normalizeProjectsHref(link?.label, normalizeHref(link?.href)))
        ),
      }))
    : support.links
  return { ...support, links }
}

function hasUpdatedLinks(doc) {
  const navHref = doc?.header?.navItems?.[1]?.href
  const privacyHref = doc?.footerSupport?.links?.[0]?.href
  return typeof navHref === 'string' && navHref.includes('/gallery/') &&
    typeof privacyHref === 'string' && privacyHref.includes('/privacy-policy/')
}

/** Top offer-bar message; linked phrase is `ctaText` → `ctaHref`. */
const CANONICAL_OFFER_BAR = {
  textBeforeDiscount: 'Fast, friendly service you can count on. ',
  discountLabel: '',
  textAfterDiscount: '',
  ctaText: 'Book your free consultation today.',
  ctaHref: 'https://sunlifegutters.com/contact-us/#contact',
}

/** Shared hero + footer form intro used site-wide. */
export const CANONICAL_FORM_INTRO =
  'Start with a free consultation and get honest recommendations and transparent pricing from a team Tampa Bay homeowners trust.'

function normalizeOfferBar(offerBar) {
  return {
    ...(offerBar && typeof offerBar === 'object' ? offerBar : {}),
    ...CANONICAL_OFFER_BAR,
  }
}

function normalizeFooterEstimate(footerEstimate) {
  return {
    ...(footerEstimate && typeof footerEstimate === 'object' ? footerEstimate : {}),
    intro: CANONICAL_FORM_INTRO,
  }
}

/**
 * Prefer Site settings for the full header; many pages fall back to `homePage.header`.
 * Offer bar (discount %, CTA, etc.) must always use Site settings when present — homePage
 * often has a stale copy and was overriding the live Sanity singleton.
 */
export function mergeHeaderFromSettings(settings, fallbackHeader) {
  const base = settings?.header ?? fallbackHeader ?? {}
  return {
    ...base,
    // Merge field-by-field so a partial `header.offerBar` on site settings still wins
    // (Sanity often sends only changed fields; `??` replaced the whole block with homePage's 10%).
    offerBar: normalizeOfferBar({
      ...fallbackHeader?.offerBar,
      ...settings?.header?.offerBar,
    }),
  }
}

/** In-process cache for one `astro build` / dev session — avoids duplicate fetches from layouts + pages. */
let siteSettingsCache = null

export async function getSiteSettings() {
  if (siteSettingsCache) {
    return siteSettingsCache
  }
  const docs = await sanity.fetch(`*[_type == "siteSettings"]`)
  const list = Array.isArray(docs) ? docs : []

  /** Only this document id is the canonical promo/header copy source (see import script + Studio). */
  const singletonDoc = list.find((d) => d?._id === 'siteSettingsSingleton')
  const singleton = singletonDoc || list[0] || {}
  const linksSource =
    list.find((d) => d?._id !== singleton?._id && hasUpdatedLinks(d)) ||
    list.find((d) => d?._id !== singleton?._id && Array.isArray(d?.header?.navItems)) ||
    singleton

  // Nav/footer may come from a second siteSettings doc. Offer bar copy must always follow
  // **siteSettingsSingleton** when that document exists — merge singleton fields over the
  // links doc so a stale secondary `header.offerBar` never wins (and Studio edits to the
  // singleton always apply, even if `offerBar` was temporarily empty in the dataset).
  const rawHeader = linksSource?.header ?? singleton?.header
  const singletonOfferBar = singletonDoc?.header?.offerBar
  const mergedHeader = rawHeader
    ? {
        ...rawHeader,
        offerBar: singletonDoc
          ? { ...rawHeader?.offerBar, ...(singletonOfferBar && typeof singletonOfferBar === 'object' ? singletonOfferBar : {}) }
          : rawHeader?.offerBar,
      }
    : rawHeader

  /**
   * Footer columns: prefer the canonical site settings doc (`singleton`) when it has columns.
   * Otherwise `linksSource` (a second siteSettings doc) was used first — that hid Studio edits
   * on the singleton (e.g. new “Blog” link) when the secondary doc still had old footer columns.
   */
  const footerColumnsRaw =
    Array.isArray(singleton?.footerColumns) && singleton.footerColumns.length > 0
      ? singleton.footerColumns
      : (linksSource?.footerColumns ?? singleton?.footerColumns)

  /**
   * Two `siteSettings` docs exist in some projects: the singleton and a legacy/alternate
   * copy. The homepage iframe reads `mapEmbedUrl`; the alternate doc often holds the
   * full Google **place** embed (`pb=…`) while the singleton still has a generic `?q=…`
   * URL. Prefer the non-empty embed from `linksSource` when it differs.
   */
  const mapEmbedFromLinks =
    typeof linksSource?.mapEmbedUrl === 'string' && linksSource.mapEmbedUrl.trim()
      ? linksSource.mapEmbedUrl.trim()
      : ''
  const mapEmbedMerged =
    mapEmbedFromLinks ||
    (typeof singleton?.mapEmbedUrl === 'string' && singleton.mapEmbedUrl.trim()
      ? singleton.mapEmbedUrl.trim()
      : '')

  const reviewsMerged = singleton?.reviews ?? linksSource?.reviews
  const reviewValuesMerged =
    reviewsMerged?.reviewValues && typeof reviewsMerged.reviewValues === 'object'
      ? reviewsMerged.reviewValues
      : {}

  siteSettingsCache = {
    ...singleton,
    reviews: reviewsMerged
      ? {
          ...reviewsMerged,
          // Keep AggregateRating + on-page Google snapshot aligned (4.9 / 247).
          reviewValues: {
            ...reviewValuesMerged,
            reviewsRating: '4.9',
            reviewsCount: '247',
          },
        }
      : reviewsMerged,
    header: normalizeHeader(mergedHeader ?? singleton?.header) ?? {},
    footerEstimate: normalizeFooterEstimate(linksSource?.footerEstimate ?? singleton?.footerEstimate),
    footerBrand: linksSource?.footerBrand ?? singleton?.footerBrand,
    footerColumns: normalizeFooterColumns(footerColumnsRaw),
    footerSupport: normalizeFooterSupport(linksSource?.footerSupport ?? singleton?.footerSupport),
    forms: singleton?.forms ?? linksSource?.forms,
    mapEmbedUrl: mapEmbedMerged,
    statsValues: {
      ...(singleton?.statsValues && typeof singleton.statsValues === 'object' ? singleton.statsValues : {}),
      statsYearsExperience: 'Lifetime',
      statsJobsCompleted: '10,000+',
      statsAvgRating: '4.9',
      whyChooseHomesCount: '10,000+',
    },
  }
  return siteSettingsCache
}

export async function getHomePage() {
  const homePage = await sanity.fetch(`*[_id == "homePageSingleton"][0]`)
  if (!homePage) {
    throw new Error(
      'Sanity: no published document with _id "homePageSingleton". In Studio open Content → Home page, then Publish.',
    )
  }
  return homePage
}
