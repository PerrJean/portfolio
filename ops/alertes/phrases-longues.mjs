// Alerte non bloquante (registre/0086) : les phrases de plus de 30 mots dans
// le texte visible des pages du site construit (hors labo/).
// Une phrase longue n'est pas toujours fautive : on signale, on ne bloque pas.
// Sort toujours avec le code 0.
//
// Lancement : DIST=.dist-x node ops/alertes/phrases-longues.mjs (défaut : dist)
//
// Découpe : point, point d'exclamation, point d'interrogation, points de
// suspension, deux-points suivi d'une majuscule ; une ligne de liste, une
// cellule de tableau, un titre, un paragraphe comptent chacun pour une phrase,
// comme deux éléments collés sans espace (des <span> mis en bloc par le CSS).
// Mots : séparés par les espaces (une apostrophe ne coupe pas un mot), un
// mot porte au moins une lettre ou un chiffre ; un nombre écrit « 1 000 »
// compte pour un mot.

import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Les outils des tests, chargés dans le try : même leur absence ne bloque pas.
let DIST, pagesHtml, lire, sansCode;

const SEUIL = 30;

const ENTITES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: String.fromCharCode(160), rsquo: '’', lsquo: '‘', laquo: '«', raquo: '»' };
const decoder = (t) =>
  t.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (e, c) =>
    c[0] === '#'
      ? String.fromCodePoint(c[1] === 'x' || c[1] === 'X' ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10))
      : (ENTITES[c.toLowerCase()] ?? e),
  );

/** Balises qui ferment un bloc : leur bord coupe la phrase. */
const BLOCS =
  'p|div|li|ul|ol|dl|dt|dd|td|th|tr|table|thead|tbody|tfoot|caption|h[1-6]|br|hr|section|article|header|footer|' +
  'nav|main|aside|figure|figcaption|blockquote|details|summary|button|label|option|form|fieldset|legend|pre|text';
const RE_BLOC = new RegExp(`<\\/?(?:${BLOCS})\\b[^>]*>`, 'gi');

/** Les blocs de texte visible d'une page : un élément par bloc, espaces resserrés. */
function blocsVisibles(html) {
  const corps = (html.match(/<body\b[\s\S]*<\/body\s*>/i) || [html])[0];
  return decoder(
    sansCode(corps)
      .replace(/<(script|style|template|title|desc)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
      .replace(/\s+/g, ' ')
      .replace(RE_BLOC, '\n')
      // Une balise fermante collée à une ouvrante, sans texte ni espace entre
      // elles : deux éléments mis en bloc par le CSS (étapes, bulles).
      .replace(/<\/[^>]*>(?:<[^>]*>)*<[a-z][^>]*>/gi, '\n')
      .replace(/<[^>]*>/g, ''),
  )
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

/** Coupe un bloc en phrases. */
const phrases = (bloc) =>
  bloc
    .split(/(?<=[.!?…][»"”’)\]]*)\s+|(?<=:)\s+(?=[«"“]?\s?\p{Lu})/u)
    .map((p) => p.trim())
    .filter(Boolean);

/** Nombre de mots d'une phrase. */
const mots = (phrase) =>
  phrase
    .replace(/(\d)\s(?=\d{3}(?!\d))/g, '$1') // \s couvre l'espace insécable et l'espace fine
    .split(/\s+/)
    .filter((m) => /[\p{L}\p{N}]/u.test(m)).length;

try {
  ({ DIST, pagesHtml, lire, sansCode } = await import('../../tests/outils.mjs'));
  if (!existsSync(join(DIST, 'index.html'))) {
    console.log(`(alerte phrases longues : site construit introuvable dans ${DIST}, rien à relire)`);
  } else {
    let total = 0;
    for (const f of pagesHtml()) {
      const longues = [];
      for (const bloc of blocsVisibles(lire(f)))
        for (const p of phrases(bloc)) {
          const n = mots(p);
          if (n > SEUIL) longues.push([n, p]);
        }
      if (longues.length === 0) continue;
      total += longues.length;
      console.log(`\n${f} : ${longues.length} phrase(s) de plus de ${SEUIL} mots`);
      for (const [n, p] of longues) console.log(`  [${n} mots] ${p}`);
    }
    console.log(`\nTotal : ${total} phrase(s) de plus de ${SEUIL} mots (alerte, non bloquante).`);
  }
} catch (e) {
  console.log(`(alerte phrases longues : erreur ignorée, ${e.message})`);
}
process.exitCode = 0;
