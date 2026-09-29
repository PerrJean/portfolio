// Test 2 — Aucune ressource tierce, aucun cookie (C6).
// Seuls les <a href> sortants sont permis, et le seul attendu est LinkedIn.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  exigerDist, pagesHtml, feuillesCss, scriptsJs, lire, balises, contenus, sansCode,
  estTiers, liste, LIENS_SORTANTS_PERMIS, ORIGINE_DU_SITE,
} from './outils.mjs';

const RAPPEL =
  'Polices, scripts, images et styles sont servis par le site (CONTRAT, « Aucune requête vers un tiers »). ' +
  `Une URL absolue n'est admise que vers l'origine du site (astro.config.mjs, site : ${ORIGINE_DU_SITE ?? 'non déclaré'}) ; ` +
  'préfère les chemins qui commencent par « / ».';

/** Les URL de url(…) et @import d'un texte CSS. */
function urlsCss(css) {
  const sortie = [];
  for (const m of css.matchAll(/url\(\s*(['"]?)([^'")]*)\1\s*\)/gi)) sortie.push(['url()', m[2]]);
  for (const m of css.matchAll(/@import\s+(?:url\(\s*)?(['"]?)([^'")\s;]+)\1/gi)) sortie.push(['@import', m[2]]);
  return sortie;
}

/** Les URL d'un srcset : « a.png 1x, b.png 2x » → ['a.png', 'b.png']. */
const urlsSrcset = (v) => v.split(',').map((p) => p.trim().split(/\s+/)[0]).filter(Boolean);

test('tiers (C6) : aucune ressource chargée depuis un autre domaine, dans le HTML', { todo: '2b' }, () => {
  exigerDist();
  const fautes = [];
  for (const f of pagesHtml()) {
    const html = lire(f);
    for (const { nom, attrs } of balises(html)) {
      const candidats = [];
      if (attrs.src) candidats.push(['src', attrs.src]);
      if (attrs.poster) candidats.push(['poster', attrs.poster]);
      if (attrs.srcset) for (const u of urlsSrcset(attrs.srcset)) candidats.push(['srcset', u]);
      if (nom !== 'a' && nom !== 'area') {
        if (attrs.href) candidats.push(['href', attrs.href]);
        if (attrs['xlink:href']) candidats.push(['xlink:href', attrs['xlink:href']]);
      }
      for (const [attr, url] of candidats)
        if (estTiers(url)) fautes.push(`${f} : <${nom} ${attr}="${url}">`);
    }
    // url(…) et @import dans les <style> et les attributs style="…".
    const css = [...contenus(html, 'style'), ...balises(html).map((b) => b.attrs.style ?? '')].join('\n');
    for (const [genre, url] of urlsCss(css)) if (estTiers(url)) fautes.push(`${f} : ${genre} ${url}`);
  }
  assert.equal(fautes.length, 0, `Ressources tierces dans le HTML :\n${liste(fautes)}\n${RAPPEL}`);
});

test('tiers (C6) : aucun url(…) ni @import vers un autre domaine, dans le CSS', { todo: '2b' }, () => {
  exigerDist();
  const fautes = [];
  for (const f of feuillesCss())
    for (const [genre, url] of urlsCss(lire(f))) if (estTiers(url)) fautes.push(`${f} : ${genre} ${url}`);
  assert.equal(fautes.length, 0, `Ressources tierces dans le CSS :\n${liste(fautes)}\n${RAPPEL}`);
});

test('tiers (C6) : le seul lien sortant est LinkedIn', { todo: '2b' }, () => {
  exigerDist();
  const fautes = [];
  for (const f of pagesHtml())
    for (const { nom, attrs } of balises(lire(f), 'a|area'))
      if (attrs.href && estTiers(attrs.href) && !LIENS_SORTANTS_PERMIS.includes(attrs.href.trim()))
        fautes.push(`${f} : <${nom} href="${attrs.href}">`);
  assert.equal(
    fautes.length,
    0,
    `Liens sortants non prévus :\n${liste(fautes)}\nSeul est permis : ${LIENS_SORTANTS_PERMIS.join(', ')}`,
  );
});

test('tiers (C6) : aucun document.cookie ni Set-Cookie dans les scripts', { todo: '2b' }, () => {
  exigerDist();
  const fautes = [];
  const verifier = (ou, code) => {
    if (/document\s*\.\s*cookie/.test(code)) fautes.push(`${ou} : document.cookie`);
    if (/set-cookie/i.test(code)) fautes.push(`${ou} : Set-Cookie`);
  };
  for (const f of scriptsJs()) verifier(f, lire(f));
  for (const f of pagesHtml()) {
    const html = lire(f);
    contenus(html, 'script').forEach((code, i) => verifier(`${f} (<script> n° ${i + 1})`, code));
    // Gestionnaires en ligne (onclick="…") : du script aussi.
    for (const { attrs } of balises(sansCode(html)))
      for (const [nom, v] of Object.entries(attrs)) if (nom.startsWith('on')) verifier(`${f} (${nom})`, v);
  }
  assert.equal(fautes.length, 0, `Cookies dans les scripts (CONTRAT, « Aucun cookie, aucun traceur ») :\n${liste(fautes)}`);
});
