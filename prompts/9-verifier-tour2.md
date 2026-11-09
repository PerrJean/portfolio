# Brief — `verifier`, second tour après revue (registre/0107)

Lis `registre/0107-commande-verifier.md` (Spec, point 3 complété ; Déroulé,
« Revue, tour 1 »), puis `ops/verifier.mjs`. Worktree et branche : ceux que
te donne la session. Ne committe pas.

La revue a montré que `tests/verifier.test.mjs` reste vert si verifier sort
toujours en 0, s'il ne supprime plus son dossier, ou si le hook ajoute
`--rapide` à l'appel bloquant ; et que `--garder data` vidait un dossier de
données ignoré.

## Partie A — les tests (agent des tests)

Ne touche qu'à `tests/`, ni au code ni au hook.

1. **Hook** : l'appel de la vitesse rapide porte `--rapide` ; l'appel
   bloquant ne le porte **pas** ; les deux portent `--garder .dist-hook`.
2. **Un dépôt factice**, créé par le test dans un dossier temporaire
   (`mkdtempSync` sous `os.tmpdir()`, supprimé à la fin) : `git init`,
   `.gitignore` (`.dist-*/`, `data/`), `ops/verifier.mjs` **copié** du dépôt,
   un faux `node_modules/astro` (`package.json` avec `bin`, un script node
   qui écrit `<outDir>/index.html`, ou sort en 1 si une variable
   d'environnement le demande), un `tests/` factice à deux fichiers
   (`a.test.mjs` qui vérifie `DIST/index.html` et échoue sur demande,
   `b-navigateur.test.mjs` qui laisse une trace), `git add` de tout sauf
   `data/` et `node_modules/`, un `data/reel.txt` ignoré. Tout tourne
   là-dedans, en quelques secondes, jamais sur le vrai dépôt :
   - vert : code 0, dernière ligne `VERT`, `.dist-verifier` absent après ;
   - un test rouge : code 1, `ROUGE (des tests echouent)`, dossier absent ;
   - un build rouge : code 1, `ROUGE (le build echoue)`, dossier absent ;
   - `--rapide` : la trace de `b-navigateur` n'existe pas ; sans, elle existe ;
   - `--garder .dist-x` : code 0, `.dist-x/index.html` reste ;
   - refus en code 2, rien de touché (`data/reel.txt` et `tests/` intacts) :
     `--garder .`, `..`, `tests`, `data`, `dist`, `-x`, `sous/.dist-x`,
     `--garder` sans argument, `--inconnue`.
   Les cinq refus qui tournent aujourd'hui sur le vrai worktree passent dans
   le dépôt factice : une version cassée du contrôle ne doit jamais pouvoir
   vider le vrai dépôt.
3. Lance les tests : ceux du nouveau comportement (`data`, `dist`, `-x`,
   `sous/.dist-x`) **échouent** pour la bonne raison ; les autres passent.
   Rapport de 100 mots au plus.

## Partie B — le code (agent du code)

Ne touche ni aux tests ni au registre. Critère d'arrivée : `node --test
tests/verifier.test.mjs` vert (et tout autre test de `tests/verifier*`).

1. `--garder` n'accepte qu'un nom `.dist-…` à la racine (`/^\.dist-[\w.-]+$/`
   après résolution, un seul segment) ; garde les contrôles existants en
   seconde ligne.
2. Le hook : un code 2 de verifier (refus d'usage, donc un hook faux) est
   **bloquant** dans les deux vitesses ; le message rouge dit de lire la
   dernière ligne de verifier, qui nomme ce qui est rouge.
3. L'en-tête de `ops/verifier.mjs` écrit la limite connue : un Ctrl-C pendant
   le build ou les tests laisse le dossier jetable (le prochain lancement le
   vide).
4. Preuve : `node --test tests/verifier.test.mjs` vert ; `npm run verifier`
   vert, nombre de tests et durée. Rapport de 120 mots au plus.

Pas de `git stash`, `checkout`, `reset`, `commit`, `push`. Environnement :
Windows, Git Bash, chemins entre guillemets (le profil contient une espace).
