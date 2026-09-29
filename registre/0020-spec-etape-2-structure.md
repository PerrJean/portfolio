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

## Questions ouvertes pour le go

1. Le second geste d'impatience.
2. Les adresses : `/projets/uservoice/` et `/en/projects/uservoice/` ?
3. L'hébergement cible (GitHub Pages avec domaine perso, ou Netlify) : il
   fixe la base des URL.
4. La police : l'installer par le paquet npm (`@fontsource`) ou déposer les
   fichiers `.woff2` dans le dépôt ; les deux demandent un téléchargement,
   soumis à l'accord de Jean.
