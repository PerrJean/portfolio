/**
 * Le lexique des infobulles (registre/0088) : les douze termes du métier
 * produit, leurs définitions FR et EN reprises mot pour mot de
 * redaction/lexique.md (arrêté par Jean le 2026-10-12). Une définition se
 * corrige là-bas d'abord, ici ensuite.
 *
 * id : l'identifiant stable de la bulle (infobulle-<id>), unique dans la
 * page puisqu'un terme n'y reçoit qu'une bulle.
 * terme : ce que la bulle affiche en gras ; le mot du texte, lui, reste tel
 * quel dans le bouton.
 * motif : la source d'une expression régulière, casse indifférente ; les
 * variantes reconnues (pluriels, ordre des mots en anglais) y sont écrites.
 * texte : la définition, sans point final (la bulle l'ajoute, le repli sans
 * popover non).
 *
 * Une langue absente : pas de bulle dans cette langue. (« discovery » n'a
 * eu de définition qu'en anglais jusqu'à la page « Mon métier en clair »,
 * registre/0094 : sa définition FR a été donnée par Jean le 2026-10-25.)
 */
import type { Langue } from '../../i18n/routes';

export interface Definition {
  terme: string;
  motif: string;
  texte: string;
}

export interface Entree {
  id: string;
  langues: Partial<Record<Langue, Definition>>;
}

// Un espace entre deux mots : ordinaire ou insécable.
const _ = '[\\s\\u00a0]+';

export const LEXIQUE: readonly Entree[] = [
  {
    id: 'backlog',
    langues: {
      fr: { terme: 'Backlog', motif: 'backlogs?', texte: 'la liste, classée par priorité, de ce que l’équipe prévoit de développer' },
      en: { terme: 'Backlog', motif: 'backlogs?', texte: 'the list, ranked by priority, of what the team plans to build' },
    },
  },
  {
    id: 'user-stories',
    langues: {
      fr: {
        terme: 'User stories',
        motif: `user${_}stor(?:y|ies)`,
        texte: 'de courtes descriptions d’un besoin, écrites du point de vue de l’utilisateur, qui disent à l’équipe quoi développer',
      },
      en: {
        terme: 'User stories',
        motif: `user${_}stor(?:y|ies)`,
        texte: 'short descriptions of a need, written from the user’s point of view, telling the team what to build',
      },
    },
  },
  {
    id: 'epics',
    langues: {
      fr: { terme: 'Epics', motif: 'epics?', texte: 'des chantiers trop vastes pour être livrés d’un coup, que l’équipe découpe en plus petits morceaux' },
      en: { terme: 'Epics', motif: 'epics?', texte: 'pieces of work too big to ship in one go, which the team splits into smaller ones' },
    },
  },
  {
    id: 'grooming',
    langues: {
      fr: {
        terme: 'Grooming',
        motif: 'grooming',
        texte: 'la réunion où l’équipe relit et précise ce qu’elle développera ensuite, et en estime l’effort',
      },
      en: {
        terme: 'Grooming',
        motif: 'grooming',
        texte: 'the meeting where the team reviews and clarifies what it will build next, and estimates the effort',
      },
    },
  },
  {
    id: 'delivery',
    langues: {
      fr: { terme: 'Delivery', motif: 'delivery', texte: 'mener ce que l’équipe développe jusqu’à la mise en ligne, dans les délais prévus' },
      en: { terme: 'Delivery', motif: 'delivery', texte: 'taking what the team builds all the way to release, on schedule' },
    },
  },
  {
    id: 'discovery',
    langues: {
      fr: {
        terme: 'Discovery',
        motif: 'discovery',
        texte: 'le travail d’écouter les utilisateurs et de tester des idées avant de décider quoi construire',
      },
      en: {
        terme: 'Discovery',
        motif: 'discovery',
        texte: 'the work of talking to users and testing ideas before deciding what to build',
      },
    },
  },
  {
    id: 'design-sprint',
    langues: {
      fr: {
        terme: 'Design Sprint',
        motif: `design${_}sprints?`,
        texte: 'quelques jours d’ateliers pour passer d’une question à un prototype testé auprès d’utilisateurs',
      },
      en: {
        terme: 'Design Sprint',
        motif: `design${_}sprints?`,
        texte: 'a few days of workshops to go from a question to a prototype tested with users',
      },
    },
  },
  {
    id: 'churn',
    langues: {
      fr: { terme: 'Churn', motif: 'churn', texte: 'le départ des clients qui ne renouvellent pas leur abonnement' },
      en: { terme: 'Churn', motif: 'churn', texte: 'customers leaving by not renewing their subscription' },
    },
  },
  {
    id: 'learning-designer',
    langues: {
      fr: {
        terme: 'Learning designer',
        motif: `learning${_}designers?`,
        texte: 'la personne qui conçoit les contenus et les exercices de formation, et l’ordre dans lequel l’apprenant les suit',
      },
      en: {
        terme: 'Learning designer',
        motif: `learning${_}designers?`,
        texte: 'the person who designs the course content and exercises, and the order learners take them in',
      },
    },
  },
  {
    id: 'product-designer',
    langues: {
      fr: {
        terme: 'Product Designer',
        motif: `product${_}designers?`,
        texte: 'la personne qui conçoit les écrans du produit et la façon de s’en servir, à partir des besoins des utilisateurs',
      },
      en: {
        terme: 'Product Designer',
        motif: `product${_}designers?`,
        texte: 'the person who designs the product’s screens and how people use them, based on what users need',
      },
    },
  },
  {
    id: 'lead-developpeur',
    langues: {
      fr: {
        terme: 'Lead développeur',
        motif: `lead${_}développeurs?`,
        texte: 'le développeur qui guide les autres et tranche les choix techniques',
      },
      en: {
        terme: 'Lead developer',
        motif: `lead${_}developers?`,
        texte: 'the developer who guides the others and makes the final technical calls',
      },
    },
  },
  {
    id: 'scale-up-saas-b2b',
    langues: {
      fr: {
        terme: 'Scale-up SaaS B2B',
        motif: `scale-up${_}SaaS${_}B2B`,
        texte: 'une entreprise en forte croissance qui vend un logiciel en ligne, sur abonnement, à d’autres entreprises',
      },
      en: {
        terme: 'B2B SaaS scale-up',
        motif: `B2B${_}SaaS${_}scale-up`,
        texte: 'a fast-growing company selling online software, by subscription, to other businesses',
      },
    },
  },
];
