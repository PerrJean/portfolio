# 0116 — La matrice de compétences racontée comme un accompagnement

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `contenu` | `clos 2026-11-09` | 120 | 229 | `claude-opus-5-5` |

**Demande de Jean (2026-11-09)**, sur le retour d'une relectrice extérieure :
aborder le projet 06 « plutôt comme du mentorat, de l'accompagnement d'un
membre d'équipe dans son évolution pro, que la relecture pure d'un
document », pour mettre en avant les compétences managériales.

**Constat** : le titre va déjà dans ce sens (« faire grandir un Product
Manager »), mais le fait clé (« En relisant ensemble une matrice de
compétences… ») et l'action de la synthèse portent sur l'outil, pas sur
l'accompagnement. Tags : « Management, Leadership ». La scène de l'échelle
(Jean montre le barreau suivant, 0062) colle déjà au mentorat.

**Périmètre** :
1. Lecture seule du fichier Drive de la grille relue avec le PM (janvier
   2026) : relever les points de divergence de perception entre Jean et le
   PM. **Ce relevé reste hors du dépôt** : il porte l'évaluation d'une
   personne (C3, 0059). Seule sa forme générale peut nourrir la page.
2. Questionnaire avec Jean : faits d'accompagnement à publier (suivi après
   l'entretien, rythme, ce qui a bougé), angle, tags, lien avec 0004.
3. Réécriture de la page 06 FR puis EN : fait clé, synthèse, H2, tags,
   carte de l'accueil (`src/contenu/projets.ts`).
4. Relevé des lourdeurs par un agent qui ne l'a pas écrite (0072).

**Règles** : aucun prénom, aucun niveau attribué à la personne, jamais
l'évaluation (0059). L'employeur n'est pas nommé (C1).

**Lien** : 0117 retouche aussi la synthèse de cette page ; 0116 passe avant.

## Relevé des divergences (étape 1, 2026-11-09)

Rendu à Jean dans la conversation seulement (C3, 0059). Pour mémoire, sans
contenu : la grille de janvier ne garde que le résultat consolidé de
l'entretien, pas la position de départ du PM ; Jean l'a complétée de vive
voix.

## Tranché

- 2026-11-09, Jean : avant l'entretien, le PM se voyait déjà senior ; l'écart
  portait sur un niveau entier.
- 2026-11-09, Jean : suivi après l'entretien, un point mensuel de suivi des
  OKR, dont un OKR de développement personnel.
- 2026-11-09, Jean : ce qui a bougé depuis, il porte un sujet d'IA appliquée
  et va davantage au contact du métier.
- 2026-11-09, Jean : une seule personne accompagnée ainsi ; la réutilisation
  reste au conditionnel.
- 2026-11-09, Jean : angle « récit d'accompagnement » ; la matrice devient
  l'outil, son détail reste dans « Pour aller plus loin ».
- 2026-11-09, Jean : l'écart se dit avec son sens (« il se voyait plus
  avancé que ce que la grille a montré »), jamais sa nature ni les
  compétences en cause, jamais un niveau.
- 2026-11-09, Jean : tags « Management d'équipe · Mentorat » /
  « Team management · Mentoring ».
- 2026-11-09, Jean : une ligne dans 0004 ; l'accompagnement individuel est
  porté par la page 06, l'acte III reste ouvert pour l'acculturation IA.
- 2026-11-09, Jean : le sujet d'IA qu'il porte est le projet 01, Mises en
  situation orales ; la page 06 le cite et y renvoie par un lien.
- 2026-11-09, Jean : go sur la spec ci-dessous ; `npm ci` autorisé dans le
  worktree du chantier.
- 2026-11-09, Jean, tri du relevé : l'axe 1 se dit sans jugement (« le
  rapproche des utilisateurs et du métier ») ; « ce qui a bougé » devient le
  fait daté de la page 01 (de février à avril 2026, il a mené avec la Product
  Designer les entretiens et l'enquête clients), au lieu de « il porte
  aujourd'hui » et de « va davantage au contact du métier » ; tout le reste
  du relevé appliqué, six H2 gardés, trous laissés sans rien inventer.
- 2026-11-09, Jean : le « Product Manager junior » de la page Fusion (FR et
  EN) est la même personne : « junior » retiré, pour qu'aucun niveau ne se
  déduise en croisant les pages (0059).

## Spec

Fichiers : `src/contenu/projets/fr/matrice-competences.md`,
`src/contenu/projets/en/skills-matrix.md`, `src/contenu/projets.ts` (fait et
tags de la carte 06 seulement), `registre/0004-acte-iii-leadership.md`.
Hors périmètre : `src/layouts/Projet.astro` (0117), le nom de la carte
(« Matrice de compétences » / « Skills matrix », tenu par les tests), la
scène, les images, le PDF, le bloc « Pour aller plus loin ».

1. **Fait clé** (page et carte, identiques) : il raconte l'accompagnement,
   plus la relecture d'un document. Il dit l'écart (il se voyait plus avancé)
   et ce que j'ai fait.
2. **Synthèse** : point de départ, l'écart et l'absence de critères communs ;
   action, la grille comme outil commun, relue avec lui, l'entretien, puis
   les deux axes devenus des OKR suivis chaque mois, dont un de
   développement personnel ; impact, il porte un sujet d'IA appliquée et va
   davantage au contact du métier ; le sujet d'IA est le projet 01, cité avec
   un lien (`/projets/mises-en-situation/`, EN
   `/en/projects/speaking-practice/`), sans date de début. Les clés `probleme`, `action`,
   `resultat` ne changent pas (0117 les retitre).
3. **Cadre** : durée « Depuis décembre 2025 » (suivi en cours).
4. **H2 dans l'ordre du récit** : un écart à nommer ; un cadre pour en
   parler (avec l'extrait en image) ; l'entretien pour se situer ensemble ;
   un suivi chaque mois ; ce qui a bougé ; ce que j'en retiens (trois
   enseignements de manager).
5. **Tags** : ceux du tranché, FR et EN.
6. **Règles** : aucun prénom, aucun niveau attribué, aucune compétence
   nommée comme faible ; les deux axes du plan restent les seuls points
   publiés de l'échange (0059) ; employeur jamais nommé (C1).
7. **EN** en miroir, même structure.
8. **Relevé des lourdeurs** par un agent qui n'a pas écrit (0072), trié par
   Jean ; build et tests verts.

## Clôture (2026-11-09)

- **État de référence** : build et suite complète verts au premier point
  d'étape (`135dfff`, hook bloquant, branche hors `chantier/*`).
- **Rédaction** (sous-agent, brief `prompts/9-matrice-mentorat.md`) : 124.
  **Relevé des lourdeurs** (sous-agent neuf, brief
  `prompts/9-releve-matrice-mentorat.md`) : 105, 25 lignes, triées par Jean.
  Les corrections du tri sont faites en session principale (petite
  correction, non comptée). Coût relevé au harnais : 124 + 105 = 229.
- **Hors spec, validé par Jean** : page Fusion FR et EN (« junior » retiré) ;
  descriptions des deux pages (`src/pages/…/matrice-competences.astro`,
  `skills-matrix.astro`) alignées sur l'accompagnement ; « ROI » remplacé
  par « rentabilité » dans « Pour aller plus loin ».
  `redaction/lexique.md` : « Matrice » ajoutée aux pages de « Product
  Designer », que la page cite désormais (le test des infobulles l'exigeait).
- **Restent ouverts, sans rien inventer** : un geste concret de Jean pendant
  l'entretien, ce qu'on regarde au point mensuel (signalés par le relevé).
- Aucune remontée ; un tour de relevé.
