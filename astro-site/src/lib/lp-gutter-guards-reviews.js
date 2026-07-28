/**
 * Gutter Guards LP testimonials — from Reviews (SGT)/images/Reviews (gutter guards).odt
 * Bold phrases match the document; rendered with .review-quote-highlight (black, bold).
 */

const H = (text) =>
  `<strong class="review-quote-highlight">${text}</strong>`

/** @typedef {{ author: string, avatarSrc: string, timeAgo: string, quoteHtml: string }} LpReview */

/** @type {LpReview[]} */
export const gutterGuardsReviews = [
  {
    author: 'Jodi McKeithan',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Jodi McKeithan (SLG).png',
    timeAgo: '',
    quoteHtml: `I am very happy with the solution that SunLife Gutters came up with for the flooding our our patio. SunLife came out and suggested a ${H('gutter guard')} down the length of our pool and this solved our problem! Even during heavy rains no rain comes over the gutter and our porch stays dry. So happy with this company and will call them again to clean out my gutters.`,
  },
  {
    author: 'Charles Thompson',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Charles Thompson (SLG).png',
    timeAgo: '',
    quoteHtml: `I needed ${H('leaf protection')} due to my trees filling my gutters with leaves. I called Sunlife and they were right out with an estimate and install of leaf guards. I liked everyone I dealt with. Phone calls were answered, price was good, really good warranty, and the installation by Freddy and his helper was excellent. They went above and beyond what I expected. Very satisfied with Sunlife gutters. Sunlife will be my go to business for all gutter needs.`,
  },
  {
    author: 'Barry C',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Barry C (SLG).png',
    timeAgo: '',
    quoteHtml: `I first used SunLife G&amp;H to install gutters at my rental property in Temple Terrace. They did such a great job I had them do another section to the house. I then had them ${H('install gutters and leaf guards')} to 2 more rentals in Largo. The quality of product and install is the best I've ever found. I highly recommend them.`,
  },
  {
    author: 'M Yoder',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/M Yoder (SGT).png',
    timeAgo: '',
    quoteHtml: `Wow!!!! Remarkable craftsmanship and customer friendly. On installation day, Oliver and Carlos worked meticulously fitting the gutters and downspouts. They also took much time ensuring the gutters fit perfectly under the drip edge of the roof. The team also placed ${H('gutter guards')} on the gutters that historically plugged from tree coverage. I am very pleased with the service!!!!`,
  },
  {
    author: 'Elaine Jackson',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Elaine Jackson (SLG).png',
    timeAgo: '',
    quoteHtml: `Great experience, price and service! The ${H('gutter guards')} are far more affordable than competitors, allowing us to finally have these and avoid the ladders later! Highly recommend!!`,
  },
  {
    author: 'Eunmi Park',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Eunmi Park (SLG).png',
    timeAgo: '',
    quoteHtml: `We ${H('installed gutter and leaf guard')}. They finished the job correctly and cleaned after finishing. I am happy with job they did.`,
  },
  {
    author: 'Mark Weinus',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Mark Weinus (SLG).png',
    timeAgo: '',
    quoteHtml: `They did a great job ${H('installing my gutter and leaf guard.')} Very professional.`,
  },
  {
    author: 'Jordan Thompson',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Jordan Thompson (SLG).png',
    timeAgo: '',
    quoteHtml: `Such a great company to work with. If you're looking for gutter installation, covers or anything gutter related in the greater Tampa Area, these are your people!`,
  },
]

/** @param {LpReview[]} items @param {number} size */
export function chunkReviews(items, size = 4) {
  const pages = []
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size))
  }
  return pages
}
