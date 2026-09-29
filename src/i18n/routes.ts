/**
 * La table de correspondance des adresses, la seule du site.
 * La bascule FR | EN, les <link hreflang> et les liens internes en dérivent.
 */
export const LANGUES = ['fr', 'en'] as const;
export type Langue = (typeof LANGUES)[number];

/** Langue par défaut (sans préfixe), cible de hreflang="x-default". */
export const LANGUE_PAR_DEFAUT: Langue = 'fr';

export const ROUTES = {
  accueil: { fr: '/', en: '/en/' },
  uservoice: { fr: '/projets/uservoice/', en: '/en/projects/uservoice/' },
  auditContenu: { fr: '/projets/audit-contenu/', en: '/en/projects/content-audit/' },
  aPropos: { fr: '/a-propos/', en: '/en/about/' },
} as const satisfies Record<string, Record<Langue, string>>;

export type Page = keyof typeof ROUTES;

/** L'adresse d'une page dans une langue. */
export const chemin = (page: Page, langue: Langue): string => ROUTES[page][langue];
