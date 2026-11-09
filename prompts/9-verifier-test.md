# Brief — le test de la commande `verifier` (registre/0107)

Lis `registre/0107-commande-verifier.md`, section **Spec** et ses critères
d'acceptation, puis `tests/plafond-lignes.test.mjs` (la forme d'un test sans
site construit).

Tu travailles dans le worktree que te donne la session, sur sa branche. La
commande `verifier` n'existe pas encore : un autre agent l'écrira après toi.

## Ce que tu fais

Un seul fichier : `tests/verifier.test.mjs`, `node:test`, sans dépendance, sans
site construit, quelques secondes au plus. Il vérifie :

1. `package.json` déclare le script `verifier` : `node ops/verifier.mjs`.
2. `ops/hooks/pre-commit` appelle `npm run verifier` avec `--garder .dist-hook`
   (et `--rapide` dans la branche de la vitesse rapide), et ne contient plus
   ni `astro build`, ni `node --test`, ni `npm test`.
3. `.github/workflows/tests.yml` contient une étape `run: npm run verifier`,
   ni `astro build` ni `npm test`.
4. `.github/workflows/deploy.yml` contient `npm run verifier -- --garder .dist-ci`,
   ni `astro build` ni `npm test` ; l'étape `actions/upload-pages-artifact`
   vient **après** elle et dépose `path: .dist-ci/`.
5. Les refus de l'option `--garder` : `node ops/verifier.mjs` lancé avec
   `--garder .`, `--garder ..`, `--garder tests`, `--garder` sans argument,
   et `--inconnue` sort en **code 2**, sans rien construire (vérifie qu'aucun
   dossier n'a été créé ou vidé : `tests/` garde ses fichiers), en moins de
   quelques secondes chacun.

Lis les fichiers en texte, sans parseur YAML. Messages d'échec en français,
qui disent quoi corriger.

## La preuve

`node --test tests/verifier.test.mjs` : chaque test **échoue**, et chaque échec
vient du comportement absent (« le hook construit encore lui-même », « le
script verifier n'existe pas : code 1 au lieu de 2 »), jamais d'une erreur de
syntaxe ou d'import du test. Donne la sortie résumée.

## Interdits

Ne touche qu'à `tests/verifier.test.mjs`. Pas à `ops/`, `.github/`,
`package.json`, ni aux autres tests ; rien dans `ops/images/` ni
`.gitignore` (un autre chantier y travaille). Pas de `git stash`,
`checkout`, `reset` ; ne committe pas, ne pousse pas. Rapport de 100 mots au
plus. Environnement : Windows, Git Bash, chemins entre guillemets (le profil
contient une espace).
