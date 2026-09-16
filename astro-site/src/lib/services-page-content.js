/** Service categories + links for the /services/ hub page. */

/** @typedef {{ label: string, href: string }} ServiceHubLink */
/** @typedef {{ heading: string, headingId: string, links: ServiceHubLink[] }} ServiceHubCategory */

/** @type {ServiceHubCategory[]} */
export const SERVICE_HUB_CATEGORIES = [
  {
    heading: 'Gutter Services',
    headingId: 'gutter-services',
    links: [
      { label: 'Gutter Installation', href: '/gutter-installation-tampa-fl/' },
      { label: 'Gutter Repair', href: '/gutter-repair-tampa-fl/' },
      { label: 'Emergency Gutter Repair', href: '/emergency-gutter-repair-tampa-fl/' },
      { label: 'Gutter Replacement', href: '/gutter-replacement-tampa-fl/' },
      { label: 'Gutter Inspection', href: '/gutter-inspection-tampa-fl/' },
      { label: 'Gutter Cleaning', href: '/gutter-cleaning-tampa-fl/' },
      { label: 'Gutter Maintenance', href: '/gutter-maintenance-tampa-fl/' },
      { label: 'Gutter Guards', href: '/gutter-guards-tampa-fl/' },
      { label: 'Downspouts', href: '/downspouts-tampa-fl/' },
    ],
  },
  {
    heading: 'Gutter Types & Options',
    headingId: 'gutter-types-options',
    links: [
      { label: 'Seamless Gutters', href: '/seamless-gutters-tampa-fl/' },
      { label: 'Super Gutters', href: '/super-gutters-tampa-fl/' },
      { label: 'Residential Gutters', href: '/residential-gutters-tampa-fl/' },
      { label: 'Commercial Gutters', href: '/commercial-gutters-tampa-fl/' },
      { label: 'Half Round Gutters', href: '/half-round-gutters-tampa-fl/' },
      { label: 'Copper Gutters', href: '/copper-gutters-tampa-fl/' },
      { label: 'Custom Gutters', href: '/custom-gutters-tampa-fl/' },
      { label: 'Gutter Colors', href: '/gutter-colors-options-tampa-fl/' },
    ],
  },
  {
    heading: 'Drainage & Exterior Services',
    headingId: 'drainage-exterior-services',
    links: [
      { label: 'Underground Drainage', href: '/underground-drainage-tampa-fl/' },
      { label: 'French Drains', href: '/french-drains-tampa-fl/' },
      { label: 'Soffit & Fascia Repair', href: '/soffit-fascia-repair-tampa-fl/' },
      { label: 'Siding', href: '/siding-tampa-fl/' },
      { label: 'Screen Rooms & Lanais', href: '/screen-rooms-lanais-tampa-fl/' },
    ],
  },
]

export const SERVICE_HUB_INTRO =
  "Every home has different drainage needs, which is why we don't believe in one-size-fits-all solutions. Before we recommend any work, we take the time to evaluate your roofline, drainage patterns, landscaping, and the unique challenges Florida weather can bring. Whether you need a simple repair or a complete gutter replacement, our goal is to provide a solution that's built around your home, your priorities, and your budget, so you can feel confident in your investment for years to come."

export const SERVICE_HUB_HERO_LEAD =
  'SunLife Gutters Tampa provides gutter and exterior services for homeowners and businesses throughout Tampa Bay. From seamless and Super Gutters to screen rooms, soffit and fascia, and drainage solutions, every project is backed by quality workmanship, honest recommendations, and clear communication from your free consultation to the final walkthrough.'

export const SERVICE_HUB_NOT_SURE_HEADING = 'Not Sure Which Service You Need?'

export const SERVICE_HUB_NOT_SURE_BODY = [
  "Not every gutter problem has a simple answer, and that's why we're here to help. Whether you've noticed overflowing gutters, storm damage, leaks, poor drainage, or you're simply not sure what your home needs, our team will take the time to evaluate your system, answer your questions, and recommend the solution that makes the most sense for your property.",
  "Book your free consultation today and let us help you protect your home with a custom gutter system designed for Florida's weather.",
]

export const SERVICE_HUB_WHY_HEADING = 'Why Choose SunLife Gutters Tampa'

export const SERVICE_HUB_WHY_INTRO =
  "From your first consultation to the final walkthrough, we're committed to making every project straightforward, stress-free, and built around your home's needs."

export const SERVICE_HUB_WHY_POINTS = [
  'Family-owned and proudly serving Tampa Bay since 2018',
  'Trusted by more than 10,000 homeowners and businesses',
  'Honest recommendations with no high-pressure sales',
  "Custom solutions designed for Florida's heavy rain and storms",
  'One local team for gutters, drainage, screen rooms, soffit and fascia, and more',
  'Clear communication and dependable service from start to finish',
  'Lifetime warranty options available*',
  'Flexible financing available',
]
