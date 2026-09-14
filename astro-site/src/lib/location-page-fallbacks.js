/**
 * Location pages that should render like Sanity `locationPage` docs
 * before a matching Studio document exists.
 */
export const locationPageFallbacks = {
  'gutters-lakeland-fl': {
    title: 'Seamless Gutters & Exterior Services in Lakeland, FL',
    slug: 'gutters-lakeland-fl',
    countyName: 'Polk County',
    eyebrow: 'SunLife Gutters & Homes',
    headline: 'Protect Your Lakeland Home from Florida’s Heat & Heavy Rain',
    lead: 'From Lake Hollingsworth and Dixieland to neighborhoods near Lake Gibson and South Lakeland, SunLife Gutters & Homes installs exterior systems built for Polk County sun, storms, and humidity.',
    seoDescription:
      'Lake Hollingsworth, Dixieland, and Polk County—seamless gutters, soffit, lanais, and drainage in Lakeland, FL.',
    layoutBackgrounds: {
      hero: {
        imageSrc: 'Media (SGT)/Images (SGT)/sunlife-gutters-lakeland-fl-roof-gutter-system.webp',
      },
    },
    contentSections: [
      {
        heading: 'Seamless Gutters & Exterior Services in Lakeland, FL',
        body: '<p>Lakeland’s mix of historic districts, lake neighborhoods, and growing suburbs means homes here need dependable water management and durable exterior materials. We provide seamless gutters, soffit & fascia, screen rooms & lanais, underground drainage, Super Gutters, and siding installations tailored to Polk County conditions.</p>',
      },
    ],
  },
}

export function locationPageFallback(slug) {
  return locationPageFallbacks[slug] || null
}
