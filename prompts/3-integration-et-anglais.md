# Brief — intégrer les trois textes, écrire leurs versions anglaises (registre/0037)

Les trois textes français sont validés par Jean, dans `redaction/` :
`uservoice.fr.md`, `audit-contenu.fr.md`, `a-propos.fr.md`. Tu les fais
entrer dans le site, puis tu écris leurs versions anglaises.

## 1. Intégrer le français

- **Pages projet** : `src/contenu/projets/fr/uservoice.md` et
  `fr/audit-contenu.md` reçoivent le texte validé. L'en-tête suit le schéma
  de `src/content.config.ts` : `titre`, `fait`, puis la synthèse répartie en
  `probleme`, `action`, `resultat` (les trois phrases de `synthese`, une par
  champ, telles quelles), `plusLoin` (le contenu de « Pour aller plus
  loin »), `langue`, `cle`. Le corps : les H2 et leurs paragraphes, **sans**
  la section « Pour aller plus loin » (elle vit dans `plusLoin`) et **sans**
  ce qui suit le filet final (audit, reste à compléter) : cela ne va jamais
  sur le site. Si `plusLoin` ne sait porter que des paragraphes, garde les
  sous-titres « Ce que j'ai écarté » et « Les pièges payés » sous forme de
  paragraphes courts, sans rien inventer.
- **Accueil** : si le titre ou le fait clé d'un projet diffère dans
  `src/contenu/projets.ts`, aligne-le sur le texte validé.
- **À propos** (`src/pages/a-propos.astro`) : le texte validé, tel quel, sans
  la partie sous le filet. Ajoute le **personnage de Jean** aux lunettes
  orange (composant `src/components/scene/Personnage.astro`, pose debout,
  `jean`), décoratif (`aria-hidden`), à la place d'une photo, dans un SVG
  aux couleurs des jetons. Le lien LinkedIn est celui du socle.
- Le nom de l'employeur n'apparaît **que** sur les pages À propos (FR et
  EN) : le hook refuse le reste.

## 2. Écrire l'anglais

Réécris en anglais (pas une traduction mot à mot) les trois textes, pour
`src/contenu/projets/en/uservoice.md`, `en/content-audit.md` et
`src/pages/en/about.astro`. Mêmes faits, mêmes chiffres, mêmes H2 (traduits),
même structure. Les règles de la ligne éditoriale valent en anglais (le
second fichier de ton prompt) : pas d'opposition fabriquée (« not X, but
Y »), pas de triplet réflexe, pas de jargon (« leverage », « at scale »,
« seamless », « robust », « end-to-end »…), pas de tiret cadratin, le fait
avant l'adjectif. Voix : « I », calme, directe. Anglais britannique ou
américain, mais le même partout (choisis l'américain).

Termes fixés : « content audit », « learning designer », « key fact » n'a
pas à apparaître ; « 1 in 3 pieces of feedback is about the content. » et
« In the first course audited, 1 question in 20 stopped learners from
answering. All of them were fixed. » sont les faits clés déjà en place.

## Ce que « fini » veut dire

- Plus aucun `[À COMPLÉTER]` ni `[TO BE COMPLETED]` sur les huit pages.
- `npx astro build --outDir .dist-3` puis `DIST=.dist-3 npm test` : `fail 0`.
- Rends un court **audit** de l'anglais (tics repérés et réécrits).

Ne touche ni aux tests, ni aux composants d'animation, ni à
`src/i18n/publication.ts` (le site reste caché des moteurs). Supprime
`.dist-3`. Ne commite rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
