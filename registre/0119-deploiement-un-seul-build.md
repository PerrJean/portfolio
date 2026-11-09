# 0119 — La publication publie le site qu'elle a testé, construit une fois

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `clos 2026-11-09` | 80 | 236 | `claude-opus-5-5` |

**Demande de Jean (2026-11-09)**, relevé en examinant 0107 : la publication
construit le site deux fois.

**Constat** (`.github/workflows/deploy.yml`, `tests.yml`) :
1. Le job `tester` construit le site (`npx astro build --outDir .dist-ci`) et
   le teste ; le job `construire` le reconstruit à neuf avec
   `withastro/action`, et c'est **ce second build, non testé**, qui part en
   ligne. Le temps de publication paie deux builds, et ce qui est publié n'est
   pas, à la lettre, ce qui a été testé.
2. Un envoi sur `main` déclenche **aussi** `tests.yml`, qui rejoue les mêmes
   tests (Chromium compris) en parallèle de `deploy.yml`.

**Périmètre** :
1. Publier le site construit et testé par `tester` (`actions/upload-pages-artifact`
   sur `.dist-ci`), et supprimer le job `construire`.
2. Ne plus lancer `tests.yml` sur un envoi sur `main` (les pull requests,
   Dependabot compris, le gardent), puisque `deploy.yml` y teste déjà.
3. Vérifier d'abord que les tests n'écrivent rien dans `.dist-ci` ; sinon,
   publier une copie prise avant les tests.

**Preuve** : la durée d'une publication avant et après (page Actions du
dépôt) ; le site en ligne inchangé (quelques pages relues, `sitemap`
compris) ; un test rouge empêche toujours toute publication.

**Hors périmètre** : la commande `verifier` (0107), qui remplacera plus tard
les deux lignes build puis tests de `tester`.

## Mesures avant le changement (2026-11-09)

- **Référence** : `npx astro build --outDir .dist-ci` puis `DIST=.dist-ci
  npm test` dans le worktree : build vert, 287 tests, 287 verts.
- **Les tests n'écrivent rien dans `.dist-ci`** : empreintes SHA-256 des
  78 fichiers et arborescence relevées avant et après `npm test`,
  identiques (`diff` muet). On publie donc `.dist-ci` tel quel, sans copie.
- **Les deux builds donnent le même site** : `withastro/action@v6` lance
  `npm run build` (`astro build`, sortie `dist/`) sous Node 24, comme
  `tester` ; `site` est figé dans `astro.config.mjs`, aucun `base`.
  `npm run build` et `npx astro build --outDir .dist-ci` en local :
  `diff -rq dist .dist-ci` muet. Et le site en ligne (build de
  `withastro/action`, commit `6450366`) est identique octet pour octet au
  `.dist-ci` local, 78 fichiers sur 78 (`curl` puis `cmp`).
- **Seules différences de l'action** : `npm install` au lieu de `npm ci`
  (`tester` garde `npm ci`, plus strict), un cache d'images Astro (sans
  effet sur la sortie), et `include-hidden-files: true` au dépôt, repris.
- **Durée avant** (API publique des Actions, trois dernières publications) :
  231 s, 229 s, 298 s au total ; `construire` n'y pèse que 16 à 20 s,
  `tester` 64 à 71 s, `publier` 101 à 195 s (l'attente de GitHub Pages). Le
  gain attendu est modeste : un job et son démarrage.

## Clôture (2026-11-09)

- **Fait** : `deploy.yml` dépose `.dist-ci` par `actions/upload-pages-artifact@v5`
  à la suite de `npm test`, dans `tester` ; le job `construire` disparaît,
  `publier` attend `tester`. `tests.yml` ne se lance plus que sur les pull
  requests (Dependabot comprises). Chromium et les deux secrets inchangés.
- **Un test rouge bloque toujours** : le dépôt du site vient après
  `npm test` dans le même job, donc un échec arrête le job avant le dépôt ;
  `publier` attend `tester` et, sans dépôt, `deploy-pages` n'a rien à publier.
- **Revue** (sous-agent neuf, lecture seule) : PASSE au premier tour, aucun
  problème. Cassures examinées : dépôt avant les tests, `needs` faux, chemin
  faux : toutes bruyantes ou bloquées, sauf un `path` pointé vers un autre
  dossier existant.
- **Hook bloquant** vert à chaque commit et aux deux fusions (intégration de
  `main` après 0114, puis fusion dans `main`) : build, 287 tests.
- **Durée après** : publication `42655113862` (commit `81727d1`), **115 s**
  (`tester` 65 s, `publier` 43 s), contre 229 à 298 s pour les trois
  précédentes. Sur l'envoi, seul « Publier sur GitHub Pages » est parti, plus
  de « Tests » en double. Une seule mesure : `publier` dépend surtout de
  l'attente de GitHub Pages, qui varie d'un passage à l'autre.
- **Site en ligne inchangé** : après la publication, les 78 fichiers en ligne
  sont identiques octet pour octet à un build local du commit fusionné
  (`npm ci` puis `npx astro build`, `curl` puis `cmp`), `sitemap-index.xml`
  et `sitemap-0.xml` compris ; `/`, `/en/`, `/projets/audit-contenu/`,
  `/a-propos/` en 200.
- **Coût relevé au harnais** : 236 = 154 k de contexte de la session à la
  clôture (`get_usage`, dont environ 87 k de charge fixe) + 82 k pour la
  revue (sous-agent). Ratio 2,95 pour 80 estimés : la charge fixe d'une
  session et la revue n'étaient pas comptées, et les attentes du hook
  complet (trois passages) ont allongé la session.
- **Suites relevées, hors périmètre** :
  1. `docs/GUIDE_MISE_EN_LIGNE.md` (ligne 36) dit encore que
     `withastro/action` construit le site.
  2. Les droits `pages: write` et `id-token: write` sont donnés à tout le
     workflow, `tester` compris (qui lance `npm ci` et Playwright) : ils
     pourraient ne s'appliquer qu'à `publier`.
