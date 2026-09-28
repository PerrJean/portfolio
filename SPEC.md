# Portfolio — spécification

Validée par Jean le 2026-09-28, par questionnaire (`registre/0001`). Ce
fichier porte le pourquoi. Ce qui entre et ce qui sort est dans `CONTRAT.md`.

## Pour qui

- **Lecteur principal : un recruteur** pour des postes Product Manager,
  Head of Product, CPO, AI / Data PM. Il n'a pas le temps de tout lire : le
  site est **très hiérarchisé, visuel et synthétique**. On part de son besoin,
  pas de ce qu'on a envie de montrer.
- **Freelance plus tard**, sans refaire : le bloc « Ce que j'apporte » sert
  les deux publics (compétences pour l'un, offre pour l'autre).
- **Ce que le site doit faire voir** : l'approche user-first et
  solution-driven, l'IA appliquée, les compétences data. Pour le niveau CPO,
  une dimension leadership est à ajouter (`registre/0004`).

## Le récit

- **Une seule histoire en deux actes.** Acte I, UserVoice : écouter, mesurer,
  et découvrir que la qualité du contenu et des explications est le premier
  levier de satisfaction. Acte II, Audit contenu : agir dessus.
- **Le constat se formule en levier**, jamais en défaut : on ne dénigre pas
  l'employeur.
- **Accueil, dans l'ordre** : accroche, les deux actes, « Ce que j'apporte »
  (3 cartes), puis des portes discrètes : Méthode IA, Erreurs payées, À
  propos. Les éléments secondaires sont là pour montrer qu'ils existent.
- **Pages projet en deux niveaux** : une synthèse recruteur (problème, ce que
  j'ai fait, résultat, ce que ça dit de moi, 3 chiffres), puis un « pour
  aller plus loin » replié. **Pas long et technique.**
- **Ton** : je, sobre, vouvoiement implicite, pas de jargon.

## Confidentialité

- **L'employeur n'est nommé que dans « À propos ».** Les projets parlent
  d'« une plateforme EdTech ». Le RGPD porte sur les personnes ; le nom de
  l'employeur relève du contrat de travail et de la loyauté.
- **Chiffres relatifs et ordres de grandeur.** Aucun volume, NPS ni taux
  interne en absolu. Les chiffres sur mon propre travail sont libres.
- **Aucun verbatim, aucune donnée personnelle**, aucun nom de table, d'URL
  interne ou de schéma.
- **Visuels** : schémas SVG et captures sur données synthétiques.

## La forme

- **Bascule FR | EN** en haut à droite, FR par défaut.
- **Direction visuelle à trancher sur trois maquettes** (`registre/0003`),
  chacune avec son intention. Le cap : trancher avec le côté méthodique des
  projets pour montrer le goût design, sans desservir le propos.
- **Animation sobre d'abord** (CSS, Motion), respectant
  `prefers-reduced-motion`. Scrollytelling (GSAP ScrollTrigger) éventuel en
  phase 2, sur l'accueil seulement.

## Technique, seulement après validation de la ligne

- Astro (i18n native `/fr/`, `/en/`, contenus Markdown à schéma), déjà en
  place depuis le 2026-09-07.
- GitHub Pages ou Netlify, domaine perso, dépôt sur le compte GitHub
  personnel de Jean.
- Polices hébergées sur le site, jamais chargées chez un tiers.

## On avance par étapes

1. **Ligne** : design, esthétique, éditorial, structure, vision. Rien ne se
   développe avant le go de Jean.
2. **Structure Astro** dans la direction retenue, avec ses tests.
3. **Contenu** des deux actes, FR puis EN.
4. **Mise en ligne.**
5. **Temps 2** : acte III, OST, mesure d'audience, scrollytelling.

## Ce qu'on a écarté, et pourquoi

- **Anonymat total** : l'employeur se devine sur le CV, l'anonymat ne
  protège rien. Ce qui protège, c'est le cadrage.
- **Pages longues et techniques** : le recruteur n'a pas le temps. Le détail
  existe, replié, pour l'entretien.
- **Tech sombre** : aucun contraste avec les projets, et le style de
  portfolio le plus répandu.
- **Google Analytics** : bandeau de consentement obligatoire, risque RGPD.
- **Développer les maquettes dans Astro** : ce serait développer avant
  validation.
