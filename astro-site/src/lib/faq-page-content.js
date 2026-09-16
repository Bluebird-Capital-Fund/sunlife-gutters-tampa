/**
 * Canonical FAQ page content for /faqs/ (SunLife Gutters Tampa).
 * Source of truth for the accordion — do not invent or paraphrase answers.
 */

/** @typedef {{ question: string, answerHtml: string }} FaqItem */
/** @typedef {{ heading: string, items: FaqItem[] }} FaqSection */

/** @type {FaqSection[]} */
export const FAQ_PAGE_SECTIONS = [
  {
    heading: 'Costs, Permits, Warranties & Project Planning',
    items: [
      {
        question: 'How much do gutters typically cost in Tampa, Florida?',
        answerHtml:
          '<p>Gutter installation in Tampa is priced based on the specific property and scope of work rather than a one-size-fits-all package. Key factors include linear footage, gutter profile, guards, soffit and fascia needs, home height, access, removal, drainage, and color. We provide custom, itemized estimates so Tampa homeowners can clearly understand what their gutter project includes and what factors affect the final price.</p>',
      },
      {
        question: 'Do I need a permit to install gutters in Tampa, Florida?',
        answerHtml:
          '<p>Standard gutter and downspout work in Tampa may not require a building permit when it qualifies as nonstructural minor work. However, requirements can change if the project involves structural modifications, drainage alterations, or other regulated work. Permit requirements can also vary depending on whether your property falls under the City of Tampa or Hillsborough County. We verify applicable requirements before work begins so the project follows local codes and permitting rules.</p>',
      },
      {
        question: 'How much does a super gutter cost in Tampa?',
        answerHtml:
          '<p>Super gutter costs in Tampa vary because these structural gutter systems are typically integrated with pool or screen enclosures and must be sized for the specific project. Pricing depends on the gutter length, enclosure configuration, roofline, installation access, existing damage, and whether related fascia or enclosure work is needed. We inspect the property and provide an estimate based on the required system and installation scope.</p>',
      },
      {
        question: 'Do you need a permit for a screen enclosure in Tampa, Florida?',
        answerHtml:
          '<p>Yes, a new residential screen enclosure in the City of Tampa generally requires a building permit. The permitting process can include a site plan, structural plans designed to current Florida Building Code requirements, plan review, and inspections. Requirements depend on the property and project scope. We review the proposed Tampa enclosure and applicable requirements so permitting and construction can be properly planned before work begins.</p>',
      },
      {
        question: 'Are pool screen enclosures worth it for Tampa homes?',
        answerHtml:
          '<p>For many Tampa homes, a pool screen enclosure is a practical investment. Screening helps keep mosquitoes, leaves, insects, and windblown debris out of the pool area, which can reduce cleanup and make the space more comfortable to use. It also creates a defined outdoor living area around the pool. Whether it makes sense depends on your property, budget, existing pool layout, and maintenance priorities.</p>',
      },
      {
        question: 'What warranties do you offer for projects in Tampa?',
        answerHtml:
          '<p>SunLife Gutters Tampa offers a standard 1-year workmanship warranty on gutter installation and repair, along with lifetime warranty options for eligible projects. Lifetime warranty availability and terms vary based on the project, home size, and other factors. We review the applicable warranty options and coverage with you before work begins so you understand what is included with your Tampa gutter project.</p>',
      },
    ],
  },
  {
    heading: 'Gutter Cleaning, Clogs & Maintenance',
    items: [
      {
        question: 'How often should gutters be cleaned in Tampa?',
        answerHtml:
          '<p>Most Tampa homes should have their gutters cleaned at least twice a year, typically before the summer rainy season and again after heavier seasonal debris. Homes surrounded by oaks, pines, palms, or other trees may need cleaning three or four times a year. We also recommend checking Tampa gutters after major storms, when leaves, twigs, and other debris can quickly block drainage.</p>',
      },
      {
        question: 'Why do my gutters keep clogging even after they’ve been cleaned in Tampa?',
        answerHtml:
          '<p>If your Tampa gutters clog soon after cleaning, nearby trees, roof valleys, or recurring storm debris may be feeding material into the same areas. Downspouts can also remain partially blocked even when the gutters look clean. A full gutter system inspection can pinpoint the source of repeated clogs by checking downspout flow, gutter pitch, and areas where debris consistently collects. Once we identify the cause, we can recommend the right solution to keep water moving properly.</p>',
      },
      {
        question: 'Can sagging gutters be repaired, or do they need to be replaced in Tampa?',
        answerHtml:
          '<p>Sagging gutters on Tampa homes can often be repaired when the gutter itself is in good condition. Loose or damaged hangers, improper pitch, debris weight, and failing fasteners are common causes. If the gutter is badly bent, extensively damaged, or attached to deteriorated fascia, replacement may be more appropriate. We inspect the gutters, supports, pitch, and fascia first to determine the right solution.</p>',
      },
      {
        question: 'Can loose gutters be reattached to my Tampa home?',
        answerHtml:
          '<p>Yes, loose gutters can often be reattached to a Tampa home if the gutter and fascia are still in good condition. We first check why the system pulled away, since loose fasteners, damaged hangers, heavy debris, and deteriorated fascia can all contribute. If the fascia is sound, the gutter can typically be properly secured and realigned to restore the correct slope and drainage.</p>',
      },
    ],
  },
  {
    heading: 'Heavy Rain, Drainage & Water Management',
    items: [
      {
        question: 'Why do my gutters overflow during heavy rain in Tampa?',
        answerHtml:
          '<p>Gutters often overflow during Tampa’s heavy rain when leaves or debris restrict water flow, downspouts are clogged, or the system cannot handle the volume of roof runoff. Improper gutter pitch or too few downspouts can also contribute. We inspect the full drainage path to identify the cause and determine whether cleaning, repairs, larger gutters, or improved downspout capacity will solve the problem.</p>',
      },
      {
        question: 'Should my downspouts connect to underground drainage in Tampa?',
        answerHtml:
          '<p>Underground drainage can be a good solution for Tampa homes when downspouts discharge too close to the foundation or create pooling in landscaped areas. It carries roof runoff to a more suitable discharge point away from the home. However, not every property needs it. We evaluate grading, downspout locations, runoff volume, and existing drainage to determine the most effective setup for your Tampa property.</p>',
      },
      {
        question: 'Would a French drain help with water pooling around my Tampa home?',
        answerHtml:
          '<p>A French drain can help when water repeatedly collects in low areas around a Tampa home and the site conditions allow the water to drain to a suitable outlet. It collects subsurface water and redirects it away from problem areas. We first identify where the water is coming from, since gutter runoff, grading, or downspout discharge may require a different drainage solution.</p>',
      },
      {
        question: 'Does insurance cover gutter replacement in Tampa?',
        answerHtml:
          '<p>Homeowners insurance may cover gutter replacement in Tampa when the damage results from a covered event, such as wind or a storm, subject to your policy, deductible, and claim determination. It generally does not cover replacement caused by normal wear, deterioration, or lack of maintenance.</p>',
      },
    ],
  },
  {
    heading: 'Soffit, Fascia & Gutter-Related Damage',
    items: [
      {
        question: 'Can overflowing gutters damage soffit and fascia in Tampa?',
        answerHtml:
          '<p>Yes. Overflowing gutters can expose the fascia and soffit to repeated moisture, especially during Tampa’s frequent heavy rain. Water spilling over or behind the gutter may contribute to staining, peeling paint, wood deterioration, and moisture damage over time. We recommend addressing the cause of the overflow and inspecting the surrounding roofline components so damaged soffit or fascia does not go unnoticed.</p>',
      },
      {
        question: 'What causes dark stains on the soffit underneath my gutters in Tampa?',
        answerHtml:
          '<p>Dark stains on the soffit underneath Tampa gutters often indicate that water is overflowing, leaking, or getting behind the gutter instead of draining correctly. Clogs, improper pitch, leaking joints, roof runoff, or gutter attachment issues can contribute. In Tampa’s humid climate, persistent moisture can also encourage mildew or algae growth. We inspect the gutter and surrounding roofline to identify the source before recommending repairs.</p>',
      },
      {
        question: 'Should damaged fascia be repaired before installing new gutters in Tampa?',
        answerHtml:
          '<p>Yes. Damaged or deteriorated fascia should generally be repaired before new gutters are installed on a Tampa home. Gutters rely on a solid attachment surface to remain properly secured, particularly during heavy rain and windy conditions. Installing gutters over weakened fascia can lead to loose fasteners, sagging, or separation. We inspect the fascia first and address any areas that could affect a secure, long-lasting gutter installation.</p>',
      },
      {
        question: 'What should I do if my gutters start pulling away after a storm in Tampa?',
        answerHtml:
          '<p>If your gutters start pulling away after a Tampa storm, avoid trying to push or fasten them back into place without checking for underlying damage. High winds, water weight, debris, failed hangers, or damaged fascia may be responsible. We recommend having the gutter system and attachment points inspected promptly to determine whether the gutters can be safely resecured or damaged sections need repair or replacement.</p>',
      },
    ],
  },
  {
    heading: 'Tropical Storms, Hurricanes & Gutter Damage',
    items: [
      {
        question: 'Can tropical storms or high winds pull gutters away from my Tampa home?',
        answerHtml:
          '<p>Yes. Tropical storms and high winds can loosen or pull gutters away from Tampa homes, especially when fasteners, hangers, or fascia are already weakened. Wind-driven debris and heavy rain can add further stress to the system. After severe weather, we recommend checking for loose sections, sagging, separation, and damaged downspouts. A professional inspection can identify attachment damage that may not be obvious from the ground.</p>',
      },
      {
        question: 'Should I clean my gutters before a tropical storm or hurricane in Tampa?',
        answerHtml:
          '<p>Yes. We recommend cleaning your Tampa gutters and downspouts before hurricane season and keeping them clear when severe weather is forecast. Clogged gutters can overflow quickly during intense rainfall, sending water over the gutter edge and around the home. Clearing leaves and debris gives runoff an open drainage path. Any cleaning or inspection should be completed before tropical storm or hurricane conditions reach the area.</p>',
      },
      {
        question: 'Can heavy storm debris damage or clog gutters in Tampa?',
        answerHtml:
          '<p>Yes. Tampa storms can deposit leaves, twigs, palm debris, and other windblown material on roofs and in gutters, restricting water flow and clogging downspouts. Larger debris can also bend gutters or damage attachments. After severe weather has passed and conditions are safe, check for overflowing, sagging, leaks, and visible debris. We can inspect the system and address storm-related gutter damage or blockages.</p>',
      },
    ],
  },
]

/** Flat list for simple accordion rendering without section headings. */
export function flattenFaqPageItems() {
  return FAQ_PAGE_SECTIONS.flatMap((section) => section.items)
}
