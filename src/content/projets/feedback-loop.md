---
titre: "Feedback Loop : transformer des milliers de retours utilisateurs en décisions produit"
resume: "Un outil local qui classe les retours d'une sonde in-app, fait valider l'incertain par un humain et déduit seul la vie des bugs."
annee: 2026
role: "Conception, construction et exploitation, en solo avec Claude Code"
duree: "3 semaines de construction, puis un cycle quotidien"
outils: ["Python", "SQLite", "Streamlit", "Claude", "Google Sheets"]
image: "/images/feedback-loop/hero.svg"
imageAlt: "Bilan hebdomadaire : dossiers chauds croisés avec leur statut de traitement, contrôle des correctifs, nouveaux sujets."
chiffres:
  - valeur: "−87 %"
    legende: "de file de validation humaine en trois jours d'exploitation"
  - valeur: "1 seule"
    legende: "saisie humaine par retour : la signature. Tout le reste est déduit."
  - valeur: "4 blocs"
    legende: "dans le bilan hebdo, chacun répondant à une question de décision"
appris:
  - "Un rapport se juge sur sa capacité à faire décider, pas sur sa richesse statistique. Un delta sans le statut de traitement est du bruit qui ressemble à de l'information."
  - "Chaque champ à remplir par un humain est une dette. Avant d'ajouter une saisie, chercher comment la déduire des données datées."
  - "La fraîcheur de la source est une métrique de premier rang : une panne amont silencieuse a fait apparaître des baisses partout, toutes mécaniques."
  - "Les données réelles sont sales de façon prévisible : identifiants cassés en notation scientifique, virgules décimales, export qui ne lit que le premier onglet. Les figer en règles dès le départ."
ordre: 1
---

## Le problème

Une sonde in-app collecte plusieurs milliers de retours d'apprenants par an. Ils sont riches, mais la qualification se faisait à la main dans un tableur, par lots, avec plusieurs semaines de retard. Résultat : les mêmes bugs remontaient de mois en mois sans qu'on sache s'ils étaient déjà en correction, corrigés, ou réapparus après un correctif.

La question que je voulais pouvoir poser chaque lundi, en cinq minutes : **quels sont les trois problèmes les plus récurrents, sont-ils adressés, et y a-t-il un nouveau sujet que personne n'a encore vu ?**

## Ce que j'ai décidé de ne pas faire

- **Pas de double catégorisation.** L'humain qualifie une seule chose, la signature du bug. Les épisodes, les pics, les réapparitions sont calculés à partir des retours datés et du référentiel. Toute proposition qui ajoutait une saisie par épisode a été écartée : elle n'aurait pas été tenue à jour et le calcul aurait fini par mentir.
- **Pas de classification entièrement automatique.** L'IA classe avec un score de confiance. En dessous d'un seuil, ou quand deux signatures sont trop proches, le retour va dans une file de validation. Chaque validation humaine enrichit les exemples des passes suivantes.
- **Pas de modification de la source.** La feuille d'origine n'est jamais écrite. Les résultats partent vers un onglet dédié, séparé.
- **Pas de rapport organisé par variation statistique.** Une première version listait les « top mouvements » de la semaine. Je l'ai rejetée : impossible d'y voir si un problème était traité.

## La démarche

<figure class="schema">
  <img src="/images/feedback-loop/pipeline.svg" alt="Schéma en cinq étapes : sonde in-app, import incrémental, classification par IA avec seuil de confiance, file de validation humaine, bilan hebdomadaire et épisodes déduits." />
  <figcaption>Le cycle quotidien. Une seule étape demande un geste humain, la validation, et elle se réduit d'elle-même avec le temps.</figcaption>
</figure>

**Un référentiel comme colonne vertébrale.** Une trentaine de signatures de bugs regroupées en familles, chacune avec des critères d'inclusion, des frontières explicites avec ses voisines et un statut de traitement : à trier, identifié, en correction, corrigé, hors scope. C'est ce statut, saisi une fois par signature, qui permet ensuite de croiser le volume avec la question « est-ce adressé ? ».

**Une classification qui sait douter.** Chaque retour reçoit une signature principale, une alternative et un score. Le routage est simple : validation automatique seulement si la confiance est haute *et* nettement supérieure à l'alternative. Sinon, file humaine. Au bout de quelques centaines de validations, des règles mécaniques prennent le relais sur les cas devenus évidents : verbatims vides, doublons, paires de signatures équivalentes.

**Une interface de validation pensée pour aller vite.** Trois boutons, un raccourci « suivant », un « annuler la dernière », la validation groupée des doublons. Le but n'était pas la beauté mais le débit : la file a fondu de 87 % en trois jours.

**Des épisodes déduits, pas déclarés.** Un épisode s'ouvre quand le volume d'une signature sur trois jours dépasse sa ligne de base, se ferme après quatorze jours de silence. La date de correctif, saisie dans le référentiel, se rattache à l'épisode en cours. Un pic qui démarre après le correctif est signalé comme réapparition à investiguer. « Régression » reste un mot humain, jamais un état calculé.

**Un bilan en quatre blocs, chacun répondant à une question.**

| Bloc | Question à laquelle il répond |
|---|---|
| Dossiers chauds | Quels sont les trois problèmes les plus fréquents, et où en est leur traitement ? |
| Contrôle des correctifs | Les bugs déclarés corrigés ont-ils vraiment cessé de remonter ? |
| Nouveaux sujets | Y a-t-il une émergence cette semaine ? Le verdict est toujours explicite, même quand la réponse est « non ». |
| Jamais investigué | Qu'est-ce qui remonte régulièrement sans qu'on l'ait jamais regardé ? |

<figure class="capture">
  <img src="/images/feedback-loop/hero.svg" alt="Bilan hebdomadaire sur données fictives." />
  <figcaption>Le bilan du lundi, sur données fictives. La colonne « statut » est celle qui change tout : elle sépare un problème connu d'un problème ignoré.</figcaption>
</figure>

## Le rôle de l'IA dans la construction

Claude Code a écrit l'essentiel du code, mais la valeur s'est jouée ailleurs : dans les allers-retours sur ce qu'il fallait mesurer. Plusieurs de mes premières demandes ont donné des rapports techniquement justes et inutiles. Le travail a consisté à formuler la question de décision, puis à laisser l'outil trouver la mécanique.

Deux exemples de dialogue qui ont changé le produit :

- Sur les hausses de la semaine, j'obtenais des alertes à chaque doublement. Sur des comptages de quelques unités, un doublement seul est du bruit. On a posé trois conditions cumulatives, dont un écart de deux écarts-types à l'attendu.
- Sur les épisodes, la première proposition demandait de déclarer un correctif dans l'interface. J'ai refusé la saisie supplémentaire. La version finale déduit tout des retours datés.

## Ce qui s'est mal passé

La source amont s'est figée pendant deux semaines sans que rien ne le signale. Toutes les courbes baissaient, le rapport concluait à des améliorations. Depuis, la fraîcheur de la source est vérifiée à chaque cycle et une semaine incomplète est nommée comme telle dans le bilan plutôt que comparée à une semaine pleine.
