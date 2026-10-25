// Test — Les présentations cachées de usecase/ restent cachées (registre/0092).
// Non référencées : noindex dans la page, absentes du sitemap et de robots.txt
// (qui est public et donnerait l'adresse), sans aucun lien depuis le site.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, exigerDist, fichiersDuSite, pagesHtml, lire, balises, liste } from './outils.mjs';

const pagesCachees = () => fichiersDuSite().filter((f) => f.startsWith('usecase/') && f.endsWith('.html'));

test('usecase : le build contient au moins une page cachée sous usecase/', () => {
  exigerDist();
  assert.ok(
    pagesCachees().length > 0,
    `Aucune page HTML sous ${join(DIST, 'usecase')}. Les présentations vivent dans public/usecase/<cas>/index.html ; ` +
      'sans elles, les tests ci-dessous passeraient à vide.',
  );
});

test('usecase : chaque page porte <meta name="robots" content="noindex, nofollow">', () => {
  exigerDist();
  const fautes = [];
  for (const f of pagesCachees()) {
    const ok = balises(lire(f), 'meta').some(
      (m) =>
        (m.attrs.name ?? '').toLowerCase() === 'robots' &&
        (m.attrs.content ?? '').toLowerCase().split(',').map((s) => s.trim()).sort().join(',') === 'nofollow,noindex',
    );
    if (!ok) fautes.push(f);
  }
  assert.equal(
    fautes.length,
    0,
    `Pages sans <meta name="robots" content="noindex, nofollow"> dans le <head> :\n${liste(fautes)}\n` +
      "GitHub Pages ne permet pas d'en-tête HTTP : la balise est le seul moyen de les non référencer.",
  );
});

test('usecase : aucune page cachée dans un sitemap*.xml', () => {
  exigerDist();
  const sitemaps = fichiersDuSite().filter((f) => /(^|\/)sitemap[^/]*\.xml$/.test(f));
  assert.ok(sitemaps.length > 0, `Aucun sitemap*.xml dans ${DIST} : le test ne vérifierait rien. Lance le build complet.`);
  const fautes = sitemaps.filter((f) => /usecase/i.test(lire(f)));
  assert.equal(
    fautes.length,
    0,
    `Le sitemap mentionne usecase :\n${liste(fautes)}\n` +
      "Une présentation cachée ne doit pas être dans le plan du site : garde-la hors de src/pages (dans public/usecase/).",
  );
});

test('usecase : aucune page du site ne contient de lien vers /usecase/', () => {
  exigerDist();
  const fautes = [];
  for (const f of pagesHtml())
    for (const { nom, attrs } of balises(lire(f), 'a|area|link'))
      if (attrs.href && /(^|[/:.])usecase(\/|$)/i.test(attrs.href.trim())) fautes.push(`${f} : <${nom} href="${attrs.href}">`);
  assert.equal(
    fautes.length,
    0,
    `Des pages du site renvoient vers usecase/ :\n${liste(fautes)}\nRetire le lien : ces pages ne s'atteignent que par une adresse transmise à la main.`,
  );
});

test('usecase : robots.txt ne mentionne pas usecase', () => {
  exigerDist();
  const robots = join(DIST, 'robots.txt');
  assert.ok(existsSync(robots), `${robots} introuvable : le test ne vérifierait rien.`);
  assert.ok(
    !/usecase/i.test(lire('robots.txt')),
    "robots.txt mentionne usecase. Il est public : y écrire l'adresse la donne à tout le monde. " +
      'Retire la ligne ; la balise noindex suffit.',
  );
});
