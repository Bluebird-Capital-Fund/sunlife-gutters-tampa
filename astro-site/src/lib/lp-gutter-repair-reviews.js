/**
 * Gutter Repair LP testimonials — from Reviews (SGT)/images/Reviews (gutter repair).odt
 * Bold phrases match the document; rendered with .review-quote-highlight (black, bold).
 */

const H = (text) =>
  `<strong class="review-quote-highlight">${text}</strong>`

/** @typedef {{ author: string, avatarSrc: string, timeAgo: string, quoteHtml: string }} LpReview */

/** @type {LpReview[]} */
export const gutterRepairReviews = [
  {
    author: 'Melissa Goldizen',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Melissa Goldizen (SLG).png',
    timeAgo: '',
    quoteHtml: `Sunlife Gutters &amp; Homes did a fantastic job on my ${H('gutter repair!!')} Their team was professional and knowledgeable, and the service was affordable. I would definately reccomend them and will absolutely be using them for future projects!`,
  },
  {
    author: 'Robert Murphy',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Robert Murphy (SLG).png',
    timeAgo: '',
    quoteHtml: `SunLife was hired to ${H('repair gutters')} on our community center. The repairs were performed on time and completed. The owner Kevin and technician were very professional and would definitely recommend them .`,
  },
  {
    author: 'Craig Beggins',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Craig Beggins (SGT).png',
    timeAgo: '',
    quoteHtml: `I hired SunLife Gutter to ${H('repair soffit damage')} from the recent hurricanes. They were on time and courteous. In fact they showed up, did the repairs and left, I barely even spoke to them and they cleaned up well too.`,
  },
  {
    author: 'Joan Andersen',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Joan Andersen (SLG).png',
    timeAgo: '',
    quoteHtml: `SunLife Gutters and Homes recently ${H('replaced a gutter')} for me. I was out of town when it fell. SunLife kept me updated about their schedule and progress via email, phone, and text, which was greatly appreciated by me since I was not at home.`,
  },
  {
    author: 'Charles Thompson',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Charles Thompson (SLG).png',
    timeAgo: '',
    quoteHtml: `I needed leaf protection due to my trees filling my gutters with leaves. I called Sunlife and they were right out with an estimate and install of leaf guards. I had loose water diverters and a lot of shingle sand and leaves. The sand and leaves were cleaned out and the diverters were reattached properly with additional screws. Freddy also added gutter supports in areas he felt needed additional support. Very satisfied with Sunlife gutters. Sunlife will be my go to business for ${H('all gutter needs')}.`,
  },
  {
    author: 'Dorrie',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Dorrie (SGT).png',
    timeAgo: '',
    quoteHtml: `SunLife Gutters staff and work crew were very professional. The ${H('install was effortless')}, the job started on the date they indicated and finished a day later. The teardown and cleanup was impecable! Other than brand new gutters and a super gutter, you would have never known they were here. The gutters are high quality and exactly as quoted.`,
  },
  {
    author: 'Sophia Zhang',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Sophia Zhang (SGT).png',
    timeAgo: '',
    quoteHtml: `SunLife Gutters was incredibly easy to work with. The ${H('installation team')} was great and cleaned up after themselves. So glad we have gutters! Gone are the days of waterfalls in front of our front door! The team even installed these splash/gush guards in places where heavy rainwater might overflow! Fantastic service! They come with a 5 year labor warranty and 20 year manufacturer warranty so we are set with full confidence!`,
  },
  {
    author: 'Jodi McKeithan',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Jodi McKeithan (SLG).png',
    timeAgo: '',
    quoteHtml: `I am very happy with the solution that SunLife Gutters came up with for the flooding our our patio. SunLife came out and suggested a ${H('gutter guard')} down the length of our pool and this solved our problem! Even during heavy rains no rain comes over the gutter and our porch stays dry. We also had them clean out the gutters which were awful and very full of leaves and twigs from the past hurricane. So happy with this company and will call them again to clean out my gutters.`,
  },
]
