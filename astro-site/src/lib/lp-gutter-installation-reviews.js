/**
 * Gutter Installation LP reviews — from Reviews (SGT)/images/Reviews (gutter guards).odt
 * Bold phrases match the document highlights.
 */
import { escapeHtml } from './sanity-strings.js'

/** @typedef {{ author: string, timeAgo: string, avatarSrc: string, quote: string, boldPhrases: string[] }} LpReview */

/** @type {LpReview[]} */
export const GUTTER_INSTALLATION_LP_REVIEWS = [
  {
    author: 'Jodi McKeithan',
    timeAgo: '',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Jodi McKeithan (SGT).png',
    quote:
      'I am very happy with the solution that SunLife Gutters came up with for the flooding our our patio. SunLife came out and suggested a gutter guard down the length of our pool and this solved our problem! Even during heavy rains no rain comes over the gutter and our porch stays dry. So happy with this company and will call them again to clean out my gutters.',
    boldPhrases: ['gutter guard'],
  },
  {
    author: 'Charles Thompson',
    timeAgo: '',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Charles Thompson (SGT).png',
    quote:
      'I needed leaf protection due to my trees filling my gutters with leaves. I called Sunlife and they were right out with an estimate and install of leaf guards. I liked everyone I dealt with. Phone calls were answered, price was good, really good warranty, and the installation by Freddy and his helper was excellent. They went above and beyond what I expected. Very satisfied with Sunlife gutters. Sunlife will be my go to business for all gutter needs.',
    boldPhrases: ['leaf protection'],
  },
  {
    author: 'Barry C',
    timeAgo: '',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Barry C (SGT).png',
    quote:
      "I first used SunLife G&H to install gutters at my rental property in Temple Terrace. They did such a great job I had them do another section to the house. I then had them install gutters and leaf guards to 2 more rentals in Largo. The quality of product and install is the best I've ever found. I highly recommend them.",
    boldPhrases: ['install gutters and leaf guards'],
  },
  {
    author: 'M Yoder',
    timeAgo: '',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/M Yoder (SGT).png',
    quote:
      'Wow!!!! Remarkable craftsmanship and customer friendly. On installation day, Oliver and Carlos worked meticulously fitting the gutters and downspouts. They also took much time ensuring the gutters fit perfectly under the drip edge of the roof. The team also placed gutter guards on the gutters that historically plugged from tree coverage. I am very pleased with the service!!!!',
    boldPhrases: ['gutter guards'],
  },
  {
    author: 'Elaine Jackson',
    timeAgo: '',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Elaine Jackson (SGT).png',
    quote:
      'Great experience, price and service! The gutter guards are far more affordable than competitors, allowing us to finally have these and avoid the ladders later! Highly recommend!!',
    boldPhrases: ['gutter guards'],
  },
  {
    author: 'Eunmi Park',
    timeAgo: '',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Eunmi Park (SGT).png',
    quote:
      'We installed gutter and leaf guard. They finished the job correctly and cleaned after finishing. I am happy with job they did.',
    boldPhrases: ['installed gutter and leaf guard'],
  },
  {
    author: 'Mark Weinus',
    timeAgo: '',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Mark Weinus (SGT).png',
    quote: 'They did a great job installing my gutter and leaf guard. Very professional.',
    boldPhrases: ['installing my gutter and leaf guard.'],
  },
  {
    author: 'Jordan Thompson',
    timeAgo: '',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Jordan Thompson (SGT).png',
    quote:
      "Such a great company to work with. If you're looking for gutter installation, covers or anything gutter related in the greater Tampa Area, these are your people!",
    boldPhrases: [],
  },
]

/**
 * Escape quote and wrap document-highlighted phrases in <strong>.
 * @param {string} quote
 * @param {string[]} boldPhrases
 */
export function highlightReviewQuote(quote, boldPhrases = []) {
  let html = escapeHtml(quote)
  const phrases = Array.isArray(boldPhrases) ? [...boldPhrases] : []
  // Longer phrases first so nested/overlapping matches stay correct
  phrases.sort((a, b) => b.length - a.length)
  for (const phrase of phrases) {
    const trimmed = String(phrase || '').trim()
    if (!trimmed) continue
    const needle = escapeHtml(trimmed)
    const idx = html.indexOf(needle)
    if (idx === -1) continue
    html =
      html.slice(0, idx) +
      `<strong class="review-quote-highlight">${needle}</strong>` +
      html.slice(idx + needle.length)
  }
  return html
}

/**
 * Chunk reviews into pages of `perPage` for the carousel.
 * @param {LpReview[]} reviews
 * @param {number} [perPage=4]
 */
export function chunkReviews(reviews, perPage = 4) {
  const list = Array.isArray(reviews) ? reviews : []
  const pages = []
  for (let i = 0; i < list.length; i += perPage) {
    pages.push(list.slice(i, i + perPage))
  }
  return pages
}
