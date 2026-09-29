# Brief — la phrase signature et la date des projets (registre/0045)

Deux changements validés par Jean, sur le portfolio Astro.

## 1. La phrase signature

Remplace partout, sur le site et dans les images :
- FR : « Je bâtis sur des hypothèses : j'écoute, je teste, puis je dose
  l'effort. » → « Je bâtis sur des hypothèses : j'écoute, je teste, puis
  j'investis là où ça compte. »
- EN : la phrase qui finit par « then I size the effort. » → « I build on
  hypotheses: I listen, I test, then I invest where it counts. » (garde le
  début anglais actuel s'il diffère légèrement, change la fin.)

Où : `grep -rn "dose l'effort\|size the effort" src ops redaction` (hors
`.canevas/`, `prompts/`, `registre/` : ce sont des archives). Les espaces
insécables du texte comptent (espace fine avant « : ») : garde celles
qui sont en place.

Puis régénère les images : `node ops/images/apercu.mjs`. La phrase est plus
longue : vérifie (outil Read) que l'aperçu `public/og/apercu.png` et les
quatre bannières `ops/images/couverture/*.png` restent lisibles, sans
débordement ni coupure, le texte à droite de la zone de la photo de profil
(x ≥ 500) et dans la bande sûre des bannières ; le script imprime ces
mesures. Si la phrase ne tient pas sur deux lignes à 38 px dans la bannière,
passe à trois lignes plutôt que de réduire sous 34 px. Attention au piège
consigné dans le script : la graisse 800 dépend de l'ordre de rendu.

## 2. La date sous le titre

- `src/content.config.ts` : un champ obligatoire `date`, au format `AAAA-MM`
  (validé par une regex), dans l'en-tête des quatre fichiers
  `src/contenu/projets/{fr,en}/*.md` : `2026-09` pour les deux projets.
- `src/layouts/Projet.astro` : juste sous le `<h1>`, un
  `<p class="synthese__date"><time datetime="2026-09">septembre 2026</time></p>`
  (EN « September 2026 »), mois formaté par `Intl.DateTimeFormat` selon la
  langue, première lettre en capitale en FR (« Septembre 2026 »). Style :
  texte courant en `--ardoise`, taille ≥ 18 px et graisse 700 (l'ardoise ne
  passe le contraste qu'en grand texte, test `contrastes`), petit écart sous
  le titre, avant le fait clé.

## Ce que tu ne touches pas

Les tests, les autres textes, `src/components/schemas/`, `public/captures/`
(un autre chantier y travaille), `redaction/releve-lourdeurs.md`,
`src/i18n/publication.ts`.

## La preuve attendue

`npx astro build --force --outDir .dist-0045` puis `DIST=.dist-0045 npm test`
(`fail 0`) ; grep : l'ancienne phrase n'est plus dans aucune page construite,
la nouvelle est sur les pages attendues, `<time datetime="2026-09">` sur les
quatre pages projet. Sortie du script d'images, et ce que tu as vu sur les
images. Supprime `.dist-0045`. Ne commite rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
