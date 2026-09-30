// Le schéma d'un échange, projet « mises en situation orales » (registre/0066),
// en FR et en EN. Le seul endroit où il vit : le plugin rehype-schemas.mjs
// l'insère dans la page à la place du marqueur
// <div data-schema="echange-oral"></div>.
//
// Sur le modèle de la chaîne d'Audit contenu (chaine-audit.mjs) : cadres à
// angles droits à l'encre, flèches en ardoise, bulles de dialogue au trait ;
// le « Modèle », la réponse qui aide, a sa fenêtre allumée (l'ambre, jamais
// de texte). Styles : echange-oral.css. L'exemple est fictif ; la
// conversation reste en anglais dans les deux langues. Le dessin est
// aria-hidden ; son contenu est redit en texte, dans une liste ordonnée
// visuellement masquée. Aucun H2 (le bâtiment compte les H2), aucune
// animation.

const NBSP = ' ';

/** La conversation et le modèle, en anglais dans les deux langues. */
const IA = 'Good evening, front desk. How can I help you?';
const APPRENANT =
  'Hello, the thing that is supposed to make the room warm is not doing what it should do since this morning.';
const MODELE = '“Hello, the heater hasn’t been working since this morning.”';

/**
 * Les textes. L'entrée : des lignes (étiquette facultative, valeur) ; le
 * retour : trois vignettes numérotées. lu : les phrases de la liste lue par
 * les lecteurs d'écran.
 */
const TEXTES = {
  fr: {
    entree: {
      titre: 'L’entrée',
      lignes: [
        ['L’IA joue', 'la réceptionniste de l’hôtel'],
        ['Votre rôle', 'un client de l’hôtel'],
        ['Votre mission', 'signaler un problème dans votre chambre'],
        ['Durée', `environ 2${NBSP}min`],
      ],
    },
    conversation: {
      titre: 'La conversation',
      cache: 'Ce que chaque question attend de l’apprenant reste caché',
    },
    retour: {
      titre: 'Le retour en trois temps',
      temps: [
        { titre: 'Signal', texte: `Vous avez signalé le problème et dit depuis quand${NBSP}: la réceptionniste sait ce qu’il vous faut.` },
        { titre: 'Indice', texte: 'Le message passe, mais il demande un effort. Nommez directement l’objet et ce qui ne va pas.' },
        { titre: 'Modèle', citation: MODELE, texte: 'On nomme l’objet et le problème.' },
      ],
      critere: `Critère travaillé${NBSP}: vocabulaire`,
    },
    lu: {
      intro: `Une conversation IA, étape par étape${NBSP}:`,
      entree: `L’entrée${NBSP}: l’IA joue la réceptionniste de l’hôtel${NBSP}; votre rôle, un client de l’hôtel${NBSP}; votre mission, signaler un problème dans votre chambre. Durée${NBSP}: environ 2${NBSP}min.`,
      conversation: `La conversation. L’IA${NBSP}:`,
      reponse: `Votre réponse, à l’oral, transcrite${NBSP}:`,
      retour: `Le retour en trois temps, sur un seul critère, le vocabulaire.`,
      temps: (titre) => `${titre}${NBSP}:`,
    },
    legende: `Une conversation IA, sur un exemple fictif${NBSP}: l’IA joue la réceptionniste, et le retour ne travaille qu’un critère, celui qui gêne le plus la compréhension.`,
  },
  en: {
    entree: {
      titre: 'Getting started',
      lignes: [
        ['The AI plays', 'the hotel receptionist'],
        ['Your role', 'a hotel guest'],
        ['Your mission', 'report a problem in your room'],
        [null, `About 2${NBSP}min`],
      ],
    },
    conversation: {
      titre: 'The conversation',
      cache: 'What each question expects stays hidden',
    },
    retour: {
      titre: 'Three-step feedback',
      temps: [
        { titre: 'Signal', texte: 'You reported the problem and said since when: the receptionist knows what you need.' },
        { titre: 'Hint', texte: 'Your message gets across, but it takes effort. Name the object and what’s wrong directly.' },
        { titre: 'Model', citation: MODELE, texte: 'Name the object and the problem.' },
      ],
      critere: 'Focus: vocabulary',
    },
    lu: {
      intro: 'One AI conversation, step by step:',
      entree: `Getting started: the AI plays the hotel receptionist; your role, a hotel guest; your mission, report a problem in your room. About 2${NBSP}min.`,
      conversation: 'The conversation. The AI:',
      reponse: 'Your answer, spoken, then transcribed:',
      retour: 'Three-step feedback, on a single criterion, vocabulary.',
      temps: (titre) => `${titre}:`,
    },
    legende:
      'One AI conversation, on a fictional example: the AI plays the receptionist, and the feedback works on a single criterion, the one that most hinders understanding.',
  },
};

/** Les langues servies. */
export const LANGUES_SCHEMA = Object.keys(TEXTES);

const ECHAPPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const e = (s) => String(s).replace(/[&<>"]/g, (c) => ECHAPPE[c]);

/** Une flèche vers le bas, au trait ; le CSS la tourne vers la droite en grand écran. */
const FLECHE =
  '<span class="echange__fleche">' +
  '<svg viewBox="0 0 14 28" width="14" height="28" focusable="false">' +
  '<path d="M7 1V26M2 20.5L7 26L12 20.5" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg></span>';

/** La queue d'une bulle : ses deux côtés au trait, le fond couvre le bord de la bulle. */
const QUEUE =
  '<svg class="echange__queue" viewBox="0 0 14 10" width="14" height="10" focusable="false">' +
  '<path d="M1 0V9L11 0" stroke-width="1.5" stroke-linejoin="miter"/>' +
  '</svg>';

/** Le micro : la réponse est dite, puis transcrite. */
const MICRO =
  '<svg class="echange__micro" viewBox="0 0 16 20" width="16" height="20" focusable="false">' +
  '<rect x="5" y="1" width="6" height="11" rx="3" fill="none" stroke-width="1.5"/>' +
  '<path d="M2 9a6 6 0 0 0 12 0M8 15v4M5 19h6" fill="none" stroke-width="1.5" stroke-linecap="round"/>' +
  '</svg>';

const bulle = (texte, qui) =>
  `<span class="echange__bulle echange__bulle--${qui}">` +
  (qui === 'apprenant' ? MICRO : '') +
  `<span class="echange__replique">${e(texte)}</span>` +
  QUEUE +
  '</span>';

/**
 * Le HTML du schéma dans une langue. Ordre du DOM = ordre de lecture ; la
 * grille range les trois cadres de gauche à droite en grand écran, en
 * colonne au téléphone.
 */
export function schemaEchangeOral(langue) {
  const t = TEXTES[langue];
  if (!t) throw new Error(`Schéma echange-oral : langue « ${langue} » inconnue (attendu : ${LANGUES_SCHEMA.join(', ')}).`);

  const entree =
    '<span class="echange__cadre">' +
    `<span class="echange__titre">${e(t.entree.titre)}</span>` +
    '<span class="echange__lignes">' +
    t.entree.lignes
      .map(
        ([etiquette, valeur]) =>
          '<span class="echange__ligne">' +
          (etiquette ? `<span class="echange__etiquette">${e(etiquette)}${langue === 'fr' ? NBSP : ''}:</span> ` : '') +
          `${e(valeur)}</span>`,
      )
      .join('') +
    '</span>' +
    '</span>';

  const conversation =
    '<span class="echange__cadre">' +
    `<span class="echange__titre">${e(t.conversation.titre)}</span>` +
    `<span class="echange__dialogue" lang="en">${bulle(IA, 'ia')}${bulle(APPRENANT, 'apprenant')}</span>` +
    `<span class="echange__cache">${e(t.conversation.cache)}</span>` +
    '</span>';

  const retour =
    '<span class="echange__cadre">' +
    `<span class="echange__titre">${e(t.retour.titre)}</span>` +
    '<span class="echange__temps">' +
    t.retour.temps
      .map(
        ({ titre, citation, texte }, i) =>
          `<span class="echange__vignette${citation ? ' echange__vignette--modele' : ''}">` +
          (citation ? '<span class="echange__lumiere"></span>' : '') +
          '<span class="echange__entete">' +
          `<span class="echange__numero">${i + 1}</span>` +
          `<span class="echange__nom">${e(titre)}</span>` +
          '</span>' +
          '<span class="echange__texte">' +
          (citation ? `<span lang="en">${e(citation)}</span> ` : '') +
          `${e(texte)}</span>` +
          '</span>',
      )
      .join('') +
    '</span>' +
    `<span class="echange__critere">${e(t.retour.critere)}</span>` +
    '</span>';

  const dessin = `<div class="echange__dessin" aria-hidden="true">${entree}${FLECHE}${conversation}${FLECHE}${retour}</div>`;

  const en = (s) => (langue === 'en' ? e(s) : `<span lang="en">${e(s)}</span>`);
  const [signal, indice, modele] = t.retour.temps;
  const lu =
    '<div class="visuellement-cache">' +
    `<p>${e(t.lu.intro)}</p>` +
    '<ol>' +
    `<li>${e(t.lu.entree)}</li>` +
    `<li>${e(t.lu.conversation)} ${en(`“${IA}”`)} ${e(t.lu.reponse)} ${en(`“${APPRENANT}”`)} ${e(t.conversation.cache)}.</li>` +
    `<li>${e(t.lu.retour)} ` +
    `${e(t.lu.temps(signal.titre))} ${e(signal.texte)} ` +
    `${e(t.lu.temps(indice.titre))} ${e(indice.texte)} ` +
    `${e(t.lu.temps(modele.titre))} ${en(modele.citation)} ${e(modele.texte)}</li>` +
    '</ol>' +
    '</div>';

  return (
    `<figure class="echange" data-schema="echange-oral">${dessin}${lu}` +
    `<figcaption class="echange__legende">${e(t.legende)}</figcaption></figure>`
  );
}
