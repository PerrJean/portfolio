/**
 * Les collections de contenu (registre/0030). Une seule : les pages projet,
 * un fichier Markdown par projet et par langue, dans src/contenu/projets/.
 * L'en-tête est validé ici : un champ manquant ou mal écrit casse le build.
 * Le corps porte les H2 libres du projet ; le bâtiment en fait ses étages.
 */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { LANGUES, type Page } from './i18n/routes';

/** Les clés de page (src/i18n/routes.ts) qui ont une page projet. */
const CLES = ['uservoice', 'auditContenu', 'matrice'] as const satisfies readonly Page[];

const phrase = z.string().trim().min(1);

/** Une adresse du site, servie depuis public/ (« /captures/… »). */
const adresse = z.string().regex(/^\/[^/]/, 'adresse attendue, relative à la racine du site (« /… »)');
const pixels = z.number().int().positive();

/** Une section de « Pour aller plus loin » : ses points, une image (rendue
 *  comme les figures du corps, ouverte par la visionneuse), un fichier à
 *  télécharger (registre/0061). Au moins l'un des trois. */
const section = z
  .object({
    titre: phrase,
    points: z.array(phrase).min(1).optional(),
    image: z.object({ src: adresse, width: pixels, height: pixels, alt: phrase, legende: phrase }).strict().optional(),
    /** Le lien porte l'attribut download ; le libellé affiché est
     *  « libelle (format, poids) », le poids vérifié au build (Projet.astro). */
    fichier: z.object({ href: adresse, libelle: phrase, format: phrase, poids: phrase }).strict().optional(),
  })
  .strict()
  .refine((s) => s.points || s.image || s.fichier, 'une section porte des points, une image ou un fichier');

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
       *  un sous-titre (<h3>), ses points (<ul>), son image, son fichier. */
      plusLoin: z.array(section).min(1),
      langue: z.enum(LANGUES),
      cle: z.enum(CLES),
    })
    .strict(),
});

export const collections = { projets };
