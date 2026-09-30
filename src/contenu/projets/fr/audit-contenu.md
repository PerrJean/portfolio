---
titre: "Audit contenu : vérifier chaque question avant l’apprenant"
date: "2026-09"
cadre:
  role: "Conception et développement de l’outil, avec l’IA"
  equipe: "Avec une learning designer"
  duree: "Septembre 2026, en cours"
fait: "Sur le premier parcours audité, 1 question sur 20 faisait échouer l’apprenant sans que l’erreur soit la sienne. Toutes sont corrigées."
synthese:
  probleme: "D’après leurs retours, la satisfaction des apprenants d’une plateforme EdTech se joue d’abord sur la qualité du contenu."
  action: "Avec une learning designer, nous avons soumis chaque question d’un parcours à une grille de six critères. Des agents IA encadrés l’ont appliquée, et des contrôles automatiques l’ont complétée."
  resultat: "Les corrections, relues par échantillon avant d’être appliquées, sont en production depuis la semaine du 28 septembre 2026."
plusLoin:
  - titre: "La grille"
    points:
      - "Fidélité à la source. La question ne s’écarte pas de sa source."
      - "Justesse de la réponse. La réponse attendue est bien la bonne."
      - "Qualité de l’explication. La question en contient une, qui ne se contente pas de répéter la réponse. Elle est notée de 0 à 3."
      - "Langue. Le texte est correct."
      - "Cohérence interne. Les éléments de la question ne se contredisent pas."
      - "Une seule réponse défendable. Aucune autre réponse ne se défend aussi bien que la bonne."
  - titre: "Les verdicts"
    points:
      - "Une question est majeure si elle s’écarte de sa source, ou si son explication n’aide pas l’apprenant."
      - "Elle est mineure pour une faute de langue, ou pour une explication juste mais perfectible."
      - "Un critère compte en défaut seulement s’il a été vérifié. Ce qu’on n’a pas pu mesurer ne devient pas un reproche."
  - titre: "Les contrôles automatiques"
    points:
      - "L’audio, lu à travers son transcript, dit ce que la question lui fait dire."
      - "Les supports texte et image ne contredisent ni la question ni l’audio."
      - "La question porte sur ce que disent l’audio et les supports."
      - "Les réponses proposées correspondent à la question posée."
      - "L’explication parle du même audio, des mêmes supports et des mêmes réponses que la question."
  - titre: "Les enseignements, côté technique"
    points:
      - "Le bon contexte : un fichier de consignes court, sous 300 lignes ; des consignes propres à chaque dossier, chargées selon le fichier modifié (règles par glob) ; des savoir-faire chargés à la demande (skills) ; des modules de 500 lignes au plus."
      - "Les décisions écrites : une fiche par décision (ADR), plus de deux cents tracées en quatre semaines, chacune avec son coût estimé et réel, recalibré régulièrement."
      - "La vérification : les règles vérifiables deviennent des tests, les règles de méthode des contrôles avant chaque enregistrement (hook de pre-commit) ; la relecture est confiée à un agent qui repart de zéro (contexte neuf)."
langue: fr
cle: auditContenu
---

## Pourquoi auditer

Dans le formulaire du site, 1 retour négatif sur 3 concerne le contenu : c’est le constat du projet UserVoice.

J’ai mené ce chantier avec une learning designer. J’ai conçu la grille d’audit et l’outillage qui l’applique ; elle a validé la grille et défini les règles d’écriture des contenus.

Le périmètre couvre plusieurs parcours de préparation à des certifications de langue. Nous avons commencé par le plus ancien.

## Ce que la grille vérifie

La grille compte six critères, détaillés dans « Pour aller plus loin » : la fidélité à la source, la justesse de la réponse, la qualité de l’explication, la langue, la cohérence interne, et une seule réponse défendable.

Chaque question reçoit ensuite un verdict parmi quatre : bloquant, majeur, mineur ou rien à corriger. Elle est bloquante quand l’apprenant ne peut pas y répondre. C’est le cas si la réponse attendue est fausse, ou si deux réponses se défendent autant.

Des agents IA appliquent la grille, question par question, et leur verdict est recoupé. En parallèle, des contrôles automatiques passent sur tout le corpus, d’abord par des règles fixes, puis par une IA. Ils vérifient que l’audio, lu par sa transcription, les textes et images, la question, les réponses et l’explication disent la même chose. Un bilan donne l’état de chaque question et ce qui lui est reproché.

<div data-schema="chaine-audit"></div>

## Ce que nous avons trouvé

Sur le premier parcours audité, 1 question sur 20 a reçu le verdict bloquant. L’apprenant y échouait sans que l’erreur soit la sienne.

Ce résultat ne présume pas de la qualité du reste du contenu du site.

## Corriger sans casser

L’outil n’écrit jamais directement en base. Il produit des lots de corrections, un par famille de défauts, c’est-à-dire un même défaut répété sur plusieurs questions. Dans chaque famille, la learning designer relit un échantillon, pris parmi les cas les moins sûrs, et sa décision vaut pour toute la famille. Le lot part en production dès que l’ensemble est meilleur que l’existant, même s’il garde quelques défauts. Si une question mal corrigée est repérée ensuite, on reprend le contrôle ou la règle d’écriture à l’origine de l’erreur.

Sur le premier parcours, elle a aussi vérifié les corrections en préproduction. Toutes les questions bloquantes ont été corrigées, puis mises en production.

<figure>
  <a href="/captures/audit-contenu/carnet-relecture.png"><img src="/captures/audit-contenu/carnet-relecture.png" width="1360" height="1230" loading="lazy" decoding="async" alt="Écran de relecture d’un outil d’audit. Une carte marquée BLOQUANT montre une question d’anglais à compléter, « She has been working in this department ___ 2019 », dont la réponse enregistrée est A, « for ». L’explication actuelle se contente d’affirmer que A est la bonne réponse. Le contrôle reproche que la bonne réponse est B. La correction proposée explique que « since » introduit un point de départ. En bas, la ligne de décision : à valider, à corriger, à rejeter."></a>
  <figcaption>Le carnet de relecture : pour chaque cas relu, le reproche, la correction proposée et la décision. Données synthétiques.</figcaption>
</figure>

## Bénéfices et impact business

Chaque correction rend à l’apprenant la possibilité de répondre juste. Au bilan annuel, une école cliente demandait trois choses : une analyse exhaustive de ses contenus, un processus formalisé pour corriger les erreurs, et la fin des QCM où plusieurs réponses se défendent. Les retours de ses étudiants pointaient le même problème. L’audit répond à chaque demande : la grille, les lots relus, le critère « une seule réponse défendable ». Il réduit le risque de churn de ce client, et la méthode s’applique aux parcours suivants.

## Ce que j’en retiens

Ce projet m’apprend à construire avec l’IA, et j’en suis encore en chemin. Voici ce que j’applique désormais à chaque projet :

**Donner à l’IA le bon contexte, pas tout le contexte.** L’IA relit ses consignes à chaque tâche : plus elles sont longues, plus elle devient lente, coûteuse et approximative. J’ai appris à garder un socle court, et à ranger le reste à part, pour qu’il ne soit chargé que quand la tâche en a besoin.

**Écrire chaque décision.** Une décision prise au fil d’une conversation est oubliée à la suivante. Chacune tient désormais dans une fiche courte et datée, avec son coût estimé puis réel. L’IA la relit avant d’agir, et l’écart entre l’estimé et le réel m’apprend à mieux estimer.

**Faire vérifier ce qui est fait.** Une consigne écrite finit par être oubliée, et « c’est fait » ne prouve rien. Ce qui peut se vérifier devient un contrôle automatique, et ce qu’un agent produit, un autre le relit. C’est la règle de l’audit lui-même : le relecteur n’est pas l’auteur.
