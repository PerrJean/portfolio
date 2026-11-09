# 0115 — La phrase d'accroche : dire ce que Jean apporte, pas seulement comment il travaille

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `contenu` | `clos 2026-11-09` | 100 | 462 | `claude-opus-5-5` |

**Demande de Jean (2026-11-09)**, sur le retour d'une proche : la phrase
« ne me valorise pas suffisamment », elle est « trop terre à terre » et
« pas assez prise de hauteur ».

**Constat** : la phrase de l'accueil (`src/pages/index.astro`, reprise dans
`src/layouts/Base.astro`) est « J'écoute, je pose des hypothèses, je teste
et je construis là où ça compte. » (EN « I listen, I form hypotheses, I test
and I build where it counts. »), issue de 0045. Elle décrit une méthode en
quatre verbes ; elle ne dit ni le niveau (Head of Product, CPO) ni ce que
l'entreprise y gagne. À confirmer avec Jean : c'est bien cette phrase que
visait le retour.

**Périmètre** :
1. Questionnaire avec Jean (séries de 4 questions à options, une
   recommandation) : ce que la phrase doit porter, ton, longueur, place de la
   méthode actuelle (gardée en sous-titre ou abandonnée). Spec consolidée,
   puis go.
2. Remplacement partout où vit la phrase : accueil, À propos, `<head>`,
   texte alternatif et images Open Graph, bannières LinkedIn, FR et EN.
3. Relevé des lourdeurs par un agent qui ne l'a pas écrite (0072), Jean trie.

**Risque connu** : la longueur de la phrase a coûté une passe d'images en
0045 (bannière coupée à la main, titre qui touchait le dessin à 1280 px).
Vérifier à 960, 1280 et 1440 px.

## Tranché

- 2026-11-09, Jean : le retour visait bien le titre de l'accueil.
- 2026-11-09, Jean : la phrase dit le gain pour l'entreprise ; ton sobre ou
  visionnaire ; 8 à 12 mots.
- 2026-11-09, Jean : la méthode quitte l'accueil et va dans « À propos »,
  devant la phrase sur l'IA (FR et EN).
- 2026-11-09, Jean : `npm ci` dans le worktree (aucune copie du dossier
  principal).
- 2026-11-09, Jean : après lecture d'accroches de Heads of Product et de CPO
  (l'arbitrage est un vocabulaire de CPO ; « impact » ne distingue plus
  personne), la phrase est « Je concentre l'effort là où il rapporte le
  plus. » (EN « I focus effort where it pays off most. »). Écartées en
  chemin : « la raison pour laquelle les clients restent » (présomptueux sans
  projet qui le prouve), « l'effort de l'équipe là où il rapporte » (lourd),
  « maximiser l'impact » (ton de consultant).

- 2026-11-09, Jean : go sur la spec ci-dessous.
- 2026-11-09, Jean, après le code : « là où » lié par une insécable dans le
  titre FR (sinon « là / où » à 1280 et 1440 px) ; bannière LinkedIn FR coupée
  à la main après « l'effort » ; le vide d'une ligne sous le titre entre 960
  et 1279 px est gardé (réserve de 3 lignes de 960 à 1279 px, 2 au-delà :
  l'équipe reste à 18 px au moins du soleil, à la même place en FR et en EN).

## Spec

1. **Accueil** (`src/pages/index.astro`, `src/pages/en/index.astro`) : le
   `<h1>` devient « Je concentre l’effort là où il rapporte le plus. » / « I
   focus effort where it pays off most. ». La ligne de rôle, le sous-titre et
   le lien « Mon métier » ne changent pas.
2. **À propos** (`src/pages/a-propos.astro`, `src/pages/en/about.astro`) : le
   paragraphe sur l'IA s'ouvre sur « J’écoute, je pose des hypothèses, je
   teste et je construis là où ça compte. » / « I listen, I form hypotheses,
   I test and I build where it counts. ». `redaction/a-propos.fr.md` la porte
   déjà à cette place.
3. **`<head>`** (`src/layouts/Base.astro`) : `APERCU_ALT` FR et EN reprennent
   la nouvelle phrase.
4. **Images** (`ops/images/apercu.mjs`) : aperçus Open Graph FR et EN et
   bannières LinkedIn FR et EN (1x, 2x) régénérés sur la nouvelle phrase ;
   coupure à la main retirée si elle n'a plus lieu d'être.
5. **Mise en page** : la phrase tient en deux ou trois lignes ; la réserve de
   quatre lignes du titre (`base.css`, à partir de 960 px) se revoit pour que
   l'équipe se pose sur la dernière ligne sans trou. Vérifié à 960, 1280 et
   1440 px, FR et EN.
6. **Hors périmètre** : `ops/images/accueil/planche.mjs`, outil de maquette
   non joué, dont le sous-titre est déjà périmé.

**Critères vérifiables (tests)** : le `<h1>` des deux accueils porte la
nouvelle phrase ; l'ancienne phrase n'apparaît plus sur les accueils ni dans
`og:image:alt` ; les deux pages À propos portent la méthode ; `og:image:alt`
porte la nouvelle phrase.

**État de référence** (2026-11-09, worktree, `npx astro build --outDir
.dist-ref` puis `DIST=.dist-ref npm test`) : build OK, 246 tests, 246 au
vert, 0 rouge.

## Tri du relevé des lourdeurs (Jean, 2026-11-09)

Relevé par un agent qui n'a pas écrit la phrase (0072), 13 remarques, triées
en trois séries avant / après :
- À propos, méthode : « J’écoute, je pose des hypothèses, je teste, puis je
  construis. » / « I listen, form hypotheses, test, then build. » (plus
  d'écho avec « là où il rapporte le plus », un seul « I »).
- Titre EN : « I focus my effort where it pays off most. » ; « l’effort »
  gardé en FR.
- Images FR à l'apostrophe courbe ; aperçu FR coupé « Je concentre /
  l’effort là où / il rapporte le plus. », EN en miroir ; bannières coupées
  après « effort ».
- Texte alternatif : « Un bâtiment et sa grue, deux personnages sur le toit,
  sous le soleil. » / « A building and its crane, two people on the roof,
  with the sun behind. »
- Traités ici, à la demande de Jean, bien qu'antérieurs : « je dirige »
  partout (accueil compris) ; l'équipe « que je vois chacun en entretien
  individuel toutes les semaines » / « whom I meet one-to-one every week » ;
  les services publics avec un verbe et une explication chacun, FR et EN ;
  EN « I use AI when it meets a specific need ».

## Clôture

**Coût réel** : 462 (milliers de tokens), somme des quatre sous-agents relevés
au harnais : tests 102 (trois tours), code 146, revue 108, relevé 107. La
session principale (questionnaire, recherche sur les accroches de Heads of
Product et de CPO, petites corrections après tri) n'est pas mesurable.
Ratio 4,6 : six séries de questions pour la phrase, une recherche demandée
en cours de route, et un tri qui a élargi le chantier à toute la page
À propos.

**Revue** : un tour, PASSE ; cinq cassures, une seule invisible (l'insécable
de « là où »), couverte depuis par un test. Aucune remontée.

**Vérification** : `npx astro build --outDir .dist-v` puis `DIST=.dist-v npm
test` : 256 tests, 256 au vert (246 de référence + 10 dans
`tests/accroche.test.mjs`). Accroche mesurée et capturée à 960, 1280 et
1440 px, FR et EN : 3 lignes à 960 px, 2 au-delà, l'équipe posée sur la
dernière ligne, rien ne touche le soleil. Réserve de hauteur : 3 lignes de
960 à 1279 px, 2 à partir de 1280 px.

**Hors périmètre, laissé** : `ops/images/accueil/planche.mjs` (outil de
maquette, phrase et sous-titre périmés) ; `redaction/a-propos.fr.md`, le
brouillon d'origine, ne suit plus la page publiée.
