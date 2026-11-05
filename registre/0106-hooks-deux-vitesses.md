# 0106 — Hooks à deux vitesses et `pre-merge-commit`

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `outil` | 200 | non mesurable (mené dans une autre session, hors sous-agent) | `claude-opus-5-5` |

**Demande de Jean (2026-11-05)**, sur le modèle d'UserVoice (son
registre/0080) : c'est la condition pour mener les chantiers sur des branches
`chantier/*`, chacune dans son worktree.

**Fait le 2026-11-05** (`52fcedf`, fusion `81323de`) : sur une branche
`chantier/*`, le hook joue le build et les tests sans les passes en
navigateur, et un point d'étape rouge passe. Ailleurs, et pour toute fusion
(`MERGE_HEAD`), il joue le build et tous les tests, et refuse le commit au
moindre échec. `ops/hooks/pre-merge-commit` rappelle le pre-commit ;
`install.sh` pose les deux crochets. Les contrôles de secrets, de données et
de confidentialité restent bloquants partout.

**Preuve (2026-11-05, rejouée par une autre session que l'auteur)**, dans un
worktree jetable, avec un test rouge volontaire :
- témoin : build seul, vert ;
- point d'étape sur `chantier/essai-m-rouge` : 238 tests sans navigateur,
  1 échec (le volontaire), « NON bloquant », commit accepté ;
- `git merge --no-ff` vers une branche hors `chantier/*` : 247 tests, 1 échec
  (le volontaire), « REFUS : des tests echouent. », fusion non commitée.

Worktree et branches d'essai supprimés ensuite.
