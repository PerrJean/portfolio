# Second relevé : lourdeurs et phrases peu claires (registre/0071)

Lecture seule. Le texte vient du site construit (`.dist-releve2`, supprimé
depuis) : quatorze pages, légendes et « Pour aller plus loin » compris. Les
listes « étape par étape » des deux schémas sont réservées aux lecteurs
d'écran : elles ne sont pas relevées. Rien n'est appliqué, chaque ligne attend
le go de Jean. Les chemins courts (`fr:61`, `en:61`) renvoient au fichier du
projet dans `src/contenu/projets/fr/` ou `en/`. Quand la même phrase change en
anglais, la réécriture EN suit dans la même ligne.

## Les cinq changements qui comptent le plus

1. Mises en situation, fait de l'accueil et de la page : les clients classent l'échange en premier, mais c'est le retour qui prend la tête de la feuille de route, sans raison donnée (n°1, n°12, n°14).
2. Fusion : « Une plateforme EdTech proposait trois plateformes » dès la première phrase, puis « univers » jamais défini ; le lecteur ne sait plus ce qu'on fusionne (n°3, n°4).
3. UserVoice : le classement des retours (« deux axes », « signature », « double catégorisation humaine… données datées ») ne se comprend pas et semble contredire le classement par l'IA (n°21, n°22).
4. Audit contenu : on ne sait plus qui vérifie quoi, entre des « contrôles automatiques » qui incluent une IA et une relecture humaine décrite de trois façons (n°26, n°27).
5. Matrice : l'écart de perception est connu avant l'entretien (l.41) puis découvert pendant (l.60, l.78), et « relue avec le PM avant de s'en servir » revient quatre fois (n°30, n°31).

**Hors tableau.** L'accroche de l'accueil est fixée : elle n'est pas
réécrite. Deux remarques seulement. « L'autre qui corrige chaque question »
en dit plus que la page Audit, où l'outil vérifie et où une personne relit la
correction. Et « et fait grandir un PM de mon équipe », placé après les deux
outils, peut se lire comme un troisième outil (`src/pages/index.astro:22`).

## FR

### Accueil

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 1 | « Invités à classer ce qui comptait le plus, les clients ont mis en tête la qualité de l'échange avec l'IA et celle du retour après l'échange. Le retour pédagogique est passé en tête de la feuille de route, avant l'engagement. » | **Incompréhensible** : l'échange est classé premier, mais le retour prend la tête, sans raison ; « en tête » deux fois ; « l'engagement » n'est défini nulle part | « Invités à classer ce qui comptait le plus, les clients ont placé la qualité de l'échange avec l'IA et celle du retour avant les badges et la progression. Le retour pédagogique est passé en tête de la feuille de route. » Si l'échange doit rester premier, dire pourquoi le retour passe devant : [À COMPLÉTER].<br>EN : « Asked to rank what mattered most, clients put the quality of the exchange with the AI and of the feedback ahead of badges and progress tracking. Learning feedback moved to the top of the roadmap. » | `src/contenu/projets.ts:60-61`, `fr/mises-en-situation.md:4`, `en/speaking-practice.md:4` |
| 2 | « Alors j'ai agi dessus. » | Familier ; « dessus » renvoie au « contenu » de la ligne d'avant ; ne dit pas ce qui a été fait | « Alors j'ai audité le contenu. »<br>EN : « So I audited the content. » | `src/contenu/projets.ts:101-102` |

### Fusion des plateformes

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 3 | « Une plateforme EdTech proposait trois plateformes d'apprentissage des langues, nées l'une après l'autre. Chacune avait… » | **Incompréhensible** : « plateforme » désigne l'entreprise et ses produits dans la même phrase, en tête de page | « Une plateforme EdTech s'était construite en trois produits d'apprentissage des langues, nés l'un après l'autre. Chacun avait son interface… » (ou « une entreprise EdTech », si Jean assouplit C1 ici)<br>EN : « An EdTech platform had grown into three language-learning products, built one after another. Each had… » | `fr:6`, `en:6` |
| 4 | « plutôt qu'en trois univers » ; « Garder les trois univers visibles. Le produit n'était pas mûr pour dépasser cette présentation. » | **Terme interne** jamais défini ; « dépasser cette présentation » obscur | l.47 : « …plutôt qu'en trois univers, un par ancienne plateforme. » l.61 : « Garder les trois univers visibles. Le produit n'était pas prêt à les fondre en un seul : seule la navigation devenait commune. » (à confirmer : un univers = une ancienne plateforme ; l'anglais « product lines » est déjà clair) | `fr:47`, `fr:61` |
| 5 | « Le faire avant la rentrée le tenait à l'écart de l'arrivée des nouveaux apprenants. » | Sujet flou : « le » renvoie au risque ou à la maintenance ? | « Fusionner deux plateformes présentait un risque d'incident élevé et imposait une coupure du site. En été, l'un et l'autre passaient avant l'arrivée des nouveaux apprenants, à la rentrée. »<br>EN : « In summer, both came before new learners arrived for the new school year. » | `fr:62`, `en:62` |
| 6 | « la part des retours consacrés à l'ergonomie est passée de 8 % entre janvier et août 2024 à 6 % » | **Incohérence** : UserVoice dit que les retours n'étaient pas classés avant septembre 2026 (`uservoice.md:27`) ; d'où vient la mesure de 2024 ? | « la part des retours [source : À COMPLÉTER] consacrés à l'ergonomie… », et la même source dans la synthèse | `fr:85`, `fr:8` |
| 7 | « Product Manager (PM), puis chef de projet » ; « Chef de projet et PM, je tenais… » ; « mené comme PM puis comme chef de projet » | **Incohérence** : un rôle dit de trois façons, dans deux ordres | l.79 : « PM puis chef de projet, je tenais le rétroplanning… »<br>EN l.79 : « As PM, then project lead, I owned… » | `fr:7`, `fr:79`, `fr:91` |
| 8 | « Ce projet, mené comme PM puis comme chef de projet, a ouvert la voie au poste de Head of Product : il demandait de conduire un projet complexe avec une grande équipe. » | Redit la synthèse (rôle et Head of Product) | « Conduire un projet complexe avec une grande équipe m'a préparé au poste de Head of Product. »<br>EN : « Running a complex project with a large team prepared me for the Head of Product role. » | `fr:91`, `en:91` |
| 9 | « Avant la fusion, il a déjà servi aux apprenants avec une navigation commune aux trois plateformes, puis une page des parcours commune. » | Tournure lourde (« servi aux apprenants avec ») | « Les apprenants en ont vu les premiers effets avant la fusion : une navigation commune aux trois plateformes en mars 2024, puis une page des parcours commune en avril. » | `fr:67` |
| 10 | « …l'occasion ne s'est pas présentée. Les deux plateformes se rapprochent au gré des nouveaux projets, mais gardent des objectifs distincts, apprendre une langue et préparer un examen, avec des particularités qui doivent demeurer. L'analyse coût / opportunité ne s'est pas encore montrée favorable. » | Phrase de 30 mots, noms à la place des verbes, quatre raisons empilées | « Le second temps, avec la plateforme examens, n'a pas eu lieu. Les deux plateformes se rapprochent à chaque projet, mais gardent des objectifs distincts : apprendre une langue, préparer un examen. Le gain ne justifie pas encore le coût. Et l'IA ouvre de nouvelles façons d'apprendre, qui poussent à repartir de zéro plutôt qu'à réutiliser l'existant. » | `fr:97` |
| 11 | « Trois trajectoires de valeur apportée dans le temps : la trajectoire retenue monte par paliers. » | La légende ne nomme qu'une courbe sur trois | « Trois trajectoires dans le temps : livrer vite monte vite puis s'aplatit sous la dette, construire proprement reste longtemps à plat, la voie retenue monte par paliers. » (repris du texte alternatif de la figure) | `fr:54` |

### Mises en situation orales

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 12 | « Tous ceux que l'équipe a interrogés voulaient d'abord un retour qui dise ce qui a marché… » | **Incohérence** : « d'abord » contredit le classement de la l.61, où l'échange passe avant le retour | Supprimer « d'abord » : « …voulaient un retour qui dise ce qui a marché et ce qu'il faut retravailler ».<br>EN : supprimer « first of all » | `fr:77`, `en:77` |
| 13 | « L'IA a aussi ses propres limites. Les apprenants cherchent les failles d'une conversation, alors elle reste fermée sur son scénario. » | Lien logique faux : la phrase décrit une limite posée à l'IA, pas une limite de l'IA | « L'IA, elle, ne sort jamais de son scénario : les apprenants cherchent les failles d'une conversation. »<br>EN : « The AI never leaves its scenario: learners look for the cracks in a conversation. » | `fr:73`, `en:73` |
| 14 | « l'engagement » ; « les animations d'engagement » ; « La gamification et la progression » ; « les animations d'engagement (badges, progression) » | **Incohérence** : une même chose nommée quatre fois ; « animations » flou | « les badges et la progression » partout.<br>EN : « badges and progress tracking » (« engagement animations » sonne traduit) | `fr:4`, `fr:23`, `fr:61`, `fr:63`, `fr:87` |
| 15 | « Début 2026 : Design Sprint, prototype, puis backlog priorisé et périmètre de la première version. » puis « Février 2026 : entretiens avec des clients qui avaient testé la première version » | **Date** qui ne colle pas : sprint, prototype, première version et tests clients en six semaines, sur une page datée février 2026 | Vérifier la date du Design Sprint : [À COMPLÉTER] | `fr:13-14`, `fr:3` |
| 16 | « Ces clients, des entreprises, achètent la preuve… » | Sujet flou : les clients cités avant (l.59) sont des responsables pédagogiques du supérieur et de la formation professionnelle | « Les nouveaux clients, des entreprises, achètent la preuve que leurs salariés progressent à l'oral. »<br>EN : « The new clients, companies, buy… » | `fr:77`, `en:77` |
| 17 | « J'ai accompagné le Product Manager (PM) et la product designer de mon équipe sur la méthode et la mise en place d'un Design Sprint » | Redite de la synthèse au corps ; « accompagné » ne dit pas ce que Jean a fait (tic) | Synthèse : « J'ai cadré la méthode et le Design Sprint avec le PM et la product designer de mon équipe, qui ont ensuite mené entretiens et enquêtes auprès des clients. » l.59 : « Du Design Sprint, l'équipe a tiré un prototype, puis une première version testée par des clients : … » EN idem | `fr:7`, `fr:59` |
| 18 | « Sur une plateforme EdTech d'apprentissage des langues, l'apprenant s'entraînait beaucoup… » | Redit la synthèse lue juste au-dessus | « L'apprenant s'entraînait beaucoup à comprendre et à écrire, moins à parler en situation, face à un recruteur ou devant un jury. » EN idem | `fr:51`, `en:51` |
| 19 | « Les attendus de chaque question restent cachés » (figure) | **Jargon** : « attendus » n'est défini que dans « Pour aller plus loin » | « Ce que chaque question attend de l'apprenant reste caché »<br>EN : « What each question expects stays hidden » | `src/components/schemas/echange-oral.mjs:41`, `:74` |
| 20 | « Le modèle montre la formulation attendue, à la portée du niveau de l'apprenant et non celle d'un locuteur natif. » | Parallèle cassé : « celle » renvoie à « portée » | « Le modèle montre une formulation à la portée de l'apprenant, pas celle d'un locuteur natif. » | `fr:36` |

### UserVoice

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 21 | « Chaque retour est ensuite qualifié sur deux axes. S'il signale un bug, il reçoit une signature, parmi une trentaine. Sinon, il reçoit un ou plusieurs thèmes […], puisqu'un même commentaire peut en citer plusieurs. » | **Incompréhensible** : « deux axes » pour un choix entre deux ; « signature » jamais expliquée ; « puisque » ne justifie rien | « Chaque retour est ensuite classé. S'il signale un bug, il reçoit une signature, qui identifie le bug, parmi une trentaine. Sinon, il reçoit un ou plusieurs thèmes de satisfaction, parmi une trentaine aussi : un même commentaire peut en citer plusieurs. »<br>EN : « Each piece of feedback is then tagged. If it reports a bug, it gets a signature, which identifies the bug… » | `fr:35`, `en:35` |
| 22 | « Une double catégorisation humaine. Seule la signature se saisit ; le reste se déduit des données datées. » | **Incompréhensible** hors du projet ; semble contredire la l.58, où l'IA classe tout | [À COMPLÉTER : sens à confirmer]. Piste : « Faire classer chaque retour deux fois à la main. Seule la signature d'un bug se saisit ; le reste se déduit des données du retour. » | `fr:12`, `en:12` |
| 23 | « l'écoute des apprenants a objectivé un point de douleur, la qualité du contenu, qui est passée en tête des priorités. […] Le projet Audit contenu part de ce constat et répond à sa demande. » | Jargon (« objectivé un point de douleur ») ; « sa demande » : laquelle ? Elle n'est détaillée que dans l'Audit, qui redit le fait | « Surtout, l'écoute des apprenants a montré, chiffres à l'appui, que la qualité du contenu pesait le plus ; elle est passée en tête des priorités. Au bilan annuel, une école cliente pointait le même sujet. Le projet Audit contenu part de ce constat. »<br>EN : « …a school client pointed to the same issue. The content audit project starts from that finding. » | `fr:52`, `en:52` |
| 24 | « C'est lui qui répond à la question de départ. » | Laquelle ? La page en pose trois (l.31) | « C'est lui qui dit, chaque lundi, quels sujets reviennent et s'ils sont traités. »<br>EN : « It tells, every Monday, which topics come back and whether they are handled. » | `fr:60`, `en:60` |
| 25 | « La page Analyse suit, trimestre par trimestre, la part des commentaires qui citent chaque catégorie face à l'année précédente, et range les catégories selon les points de NPS à gagner. » | 32 mots, deux compléments intercalés | « La page Analyse : pour chaque catégorie, la part des commentaires qui la citent, trimestre par trimestre, face à l'année précédente. Les catégories sont rangées par points de NPS à gagner. Données synthétiques. » | `fr:39` |

### Audit contenu

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 26 | « Des agents IA encadrés appliquent la grille […]. Le modèle ne juge pas seul. En parallèle, des contrôles automatiques […] : un contrôle déterministe, puis un contrôle par IA. Ils vérifient que l'audio, par son transcript, […] concordent. » | **Qui vérifie quoi** : « encadrés » et « ne juge pas seul » sans dire par quoi ; « automatiques » inclut une IA ; « déterministe », « transcript » | « Des agents IA appliquent la grille, question par question, et leur verdict est recoupé. Des contrôles automatiques passent sur tout le corpus, d'abord par des règles fixes, puis par une IA. Ils vérifient que l'audio, lu par sa transcription, les textes et images, la question, les réponses et l'explication disent la même chose. »<br>EN : « …and their verdicts are cross-checked. Automated checks run over the whole corpus, first with fixed rules, then with an AI… » | `fr:53`, `en:53` |
| 27 | « relues par échantillon » ; « relit, famille par famille, les cas les moins fiables » ; « relit un échantillon par famille de défauts » (figure) | **Incohérence** : la relecture dite de trois façons ; « famille de défauts » jamais définie ; « qui l'a produite » ambigu | l.65 : « Il produit des lots de corrections, un par famille de défauts, c'est-à-dire un même défaut répété sur plusieurs questions. Dans chaque famille, la learning designer relit un échantillon, pris parmi les cas les moins sûrs, et sa décision vaut pour toute la famille. […] Si une question mal corrigée est repérée ensuite, on reprend le contrôle ou la règle d'écriture à l'origine de l'erreur. » (à confirmer) EN idem | `fr:8`, `fr:65`, `src/components/schemas/chaine-audit.mjs:47`, `:90` |
| 28 | Bénéfices, 110 mots : « Recoupées avec les retours des apprenants B2B2C, ses remontées désignaient le même point de douleur. L'audit y répond point par point : […] C'est un moyen direct de réduire le risque de churn de ce client… » | Le paragraphe le plus long du site ; « B2B2C », « churn » ; redit UserVoice | « Chaque correction rend à l'apprenant la possibilité de répondre juste. Au bilan annuel, une école cliente demandait trois choses : une analyse exhaustive de ses contenus, un processus formalisé pour corriger les erreurs, et la fin des QCM où plusieurs réponses se défendent. Les retours de ses apprenants pointaient le même problème. L'audit répond à chaque demande : la grille, les lots relus, le critère « une seule réponse défendable ». Il réduit le risque de perdre ce client, et la méthode s'applique aux parcours suivants. » (à confirmer : B2B2C = les apprenants de l'école) | `fr:76`, `en:76` |
| 29 | « Chacune tient désormais dans une fiche courte et datée, avec son coût estimé puis réel. » | « coût » : en quoi ? Le lecteur pense à des euros | « …avec son coût estimé puis réel, [unité : À COMPLÉTER]. » Même précision en « Pour aller plus loin » | `fr:84`, `fr:33`, `en:84` |

### Matrice de compétences

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 30 | « …le PM et moi, son manager, n'en avions pas la même perception. » | **Incohérence** : l'écart est connu avant l'entretien, puis « apparu » en entretien (l.60, l.78) ; la phrase redit aussi la synthèse | « Dans l'équipe, rien ne disait ce que « devenir senior » voulait dire. La progression d'un PM reposait donc sur l'impression de chacun, la sienne comme celle de son manager. »<br>EN : « …so a PM's growth rested on each person's impression, theirs and their manager's. » | `fr:41`, `en:41` |
| 31 | « Avant de m'en servir, je l'ai relue avec le PM. » ; « qu'il a relus avant qu'on s'en serve » | Redite : le même fait quatre fois (l.7, l.51, l.66, l.76) | Supprimer la phrase de la l.51 et la relative de la l.66 : « La progression du PM se discute sur des critères écrits. » EN idem | `fr:51`, `fr:66` |
| 32 | « sa maîtrise du métier » ; « l'IA appliquée à ce métier » | « métier » ambigu : celui de PM ou celui de l'EdTech ? L'anglais tranche (« product management ») | « …et sur sa maîtrise du métier de PM. […] aller plus loin dans l'IA appliquée au product management » (à confirmer) | `fr:62` |

### À propos

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 33 | « J'y manage une équipe […], que j'accompagne au quotidien, de la discovery à la mise en production. Je porte aussi des sujets en direct » | Anglicismes (« manage », « discovery ») ; « accompagne » et « sujets » sans contenu | « J'y dirige une équipe de Product Managers et de Product Designers, que je suis au quotidien, de la découverte à la mise en production. Je mène aussi certains projets moi-même, et je pilote… »<br>EN : « I also run some projects myself » au lieu de « take on topics hands-on » | `src/pages/a-propos.astro:22-24`, `src/pages/en/about.astro:22-23` |
| 34 | « à la DINUM, l'Observatoire de la qualité des démarches en ligne et « Je donne mon avis », puis à la DITP, Services publics + » | Sigles inconnus d'un recruteur du privé ; l'anglais explique l'Observatoire, le français non | « …à la direction interministérielle du numérique (DINUM), l'Observatoire de la qualité des démarches en ligne, qui mesure la qualité des services publics en ligne, et « Je donne mon avis », puis à la direction interministérielle de la transformation publique (DITP), Services publics +. » EN : les deux intitulés en clair | `src/pages/a-propos.astro:27-28`, `src/pages/en/about.astro:26-28` |

### Entre projets

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 35 | « J'en tire trois enseignements » (Fusion, Audit, Matrice) ; « Faire vérifier, pas seulement faire », « Faire classer, pas seulement écouter », « le bon contexte, pas tout le contexte » | Même moule d'un projet à l'autre ; opposition fabriquée en série | Supprimer l'annonce « J'en tire trois enseignements », les titres en gras suffisent. Une seule tournure « X, pas Y » sur le site : « Faire vérifier ce qui est fait », « Faire classer les attentes » | `fusion-plateformes.md:91`, `audit-contenu.md:80`, `:82`, `:86`, `matrice-competences.md:72`, `mises-en-situation.md:87` |

## EN

| # | Extrait | Ce qui gêne | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 36 | « Everyone also wanted feedback that helps them progress » | Faux sens : « them » renvoie aux clients, pas aux apprenants | « feedback that helps learners progress » | `en/speaking-practice.md:61` |
| 37 | « the learning team » (role-plays) ; « the learning design team » (merger) | Incohérence : la même « équipe pédagogique », deux noms | « the learning design team » partout | `en/speaking-practice.md:7`, `:55`, `en/platform-merger.md:79`, `:87` |
| 38 | « facing a recruiter or a jury » ; « jury member » | Sonne traduit : « jury » évoque un tribunal | « in front of a recruiter or an exam panel » ; « panel member » | `en/speaking-practice.md:51`, `:29` |
| 39 | « and I am still on the way » | Sonne traduit | « and I am still learning » | `en/content-audit.md:80` |
| 40 | « the PM » neuf fois ; « as the PM's manager » ; « the starting point for the PM's growth » | Répétition lourde | « their » après la première mention : « a shared view of their skills, the starting point for their growth » | `en/skills-matrix.md:43`, `:60`, `:66` |
