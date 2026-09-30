// Test 9 — Rien des brouillons ne sort : aucune page construite ne contient
// les commentaires de figure de redaction/ (« <!-- Figure : … -->) ni les
// notes de rédaction qui les suivent (audit de passe, points à trancher).
// Cherché dans le HTML brut, commentaires compris : un commentaire HTML se
// lit dans la source de la page.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exigerDist, pagesHtml, lire, liste } from './outils.mjs';

const INTERDITS = [
  ['un commentaire de figure « <!-- Figure »', /<!--\s*Figure\b/i],
  ['« Audit de la passe »', /Audit de la passe/i],
  ['« Ce qui reste à trancher »', /Ce qui reste à trancher/i],
  ['« Ce que Jean doit trancher »', /Ce que Jean doit trancher/i],
];

test('brouillons : aucune page construite ne contient de commentaire de figure ni de note de rédaction', () => {
  exigerDist();
  const pages = pagesHtml();
  assert.ok(pages.length > 0, 'Aucune page HTML dans le build.');
  const fautes = [];
  for (const f of pages) {
    const html = lire(f);
    for (const [nom, motif] of INTERDITS) if (motif.test(html)) fautes.push(`${f} : contient ${nom}`);
  }
  assert.equal(fautes.length, 0, `Des brouillons sont sortis dans le site :\n${liste(fautes)}`);
});
