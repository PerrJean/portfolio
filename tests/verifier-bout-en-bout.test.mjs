// La commande `verifier` jouée de bout en bout sur un dépôt factice
// (registre/0107, Spec points 1 à 3 ; revue, tour 1). Ne demande pas le site
// construit, et ne touche jamais au vrai dépôt : une version cassée du
// contrôle de `--garder` ne doit pas pouvoir le vider.
//
// Le dépôt factice, dans un dossier temporaire supprimé à la fin :
// - `git init`, `.gitignore` (`.dist-*/`, `data/`), `ops/verifier.mjs` copié
//   du vrai dépôt ;
// - un faux `node_modules/astro` dont le « build » écrit `<outDir>/index.html`,
//   ou sort en 1 si FAUX_BUILD_ROUGE est posée ;
// - `tests/a.test.mjs`, qui exige `DIST/index.html` et échoue si
//   FAUX_TEST_ROUGE est posée ; `tests/b-navigateur.test.mjs`, qui laisse une
//   trace à la racine factice ;
// - tout est ajouté à l'index git, sauf `data/` (ignoré, avec `data/reel.txt`)
//   et `node_modules/`.
// Un témoin est posé à côté du dépôt factice, pour juger `--garder ..`.

import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { RACINE } from './outils.mjs';

const DELAI_MS = 30_000;
const DONNEE = 'une donnée réelle, à ne jamais vider\n';
const TEMOIN = 'témoin hors du dépôt factice\n';

let base;
let depot;

/** Écrit un fichier du dépôt factice, dossiers compris. */
function ecrire(rel, texte) {
  const complet = join(depot, rel);
  mkdirSync(dirname(complet), { recursive: true });
  writeFileSync(complet, texte);
}

const FAUX_ASTRO = `import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
if (process.env.FAUX_BUILD_ROUGE) { console.error('faux astro : build rouge demandé'); process.exit(1); }
const i = process.argv.indexOf('--outDir');
if (process.argv[2] !== 'build' || i < 0 || !process.argv[i + 1]) { console.error('faux astro : attendu « build --outDir X »'); process.exit(3); }
const sortie = process.argv[i + 1];
mkdirSync(sortie, { recursive: true });
writeFileSync(join(sortie, 'index.html'), '<!doctype html><title>faux</title>');
`;

const TEST_A = `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
test('le site factice est construit', () => {
  assert.ok(process.env.DIST, 'DIST absente');
  assert.ok(existsSync(join(process.env.DIST, 'index.html')), 'DIST/index.html absent');
  assert.ok(!process.env.FAUX_TEST_ROUGE, 'test rouge demandé');
});
`;

const TEST_B = `import { test } from 'node:test';
import { writeFileSync } from 'node:fs';
test('passe navigateur factice', () => {
  writeFileSync(new URL('../trace-navigateur.txt', import.meta.url), 'passé');
});
`;

before(() => {
  base = realpathSync.native(mkdtempSync(join(tmpdir(), 'verifier-factice-')));
  depot = join(base, 'depot');
  mkdirSync(depot);
  writeFileSync(join(base, 'temoin.txt'), TEMOIN);
  ecrire('.gitignore', '.dist-*/\ndata/\n');
  ecrire('package.json', '{ "name": "depot-factice", "private": true, "type": "module" }\n');
  mkdirSync(join(depot, 'ops'));
  copyFileSync(join(RACINE, 'ops', 'verifier.mjs'), join(depot, 'ops', 'verifier.mjs'));
  ecrire('node_modules/astro/package.json', '{ "name": "astro", "bin": { "astro": "./bin/astro.mjs" } }\n');
  ecrire('node_modules/astro/bin/astro.mjs', FAUX_ASTRO);
  ecrire('tests/a.test.mjs', TEST_A);
  ecrire('tests/b-navigateur.test.mjs', TEST_B);
  ecrire('data/reel.txt', DONNEE);
  // Un dossier .dist-… qui contient un fichier suivi (ajouté de force) : la
  // seconde ligne de --garder, le contrôle par git, doit le refuser.
  ecrire('.dist-suivi/suivi.txt', DONNEE);
  const git = (cwd, ...args) => execFileSync('git', args, { cwd, stdio: 'pipe', env: sansGit(process.env) });
  git(depot, 'init', '-q');
  git(depot, 'add', '.gitignore', 'package.json', 'ops', 'tests');
  git(depot, 'add', '-f', '.dist-suivi/suivi.txt');
  // Un leurre : un autre dépôt, vide, vers lequel pointeraient des GIT_*.
  mkdirSync(join(base, 'leurre'));
  git(join(base, 'leurre'), 'init', '-q');
});

/**
 * L'environnement sans aucune variable GIT_*. Pendant un hook, git pose
 * GIT_DIR, GIT_INDEX_FILE… vers le VRAI dépôt : un `git init` lancé avec,
 * même dans un dossier temporaire, réécrit la config du vrai dépôt
 * (core.bare=true, mesuré le 2026-11-09, registre/0107).
 */
function sansGit(env) {
  return Object.fromEntries(Object.entries(env).filter(([k]) => !/^GIT_/i.test(k)));
}

after(() => {
  if (base) rmSync(base, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
});

/** Lance verifier dans le dépôt factice : { status, sortie, derniere }. */
function verifier(args, envEnPlus = {}) {
  // Un `node --test` lancé depuis un test hérite de NODE_TEST_CONTEXT et se
  // prendrait pour un fils du lanceur : on l'efface.
  const env = { ...sansGit(process.env), ...envEnPlus };
  delete env.NODE_TEST_CONTEXT;
  delete env.DIST;
  const r = spawnSync(process.execPath, [join(depot, 'ops', 'verifier.mjs'), ...args], {
    cwd: depot,
    encoding: 'utf8',
    timeout: DELAI_MS,
    env,
  });
  assert.ok(
    !(r.error && r.error.code === 'ETIMEDOUT'),
    `verifier ${args.join(' ')} tourne encore après ${DELAI_MS / 1000} s dans le dépôt factice.`,
  );
  const sortie = `${r.stdout || ''}${r.stderr || ''}`;
  const lignes = (r.stdout || '').trim().split(/\r?\n/);
  return { status: r.status, sortie, derniere: lignes[lignes.length - 1] };
}

const JETABLE = () => join(depot, '.dist-verifier');
const TRACE = () => join(depot, 'trace-navigateur.txt');

/** Message d'échec commun : la commande et la fin de sa sortie. */
function contexte(args, r) {
  const fin = r.sortie.trim().split(/\r?\n/).slice(-6).join('\n');
  return `\n(verifier ${args.join(' ')}, code ${r.status} ; fin de la sortie :\n${fin})`;
}

test('vert : code 0, dernière ligne VERT, dossier jetable supprimé', () => {
  const r = verifier([]);
  assert.equal(r.status, 0, `verifier vert doit sortir en 0 (Spec, point 1).${contexte([], r)}`);
  assert.match(r.derniere, /^verifier : VERT\b/, `la dernière ligne doit dire « verifier : VERT ».${contexte([], r)}`);
  assert.ok(!existsSync(JETABLE()), `.dist-verifier doit être supprimé après un vert.${contexte([], r)}`);
});

test('un test rouge : code 1, ROUGE (des tests echouent), dossier jetable supprimé', () => {
  const r = verifier([], { FAUX_TEST_ROUGE: '1' });
  assert.equal(r.status, 1, `un test rouge doit sortir en 1, jamais en 0 (Spec, point 1).${contexte([], r)}`);
  assert.match(
    r.derniere,
    /^verifier : ROUGE \(des tests echouent\)/,
    `la dernière ligne doit dire « verifier : ROUGE (des tests echouent) ».${contexte([], r)}`,
  );
  assert.ok(!existsSync(JETABLE()), `.dist-verifier doit être supprimé même au rouge.${contexte([], r)}`);
});

test('un build rouge : code 1, ROUGE (le build echoue), dossier jetable supprimé', () => {
  const r = verifier([], { FAUX_BUILD_ROUGE: '1' });
  assert.equal(r.status, 1, `un build rouge doit sortir en 1, jamais en 0 (Spec, point 1).${contexte([], r)}`);
  assert.match(
    r.derniere,
    /^verifier : ROUGE \(le build echoue\)/,
    `la dernière ligne doit dire « verifier : ROUGE (le build echoue) ».${contexte([], r)}`,
  );
  assert.ok(!existsSync(JETABLE()), `.dist-verifier doit être supprimé même au build rouge.${contexte([], r)}`);
});

test('--rapide ne lance aucun test -navigateur ; sans, il tourne', () => {
  rmSync(TRACE(), { force: true });
  const rapide = verifier(['--rapide']);
  assert.equal(rapide.status, 0, `verifier --rapide doit être vert ici.${contexte(['--rapide'], rapide)}`);
  assert.ok(
    !existsSync(TRACE()),
    `--rapide a lancé tests/b-navigateur.test.mjs : il doit écarter tests/*-navigateur.test.mjs (Spec, point 2).`,
  );
  const complet = verifier([]);
  assert.equal(complet.status, 0, `verifier doit être vert ici.${contexte([], complet)}`);
  assert.ok(
    existsSync(TRACE()),
    `sans --rapide, tests/b-navigateur.test.mjs n'a pas tourné : verifier doit lancer tous les tests.${contexte([], complet)}`,
  );
  rmSync(TRACE(), { force: true });
});

test('--garder .dist-x : code 0, le site reste dans .dist-x', () => {
  const args = ['--garder', '.dist-x'];
  const r = verifier(args);
  assert.equal(r.status, 0, `verifier --garder .dist-x doit être vert.${contexte(args, r)}`);
  assert.ok(
    existsSync(join(depot, '.dist-x', 'index.html')),
    `.dist-x/index.html doit rester après --garder (Spec, point 3).${contexte(args, r)}`,
  );
  rmSync(join(depot, '.dist-x'), { recursive: true, force: true });
});

/** Les noms d'un dossier, triés ; null s'il n'existe pas. */
function contenu(dossier) {
  return existsSync(dossier) ? readdirSync(dossier).sort() : null;
}

/** L'état de ce qu'un refus ne doit pas toucher. */
function etat() {
  return {
    'la racine du dépôt factice': contenu(depot),
    'tests/': contenu(join(depot, 'tests')),
    'data/': contenu(join(depot, 'data')),
    'le dossier parent du dépôt factice': contenu(base),
  };
}

const REFUS = [
  { args: ['--garder', '.'], cas: '« --garder . » (la racine du dépôt)' },
  { args: ['--garder', '..'], cas: '« --garder .. » (hors du dépôt)' },
  { args: ['--garder', 'tests'], cas: '« --garder tests » (des fichiers suivis)' },
  { args: ['--garder', 'data'], cas: '« --garder data » (un dossier de données ignoré)' },
  { args: ['--garder', 'dist'], cas: '« --garder dist » (pas un nom .dist-…)' },
  { args: ['--garder', '-x'], cas: '« --garder -x » (pas un nom .dist-…)' },
  { args: ['--garder', 'sous/.dist-x'], cas: '« --garder sous/.dist-x » (pas à la racine)' },
  { args: ['--garder'], cas: '« --garder » sans argument' },
  { args: ['--inconnue'], cas: 'une option inconnue (« --inconnue »)' },
];

for (const { args, cas } of REFUS) {
  test(`verifier refuse ${cas} : code 2, rien de touché`, () => {
    // Chaque cas part d'un dépôt factice propre, même si un cas précédent l'a abîmé.
    ecrire('data/reel.txt', DONNEE);
    for (const d of ['.dist-verifier', 'dist', '-x', 'sous']) rmSync(join(depot, d), { recursive: true, force: true });
    const avant = etat();
    const r = verifier(args);
    assert.equal(
      r.status,
      2,
      `${cas} doit être refusé en code 2, avant tout build (Spec, point 3 : seul un nom .dist-… à la racine est accepté).${contexte(args, r)}`,
    );
    const apres = etat();
    for (const nom of Object.keys(avant)) {
      assert.deepEqual(apres[nom], avant[nom], `${cas} a modifié ${nom} : le refus doit venir avant de vider ou de construire.`);
    }
    assert.equal(
      existsSync(join(depot, 'data', 'reel.txt')) ? readFileSync(join(depot, 'data', 'reel.txt'), 'utf8') : null,
      DONNEE,
      `${cas} a touché data/reel.txt, une donnée ignorée par git.`,
    );
    assert.equal(readFileSync(join(base, 'temoin.txt'), 'utf8'), TEMOIN, `${cas} a touché un fichier hors du dépôt.`);
  });
}

// La seconde ligne : un nom .dist-… qui contient un fichier suivi. Puis la
// même chose avec des GIT_* qui pointent vers un autre dépôt, comme pendant
// un hook : verifier doit juger le dépôt où il vit, pas celui des GIT_*.
const LEURRE = () => ({
  GIT_DIR: join(base, 'leurre', '.git'),
  GIT_WORK_TREE: join(base, 'leurre'),
  GIT_INDEX_FILE: join(base, 'leurre', '.git', 'index'),
});
for (const [cas, envEnPlus] of [
  ['« --garder .dist-suivi » (un fichier suivi dedans)', {}],
  ['« --garder .dist-suivi » avec des GIT_* vers un autre dépôt', null],
]) {
  test(`verifier refuse ${cas} : code 2, rien de touché`, () => {
    const args = ['--garder', '.dist-suivi'];
    const r = verifier(args, envEnPlus ?? LEURRE());
    assert.equal(r.status, 2, `${cas} doit être refusé en code 2 : le dossier contient un fichier suivi.${contexte(args, r)}`);
    assert.equal(
      existsSync(join(depot, '.dist-suivi', 'suivi.txt')) ? readFileSync(join(depot, '.dist-suivi', 'suivi.txt'), 'utf8') : null,
      DONNEE,
      `${cas} a vidé .dist-suivi, qui contient un fichier suivi par git.`,
    );
  });
}
