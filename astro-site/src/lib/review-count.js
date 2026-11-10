/** Canonical public review count used in UI and schema. */
export const CANONICAL_REVIEW_COUNT = 247
export const CANONICAL_REVIEW_COUNT_DISPLAY = '247'
export const CANONICAL_REVIEW_RATING = '4.9'

/**
 * Always show the canonical review count in customer-facing UI.
 * Ignores CMS/stat values so stale lower numbers cannot ship.
 */
export function reviewCountDisplay(_prefix = '', _count = '', _suffix = '') {
  return CANONICAL_REVIEW_COUNT_DISPLAY
}
