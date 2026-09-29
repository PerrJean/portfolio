# 0020 — Spec de l'étape 2 : la structure du site

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `arbitrage` | `structure` | 560 (l'étape entière) | — | — |

**Proposée le 2026-09-29, en attente du go de Jean.** Rien ne se code avant.

## Deux animations par parcelle (demande de Jean)

- **Par défaut : l'impatience.** Jouée **une fois** au chargement, puis une
  fois quand la parcelle entre à l'écran ; jamais en boucle (une animation
  de plus de 5 s sans bouton pause contrevient à WCAG 2.2.2). Deux gestes
  distincts : le sautillement (existant) et un second, à choisir.
- **Au survol ou au focus du lien projet : on regarde le plan.** Jean ouvre
  le plan, les deux mains libres le rejoignent, on se penche, le point ambre
  se pose sur le plan.

## Ce que l'étape 2 produit

Le vrai site Astro, dans la ligne retenue, **avec les textes des maquettes**
(les textes définitifs sont l'étape 3).

- **Socle** : les jetons de couleur (ivoire, encre, ambre, orange, ardoise)
  en variables CSS ; Atkinson Hyperlegible Next **hébergée sur le site** ;
  boutons carrés, point devant le libellé, survol du secondaire.
- **Pages** : accueil, gabarit de page projet, à propos ; chacune en FR
  (`/`) et en EN (`/en/`), bascule FR | EN qui mène à la jumelle.
- **Composants** : en-tête (logo-lunettes, Projets · À propos, FR | EN,
  LinkedIn) ; pied de page ; bouton ; soleil en anneaux ; parcelle ;
  personnage (une pose en paramètre, tirée de la bibliothèque `0018`) ; les
  deux animations de l'accueil ; bâtiment (un étage par H2, grue fixe,
  colonne 1 : 4 à droite, trois bonhommes qui tapent du marteau pendant la
  pose d'un étage) ; bloc « Pour aller plus loin » replié.
- **Contenus** : une collection `projets` (FR et EN) à schéma : titre, fait
  clé, synthèse en trois lignes, groupe (paire ou à part), projet suivant.

## Les tests (écrits par un autre sous-agent que le code)

1. Chaque page FR de `dist/` a sa jumelle EN, et la bascule y mène (C7).
2. Aucune ressource chargée depuis un autre domaine (C6) ; seuls les liens
   `<a>` sortants sont permis (LinkedIn).
3. Aucun terme interdit dans `dist/`, l'employeur seulement sous « À
   propos » (C1–C4), par le vérificateur du hook.
4. Chaque animation a sa règle `prefers-reduced-motion`.
5. Aucun lien interne cassé.
6. Les paires de couleurs texte / fond passent 4,5:1.

Les tests tournent dans le hook de pre-commit.

## Le découpage en chantiers

| Chantier | Contenu | Coût estimé |
|---|---|---|
| 2a | Les six tests, rouges | 60 k |
| 2b | Socle : jetons, police, gabarit, en-tête, pied, i18n, bouton | 120 k |
| 2c | Personnages en composants, soleil, parcelle, les deux animations | 150 k |
| 2d | Page projet : synthèse, bâtiment sur les H2, grue, marteaux, repli | 150 k |
| 2e | À propos, jumelles EN, revue en contexte neuf | 80 k |

Estimations recalées sur les dépassements de `0017` et `0019` : une scène
animée ne s'estime plus sous 100 k.

## Réponses de Jean (2026-09-29)

1. Second geste d'impatience : **il fait tourner son marteau** (pivot déjà
   dans la bibliothèque, aucune pose nouvelle).
2. Adresses : **`/projets/<slug>/` en FR, `/en/projects/<slug>/` en EN**.
3. Hébergement : **GitHub Pages**, domaine personnel à choisir.
4. Police : **paquet npm** `@fontsource/atkinson-hyperlegible-next`
   (existence vérifiée sur le registre npm).

**Dépôt public** (GitHub Pages gratuit l'exige) : le registre, la spec et les
briefs seront lisibles. Le vérificateur ne les exempte plus ; les effectifs
internes ont été retirés du registre. Avant le premier envoi, l'historique
local, qui les contient encore, sera réécrit (auteur et contenu).

**Langue (2026-09-29)** : `/en/` gardé (pas de serveur sur GitHub Pages, un
lien par langue, indexation des deux versions, aucun cookie). **Pas de
bandeau « Read in English »**, aucune détection de la langue du navigateur.

**Ajouts proposés à la spec, en attente de Jean** : téléphone (menu replié,
bâtiment en indicateur de lecture, animations à l'entrée dans l'écran) ;
accessibilité (focus visible, lien d'évitement, illustrations décoratives
masquées, `lang` par page) ; référencement et partage (titre et description
par page, `hreflang`, plan du site, favicon, aperçu LinkedIn) ; budget de
poids ; cadres de capture réservés ; revue en contexte neuf et preuve à
chaque chantier ; tests sur le lanceur de Node ; remplacement du brouillon
du 7 septembre. Manque : l'adresse du profil LinkedIn.

## Go de Jean (2026-09-29)

**Go pour l'étape 2**, ajouts compris. LinkedIn :
`https://www.linkedin.com/in/jean-perrier-b01b3281/`. Les animations de
l'accueil avancent **en parallèle** des tests.

**Jetons de couleur** (noms fixés pour tous les chantiers, dans
`src/styles/jetons.css`) : `--ivoire` #FEFAF2, `--encre` #2A1F1A, `--ambre`
#F2A33A, `--orange` #B54E19, `--ardoise` #5E7488, `--texte-sur-orange`
#FFFCF8.

**Adresses** : `/` ↔ `/en/` ; `/projets/uservoice/` ↔
`/en/projects/uservoice/` ; `/projets/audit-contenu/` ↔
`/en/projects/content-audit/` ; `/a-propos/` ↔ `/en/about/`. Une page de
laboratoire `/labo/…` (non indexée, hors plan du site) sert aux essais ; les
tests l'ignorent.

**Qui écrit quoi** : `tests/` au chantier 2a ; `src/components/scene/` et
`src/pages/labo/` au chantier des animations ; le reste de `src/` aux
chantiers 2b, 2d, 2e. Les sous-agents ne commitent pas : la session relit,
exige la preuve, puis commite.
