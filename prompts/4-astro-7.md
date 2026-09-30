# Brief — la montée d'Astro 5 à Astro 7 (registre/0027)

Le portfolio est un site statique Astro 5.18 (`package.json` : `astro`,
`@astrojs/sitemap`, `@fontsource/atkinson-hyperlegible-next` ; `sharp` sert
aux images de `ops/images/`). `npm audit` signale `astro` (critique, corrigé
en version majeure 7), `esbuild` et `sharp`. Deux fichiers à lire d'abord :
`registre/0027-*.md` et `package.json`.

Tu travailles dans **ton propre worktree** (branche dédiée). Tu commites sur
cette branche, **tu ne pousses pas** et tu ne touches pas à `main`.

## Ce que tu fais

1. **Relève l'état avant** : `npm audit` (résumé), et un build de référence
   du code actuel dans un dossier temporaire hors du dépôt, pour comparer.
2. **Lis les guides de montée officiels** Astro 6 puis Astro 7
   (docs.astro.build, « Upgrade to v6 », « Upgrade to v7 ») et relève ce qui
   touche ce site : collections de contenu (`src/content.config.ts`, loader
   `glob`, `render`, `getCollection`), i18n et `trailingSlash`, intégrations
   (`@astrojs/sitemap`, la petite intégration `labo()` et le plugin rehype
   local de `astro.config.mjs`), scripts et styles des composants, version de
   Node exigée, `astro:assets` s'il y en a.
3. **Monte les versions** : `astro` à la dernière 7.x, `@astrojs/sitemap` à la
   version compatible, `sharp` à la dernière qui corrige l'alerte (c'est aussi
   ce que propose une pull request de Dependabot), sans ajouter de paquet.
   **Pas de `npm audit fix --force`.** Adapte le code au strict nécessaire.
4. **Vérifie la CI** : `.github/workflows/deploy.yml` utilise
   `withastro/action` et Node 24 ; vérifie la compatibilité avec Astro 7 (et
   la version de l'action), corrige si besoin.
5. **Compare** : build de la nouvelle version, puis, page par page (les neuf
   pages dont la 404, plus sitemap, robots, images), compare avec le build de
   référence : le **texte visible** doit être identique, les balises du
   `<head>` identiques (canonical, hreflang, og, robots `noindex`), les
   liens identiques. Les différences de noms de fichiers `_astro/…` et de
   minification sont attendues ; liste toute autre différence.
6. `npx astro build --outDir .dist-astro7` puis `DIST=.dist-astro7 npm test`
   (`fail 0`), `npm audit` après, `node ops/images/apercu.mjs` et
   `node ops/images/404/planche.mjs` qui doivent tourner (images identiques
   par empreinte, ou dis pourquoi elles changent), le serveur de dev qui
   démarre (sur un port libre autre que 4321, arrêté ensuite), et la route de
   dev `/labo/scene/` qui répond.

## Ce que tu ne touches pas

Les tests (s'ils doivent changer pour Astro 7, arrête-toi et dis-le), le
texte des pages, `src/i18n/publication.ts`, `ops/images/accueil/` (un autre
chantier y dessine). Ne cite aucun terme des listes de `~/.portfolio/`.

## Ce que tu rends

La branche et ses commits ; les versions avant / après ; `npm audit` avant /
après ; les changements de code, un par un, avec la règle du guide qui les
impose ; le résultat de la comparaison des builds ; ce qui reste signalé et
pourquoi. Supprime `.dist-astro7` et le build de référence.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
Le hook de pre-commit tourne sur tes commits (build et tests) : ne le
contourne pas.
