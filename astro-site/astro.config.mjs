// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { sitemapCustomPages, sitemapIncludePage } from './src/lib/sitemap-urls.js';

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
    }),
  ],
});
