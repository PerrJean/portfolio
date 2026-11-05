# Brief — une seule commande de vérification : `verifier` (registre/0107)

Lis d'abord `registre/0107-commande-verifier.md` (le constat et le périmètre),
puis `ops/hooks/pre-commit` (la partie « build et tests » et ses deux
vitesses, registre/0106).

Tu travailles sur la branche `chantier/verifier`, dans ton propre worktree,
jamais dans `C:\Users\Jean PERRIER\Portfolio` lui-même : d'autres sessions y
travaillent. Un commit d'étape rouge y passe (vitesse rapide du hook) ; c'est
voulu.

## Ce que tu fais

- **Une commande** : `npm run verifier`. Un script Node (`ops/verifier.mjs`),
  qui tourne tel quel sous Windows (Git Bash, PowerShell) et sous Ubuntu.
  Il construit le site dans un dossier jetable, lance **tous** les tests
  dessus avec `DIST`, supprime le dossier, et rend un code de sortie non nul
  au moindre échec du build ou d'un test. Une ligne de bilan à la fin.
- **Deux options, pas plus** : `--rapide` (sans `tests/*-navigateur.test.mjs`,
  pour la vitesse rapide du hook) et `--garder <dossier>` (le site construit
  reste là, pour les alertes de rédaction du hook qui le relisent).
- **Le hook l'appelle** à la place de son build et de ses tests : la décision
  de vitesse (branche `chantier/*`, `--fusion`, `MERGE_HEAD`) et le « rouge
  non bloquant » restent dans le hook ; seule l'exécution passe à
  `verifier`. Tout le reste du hook est inchangé.
- **La CI l'appelle** : dans `.github/workflows/tests.yml` et dans le job
  `tester` de `deploy.yml`, les deux lignes build puis `npm test` deviennent
  `npm run verifier`. Les étapes avant (secrets, `npm ci`, Chromium) ne
  bougent pas.
- **Ce qui se lit** : `CLAUDE.md`, section « Comment on lance », gagne
  `npm run verifier` ; `npm test` reste, pour qui a déjà un site construit.

## La preuve

- `npm run verifier` vert sous Git Bash et sous PowerShell ; donne la durée.
- `npm run verifier -- --rapide` : ne lance aucun test `-navigateur` (le
  montrer par la sortie).
- Un échec voulu (un test cassé exprès sur une copie jetable, puis un build
  cassé) : code de sortie non nul, dossier jetable supprimé quand même.
- Le hook : un commit sur `chantier/verifier` passe en vitesse rapide ; le
  rejouer en mode fusion (`sh ops/hooks/pre-commit --fusion`) joue tout.
- La CI : le YAML se lit (`node -e` avec un parseur, ou relecture ligne à
  ligne) ; on ne pousse pas la branche.

Ne touche à rien d'autre. Pas de `git stash`, pas de `git reset` ; ne fusionne
pas dans `main`, ne pousse pas. Rapport de 150 mots au plus : ce que fait la
commande, ce que le hook et la CI appellent, le résultat de chaque contrôle,
le dernier commit de la branche. Environnement : Windows, Git Bash.
