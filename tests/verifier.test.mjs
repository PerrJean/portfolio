// Une seule commande de vérification : `npm run verifier` (registre/0107,
// section Spec et critères d'acceptation). Ne demande pas le site construit.
//
// Ce que le test tient :
// - package.json déclare le script `verifier` ;
// - le hook de pre-commit et les deux workflows appellent `verifier` et ne
//   construisent plus eux-mêmes ;
// - dans deploy.yml, le dépôt du site suit `verifier` et dépose `.dist-ci/` ;
// - les refus de `--garder` (point 3 de la spec) sortent en code 2, vite, sans
//   rien construire ni vider.
//
// Les fichiers se lisent en texte, sans parseur YAML. Les lignes entièrement
// en commentaire (« # … ») sont écartées avant de chercher ce qui est interdit :
// un commentaire peut raconter l'ancien build sans le lancer.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { RACINE } from './outils.mjs';

const SCRIPT = join(RACINE, 'ops', 'verifier.mjs');
const HOOK = 'ops/hooks/pre-commit';
const TESTS_YML = '.github/workflows/tests.yml';
const DEPLOY_YML = '.github/workflows/deploy.yml';

/** Le texte d'un fichier du dépôt. */
function lire(rel) {
  return readFileSync(join(RACINE, rel), 'utf8').replace(/\r\n/g, '\n');
}

/** Le texte sans ses lignes de commentaire entières (shell et YAML). */
function sansCommentaires(texte) {
  return texte
    .split('\n')
    .filter((l) => !/^\s*#/.test(l))
    .join('\n');
}

/** Les morceaux interdits présents dans un texte, pour le message d'échec. */
function interditsPresents(texte, interdits) {
  return interdits.filter((m) => texte.includes(m));
}

test('package.json déclare le script verifier', () => {
  const pkg = JSON.parse(lire('package.json'));
  const script = pkg.scripts?.verifier;
  assert.equal(
    script,
    'node ops/verifier.mjs',
    `package.json, « scripts » : attendu "verifier": "node ops/verifier.mjs", trouvé ${
      script === undefined ? 'aucun script verifier' : JSON.stringify(script)
    } (registre/0107, spec point 1).`,
  );
});

test('le hook de pre-commit appelle verifier et ne construit plus lui-même', () => {
  const code = sansCommentaires(lire(HOOK));
  const appels = code.split('\n').filter((l) => l.includes('npm run verifier'));
  assert.ok(
    appels.length > 0,
    `${HOOK} n'appelle pas « npm run verifier » : le hook construit encore lui-même. ` +
      'Remplace le build et les tests par « npm run verifier -- [--rapide] --garder .dist-hook » (0107, spec point 4).',
  );
  const sansGarder = appels.filter((l) => !/--garder\s+\.dist-hook\b/.test(l));
  assert.equal(
    sansGarder.length,
    0,
    `${HOOK} : chaque appel de verifier doit passer « --garder .dist-hook » (les alertes de rédaction lisent ce dossier après). Appels fautifs :\n${sansGarder.join('\n')}`,
  );
  assert.ok(
    appels.some((l) => l.includes('--rapide')),
    `${HOOK} : la vitesse rapide (branches chantier/*) doit appeler verifier avec « --rapide ». Appels trouvés :\n${appels.join('\n')}`,
  );
  assert.ok(
    /chantier\/\*\)\s*RAPIDE=1/.test(code) && code.includes('NON bloquant'),
    `${HOOK} : la décision de vitesse (« chantier/*) RAPIDE=1 ») et le rouge non bloquant doivent rester au hook (0107, spec point 4).`,
  );
  const restes = interditsPresents(code, ['astro build', 'node --test', 'npm test']);
  assert.deepEqual(
    restes,
    [],
    `${HOOK} lance encore lui-même ${restes.map((r) => `« ${r} »`).join(', ')} : le hook construit encore lui-même. ` +
      'Retire-les, verifier s\'en charge.',
  );
});

test('tests.yml appelle verifier et ne construit plus lui-même', () => {
  const code = sansCommentaires(lire(TESTS_YML));
  assert.match(
    code,
    /^\s*(-\s+)?run:\s*npm run verifier\s*$/m,
    `${TESTS_YML} : aucune étape « run: npm run verifier ». Remplace le build et « npm test » par cette étape (0107, spec point 5).`,
  );
  const restes = interditsPresents(code, ['astro build', 'npm test']);
  assert.deepEqual(
    restes,
    [],
    `${TESTS_YML} lance encore ${restes.map((r) => `« ${r} »`).join(', ')} : la CI construit encore elle-même. Retire ces étapes.`,
  );
});

test('deploy.yml appelle verifier, puis dépose le dossier testé', () => {
  const code = sansCommentaires(lire(DEPLOY_YML));
  const appel = 'npm run verifier -- --garder .dist-ci';
  const iAppel = code.indexOf(appel);
  assert.ok(
    iAppel >= 0,
    `${DEPLOY_YML} : le job tester n'appelle pas « ${appel} » (0107, spec point 5).`,
  );
  const restes = interditsPresents(code, ['astro build', 'npm test']);
  assert.deepEqual(
    restes,
    [],
    `${DEPLOY_YML} lance encore ${restes.map((r) => `« ${r} »`).join(', ')} : la CI construit encore elle-même. Retire ces étapes.`,
  );
  const iDepot = code.indexOf('actions/upload-pages-artifact');
  assert.ok(iDepot >= 0, `${DEPLOY_YML} : l'étape actions/upload-pages-artifact a disparu ; rien ne serait publié.`);
  assert.ok(
    iDepot > iAppel,
    `${DEPLOY_YML} : l'étape actions/upload-pages-artifact doit venir APRÈS « ${appel} », pour ne publier qu'un site testé.`,
  );
  // L'étape de dépôt va jusqu'à la prochaine étape (« - ») ou la fin du fichier.
  const suite = code.slice(iDepot);
  const fin = suite.search(/\n\s*- /);
  const etape = fin >= 0 ? suite.slice(0, fin) : suite;
  assert.match(
    etape,
    /^\s*path:\s*\.dist-ci\/\s*$/m,
    `${DEPLOY_YML} : l'étape actions/upload-pages-artifact doit déposer « path: .dist-ci/ », le dossier gardé par verifier. Étape trouvée :\n${etape}`,
  );
});

/** Les noms d'un dossier, triés ; null s'il n'existe pas. */
function contenu(dossier) {
  return existsSync(dossier) ? readdirSync(dossier).sort() : null;
}

const SURVEILLES = {
  'tests/': join(RACINE, 'tests'),
  'la racine du dépôt': RACINE,
  'le dossier parent du dépôt': dirname(RACINE.replace(/[\\/]$/, '')),
};

const REFUS = [
  { args: ['--garder', '.'], cas: '« --garder . » (la racine du dépôt)' },
  { args: ['--garder', '..'], cas: '« --garder .. » (hors du dépôt)' },
  { args: ['--garder', 'tests'], cas: '« --garder tests » (un dossier qui contient des fichiers suivis)' },
  { args: ['--garder'], cas: '« --garder » sans argument' },
  { args: ['--inconnue'], cas: 'une option inconnue (« --inconnue »)' },
];

const DELAI_MS = 10_000;

for (const { args, cas } of REFUS) {
  test(`verifier refuse ${cas} : code 2, sans rien construire`, { timeout: DELAI_MS + 5_000 }, () => {
    const avant = Object.fromEntries(Object.entries(SURVEILLES).map(([nom, d]) => [nom, contenu(d)]));
    const debut = Date.now();
    const r = spawnSync(process.execPath, [SCRIPT, ...args], {
      cwd: RACINE,
      encoding: 'utf8',
      timeout: DELAI_MS,
    });
    const duree = Date.now() - debut;

    for (const [nom, d] of Object.entries(SURVEILLES)) {
      assert.deepEqual(
        contenu(d),
        avant[nom],
        `node ops/verifier.mjs ${args.join(' ')} a modifié ${nom} : le refus doit venir AVANT de vider ou de construire quoi que ce soit.`,
      );
    }
    assert.ok(
      !(r.error && r.error.code === 'ETIMEDOUT'),
      `node ops/verifier.mjs ${args.join(' ')} tourne encore après ${DELAI_MS / 1000} s : le refus doit être immédiat, avant tout build.`,
    );
    const absent = existsSync(SCRIPT) ? '' : 'le script verifier n\'existe pas (ops/verifier.mjs) : ';
    assert.equal(
      r.status,
      2,
      `${absent}code ${r.status} au lieu de 2 pour ${cas} (0107, spec point 3), en ${duree} ms.\n` +
        `Sortie d'erreur : ${(r.stderr || '').trim().split('\n').slice(0, 3).join(' | ')}`,
    );
  });
}
