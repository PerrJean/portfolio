# 0110 — Brief : revue du statut ajouté aux fiches du registre

Worktree : `C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0110-registre-4f4bc8`.
Windows : Git Bash ou PowerShell 7, `node` dans le PATH.

Tu n'as vu ni le classement ni le script. Lis :

1. `registre/0000-convention.md` : les valeurs de `statut`, et la règle
   « les fiches antérieures gardent leur forme, leurs coûts et leur numéro ».
2. `tests/registre-statut.test.mjs` : le test ajouté.

Le diff à revoir : `git diff 0403839 HEAD -- registre/ CLAUDE.md tests/`
(base `0403839` ; ignore `registre/0120-*`, venu de `main`).

## À faire

1. **Rien d'autre que le statut** : vérifie par une commande, pas à l'œil,
   que chaque fiche modifiée (hors 0110 et 0120) n'a changé que ses trois
   lignes d'en-tête, et qu'en retirant la colonne `statut` on retrouve
   l'en-tête d'origine à l'octet près (coûts, modèle, accents graves).
2. **Couverture** : toute fiche `registre/NNNN-*.md` sauf 0000 a un statut
   permis. Relève les statuts qui ne sont pas `clos …` et dis s'ils
   concordent avec la section « Ce qui reste ouvert » de `CLAUDE.md`, et si
   la commande `grep` qu'elle donne rend bien cette liste.
3. **Vraisemblance** : tire au hasard dix fiches closes ; pour chacune, la
   date de clôture contredit-elle le texte (une décision datée après la
   clôture et qui la précède dans le récit) ? Les dates du texte priment sur
   celles des commits (tri de Jean, 2026-11-09).
4. **Le test** : casse-le de trois façons au moins, **dans une copie
   jetable** sous `$TEMP` (`git clone` du worktree), jamais dans le
   worktree : colonne statut retirée d'une fiche ; valeur hors liste
   (`fermé`, `clos` sans date, `clos 2026-1-5`) ; `remplacé par 9999` ;
   fiche sans tableau. Note pour chaque cassure si le test rougit et ce que
   dit le message. Une cassure qui ne rougit pas est un problème. Supprime
   la copie ensuite.

Rends **PASSE** ou **NE PASSE PAS**, puis la liste des problèmes, chacun avec
le fichier et la ligne en cause.

## Interdits

Lecture seule dans le worktree : aucun fichier modifié, ni `git commit`,
`stash`, `checkout`, `reset`. Ne touche ni `registre/0120-*`, ni
`.github/workflows/`, ni `docs/GUIDE_MISE_EN_LIGNE.md`.
