# Brief — le test des infobulles dans un navigateur (registre/0097)

Lis `registre/0097-test-infobulles-navigateur.md` (la spec), puis
`tests/outils.mjs` (comment les tests trouvent le site construit). Le
reste, tu le découvres au besoin : les bulles du site viennent de
`src/components/infobulles/` et `src/styles/infobulles.css` ; celles de la
présentation sont les `[data-info]` de `public/usecase/dentalsoft/index.html`
(et ce qu'ils ouvrent). Ne lis pas tout le source.

## Ce que tu fais

1. `npm i -D playwright` (la bibliothèque, pas `@playwright/test`), puis
   `npx playwright install chromium`.
2. `tests/infobulles-navigateur.test.mjs`, lancé par `node --test` comme
   les autres. Il sert `DIST` avec un petit serveur `node:http` à lui (pas
   de dépendance de plus), lance Chromium sans fenêtre, et pour chaque
   page de `pagesHtml()` **et** chaque vue de la présentation (par son
   ancre `#<id>`, dévoilements compris si une bulle n'apparaît qu'après) :
   - largeurs 375 × 812 (toucher : `hasTouch`, ouverture au tap), 768 ×
     1024 et 1280 × 800 ; la présentation en 1280 × 720 et 1600 × 900 ;
     une passe en mode sombre à 1280 ;
   - chaque déclencheur ouvert de chaque façon que la page prévoit
     (survol, focus clavier, toucher) ;
   - la bulle ouverte doit être **visible** (taille non nulle,
     `visibility`, `opacity`, `display`), **dans l'écran** (une marge de
     quelques pixels admise), **coupée par aucun ancêtre** (`overflow`
     autre que `visible` dont le rectangle ne la contient pas), **couverte
     par aucun élément** (`elementFromPoint` sur le centre et les quatre
     coins intérieurs renvoie la bulle ou un de ses descendants).
   - Un échec nomme la page ou la vue, la largeur, le mode d'ouverture, le
     terme et ce qui ne va pas ; il dit quoi regarder.
   - Le test **échoue s'il ne trouve aucune bulle** (sinon il passe à vide).
   - Durée visée : moins d'une minute en local.
3. `.github/workflows/tests.yml` et le job `tester` de `deploy.yml` :
   `npx playwright install --with-deps chromium` après `npm ci`.
4. Lance : `npx astro build --outDir .dist-97` puis `DIST=.dist-97 npm test`.

## Ce que tu ne fais pas

**Tu ne corriges aucune bulle**, ni CSS ni HTML du site ou de la
présentation : ta règle est que celui qui écrit le test ne corrige pas.
Si le test trouve des bulles masquées, il reste rouge et tu les listes.
Montre aussi qu'il sait échouer et réussir : sur une copie de `.dist-97`,
cache une bulle qui passait (`overflow: hidden` sur son parent, par
exemple) et montre l'échec.

Ne touche ni à `src/`, ni à `public/`, ni à `registre/0094-…` (une autre
session). Pas de `git stash`, ne commite rien. Supprime `.dist-97`.

Rapport de 200 mots au plus : les fichiers touchés, le nombre de bulles et
de cas vérifiés, la durée, et **la liste des bulles en échec** (page ou
vue, largeur, mode, terme, raison). Environnement : Windows, Git Bash.
