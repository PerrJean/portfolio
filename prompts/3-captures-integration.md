# Brief — la capture Analyse, l'intégration des captures, la colonne élargie (registre/0047)

Suite du chantier 0043. **Relis d'abord ses interdits** dans
`prompts/3-captures-uservoice.md` : ils valent tous ici (ne jamais lire les
données réelles de UserVoice, ne rien y modifier, travailler dans
`~/.portfolio/captures/`, passer chaque page rendue au vérificateur, ne citer
aucun terme des listes). Ta chaîne est déjà en place dans ce dossier
(`genere_base.py`, `rendre.py`, `capture.sh`, `recadre.mjs`).

## 1. Les images

- **Nouvelle capture : la page Analyse** de UserVoice (`vues/page_analyse.py`
  et ses modules `analyse_*`), sur la base synthétique existante (complète-la
  si la page attend des données absentes, toujours inventées). Même contrôle
  qu'en 0043, même post-traitement, aucune ressource tierce.
  `public/captures/uservoice/analyse.png`.
- **Baromètre NPS recadré** : sans le bloc « Par rôle ».
- Largeur 1360 px, hauteur **≤ 1450 px** chacune (le haut le plus parlant),
  300 Ko au plus. Supprime `bilan-lundi.png` (abandonné).
- Regarde chaque image (Read) : aucun logo, nom, table, champ, URL.

## 2. L'intégration dans la page UserVoice (FR et EN)

- `src/contenu/projets/fr/uservoice.md` et `en/uservoice.md` : une `<figure>`
  en HTML brut dans le Markdown (Astro le garde), **Analyse** à la fin de la
  section « Écouter chaque lundi » (EN : son H2 traduit), **NPS** dans « Ce
  que j'ai construit », après le paragraphe qui parle du tableau de bord. Si
  la page Analyse ne correspond pas au texte de sa section, place-la au mieux
  et dis-le. Ne change pas le texte des sections ; aucun H2 ajouté.
- Chaque figure : l'image dans un lien vers le PNG lui-même (pour zoomer),
  `width`/`height`, `loading="lazy"`, `decoding="async"`, un `alt` qui dit ce
  qu'on voit ; une `<figcaption>` d'une phrase finie par « Données
  synthétiques. » / « Synthetic data. » (légendes : reprends celle du NPS de
  0043, écris celle d'Analyse).
- Style (dans `src/layouts/Projet.astro`, sélecteurs `.corps :global(figure)`)
  : cadre 1 px `--dalle`, fond blanc cassé de l'image tel quel, marge haute
  1.5rem ; légende en `--encre`, 15 px au moins (l'ardoise ne passe le
  contraste qu'en grand texte), interligne 1.5. Au focus du lien, le contour
  du site.

## 3. La colonne de texte élargie sur grand écran

Dans `src/styles/jetons.css`, un jeton `--mesure: 46rem`. Remplace les
`max-width: 40rem` de `src/layouts/Projet.astro` (`.synthese__phrases`,
`.corps`, `.plus-loin`) et de `src/styles/base.css` (`.fiche__texte`, et la
grille `.fiche` en `minmax(0, var(--mesure))`) par `var(--mesure)`. Ne touche
ni au sous-titre de l'accueil, ni aux titres en `ch`. Vérifie par calcul qu'à
960, 1280 et 1440 px la colonne du bâtiment garde sa place (grille 4fr / 1fr
du `.projet`).

## Ce que tu ne touches pas

Les tests, le texte des sections, `src/components/` (dont les schémas),
`src/i18n/publication.ts`, les autres pages.

## La preuve attendue

`npx astro build --force --outDir .dist-0047` puis `DIST=.dist-0047 npm test`
(`fail 0`) ; sortie du vérificateur sur la page Analyse rendue ; chemins,
dimensions, poids ; grep des deux `<figure>` dans les deux pages construites.
Supprime `.dist-0047`. Ne commite rien, n'ouvre aucun navigateur (la session
regardera).

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
