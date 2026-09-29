# Relevé des lourdeurs (registre/0044)

Lecture seule, texte relevé sur le site construit (`.dist-releve`, supprimé
depuis). Rien n'est appliqué : chaque ligne attend le go de Jean.

## Les trois changements qui comptent le plus

1. Les synthèses répètent le fait affiché en grand juste au-dessus (UserVoice n°3, Audit contenu n°10) : la phrase « résultat » doit dire autre chose.
2. La synthèse « action » de UserVoice fait 38 mots et empile deux relatives, alors que c'est la phrase la plus lue du site (n°2) : trois phrases courtes.
3. Audit contenu dit deux fois la grille (corps puis « Pour aller plus loin ») et quatre fois la relecture dans « Corriger sans casser » (n°11, n°12) : le corps résume, l'annexe détaille.

## « porte sur le contenu » : 6 occurrences

Dans les sources du site : `src/contenu/projets.ts:31` (accueil),
`src/contenu/projets/fr/uservoice.md:3` (fait en tête), `:7` (synthèse),
`:40` (corps), `src/contenu/projets/fr/audit-contenu.md:35` (corps),
`src/pages/projets/uservoice.astro:9` (description, émise deux fois dans le
HTML : `description` et `og:description`). Le recruteur en voit 5 dans les
pages, plus l'aperçu de partage. Hors site, `redaction/` en garde 4
(`uservoice.fr.md:3`, `:4`, `:25`, `audit-contenu.fr.md:9`). L'anglais
garde « is about » (registre/0044).

## FR

### Accueil

| # | Extrait | Ce qui pèse | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 1 | « 1 retour sur 3 porte sur le contenu. » | Verbe mou (relevé de Jean) | « 1 retour sur 3 concerne le contenu. » | `src/contenu/projets.ts:31` |

### UserVoice

| # | Extrait | Ce qui pèse | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 2 | « Je les ai réunis dans une seule table, où l'IA classe […] et laisse les cas douteux à une validation humaine, pour un bilan qui se lit en cinq minutes chaque lundi. » | 38 mots, deux relatives empilées, en tête de page | « Je les ai réunis dans une seule table. L'IA classe chaque retour avec un score de confiance et laisse les cas douteux à un humain. Le bilan se lit en cinq minutes, chaque lundi. » | `src/contenu/projets/fr/uservoice.md:6` |
| 3 | « On pensait surtout à des bugs ; la donnée a montré qu'un retour sur trois porte sur le contenu, et l'effort s'est déplacé vers sa qualité. » | Redit le fait affiché trois lignes plus haut ; 27 mots | « On pensait surtout à des bugs. La donnée a désigné le contenu, et l'effort s'est déplacé vers sa qualité. » (à défaut : « concerne le contenu ») | `src/contenu/projets/fr/uservoice.md:7` |
| 4 | « 1 retour sur 3 porte sur le contenu. » (fait en tête et description de la page) | Verbe mou | « 1 retour sur 3 concerne le contenu. » | `src/contenu/projets/fr/uservoice.md:3`, `src/pages/projets/uservoice.astro:9` |
| 5 | « Un retour sur trois laissé dans le formulaire présent sur toutes les pages porte sur le contenu (de mars à septembre 2026). » | Sujet séparé du verbe par deux compléments, date en parenthèse finale | « De mars à septembre 2026, un retour sur trois laissé dans le formulaire du site concerne le contenu. » | `src/contenu/projets/fr/uservoice.md:40` |
| 6 | « Une plateforme EdTech reçoit des milliers de retours d'apprenants par an. Ils arrivent par quatre sources : » | Redit mot pour mot la synthèse du haut | « Les retours arrivent par quatre sources : » (la suite inchangée) | `src/contenu/projets/fr/uservoice.md:24` |
| 7 | « Je les ai fait converger vers une seule table, où chaque retour garde ses dimensions figées au moment où il est donné. Des mois plus tard, on le relit […] » | Verbe mou, terme technique (« dimensions figées »), deux « où » | « Je les ai réunis dans une seule table. Chaque retour y garde le contexte du jour où il a été donné, et se relit ainsi des mois plus tard. » | `src/contenu/projets/fr/uservoice.md:34` |
| 8 | « L'enquête NPS pointe dans la même direction par un autre chemin. Sur deux mois […] touche à la qualité du contenu (explications, qualité des exercices, traductions), et la moitié […] » | Tournure longue pour « confirme », parenthèse, 35 mots | « L'enquête NPS le confirme. Sur deux mois de l'été 2026, près d'un commentaire sur cinq touche aux explications, aux exercices ou aux traductions. La moitié sont des critiques ou des demandes. » | `src/contenu/projets/fr/uservoice.md:42` |
| 9 | « Chaque validation enrichit les exemples donnés à l'IA pour les passes suivantes, et des règles mécaniques prennent le relais sur les cas devenus évidents, comme […] » | 31 mots, précision inutile (« pour les passes suivantes ») | « Chaque validation enrichit les exemples donnés à l'IA. Des règles mécaniques prennent le relais sur les cas évidents, comme les réponses vides ou les doublons. » | `src/contenu/projets/fr/uservoice.md:50` |

### Audit contenu

| # | Extrait | Ce qui pèse | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 10 | « Sur ce premier parcours, 1 question sur 20 empêchait l'apprenant de répondre, et toutes ont été corrigées après relecture. » | Redit le fait affiché juste au-dessus | « Les corrections, relues avant d'être appliquées, sont en production depuis la semaine du 28 septembre 2026. » | `src/contenu/projets/fr/audit-contenu.md:7` |
| 11 | « La grille compte six critères. Deux portent sur la réponse. […] Ils vérifient aussi que ses éléments ne se contredisent pas. » | Sept phrases hachées, que « Pour aller plus loin » redit en entier | « La grille compte six critères. Deux portent sur la réponse : la réponse attendue est la bonne, et aucune autre ne se défend aussi bien. Un troisième vérifie que la question contient une explication, et qu'elle n'est pas circulaire. Les trois derniers portent sur la fidélité à la source, la langue et la cohérence. » | `src/contenu/projets/fr/audit-contenu.md:43-47` |
| 12 | « Les corrections retenues sortent en lots, prêts à relire, pour la préproduction. […] La décision reste donc humaine. […] Aucune correction ne part en ligne sans avoir été lue. » | La relecture dite quatre fois en six phrases | « L'outil n'écrit jamais directement en base. Il produit des lots de corrections, et une personne relit chacun avant la préproduction. Si un agent se trompe de réponse, le pire est un lot rejeté à la relecture. » | `src/contenu/projets/fr/audit-contenu.md:63-65` |
| 13 | « Le premier projet de ce portfolio, UserVoice, a rassemblé ce que […] disent d'elle. Dans le formulaire du site, 1 retour sur 3 porte sur le contenu. C'est donc là que leur satisfaction se joue d'abord. » | Le fait vient en deuxième ; la dernière phrase redit la synthèse ; verbe mou | « Dans le formulaire du site, 1 retour sur 3 concerne le contenu : c'est le constat du premier projet, UserVoice. » | `src/contenu/projets/fr/audit-contenu.md:35` |
| 14 | « Nous avons porté l'effort sur le contenu lui-même, question par question. […] La learning designer a validé la grille. Elle a aussi défini les règles d'écriture des contenus (sauts de ligne, règles éditoriales) et […] » | Ouverture que le titre dit déjà, cinq phrases courtes de même rythme, parenthèse | « J'ai mené ce chantier avec une learning designer. J'ai conçu la grille d'audit et l'outillage qui l'applique ; elle a validé la grille, défini les règles d'écriture des contenus et fait la recette des échantillons. » | `src/contenu/projets/fr/audit-contenu.md:37` |
| 15 | « Ce sont des sous-agents de Claude Code, sur abonnement, sans appel à une API payante. […] L'un d'eux vérifie par exemple que l'explication parle du même audio que la question. Un bilan donne enfin […] » | Six phrases ; l'exemple de l'audio est redit dans « Pour aller plus loin » | « Des agents IA appliquent la grille, question par question : des sous-agents de Claude Code, sur abonnement, sans API payante. Le modèle ne juge pas seul. Des contrôles automatiques, qui ne dépendent d'aucun modèle, passent sur tout le corpus. Un bilan donne l'état de chaque question et ce qui lui est reproché. » | `src/contenu/projets/fr/audit-contenu.md:51` |
| 16 | « De ce projet, j'ai tiré 25 règles pour mener un projet avec l'IA. Elles servent à garder la main […] Je les ai mesurées sur le projet lui-même […] Elles changent la façon de travailler. » | « projet » trois fois ; phrase générale sans fait | « Ce projet m'a laissé 25 règles pour garder la main sur ce qu'un agent produit. Je les ai mesurées en tokens sur quatre semaines et en points de décision tracés dans un registre. » ; supprimer « Elles changent la façon de travailler. » | `src/contenu/projets/fr/audit-contenu.md:71-73` |
| 17 | « Certaines règles tiennent en une ligne et ont coûté cher avant d'être écrites. Ouvrir le suivi de version dès le premier fichier en fait partie. » | « en fait partie » : le fait arrive en troisième phrase | « Certaines règles ont coûté cher avant d'être écrites. Sans suivi de version dès le premier fichier, deux semaines de travail sont restées hors historique. » | `src/contenu/projets/fr/audit-contenu.md:77` |

### À propos

| # | Extrait | Ce qui pèse | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 18 | « Je suis Head of Product chez […], une scale-up SaaS B2B […] en ligne, depuis 2024. J'y étais auparavant […] » | La date, que le recruteur cherche, est rejetée après l'apposition | « Depuis 2024, je suis Head of Product chez […], une scale-up SaaS B2B d'apprentissage des langues en ligne. J'y ai été Product Manager et Product Owner Data de 2022 à 2024. » (nom de l'employeur inchangé) | `src/pages/a-propos.astro:18-19` |
| 19 | « J'y mène une équipe […], de la discovery à la mise en production, et je pilote l'équipe qui transforme […] » | 30 mots, deux rôles dans une phrase | « J'y mène une équipe de Product Managers et de Product Designers, de la discovery à la mise en production. Je pilote aussi l'équipe qui transforme les retours des utilisateurs en corrections priorisées. » | `src/pages/a-propos.astro:22-23` |
| 20 | « L'IA fait partie de mes outils quand elle apporte quelque chose de concret : » | Tournure longue, « quelque chose de concret » vague | « J'utilise l'IA quand elle sert un besoin précis : classer des retours, auditer un contenu, prototyper une fonctionnalité. » | `src/pages/a-propos.astro:30-31` |

## EN

L'accueil anglais ne change pas (« is about » reste).

### UserVoice

| # | Extrait | Ce qui pèse | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 21 | « I brought them together in a single table, where AI classifies […], for a summary that takes five minutes to read every Monday. » | Voir n°2 | « I brought them together in a single table. AI classifies each piece of feedback with a confidence score and leaves the doubtful cases to a person. The summary takes five minutes to read, every Monday. » | `src/contenu/projets/en/uservoice.md:6` |
| 22 | « We thought it was mostly bugs; the data showed that one in three pieces of feedback is about the content, and […] » | Voir n°3 | « We thought it was mostly bugs. The data pointed to the content, and the effort moved to its quality. » | `src/contenu/projets/en/uservoice.md:7` |
| 23 | « One in three pieces of feedback left in the form available on every page is about the content (March to September 2026). » | Voir n°5 | « From March to September 2026, one in three pieces of feedback left in the site's form is about the content. » | `src/contenu/projets/en/uservoice.md:40` |
| 24 | « An EdTech platform receives thousands of pieces of learner feedback a year. They come from four sources: » | Voir n°6 | « Feedback comes from four sources: » (la suite inchangée) | `src/contenu/projets/en/uservoice.md:24` |
| 25 | « […] where each piece of feedback keeps its dimensions frozen as they were when it was submitted. Months later, it is read […] » | Voir n°7 | « I brought them into a single table. Each piece of feedback keeps the context of the day it was submitted, so it still reads that way months later. » | `src/contenu/projets/en/uservoice.md:34` |

### Content audit

| # | Extrait | Ce qui pèse | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 26 | « In that first course, 1 question in 20 stopped learners from answering, and all of them were fixed after review. » | Voir n°10 | « The fixes, reviewed before being applied, have been in production since the week of September 28, 2026. » | `src/contenu/projets/en/content-audit.md:7` |
| 27 | « The grid has six criteria. Two concern the answer. […] They also check that its parts do not contradict each other. » | Voir n°11 | « The grid has six criteria. Two concern the answer: the expected answer is the right one, and no other answer is as defensible. A third checks that the question includes an explanation, and that it is not circular. The last three cover faithfulness to the source, language and internal consistency. » | `src/contenu/projets/en/content-audit.md:43-47` |
| 28 | « The fixes we keep come out in batches […] So the decision stays with a person. […] No fix goes live without being read. » | Voir n°12 | « The tool never writes directly to the database. It produces batches of fixes, and a person reviews each one before staging. If an agent gets an answer wrong, the worst case is a batch rejected at review. » | `src/contenu/projets/en/content-audit.md:63-65` |
| 29 | « The first project in this portfolio, UserVoice, gathered […] So that is where their satisfaction is decided first. » | Voir n°13 | « In the site's feedback form, 1 in 3 pieces of feedback is about the content: that is what the first project, UserVoice, found. » | `src/contenu/projets/en/content-audit.md:35` |

### About

| # | Extrait | Ce qui pèse | Réécriture proposée | Fichier:ligne |
|---|---|---|---|---|
| 30 | « I have been Head of Product at […], a B2B SaaS scale-up in online language learning, since 2024. I was previously […] » | Voir n°18 | « Since 2024, I have been Head of Product at […], a B2B SaaS scale-up in online language learning. From 2022 to 2024, I was a Product Manager and Data Product Owner there. » | `src/pages/en/about.astro:18-19` |

## Hors relevé, à vérifier

UserVoice dit « Quand j'ai lancé UserVoice, en septembre 2026 » (`uservoice.md:26`)
mais cite des retours « de mars à septembre 2026 » et l'été 2026 ; Audit
contenu, qui part de ce constat, dure quatre semaines et passe en production
la semaine du 28 septembre 2026. La date de lancement est peut-être fausse.
