// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeSchemas } from './src/components/schemas/rehype-schemas.mjs';

export default defineConfig({
  site: 'https://jeanperrier.pm',
  trailingSlash: 'always',
  // Français par défaut, sans préfixe ; anglais sous /en/.
  // Les adresses et leurs jumelles : src/i18n/routes.ts.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // Les schémas des pages projet : un marqueur <div data-schema="…"></div>
  // dans le Markdown, remplacé au build (src/components/schemas/).
  markdown: { rehypePlugins: [rehypeSchemas] },
  // Le labo (pages d'essai, noindex) reste hors du plan du site.
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/labo/') })],
});
