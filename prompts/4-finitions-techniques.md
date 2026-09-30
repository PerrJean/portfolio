# Brief — finitions techniques avant le lancement (registre/0053)

Trois corrections sur le portfolio Astro. Deux fichiers à lire d'abord :
`src/layouts/Base.astro` et `ops/images/apercu.mjs`.

## 1. La page de laboratoire hors du site publié

`src/pages/labo/scene.astro` sert à mettre au point les animations ; elle est
publiée à `/labo/scene/`. Sors-la du site construit **sans la perdre** : par
exemple en la déplaçant hors de `src/pages/` (un dossier `labo/` à la racine
ou sous `src/`, avec une ligne dans le README qui dit comment la rouvrir), ou
en ne la construisant qu'en développement. Vérifie qu'elle n'est ni dans
`dist/` ni dans le sitemap, et que les tests qui l'excluaient (`hors labo/`)
restent verts sans modification.

## 2. Une page 404

`src/pages/404.astro` (GitHub Pages sert `404.html`) : dans le gabarit
`Base`, bilingue sur la même page (FR puis EN, chaque bloc avec son `lang`),
un titre court, une phrase, deux liens : l'accueil FR et l'accueil EN. Le
personnage de Jean (`src/components/scene/Personnage.astro`, pose debout,
décoratif) peut l'accompagner. `noindex` comme le reste. Les tests des
jumelles (C7) ne doivent pas la compter comme page sans jumelle : si un test
échoue pour cela, arrête-toi et dis-le (tu ne touches pas aux tests).

## 3. L'aperçu de partage en anglais

`ops/images/apercu.mjs` produit `public/og/apercu.png` (FR). Ajoute
`public/og/apercu-en.png`, même composition, texte anglais : « I build on
hypotheses: I listen, I test, then I invest where it counts. » et
« Head of Product · Applied AI · Data ». Vérifie à l'œil (outil Read) que le
texte tient, en 800 là où il l'est en FR (attention au piège de graisse
consigné dans le script). Puis `Base.astro` choisit l'image selon la langue
de la page (`og:image`, et le `twitter:image` s'il existe). Le favicon, la
FR et les bannières doivent sortir identiques (compare leurs empreintes
avant et après).

## Ce que tu ne touches pas

Les tests, `src/contenu/`, `src/components/schemas/`, `redaction/`,
`src/i18n/publication.ts`. Un autre chantier modifie les textes en parallèle.

## La preuve attendue

`npx astro build --outDir .dist-0053` puis `DIST=.dist-0053 npm test`
(`fail 0`) ; `ls` : plus de `labo/` dans le site construit, un `404.html` ;
grep de `og:image` sur une page FR et une page EN ; empreintes identiques des
images inchangées ; ce que tu as vu sur `apercu-en.png`. Supprime
`.dist-0053`. Ne commite rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
