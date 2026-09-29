---
titre: "Audit contenu : vérifier chaque question avant l'apprenant"
fait: "Sur le premier parcours audité, 1 question sur 20 empêchait l'apprenant de répondre. Toutes ont été corrigées."
synthese: "D'après leurs retours, la satisfaction des apprenants d'une plateforme EdTech se joue d'abord sur la qualité du contenu. Avec une learning designer, nous avons soumis chaque question d'un parcours à une grille de six critères. Des agents IA encadrés l'ont appliquée, et des contrôles automatiques l'ont complétée. Les corrections, relues avant d'être appliquées, sont en production depuis la semaine du 28 septembre 2026."
---

## Pourquoi auditer

Dans le formulaire du site, 1 retour sur 3 concerne le contenu : c'est le constat du premier projet, UserVoice.

J'ai mené ce chantier avec une learning designer. J'ai conçu la grille d'audit et l'outillage qui l'applique ; elle a validé la grille, défini les règles d'écriture des contenus et fait la recette des échantillons.

Le périmètre couvre six parcours de préparation à des certifications de langue. Nous avons commencé par le plus ancien.

## Ce que la grille vérifie

La grille compte six critères. Deux portent sur la réponse : la réponse attendue est la bonne, et aucune autre ne se défend aussi bien. Un troisième vérifie que la question contient une explication, et qu'elle n'est pas circulaire. Les trois derniers portent sur la fidélité à la source, la langue et la cohérence.

Chaque question reçoit ensuite un verdict parmi quatre : bloquant, majeur, mineur ou rien à corriger. Elle est bloquante quand l'apprenant ne peut pas y répondre. C'est le cas si la réponse attendue est fausse, ou si deux réponses se défendent autant.

Des agents IA appliquent la grille, question par question : des sous-agents de Claude Code, sur abonnement, sans API payante. Le modèle ne juge pas seul. Des contrôles automatiques, qui ne dépendent d'aucun modèle, passent sur tout le corpus. Un bilan donne l'état de chaque question et ce qui lui est reproché.

## Ce que nous avons trouvé

Sur le premier parcours audité, 1 question sur 20 a reçu le verdict bloquant. L'apprenant y échouait sans que l'erreur soit la sienne. Chaque correction lui rend la possibilité de répondre juste.

Ce parcours est le plus ancien. Son résultat ne présume pas de la qualité du reste du contenu du site.

## Corriger sans casser

L'outil n'écrit jamais directement en base. Il produit des lots de corrections, et une personne relit chacun avant la préproduction. Si un agent se trompe de réponse, le pire est un lot rejeté à la relecture.

Toutes les questions bloquantes du premier parcours ont été corrigées. Les corrections sont passées en production la semaine du 28 septembre 2026.

## Ce que j'en retiens

Ce projet m'a laissé 25 règles pour garder la main sur ce qu'un agent produit. Je les ai mesurées en tokens sur quatre semaines et en points de décision tracés dans un registre.

Chaque chantier est chiffré avant de commencer, puis une fois fini. L'écart montre où l'estimation s'est trompée. Une règle qu'on peut vérifier devient un test. Elle se contrôle alors toute seule, sans dépendre de la mémoire de quiconque.

La règle « le relecteur n'est pas l'auteur » résume l'audit. Ce qu'un agent produit, un autre agent le relit, et une personne tranche. Cette règle vaut pour les corrections du contenu comme pour le code que j'écris avec l'IA.

Certaines règles ont coûté cher avant d'être écrites. Sans suivi de version dès le premier fichier, deux semaines de travail sont restées hors historique.

## Pour aller plus loin

### La grille

Chaque question est lue sur six critères.

- **Fidélité à la source.** La question ne s'écarte pas de sa source.
- **Justesse de la réponse.** La réponse attendue est bien la bonne.
- **Qualité de l'explication.** La question en contient une, qui ne se contente pas de répéter la réponse. Elle est notée de 0 à 3.
- **Langue.** Le texte est correct.
- **Cohérence interne.** Les éléments de la question ne se contredisent pas.
- **Une seule réponse défendable.** Aucune autre réponse ne se défend aussi bien que la bonne.

Le verdict va de bloquant à rien à corriger, en passant par majeur et mineur. Une question est bloquante si sa réponse attendue est fausse, ou si une autre réponse se défend aussi bien. Elle est majeure si elle s'écarte de sa source, ou si son explication n'aide pas l'apprenant. Elle est mineure pour une faute de langue, ou pour une explication juste mais perfectible. Un critère compte en défaut seulement s'il a été vérifié. Ce qu'on n'a pas pu mesurer ne devient pas un reproche.

Les contrôles automatiques portent sur tout le corpus. Ils appliquent des règles vérifiables, sans jugement de modèle. L'explication doit parler du même audio que la question. La mise en forme du contenu doit rester intacte. Le texte doit être dans la bonne langue.

### Ce que disaient les retours

Près d'un commentaire NPS sur cinq touche à la qualité des explications, des exercices ou des traductions.

### Les règles, et ce qu'elles ont coûté

Les 25 règles sont mesurées sur ce projet : environ 30 millions de tokens sur quatre semaines, et 233 points de décision tracés dans un registre.

- **Ouvrir le suivi de version dès le premier fichier.**
- **Plafonner la taille des modules.** Les trois plus gros, entre 5 400 et 7 600 lignes, étaient aussi les plus réécrits.
- **Lire le nom des champs dans la donnée au lieu de le supposer.**
- **Une règle vérifiable devient un test.**
- **Le relecteur n'est pas l'auteur.**
- **Chaque chantier se chiffre avant et après.**

---

<!-- Hors du texte : notes de rédaction pour Jean -->

### Audit de la passe 2

| Extrait (texte précédent ou passe 1) | Tic | Réécriture |
|---|---|---|
| « la réponse attendue, la clé » ; « sa clé est fausse » ; « se trompe sur une clé » | Consigne de Jean : jamais « clé » | « la réponse attendue », « la bonne réponse », « se trompe de réponse ». Critère renommé « Justesse de la réponse ». |
| « nous avons fait passer chaque question d'un parcours à une grille de six critères, appliquée par des agents IA encadrés et complétée par des contrôles automatiques » | Tournure lourde, participes empilés | Phrase validée par Jean, en deux phrases (synthèse). |
| « Chaque question passe une grille de six critères, que j'ai conçue et que la learning designer a validée. » | Deux relatives empilées | « J'ai conçu la grille d'audit et l'outillage qui l'applique. La learning designer a validé la grille. » |
| « Deux portent sur la réponse attendue, la clé : est-elle juste, est-elle la seule défendable ? » | Deux-points, questions en série | « La réponse attendue doit être la bonne, et aucune autre ne doit se défendre aussi bien. » |
| « Les quatre autres vérifient la fidélité à la source, la qualité de l'explication, la langue et la cohérence interne » | Rafale nominale ; contrôles non nommés (généralité) | L'explication a son paragraphe (« Chaque question doit en contenir une… elle ne se contente pas de répéter la réponse »), puis deux phrases pour les trois autres critères. |
| « Des agents IA, en l'occurrence des sous-agents de Claude Code, la déroulent question par question, sur abonnement et sans appel à une API payante. » | Plusieurs idées, incise | Deux phrases : qui applique la grille, puis sur quels moyens. |
| « Des contrôles automatiques balayent tout le corpus en complément » | Généralité sans fait | Même phrase allégée, suivie d'un exemple (l'explication parle du même audio que la question). |
| « Un bilan donne ensuite, pour chaque question, son état et les reproches qui lui sont faits. » | Incise, tournure passive | « Un bilan donne enfin l'état de chaque question et ce qui lui est reproché. » |
| « La correction a donc un effet direct pour l'apprenant. » | Généralité sans fait | Supprimé ; il reste « Chaque correction lui rend la possibilité de répondre juste. » |
| « Son résultat ne présume pas de la qualité des cinq autres. » | Consigne de Jean (périmètre) | « Son résultat ne présume pas de la qualité du reste du contenu du site. » |
| « L'outil n'écrit jamais directement en base : il produit les lots, il ne les applique pas. » | Deux-points, redite | « L'outil n'écrit jamais directement en base. Il produit les lots, et une personne relit chacun avant qu'il soit appliqué. » |
| « …produit au pire un lot rejeté à la relecture, et non une erreur mise en ligne sans que personne l'ait lue » | Opposition fabriquée (« et non ») | « Si un agent se trompe de réponse, le pire est un lot rejeté à la relecture. Aucune correction ne part en ligne sans avoir été lue. » |
| « une doctrine de 25 règles » | Jargon pour un recruteur | « 25 règles pour mener un projet avec l'IA. Elles servent à garder la main sur ce qu'un agent produit. » |
| « Je l'ai mesurée sur le projet lui-même… » sans rien sur l'effet des règles | Généralité sans fait | Paragraphe « Elles changent la façon de travailler » : chiffrage avant et après, règle vérifiable devenue test, relecture par un autre agent. Aucun chiffre ajouté. |
| « …en est une, après deux semaines de travail restées hors historique. » | Participe en fin de phrase | « …en fait partie. Deux semaines de travail étaient restées hors historique. » |
| « comme pour le code que j'écris avec lui » | Pronom ambigu | « avec l'IA » ; « Cette règle vaut pour… » au lieu de « Elle », après « une personne tranche ». |
| « montraient que leur satisfaction se joue » (synthèse) | Concordance des temps, lourdeur | « D'après leurs retours, la satisfaction des apprenants… se joue d'abord sur la qualité du contenu. » |
| « Le modèle ne juge pas seul. » | Chute courte | Gardée, la seule du texte, en milieu de paragraphe. |
| « des explications, des exercices ou des traductions » ; les trois exemples de contrôles automatiques | Triplet | Gardés dans « Pour aller plus loin » : ce sont les mots de la donnée. Aucun triplet dans le corps. |
