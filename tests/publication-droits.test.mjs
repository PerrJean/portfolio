// Les droits de publication et les listes de confidentialité dans la CI
// (registre/0120). Ne demande pas le site construit.
//
// Ce que le test tient :
// - deploy.yml ne donne au workflow que `contents: read` ; `pages: write` et
//   `id-token: write` (qu'exige actions/deploy-pages) ne sont posés que sur
//   le job `publier`, qui attend `tester` dans l'environnement github-pages ;
//   aucun autre job ne déclare de droits, sous aucune forme : `tester`
//   installe et lance du code tiers (npm ci, Playwright) ;
// - dans deploy.yml et tests.yml, l'étape « Listes de confidentialité »
//   vient après `npm ci` et l'installation de Chromium, juste avant
//   `npm run verifier`, et aucun secret ni ~/.portfolio n'apparaît ailleurs
//   (pas même `toJSON(secrets)`) : les scripts d'installation des paquets ne
//   voient pas les listes pendant qu'ils tournent. Un processus qu'ils
//   laisseraient en arrière-plan, le build et les tests, eux, peuvent les
//   lire : la protection ne couvre que le temps de l'installation.
//
// Les fichiers se lisent en texte, sans parseur YAML, lignes de commentaire
// écartées.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RACINE } from './outils.mjs';

const DEPLOY_YML = '.github/workflows/deploy.yml';
const TESTS_YML = '.github/workflows/tests.yml';
const DROITS_DE_PUBLICATION = ['pages', 'id-token'];

/** Les lignes d'un fichier du dépôt, sans les lignes de commentaire entières. */
function lignes(rel) {
  return readFileSync(join(RACINE, rel), 'utf8')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((l) => !/^\s*#/.test(l));
}

const indentation = (l) => l.match(/^ */)[0].length;

/** Les lignes enfants (plus indentées, non vides) de la ligne `i`. */
function enfants(ls, i) {
  const base = indentation(ls[i]);
  const bloc = [];
  for (let j = i + 1; j < ls.length; j++) {
    if (ls[j].trim() === '') continue;
    if (indentation(ls[j]) <= base) break;
    bloc.push(ls[j]);
  }
  return bloc;
}

/** Les droits d'un bloc `permissions:` : { nom: valeur }. */
function droits(bloc) {
  const base = Math.min(...bloc.map(indentation));
  return Object.fromEntries(
    bloc
      .filter((l) => indentation(l) === base)
      .map((l) => l.trim().match(/^([\w-]+):\s*(\S+)/))
      .filter(Boolean)
      .map((m) => [m[1], m[2]]),
  );
}

/** Les jobs d'un workflow : { nom: lignes du job }. */
function jobs(ls) {
  const i = ls.findIndex((l) => /^jobs:\s*$/.test(l));
  assert.ok(i >= 0, 'aucun bloc « jobs: » à la racine du workflow');
  const corps = enfants(ls, i);
  const base = Math.min(...corps.map(indentation));
  const res = {};
  let courant = null;
  for (const l of corps) {
    const m = indentation(l) === base && l.trim().match(/^([\w-]+):\s*$/);
    if (m) res[(courant = m[1])] = [];
    else if (courant) res[courant].push(l);
  }
  return res;
}

/** Le bloc `permissions:` directement sous un niveau donné, ou null. */
function blocPermissions(ls, niveau) {
  const i = ls.findIndex((l) => indentation(l) === niveau && /^\s*permissions:\s*$/.test(l));
  return i < 0 ? null : droits(enfants(ls, i));
}

test('deploy.yml : le workflow ne donne que « contents: read »', () => {
  const ls = lignes(DEPLOY_YML);
  assert.ok(
    !ls.some((l) => /^permissions:\s*\S/.test(l)),
    `${DEPLOY_YML} : « permissions » du workflow doit être un bloc, pas une valeur en ligne (write-all, read-all…).`,
  );
  const p = blocPermissions(ls, 0);
  assert.deepEqual(
    p,
    { contents: 'read' },
    `${DEPLOY_YML} : les droits du workflow doivent se réduire à « contents: read » ; « pages » et « id-token » vont sur le seul job publier (registre/0120).`,
  );
});

test('deploy.yml : seul le job publier reçoit des droits, et il attend tester', () => {
  const tous = jobs(lignes(DEPLOY_YML));
  assert.ok(tous.publier, `${DEPLOY_YML} : le job « publier » a disparu.`);
  assert.ok(tous.tester, `${DEPLOY_YML} : le job « tester » a disparu.`);
  const niveau = Math.min(...tous.publier.filter((l) => l.trim()).map(indentation));
  const p = blocPermissions(tous.publier, niveau);
  assert.ok(p, `${DEPLOY_YML} : le job publier n'a pas de bloc « permissions » ; actions/deploy-pages exige « pages: write » et « id-token: write ».`);
  for (const d of DROITS_DE_PUBLICATION) {
    assert.equal(p[d], 'write', `${DEPLOY_YML} : le job publier doit avoir « ${d}: write ».`);
  }
  assert.ok(
    tous.publier.some((l) => indentation(l) === niveau && /^\s*needs:\s*\[?\s*tester\s*\]?\s*$/.test(l)),
    `${DEPLOY_YML} : le job publier doit attendre tester (« needs: tester ») : rien ne part avant les tests.`,
  );
  const env = tous.publier.findIndex((l) => indentation(l) === niveau && /^\s*environment:\s*$/.test(l));
  assert.ok(
    env >= 0 && enfants(tous.publier, env).some((l) => /^\s*name:\s*github-pages\s*$/.test(l)),
    `${DEPLOY_YML} : le job publier doit garder l'environnement « github-pages ».`,
  );
  // Tout autre job hérite des seuls droits du workflow (contents: read) : aucun
  // bloc « permissions », sous aucune forme (bloc, flux, write-all…).
  for (const [nom, corps] of Object.entries(tous)) {
    if (nom === 'publier') continue;
    const fautifs = corps.filter((l) => /^\s*["']?permissions["']?\s*:/.test(l));
    assert.deepEqual(
      fautifs,
      [],
      `${DEPLOY_YML} : le job « ${nom} » déclare ses propres droits ; seul publier en reçoit (registre/0120).`,
    );
  }
});

for (const rel of [DEPLOY_YML, TESTS_YML]) {
  test(`${rel} : les secrets des listes ne servent que dans l'étape des listes`, () => {
    const ls = lignes(rel);
    const debut = ls.findIndex((l) => /^\s*-?\s*name:\s*Listes de confidentialité\s*$/.test(l));
    assert.ok(debut >= 0, `${rel} : étape « Listes de confidentialité » introuvable.`);
    const base = indentation(ls[debut]);
    let fin = debut + 1;
    while (fin < ls.length && (ls[fin].trim() === '' || indentation(ls[fin]) > base)) fin++;
    const sensibles = /\bsecrets\b|\.portfolio\b/;
    const ailleurs = ls.filter((l, i) => (i < debut || i >= fin) && sensibles.test(l));
    assert.deepEqual(
      ailleurs,
      [],
      `${rel} : un secret (INTERDITS, EMPLOYEUR, toJSON(secrets)…) ou ~/.portfolio apparaît hors de l'étape des listes (env du job, autre étape…) : npm ci pourrait les voir (registre/0120).`,
    );
  });
}

for (const rel of [DEPLOY_YML, TESTS_YML]) {
  test(`${rel} : les listes arrivent après l'installation, juste avant verifier`, () => {
    const ls = lignes(rel);
    const ou = (motif, quoi) => {
      const i = ls.findIndex((l) => motif.test(l));
      assert.ok(i >= 0, `${rel} : étape introuvable : ${quoi}.`);
      return i;
    };
    const listes = ou(/^\s*-?\s*name:\s*Listes de confidentialité\s*$/, '« Listes de confidentialité »');
    const npmCi = ou(/^\s*-?\s*run:\s*npm ci\s*$/, '« npm ci »');
    const chromium = ou(/^\s*-?\s*run:\s*npx playwright install\b/, "l'installation de Chromium");
    const verifier = ou(/^\s*-?\s*run:\s*npm run verifier\b/, '« npm run verifier »');
    assert.ok(
      listes > npmCi && listes > chromium,
      `${rel} : les listes doivent être écrites après « npm ci » et l'installation de Chromium, pour que leurs scripts ne les lisent pas (registre/0120).`,
    );
    const entre = ls.slice(listes + 1, verifier).filter((l) => /^\s*-\s/.test(l));
    assert.ok(
      listes < verifier && entre.length === 0,
      `${rel} : l'étape des listes doit précéder immédiatement « npm run verifier ». Étapes entre les deux :\n${entre.join('\n')}`,
    );
  });
}
