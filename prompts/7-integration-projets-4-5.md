# Brief — intégrer les projets 4 et 5, et le nouvel ordre de l'accueil (registre/0070)

Le portfolio (Astro 7) a trois projets. Deux autres sont rédigés et validés par
Jean : la **fusion des plateformes** et les **mises en situation orales par
IA**. Tu les fais entrer dans le site, FR et EN, avec leurs illustrations, et
tu réordonnes l'accueil. Deux fichiers à lire d'abord :
`src/contenu/projets.ts` (la liste des projets et leurs groupes) et
`src/contenu/projets/fr/matrice-competences.md` (le modèle d'une page projet
récente, avec figures et « Pour aller plus loin » à images). Suis ensuite ce
qu'ils appellent (`src/content.config.ts`, `src/i18n/routes.ts`,
`src/layouts/Projet.astro`, `src/components/Parcelles.astro`,
`src/components/Parcelle.astro`, `src/components/schemas/`, les pages de
`src/pages/projets/` et `src/pages/en/projects/`).

## 1. Les textes (validés : ne change aucun mot, seulement la mise en forme)

- Fusion : `redaction/fusion.fr.md` et `redaction/fusion.en.md` → 
  `src/contenu/projets/fr/fusion-plateformes.md` et
  `src/contenu/projets/en/platform-merger.md` ; adresses
  `/projets/fusion-plateformes/` et `/en/projects/platform-merger/` ; clé
  `fusion`.
- Mises en situation : `redaction/mises-en-situation.fr.md` et
  `redaction/mises-en-situation.en.md` → 
  `src/contenu/projets/fr/mises-en-situation.md` et
  `src/contenu/projets/en/speaking-practice.md` ; adresses
  `/projets/mises-en-situation/` et `/en/projects/speaking-practice/` ; clé
  `misesEnSituation`.
- Seul le texte **au-dessus du filet** `---` entre dans le site ; les notes,
  audits et questions en dessous n'y vont jamais. Les commentaires
  `<!-- Figure : … -->` indiquent où vont les figures.
- Chaque page a sa jumelle (hreflang, bascule FR | EN) et une description.

## 2. Les illustrations

- **Fusion** : les trois schémas de `ops/images/fusion/` (`avant-apres`,
  `trajectoires`, `gabarits`), FR et EN, chacun en deux dispositions (grand
  écran et `.etroit.` pour le téléphone). Avant de les publier, **change le
  libellé de la plateforme unique** dans `ops/images/fusion/planche.mjs` :
  « Plateforme unique : second temps, pas encore engagé » / "Single
  platform: second step, not yet under way" (et la description accessible :
  « En pointillés, la plateforme unique : second temps, pas encore engagé. » /
  "Dotted: the single platform, second step, not yet under way."), puis
  régénère. Copie les SVG dans `public/illustrations/fusion/`. Dans la page,
  un `<figure>` par schéma, là où le commentaire l'indique : un `<picture>`
  avec `<source media="(min-width: 48.5rem)">` pour la version grand écran et
  la version étroite par défaut (plafond `max-width` d'environ 26rem pour
  l'étroite), un `alt` qui dit ce que montre le schéma (le `<title>` du SVG
  n'est pas lu dans un `<img>`), une légende. La visionneuse ne doit pas
  prendre ces schémas (ce ne sont pas des captures) : vérifie son sélecteur.
- **Mises en situation** : le schéma de l'échange existe déjà comme composant
  (`src/components/schemas/echange-oral.mjs` et `.css`, enregistré sous
  `echange-oral` dans `rehype-schemas.mjs`). Insère son marqueur
  `<div data-schema="echange-oral"></div>` à l'endroit du commentaire de
  figure, et importe `echange-oral.css` dans `Projet.astro` à côté de
  `chaine-audit.css`.

## 3. L'accueil, dans l'ordre « la hauteur d'abord »

1. Une **première paire, sans flèche** : 01 Fusion des plateformes, 02 Mises
   en situation orales.
2. La **paire avec la flèche** « Alors j'ai agi dessus. » : 03 UserVoice →
   04 Audit contenu.
3. **À part** : 05 Matrice de compétences.
Renumérote les cartes, garde la flèche uniquement entre UserVoice et Audit
contenu. Les cartes 01 et 02 n'ont pas encore de scène animée (un autre
chantier les dessine) : `scene: 'aucune'`, et la carte s'affiche proprement
sans dessin ; dans une paire sans scène, les deux cartes restent alignées.
« Projet suivant » suit l'ordre de l'accueil, en boucle. Mets à jour
l'accroche et les descriptions des accueils : « Cinq projets… » ou mieux,
sans nombre, si le texte actuel le permet (propose, ne l'invente pas : garde
« Trois projets… » s'il faut le valider avec Jean, et signale-le).

## Les interdits

C1 à C8 du `CONTRAT.md` : aucun nom d'employeur hors « À propos », aucun
nom interne, de marque, de site, de personne, aucune URL interne, aucun
chiffre absolu interne. **Ne touche pas aux tests** : liste dans ton rapport ce
qu'ils doivent apprendre (les quatre nouvelles pages dans `tests/outils.mjs`),
un autre agent l'écrira. Ne touche pas aux scènes (`src/components/scene/`),
ni à `ops/images/fusion-scene/` et `ops/images/mises-en-situation-scene/`,
ni à `src/i18n/publication.ts`. Scripts de transformation **en fichier**,
jamais en ligne dans le shell ; aucun caractère de contrôle.

## La preuve attendue

`npx astro build --force --outDir .dist-0070` puis `DIST=.dist-0070 npm test`
(`fail 0`) ; les quatre nouvelles pages dans le build, leur `<head>` ; les
deux accueils dans le nouvel ordre ; vérificateur de confidentialité avec
des chemins Windows sur les pages construites. Regarde dans le navigateur
intégré (ton propre onglet, serveur de dev sur 4321 ; vide
`.astro/data-store.json` et relance-le si le schéma a changé) les deux
nouvelles pages à 1280 et à 390 px et l'accueil ; ferme ton onglet et remets
la taille par défaut. Supprime `.dist-0070`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
