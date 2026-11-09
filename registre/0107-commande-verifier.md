# 0107 — Une seule commande de vérification : `verifier`

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `outil` | `clos 2026-11-09` | 50 | 563 | `claude-opus-5-5` |

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
- **2026-11-09, Jean** : la vitesse rapide vaut aussi pour les branches
  `claude/chantier-*` (`registre/0106`, Tranché ; `e4cf22f`).
- **2026-11-09, Jean**, les trois choix faits hors spec par la session :
  1. **`--garder` n'accepte qu'un nom `.dist-…` à la racine** : confirmé.
     Une option qui protège des fichiers doit rester étroite.
  2. **Un appel mal formé (code 2) bloque le hook, même en vitesse rapide** :
     confirmé. C'est une erreur de configuration ; s'il passait en silence,
     le hook ne vérifierait plus rien sans qu'on le sache.
  3. **`verifier` ignore les variables `GIT_*`** : confirmé, à condition que
     `git commit -a` et `git commit <chemin>` (où Git passe un index
     temporaire par `GIT_INDEX_FILE`) contrôlent le bon contenu. **Essai du
     2026-11-09**, worktree jetable, hook complet : Git passe bien un index
     temporaire (`index.lock` pour `-a`, `next-index-*.lock` pour un
     chemin) ; un test rouge ajouté au fichier commité est vu et le commit
     refusé dans les deux cas ; témoin vert accepté. `verifier` construit et
     teste **le disque**, jamais un index : `GIT_INDEX_FILE` ne sert qu'au
     contrôle de `--garder` (`git ls-files` sur un dossier ignoré), où
     l'ignorer est sans effet. On garde donc l'exclusion de tous les
     `GIT_*`. **Limite, indépendante de ce choix** (déjà dite en 0108) : le
     hook juge le disque, pas ce qui est commité ; un commit d'un seul
     chemin est refusé si un autre fichier modifié mais non commité est
     rouge (essai : refusé), et l'inverse passerait.

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
   argument manquant : code 2. **Complété au tour 2 de revue** : le dossier
   doit être un nom `.dist-…` à la racine du dépôt (le motif que
   `.gitignore` réserve aux builds jetables) ; tout autre nom, `data`,
   `dist` ou `-x` compris, est refusé.
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
  Mesuré sur ce chantier : le premier point d'étape (trois fichiers de texte)
  a pris **2 min 50** de hook ; et le test écrit d'abord, rouge par
  construction, **ne peut pas être committé** seul (le hook bloquant le
  refuse, `--no-verify` est exclu) : il part avec le code.
- **Le test d'abord** (sous-agent, brief `prompts/9-verifier-test.md`) :
  `tests/verifier.test.mjs`, 186 lignes, 9 tests. `node --test
  tests/verifier.test.mjs` → 9 rouges, chacun pour le comportement absent
  (script non déclaré, hook et workflows qui construisent encore, « code 1 au
  lieu de 2 » sur les cinq refus). Coût relevé au harnais : 80.
- **Le code** (sous-agent, brief `prompts/9-verifier.md`) : `ops/verifier.mjs`,
  143 lignes ; hook, `tests.yml`, `deploy.yml`, `package.json`, `CLAUDE.md`.
  Test d'arrivée 9/9 sans y toucher. **Hors spec**, deux refus de plus pour
  `--garder` : un fichier, et un chemin qui passe par `.git`, `node_modules`
  ou `.claude` ; le refus « fichier suivi » couvre aussi les fichiers
  nouveaux non ignorés (un premier essai en copie jetable avait effacé un
  fichier non suivi). Rapport : Git Bash 298 tests verts en 82 s, dossier
  jetable supprimé ; PowerShell 5.1 298 verts en 77 s (pwsh 7, installé en
  MSIX, ne voit pas le node de fnm) ; `--rapide` 289 tests, aucun
  `-navigateur` ; copie jetable : test cassé puis build cassé, code 1, ligne
  `ROUGE` juste, dossier supprimé ; hook `--fusion` 298 verts en 113 s.
  Coût relevé au harnais : 112.
- **Commit** : le hook bloquant appelle déjà `verifier` sur sa propre branche,
  298 verts, 86 s.
- **Revue, tour 1** (sous-agent neuf, brief `prompts/9-verifier-revue.md`) :
  **NE PASSE PAS**. Trois cassures invisibles aux tests : `verifier` qui
  sort toujours en 0, qui ne supprime plus son dossier, et `--rapide` ajouté
  à l'appel bloquant du hook. Et `--garder data` vide un dossier de données
  ignoré par git (essai en copie jetable). Mineurs : un refus (code 2) passe
  pour un rouge non bloquant en vitesse rapide ; le message du hook ne dit
  plus quoi ; un Ctrl-C laisse le dossier. Tient : `deploy.yml` publie le
  `.dist-ci` testé, un rouge arrête la publication ; les refus résistent aux
  chemins Windows (casse, `\`, `C:/`, jonction). Coût relevé au harnais : 95.
  Suite (tour 2, brief `prompts/9-verifier-tour2.md`) : `--garder` réservé
  aux noms `.dist-…` (Spec, point 3), test de bout en bout sur un dépôt
  factice, code 2 bloquant au hook.
- **Tour 2, tests** (même agent des tests) : `tests/verifier-bout-en-bout.test.mjs`
  (239 lignes) joue `verifier` sur un dépôt factice en `os.tmpdir()`, faux
  astro et faux tests : vert, test rouge, build rouge, `--rapide`, `--garder`,
  et tous les refus, jamais sur le vrai dépôt ; le test du hook range les
  appels par branche. 18 tests, 4 rouges (`data`, `dist`, `-x`,
  `sous/.dist-x` encore acceptés). Coût cumulé de l'agent : 105.
- **Tour 2, code** (même codeur) : motif `.dist-…` à la racine ; code 2 de
  `verifier` bloquant au hook dans les deux vitesses ; limite du Ctrl-C
  écrite. Rapport : 18/18, `npm run verifier` 307 verts en 76 s. Coût
  cumulé de l'agent : 131.
- **Incident au commit du tour 2 (2026-11-09, environ 18 h 25 à 18 h 27)** :
  le hook a refusé le commit, 14 rouges dans le test de bout en bout. Pendant
  un hook, git pose `GIT_DIR`, `GIT_INDEX_FILE`… vers le vrai dépôt ; le
  `git init` du dépôt factice en a hérité et a écrit **`core.bare=true` dans
  la config commune** : pendant deux minutes, toute commande git des
  worktrees et du checkout principal répondait « must be run in a work
  tree ». Rétabli à la main (`core.bare=false`) ; index, refs et hooks
  intacts. **Petite correction** (session principale, hors relais) : le test
  retire les `GIT_*` avant tout git et avant `verifier` ; `verifier` les
  retire pour son `git ls-files` ; deux tests de plus (`.dist-suivi` qui
  contient un fichier suivi, refusé ; le même avec des `GIT_*` vers un dépôt
  leurre, rouge avant la correction de `verifier`, vert après). 20 tests
  `verifier*`, 20 verts.
- **Revue, tour 2** (même relecteur) : **PASSE**. Les points du tour 1 sont
  tenus : chaque cassure (sortie toujours en 0, dossier jamais supprimé,
  `--rapide` sur l'appel bloquant, nom hors `.dist-…`, `GIT_*` non retirées,
  motif sans `^`) fait rougir un test. Tests `verifier*` et `plafond-lignes`
  joués avec des `GIT_*` posées comme dans un hook : 22 verts, `core.bare`
  resté à `false`. Reste mineur : le blocage du code 2 au hook n'était vu
  par aucun test. Coût cumulé du relecteur : 123. **Suite** (petite
  correction, session principale) : un test statique de plus ; les deux
  cassures relevées (`|| CODE=1`, bloc du code 2 neutralisé) le font rougir
  dans une copie jetable.
- **Intégration de `main`** (0112 et 0109 clos, 0120 ouvert) : sans
  conflit ; le hook de fusion, qui appelle `verifier`, 312 verts.
- **Vérification finale**, dans le worktree, après l'intégration :
  `npm run verifier` sous Windows PowerShell 5.1 → 312 verts, 66 s,
  `.dist-verifier` absent après ; `npm run verifier -- --rapide` sous Git
  Bash → 303 verts en 12 s (build 6 s, tests 6 s), aucun fichier
  `-navigateur` lancé. Par rapport à la référence (289), les 23 tests de plus
  sont les 20 de `verifier*` et 3 venus de `main` ; aucun rouge. PowerShell 7
  ne trouve pas `node` sur ce poste (installé en MSIX, son AppData est
  virtualisé et ne voit pas fnm) : un réglage du poste, pas de `verifier`.
- **Ce que la vitesse rapide ferait gagner aux sessions** : 12 s (`--rapide`)
  contre 66 à 76 s (complet) par point d'étape, plus le droit de committer
  un test rouge écrit d'abord.

## Clôture (2026-11-09)

- **Fait** : `npm run verifier` (`ops/verifier.mjs`, 158 lignes) construit
  dans un dossier jetable, lance tous les tests, supprime le dossier ;
  `--rapide`, `--garder .dist-…`. Le hook, `tests.yml` et le job `tester` de
  `deploy.yml` l'appellent ; `CLAUDE.md` le cite. Deux tests : 
  `tests/verifier.test.mjs` (statique, hook et workflows) et
  `tests/verifier-bout-en-bout.test.mjs` (dépôt factice, sans les `GIT_*`).
- **Fusion** : `501303a` dans `main`, hook de fusion vert (312 tests).
- **Publication réelle** `42667146717` (commit `501303a`) : verte, 313 s ;
  `tester` lance `npm run verifier -- --garder .dist-ci` (43 s, autant que
  l'ancien build et tests, 2 + 41 s) puis dépose `.dist-ci`. La durée totale
  vient de l'installation de Chromium (197 s contre 18 s à la publication
  précédente), hors de `verifier`.
- **Site en ligne inchangé** : aucune source du site touchée (`git diff
  7a820d2 501303a -- src public astro.config.mjs` vide) ; les 78 fichiers en
  ligne identiques octet pour octet à un build local du commit fusionné
  (`curl` puis `cmp`) ; `/`, `/en/`, `/projets/audit-contenu/`, `/a-propos/`,
  `sitemap-index.xml` en 200.
- **Revue** : deux tours, NE PASSE PAS puis PASSE. Aucune remontée.
- **Hors spec** (décidé par la session, à confirmer par Jean) : `--garder`
  n'accepte qu'un nom `.dist-…` à la racine ; un code 2 de `verifier` est
  bloquant au hook même en vitesse rapide ; `verifier` ignore les `GIT_*`.
- **Coût relevé au harnais** : 563 = 204 k de contexte de la session à la
  clôture (`get_usage`, dont environ 82 k de charge fixe) + 105 (tests, deux
  tours) + 131 (code, deux tours) + 123 (revue, deux tours). Ratio 11 pour
  50 estimés : la spec n'existait pas, deux tours de revue, l'incident
  `core.bare`, et chaque commit d'étape a joué le hook complet (65 à 170 s).
- **À trancher par Jean** : la vitesse rapide du hook (`chantier/*`)
  n'atteint aucune branche de session (`claude/chantier-…`) ; voir Déroulé.
- **Suites relevées, hors périmètre** :
  1. `docs/GUIDE_MISE_EN_LIGNE.md` (ligne 119) dit encore « `npm run build`
     puis `npm test` » : à reprendre avec 0120, qui met le guide à jour.
  2. `tests/outils.mjs` (ligne 48), quand le site manque, conseille encore
     `npx astro build` puis `DIST=X npm test` ; il pourrait citer
     `npm run verifier`.
  3. PowerShell 7 (MSIX) ne voit pas le `node` de fnm sur le poste de Jean.
