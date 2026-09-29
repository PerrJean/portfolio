# Brief — le schéma de la chaîne d'Audit contenu (registre/0041)

Un schéma de tout le projet, dans la page Audit contenu (FR et EN), **juste
après la section « Ce que la grille vérifie »** (EN « What the grid
checks »), le deuxième H2.

## Ce qu'il montre (validé par Jean)

De gauche à droite (de haut en bas au téléphone) :

1. **Le parcours** : ses questions, chacune avec sa réponse et son
   explication.
2. **Deux contrôles en parallèle** :
   - **les agents IA encadrés**, qui appliquent la grille des six critères,
     question par question ;
   - **les contrôles automatiques** : la bonne réponse est-elle vraiment la
     bonne, l'explication existe-t-elle, n'est-elle pas circulaire.
3. **Le bilan** : un verdict par question (bloquant, majeur, mineur, rien à
   corriger).
4. **La relecture humaine** : Jean et la learning designer, recette des
   échantillons. **C'est la seule étape en ambre** (la lumière = l'humain).
5. **Les lots de corrections**, relus, jamais écrits directement en base.
6. **La préproduction, puis la production.**

Sous le schéma, une ligne : « Sur le premier parcours audité : 1 question
sur 20 bloquante, toutes corrigées. » (EN : « In the first course audited:
1 question in 20 blocking, all of them fixed. »)

Aucun nom de module, de table, d'outil interne, d'examen ni d'employeur.

## La forme

- **Au trait**, dans le style du bâtiment : cadres à angles droits, traits
  fins à l'encre `--encre`, flèches et liaisons en `--ardoise`, fond ivoire ;
  l'étape humaine repérée par l'ambre `--ambre` (un aplat ou un point, jamais
  du texte en ambre). Texte en Atkinson (la police du site), lisible : 15 px
  au moins à la largeur de la colonne de texte.
- **Grand écran** : horizontal, dans la largeur de la colonne de texte.
  **Au téléphone** (moins de 720 px) : **en colonne verticale**, flèches vers
  le bas. Deux dispositions du même contenu sont acceptables (un SVG par
  disposition, l'autre masqué en CSS), ou un seul dessin qui se réorganise.
- **Accessible** : le dessin est `aria-hidden`, et son contenu est donné
  **en texte** juste à côté pour les lecteurs d'écran (une liste ordonnée
  visuellement masquée, ou une `figcaption` complète). Bilingue : FR et EN.
- Aucune animation.

## Comment l'insérer dans le Markdown, sans nouveau paquet

Le corps des pages vient de `src/contenu/projets/fr/audit-contenu.md` et
`en/content-audit.md` (Markdown, pas MDX). N'installe aucun paquet. Deux
voies possibles, au choix, la plus simple et robuste l'emporte :
- un petit **plugin rehype local** (déclaré dans `astro.config.mjs` sous
  `markdown.rehypePlugins`, sans dépendance) qui remplace un marqueur placé
  dans le Markdown (par exemple `<div data-schema="chaine-audit"></div>`)
  par le HTML du schéma, selon la langue du fichier ;
- ou le HTML du schéma écrit directement dans le Markdown (Astro garde le
  HTML brut), s'il reste court et lisible.
Le schéma lui-même vit dans un fichier dédié (`src/components/schemas/` ou
équivalent), pas recopié dans deux endroits.

Le bâtiment compte les H2 : ne crée aucun H2 dans le schéma.

## Ce que tu ne touches pas

Les tests, le texte des sections (seul le marqueur s'ajoute), les autres
pages, les animations, `src/i18n/publication.ts`. 500 lignes au plus par
fichier.

## La preuve attendue

`npx astro build --outDir .dist-schema` puis `DIST=.dist-schema npm test`
(`fail 0`) ; vérifie par grep que le schéma est présent dans les deux pages
construites, avec son texte accessible. Supprime `.dist-schema`. Ne commite
rien, n'ouvre aucun navigateur (la session regardera).

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
