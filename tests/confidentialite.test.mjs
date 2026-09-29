// Test 3 — Aucun terme interdit (C1–C4).
// Délègue à ops/hooks/verifier_confidentialite.py, qui lit les listes hors du
// dépôt et gère l'exception des pages « à propos ». Les termes ne sont jamais
// recopiés ici ; le script nomme les fichiers fautifs, jamais les termes.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { RACINE, DIST, exigerDist, fichiersDuSite } from './outils.mjs';

const PYTHON = process.env.PYTHON || 'python';
const SCRIPT = 'ops/hooks/verifier_confidentialite.py';

/** Découpe la liste pour rester sous la limite de longueur de ligne de commande de Windows. */
function paquets(chemins, max = 7000) {
  const sortie = [];
  let courant = [];
  let taille = 0;
  for (const c of chemins) {
    if (courant.length && taille + c.length + 1 > max) {
      sortie.push(courant);
      courant = [];
      taille = 0;
    }
    courant.push(c);
    taille += c.length + 1;
  }
  if (courant.length) sortie.push(courant);
  return sortie;
}

test('confidentialité (C1–C4) : verifier_confidentialite.py accepte tout dist/ (hors labo/)', () => {
  exigerDist();
  // Chemins relatifs à la racine du dépôt, en « / » : le script reconnaît
  // les pages « à propos » à leur chemin (a-propos, about).
  const chemins = fichiersDuSite().map((f) => relative(RACINE, join(DIST, f)).split('\\').join('/'));
  assert.ok(chemins.length > 0, `Aucun fichier à vérifier dans ${DIST}.`);

  const refus = [];
  for (const lot of paquets(chemins)) {
    const r = spawnSync(PYTHON, [SCRIPT, ...lot], { cwd: RACINE, encoding: 'utf8' });
    if (r.error)
      assert.fail(`Impossible de lancer « ${PYTHON} ${SCRIPT} » : ${r.error.message}. Règle la variable PYTHON si besoin.`);
    if (r.status !== 0) refus.push((r.stderr || r.stdout || `code de sortie ${r.status}`).trim());
  }
  assert.equal(
    refus.length,
    0,
    `${SCRIPT} refuse ${refus.length} lot(s) de fichiers (code de sortie non nul) :\n${refus.join('\n')}`,
  );
});
