// Une seule commande de vérification : `npm run verifier` (registre/0107,
// section Spec et critères d'acceptation). Ne demande pas le site construit.
//
// Ce que le test tient :
// - package.json déclare le script `verifier` ;
// - le hook de pre-commit et les deux workflows appellent `verifier` et ne
//   construisent plus eux-mêmes ;
// - dans le hook, l'appel de la vitesse rapide porte `--rapide`, l'appel
//   bloquant ne le porte pas, les deux portent `--garder .dist-hook` ;
// - dans deploy.yml, le dépôt du site suit `verifier` et dépose `.dist-ci/`.
// Le comportement de verifier (vert, rouge, dossier supprimé, refus de
// `--garder`) se joue sur un dépôt factice : tests/verifier-bout-en-bout.test.mjs.
//
// Les fichiers se lisent en texte, sans parseur YAML. Les lignes entièrement
// en commentaire (« # … ») sont écartées avant de chercher ce qui est interdit :
// un commentaire peut raconter l'ancien build sans le lancer.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RACINE } from './outils.mjs';

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

/**
 * Les appels de verifier du hook, rangés selon la branche de
 * « if [ -n "$RAPIDE" ]; then … else … fi » qui les porte :
 * { rapide, bloquant, ailleurs }. Le bloc retenu est le dernier « if » de ce
 * genre avant le premier appel.
 */
function appelsParVitesse(code) {
  const lignes = code.split('\n');
  const estAppel = (l) => l.includes('npm run verifier');
  const premier = lignes.findIndex(estAppel);
  let si = -1;
  for (let i = 0; i < premier; i++) if (/^\s*if \[ -n "\$RAPIDE" \]; then\s*$/.test(lignes[i])) si = i;
  const sinon = si < 0 ? -1 : lignes.findIndex((l, i) => i > si && /^\s*else\s*$/.test(l));
  const fin = sinon < 0 ? -1 : lignes.findIndex((l, i) => i > sinon && /^\s*fi\s*$/.test(l));
  const rapide = [];
  const bloquant = [];
  const ailleurs = [];
  lignes.forEach((l, i) => {
    if (!estAppel(l)) return;
    if (si >= 0 && sinon > si && i > si && i < sinon) rapide.push(l);
    else if (sinon >= 0 && fin > sinon && i > sinon && i < fin) bloquant.push(l);
    else ailleurs.push(l);
  });
  return { rapide, bloquant, ailleurs };
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
  const { rapide, bloquant, ailleurs } = appelsParVitesse(code);
  assert.ok(
    rapide.length > 0 && bloquant.length > 0 && ailleurs.length === 0,
    `${HOOK} : verifier doit s'appeler dans les deux branches de « if [ -n "$RAPIDE" ]; then … else … fi », ` +
      `et nulle part ailleurs. Trouvé : ${rapide.length} appel(s) en vitesse rapide, ${bloquant.length} en vitesse bloquante, ` +
      `${ailleurs.length} hors de ces branches.`,
  );
  const rapidesSans = rapide.filter((l) => !/\s--rapide\b/.test(l));
  assert.deepEqual(
    rapidesSans,
    [],
    `${HOOK} : en vitesse rapide (branches chantier/*), verifier doit recevoir « --rapide ». Appels fautifs :\n${rapidesSans.join('\n')}`,
  );
  const bloquantsAvec = bloquant.filter((l) => l.includes('--rapide'));
  assert.deepEqual(
    bloquantsAvec,
    [],
    `${HOOK} : l'appel bloquant (fusions, branches hors chantier/*) ne doit PAS porter « --rapide » : ` +
      `il doit jouer tous les tests, navigateur compris. Appels fautifs :\n${bloquantsAvec.join('\n')}`,
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

test('le hook bloque un refus de verifier (code 2) dans les deux vitesses', () => {
  // Revue de 0107, tour 2 : un code 2 dit que le hook appelle mal verifier ;
  // il ne doit jamais passer pour un rouge non bloquant de la vitesse rapide.
  const code = sansCommentaires(lire(HOOK));
  const appels = code.split('\n').filter((l) => l.includes('npm run verifier'));
  const sansCode = appels.filter((l) => !/\|\|\s*CODE=\$\?\s*$/.test(l));
  assert.deepEqual(
    sansCode,
    [],
    `${HOOK} : chaque appel de verifier doit garder son code de sortie (« || CODE=$? »). Appels fautifs :\n${sansCode.join('\n')}`,
  );
  assert.match(
    code,
    /if \[ "\$CODE" -eq 2 \]; then\n(?:[^\n]*\n)*?[^\n]*REFUS[^\n]*exit 1\n\s*fi/,
    `${HOOK} : un code 2 de verifier doit mener à « REFUS … ; exit 1 », avant le rouge non bloquant.`,
  );
  assert.ok(
    code.indexOf('"$CODE" -eq 2') < code.indexOf('NON bloquant'),
    `${HOOK} : le blocage du code 2 doit venir avant le traitement du rouge non bloquant.`,
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
