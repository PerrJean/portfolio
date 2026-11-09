# Passation

Une section par session (skill globale `passation`). L'état de chaque point
fait foi dans `registre/` ; ici, seulement ce qu'une autre session doit
savoir pour reprendre.

## 2026-11-09 22:10 — File d'outillage v4 (discussion maître)

- **Fait** : huit points clos, chacun mené par une session dans son worktree,
  fusionné dans `main` et poussé : 0114 (`2614889`), 0119 (`3ab6b78`), 0108
  (`aa7ca7d`), 0112 et 0109 (`7a820d2`), 0107 (`280de19`), 0120 (`6d09db1`),
  0110 (`c0c2e44`), 0111 (`22a5d15`) (`git log --oneline origin/main`). En
  session maître : ouverture de 0119 et 0120, 0109 lié à 0112 (`6450366`,
  `87855a8`) ; vitesse rapide du hook élargie aux branches
  `claude/chantier-*` (`e4cf22f`, 0106). Après la passation : les trois
  choix hors spec de 0107 tranchés, avec l'essai de `GIT_INDEX_FILE`
  (registre/0107, Tranché) ; `tests/outils.mjs` conseille `npm run verifier`
  (`git log -1 -- tests/outils.mjs`) ; 0082 rattaché à l'étape
  `publication` ; `node` visible de tout terminal, fnm sorti d'AppData
  (registre/0121 : `FNM_DIR`, PATH utilisateur, `dev.cmd`, secours du hook).
- **Reste, au registre** : 0004 `ouvert` ; 0005, 0006, 0007 `gelé` ; tous du
  temps 2, à ouvrir par questionnaire.
- **Reste, non inscrit** :
  1. **`claude-config`** : `sauvegarder.ps1` a recopié le `CLAUDE.md` global
     (ligne « Installés » : node par fnm hors d'AppData, registre/0121) ;
     le script ne committe rien, l'écart attend Jean (`git -C
     "C:\Users\Jean PERRIER\claude-config" status --short`).
  2. **Proposition pour la skill `passation` du dépôt vibe-coding** (Jean la
     traitera là-bas) : la passation d'un chantier interrompu reste sur sa
     branche, avec le code qu'elle décrit ; la fiche du registre sur `main`
     passe au statut « interrompu » et indique la branche et le chemin de la
     passation, par un commit de documentation seul, autorisé sur `main`.
- **Décisions de Jean (2026-11-09)** : « lance 0114 » (registre/0114,
  Tranché) ; 0109 et 0112 menés ensemble (registre/0109 et 0112, Tranché) ;
  0119 et 0120 inscrits sur sa demande ; « Oui, élargis » la vitesse rapide
  (registre/0106, Tranché) ; continuer, estimation par sous-agent, coût réel
  session + sous-agents, linter non rouvert (registre/0111, Tranché, et
  `registre/0000`) ; statuts des fiches ambiguës (registre/0110) ; les trois
  choix de 0107 (registre/0107, Tranché) ; on n'étend pas la liste des
  étapes de `registre/0000` pour un seul projet (registre/0082).
- **Prochaine commande** : `/chantier 0004` (l'acte III, par questionnaire).
- **Ne pas committer** : rien ne traîne dans l'arbre (`git status
  --porcelain`).
