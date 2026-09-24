// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import {
  sitemapChunkEn,
  sitemapChunkEs,
  sitemapCustomPages,
  sitemapIncludePage,
  sitemapSerialize,
} from './src/lib/sitemap-urls.js';
import { localeSitemapFilenames } from './src/integrations/locale-sitemap-filenames.js';

/** Canonical production URL (non-www) */
const site = 'https://sunlifegutters.com';

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: sitemapIncludePage,
      // Public location URLs are Vercel rewrites of /locations/* — add canonical paths.
      customPages: sitemapCustomPages(site),
      serialize: sitemapSerialize,
      // Split into English + Spanish sitemap files (renamed to sitemap-en.xml / sitemap-es.xml).
      chunks: {
        en: sitemapChunkEn,
        es: sitemapChunkEs,
      },
    }),
    localeSitemapFilenames(),
  ],
});
