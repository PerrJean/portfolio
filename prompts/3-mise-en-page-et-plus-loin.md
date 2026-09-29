# Brief — colonne pleine, « Pour aller plus loin » structuré, UserVoice corrigé (registre/0048)

Trois changements validés par Jean sur le portfolio Astro. Deux fichiers à
lire d'abord : `src/layouts/Projet.astro` et `src/content.config.ts`.

## 1. La colonne pleine sur grand écran

Aujourd'hui, à 1500 px, la colonne de l'article fait ~850 px mais le texte
s'arrête à 736 px, le titre à 22ch et le fait clé à 26ch : ~200 px d'ivoire
avant le bâtiment. Maquette validée :
- `.synthese h1` : plus de `max-width`.
- `.synthese__fait` : `max-width: 32ch`, `text-wrap: balance` gardé.
- `.synthese__phrases`, `.corps`, `.plus-loin` : la largeur de la colonne
  (`max-width: none`), **à partir de 1280 px seulement** ; en dessous, garde
  `var(--mesure)`.
- À partir de 1280 px : texte courant du corps à `1.1875rem` (19 px), phrases
  de la synthèse à `1.25rem`, pour rester autour de 80 signes par ligne.
- `src/styles/base.css`, page À propos (`.fiche`) : même logique, la colonne
  de texte prend sa place dans la grille à partir de 1280 px, à 19 px.
- Rien ne change sous 1280 px ni au téléphone. Le bâtiment ne bouge pas.
- Espace insécable entre un nombre et le mot qui suit dans les faits clés
  (« 1 question », « 1 retour », « 20 empêchait »…) FR et EN, pour qu'un
  chiffre ne reste jamais seul en fin de ligne.

## 2. UserVoice : les retours n'étaient pas qualifiés

Avant UserVoice, les retours **n'étaient pas qualifiés du tout** ; le site dit
à tort « qualifiés à la main ». Remplace (FR, puis EN dans le même esprit) :
- synthèse `probleme` : « … répartis entre quatre sources, et jamais lus
  ensemble. »
- corps, « Le point de départ » : « Quand j'ai lancé UserVoice, en septembre
  2026, ces retours n'étaient pas qualifiés. Chacun restait dans sa source, et
  les mêmes sujets revenaient sans qu'on sache s'ils étaient déjà traités. »

Cherche toute autre mention de « à la main », « by hand », « tableur »,
« spreadsheet » sur ce sujet (site et `redaction/uservoice.fr.md`) et
aligne-la. Aucun reproche à l'employeur (C8) : le constat est un levier.

## 3. « Pour aller plus loin » structuré, sans redite

- Schéma : `plusLoin` devient une liste de sections
  `{ titre: string, points: string[] (≥ 1) }` (`.strict()`).
- Rendu dans le `<details>` : chaque section en `<h3>` puis `<ul>` (jamais de
  H2 : le bâtiment compte les H2). Style sobre : h3 en 700 à 1.125rem, puces
  discrètes, espacement régulier ; contrastes des jetons.
- Contenu, pour les deux projets, FR et EN : reprends les « faux titres »
  actuels (« Ce que j'ai écarté », « Les pièges payés », « La grille », « Ce
  que disaient les retours », « Les règles, et ce qu'elles ont coûté »…) comme
  titres, et leurs entrées comme points. **Retire tout point que le corps de
  la page dit déjà** ; garde seulement ce qui ajoute un détail (critères
  complets, options écartées et pourquoi, pièges et leur coût). Si une section
  se vide, supprime-la. Un point = une ou deux phrases courtes, sans nouveau
  fait.
- Reporte la même structure dans `redaction/*.fr.md` (au-dessus du filet).

## Ce que tu ne touches pas

Les tests, `src/components/` (schémas, bâtiment), `public/captures/`,
`src/i18n/publication.ts`, les H2 et le texte des sections hors point 2.
Un autre chantier travaille dans `~/.portfolio/` : n'y touche pas.

## La preuve attendue

`npx astro build --force --outDir .dist-0048` puis `DIST=.dist-0048 npm test`
(`fail 0`) ; grep : plus de « à la main » ni « by hand » dans UserVoice, des
`<h3>` dans les quatre `<details>` ; la liste des points retirés pour redite,
avec la phrase du corps qui les dit déjà. Supprime `.dist-0048`. Ne commite
rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
