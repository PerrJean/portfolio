# Brief — factoriser les scripts d'images d'`ops/images/` (registre/0112)

Les 12 scripts d'`ops/images/` (3 362 lignes) dessinent les images du
portfolio en SVG, puis des planches PNG de travail avec sharp. L'audit
qualité du 2026-11-05 y a relevé le principal défaut de conception du
dépôt : les mêmes lignes recopiées d'un script à l'autre. Tu factorises ce
qui est commun, **sans changer un octet de ce que les scripts produisent**.

## Ce que tu lis

1. `registre/0112-factoriser-planches.md` : le périmètre et l'état de
   référence.
2. Les scripts eux-mêmes : `ops/images/apercu.mjs` et
   `ops/images/*/planche.mjs`, avec `ops/images/accueil/police.mjs`.

## Ce qui est commun (relevé des lignes répétées dans au moins trois scripts)

- l'en-tête : `ICI`, `RACINE`, les jetons de couleur `C`, la feuille
  `STYLE` des classes `.fe .se .fi .si .sa .so .fa .fd .fs`, `r2`,
  l'enveloppe `<svg>` d'une scène (repère `0 -140 L 160`) ;
- la lecture de la police WOFF (`tables`, `inflateSync`) : dans
  `accueil/police.mjs`, et recopiée dans `404/planche.mjs` et `apercu.mjs`
  (`woffEnTtf`) ;
- le personnage : `perso`, `tourne`, `trait`, `jambes`, `TORSE`, `TETE`,
  `LIGNE`, `EP_AR`, `EP_AV`, le remplacement de `{L}` par `LUNETTES` ;
- la planche PNG des scènes : `M`, `LARG`, `LEG`, `CASE`, `K`, `H_CASE`,
  `cadre`, `scene`, `legende`, `petit`, `decoupage`, les largeurs de carte
  `480, 384, 335`, la barre des temps (`TEMPS`, `total`, `ms`), l'écriture
  de `planche.png` (`png({ compressionLevel: 9 })`) ;
- les deux scripts de schémas (`fusion`, `atelier-pilotage`) : même style,
  mêmes dispositions « large » et « étroit », même texte en chemins.

Ce relevé est un point de départ : vérifie-le, complète-le, ne factorise
pas ce qui ne se répète qu'en apparence.

## Ce que tu fais

- Un dossier `ops/images/commun/` porte les modules partagés, découpés par
  sujet (par exemple : jetons et SVG, police, personnage, planche, schéma).
  `accueil/police.mjs` y déménage ; plus aucune copie du lecteur WOFF.
- Chaque script garde ce qui lui est propre : ses poses, ses objets, ses
  textes, sa composition, ses commentaires d'en-tête (mets à jour ceux qui
  citent un chemin déplacé).
- Un paramètre qui varie d'un script à l'autre (largeur `L`, taille des
  cases, couleurs utilisées) devient un argument, pas une copie.

## La preuve, après chaque script modifié

```sh
sh "<scratchpad>/comparer.sh" verif "<scratchpad>/base"
```

Elle relance les 12 scripts et compare chaque sortie (SVG et PNG) à l'octet
avec la base figée avant ta modification ; pour `fusion` et
`atelier-pilotage`, chaque SVG est aussi comparé à `public/illustrations/`.
**Attendu : « diff vide » sur les 11 lignes, et code de sortie 0.** Un écart
d'un octet est une régression, même invisible à l'œil.

Puis `git status --short` : seuls tes fichiers `.mjs` (et les déplacements)
changent. Si un SVG, un PNG ou un fichier de `public/` apparaît modifié,
c'est une régression. `apercu.mjs` réécrit des fichiers de `public/` : ils
doivent sortir identiques.

## Les limites

- Un module ne dépasse pas 500 lignes ; une fonction pas 80 lignes.
- Aucun paquet ajouté (sharp vient déjà avec Astro).
- Tu ne touches qu'à `ops/images/**/*.mjs`. Jamais `src/`, `public/`,
  `tests/`, `registre/`, `package*.json`, `.github/`, `.gitignore`.
- Ni `git stash`, ni `git checkout`, ni `git reset`, ni `git commit` : la
  session qui t'a lancé committe.

## Ce que tu rends

Le nombre de lignes avant (3 362) et après (`wc -l` sur tous les `.mjs`
d'`ops/images/`, modules communs compris), la liste des modules communs avec
ce que chacun porte, la sortie complète de la dernière preuve, et ce que tu
as choisi de ne pas factoriser, avec la raison.
