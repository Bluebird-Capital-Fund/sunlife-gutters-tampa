/**
 * Gutters LP testimonials — from Reviews (SGT)/images/Reviews (gutters).odt
 * Bold phrases match the document; rendered with .review-quote-highlight (black, bold).
 */

const H = (text) =>
  `<strong class="review-quote-highlight">${text}</strong>`

/** @typedef {{ author: string, avatarSrc: string, timeAgo: string, quoteHtml: string }} LpReview */

/** @type {LpReview[]} */
export const guttersReviews = [
  {
    author: 'Geily Sanchez',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Geily Sanchez (SGT).png',
    timeAgo: '',
    quoteHtml: `We had a great experience with this company ${H('installing our new gutters')} and front porch screen. From the initial estimate to the final installation, the team was professional, courteous, and easy to work with. They showed up on time, communicated clearly throughout the process, and paid close attention to every detail. I highly recommend this company to anyone looking for reliable, high-quality service. We're very happy with the results and would definitely use them again for future projects.`,
  },
  {
    author: 'Rick Romero',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Rick Romero (SGT).png',
    timeAgo: '',
    quoteHtml: `After receiving several quotes, we chose SunLife Gutters for our project. Their pricing was very fair, and their team of installers was professional, efficient, and courteous. The ${H('seamless gutters')} they installed look fantastic and perform exactly as promised. We highly recommend Sunlife Gutters to anyone considering a gutter installation.`,
  },
  {
    author: 'Danielle Harding',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Danielle Harding (SGT).png',
    timeAgo: '',
    quoteHtml: `Jessica and Paola were both so responsive to any questions I had. They worked with us on scheduling our ${H('seamless gutter installation')} around some other projects we had going on and the installation was so efficient. The results are amazing and we will definitely be utilizing them for future projects. Can't recommend them enough!`,
  },
  {
    author: 'EG Gregory',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/EG Gregory (SGT).png',
    timeAgo: '',
    quoteHtml: `I highly recommend SunLife Gutters if you are looking for a great company to ${H('install seamless gutters')} for a reasonable and fair price. Jess and Kevin, the owners, were terrific to work with from getting the estimate, making our appointment, and hiring professionals to install the gutters. Thank you again for making this an easy process- we got our gutters installed just in time for the rainy season!`,
  },
  {
    author: 'Elaine Jackson',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Elaine Jackson (SLG).png',
    timeAgo: '',
    quoteHtml: `Great experience, price and service! The ${H('gutter guards')} are far more affordable than competitors, allowing us to finally have these and avoid the ladders later! Highly recommend!!`,
  },
  {
    author: 'Melissa Goldizen',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Melissa Goldizen (SLG).png',
    timeAgo: '',
    quoteHtml: `Sunlife Gutters &amp; Homes did a fantastic job on my ${H('gutter repair')}!! Their team was professional and knowledgeable, and the service was affordable. I would definately reccomend them and will absolutely be using them for future projects!`,
  },
  {
    author: 'Joan Andersen',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Joan Andersen (SLG).png',
    timeAgo: '',
    quoteHtml: `SunLife Gutters and Homes recently ${H('replaced a gutter')} for me. I was out of town when it fell. SunLife kept me updated about their schedule and progress via email, phone, and text, which was greatly appreciated by me since I was not at home.`,
  },
  {
    author: 'Angela Ujvary',
    avatarSrc: 'Media (SGT)/Reviews (SGT)/Angela Ujvary (SLG).png',
    timeAgo: '',
    quoteHtml: `I REALLY needed ${H('new gutters')} on my house and after getting several quotes, I went with SunLife. They were incredibly easy to work with. They walked me through every step of the process. They showed up on time and got everything done without leaving a mess. I highly recommend them to anyone that needs new gutters.`,
  },
]
