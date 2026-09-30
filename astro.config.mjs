// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { rehypeSchemas } from './src/components/schemas/rehype-schemas.mjs';

// Le labo (src/labo/, pages d'essai des animations) : servi par le serveur
// de dev à /labo/scene/, jamais construit ni publié (registre/0053).
const labo = () => ({
  name: 'labo',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev') injectRoute({ pattern: '/labo/scene', entrypoint: './src/labo/scene.astro' });
    },
  },
});

export default defineConfig({
  site: 'https://jeanperrier.pm',
  trailingSlash: 'always',
  // Astro 7 compresse le HTML à la manière de JSX par défaut, ce qui colle
  // les éléments en ligne (« FR | EN » devient « FR|EN ») : on garde la
  // compression HTML d'Astro 5 (registre/0027).
  compressHTML: true,
  // Français par défaut, sans préfixe ; anglais sous /en/.
  // Les adresses et leurs jumelles : src/i18n/routes.ts.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // Les schémas des pages projet : un marqueur <div data-schema="…"></div>
  // dans le Markdown, remplacé au build (src/components/schemas/). Sätteri
  // est le processeur Markdown d'Astro 7 (registre/0027).
  markdown: { processor: satteri({ hastPlugins: [rehypeSchemas] }) },
  integrations: [sitemap(), labo()],
});
