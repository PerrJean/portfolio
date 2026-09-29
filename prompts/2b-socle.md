# Brief — chantier 2b : le socle du site (registre/0026)

Tu construis le socle commun du portfolio, sur Astro, là où se trouve encore
un brouillon du 7 septembre à remplacer. Les tests existent déjà dans
`tests/` (ce n'est pas toi qui les as écrits) : ils sont ton critère de
« fini ». Tu **ne modifies pas** leur logique ; tu retires seulement l'option
`todo` des tests que ton travail fait passer.

## Ce qui est fixé

- **Couleurs**, dans `src/styles/jetons.css`, en variables CSS sur `:root`,
  **en hexadécimal** (les tests les lisent) : `--ivoire: #FEFAF2`,
  `--encre: #2A1F1A`, `--ambre: #F2A33A`, `--orange: #B54E19`,
  `--ardoise: #5E7488`, `--texte-sur-orange: #FFFCF8`, `--dalle: #D9D4CC`.
  L'ivoire est le fond de toutes les pages. Chaque couleur n'a qu'un sens :
  l'encre pour le texte, l'ambre pour la lumière (jamais de texte), l'orange
  pour l'action (boutons, liens, et les lunettes de Jean), l'ardoise pour
  l'information.
- **Police unique** : Atkinson Hyperlegible Next, **installée par npm**
  (`@fontsource/atkinson-hyperlegible-next`, graisses 400, 700 et 800,
  sous-ensemble latin), servie par le site. **Aucune** requête vers Google
  Fonts ou un autre domaine : retire celles du brouillon.
- **Adresses et jumelles** (i18n d'Astro : français par défaut, sans préfixe ;
  anglais sous `/en/`) :

  | FR | EN |
  |---|---|
  | `/` | `/en/` |
  | `/projets/uservoice/` | `/en/projects/uservoice/` |
  | `/projets/audit-contenu/` | `/en/projects/content-audit/` |
  | `/a-propos/` | `/en/about/` |

  Une seule table de correspondance dans `src/i18n/`, dont dérivent la
  bascule, les `hreflang` et les liens.
- **Domaine** : `site: 'https://jeanperrier.pm'` (déjà dans
  `astro.config.mjs`), `public/CNAME` déjà présent.
- **LinkedIn** : `https://www.linkedin.com/in/jean-perrier-b01b3281/`.

## Ce que tu construis

1. **Un gabarit commun** (`src/layouts/`) :
   - `<html lang>` selon la langue ; `<title>` et `<meta name="description">`
     par page ; `<link rel="canonical">` ; `<link rel="alternate"
     hreflang="fr|en|x-default">` (x-default vers le français) ; balises Open
     Graph de base (titre, description, `og:locale`, `og:url` ; l'image
     viendra plus tard) ;
   - un **lien d'évitement** « Aller au contenu » (`href="#contenu"`),
     visible au focus, et `<main id="contenu">` ;
   - un **focus clavier visible** partout (contour orange ou encre, net).
2. **L'en-tête** : à gauche, le **logo-lunettes** (une paire de lunettes
   rondes orange, dessinée en SVG, lien vers l'accueil de la langue), puis
   « Jean Perrier » ; au centre ou à droite, **Projets** (vers la section des
   projets de l'accueil) et **À propos** ; la bascule **FR | EN** (deux liens,
   la langue courante marquée `aria-current`, l'autre portant `hreflang` et
   menant à la jumelle exacte) ; un bouton **LinkedIn**. Au téléphone
   (moins de 720 px), la navigation se replie sous un vrai `<button>` menu
   (`aria-expanded`), sans bibliothèque.
3. **Le pied de page** : © 2026 Jean Perrier · LinkedIn · FR | EN.
4. **Le bouton** (`src/components/Bouton.astro`), trois variantes, **angles
   droits** :
   - principal : fond orange, texte `--texte-sur-orange` ;
   - secondaire : contour orange 1,5 px, texte orange ; au survol, le
     contour s'épaissit vers l'intérieur à 3 px et le fond se teinte à peine ;
   - tertiaire : un lien orange.
   Le **point ambre** (8 px) se place **devant** le libellé : en permanence
   sur le tertiaire ; au survol et au focus seulement sur le principal et le
   secondaire, dans un espace **déjà réservé** (le libellé ne bouge pas).
5. **Les huit pages**, en squelette : chacune a un seul `<h1>`, sa
   description, et un court texte provisoire repris de la ligne validée :
   - accueil : « Je bâtis sur des hypothèses : j'écoute, je teste, puis je
     dose l'effort. » (EN : « I build on hypotheses: I listen, I test, then I
     size the effort. ») et une section `id="projets"` avec deux liens vers
     les projets (01 UserVoice, « 1 retour sur 3 porte sur le contenu. » ;
     02 Audit contenu, « Sur le premier parcours audité, 1 question sur 20
     empêchait l'apprenant de répondre. Toutes ont été corrigées. ») ;
   - pages projet : le titre et le fait clé ;
   - à propos : un titre et `[À COMPLÉTER]`.
   Les versions EN reprennent la même structure, texte provisoire en
   anglais. La scène animée et le bâtiment n'y entrent pas encore (chantiers
   2c et 2d) ; ne touche pas à `src/components/scene/` ni à `src/pages/labo/`.
6. **Le référencement de base** : `@astrojs/sitemap` (installé par npm),
   `/labo/` exclu ; `public/robots.txt` qui pointe vers le plan du site ;
   `/labo/` garde son `noindex`.
7. **Le ménage du brouillon** : retire la route `projets/[slug].astro`, les
   composants `Carte` et `Chiffres`, `global.css` et la collection de
   contenu ; déplace `src/content/projets/feedback-loop.md` dans `matiere/`
   (hors du site, gardé comme matière de l'acte I), et
   `public/images/feedback-loop/` avec lui.
8. **Le hook** : ajoute à `ops/hooks/pre-commit`, avant « -> OK », une étape
   « -> build et tests » qui construit dans `.dist-hook`
   (`npx astro build --outDir .dist-hook`), lance `DIST=.dist-hook npm
   test`, refuse le commit en cas d'échec, puis supprime `.dist-hook`. Le
   hook ajoute déjà Node au PATH si besoin :
   `export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
   Ajoute `.dist-*/` au `.gitignore`.

## Ce que « fini » veut dire

- Les tests des familles jumelles, tiers, confidentialité, liens, contrastes
  et accessibilité sont **passés au vert**, leur `todo` retiré.
- `npm test` : **0 fail**. Le seul `todo` qui peut rester est celui qui ne
  dépend pas de toi (il n'y en a normalement plus).
- Aucun fichier au-delà de 500 lignes.

## La preuve attendue

Les commandes et leurs sorties : `npm install` des deux paquets,
`npx astro build --outDir .dist-2b`, `DIST=.dist-2b npm test` (le résumé
`tests | pass | fail | todo`), puis un essai du hook sur un commit à blanc
(`sh ops/hooks/pre-commit` depuis la racine, sans committer). Supprime
`.dist-2b`. Ne commite rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
