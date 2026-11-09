// Plafond de 800 lignes par fichier, tous langages, tous dossiers.
// Source : CLAUDE.md, « Les règles de code » (500 lignes, 800 en limite dure) ;
// registre/0108. Ne demande pas le site construit.
//
// Fichiers comptés : ceux que suit git (git ls-files) ; un fichier suivi mais
// absent du disque est sauté. Lignes comptées comme wc -l, plus une si le
// fichier ne finit pas par un saut de ligne.
//
// Exclusions, chacune pour sa raison :
// - tout fichier qui contient un octet nul : c'est un binaire (PNG, PDF,
//   police, .pyc), qui n'a pas de lignes au sens du code. Un texte en UTF-16
//   y tomberait aussi ; le dépôt n'en a pas ;
// - les fichiers de verrouillage générés, par chemin exact : un outil les
//   écrit, personne ne les lit ni ne les découpe.
// Limite : le test lit le disque, comme le build. Un fichier raccourci sur le
// disque après un « git add -p » passerait le hook ; la CI, qui joue le test
// sur le contenu poussé, le rattrape.
// Exception nommée : la page DentalSoft, figée (arbitrage de Jean du
// 2026-11-05, 0108). Si elle n'est plus suivie ou repasse sous 800 lignes,
// le test rougit : l'exception est caduque et se retire d'ici.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { RACINE, liste } from './outils.mjs';

const PLAFOND = 800;

/** Fichiers de verrouillage générés, exclus par chemin exact depuis la racine. */
const VERROUS = new Set(['package-lock.json']);

/** Exceptions nommées et leur source. */
const EXCEPTIONS = new Map([
  ['public/usecase/dentalsoft/index.html', '0108, arbitrage de Jean du 2026-11-05'],
]);

/** Les fichiers suivis par git, chemins relatifs à la racine avec des « / ». */
function fichiersSuivis() {
  const sortie = execFileSync('git', ['ls-files', '-z'], {
    cwd: RACINE,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  return sortie.split('\0').filter(Boolean);
}

/** Nombre de lignes comme wc -l, plus une sans saut de ligne final ; null si binaire. */
function compterLignes(octets) {
  if (octets.includes(0)) return null;
  let n = 0;
  for (const o of octets) if (o === 0x0a) n++;
  if (octets.length > 0 && octets[octets.length - 1] !== 0x0a) n++;
  return n;
}

const SUIVIS = new Set(fichiersSuivis());

/** { rel → lignes } pour chaque fichier suivi, présent, texte, hors verrous. */
function lignesParFichier() {
  const sortie = new Map();
  for (const rel of SUIVIS) {
    if (VERROUS.has(rel)) continue;
    const complet = join(RACINE, rel);
    if (!existsSync(complet) || !statSync(complet).isFile()) continue;
    const n = compterLignes(readFileSync(complet));
    if (n !== null) sortie.set(rel, n);
  }
  return sortie;
}

const LIGNES = lignesParFichier();

test(`aucun fichier suivi ne dépasse ${PLAFOND} lignes`, () => {
  const fautes = [];
  for (const [rel, n] of LIGNES) {
    if (n > PLAFOND && !EXCEPTIONS.has(rel)) fautes.push(`${rel} : ${n} lignes`);
  }
  assert.equal(
    fautes.length,
    0,
    `Fichiers au-delà de ${PLAFOND} lignes (CLAUDE.md, règles de code ; 0108) :\n${liste(fautes)}`,
  );
});

test('chaque exception nommée est encore justifiée', () => {
  const fautes = [];
  for (const [rel, source] of EXCEPTIONS) {
    if (!SUIVIS.has(rel)) fautes.push(`${rel} (${source}) : n'est plus suivi par git`);
    else if (!existsSync(join(RACINE, rel))) fautes.push(`${rel} (${source}) : suivi, mais absent du disque`);
    else if (!LIGNES.has(rel)) fautes.push(`${rel} (${source}) : n'est plus un fichier texte`);
    else if (LIGNES.get(rel) <= PLAFOND) {
      fautes.push(`${rel} (${source}) : ${LIGNES.get(rel)} lignes, sous le plafond`);
    }
  }
  assert.equal(fautes.length, 0, `Exceptions caduques, à retirer du test :\n${liste(fautes)}`);
});
