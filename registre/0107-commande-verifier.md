# 0107 — Une seule commande de vérification : `verifier`

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `en cours` | 50 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)**, dans la mise en conformité avec les
commandements v4 (règle 11) : une seule commande, la même pour Jean, pour
l'agent, pour le hook et pour la CI.

**Constat** : `npm test` suppose un site déjà construit (`tests/outils.mjs`,
variable `DIST`). Le hook (`ops/hooks/pre-commit`) et la CI
(`.github/workflows/tests.yml`) enchaînent chacun à leur façon le build puis
les tests.

**Périmètre** : une commande `verifier` (build dans un dossier jetable, puis
tous les tests), appelée telle quelle par le hook, la CI et l'agent ; la
vitesse rapide des branches `chantier/*` (0106) reste au hook.

**Hors périmètre** : le contrôle du poste, couvert par la skill globale
`verification-prealable`.

## Tranché

- **2026-11-09, Jean** (par la session qui a lancé le chantier) : 0119 est
  clos, `deploy.yml` publie le dossier même qu'il a testé (`.dist-ci`). Le job
  `tester` appelle donc `npm run verifier -- --garder .dist-ci`, et le dépôt
  du site (`upload-pages-artifact`) reste derrière. La preuve inclut une
  publication réelle après la fusion, site en ligne inchangé.
- **2026-11-09, Jean** (idem) : la vitesse rapide du hook ne s'applique pas
  aux branches `claude/chantier-…` des sessions ; on la mesure et on la
  signale, sans la changer.

## Spec

1. **`npm run verifier`** (`package.json` : `node ops/verifier.mjs`). Le
   script se place à la racine du dépôt, vide puis construit le site dans
   `.dist-verifier` (ignoré par `.dist-*/`), lance **tous** les
   `tests/**/*.test.mjs` dessus avec `DIST`, supprime le dossier, que ça
   passe ou non. Ni `npx` ni shell : node lance astro et `node --test`. Le
   journal du build ne s'affiche qu'en cas d'échec. Dernière ligne :
   `verifier : VERT` ou `verifier : ROUGE (<le build echoue | des tests
   echouent>)`, avec les durées. Code de sortie 0 au vert, 1 au rouge.
2. **`--rapide`** : sans `tests/*-navigateur.test.mjs`.
3. **`--garder <dossier>`** : le site se construit dans ce dossier, qui reste
   après, vert ou rouge. Comme il est vidé d'abord, le script refuse (code 2,
   avant tout build) un dossier hors du dépôt, la racine elle-même, ou un
   dossier qui contient un fichier suivi par git. Option inconnue ou
   argument manquant : code 2.
4. **Le hook** garde la décision de vitesse et le « rouge non bloquant » ;
   seule l'exécution passe à `npm run verifier -- [--rapide] --garder
   .dist-hook`. Le reste du hook est inchangé.
5. **La CI** : `tests.yml` appelle `npm run verifier` ; le job `tester` de
   `deploy.yml` appelle `npm run verifier -- --garder .dist-ci`, puis dépose
   `.dist-ci/`. Les étapes d'avant (secrets, `npm ci`, Chromium) ne bougent
   pas.
6. `CLAUDE.md`, « Comment on lance », gagne `npm run verifier` ; `npm test`
   reste, pour un site déjà construit.

**Critères d'acceptation** : un test statique (`tests/verifier.test.mjs`)
vérifie que le hook et les deux workflows appellent `verifier` et ne
construisent plus eux-mêmes, que le dépôt suit `verifier` dans `deploy.yml`,
et que les refus du point 3 sortent en code 2 sans build. `npm run verifier`
vert sous Git Bash et sous PowerShell, durée relevée ; `--rapide` ne lance
aucun test `-navigateur` ; un test cassé puis un build cassé (copie jetable)
donnent un code non nul et suppriment le dossier jetable ; le hook bloquant
joue tout ; publication réelle verte après la fusion, site en ligne inchangé.

## Déroulé

- **État de référence (2026-11-09)**, dans le worktree, après `npm ci` :
  `npx astro build --outDir .dist-ref` puis `DIST=.dist-ref npm test` →
  289 tests, 289 verts, 0 rouge ; 101 s build compris.

- **Vitesse rapide hors d'atteinte des sessions (2026-11-09)** : le hook ne
  passe en vitesse rapide que sur `chantier/*` (`case "$BRANCHE" in
  chantier/*)`). `git branch -a` : aucune branche `chantier/*` ; les dix
  branches de chantier des sessions s'appellent `claude/chantier-…`. Chaque
  point d'étape d'une session joue donc le hook complet, bloquant. À Jean de
  trancher (élargir le motif, ou nommer les branches `chantier/…`).
