/**
 * Les projets de l'accueil, dans les deux langues : la seule source des
 * parcelles. L'adresse de chaque projet vient de la table des routes
 * (src/i18n/routes.ts), par sa clé de page. L'ordre du tableau est celui de
 * l'accueil, « la hauteur d'abord » (registre/0069, 0070), et celui du lien
 * « Projet suivant », en boucle (Projet.astro).
 *
 * groupe :
 *  - « hauteur » : la première paire, sans flèche : 01 la fusion des
 *    plateformes, 02 les mises en situation orales (registre/0070) ;
 *  - « paire » : les deux actes du récit (03 écouter, 04 agir), reliés par
 *    la flèche « Alors j'ai cherché une solution. » ;
 *  - « a-part » : un projet sans rapport avec les paires, numéroté à la
 *    suite, sans flèche : la matrice de compétences (registre/0061).
 *
 * scene : la scène de la carte, par clé de page (Scene.astro, registre/0058) :
 *  - « uservoice » : Jean seul déroule le plan ;
 *  - « audit » : l'équipe rejoint Jean, qui a le plan ouvert ;
 *  - « matrice » : Jean montre le barreau suivant, l'ouvrier monte à
 *    l'échelle (registre/0062) ;
 *  - « fusion » : Jean et l'équipe poussent, les parois de deux cabanes
 *    tombent, il n'en reste qu'une (registre/0069) ;
 *  - « misesEnSituation » : le board se remplit en entonnoir, un seul
 *    post-it ambre ; Jean regarde (registre/0069) ;
 *  - « aucune » : pas de dessin, la carte s'arrête au fait clé (Parcelle.astro).
 */
import type { Langue, Page } from '../i18n/routes';

export type Groupe = 'hauteur' | 'paire' | 'a-part';
export type SceneDeCarte = 'uservoice' | 'audit' | 'matrice' | 'fusion' | 'misesEnSituation' | 'aucune';

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
    page: 'fusion',
    groupe: 'hauteur',
    scene: 'fusion',
    nom: { fr: 'Fusion des plateformes', en: 'Platform merger' },
    fait: {
      fr: 'En 2024, j’ai piloté la fusion de deux de nos trois plateformes : chaque évolution se développe désormais deux fois, et non plus trois.',
      en: 'In 2024, I led the merger of two of our three platforms: every change is now built twice, not three times.',
    },
  },
  {
    numero: '02',
    page: 'misesEnSituation',
    groupe: 'hauteur',
    scene: 'misesEnSituation',
    nom: { fr: 'Mises en situation orales', en: 'Speaking role-plays' },
    fait: {
      fr: 'L’e-learning permet enfin de travailler l’expression orale : une IA joue l’interlocuteur, et chaque échange se termine par un retour.',
      en: 'E-learning can finally help learners practice speaking: an AI plays the other person, and every exchange ends with feedback.',
    },
  },
  {
    numero: '03',
    page: 'uservoice',
    groupe: 'paire',
    scene: 'uservoice',
    nom: { fr: 'UserVoice', en: 'UserVoice' },
    fait: {
      fr: '1 retour négatif sur 3 laissé sur le site concerne le contenu.',
      en: '1 in 3 pieces of negative feedback left on the site is about the content.',
    },
  },
  {
    numero: '04',
    page: 'auditContenu',
    groupe: 'paire',
    scene: 'audit',
    nom: { fr: 'Audit contenu', en: 'Content audit' },
    fait: {
      fr: 'Sur le premier parcours audité, 1 question sur 20 empêchait l’apprenant d’avoir juste. Toutes ont été corrigées.',
      en: 'In the first course audited, 1 question in 20 stopped learners from getting it right. All of them were fixed.',
    },
  },
  {
    numero: '05',
    page: 'matrice',
    groupe: 'a-part',
    scene: 'matrice',
    nom: { fr: 'Matrice de compétences', en: 'Skills matrix' },
    fait: {
      fr: 'Sur une matrice de compétences relue ensemble, un Product Manager de mon équipe et moi sommes passés de deux idées de « devenir senior » à une vision partagée.',
      en: 'Working from a skills matrix we reviewed together, a Product Manager on my team and I went from two ideas of “becoming senior” to a shared view.',
    },
  },
];

/** Le lien entre les deux projets de la paire, porté par la flèche. */
export const LIEN_DE_LA_PAIRE: Record<Langue, string> = {
  fr: 'Alors j’ai cherché une solution.',
  en: 'So I looked for a solution.',
};
