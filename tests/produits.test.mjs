// Le dépôt contient du code, pas de fichiers produits jetables
// (registre/0109, commandements v4, règle 10) : les planches de travail des
// scripts d'images (ops/images/**/planche.png) et le bytecode Python
// (__pycache__/, *.pyc) se régénèrent, ils ne sont jamais suivis par git.
// Les SVG de public/illustrations/ sont des générés *livrés* (registre/0105) :
// ils restent suivis, ce test ne les vise pas.
// Lit l'index de git (git ls-files) : pendant le hook de pre-commit, c'est ce
// qui va être committé. Ne demande pas de site construit.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { RACINE, liste } from './outils.mjs';

/** Les fichiers produits jetables : [ce que c'est, motif sur le chemin suivi]. */
const JETABLES = [
  ['planche de travail des scripts d’images', /^ops\/images\/(.+\/)?planche\.png$/],
  ['dossier de bytecode Python', /(^|\/)__pycache__\//],
  ['bytecode Python', /\.py[co]$/],
];

/** Un chemin d'exemple par sorte de jetable, que .gitignore doit écarter. */
const EXEMPLES = ['ops/images/exemple/planche.png', 'ops/hooks/__pycache__/exemple.cpython-312.pyc', 'ops/exemple.pyc'];

const git = (...args) => {
  const r = spawnSync('git', args, { cwd: RACINE, encoding: 'utf8' });
  assert.equal(r.status, 0, `git ${args.join(' ')} échoue (le test lit l'index de git) :\n${r.stderr}`);
  return r.stdout;
};

test('produits : aucun fichier produit jetable n’est suivi par git', () => {
  const suivis = git('ls-files', '-z').split('\0').filter(Boolean);
  assert.ok(suivis.length > 0, 'git ls-files ne liste aucun fichier.');
  const fautes = [];
  for (const f of suivis) {
    const sorte = JETABLES.find(([, motif]) => motif.test(f));
    if (sorte) fautes.push(`${f} (${sorte[0]})`);
  }
  assert.equal(
    fautes.length,
    0,
    `Fichiers produits suivis par git : à sortir de l'index (git rm --cached) :\n${liste(fautes)}`,
  );
});

test('produits : .gitignore écarte les fichiers produits jetables', () => {
  // check-ignore --no-index : la règle de .gitignore, même pour un chemin absent.
  const r = spawnSync('git', ['check-ignore', '--no-index', ...EXEMPLES], { cwd: RACINE, encoding: 'utf8' });
  const ignores = new Set(r.stdout.split(/\r?\n/).filter(Boolean));
  const manquants = EXEMPLES.filter((e) => !ignores.has(e));
  assert.equal(manquants.length, 0, `.gitignore n'écarte pas :\n${liste(manquants)}`);
});
