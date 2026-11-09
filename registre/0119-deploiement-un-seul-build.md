# 0119 — La publication publie le site qu'elle a testé, construit une fois

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `en cours` | 80 | | `claude-opus-5-5` |

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
