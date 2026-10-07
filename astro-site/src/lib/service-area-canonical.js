import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/** Builds run from astro-site/; the repo-root vercel.json is the deployed config. */
const VERCEL_JSON_FILES = [resolve(process.cwd(), '..', 'vercel.json'), resolve(process.cwd(), 'vercel.json')]

let cached

/** Map of /locations/{slug}/ to its public /service-area/... URL, from the vercel.json rewrites. */
function getLocationToServiceAreaMap() {
  if (cached) return cached
  cached = new Map()
  for (const file of VERCEL_JSON_FILES) {
    if (!existsSync(file)) continue
    try {
      const { rewrites = [] } = JSON.parse(readFileSync(file, 'utf8'))
      for (const r of rewrites) {
        if (typeof r?.source !== 'string' || typeof r?.destination !== 'string') continue
        if (!r.source.startsWith('/service-area/') || !r.destination.startsWith('/locations/')) continue
        if (!cached.has(r.destination)) cached.set(r.destination, r.source)
      }
    } catch {
      continue
    }
  }
  return cached
}

/**
 * @param {string} slug locationPage slug (as in /locations/{slug}/)
 * @returns {string} public /service-area/... path, or '' if the location isn't rewritten
 */
export function serviceAreaPathForLocation(slug) {
  return getLocationToServiceAreaMap().get(`/locations/${slug}/`) || ''
}
