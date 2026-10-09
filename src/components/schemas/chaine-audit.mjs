// Le schéma de la chaîne d'Audit contenu (registre/0041), en FR et en EN.
// Le seul endroit où il vit : le plugin rehype-schemas.mjs l'insère dans la
// page à la place du marqueur <div data-schema="chaine-audit"></div>.
//
// Au trait, dans le style du bâtiment : cadres à angles droits à l'encre,
// liaisons en ardoise, l'étape humaine repérée par une fenêtre allumée
// (l'ambre, la lumière). Styles : chaine-audit.css. Le dessin est
// aria-hidden ; son contenu est redit en texte, dans une liste ordonnée
// visuellement masquée, pour les lecteurs d'écran. Aucun H2 (le bâtiment
// compte les H2), aucune animation.

const NBSP = ' ';

/**
 * Les textes. Chaque étape a son titre et sa ligne pour le dessin, et sa
 * phrase complète (lu) pour la liste lue par les lecteurs d'écran.
 */
const TEXTES = {
  fr: {
    intro: `La chaîne de l’audit, étape par étape${NBSP}:`,
    parallele: 'En parallèle',
    parcours: {
      titre: 'Parcours',
      texte: 'Ses questions, chacune avec sa réponse et son explication.',
      lu: `Le parcours${NBSP}: ses questions, chacune avec sa réponse et son explication.`,
    },
    agents: {
      titre: 'Grille appliquée par une IA',
      texte: `La grille des six critères. La réponse attendue est-elle la bonne${NBSP}? L’explication existe-t-elle${NBSP}? Fait-elle plus que répéter la réponse${NBSP}?`,
    },
    controles: {
      titre: 'Contrôles automatiques',
      texte: `Des règles fixes, puis une IA${NBSP}: l’audio, les supports, la question, les réponses et l’explication concordent-ils${NBSP}?`,
    },
    deuxControles:
      `Deux contrôles en parallèle. Une IA applique la grille des six critères, question par question${NBSP}: ` +
      'elle vérifie que la réponse attendue est la bonne, que l’explication existe et ne se contente pas de répéter la réponse. ' +
      'Les contrôles automatiques, des règles fixes puis une IA, vérifient que l’audio, par sa transcription, ' +
      'les supports texte et image, la question, les réponses et l’explication concordent.',
    bilan: {
      titre: 'Bilan',
      texte: `Un verdict par question${NBSP}: bloquant, majeur, mineur ou rien à corriger.`,
      lu: `Le bilan${NBSP}: un verdict par question, bloquant, majeur, mineur ou rien à corriger.`,
    },
    relecture: {
      titre: 'Relecture humaine',
      texte: 'La learning designer relit un échantillon par famille de défauts.',
      lu: `La relecture humaine${NBSP}: la learning designer relit un échantillon par famille de défauts.`,
    },
    lots: {
      titre: 'Lots de corrections',
      texte: 'Rangés par famille de défauts, jamais écrits directement en base.',
      lu: 'Les lots de corrections, rangés par famille de défauts, jamais écrits directement en base.',
    },
    ligne: {
      titre: 'Mise en ligne',
      texte: 'Sur un site de test, puis sur le site.',
      lu: `La mise en ligne${NBSP}: sur un site de test, puis sur le site.`,
    },
    legende: `Du parcours à la mise en ligne${NBSP}: deux contrôles en parallèle, puis une relecture humaine par échantillon.`,
  },
  en: {
    intro: 'The audit chain, step by step:',
    parallele: 'In parallel',
    parcours: {
      titre: 'Course',
      texte: 'Its questions, each with its answer and its explanation.',
      lu: 'The course: its questions, each with its answer and its explanation.',
    },
    agents: {
      titre: 'Grid applied by an AI',
      texte: 'The six-criterion grid. Is the expected answer the right one? Is there an explanation? Does it do more than repeat the answer?',
    },
    controles: {
      titre: 'Automated checks',
      texte: 'Fixed rules, then an AI: are the audio, the materials, the question, the answers and the explanation consistent?',
    },
    deuxControles:
      'Two checks in parallel. An AI applies the six-criterion grid, question by question: ' +
      'it verifies that the expected answer is the right one, that there is an explanation, and that the explanation does more than repeat the answer. ' +
      'The automated checks, fixed rules then an AI, verify that the audio, through its transcript, ' +
      'the text and image materials, the question, the answers and the explanation are consistent.',
    bilan: {
      titre: 'Report',
      texte: 'One verdict per question: blocking, major, minor or nothing to fix.',
      lu: 'The report: one verdict per question, blocking, major, minor or nothing to fix.',
    },
    relecture: {
      titre: 'Human review',
      texte: 'The learning designer reviews a sample from each family of defects.',
      lu: 'Human review: the learning designer reviews a sample from each family of defects.',
    },
    lots: {
      titre: 'Fix batches',
      texte: 'Grouped by family of defects, never written straight to the database.',
      lu: 'Fix batches, grouped by family of defects, never written straight to the database.',
    },
    ligne: {
      titre: 'Going live',
      texte: 'On a test site, then on the live site.',
      lu: 'Going live: on a test site, then on the live site.',
    },
    legende: 'From course to going live: two checks in parallel, then a human review by sample.',
  },
};

/** Les langues servies. */
export const LANGUES_SCHEMA = Object.keys(TEXTES);

const ECHAPPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const e = (s) => String(s).replace(/[&<>"]/g, (c) => ECHAPPE[c]);

/** Une flèche vers le bas, au trait ; le CSS la tourne vers la droite en grand écran. */
const FLECHE =
  '<svg class="chaine__pointe" viewBox="0 0 14 28" width="14" height="28" focusable="false">' +
  '<path d="M7 1V26M2 20.5L7 26L12 20.5" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

/** Le bout seul, pour la liaison qui change de rangée. */
const BOUT =
  '<svg class="chaine__bout" viewBox="0 0 14 8" width="14" height="8" focusable="false">' +
  '<path d="M2 1.5L7 7L12 1.5" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

const fleche = () => `<span class="chaine__fleche">${FLECHE}</span>`;

/** Un cadre : titre et ligne. humaine : la fenêtre allumée. */
const etape = ({ titre, texte }, { classe = '', humaine = false } = {}) =>
  `<span class="chaine__etape${classe ? ` ${classe}` : ''}${humaine ? ' chaine__etape--humaine' : ''}">` +
  (humaine ? '<span class="chaine__lumiere"></span>' : '') +
  `<span class="chaine__titre">${e(titre)}</span>` +
  `<span class="chaine__texte">${e(texte)}</span>` +
  '</span>';

/**
 * Le HTML du schéma dans une langue. Ordre du DOM = ordre de lecture ; la
 * grille le range en deux rangées de trois en grand écran, en colonne au
 * téléphone.
 */
export function schemaChaineAudit(langue) {
  const t = TEXTES[langue];
  if (!t) throw new Error(`Schéma chaine-audit : langue « ${langue} » inconnue (attendu : ${LANGUES_SCHEMA.join(', ')}).`);

  const dessin =
    '<div class="chaine__dessin" aria-hidden="true">' +
    etape(t.parcours, { classe: 'chaine__etape--centre' }) +
    fleche() +
    '<span class="chaine__groupe">' +
    `<span class="chaine__parallele">${e(t.parallele)}</span>` +
    '<span class="chaine__paire">' +
    etape(t.agents) +
    etape(t.controles) +
    '</span>' +
    '</span>' +
    fleche() +
    `<span class="chaine__bilan">${etape(t.bilan)}</span>` +
    `<span class="chaine__retour">${FLECHE}<span class="chaine__trace">${BOUT}</span></span>` +
    etape(t.lots) +
    fleche() +
    etape(t.relecture, { humaine: true }) +
    fleche() +
    etape(t.ligne) +
    '</div>';

  const lu =
    '<div class="visuellement-cache">' +
    `<p>${e(t.intro)}</p>` +
    '<ol>' +
    [t.parcours.lu, t.deuxControles, t.bilan.lu, t.lots.lu, t.relecture.lu, t.ligne.lu]
      .map((phrase) => `<li>${e(phrase)}</li>`)
      .join('') +
    '</ol>' +
    '</div>';

  return (
    `<figure class="chaine" data-schema="chaine-audit">${dessin}${lu}` +
    `<figcaption class="chaine__legende">${e(t.legende)}</figcaption></figure>`
  );
}
