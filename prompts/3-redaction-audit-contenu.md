# Brief — premier jet de la page Audit contenu (registre/0034)

Tu écris le **texte** de la page projet Audit contenu du portfolio de Jean
Perrier, en français. Pas de code : un fichier Markdown à relire par Jean,
`C:\Users\Jean PERRIER\Portfolio\redaction\audit-contenu.fr.md`.

Applique **en entier** la ligne éditoriale (le second fichier de ton prompt) :
ses trois passes, sa voix, sa liste de tics. Rends à la fin le tableau
d'audit `extrait | tic | réécriture` de ta propre passe 2.

## Le lecteur

Un recruteur (PM, Head of Product, CPO, AI / Data PM) qui a trente secondes
pour la synthèse et, s'il accroche, deux ou trois minutes pour le reste. Il
cherche : un point de vue produit, une décision, de l'IA appliquée avec
discernement et des garde-fous, de la rigueur. Pas long et technique : le
détail va dans « Pour aller plus loin ».

## Les règles qui ne se discutent pas

- **L'employeur n'est jamais nommé** : « une plateforme EdTech », « la
  plateforme ». **Aucun nom d'examen ni de certification** : « un parcours de
  préparation à une certification de langue », « le premier parcours
  audité ». Aucun nom de table, de champ, d'outil interne, aucune URL.
- **Chiffres relatifs** seulement pour les résultats ; les chiffres sur le
  travail de Jean lui-même sont permis.
- **Aucune personne nommée** : la collègue est « une learning designer ».
- **Le constat se formule en levier et sur la correction**, jamais comme un
  défaut de l'employeur.
- **Mené par Jean avec une learning designer** : « nous » pour ce qu'ils ont
  fait ensemble, « je » pour ce que Jean a construit seul (l'outillage).
  Le rôle exact de la learning designer n'est pas établi : écris-le
  `[À COMPLÉTER : son rôle]`, n'invente pas.
- Un fait manquant devient `[À COMPLÉTER]`, jamais une invention.

## La matière (ce qui est vrai)

- **Pourquoi auditer.** Le premier projet (UserVoice) a montré que la
  satisfaction se joue d'abord sur la qualité du contenu : 1 retour sur 3
  laissé dans le formulaire du site porte sur le contenu, et près d'un
  commentaire NPS sur cinq touche à la qualité des explications, des
  exercices ou des traductions. L'effort s'est donc porté sur le contenu
  lui-même.
- **Le périmètre.** Six parcours de préparation à des certifications de
  langue. Le premier audité est **le plus ancien** : son résultat ne présume
  pas de la qualité des suivants.
- **La méthode.**
  - Chaque question passe **une grille de six critères** : la fidélité à la
    source, la justesse de la clé (la réponse attendue), la qualité de
    l'explication (notée de 0 à 3), la langue, la cohérence interne, et
    l'unicité de la réponse (la clé est-elle la seule défendable ?).
  - Chaque question reçoit **un verdict** : bloquant, majeur, mineur, ou
    rien à corriger. Est **bloquante** une question qui empêche l'apprenant
    de répondre (par exemple une clé fausse, ou deux réponses également
    défendables).
  - L'audit est mené par des **agents IA encadrés** (des sous-agents de
    Claude Code, sur abonnement, sans appel à une API payante), qui
    appliquent la grille question par question.
  - Des **contrôles automatiques** balayent tout le corpus en complément
    (des règles vérifiables qui ne dépendent pas du jugement d'un modèle).
  - Un **bilan** donne l'état de chaque question et ses reproches.
- **Corriger sans casser.** Les corrections retenues sortent en **lots prêts
  à relire**, destinés à la préproduction. L'outil **n'écrit jamais
  directement en base** : il produit des lots, il ne les applique pas. Une
  personne relit avant toute application.
- **Le résultat.** Sur le premier parcours audité, **1 question sur 20**
  empêchait l'apprenant de répondre. **Toutes ont été corrigées** (mise en
  production la semaine du 28 septembre 2026).
- **Ce que Jean en retient** (pour la dernière section et « Pour aller plus
  loin ») : il a tiré de ce projet une **doctrine de 25 règles** pour mener
  un projet avec l'IA, mesurée sur le projet lui-même (environ 30 millions de
  tokens mesurés sur quatre semaines, 233 points de décision tracés dans un
  registre). Quelques règles et ce qui les a payées : ouvrir le suivi de
  version dès le premier fichier (deux semaines de travail étaient restées
  hors historique) ; plafonner la taille des modules (les trois plus gros,
  entre 5 400 et 7 600 lignes, étaient aussi les plus réécrits) ; lire le nom
  des champs dans la donnée au lieu de le supposer ; une règle vérifiable
  devient un test ; le relecteur n'est pas l'auteur ; chaque chantier se
  chiffre avant et après.

## Ce que tu rends

Un fichier Markdown avec, dans l'ordre :

1. Un en-tête YAML : `titre`, `fait` (« Sur le premier parcours audité,
   1 question sur 20 empêchait l'apprenant de répondre. Toutes ont été
   corrigées. »), `synthese` (**trois phrases** : le problème, ce que nous
   avons fait, le résultat).
2. Le corps, sous ces **H2** (tu peux en ajuster le libellé, pas le nombre
   sans le dire) : Pourquoi auditer · La méthode · Ce qu'on a trouvé ·
   Corriger sans casser · Ce que j'en retiens. Entre 450 et 650 mots pour le
   corps. Des paragraphes courts, un seul chiffre décisif par section au
   plus.
3. Une section `## Pour aller plus loin` : le détail de la grille et
   quelques règles de la doctrine avec ce qui les a payées, en phrases
   courtes.
4. À la fin, hors du texte, sous un filet : le tableau d'audit de ta passe
   2, puis la liste de ce qui reste `[À COMPLÉTER]`.

Ne modifie aucun autre fichier. Ne commite rien.
