# Brief — les images clés des scènes de l'accueil (registre/0057, étape 2)

Sur l'accueil du portfolio, les deux cartes de projet (01 UserVoice,
02 Audit contenu, reliées par la flèche « Alors j'ai agi dessus. ») portent
aujourd'hui **la même scène** : deux ouvriers impatients au chargement, puis
« on regarde le plan » au survol. Jean veut une scène par projet. Tu dessines
les **images clés fixes** ; aucune animation à ce stade. Deux fichiers à lire
d'abord : `src/components/scene/Scene.astro` et
`src/components/scene/poses.ts`.

## Ce que Jean a choisi

1. **En-tête (grand écran seulement, 960 px et plus)** : la scène
   d'impatience actuelle (les deux ouvriers, saut, marteau, poutre) passe
   **sous le soleil** (quart de disque en haut à droite,
   `src/components/Soleil.astro`), à droite de la phrase signature. Dessine
   la position de repos (fin de l'impatience) dans une maquette de l'en-tête
   à 1280 px, pour juger de la place : elle ne doit ni toucher la phrase, ni
   passer sur le soleil, ni allonger l'en-tête.
2. **Carte 01 UserVoice** : Jean, **seul**, ouvre le plan.
   - Repos : Jean seul, le plan **replié** en main (ou sous le bras).
   - Fin : Jean a **déplié** le plan et le regarde ; point ambre sur le plan.
3. **Carte 02 Audit contenu** : **les ouvriers rejoignent Jean**, qui a le
   plan ouvert.
   - Repos : Jean, plan ouvert, seul au centre ; l'autre ouvrier à distance
     (ou au bord).
   - Fin : l'autre ouvrier l'a rejoint, ils regardent le plan ensemble ;
     point ambre sur le plan.
   Les deux cartes se lisent à la suite (01 puis 02) : la fin de 01 ressemble
   au repos de 02.

## Les règles du dessin

Celles du site : au trait, fond ivoire, trait encre ; orange réservé aux
lunettes de Jean ; ambre seulement comme lumière (un point) ; ardoise pour
l'information secondaire ; bonhommes unisexes, tête disque, corps gélule.
**Réutilise les poses existantes** (dont celles de « on regarde le plan ») ;
si le plan replié n'existe pas, ajoute-le comme **objet** dans ta planche,
pas dans `poses.ts`, et dis-le. Aucune nouvelle articulation.

## Ce que tu rends

- `ops/images/accueil/planche.png` : cinq images, dans l'ordre (1) en-tête à
  1280 px avec les ouvriers sous le soleil, (2) 01 repos, (3) 01 fin,
  (4) 02 repos, (5) 02 fin ; numérotées et légendées en petit ; produite par
  `ops/images/accueil/planche.mjs` (SVG composé puis `sharp`, déjà
  installé, aucun paquet). Chaque scène seule en SVG dans
  `ops/images/accueil/`, dans le repère de `Scene.astro`.
- Regarde la planche (outil Read) : lunettes visibles, plan lisible replié et
  déplié, les deux cartes clairement différentes au repos.
- Dis quelles poses tu as reprises, ce que tu as ajouté, et la place que
  prennent les ouvriers dans l'en-tête (en px, à 1280 et 960).

Tu ne touches pas à `src/` ni aux tests. Ne commite rien, n'ouvre aucun
navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
