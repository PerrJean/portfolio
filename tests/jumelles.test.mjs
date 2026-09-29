// Test 1 — Jumelles (C7) : chaque page FR a sa jumelle EN, et la bascule
// mène de l'une à l'autre.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { PAGES, exigerDist, fichierDePage, balises, liste } from './outils.mjs';

/** Le chemin d'un href : '/en/' reste '/en/', 'https://x.fr/en/' devient '/en/'. */
const chemin = (href) => {
  try {
    return new URL(href, 'https://site.invalid').pathname;
  } catch {
    return href;
  }
};

for (const { chemin: page, lang, jumelle, langJumelle } of PAGES) {
  test(`jumelles (C7) : ${page} existe, est en lang="${lang}" et bascule vers ${jumelle}`, { todo: '2b' }, () => {
    exigerDist();
    const fichier = fichierDePage(page);
    assert.ok(existsSync(fichier), `La page ${page} manque : ${fichier} n'existe pas.`);
    const html = readFileSync(fichier, 'utf8');
    const fautes = [];

    // <html lang="…">
    const racine = balises(html, 'html')[0];
    if (!racine) fautes.push('aucune balise <html>');
    else if (racine.attrs.lang !== lang)
      fautes.push(`<html lang="${racine.attrs.lang ?? ''}"> : attendu lang="${lang}"`);

    // La bascule : un <a hreflang> qui mène à la jumelle exacte.
    const bascules = balises(html, 'a').filter((b) => 'hreflang' in b.attrs);
    if (bascules.length === 0)
      fautes.push(`aucun lien de bascule : attendu <a href="${jumelle}" hreflang="${langJumelle}">`);
    for (const { attrs } of bascules) {
      if (attrs.href !== jumelle)
        fautes.push(`le lien de bascule mène à "${attrs.href ?? ''}" : attendu href="${jumelle}" (la jumelle exacte)`);
      if (attrs.hreflang !== langJumelle)
        fautes.push(`le lien de bascule porte hreflang="${attrs.hreflang}" : attendu hreflang="${langJumelle}"`);
    }

    // <link rel="alternate" hreflang="…"> déclare les deux versions.
    const alternates = balises(html, 'link').filter((b) =>
      (b.attrs.rel ?? '').toLowerCase().split(/\s+/).includes('alternate') && 'hreflang' in b.attrs,
    );
    const attendus = { [lang]: page, [langJumelle]: jumelle };
    for (const [l, cible] of Object.entries(attendus)) {
      const trouves = alternates.filter((b) => b.attrs.hreflang === l);
      if (trouves.length === 0)
        fautes.push(`aucun <link rel="alternate" hreflang="${l}" href="${cible}">`);
      else if (!trouves.some((b) => chemin(b.attrs.href ?? '') === cible))
        fautes.push(
          `<link rel="alternate" hreflang="${l}"> mène à "${trouves[0].attrs.href ?? ''}" : attendu le chemin ${cible}`,
        );
    }

    assert.equal(fautes.length, 0, `Page ${page} :\n${liste(fautes)}`);
  });
}
