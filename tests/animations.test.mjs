// Test 4 — Animations sobres : tout CSS qui déclare un @keyframes contient
// aussi une règle @media (prefers-reduced-motion: reduce).
// Unités vérifiées : chaque fichier .css de dist/, et, pour chaque page HTML,
// l'ensemble de ses balises <style> (Astro peut répartir le CSS d'une page
// entre plusieurs balises).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exigerDist, pagesHtml, feuillesCss, lire, contenus, liste } from './outils.mjs';

const KEYFRAMES = /@(?:-webkit-|-moz-)?keyframes\b/i;
const REDUIT = /@media[^{]*prefers-reduced-motion\s*:\s*reduce/i;
const sansCommentaires = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

test('animations : tout @keyframes s\'accompagne de @media (prefers-reduced-motion: reduce)', () => {
  exigerDist();
  const unites = [
    ...feuillesCss().map((f) => [f, lire(f)]),
    ...pagesHtml().map((f) => [`${f} (balises <style>)`, contenus(lire(f), 'style').join('\n')]),
  ];
  const fautes = unites
    .map(([ou, css]) => [ou, sansCommentaires(css)])
    .filter(([, css]) => KEYFRAMES.test(css) && !REDUIT.test(css))
    .map(([ou]) => `${ou} : @keyframes sans @media (prefers-reduced-motion: reduce)`);
  assert.equal(
    fautes.length,
    0,
    `Animations sans repli pour prefers-reduced-motion (CONTRAT, « Accessible ») :\n${liste(fautes)}`,
  );
});
