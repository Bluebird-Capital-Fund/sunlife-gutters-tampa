/**
 * City service pages rendered by `/{slug}/` before a matching Sanity
 * `cityServicePage` document exists. Uses the same fields as downspouts.
 */
export const cityServicePageFallbacks = {
  'underground-drainage-tampa-fl': {
    title: 'Underground Drainage in Tampa, FL | SunLife Gutters Tampa',
    slug: 'underground-drainage-tampa-fl',
    eyebrow: 'Underground Drainage',
    headline: 'Underground Drainage in Tampa, FL',
    lead: 'Move roof water away from your foundation, patio, and landscaping with buried drain lines tied into your downspouts. Built for Tampa Bay rain, flat yards, and homes where surface runoff pools.',
    seoDescription:
      'Underground drainage in Tampa, FL. SunLife Gutters ties downspouts into buried drain lines so stormwater leaves the house instead of pooling against the foundation.',
    layoutBackgrounds: {
      hero: {
        imageSrc:
          'Media (SGT)/Images (SGT)/sunlife-gutters-riverview-fl-downspout-drainage-rock-bed.webp',
      },
    },
    contentSections: [
      {
        heading: 'Downspouts, drain lines, and a clean yard',
        body: '<p>Gutters only work if the water has somewhere to go. We connect downspouts to underground drainage so heavy Florida rain is carried away from the slab, walkways, and planting beds instead of dumping at the corner of the house.</p><p>A typical system includes solid buried pipe, the right fittings at each downspout, and a discharge point such as a pop-up emitter or a safe daylight outlet. We size the run for your roof and grade, then restore the work area when the install is done.</p>',
      },
    ],
  },
  'french-drains-tampa-fl': {
    title: 'French Drains in Tampa, FL | SunLife Gutters Tampa',
    slug: 'french-drains-tampa-fl',
    eyebrow: 'French Drains',
    headline: 'French Drains in Tampa, FL',
    lead: 'Stop yard puddles and soggy beds with a French drain built for Tampa Bay storms. Gravel and perforated pipe collect standing water and carry it to a safe outlet.',
    seoDescription:
      'French drains in Tampa, FL. SunLife Gutters installs gravel trench drains that collect standing yard water and move it away from the house.',
    layoutBackgrounds: {
      hero: {
        imageSrc: 'Media (SGT)/Images (SGT)/sunlife-gutters-apollo-beach-fl-side-yard-drainage.webp',
      },
    },
    contentSections: [
      {
        heading: 'A trench drain for yards that stay wet',
        body: '<p>A French drain is a gravel-filled trench with perforated pipe. It catches water that sits in low spots, along a fence, or against a patio, then moves it to a discharge point instead of leaving it in the yard.</p><p>We lay the trench to the grade of your lot, set the pipe so it flows, and cover the run so the lawn can grow back over it. If roof water is part of the problem, we can tie the drain into your downspouts as well.</p>',
      },
    ],
  },
}

export function cityServicePageFallback(slug) {
  return cityServicePageFallbacks[slug] || null
}
