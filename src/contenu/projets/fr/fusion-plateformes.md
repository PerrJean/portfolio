---
titre: "Fusion des plateformes : de trois à deux, en visant une seule"
date: "2024-08"
fait: "En 2024, j’ai piloté la fusion de deux de nos trois plateformes : chaque évolution se développe désormais deux fois, et non plus trois."
synthese:
  probleme: "Une entreprise EdTech proposait trois plateformes d’apprentissage des langues, nées l’une après l’autre. Chacune avait son interface, ses gabarits d’activité et son modèle de données, tous développés et maintenus à part."
  action: "Product Manager, puis chef de projet, j’ai cadré une cible, une seule plateforme, et je l’ai présentée au comité de direction. Avec une équipe d’une dizaine de personnes, nous avons d’abord posé un design system commun, puis fondu la plateforme dédiée aux entreprises dans la plateforme généraliste, en sept lots."
  resultat: "La fusion est en production depuis août 2024. Les activités tiennent sur quatre gabarits au lieu d’une trentaine, et la part des retours sur l’ergonomie a baissé d’un quart. Ce projet a ouvert la voie au poste de Head of Product."
plusLoin:
  - titre: "Le calendrier"
    points:
      - "Février 2023 : état des lieux de l’accessibilité et des écarts de design entre les plateformes."
      - "Mars à octobre 2023 : design system, des premiers composants à la première page construite avec eux, la page d’inscription."
      - "Septembre 2023 : cadrage de la cible, présenté au comité de direction."
      - "Mars 2024 : une navigation commune aux trois plateformes. Avril 2024 : une page des parcours commune."
      - "Janvier à août 2024 : recherche utilisateurs, spécifications, maquettes, développement et recette des nouveaux gabarits."
      - "Août 2024 : mise en production de la fusion."
  - titre: "Les sept lots"
    points:
      - "Avant la mise en production : la barre de navigation commune, les gabarits d’activité, le parcours d’inscription des entreprises sur la plateforme généraliste, l’adaptation de ses pages (accueil, parcours, statistiques, certification), puis les évolutions techniques (authentification unique, infrastructure, marque blanche) et éditoriales."
      - "Après la mise en production : le nettoyage de l’infrastructure, de la base et de l’outil de gestion du contenu, puis les améliorations non prioritaires."
  - titre: "Les gabarits d’activité"
    points:
      - "Le support est un texte, une image, un audio ou une vidéo ; la question, un choix unique ou multiple, un texte à trous, une remise en ordre ou une association."
      - "Les combinaisons se choisissent par compétence et par niveau du cadre européen. Un audio suivi d’un texte à trous travaille par exemple la reconnaissance phonétique dès le niveau A1."
      - "Le ménage fait en passant : une seule consigne là où il y en avait deux, parfois en deux langues ou contradictoires ; un titre plus court, un lecteur audio plus visible."
langue: fr
cle: fusion
---

## Trois plateformes, trois fois le travail

Trois plateformes d’apprentissage des langues étaient nées l’une après l’autre : une pour préparer les examens, une dédiée aux entreprises, une généraliste.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/fusion/avant-apres.fr.svg" width="736" height="592">
    <img src="/illustrations/fusion/avant-apres.etroit.fr.svg" width="350" height="583" loading="lazy" decoding="async" alt="Avant : trois plateformes, chacune avec son interface, ses gabarits d’activité et ses données, chacune dessinée d’un trait différent. Après : la plateforme examens et la plateforme généraliste, qui reçoit le contenu Entreprises et passe à quatre gabarits communs, toutes deux posées sur un design system commun. En pointillés, la plateforme unique : second temps, pas encore engagé.">
  </picture>
  <figcaption>Avant la fusion, trois plateformes et trois façons de faire ; après, deux plateformes sur un socle commun.</figcaption>
</figure>

Chaque évolution se développait et se maintenait donc trois fois. Un apprenant qui passait d’une plateforme à l’autre changeait de navigation et de design, et lancer une nouvelle forme d’exercice demandait un développement. Réunir les plateformes permettait de ne développer qu’une fois, et de donner à l’apprenant un seul repère.

## Viser une plateforme, fusionner en deux temps

En septembre 2023, j’ai cadré la cible et je l’ai présentée au comité de direction : une seule plateforme, organisée autour des compétences plutôt qu’en trois univers. Pour l’atteindre, j’ai retenu un chemin par paliers, où chaque étape rapporte dès sa sortie, sans code jetable.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/fusion/trajectoires.fr.svg" width="736" height="336">
    <img src="/illustrations/fusion/trajectoires.etroit.fr.svg" width="350" height="316" loading="lazy" decoding="async" alt="Trois trajectoires de valeur apportée dans le temps. La trajectoire retenue monte par paliers, chaque étape rapporte. Livrer vite monte vite puis s’aplatit sous la dette. Construire proprement reste à plat longtemps.">
  </picture>
  <figcaption>Trois trajectoires dans le temps : livrer vite monte vite puis s’aplatit sous la dette, construire proprement reste longtemps à plat, la voie retenue monte par paliers.</figcaption>
</figure>

Le premier temps réunissait la plateforme dédiée aux entreprises et la plateforme généraliste, pour deux raisons. Ces deux plateformes étaient les plus proches, par le design comme par la structure des données. Et toutes deux servent à apprendre une langue, quand la plateforme examens sert à préparer un examen de langue, avec un autre prisme.

Ce premier temps a demandé trois arbitrages.

- **Garder les trois univers visibles.** Le produit n’était pas mûr pour dépasser cette présentation. Seule la navigation devenait commune.
- **Mettre en production l’été.** Fusionner deux plateformes présentait un risque d’incident élevé et imposait une maintenance du site. Le faire avant la rentrée le tenait à l’écart de l’arrivée des nouveaux apprenants.
- **Reporter le nettoyage** de l’infrastructure et de la base après la mise en production.

## Le commun d’abord, puis sept lots

La fusion reposait sur un design system lancé en 2023, une bibliothèque de composants partagée par le design et le développement. Les apprenants en ont vu les premiers effets avant la fusion : une navigation commune aux trois plateformes en mars 2024, puis une page des parcours commune en avril.

Le lot le plus lourd portait sur les gabarits d’activité. Les entretiens utilisateurs et les commentaires des enquêtes NPS (Net Promoter Score, la note de recommandation) montraient une charge mentale due à l’interface elle-même. Chaque plateforme avait ses gabarits, une trentaine à elles deux. Nous les avons ramenés à quatre, communs aux deux. Tout le contenu existant devait y entrer, ce qui obligeait à harmoniser d’abord les deux modèles de données.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/fusion/gabarits.fr.svg" width="736" height="211">
    <img src="/illustrations/fusion/gabarits.etroit.fr.svg" width="350" height="487" loading="lazy" decoding="async" alt="À gauche, une trentaine de gabarits d’activité, tous différents. À droite, quatre gabarits communs, chacun fait d’un support et d’une question.">
  </picture>
  <figcaption>Une trentaine de gabarits d’activité, ramenés à quatre gabarits communs, chacun fait d’un support et d’une question.</figcaption>
</figure>

Nous étions une dizaine de personnes, surtout des développeurs, avec une designer et un Product Manager junior, et l’équipe pédagogique à nos côtés. Product Manager puis chef de projet, je tenais le rétroplanning et le découpage en lots, je définissais le modèle de données cible avec les développeurs et les ingénieurs pédagogiques, j’écrivais les spécifications et je menais la recette. Le lead développeur portait l’architecture technique, la designer les composants, les maquettes et les entretiens utilisateurs.

## Bénéfices et impact business

La plateforme dédiée aux entreprises n’existe plus depuis août 2024, et avec elle une base de code à maintenir.

Pour l’apprenant, la part des retours consacrés à l’ergonomie est passée de 8 % entre janvier et août 2024 à 6 % entre septembre et décembre, soit un quart de moins. Les activités ont été conçues selon le référentiel d’accessibilité, un attendu des clients du secteur public éducatif.

Pour l’équipe pédagogique, un nouvel exercice ne demande plus de développement : elle associe n’importe quel support à n’importe quel type de question.

## Ce que j’en retiens

Ce projet, mené comme Product Manager puis comme chef de projet, a ouvert la voie au poste de Head of Product : il demandait de conduire un projet complexe avec une grande équipe.

**Donner la cible, puis un premier pas qui vaut pour lui-même.** La plateforme unique restait l’horizon. Le premier temps devait valoir seul, avec une plateforme de moins à maintenir, même si le second tardait.

**Construire le commun avant de fusionner.** Le design system et le modèle de données harmonisé sont venus d’abord. Préparée ainsi, la bascule a pu se faire pendant l’été.

**Relire la cible avec le contexte.** Le second temps, avec la plateforme examens, n’a pas eu lieu : l’occasion ne s’est pas présentée. Les deux plateformes se rapprochent à chaque projet, mais gardent des objectifs distincts : apprendre une langue, préparer un examen. Le gain ne justifie pas encore le coût. Et l’IA ouvre de nouvelles façons d’apprendre, qui poussent à repartir de zéro plutôt qu’à réutiliser l’existant.
