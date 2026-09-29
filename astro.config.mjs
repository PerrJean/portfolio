// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // À remplacer par l'URL finale une fois l'hébergement choisi (liens absolus, sitemap).
  site: 'https://jeanperrier.pm',
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
