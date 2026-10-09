---
titre: "Comprendre la chute du NPS"
date: "2026-10"
cadre:
  role: "Conception et pilotage de l’analyse, avec l’IA"
  equipe: "Seul pour l’analyse ; les account managers et l’équipe produit pour les questionnaires et la restitution"
  duree: "Octobre 2026, en cours"
fait: "J’ai testé dix-sept hypothèses sur la chute du NPS : ce n’était pas le produit, mais le profil des utilisateurs interrogés."
synthese:
  probleme: "À la rentrée 2026, le NPS (Net Promoter Score, la note de recommandation, de −100 à +100) des apprenants d’une plateforme EdTech perd une vingtaine de points en un mois."
  action: "J’ai écrit l’analyse avant de construire les pages du tableau de bord, puis j’ai testé avec l’IA chaque explication possible, une par une."
  resultat: "La note dépend d’abord du profil des utilisateurs et de la façon dont leur organisation déploie la solution. Deux leviers en sortent, et trois décisions ont été prises le 9 octobre."
plusLoin:
  - titre: "Les dix-sept hypothèses en détail"
    points:
      - "La baisse vient du changement de questionnaire (fin juillet 2026, un sondage dans l’application a remplacé l’ancien outil). Test : les mêmes organisations, avant et après. Résultat : environ un point d’écart, sur une échelle de −100 à +100. Écartée."
      - "Les apprenants sont devenus plus mécontents. Test : séparer l’effet de qui répond et celui de ce que pensent les répondants, puis suivre plusieurs milliers d’apprenants qui ont répondu deux fois. Résultat : plus de 80 % de la baisse vient d’un changement de profil ; un même apprenant note comme avant (+0,2 point). Écartée."
      - "Le contenu explique la note. Test : mesurer quelle part de l’écart entre apprenants tient à leur organisation, et quelle part aux contenus suivis. Résultat : l’organisation porte 83 à 89 % de l’écart. D’un contenu à l’autre, la note varie de ± 6 points ; d’une organisation à l’autre, de ± 25. Écartée."
      - "Le profil des utilisateurs explique la note. Test : six profils d’apprenants. Résultat : jusqu’à 45 points d’écart, des lycées professionnels et centres de formation d’apprentis aux particuliers. Retenue."
      - "L’usage imposé fait baisser la note. Test : classer chaque organisation, d’après les données commerciales, selon que la solution y est obligatoire ou choisie. Résultat : 21 à 23 points de moins quand elle est obligatoire, avec l’ancien comme avec le nouveau questionnaire. Retenue."
      - "Les écoles du supérieur ont toutes le même profil d’utilisateurs. Test : classer plus d’une centaine d’écoles par type, à partir d’informations publiques. Résultat : 58 points séparent les grandes écoles de commerce des écoles privées en alternance ; les écoles d’ingénieurs se placent entre les deux. Écartée."
      - "L’anglais général et l’anglais des affaires déçoivent par leur contenu. Test : croiser le contenu suivi et le caractère obligatoire ou choisi de la solution. Résultat : choisis, ils sont bien notés ; imposés, ils perdent 55 à 59 points. La préparation d’examen résiste à l’obligation, parce que l’apprenant y vise un score. Écartée."
      - "Les apprenants qui finissent leur parcours en fin de semestre notent plus sévèrement. Test : comparer à organisation égale, c’est-à-dire entre apprenants d’une même organisation, selon le moment du parcours et le mois, sur deux années. Résultat : un léger creux en mai-juin (2 à 4 points) ; ceux qui finissent dans l’urgence notent comme les autres. Écartée."
      - "Les apprenants peu actifs tirent la note vers le bas. Test : leur poids dans la note, à organisation égale. Résultat : ils notent comme les apprenants actifs de leur organisation (0,2 point d’écart). Écartée."
      - "Les apprenants suivis de près par leurs enseignants sont plus satisfaits. Test : l’activité des enseignants dans près de 150 organisations, comparée entre organisations et dans le temps. Résultat : aucun lien. La corrélation, qui mesure de −1 à +1 si deux chiffres bougent ensemble, vaut 0,01. Écartée."
      - "Le questionnaire arrive trop tôt, avant que l’apprenant ait découvert la solution. Test : la note selon le temps écoulé depuis l’ouverture de son accès. Résultat : dans l’école la plus négative, le rejet est immédiat et stable, avec deux points d’écart entre le premier jour et le trentième. Écartée."
      - "Les apprenants mécontents répondent moins souvent que les autres. Test : un apprenant sollicité sur quatre répond ; les réponses ont été repondérées, c’est-à-dire que les profils qui répondent peu ont reçu plus de poids, sur des dizaines de milliers de sollicitations. Résultat : les silencieux ressemblent aux détracteurs (les notes de 0 à 6), et le NPS réel serait plus bas d’environ trois points. Retenue."
      - "Plus la solution est utilisée dans une organisation, plus ses apprenants sont satisfaits. Test : le taux d’utilisation des accès et la note, dans une quarantaine d’organisations. Résultat : l’inverse, avec une corrélation de −0,37. Plus l’usage est poussé par l’obligation, plus la note baisse. Écartée, sens inverse."
      - "Un objectif de score (atteindre une note à un examen) satisfait davantage les apprenants qu’un objectif d’heures (passer un nombre d’heures sur la solution). Test : un questionnaire aux account managers sur une quinzaine de comptes, puis les objectifs réellement fixés dans la solution par plus de 80 organisations. Résultat : 91 points d’écart dans le questionnaire, 5 dans les données réelles. La marge d’incertitude va de −24 à +29 et inclut zéro. Écartée."
      - "Les organisations fixent un objectif d’heures là où la solution est peu utilisée (l’hypothèse inverse de la précédente). Test : l’utilisation de la solution avant que l’objectif soit fixé. Résultat : aucune différence (rapport de 1,01). Écartée."
      - "Une note basse annonce le départ d’un client. Test : les renouvellements de contrats, dans les données commerciales. Résultat : trop peu de départs pour conclure. Non concluante."
      - "L’analyse donne trop de poids aux écoles. Test : le poids de chaque marché dans les notes et dans l’activité. Résultat : l’éducation pèse autant dans les deux. Les entreprises clientes sont presque absentes des notes, alors qu’elles comptent bien davantage dans l’activité : un angle mort. Partiellement retenue."
  - titre: "Les méthodes"
    points:
      - "L’intervalle de confiance, la marge d’incertitude autour d’une note, avec une correction quand on compare beaucoup de groupes à la fois, pour ne pas prendre le hasard pour un écart."
      - "La décomposition d’une variation : quelle part vient de qui répond, quelle part de ce que les apprenants pensent."
      - "La comparaison à organisation égale, entre apprenants d’une même organisation, pour neutraliser ce qui est propre à chaque client."
      - "Le suivi des mêmes apprenants d’une réponse à l’autre, en tenant compte du retour naturel des notes extrêmes vers la moyenne."
      - "La repondération des non-réponses, avec un test qui vérifie que le résultat tient quand on change les poids."
      - "Le test de Mann-Whitney, qui compare deux groupes sans supposer la forme de leurs notes, calculé avec et sans pondération pour que quelques gros clients n’écrasent pas le résultat."
langue: fr
cle: analyseNps
---

## Le point de départ

J’avais huit pages de tableau de bord et beaucoup de graphiques, mais aucun constat écrit. J’ai arrêté de construire des pages pour écrire l’analyse d’abord.

## Tester chaque explication, garder celles qui tiennent

Chaque explication possible de la chute est devenue une hypothèse, testée par l’IA sur les données. Mon rôle était de formuler chaque hypothèse, de dire quelle décision elle devait éclairer, de contester la méthode et de vérifier les chiffres.

Dans le tableau, l’organisation désigne l’école ou l’entreprise cliente. On parle d’usage imposé quand l’organisation rend la solution obligatoire. Sur dix-sept hypothèses, trois ont été retenues, une l’a été en partie, douze ont été écartées et une est restée non concluante.

| Hypothèse | Verdict |
|---|---|
| Le profil des utilisateurs explique la note | Retenue |
| L’usage imposé fait baisser la note | Retenue |
| Les apprenants mécontents répondent moins souvent que les autres | Retenue |
| La baisse vient du changement de questionnaire | Écartée |
| Les apprenants sont devenus plus mécontents | Écartée |
| Le contenu explique la note | Écartée |
| Les écoles du supérieur ont toutes le même profil d’utilisateurs | Écartée |
| L’anglais général et l’anglais des affaires déçoivent par leur contenu | Écartée |
| Les apprenants qui finissent leur parcours en fin de semestre notent plus sévèrement | Écartée |
| Les apprenants peu actifs tirent la note vers le bas | Écartée |
| Les apprenants suivis de près par leurs enseignants sont plus satisfaits | Écartée |
| Le questionnaire arrive trop tôt, avant que l’apprenant ait découvert la solution | Écartée |
| Plus la solution est utilisée dans une organisation, plus ses apprenants sont satisfaits | Écartée, sens inverse |
| Un objectif de score satisfait davantage les apprenants qu’un objectif d’heures | Écartée |
| Les organisations fixent un objectif d’heures là où la solution est peu utilisée | Écartée |
| Une note basse annonce le départ d’un client | Non concluante |
| L’analyse donne trop de poids aux écoles | Partiellement retenue |

## Le signal qui ne tenait pas

Une hypothèse m’a appris plus que les autres : un objectif de score (atteindre une note à un examen) satisferait davantage les apprenants qu’un objectif d’heures (passer un nombre d’heures sur la solution). Un questionnaire aux account managers donnait un écart très net en faveur du score. Le résultat aurait pu partir tel quel dans une présentation.

Les objectifs réellement fixés dans la solution par les organisations ne l’ont pas confirmé. L’écart du questionnaire tenait au type d’école des organisations interrogées. J’ai corrigé la diapositive avant de la montrer.

## Ce que l’analyse a établi

La rentrée a amené d’autres utilisateurs, qui notent plus sévèrement. Le NPS global mélange anciens et nouveaux utilisateurs, et laisse croire à un produit qui se dégrade.

L’anglais général et l’anglais des affaires sont bien notés quand la solution est choisie ; imposée, ils perdent plus de 50 points. Le produit convainc ceux qui l’ont choisi ; chez ceux à qui on l’impose, le levier est le déploiement.

## Deux leviers, trois priorités produit

Le premier levier est le déploiement, porté par les account managers avec l’aide de l’équipe produit. Il consiste à comprendre les clients où la solution est très utilisée et bien notée, et à agir avant le premier jour là où elle est rejetée. Le rejet se joue dès l’ouverture de l’accès.

Le second levier est le produit, avec trois priorités. D’abord, auditer le contenu le plus utilisé, en commençant par la préparation d’examen. Ensuite, créer des parcours courts avec un objectif visible pour l’anglais général et l’anglais des affaires. Enfin, ajouter des activités d’expression orale, dont des mises en situation IA.

L’analyse propose aussi de lire le NPS par profil d’utilisateurs plutôt que de lui fixer un objectif global. Deux indicateurs l’accompagnent. Le premier est la part de détracteurs (les notes de 0 à 6) là où la solution est imposée. Le second suit l’usage dans les entreprises clientes, qui répondent encore peu au NPS.

## Ce qui a été décidé le 9 octobre

Le 9 octobre 2026, trois décisions ont été prises :

- une enquête qualitative auprès des apprenants à qui la solution est imposée, dans les organisations ciblées ;
- la poursuite des corrections du contenu, dans le projet Audit contenu ;
- une présentation de l’analyse à la direction commerciale chargée des clients professionnels.

Les chiffres n’expliquent plus tout : deux écoles au déploiement identique sont notées à 78 points d’écart. Plusieurs centaines d’apprenants se sont portés volontaires pour un entretien.

## Ce que j’en retiens

Avec l’IA, produire une analyse va vite : le goulot d’étranglement devient la vérification des chiffres.
