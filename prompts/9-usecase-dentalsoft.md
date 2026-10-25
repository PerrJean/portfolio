# Brief — la présentation DentalSoft en page cachée (registre/0092)

Jean veut partager sa présentation DentalSoft par un lien, à l'adresse
`/usecase/dentalsoft/` du site, sans qu'aucune page du site n'y mène et
sans qu'un moteur de recherche ne la référence. Lis d'abord
`registre/0092-usecase-dentalsoft.md` (la spec), puis `tests/outils.mjs`.

## Ce que tu fais

1. **Copier** `C:\Users\Jean PERRIER\Downloads\dentalsoft-presentation-partage.html`
   vers `public/usecase/dentalsoft/index.html`. Ne change pas son contenu,
   sauf ce qui suit.
2. **Police (C6)** : retirer les trois balises vers `fonts.googleapis.com`
   et `fonts.gstatic.com`. Copier les woff2 latin 400, 700 et 800 de
   `node_modules/@fontsource/atkinson-hyperlegible-next/files/` sous
   `public/usecase/dentalsoft/polices/`, et déclarer les trois `@font-face`
   en tête du `<style>`, avec le même nom de famille et `font-display: swap`.
3. **Non référencée** : ajouter `<meta name="robots" content="noindex, nofollow">`
   dans le `<head>`. Ne touche **pas** à `public/robots.txt`.
4. **Les tests** : construire (`npx astro build --outDir .dist-92`) puis
   `DIST=.dist-92 npm test`. Pour chaque test qui échoue sur cette page :
   - `confidentialite` et `tiers` **doivent couvrir** la page et passer. Si
     `tiers` refuse les deux liens `<a>` sortants vers ameli.fr et
     inami.fgov.be (des sources citées, pas des ressources chargées),
     autorise les liens sortants pour les seules pages sous `usecase/`, en
     un endroit, avec un commentaire qui renvoie à registre/0092.
   - les tests du gabarit du site (jumelles, relief, scènes, infobulles,
     gabarits, contrastes, accessibilité, liens…) ne s'appliquent pas à une
     présentation autonome : exclure `usecase/` **en un seul endroit**
     (`tests/outils.mjs`), commenté, et pas test par test. Si un test
     d'accessibilité relève un vrai défaut de la page (un contraste
     illisible, une image sans texte), ne l'exclus pas en silence :
     liste-le dans ton rapport.
5. **Vérifier** dans `.dist-92` : la page existe à
   `usecase/dentalsoft/index.html`, ses polices aussi ; aucune entrée
   `usecase` dans `sitemap-0.xml` ; aucune page du site ne contient
   `/usecase/`. Ouvre-la avec `npm run preview` (ou le serveur de dev) à
   `/usecase/dentalsoft/` et vérifie dans l'onglet réseau qu'aucune requête
   ne sort du site et que la police se charge.

Supprime `.dist-92` à la fin. Ne touche ni à `src/`, ni au registre : un
autre chantier modifie `src/` en même temps. Pas de `git stash`. Ne commite
rien.

Rapport de 200 mots au plus : les fichiers touchés, les tests exclus et
pourquoi, les défauts de la page relevés par les tests. Environnement :
Windows, Git Bash.
