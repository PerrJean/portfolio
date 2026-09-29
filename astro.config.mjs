// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  // Le labo (pages d'essai, noindex) reste hors du plan du site.
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/labo/') })],
});
