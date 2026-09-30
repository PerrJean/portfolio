# Brief — impact business, cohérence d'Audit contenu, bruit technique (registre/0052)

Le portfolio de Jean (Astro, FR puis EN en miroir) a été relu par un agent en
contexte neuf et par un recruteur. Jean a tranché ; tu appliques. Deux
fichiers à lire d'abord : `redaction/revue-complete.md` (les constats, avec
fichier:ligne) et `C:\Users\Jean PERRIER\.claude\skills\ligne-editoriale\SKILL.md`.
Les textes vivent dans `src/contenu/projets/{fr,en}/*.md`, le schéma dans
`src/components/schemas/chaine-audit.mjs`, la référence dans
`redaction/*.fr.md` (à aligner).

## 1. Un H2 « Bénéfices et impact business » dans chaque projet

EN : « Benefits and business impact ». Placé juste avant « Ce que j'en
retiens » (ou avant la dernière section si le projet n'en a pas). Trois à
cinq phrases, d'abord les bénéfices d'usage, puis l'enjeu business mis en
avant. Faits disponibles, rien d'autre :

- **Le client B2B** (commun aux deux projets, dit une fois en détail dans
  Audit contenu, rappelé d'une phrase dans UserVoice) : au bilan annuel, un
  client B2B, une école, demandait trois choses : une analyse exhaustive de
  ses contenus, un processus formalisé pour corriger les erreurs, et la fin
  des QCM où plusieurs réponses se défendent. En recoupant ses remontées avec
  les retours des apprenants B2B2C, on retrouvait le même point de douleur.
- **UserVoice** : c'est l'écoute des apprenants qui a objectivé ce point de
  douleur et fait passer la qualité du contenu en tête des priorités ; le
  bilan se lit en cinq minutes chaque lundi ; la file de validation humaine a
  fondu de 87 % en trois jours (déjà dans la page : ne le redis pas deux fois,
  déplace-le si c'est plus juste ici).
- **Audit contenu** : l'audit répond point par point à la demande du client
  (la grille pour l'analyse exhaustive, les lots relus pour le processus, le
  critère « une seule réponse défendable » pour les QCM contestés) ; c'est un
  levier direct pour **réduire le risque de churn** de ce client, et la même
  méthode s'applique aux parcours suivants.

Aucun nom de client, d'école, de certification, de langue, d'employeur ;
aucun chiffre absolu. Ne dis jamais que le client était mécontent : le
constat est un levier (C8). Pas de nouveau fait au-delà de cette liste.

## 2. Audit contenu : les contrôles et la relecture, décrits une seule fois, justes

- **Contrôles** : un **contrôle déterministe**, puis un **contrôle par IA**, de
  la cohérence entre l'audio (via son transcript), les supports texte et
  image, la question, les réponses et l'explication. Retire « qui ne
  dépendent d'aucun modèle ». Dans le schéma, le cadre « Contrôles
  automatiques » dit cela ; « la réponse attendue est-elle la bonne ?
  l'explication existe-t-elle ? est-elle circulaire ? » passent dans le cadre
  des agents IA (la grille). Même chose dans le corps et dans « Pour aller
  plus loin » (section « Les contrôles automatiques » : audio / supports /
  question / réponses / explication ; retire « mise en forme » et « langue »).
- **Relecture humaine** : **par échantillon** : la learning designer relit,
  famille par famille, les cas les moins fiables, et sa décision vaut pour
  toute la famille. Sur le premier parcours, elle a aussi fait la recette en
  préproduction. Plus de « chaque lot est relu », plus de « Jean et la
  learning designer » : dans le schéma, l'étape humaine dit « La learning
  designer relit un échantillon par famille de défauts » (EN : « The learning
  designer reviews a sample from each family of defects »). Vérifie que « le
  pire est un lot rejeté à la relecture » reste vrai ; sinon, reformule.

## 3. Le reste des constats de la revue

- Fait clé UserVoice (en-tête, accueil `src/contenu/projets.ts`, description
  de la page) : « 1 retour sur 3 laissé sur le site concerne le contenu. » ;
  EN « 1 in 3 pieces of feedback left on the site is about the content. ».
- Retire de l'anglais les phrases sans jumelle FR : « We put the effort into
  the content itself, question by question. », « (line breaks, editorial
  rules) », « They change how the work gets done. », « I measured them on
  the project itself » (et ce qu'elle porte de tokens). Vérifie ensuite que FR
  et EN ont les mêmes phrases, section par section, « Pour aller plus loin »
  compris (même nombre de points).
- **Bruit technique** : retire tokens, nombres de lignes de modules,
  « sous-agents de Claude Code, sur abonnement, sans API payante » (garde
  « des agents IA encadrés »), les pièges de tableur trop techniques. **Garde
  l'apprentissage** : dans « Ce que j'en retiens », Jean apprend à vibe coder
  efficacement, il est en chemin, et nomme les bonnes pratiques qui marchent
  (chiffrer chaque chantier avant et après, une règle vérifiable devient un
  test, le relecteur n'est pas l'auteur, le suivi de version dès le premier
  fichier). **Sans le nombre de règles.**
- Chiffres absolus qui décrivent la plateforme (C2) : « six parcours » →
  « plusieurs parcours » ; « parmi 35 », « parmi 29 » → « une trentaine ».
- Redites signalées (synthèse recopiée dans le corps, « 1 question sur 20 »
  répété) : une seule occurrence par idée dans le corps, hors fait clé.
- Apostrophes : typographiques (’) partout dans le texte visible, FR et EN,
  de façon homogène (pas dans le code ni les attributs techniques).
- Texte alternatif du baromètre NPS : ajouter « (données synthétiques) ».

## Ce que tu ne touches pas

Les tests, `src/components/batiment/`, `src/layouts/`, `public/`,
`src/i18n/publication.ts`, les captures. Un autre chantier travaille en
parallèle sur `src/pages/labo/`, une page 404 et `ops/images/` : n'y touche
pas.

## La preuve attendue

`npx astro build --force --outDir .dist-0052` puis `DIST=.dist-0052 npm test`
(`fail 0`) ; le nouveau H2 dans les quatre pages projet ; grep à zéro dans
le HTML construit : « tokens », « abonnement », « sans API », « aucun
modèle », « Jean et la », « parmi 35 », « six parcours » ; un tableau
section par section FR / EN (nombre de phrases, nombre de points) ; le texte
des deux nouvelles sections en FR. Supprime `.dist-0052`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
