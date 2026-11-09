# 0110 — Brief : proposer un statut pour les fiches anciennes du registre

Worktree : `C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0110-registre-4f4bc8`.
Windows : Git Bash ou PowerShell 7 ; chemins du profil entre guillemets.

Les fiches du registre antérieures au 2026-11-05 n'ont pas de colonne
`statut`. Leur état ne se lit qu'au coût réel (« — » ou vide) ou dans le
texte, souvent trompeur : une fiche dit « en attente du go » alors que sa
suite est close. Lis :

1. `registre/0000-convention.md` : les six valeurs de `statut`.
2. Le dossier de fiches, chemin donné dans ton prompt de lancement : 49
   fiches à la suite, chacune précédée de la date de son dernier commit, et
   en tête la liste des fiches déjà closes.

Tu peux vérifier un fait dans le dépôt (`git log`, `grep` dans `src/`,
`registre/`, `CLAUDE.md`), sans lire d'autre fiche en entier.

## À faire

Pour chaque fiche du dossier, propose un statut parmi `ouvert`, `en cours`,
`gelé`, `clos AAAA-MM-JJ`, `écarté AAAA-MM-JJ`, `remplacé par NNNN`.

- **Date** : celle que le texte donne (« Clos le », « Fait le », décision de
  Jean datée) ; à défaut, la date où la suite qui la clôt a été close ; à
  défaut, la date du dernier commit de la fiche, et dis-le.
- **Arbitrage** tranché et toujours en vigueur : `clos` à la date de la
  décision. Contredit ou dépassé par un point plus récent : `remplacé par
  NNNN`.
- **Sûreté** : `sûr` si le texte ou une suite close nommée le prouve sans
  interprétation ; `ambigu` sinon (reporté, en attente, suite incertaine,
  date incertaine).

Rends un tableau Markdown, une ligne par fiche, dans l'ordre :

| fiche | statut proposé | sûreté | raison (une ligne, avec la preuve : numéro de la suite, phrase citée, commit) |

Puis, en dessous, les seules fiches `ambigu`, avec pour chacune une
alternative plausible au statut proposé.

## Interdits

Lecture seule : aucun fichier modifié dans le worktree, ni `git commit`,
`stash`, `checkout`, `reset`.
