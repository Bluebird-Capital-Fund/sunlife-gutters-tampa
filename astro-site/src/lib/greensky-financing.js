/**
 * GreenSky financing — single source of truth for SunLife Gutters Tampa.
 * Gutter Group. Do not invent or alter plan terms, APRs, or disclosures.
 */

export const GREENSKY_FINANCING = {
  companyName: 'SunLife Gutters Tampa',
  financingGroup: 'gutter',
  merchantId: '81138939',
  pageUrl: '/financing/',
  greenskyDetailsPhone: '866-936-0602',
  bannerEyebrow: 'FINANCING AVAILABLE',
  bannerSupport: 'Fix Now, Pay Over Time',
  ctaHeading: 'READY TO GET STARTED?',
  ctaText: 'Call Now to Learn About Financing Options',
  ctaFinePrintPrefix: 'Financing subject to credit approval. See ',
  ctaFinePrintLink: 'Important Financing Terms',
  viewAllLabel: 'View All Financing Options',
  termsAnchor: '#financing-terms',
  termsHeading: 'IMPORTANT FINANCING TERMS',
  importantTermsLabel: 'Important Financing Terms',
  primaryPlanIds: ['2613', '2717'],
  additionalPlanIds: ['2602'],
  availablePlanIds: ['2613', '2717', '2602'],
}

/** @typedef {{ id: string, footnote: string, disclosure: string }} GreenSkyPlan */

/** @type {Record<string, GreenSkyPlan & Record<string, string>>} */
export const GREENSKY_PLANS = {
  '2613': {
    id: '2613',
    footnote: '1',
    bannerKicker: '',
    bannerHeadline: 'NO INTEREST IF PAID IN FULL',
    bannerHeadlineRest: 'WITHIN 12 MONTHS',
    bannerSupporting: 'Available on qualifying projects of $2,500 or more.',
    bannerNearby:
      'Interest is billed during promo period but will be waived if the amount financed is paid in full before promo period expires.',
    bannerSmall: '',
    pageEyebrow: 'OPTION 1',
    pageCategory: 'PROMOTIONAL FINANCING',
    pageHeadline: 'NO INTEREST IF PAID IN FULL',
    pageHeadlineRest: 'WITHIN 12 MONTHS',
    pageBody: [
      'Available on qualifying projects of $2,500 or more.',
      'Interest is billed during promo period but will be waived if the amount financed is paid in full before promo period expires.',
      'Monthly payments are required during the promotional period. Making only the required monthly payments will not pay off the amount financed by the promotional period expiration date.',
    ],
    disclosure:
      'Plan 2613. Subject to credit approval. APR Rates range from 17.99%-29.99% (fixed periodic interest rates range from 17.99%-29.99%). Only well-qualified applicants will receive an APR of 17.99%; some applicants may not qualify. Loan amount and rate will vary based on your income and creditworthiness. 12 month promotional period (Promo Period) during which interest is billed but will be waived if the amount financed is paid in full before Promo Period expires. Monthly payments are required during the Promo Period, but making only the required monthly payments will not pay off the amount financed by Promo Period expiration date. Any unpaid balance and amounts owed after Promo Period will be paid over 72 monthly payments. Example for $10,000 loan: 29.99% APR, 84 monthly payments of $285.87. Actual payments based on amounts and timing of purchases. Call 866-936-0602 for details.',
  },
  '2717': {
    id: '2717',
    footnote: '2',
    bannerKicker: '',
    bannerHeadline: '5 YEAR',
    bannerHeadlineRest: 'FIXED MONTHLY PAYMENTS',
    bannerSupporting: '7.99% Fixed Interest Rate',
    bannerNearby: '',
    bannerSmall: '60-month loan term. See Important Financing Terms for APR and payment details.',
    pageEyebrow: 'OPTION 2',
    pageCategory: 'FIXED-RATE FINANCING',
    pageHeadline: '5 YEAR',
    pageHeadlineRest: 'FIXED MONTHLY PAYMENTS',
    pageBody: [
      '7.99% Fixed Interest Rate',
      '60-month loan term.',
      'See Important Financing Terms for APR, payment example, origination fee information, and complete terms.',
    ],
    disclosure:
      'Plan 2717. Subject to credit approval. Loan term is 60 months. Fixed 8.37% APR (fixed periodic interest rate of 7.99%). APR assumes an origination fee of $89 for a $10,000 loan; origination fee is added to the minimum payment due on the first payment. Not all loans include an origination fee. Example for $10,000 loan with $89 origination fee: 8.37% APR, fixed periodic interest rate of 7.99%, 1 payment of $291.72 followed by 59 monthly payments of $202.72. Actual payment amounts and APR may vary. Call 866-936-0602 for details.',
  },
  '2602': {
    id: '2602',
    footnote: '3',
    bannerKicker: '',
    bannerHeadline: '',
    bannerHeadlineRest: '',
    bannerSupporting: '',
    bannerNearby: '',
    bannerSmall: '',
    pageEyebrow: 'ADDITIONAL OPTION',
    pageCategory: 'Additional Financing Options',
    pageHeadline: '6-Month Promotional Financing Available',
    pageHeadlineRest: '',
    pageBody: [
      'Plan 2602 provides a 6-month promotional period during which interest is billed but will be waived if the amount financed is paid in full before the promotional period expires.',
      'Monthly payments are required.',
    ],
    disclosure:
      'Plan 2602. Subject to credit approval. APR Rates range from 17.99%-29.99% (fixed periodic interest rates range from 17.99%-29.99%). Only well-qualified applicants will receive an APR of 17.99%; some applicants may not qualify. Loan amount and rate will vary based on your income and creditworthiness. 6 month promotional period (Promo Period) during which interest is billed but will be waived if the amount financed is paid in full before Promo Period expires. Monthly payments are required during the Promo Period, but making only the required monthly payments will not pay off the amount financed by Promo Period expiration date. Any unpaid balance and amounts owed after Promo Period will be paid over 78 monthly payments. Example for $10,000 loan: 29.99% APR, 84 monthly payments of $285.87. Actual payments based on amounts and timing of purchases. Call 866-936-0602 for details.',
  },
}

export const GREENSKY_MAIN_DISCLOSURE =
  'Loans for the GreenSky® consumer loan program are offered and made by federally insured, federal or state chartered financial institutions providing credit without regard to age, race, color, religion, national origin, gender, disability, or familial status. A list of financial institutions currently providing loans through the GreenSky® Program is available at www.greensky.com/bank-partners. GreenSky Servicing, LLC services the loans on behalf of your lender, NMLS #1416362. www.nmlsconsumeraccess.org/. GreenSky® is a registered trademark of GreenSky, LLC and is licensed to banks and other financial institutions for their use in connection with that consumer loan program. GreenSky Servicing, LLC is a financial technology company that manages the GreenSky® consumer loan program by providing origination and servicing support to banks and other financial institutions that make or hold program loans. GreenSky, LLC and GreenSky Servicing, LLC are not lenders. All credit decisions and loan terms are determined by program lenders.'

export const GREENSKY_MAIN_DISCLOSURE_LINKS = [
  { href: 'https://www.greensky.com/bank-partners', label: 'www.greensky.com/bank-partners' },
  { href: 'https://www.nmlsconsumeraccess.org/', label: 'www.nmlsconsumeraccess.org/' },
]

export function getPrimaryPlans() {
  return GREENSKY_FINANCING.primaryPlanIds.map((id) => GREENSKY_PLANS[id])
}

export function getAdditionalPlans() {
  return GREENSKY_FINANCING.additionalPlanIds.map((id) => GREENSKY_PLANS[id])
}

export function getAdvertisedPlans() {
  return GREENSKY_FINANCING.availablePlanIds.map((id) => GREENSKY_PLANS[id])
}

export function linkifyMainDisclosure(text) {
  let html = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  GREENSKY_MAIN_DISCLOSURE_LINKS.forEach((link) => {
    const escaped = link.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    html = html.replace(
      new RegExp(escaped, 'g'),
      `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
    )
  })
  return html
}
