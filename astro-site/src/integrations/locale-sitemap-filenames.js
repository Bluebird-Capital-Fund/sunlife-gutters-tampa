/**
 * Post-build: rename chunked locale sitemaps to sitemap-en.xml / sitemap-es.xml
 * and point sitemap-index.xml at those files.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * @returns {import('astro').AstroIntegration}
 */
export function localeSitemapFilenames() {
  return {
    name: 'locale-sitemap-filenames',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir)
        const enSrc = path.join(dist, 'sitemap-en-0.xml')
        const esSrc = path.join(dist, 'sitemap-es-0.xml')
        const enDest = path.join(dist, 'sitemap-en.xml')
        const esDest = path.join(dist, 'sitemap-es.xml')
        const indexPath = path.join(dist, 'sitemap-index.xml')
        const pagesChunk = path.join(dist, 'sitemap-pages-0.xml')

        if (!fs.existsSync(enSrc) || !fs.existsSync(esSrc)) {
          logger.warn(
            'Expected sitemap-en-0.xml and sitemap-es-0.xml were not found; skipping rename.',
          )
          return
        }

        fs.renameSync(enSrc, enDest)
        fs.renameSync(esSrc, esDest)

        if (fs.existsSync(pagesChunk)) {
          // Should be empty/unused when every URL is assigned to en or es.
          const xml = fs.readFileSync(pagesChunk, 'utf8')
          const hasUrl = /<url[\s>]/i.test(xml)
          if (!hasUrl) fs.unlinkSync(pagesChunk)
          else logger.warn('sitemap-pages-0.xml still has URLs; leaving file in place.')
        }

        const origin = 'https://sunlifegutters.com'
        const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${origin}/sitemap-en.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${origin}/sitemap-es.xml</loc>
  </sitemap>
</sitemapindex>
`
        fs.writeFileSync(indexPath, indexXml, 'utf8')

        // Drop leftover numbered indexes if the integration wrote any.
        for (const name of fs.readdirSync(dist)) {
          if (/^sitemap-(en|es)-\d+\.xml$/i.test(name)) {
            fs.unlinkSync(path.join(dist, name))
          }
        }

        logger.info('Wrote sitemap-index.xml → sitemap-en.xml + sitemap-es.xml')
      },
    },
  }
}
