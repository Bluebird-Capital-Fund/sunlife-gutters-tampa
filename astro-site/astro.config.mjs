// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** Canonical production URL (non-www) */
const site = 'https://sunlifegutters.com';

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !/\/lp\//.test(page),
    }),
  ],
});
