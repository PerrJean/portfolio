# Passation

Une section par session (skill globale `passation`). L'état de chaque point
fait foi dans `registre/` ; ici, seulement ce qu'une autre session doit
savoir pour reprendre.

## 2026-11-09 21:19 — File d'outillage v4 (discussion maître)

- **Fait** : huit points clos, chacun mené par une session dans son worktree,
  fusionné dans `main` et poussé : 0114 (`2614889`), 0119 (`3ab6b78`), 0108
  (`aa7ca7d`), 0112 et 0109 (`7a820d2`), 0107 (`280de19`), 0120 (`6d09db1`),
  0110 (`c0c2e44`), 0111 (`22a5d15`) (`git log --oneline origin/main`). En
  session maître : ouverture de 0119 et 0120, 0109 lié à 0112 (`6450366`,
  `87855a8`) ; vitesse rapide du hook élargie aux branches
  `claude/chantier-*` (`e4cf22f`, 0106). Publication en ligne verte après
  0107 et 0120 (fiches 0107 et 0120).
- **Reste, au registre** : 0004 `ouvert` ; 0005, 0006, 0007 `gelé` ; tous du
  temps 2, à ouvrir par questionnaire.
- **Reste, non inscrit** :
  1. Trois choix faits par la session 0107 hors spec, « à confirmer par
     Jean » (`registre/0107`, Clôture) : `--garder` n'accepte qu'un nom
     `.dist-…` à la racine ; un code 2 de `verifier` bloque le hook même en
     vitesse rapide ; `verifier` ignore les variables `GIT_*`.
  2. `tests/outils.mjs` (ligne 48), quand le site manque, conseille encore
     `npm run build` ou build puis `npm test` : il pourrait citer
     `npm run verifier` (suite de 0107).
  3. Le poste : PowerShell 7, installé en MSIX, ne voit pas le `node` de fnm
     (0107). Le `CLAUDE.md` global ne le dit pas : à y ajouter si Jean le
     confirme.
  4. 0082 a `etape` = `mise-en-ligne`, absent de la liste de `registre/0000`
     (relevé par 0110, non renormalisé).
  5. Une passation écrite par une session de chantier interrompue reste sur
     sa branche, pas sur `main` : la skill `chantier` pourrait la pousser
     aussi sur `main`. Non décidé.
- **Décisions de Jean (2026-11-09)** : « lance 0114 » (registre/0114,
  Tranché) ; 0109 et 0112 menés ensemble (registre/0109 et 0112, Tranché) ;
  0119 et 0120 inscrits sur sa demande ; « Oui, élargis » la vitesse rapide
  (registre/0106, Tranché) ; continuer, estimation par sous-agent, coût réel
  session + sous-agents, linter non rouvert (registre/0111, Tranché, et
  `registre/0000`) ; statuts des fiches ambiguës (registre/0110).
- **Prochaine commande** : `/chantier 0004` (l'acte III, par questionnaire),
  une fois tranchés les trois choix hors spec de 0107 ci-dessus.
- **Ne pas committer** : rien ne traîne dans l'arbre (`git status
  --porcelain` vide avant ce fichier).
