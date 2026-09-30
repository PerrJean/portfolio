/**
 * Les projets de l'accueil, dans les deux langues : la seule source des
 * parcelles. L'adresse de chaque projet vient de la table des routes
 * (src/i18n/routes.ts), par sa clé de page.
 *
 * groupe :
 *  - « paire » : les deux actes du récit (01 écouter, 02 agir), reliés par
 *    la flèche « Alors j'ai agi dessus. » ;
 *  - « a-part » : un projet sans rapport avec la paire, numéroté à la suite,
 *    sans flèche. Aucun pour l'instant.
 *
 * scene : la scène de la carte, par clé de page (Scene.astro, registre/0058) :
 *  - « uservoice » : Jean seul déroule le plan ;
 *  - « audit » : l'équipe rejoint Jean, qui a le plan ouvert.
 */
import type { Langue, Page } from '../i18n/routes';

export type Groupe = 'paire' | 'a-part';
export type SceneDeCarte = 'uservoice' | 'audit';

export interface Projet {
  numero: string;
  page: Page;
  groupe: Groupe;
  scene: SceneDeCarte;
  nom: Record<Langue, string>;
  fait: Record<Langue, string>;
}

export const PROJETS: readonly Projet[] = [
  {
    numero: '01',
    page: 'uservoice',
    groupe: 'paire',
    scene: 'uservoice',
    nom: { fr: 'UserVoice', en: 'UserVoice' },
    fait: {
      fr: '1 retour sur 3 laissé sur le site concerne le contenu.',
      en: '1 in 3 pieces of feedback left on the site is about the content.',
    },
  },
  {
    numero: '02',
    page: 'auditContenu',
    groupe: 'paire',
    scene: 'audit',
    nom: { fr: 'Audit contenu', en: 'Content audit' },
    fait: {
      fr: 'Sur le premier parcours audité, 1 question sur 20 empêchait l’apprenant de répondre. Toutes ont été corrigées.',
      en: 'In the first course audited, 1 question in 20 stopped learners from answering. All of them were fixed.',
    },
  },
];

/** Le lien entre les deux projets de la paire, porté par la flèche. */
export const LIEN_DE_LA_PAIRE: Record<Langue, string> = {
  fr: 'Alors j’ai agi dessus.',
  en: 'So I acted on it.',
};
