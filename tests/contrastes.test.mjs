// Test 6 — Contrastes : les jetons de src/styles/jetons.css respectent les
// seuils WCAG (formule de luminance relative, WCAG 2.x).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RACINE, liste } from './outils.mjs';

const JETONS = join(RACINE, 'src', 'styles', 'jetons.css');

/** [avant-plan, arrière-plan, seuil, usage] */
const PAIRES = [
  ['--encre', '--ivoire', 4.5, 'texte courant'],
  ['--orange', '--ivoire', 4.5, 'texte courant'],
  ['--texte-sur-orange', '--orange', 4.5, 'texte courant'],
  ['--ardoise', '--ivoire', 3, 'grand texte seulement'],
  // La bande du récit et la carte survolée (registre/0089) : le sable porte
  // le texte, les liens orange et les numéros ; le pied de page s'inverse.
  ['--encre', '--sable', 4.5, 'texte courant, sur la bande'],
  ['--orange', '--sable', 4.5, 'texte courant, sur la bande'],
  ['--ardoise', '--sable', 3, 'grand texte seulement, sur la bande'],
  ['--ivoire', '--encre', 4.5, 'texte du pied de page'],
];

/** Les couleurs nées avec le relief (registre/0089). */
const COULEURS_0089 = ['--sable', '--sol', '--sol-sur-sable'];
const COULEUR = /^(?:#|(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix)\()/i;

/** Luminance relative WCAG d'une couleur « #rrggbb » ou « #rgb ». */
export function luminance(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Rapport de contraste WCAG, de 1 à 21. */
export function contraste(a, b) {
  const [claire, sombre] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (claire + 0.05) / (sombre + 0.05);
}

/** Première déclaration de chaque variable CSS du fichier : { '--encre': '#…' }. */
function lireJetons() {
  assert.ok(existsSync(JETONS), `Fichier des jetons introuvable : ${JETONS}.`);
  const css = readFileSync(JETONS, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const jetons = {};
  for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)) {
    if (!(m[1] in jetons)) jetons[m[1]] = m[2].trim();
  }
  return jetons;
}

function hexDe(jetons, nom) {
  const v = jetons[nom];
  assert.ok(v !== undefined, `La variable ${nom} n'est pas déclarée dans ${JETONS}.`);
  assert.match(v, /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i, `${nom} vaut « ${v} » : attendu une valeur hex (#rrggbb ou #rgb).`);
  return v;
}

// Contrôle de la formule elle-même, sans le site : il doit rester vert.
test('contrastes : la formule WCAG donne les valeurs de référence', () => {
  assert.equal(contraste('#000000', '#ffffff').toFixed(2), '21.00');
  assert.equal(contraste('#fff', '#fff').toFixed(2), '1.00');
  assert.equal(contraste('#767676', '#ffffff').toFixed(2), '4.54');
  assert.equal(contraste('#ffffff', '#777777').toFixed(2), '4.48');
});

for (const [avant, arriere, seuil, usage] of PAIRES) {
  test(`contrastes : ${avant} sur ${arriere} ≥ ${seuil}:1 (${usage})`, () => {
    const jetons = lireJetons();
    const a = hexDe(jetons, avant);
    const b = hexDe(jetons, arriere);
    const r = contraste(a, b);
    // Pas d'arrondi avant la comparaison : 4,49:1 échoue à 4,5:1.
    assert.ok(
      r >= seuil,
      `${avant} (${a}) sur ${arriere} (${b}) : ${r.toFixed(2)}:1, il faut au moins ${seuil}:1 (${usage}).`,
    );
  });
}

test('jetons : chaque couleur est en hexadécimal et commentée sur sa ligne, celles du relief comprises', () => {
  assert.ok(existsSync(JETONS), `Fichier des jetons introuvable : ${JETONS}.`);
  const fautes = [];
  const vues = new Set();
  // Une déclaration par ligne, son commentaire à la suite (convention du fichier).
  for (const ligne of readFileSync(JETONS, 'utf8').split(/\r?\n/)) {
    const m = /^\s*(--[\w-]+)\s*:\s*([^;]+);\s*(.*)$/.exec(ligne);
    if (!m) continue;
    const [, nom, val, reste] = m;
    const v = val.trim();
    if (!COULEUR.test(v) && !COULEURS_0089.includes(nom)) continue;
    vues.add(nom);
    if (!/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) fautes.push(`${nom} vaut « ${v} » : attendu #rrggbb ou #rgb`);
    if (!/^\/\*\s*\S[\s\S]*\*\/\s*$/.test(reste)) fautes.push(`${nom} n'est pas commentée sur sa ligne`);
  }
  for (const nom of COULEURS_0089) if (!vues.has(nom)) fautes.push(`${nom} n'est pas déclarée`);
  assert.equal(fautes.length, 0, `Jetons de couleur (${JETONS}) :\n${liste(fautes)}`);
});
