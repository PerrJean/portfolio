# Brief — une seule commande de vérification : `verifier` (registre/0107)

Lis d'abord `registre/0107-commande-verifier.md` (constat, tranché, **Spec**
et critères d'acceptation : c'est ton plan, en entier), puis
`ops/hooks/pre-commit` (la partie « build et tests » et ses deux vitesses,
registre/0106).

Tu travailles dans le worktree que te donne la session, sur sa branche,
jamais dans `C:\Users\Jean PERRIER\Portfolio` lui-même : d'autres sessions y
travaillent. Cette branche ne s'appelle pas `chantier/*` : chaque commit y
joue le hook complet, bloquant ; c'est connu (voir la fiche). Ne committe pas,
la session le fera.

## Ce que tu fais

- **`ops/verifier.mjs`**, selon la Spec, points 1 à 3. Court (une centaine de
  lignes ; tout fichier suivi de plus de 800 lignes est refusé par
  `tests/plafond-lignes.test.mjs`). Tourne tel quel sous Windows (Git Bash,
  PowerShell) et sous Ubuntu : `process.execPath` pour lancer node, le
  binaire d'astro pris dans `node_modules/astro` (son `package.json`, champ
  `bin`), `spawnSync` sans shell. La liste des tests se calcule (glob de
  `node:fs` ou parcours de `tests/`), triée.
- **`package.json`** : le script `verifier`.
- **Le hook**, point 4 : la décision de vitesse, la ligne du PATH de fnm, le
  « NON bloquant » et le « REFUS » restent ; l'appel devient
  `npm run verifier -- [--rapide] --garder .dist-hook`. Les alertes de
  rédaction relisent toujours `.dist-hook`, puis le hook le supprime.
- **La CI**, point 5. Dans `deploy.yml`, **le dépôt du site publie
  `.dist-ci`** : si `verifier` le supprimait, il n'y aurait plus rien à
  publier. D'où `--garder .dist-ci`, et l'étape `upload-pages-artifact`
  reste derrière, inchangée. `tests.yml` ne se lance que sur les pull
  requests ; il appelle `npm run verifier` tout court. Mets à jour les
  commentaires des deux fichiers qui décrivent le build puis les tests.
- **`CLAUDE.md`**, point 6, une ligne dans « Comment on lance ».

Le test `tests/verifier.test.mjs` existe déjà et échoue : il est ton critère
d'arrivée. **N'y touche pas.** S'il te semble faux, arrête-toi et dis lequel
et pourquoi.

## La preuve

- `node --test tests/verifier.test.mjs` vert.
- `npm run verifier` vert sous Git Bash et sous PowerShell ; donne la durée
  et le nombre de tests. `.dist-verifier` n'existe plus après.
- `npm run verifier -- --rapide` : aucun test `-navigateur` dans la sortie.
- `npm run verifier -- --garder .dist-essai` : le dossier reste ; supprime-le.
- Un échec voulu, dans une copie jetable du dépôt (hors du worktree, dans
  `$TEMP`) : un test cassé, puis un build cassé (une page `.astro` invalide) :
  code de sortie non nul, ligne `ROUGE` qui dit lequel, dossier jetable
  supprimé quand même.
- Le hook en mode fusion : `sh ops/hooks/pre-commit --fusion` joue tout,
  vert, et laisse le dépôt sans `.dist-hook`.
- Les YAML se relisent ligne à ligne ; on ne pousse rien.

## Interdits

Ne touche qu'à `ops/verifier.mjs`, `package.json`, `ops/hooks/pre-commit`,
`.github/workflows/tests.yml`, `.github/workflows/deploy.yml`, `CLAUDE.md`.
Ni aux tests, ni à `ops/images/`, ni à `.gitignore` (un autre chantier y
travaille), ni au registre. Pas de `git stash`, `checkout`, `reset` ; ne
committe pas, ne fusionne pas, ne pousse pas. Rapport de 150 mots au plus :
ce que fait la commande, ce que le hook et la CI appellent, le résultat de
chaque contrôle avec ses chiffres. Environnement : Windows, Git Bash, chemins
entre guillemets (le profil contient une espace).
