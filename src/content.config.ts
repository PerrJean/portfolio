import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Une fiche = un fichier Markdown dans src/content/projets/.
 * L'en-tête est validé au build : une fiche incomplète casse la compilation
 * plutôt que de s'afficher à moitié.
 */
const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string().max(180, 'Le résumé doit tenir en une phrase.'),
    annee: z.number().int(),
    role: z.string(),
    duree: z.string(),
    outils: z.array(z.string()).min(1),
    /** Image héros, pleine largeur sous l'en-tête. Chemin depuis /public. */
    image: z.string(),
    imageAlt: z.string(),
    /** 3 valeurs relatives maximum. Jamais de chiffre business absolu. */
    chiffres: z
      .array(z.object({ valeur: z.string(), legende: z.string() }))
      .max(3)
      .default([]),
    /** Encadré « Ce que j'en retiens », 2 à 4 points. */
    appris: z.array(z.string()).min(1).max(4),
    /** Ordre d'affichage sur l'accueil : par force, pas par date. */
    ordre: z.number().int().default(99),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { projets };
