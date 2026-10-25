# Brief — corriger les bulles masquées, écrire leurs règles (registre/0099)

Lis `registre/0099-infobulles-regles-et-correction.md` (les échecs, les six
règles validées par Jean), puis `tests/infobulles-navigateur.test.mjs` (le
test qui juge ; tu ne l'as pas écrit et **tu ne le modifies pas**).

## 1. Corriger la présentation

Un seul fichier : `public/usecase/dentalsoft/index.html`. Ses bulles sont
des `::after` des `.capsule` (vers les lignes 90-100) et des `[data-info]`.

- **Règle 1** : les bulles passent dans la couche supérieure. Une forme
  qui marche : un seul élément `<div popover="manual" role="tooltip">`,
  rempli et placé au survol, au focus et au toucher du déclencheur, aux
  coordonnées de l'écran (`getBoundingClientRect` tient compte de la mise
  à l'échelle de la scène). Échap et un tap ailleurs le ferment ; le
  déclencheur porte `aria-describedby` quand il est ouvert. Choisis une
  autre forme si elle tient mieux, en disant pourquoi.
- **Règle 2** : une capsule hors focus s'atténue par la couleur (texte,
  fond, bord), plus par `opacity`, ou sa bulle n'en hérite plus — l'effet
  visuel des capsules hors focus doit rester le même.
- **Règle 4** : la bulle se retourne au bord de l'écran, largeur maximale
  relative à l'écran.
- Le reste de la présentation ne bouge pas : mêmes textes de bulles, même
  aspect, mode sombre compris.

## 2. Écrire `.claude/rules/infobulles.md`

En tête, un frontmatter `paths:` qui vise `src/components/infobulles/**`,
`src/styles/infobulles.css` et `public/usecase/**`. Puis les six règles du
registre, chacune avec : la règle en une phrase, **pourquoi** (l'échec
mesuré pour 1 et 2, avec la date), **comment la respecter** (la forme
retenue ici, en quelques lignes), et **ce qui la vérifie** (le contrôle du
test, ou « non testée » dit franchement). 80 lignes au plus. Dis aussi
si les bulles du site (`src/components/infobulles/`, `src/styles/infobulles.css`)
respectent déjà chaque règle ; **ne les modifie pas**, signale l'écart.

## La preuve

- Captures avant / après des bulles en échec (survol d'une capsule de
  `#pratiques-metiers`, une capsule hors focus de `#pratiques-etape`), en
  clair et en sombre, sous `.canevas/0099/`.
- `npx astro build --outDir .dist-99` puis `DIST=.dist-99 npm test` :
  **tout vert**, le test des bulles compris. Supprime `.dist-99`.

Ne touche ni aux tests, ni à `src/`, ni à `package*.json`, ni aux
workflows, ni à `registre/0094-…`, `0098-…`, `redaction/`, `prompts/9-*mon-metier*`
(une autre session). Pas de `git stash`, ne commite rien. Rapport de 200
mots au plus : la forme retenue, les écarts du site aux règles, la sortie
de `npm test`. Environnement : Windows, Git Bash.
