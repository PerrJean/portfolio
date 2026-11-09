# 0117 — Rendre visible « point de départ → ce que j'ai fait → impact » sur chaque projet

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `structure` | `ouvert` | 200 | | `claude-opus-5-5` |

**Demande de Jean (2026-11-09)**, sur le retour d'une relectrice extérieure :
rendre le flux « problème, solution, résultat ou impact » beaucoup plus
explicite sur chaque projet ; l'information est là, mais implicite, alors
qu'un lecteur pressé ne cherche que ça.

**Constat** : chaque page projet porte déjà trois phrases `probleme`,
`action`, `resultat` (`src/content.config.ts`), affichées l'une sous
l'autre **sans titre** (`src/layouts/Projet.astro`, bloc
`synthese__phrases`). Les cartes de l'accueil n'affichent que le fait clé.
Certains résultats disent un impact mesurable (Fusion), d'autres une issue
qualitative (Matrice).

**Périmètre** :
1. Questionnaire avec Jean : les libellés (un « Problème » risque de lire le
   constat comme un défaut de l'employeur, C8 ; pistes : « Le point de
   départ », « L'enjeu »), la forme (étiquettes, trois colonnes, frise), la
   place sur l'accueil (cartes inchangées ou trois temps).
2. Gabarit : les trois temps titrés dans `Projet.astro`, FR et EN, test qui
   vérifie leur présence sur les 7 pages.
3. Relecture des sept `resultat` pour qu'ils disent un impact, relatif ou en
   ordre de grandeur (C2), FR et EN.
4. Relevé des lourdeurs par un agent qui ne l'a pas écrit (0072), Jean trie.

**Ordre** : la page Matrice se traite après la clôture de 0116.

## Tranché

- 2026-11-09, Jean : libellés **« Point de départ » / « Ce que j'ai fait » /
  « L'impact »** (EN « Starting point » / « What I did » / « Impact »).
- 2026-11-09, Jean : forme **étiquettes empilées**, un petit titre au-dessus
  de chaque phrase, les trois l'une sous l'autre, à 375 comme à 1280 px.
- 2026-11-09, Jean : **cartes de l'accueil inchangées** ; les trois temps
  vivent sur la page projet.
- 2026-11-09, Jean : les résultats sont réécrits pour **ouvrir sur l'effet
  concret**, relatif ou en ordre de grandeur (C2), avec les **seuls chiffres
  déjà publiés** sur le site ; aucun chiffre nouveau.
- 2026-11-09, Jean : **maquette validée telle quelle** (Fusion, 1280 px FR
  et 375 px EN) : titre en capitales espacées, gras, encre, au-dessus de
  chaque phrase ; filet gris à gauche comme l'encadré ; liste de
  définitions, jamais de H2.
- 2026-11-09, Jean : les deux actions qui ouvrent sur « nous » (Mises en
  situation, Audit contenu) sont **retouchées pour ouvrir sur « je »**,
  proposées en avant / après avec les résultats.
- 2026-11-09, Jean : le worktree s'équipe par `npm ci`.
- 2026-11-09, Jean : l'impact de la fusion des plateformes dit aussi
  qu'**une plateforme de moins est à maintenir**.

## Spec

Le gabarit (`src/layouts/Projet.astro`, `src/i18n/textes.ts`) :

1. Le bloc `synthese__phrases` devient une liste de définitions
   `<dl class="synthese__temps">` : trois `<div>`, chacun un `<dt>` (le
   titre) et un `<dd>` (la phrase), dans l'ordre `probleme`, `action`,
   `resultat` du schéma, qui ne change pas.
2. Les titres viennent de `UI[langue].temps` (`depart`, `action`,
   `impact`) : FR « Point de départ », « Ce que j’ai fait », « L’impact » ;
   EN « Starting point », « What I did », « Impact ». Le texte du HTML
   garde cette casse ; les capitales viennent du CSS.
3. Le style suit la maquette validée : `dt` en capitales espacées
   (`text-transform: uppercase`, `letter-spacing` ~0,04em), gras, encre ;
   `dd` sans marge, à la taille des phrases d'aujourd'hui (19 px, 20 px à
   partir de 1280 px) ; un filet de 3 px `--dalle` à gauche, comme
   `synthese__cadre`. Identique à 375 et à 1280 px.
4. Aucun H2 ajouté (le bâtiment compte les H2) ; le bloc reste dans
   `Infobulles`. Les cartes de l'accueil ne changent pas.

Critères d'acceptation, vérifiés par un test sur `dist/` :

- A. Sur les 14 pages projet (7 FR, 7 EN), la synthèse porte exactement un
  `dl.synthese__temps`, avec trois `dt` dans l'ordre et les libellés de sa
  langue, chacun suivi d'un `dd` non vide.
- B. Le `dd` de chaque temps est la phrase de l'en-tête Markdown
  correspondant (`probleme`, `action`, `resultat`).
- C. Plus aucun `synthese__phrases` dans `dist/`.
- D. Les tests existants restent verts (contraste, H2, jumelles).

Le contenu (après le gabarit) : les `resultat` de six pages ouvrent sur
l'effet (C2, chiffres déjà publiés seulement), les `action` de Mises en
situation et Audit contenu sur « je » ; FR et EN ; avant / après trié par
Jean. La Matrice attend la fusion de 0116.
- 2026-11-09, Jean : **go sur la spec**.

## État de référence

2026-11-09, worktree `chantier-0117-impact-1d2082` équipé par `npm ci`,
avant tout changement : `npx astro build --outDir .dist-ref` (21 pages)
puis `DIST=.dist-ref npm test` → `tests 246 | pass 246 | fail 0`.
