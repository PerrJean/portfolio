---
titre: "Fusion des plateformes  de trois à deux, en visant une seule"
date: "2024-08"
fait: "En août 2024, avant la rentrée, la plateforme dédiée aux entreprises a rejoint la plateforme généraliste. Une plateforme sur trois a été supprimée."
synthese:
  probleme: "Une plateforme EdTech proposait trois plateformes d’apprentissage des langues, nées l’une après l’autre. Chacune avait son interface, ses gabarits d’activité et son modèle de données, si bien que chaque évolution se développait trois fois."
  action: "Product Owner, puis chef de projet, j’ai cadré une cible, une seule plateforme, et je l’ai présentée au comité de direction. Avec une équipe d’une dizaine de personnes, nous avons d’abord posé un design system commun, puis fondu la plateforme dédiée aux entreprises dans la plateforme généraliste, en sept lots."
  resultat: "La fusion est en production depuis août 2024. Les activités tiennent sur quatre gabarits au lieu d’une trentaine, et la part des retours sur l’ergonomie a baissé d’un quart. Mener ce projet m’a donné la légitimité de devenir Head of Product."
plusLoin:
  - titre: "Le calendrier"
    points:
      - "Février 2023  état des lieux de l’accessibilité et des écarts de design entre les plateformes."
      - "Mars à octobre 2023  design system, des premiers composants à la première page construite avec eux, la page d’inscription."
      - "Septembre 2023  cadrage de la cible, présenté au comité de direction."
      - "Mars 2024  une navigation commune aux trois plateformes. Avril 2024  une page des parcours commune."
      - "Janvier à août 2024  recherche utilisateurs, spécifications, maquettes, développement et recette des nouveaux gabarits."
      - "Août 2024  mise en production de la fusion. Novembre 2024  un parcours d’inscription commun aux trois plateformes."
  - titre: "Les sept lots"
    points:
      - "Avant la mise en production  la barre de navigation commune, les gabarits d’activité, le parcours d’inscription des entreprises sur la plateforme généraliste, l’adaptation de ses pages (accueil, parcours, statistiques, certification), puis les évolutions techniques (authentification unique, infrastructure, marque blanche) et éditoriales."
      - "Après la mise en production  le nettoyage de l’infrastructure, de la base et de l’outil de gestion du contenu, puis les améliorations non prioritaires."
  - titre: "Les gabarits d’activité"
    points:
      - "Chaque activité se compose de deux blocs  un support (texte, image, audio ou vidéo) et une question (choix unique ou multiple, texte à trous, remise en ordre, association)."
      - "Les combinaisons se choisissent par compétence et par niveau du cadre européen. Un audio suivi d’un texte à trous travaille par exemple la reconnaissance phonétique dès le niveau A1."
      - "Le ménage fait en passant  une seule consigne là où il y en avait deux, parfois en deux langues ou contradictoires  un titre plus court, un lecteur audio plus visible."
langue: fr
cle: fusion
---

## Trois plateformes, trois fois le travail

Trois plateformes d’apprentissage des langues étaient nées l’une après l’autre  une pour préparer les examens, une dédiée aux entreprises, une généraliste. Chacune avait gardé son interface, ses gabarits d’activité et son modèle de données.

Chaque évolution se développait et se maintenait donc trois fois. Un apprenant qui passait d’une plateforme à l’autre changeait de navigation et de design, et lancer une nouvelle forme d’exercice demandait un développement. Réunir les plateformes permettait de ne développer qu’une fois, et de donner à l’apprenant un seul repère.

## Viser une plateforme, fusionner en deux temps

En septembre 2023, j’ai cadré la cible et je l’ai présentée au comité de direction  une seule plateforme, organisée autour des compétences plutôt qu’en trois univers. Chaque étape vers elle devait apporter de la valeur dès sa sortie, sans code jetable. J’écartais ainsi deux trajectoires, livrer vite en accumulant de la dette, ou construire proprement sans rien rapporter avant longtemps.

Le premier temps réunissait la plateforme dédiée aux entreprises et la plateforme généraliste, pour deux raisons. Ces deux plateformes étaient les plus proches, par le design comme par la structure des données. Et toutes deux servent à apprendre une langue, quand la plateforme examens sert à préparer un examen de langue, avec un autre prisme.

Ce premier temps a demandé trois arbitrages.

- **Garder les trois univers visibles.** Le produit n’était pas mûr pour dépasser cette présentation. Seule la navigation devenait commune.
- **Mettre en production l’été.** Fusionner deux plateformes présentait un risque d’incident élevé et imposait une maintenance du site. Le faire avant la rentrée le tenait à l’écart de l’arrivée des nouveaux apprenants.
- **Reporter le nettoyage** de l’infrastructure et de la base après la mise en production.

## Le commun d’abord, puis sept lots

La fusion reposait sur un design system lancé en 2023, une bibliothèque de composants partagée par le design et le développement. Avant la fusion, il a déjà servi aux apprenants avec une navigation commune aux trois plateformes, puis une page des parcours commune.

Le lot le plus lourd portait sur les gabarits d’activité. Les entretiens utilisateurs et les commentaires des enquêtes NPS montraient une charge mentale due à l’interface elle-même. Chaque plateforme avait ses gabarits, une trentaine à elles deux, dont près des deux tiers côté entreprises. Nous les avons ramenés à quatre, communs aux deux, construits sur un support et une question. Tout le contenu existant devait y entrer, ce qui obligeait à harmoniser d’abord les deux modèles de données.

Nous étions une dizaine de personnes, surtout des développeurs, avec une designer et un PO junior, et l’équipe pédagogique à nos côtés. Chef de projet et Product Owner, je tenais le rétroplanning et le découpage en lots, je définissais le modèle de données cible, j’écrivais les spécifications et je menais la recette. Le lead développeur portait l’architecture technique, la designer les composants, les maquettes et les entretiens utilisateurs.

## Bénéfices et impact business

La plateforme dédiée aux entreprises n’existe plus depuis août 2024  c’est une base de code de moins à faire évoluer et à maintenir.

Pour l’apprenant, la part des retours consacrés à l’ergonomie est passée de  % entre janvier et août 2024 à  % entre septembre et décembre, soit un quart de moins. Les activités ont été conçues selon le référentiel d’accessibilité, un attendu des clients du secteur public éducatif.

Pour l’équipe pédagogique, un nouvel exercice ne demande plus de développement  elle associe n’importe quel support à n’importe quel type de question.

## Ce que j’en retiens

J’ai mené ce projet comme Product Owner, puis comme chef de projet. C’est lui qui m’a donné la légitimité de devenir Head of Product, parce qu’il m’a appris à mener un projet complexe avec une grande équipe. J’en tire trois enseignements.

**Donner la cible, puis un premier pas qui vaut pour lui-même.** La plateforme unique restait l’horizon. Le premier temps devait valoir seul, avec une plateforme de moins à maintenir, même si le second tardait.

**Construire le commun avant de fusionner.** Le design system et le modèle de données harmonisé sont venus d’abord. Préparée ainsi, la bascule a pu se faire pendant l’été.

**Réévaluer la cible quand le contexte change.** Le second temps, avec la plateforme examens, n’a pas eu lieu, et c’est un arbitrage. Les deux plateformes se rapprochent au gré des nouveaux projets, mais gardent des objectifs distincts, apprendre une langue et préparer un examen, avec des particularités qui doivent demeurer. L’analyse coût / opportunité ne s’est pas encore montrée favorable. Et l’IA a déplacé le seuil  elle ouvre des expériences d’apprentissage nouvelles, qui poussent à penser neuf plutôt qu’à capitaliser sur l’existant.

---

<!-- Hors du texte  notes de rédaction pour Jean -->

### Audit de la passe 1

| Extrait (premier jet ou source) | Tic | Réécriture |
|---|---|---|
| « l’impasse produit » (mot des documents) | Constat en défaut (C8), dramatisation | « Réunir les plateformes permettait de ne développer qu’une fois, et de donner à l’apprenant un seul repère. » |
| « l’objectif Lune », « premier étage de la fusée », « l’alunissage » | Métaphores filées | « la cible », « le premier temps », « le second temps ». |
| « une impasse à trois dimensions  technique, UX, contenu » | Triplet réflexe, annonce de plan | Constats en phrases, sans les annoncer  le triplet voulu reste celui des enseignements. |
| « une learning experience plus immersive et fluide » | Mots-emphase, anglicisme | Point retiré en passe 3 (voir plus bas). |
| « décupler les possibilités de création pédagogique » | Emphase sans mesure | « un nouvel exercice ne demande plus de développement  elle associe n’importe quel support à n’importe quel type de question. » |
| « une source d’économie d’échelle massive » | Emphase, généralité | Supprimé  il reste « une base de code de moins à faire évoluer et à maintenir ». |
| « Tout faire d’un coup aurait immobilisé l’équipe » | Fait inventé | Ce que disent les courbes du document  « livrer vite en accumulant de la dette, ou construire proprement sans rien rapporter avant longtemps ». |
| « le lot 2, au cœur de la fusion » | Jargon de consultant | « Le lot le plus lourd portait sur les gabarits d’activité. » |
| « harmoniser, rationaliser et simplifier les gabarits » | Triplet de verbes | « Nous les avons ramenés à quatre ». |
| « J’ai piloté la fusion » | Verbe vague | Les tâches, telles que les documents les attribuent. |
| « … et c’est ce qui l’a rendue finançable. » | Chute courte, et fait inventé | « avec une plateforme de moins à maintenir, même si le second tardait ». |

### Audit de la passe 2

| Extrait | Tic | Réécriture |
|---|---|---|
| « le projet qui a fait de moi un Head of Product » | Titre prêté, emphase | « C’est lui qui m’a donné la légitimité de devenir Head of Product ». Rôle de l’époque  Product Owner, puis chef de projet. |
| « pour deux raisons  elles étaient plus proches…  elles servent toutes deux… » | Deux-points et point-virgule en série | « pour deux raisons. » puis une phrase par raison. |
| « Le second temps, avec la plateforme examens, suivra. » | Futur qui promet | Remplacé en passe 3 par l’arbitrage. |
| « respectent désormais les règles d’accessibilité » | Affirmation non prouvée | « ont été conçues selon le référentiel d’accessibilité ». |
| La légitimité dite deux fois | Redite | Gardée, voulue  c’est le fil de la page. |

### Audit de la passe 3

| Extrait | Tic | Réécriture |
|---|---|---|
| « le second temps a échoué », « n’a pas pu se faire » | Constat en défaut (C8) | « n’a pas eu lieu, et c’est un arbitrage », suivi des raisons de Jean. |
| « l’IA change la donne » | Formule usée | « l’IA a déplacé le seuil  elle ouvre des expériences d’apprentissage nouvelles, qui poussent à penser neuf plutôt qu’à capitaliser sur l’existant. » |
| « des développeurs full stack, des développeurs front, un lead développeur, une designer, un PO junior » | Rafale nominale, effectifs par métier | « une dizaine de personnes, surtout des développeurs, avec une designer et un PO junior ». Le décompte exact reste hors de la page. |
| « Écrire ce qu’on ne fait pas. » (troisième enseignement) | Effet non attesté, redite des arbitrages | Remplacé par « Réévaluer la cible quand le contexte change », qui porte le second temps. |

### Ce qui a été retiré pour tenir sous 800 mots, et pourquoi

- **« Le positionnement visé »** (Pour aller plus loin). C’est un benchmark concurrentiel, utile en interne, mais le recruteur n’y cherche pas le rôle de Jean. La comparaison avec des concurrents, même anonymes, n’apporte rien au récit.
- **Le point « L’interface se parcourt de gauche à droite… »** et « une partie de consignes redondante supprimée ». Ce sont des détails d’interface que le point sur le ménage couvre déjà.
- **Les mois des étapes du design system dans le corps** (mars et avril 2024). Ils restent dans le calendrier.
- **L’exemple du titre de question traduisible.** Il est juste mais technique  « harmoniser d’abord les deux modèles de données » suffit au recruteur.
- **« trois modèles de données multipliaient les occasions de bugs », « publier ou mettre à jour un contenu restait lourd ».** C’est la même idée que « trois fois le travail », en plus long.
- **« La même base / ces gabarits étaient aussi la base du second temps ».** Le second temps a désormais son enseignement.
- **La phrase sur l’équipe pédagogique qui valide la cible des gabarits.** L’équipe pédagogique est nommée dans la phrase sur l’équipe.
- **« Écrire ce qu’on ne fait pas ».** Remplacé, voir l’audit de la passe 3.

### Ce qui reste à trancher

1. **Qui a arbitré le second temps ?** La page dit « c’est un arbitrage », sans dire de qui. Si c’est toi, ou toi avec le comité de direction, la phrase peut le dire  « un arbitrage que j’ai porté ». C’est plus fort pour un recruteur.
2. **« Une dizaine de personnes ».** L’ordre de grandeur vient du dossier CII 2024 de la fusion (décompte par métier dans le rapport). L’équipe pédagogique n’y figure pas  « une dizaine » la laisse à part. Confirmes-tu que cet ordre de grandeur peut sortir 
3. **« Une trentaine », « près des deux tiers côté entreprises ».** Lecture de la slide 17  dix-neuf plus onze, ramenés à quatre. À confirmer, avec l’accord de publier la proportion.
4. **Coûts de maintenance.** Existe-t-il un ordre de grandeur relatif  Sinon, « une base de code de moins » reste seul.
5. **Secteur public éducatif.** Un fait commercial à y adosser  Sinon, la phrase reste telle quelle.
6. **Lots d’après mise en production.** Le nettoyage et les améliorations ont-ils été menés 
7. **Nouveaux exercices.** Les combinaisons marquées « nouvelles » en mai 2024 ont-elles été publiées  Un exemple pourrait étayer la phrase.
8. ** % puis  %.** Même source de retours que dans UserVoice  Si oui, une demi-phrase relierait les deux projets.
9. **Forme.** Garder les trois arbitrages en liste en gras 
10. **Technique.** `cle: fusion` est encore absente du schéma des projets et des routes, à ajouter à l’étape de structure, après ton go.
