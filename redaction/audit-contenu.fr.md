---
titre: "Audit contenu : vérifier chaque question avant l'apprenant"
fait: "Sur le premier parcours audité, 1 question sur 20 empêchait l'apprenant de répondre. Toutes ont été corrigées."
synthese: "Les retours des apprenants d'une plateforme EdTech montraient que leur satisfaction se joue d'abord sur la qualité du contenu. Avec une learning designer, nous avons fait passer chaque question d'un parcours à une grille de six critères, appliquée par des agents IA encadrés et complétée par des contrôles automatiques. Sur ce premier parcours, 1 question sur 20 empêchait l'apprenant de répondre, et toutes ont été corrigées après relecture humaine."
---

## Pourquoi auditer

Le premier projet de ce portfolio, UserVoice, a rassemblé ce que les apprenants d'une plateforme EdTech disent d'elle. Dans le formulaire du site, 1 retour sur 3 porte sur le contenu. La satisfaction se joue donc d'abord là.

Nous avons porté l'effort sur le contenu lui-même, question par question. J'ai mené ce chantier avec une learning designer. Elle a validé la grille d'audit, défini les règles d'écriture des contenus (sauts de ligne, règles éditoriales) et fait la recette des échantillons.

Le périmètre couvre six parcours de préparation à des certifications de langue. Nous avons commencé par le plus ancien.

## La méthode

Chaque question passe une grille de six critères, que j'ai conçue et que la learning designer a validée. Deux portent sur la réponse attendue, la clé : est-elle juste, est-elle la seule défendable ? Les quatre autres vérifient la fidélité à la source, la qualité de l'explication, la langue et la cohérence interne de la question.

La grille aboutit à un verdict, parmi quatre : bloquant, majeur, mineur, ou rien à corriger. Une question est bloquante quand l'apprenant ne peut pas y répondre, par exemple parce que la clé est fausse ou que deux réponses se défendent autant l'une que l'autre.

J'ai construit l'outillage qui applique cette grille. Des agents IA, en l'occurrence des sous-agents de Claude Code, la déroulent question par question, sur abonnement et sans appel à une API payante. Le modèle ne juge pas seul. Des contrôles automatiques balayent tout le corpus en complément, avec des règles vérifiables qui ne dépendent d'aucun modèle. Un bilan donne ensuite, pour chaque question, son état et les reproches qui lui sont faits.

## Ce qu'on a trouvé

Sur le premier parcours audité, 1 question sur 20 a reçu le verdict bloquant. Chacune mettait l'apprenant en échec sans que l'erreur soit la sienne.

La correction a donc un effet direct pour l'apprenant. Chaque question bloquante reprise rend de nouveau possible une réponse juste.

Ce parcours est le plus ancien des six. Son résultat ne présume pas de la qualité des cinq autres.

## Corriger sans casser

Les corrections retenues sortent en lots prêts à relire, destinés à la préproduction. L'outil n'écrit jamais directement en base : il produit les lots, il ne les applique pas. Une personne relit chaque lot avant toute application.

Ce choix laisse la décision à une personne. Un agent qui se trompe sur une clé produit au pire un lot rejeté à la relecture, et non une erreur mise en ligne sans que personne l'ait lue.

Toutes les questions bloquantes du premier parcours ont été corrigées. Elles sont passées en production la semaine du 28 septembre 2026.

## Ce que j'en retiens

J'ai tiré de ce projet une doctrine de 25 règles pour mener un projet avec l'IA. Je l'ai mesurée sur le projet lui-même, en tokens consommés pendant quatre semaines et en points de décision tracés dans un registre.

Certaines règles se disent en une ligne et ont coûté cher avant d'être écrites. Ouvrir le suivi de version dès le premier fichier en est une, après deux semaines de travail restées hors historique.

La règle « le relecteur n'est pas l'auteur » résume l'audit. Elle vaut pour les corrections que propose un agent comme pour le code que j'écris avec lui.

## Pour aller plus loin

### La grille

Chaque question est lue sur six critères.

- **Fidélité à la source.** La question reste fidèle à sa source.
- **Justesse de la clé.** La réponse attendue est bien la bonne.
- **Qualité de l'explication.** Elle est notée de 0 à 3.
- **Langue.**
- **Cohérence interne.** Les éléments de la question ne se contredisent pas.
- **Unicité de la réponse.** La clé est la seule réponse défendable.

Le verdict va de bloquant à rien à corriger, en passant par majeur et mineur. Une question est bloquante si sa clé est fausse, ou si une autre réponse se défend aussi bien. Elle est majeure si elle s'écarte de sa source, ou si son explication n'aide pas l'apprenant. Elle est mineure pour une faute de langue, ou une explication juste mais perfectible. Un critère compte en défaut seulement s'il a été vérifié : ce qu'on n'a pas pu mesurer ne devient pas un reproche.

Les contrôles automatiques portent sur tout le corpus. Ils appliquent des règles vérifiables, sans jugement de modèle. Par exemple : l'explication parle-t-elle du même audio que la question, la mise en forme du contenu est-elle intacte, le texte est-il dans la bonne langue ?

### Ce que disaient les retours

Près d'un commentaire NPS sur cinq touche à la qualité des explications, des exercices ou des traductions.

### La doctrine, et ce qui l'a payée

Les 25 règles sont mesurées sur ce projet : environ 30 millions de tokens sur quatre semaines, 233 points de décision tracés dans un registre.

- **Ouvrir le suivi de version dès le premier fichier.** Deux semaines de travail étaient restées hors historique.
- **Plafonner la taille des modules.** Les trois plus gros, entre 5 400 et 7 600 lignes, étaient aussi les plus réécrits.
- **Lire le nom des champs dans la donnée au lieu de le supposer.**
- **Une règle vérifiable devient un test.**
- **Le relecteur n'est pas l'auteur.**
- **Chaque chantier se chiffre avant et après.**

---

<!-- Hors du texte : notes de rédaction pour Jean -->

### Audit de la passe 2

| Extrait (passe 1) | Tic | Réécriture |
|---|---|---|
| « avant les questions de prix ou de fonctionnement » | Généralité sans fait (invention) | Supprimé : la matière ne le dit pas. |
| « Leur satisfaction s'y joue d'abord sur la qualité du contenu : 1 retour sur 3… » | Le fait vient après la thèse ; deux-points | « Dans le formulaire du site, 1 retour sur 3 porte sur le contenu. La satisfaction se joue donc d'abord là. » |
| « près d'un commentaire NPS sur cinq » dans « Pourquoi auditer » | Chiffre décoratif (deux chiffres dans la section) | Déplacé dans « Pour aller plus loin ». |
| « des agents IA avec des garde-fous » | Jargon de consultant | « des agents IA encadrés », et l'encadrement montré par les faits (contrôles automatiques, lots, relecture). |
| « C'est aussi la correction la plus rentable. » | Généralité sans fait, superlatif non mesuré | « La correction a donc un effet direct pour lui. Chaque question bloquante reprise rend de nouveau possible une réponse juste. » |
| « Ce sont les premières que nous avons corrigées, avant les défauts majeurs et mineurs. » | Invention (l'ordre des corrections et le sort des défauts majeurs et mineurs ne sont pas établis) | Supprimé. |
| « Son résultat ne présume pas des cinq autres, qui restent à auditer. » | Invention (l'état des autres parcours n'est pas établi) | « Son résultat ne présume pas de la qualité des cinq autres. » |
| « jamais une erreur en ligne » | Affirmation plus forte que le fait (la relecture peut rater) | « et non une erreur mise en ligne sans que personne l'ait lue » |
| « Ouvrir le suivi de version dès le premier fichier, par exemple : deux semaines… » | Deux-points en série dans la section | « … en est une, après deux semaines de travail restées hors historique. » |
| « Celle qui résume le mieux l'audit tient en cinq mots : le relecteur n'est pas l'auteur. » | Superlatif non mesuré, deux-points dramatiques, compte faux | « La règle « le relecteur n'est pas l'auteur » résume l'audit. » |
| « Je l'ai mesurée : les tokens consommés, chaque point de décision… » | Deux-points, rafale nominale | « … en tokens consommés pendant quatre semaines et en points de décision tracés dans un registre. » |
| « Leur jugement n'est pas seul. » | Chute courte (la seule phrase brève gardée, en milieu de paragraphe) | « Le modèle ne juge pas seul. », suivi du fait qui le justifie. |
| « C'est ce qui a orienté la grille vers l'explication autant que vers la clé. » | Invention (lien de cause non établi) | Supprimé. |
| « la qualité des explications, des exercices ou des traductions » | Triplet | Gardé : ce sont les mots de la donnée. C'est le seul triplet du texte. |
| Gras dans « Pour aller plus loin » | Gras partout | Gardé sur les seuls intitulés de critère et de règle, rien dans le corps. |

### Reste à compléter

1. **Le rôle de la learning designer** (« Pourquoi auditer »).
2. **Ce qui sépare un défaut majeur d'un mineur** (« Pour aller plus loin »).
3. **Un ou deux exemples de contrôles automatiques** (« Pour aller plus loin »).
4. **À confirmer** : qui a conçu la grille. Le texte l'écrit au neutre (« Chaque question passe une grille ») ; si elle vient de vous deux, passer à « nous avons conçu ».
5. **À confirmer** : la personne qui relit les lots. Le texte dit « une personne » ; si c'est la learning designer ou vous, le nommer par son rôle.
