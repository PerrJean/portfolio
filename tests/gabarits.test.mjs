// Test — Aucun gabarit oublié (registre/0086) : le texte visible des pages
// construites (hors labo/) ne garde aucun reste de rédaction : « [À COMPLÉTER »,
// « XX % », « [Nom », « TODO », « N'hésitez pas »…
// Le texte visible : le <body> sans commentaires, sans <script> ni <style>,
// sans balises (leurs attributs ne comptent pas), entités décodées.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exigerDist, pagesHtml, lire, sansCode, liste } from './outils.mjs';

const RESTES = [
  ['« [À COMPLÉTER »', /\[\s*À\s+COMPLÉTER/i],
  ['« [A COMPLETER »', /\[\s*A\s+COMPLETER/i],
  ['« [TO COMPLETE »', /\[\s*TO\s+COMPLETE/i],
  ['« XX % »', /XX\s?%/], // \s couvre l'espace insécable et l'espace fine
  ['« [Nom »', /\[Nom/],
  ['« [Name »', /\[Name/],
  ['« TODO »', /\bTODO\b/],
  ['« N’hésitez pas »', /N['’]hésitez pas/i],
];

const ENTITES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: String.fromCharCode(160), rsquo: '’', lsquo: '‘', laquo: '«', raquo: '»' };

/** Le texte visible d'une page HTML, espaces resserrés. */
function texteVisible(html) {
  const corps = (html.match(/<body\b[\s\S]*<\/body\s*>/i) || [html])[0];
  return sansCode(corps)
    .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (e, c) =>
      c[0] === '#'
        ? String.fromCodePoint(c[1] === 'x' || c[1] === 'X' ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10))
        : (ENTITES[c.toLowerCase()] ?? e),
    )
    .replace(/\s+/g, ' ');
}

/** L'extrait autour d'une occurrence, pour le message d'échec. */
const extrait = (texte, index) =>
  `…${texte.slice(Math.max(0, index - 40), index + 50).trim()}…`;

test('gabarits : aucune page construite ne garde de reste de rédaction dans son texte visible', () => {
  exigerDist();
  const pages = pagesHtml();
  assert.ok(pages.length > 0, 'Aucune page HTML dans le build.');
  const fautes = [];
  for (const f of pages) {
    const texte = texteVisible(lire(f));
    for (const [nom, motif] of RESTES) {
      const m = new RegExp(motif.source, motif.flags.includes('g') ? motif.flags : motif.flags + 'g');
      for (const r of texte.matchAll(m)) fautes.push(`${f} : ${nom} dans « ${extrait(texte, r.index)} »`);
    }
  }
  assert.equal(fautes.length, 0, `Des gabarits de rédaction sont restés dans le site :\n${liste(fautes)}`);
});
