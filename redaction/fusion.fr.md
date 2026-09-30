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

<!-- Figure : avant-apres (ops/images/fusion/avant-apres.fr.svg, étroit : avant-apres.etroit.fr.svg) -->

Chaque évolution se développait et se maintenait donc trois fois. Un apprenant qui passait d’une plateforme à l’autre changeait de navigation et de design, et lancer une nouvelle forme d’exercice demandait un développement. Réunir les plateformes permettait de ne développer qu’une fois, et de donner à l’apprenant un seul repère.

## Viser une plateforme, fusionner en deux temps

En septembre 2023, j’ai cadré la cible et je l’ai présentée au comité de direction : une seule plateforme, organisée autour des compétences plutôt qu’en trois univers. Pour l’atteindre, j’ai retenu un chemin par paliers, où chaque étape rapporte dès sa sortie, sans code jetable.

<!-- Figure : trajectoires (ops/images/fusion/trajectoires.fr.svg, étroit : trajectoires.etroit.fr.svg) -->

Le premier temps réunissait la plateforme dédiée aux entreprises et la plateforme généraliste, pour deux raisons. Ces deux plateformes étaient les plus proches, par le design comme par la structure des données. Et toutes deux servent à apprendre une langue, quand la plateforme examens sert à préparer un examen de langue, avec un autre prisme.

Ce premier temps a demandé trois arbitrages.

- **Garder les trois univers visibles.** Le produit n’était pas mûr pour dépasser cette présentation. Seule la navigation devenait commune.
- **Mettre en production l’été.** Fusionner deux plateformes présentait un risque d’incident élevé et imposait une maintenance du site. Le faire avant la rentrée le tenait à l’écart de l’arrivée des nouveaux apprenants.
- **Reporter le nettoyage** de l’infrastructure et de la base après la mise en production.

## Le commun d’abord, puis sept lots

La fusion reposait sur un design system lancé en 2023, une bibliothèque de composants partagée par le design et le développement. Les apprenants en ont vu les premiers effets avant la fusion : une navigation commune aux trois plateformes en mars 2024, puis une page des parcours commune en avril.

Le lot le plus lourd portait sur les gabarits d’activité. Les entretiens utilisateurs et les commentaires des enquêtes NPS montraient une charge mentale due à l’interface elle-même. Chaque plateforme avait ses gabarits, une trentaine à elles deux. Nous les avons ramenés à quatre, communs aux deux. Tout le contenu existant devait y entrer, ce qui obligeait à harmoniser d’abord les deux modèles de données.

<!-- Figure : gabarits (ops/images/fusion/gabarits.fr.svg, étroit : gabarits.etroit.fr.svg) -->

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

---

<!-- Hors du texte : notes de rédaction pour Jean -->

### Audit de la passe 1

| Extrait (premier jet ou source) | Tic | Réécriture |
|---|---|---|
| « l’impasse produit » (mot des documents) | Constat en défaut (C8), dramatisation | « Réunir les plateformes permettait de ne développer qu’une fois, et de donner à l’apprenant un seul repère. » |
| « l’objectif Lune », « premier étage de la fusée », « l’alunissage » | Métaphores filées | « la cible », « le premier temps », « le second temps ». |
| « une impasse à trois dimensions : technique, UX, contenu » | Triplet réflexe, annonce de plan | Constats en phrases, sans les annoncer ; le triplet voulu reste celui des enseignements. |
| « décupler les possibilités de création pédagogique » | Emphase sans mesure | « un nouvel exercice ne demande plus de développement : elle associe n’importe quel support à n’importe quel type de question. » |
| « une source d’économie d’échelle massive » | Emphase, généralité | Supprimé ; il reste « une base de code de moins à faire évoluer et à maintenir ». |
| « Tout faire d’un coup aurait immobilisé l’équipe » | Fait inventé | Remplacé par les trajectoires du document, aujourd’hui portées par la figure. |
| « le lot 2, au cœur de la fusion » | Jargon de consultant | « Le lot le plus lourd portait sur les gabarits d’activité. » |
| « harmoniser, rationaliser et simplifier les gabarits » | Triplet de verbes | « Nous les avons ramenés à quatre ». |
| « J’ai piloté la fusion » | Verbe vague | Les tâches, telles que les documents les attribuent. |
| « … et c’est ce qui l’a rendue finançable. » | Chute courte, et fait inventé | « avec une plateforme de moins à maintenir, même si le second tardait ». |

### Audit des passes 2 à 4

| Extrait | Tic | Réécriture |
|---|---|---|
| « le projet qui a fait de moi un Head of Product » ; puis « C’est lui qui m’a donné la légitimité de devenir Head of Product » | Titre prêté, emphase ; puis trop de « je » (Jean) | « Ce projet a ouvert la voie au poste de Head of Product », le projet en sujet. |
| « Product Owner », « PO junior » | Consigne de Jean | « Product Manager (PM) » à la première occurrence (synthèse), puis « PM ». |
| « c’est une base de code de moins à faire évoluer et à maintenir » | Bénéfice incomplet (Jean) | « Tout développement à venir se fait désormais deux fois, et non plus trois ». |
| « pour deux raisons : elles étaient plus proches… ; elles servent toutes deux… » | Ponctuation en série | « pour deux raisons. » puis une phrase par raison. |
| « respectent désormais les règles d’accessibilité » | Affirmation non prouvée | « ont été conçues selon le référentiel d’accessibilité ». |
| « n’a pas eu lieu, et c’est un arbitrage » | Rôle prêté (Jean ne l’a pas porté) | « n’a pas eu lieu : l’occasion ne s’est pas présentée », puis ses quatre raisons, en contexte. |
| « Réévaluer la cible quand le contexte change » | Titre qui suppose une décision | « Relire la cible avec le contexte ». |
| « l’IA a déplacé le seuil » | Image abstraite | « l’IA ouvre des expériences d’apprentissage nouvelles, qui poussent à penser neuf ». |
| « J’écartais ainsi deux trajectoires, livrer vite… ou construire proprement… » | Redite de la figure | « j’ai retenu un chemin par paliers, où chaque étape rapporte dès sa sortie » ; les deux trajectoires écartées sont dans la figure. |
| « Chacune avait gardé son interface, ses gabarits d’activité et son modèle de données. » | Redite de la figure et de la synthèse | Supprimée du corps. |
| « construits sur un support et une question » ; point « Chaque activité se compose de deux blocs » | Redite de la figure | Supprimés ; le point garde seulement les types de support et de question. |
| « dont près des deux tiers côté entreprises » | Proportion non validée | Supprimée. |

### Ce qui reste à trancher

1. **Coûts de maintenance.** Existe-t-il un ordre de grandeur relatif ? Sinon, « une base de code de moins » reste seul.
2. **Secteur public éducatif.** Un fait commercial à y adosser ? Sinon, la phrase reste telle quelle.
3. **Lots d’après mise en production.** Le nettoyage et les améliorations ont-ils été menés ?
4. **Nouveaux exercices.** Les combinaisons marquées « nouvelles » en mai 2024 ont-elles été publiées ?
5. **8 % puis 6 %.** Même source de retours que dans UserVoice ? Si oui, une demi-phrase relierait les deux projets.
6. **Forme.** Garder les trois arbitrages en liste en gras ?
7. **Technique.** `cle: fusion` est encore absente du schéma des projets et des routes, à ajouter à l’étape de structure, après ton go.
