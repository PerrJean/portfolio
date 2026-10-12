/**
 * Le marquage des infobulles (registre/0088), au build, sans JavaScript
 * côté lecteur : dans un fragment HTML déjà rendu, la première occurrence
 * de chaque terme du lexique devient une infobulle ; les suivantes restent
 * du texte. Le fragment se lit dans l'ordre du source, qui est celui du
 * lecteur (encadré, fait clé, trois phrases, corps, « Pour aller plus loin »).
 *
 * Le mécanisme, repris de la maquette validée par Jean : le terme est un
 * <button> relié par popovertarget à un <span popover> placé juste après
 * lui (popover HTML natif, « auto » : Échap ou un clic ailleurs le ferme).
 * Le lecteur d'écran lit la définition en description du bouton
 * (aria-describedby). Les styles : src/styles/infobulles.css.
 *
 * Seul le texte est touché : jamais une balise ni ses attributs (alt,
 * title…), jamais le contenu d'un titre, d'un lien, d'un bouton, d'un
 * <summary>, d'une figure (sa légende est reprise par la visionneuse, ses
 * schémas portent leur propre texte lu), d'un script ou d'un style.
 */
import type { Langue } from '../../i18n/routes';
import { LEXIQUE, type Definition } from './lexique';

// Les éléments dont le texte reste tel quel, à toute profondeur.
const HORS_JEU = new Set([
  'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'summary', 'label', 'figure', 'figcaption',
  'script', 'style', 'template', 'svg', 'code', 'pre', 'textarea', 'select', 'title',
]);

// Une balise entière, guillemets compris (un « > » dans un attribut ne la
// coupe pas), ou un commentaire.
const BALISE = /(<!--[\s\S]*?-->|<(?:[^>"']|"[^"]*"|'[^']*')*>)/;
const NOM = /^<(\/?)([a-z][a-z0-9-]*)/i;

const echapper = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

interface Terme extends Definition {
  id: string;
  seul: RegExp;
}

/** Les termes d'une langue et le motif qui les trouve tous, le plus long d'abord. */
function termesDe(langue: Langue): { termes: Terme[]; motif: RegExp } {
  const termes = LEXIQUE.flatMap(({ id, langues }) => {
    const d = langues[langue];
    return d ? [{ ...d, id, seul: new RegExp(`^(?:${d.motif})$`, 'iu') }] : [];
  }).sort((a, b) => b.motif.length - a.motif.length);
  const alternatives = termes.map((t) => `(?:${t.motif})`).join('|');
  // Un mot entier : ni lettre ni chiffre collés avant ou après.
  return { termes, motif: new RegExp(`(?<![\\p{L}\\p{N}])(?:${alternatives})(?![\\p{L}\\p{N}])`, 'giu') };
}

/** Le bouton et sa bulle, pour le mot tel qu'il est écrit dans le texte. */
function infobulle(mot: string, { id: cle, terme, texte }: Terme): string {
  const id = `infobulle-${cle}`;
  return (
    `<button type="button" class="terme" popovertarget="${id}" aria-describedby="${id}-texte" style="anchor-name: --${id}">${mot}</button>` +
    `<span class="infobulle" id="${id}" popover style="position-anchor: --${id}">` +
    `<span class="infobulle__tete"><strong>${echapper(terme)}</strong> : </span>` +
    `<span id="${id}-texte">${echapper(texte)}</span><span class="infobulle__fin">.</span></span>`
  );
}

/**
 * Pose les infobulles dans un fragment HTML : une bulle par terme et par
 * appel. Un appel par page, sur tout ce qui doit en recevoir, pour que la
 * première occurrence soit celle de la page et que les identifiants y
 * restent uniques.
 */
export function marquerInfobulles(html: string, langue: Langue): string {
  const { termes, motif } = termesDe(langue);
  const poses = new Set<string>();
  let horsJeu = 0;
  return html
    .split(BALISE)
    .map((morceau) => {
      if (morceau.startsWith('<')) {
        const balise = NOM.exec(morceau);
        if (balise && HORS_JEU.has(balise[2].toLowerCase()) && !morceau.endsWith('/>'))
          horsJeu = Math.max(0, horsJeu + (balise[1] ? -1 : 1));
        return morceau;
      }
      if (horsJeu > 0 || poses.size === termes.length) return morceau;
      return morceau.replace(motif, (mot) => {
        const terme = termes.find((t) => t.seul.test(mot));
        if (!terme || poses.has(terme.id)) return mot;
        poses.add(terme.id);
        return infobulle(mot, terme);
      });
    })
    .join('');
}
