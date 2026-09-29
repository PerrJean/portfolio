// Test 5 — Liens internes : tout <a href> qui commence par « / » mène à un
// fichier existant de dist/ (dossier avec index.html, ou fichier).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, exigerDist, pagesHtml, lire, balises, liste } from './outils.mjs';

const estFichier = (p) => existsSync(p) && statSync(p).isFile();

/** Vrai si le chemin de site (sans ? ni #) existe dans dist/. */
function existe(cheminSite) {
  let p;
  try {
    p = decodeURIComponent(cheminSite);
  } catch {
    return false;
  }
  const disque = join(DIST, ...p.split('/').filter(Boolean));
  if (p.endsWith('/')) return estFichier(join(disque, 'index.html'));
  return estFichier(disque) || estFichier(join(disque, 'index.html'));
}

test('liens internes : chaque <a href="/…"> mène à un fichier de dist/', () => {
  exigerDist();
  const fautes = [];
  for (const f of pagesHtml())
    for (const { attrs } of balises(lire(f), 'a')) {
      const href = (attrs.href ?? '').trim();
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const cheminSite = href.split(/[?#]/)[0] || '/';
      if (!existe(cheminSite)) fautes.push(`${f} : <a href="${href}"> ne mène à rien dans dist/`);
    }
  assert.equal(fautes.length, 0, `Liens internes cassés :\n${liste(fautes)}`);
});
