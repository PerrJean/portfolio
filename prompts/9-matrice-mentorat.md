# Brief — la page 06 racontée comme un accompagnement (registre/0116)

Le portfolio de Jean s'adresse à des recruteurs (PM, Head of Product, CPO)
qui lisent vite. Une relectrice extérieure conseille d'aborder la page 06,
la matrice de compétences, « plutôt comme du mentorat, de l'accompagnement
d'un membre d'équipe dans son évolution pro, que la relecture pure d'un
document ». Tu réécris la page dans ce sens, **FR puis EN**.

Charge d'abord les skills `ligne-editoriale` et `relecture-non-initie` (outil
Skill) : le lecteur n'y connaît rien, les phrases restent courtes (30 mots
déclenchent une alerte), un fait par phrase, pas de jargon non expliqué.

## Ce que tu lis

1. `src/contenu/projets/fr/matrice-competences.md` (la page actuelle).
2. `src/contenu/projets/en/skills-matrix.md` (sa jumelle).

## Les faits, validés par Jean (2026-11-09)

- Décembre 2025 : Jean, manager, construit une matrice de compétences
  (comportements observables, trois niveaux), la relit avec le Product
  Manager de son équipe avant de s'en servir.
- Janvier 2026 : entretien, compétence par compétence. **Le Product Manager
  se voyait plus avancé que ce que la grille a montré.** C'est la seule forme
  publiable de l'écart : jamais un niveau (junior, intermédiaire, senior)
  attribué à la personne, jamais les compétences en cause.
- Ils s'accordent sur deux axes de plan de progression, seuls points publiés
  de l'échange : renforcer la maîtrise du métier (la légitimité d'un PM tient
  à sa compréhension des usages et des utilisateurs, et à sa maîtrise du
  métier), aller plus loin dans l'IA appliquée au product management.
- Depuis : **un point mensuel de suivi des OKR, dont un OKR de développement
  personnel.**
- Ce qui a bougé : il va davantage au contact du métier, et **il porte
  aujourd'hui les mises en situation orales par IA**, le projet 01 du
  portfolio. Lien Markdown vers `/projets/mises-en-situation/` (EN :
  `/en/projects/speaking-practice/`). Ne date pas le début de ce rôle : le
  projet 01 a commencé en mai 2025, avant l'entretien. Écris « aujourd'hui,
  il porte… », pas « depuis janvier ».
- Une seule personne accompagnée ainsi : toute réutilisation de la grille
  reste au conditionnel.

## Ce que tu changes

Dans les deux pages :

1. **`fait`** : il raconte l'accompagnement, plus la relecture d'un
   document. Il dit l'écart (il se voyait plus avancé) et ce que Jean a
   fait. Deux phrases au plus.
2. **`synthese`** : `probleme` (le point de départ : l'écart, et « devenir
   senior » sans critères communs), `action` (la grille comme outil commun,
   relue avec lui, l'entretien, puis les deux axes devenus des OKR suivis
   chaque mois), `resultat` (le contact du métier, les mises en situation
   orales). Garde ces trois clés.
3. **`cadre.duree`** : « Depuis décembre 2025 » / « Since December 2025 ».
   Le reste du cadre ne change pas.
4. **Le corps**, six H2 dans l'ordre du récit : un écart à nommer ; un cadre
   pour en parler (la `<figure>` de l'extrait y reste, telle quelle) ;
   l'entretien pour se situer ensemble ; un suivi chaque mois ; ce qui a
   bougé ; ce que j'en retiens (trois enseignements de manager, en gras
   d'ouverture comme aujourd'hui). Les intitulés exacts sont à toi. La
   matrice devient l'outil de l'accompagnement : sa description tient en un
   court paragraphe, le détail reste dans `plusLoin`.
5. Puis, dans `src/contenu/projets.ts`, carte `numero: '06'` seulement :
   `fait` FR et EN identiques aux `fait` des pages ; `tags` FR
   `['Management d’équipe', 'Mentorat']`, EN `['Team management', 'Mentoring']`.

L'anglais suit le français, même structure, mêmes faits.

## Ce que tu ne touches pas

`titre`, `date`, `plusLoin`, `langue`, `cle`, les images, le PDF ; le `nom`,
la `scene` et le reste de la carte 06 ; les autres cartes ;
`src/layouts/Projet.astro` (un autre chantier y travaille) ; tout autre
fichier. Pas de `git stash`, `checkout`, `reset`, ni commit : la session qui
t'a lancé commite.

## Les règles du projet

Employeur jamais nommé : « une plateforme EdTech ». Aucun prénom, aucune
donnée de personne, aucun nom interne. Le constat se formule en levier. Le
sigle se dit « Product Manager » en toutes lettres à la première occurrence
de chaque section, comme aujourd'hui. Typographie de la page actuelle :
apostrophe ’, guillemets « » en FR, “ ” en EN.

## Ce que tu rends

Les trois fichiers modifiés, puis le build pour vérifier que la page
s'affiche : `npx astro build --outDir .dist-redaction`, puis supprime
`.dist-redaction`. Dans ton message final : le `fait`, la `synthese` et les
six H2 en FR, et toute phrase où tu as hésité sur la règle de l'écart.

Environnement : Windows, Git Bash, worktree
`C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0116-matrice-654181`
(travaille là, nulle part ailleurs). Node, s'il manque :
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
