/**
 * Les collections de contenu (registre/0030). Une seule : les pages projet,
 * un fichier Markdown par projet et par langue, dans src/contenu/projets/.
 * L'en-tête est validé ici : un champ manquant ou mal écrit casse le build.
 * Le corps porte les H2 libres du projet ; le bâtiment en fait ses étages.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { LANGUES, type Page } from './i18n/routes';

/** Les clés de page (src/i18n/routes.ts) qui ont une page projet. */
const CLES = ['uservoice', 'auditContenu'] as const satisfies readonly Page[];

const phrase = z.string().trim().min(1);

const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/contenu/projets' }),
  schema: z
    .object({
      titre: phrase,
      /** Le mois du projet, AAAA-MM, affiché sous le titre (registre/0045). */
      date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'date attendue au format AAAA-MM'),
      /** Le fait clé, affiché en grand sous le titre. */
      fait: phrase,
      /** La synthèse recruteur : trois phrases. */
      synthese: z.object({ probleme: phrase, action: phrase, resultat: phrase }).strict(),
      /** « Pour aller plus loin », replié (registre/0048) : des sections, chacune
       *  un sous-titre (<h3>) et ses points (<ul>). */
      plusLoin: z
        .array(z.object({ titre: phrase, points: z.array(phrase).min(1) }).strict())
        .min(1),
      langue: z.enum(LANGUES),
      cle: z.enum(CLES),
    })
    .strict(),
});

export const collections = { projets };
