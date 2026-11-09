// Les droits de publication et les listes de confidentialité dans la CI
// (registre/0120). Ne demande pas le site construit.
//
// Ce que le test tient :
// - deploy.yml ne donne au workflow que `contents: read` ; `pages: write` et
//   `id-token: write` (qu'exige actions/deploy-pages) ne sont posés que sur
//   le job `publier`, jamais sur `tester`, qui installe et lance du code
//   tiers (npm ci, Playwright) ;
// - dans deploy.yml et tests.yml, l'étape « Listes de confidentialité »
//   vient après `npm ci` et l'installation de Chromium, juste avant
//   `npm run verifier` : les scripts d'installation des paquets ne voient
//   pas les listes. Le build et les tests, eux, les voient : la protection
//   ne couvre que l'installation.
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

test('deploy.yml : seul le job publier peut publier', () => {
  const tous = jobs(lignes(DEPLOY_YML));
  assert.ok(tous.publier, `${DEPLOY_YML} : le job « publier » a disparu.`);
  assert.ok(tous.tester, `${DEPLOY_YML} : le job « tester » a disparu.`);
  const niveau = Math.min(...tous.publier.filter((l) => l.trim()).map(indentation));
  const p = blocPermissions(tous.publier, niveau);
  assert.ok(p, `${DEPLOY_YML} : le job publier n'a pas de bloc « permissions » ; actions/deploy-pages exige « pages: write » et « id-token: write ».`);
  assert.equal(p.pages, 'write', `${DEPLOY_YML} : le job publier doit avoir « pages: write ».`);
  assert.equal(p['id-token'], 'write', `${DEPLOY_YML} : le job publier doit avoir « id-token: write ».`);
  for (const [nom, corps] of Object.entries(tous)) {
    if (nom === 'publier') continue;
    const fautifs = corps.filter((l) =>
      DROITS_DE_PUBLICATION.some((d) => new RegExp(`^\\s*${d}:\\s*write`).test(l)) || /\bwrite-all\b/.test(l),
    );
    assert.deepEqual(
      fautifs,
      [],
      `${DEPLOY_YML} : le job « ${nom} » reçoit un droit de publication ; seul publier doit l'avoir (registre/0120).`,
    );
  }
});

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
