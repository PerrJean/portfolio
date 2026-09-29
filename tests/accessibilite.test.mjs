// Test 7 — Accessibilité de base : un seul <h1>, un lien d'évitement vers
// #contenu et sa cible id="contenu" sur chacune des huit pages ; un attribut
// alt sur chaque <img> de tout le site.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { PAGES, exigerDist, fichierDePage, pagesHtml, lire, balises, liste } from './outils.mjs';

for (const { chemin } of PAGES) {
  test(`accessibilité : ${chemin} a un seul <h1>, un lien d'évitement et id="contenu"`, { todo: '2b' }, () => {
    exigerDist();
    const fichier = fichierDePage(chemin);
    assert.ok(existsSync(fichier), `La page ${chemin} manque : ${fichier} n'existe pas.`);
    const tout = balises(readFileSync(fichier, 'utf8'));
    const fautes = [];

    const h1 = tout.filter((b) => b.nom === 'h1').length;
    if (h1 !== 1) fautes.push(`${h1} balise(s) <h1> : attendu exactement une`);

    if (!tout.some((b) => b.nom === 'a' && (b.attrs.href ?? '').trim() === '#contenu'))
      fautes.push('aucun lien d\'évitement <a href="#contenu">');

    const cibles = tout.filter((b) => b.attrs.id === 'contenu').length;
    if (cibles !== 1) fautes.push(`${cibles} élément(s) id="contenu" : attendu exactement un`);

    assert.equal(fautes.length, 0, `Page ${chemin} :\n${liste(fautes)}`);
  });
}

test('accessibilité : chaque <img> a un attribut alt', { todo: '2b' }, () => {
  exigerDist();
  const fautes = [];
  for (const f of pagesHtml())
    for (const { attrs } of balises(lire(f), 'img'))
      if (!('alt' in attrs)) fautes.push(`${f} : <img src="${attrs.src ?? ''}"> sans alt (alt="" si décorative)`);
  assert.equal(fautes.length, 0, `Images sans alt :\n${liste(fautes)}`);
});
