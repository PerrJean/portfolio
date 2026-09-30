# Brief — le projet « Matrice de compétences » dans le site (registre/0061)

Le portfolio (Astro 7) a deux pages projet, UserVoice et Audit contenu, en FR
et EN. Tu ajoutes le troisième projet. Deux fichiers à lire d'abord :
`redaction/matrice.fr.md` (le texte validé par Jean, au-dessus du filet ; les
notes sous le filet ne vont jamais sur le site) et
`src/contenu/projets/fr/audit-contenu.md` (le modèle d'une page projet).
Suis ensuite les fichiers que ces deux-là appellent (`src/content.config.ts`,
`src/contenu/projets.ts`, `src/i18n/routes.ts`, `src/layouts/Projet.astro`,
les pages de `src/pages/projets/` et `src/pages/en/projects/`).

## 1. La grille : coquilles, PDF

La grille est produite hors du dépôt, dans `~/.portfolio/matrice/`
(`grille.json`, `generer.py`, `grille-extrait.html`, `grille-complete.html`,
`capturer.sh`, `rogner.cjs`). **Ne lis jamais l'export brut** (`*.xlsx`,
`lecture.txt`) : il contient une évaluation de personne. Travaille depuis
`grille.json`, qui n'a que la grille.
- Corrige **l'orthographe seulement**, aucun mot changé sur le fond :
  « besions » → « besoins », « Assure a mise à jour » → « Assure la mise à
  jour », « critères d'acception simple » → « critères d'acceptation
  simples », « ntègre » → « Intègre », « MoSCow » → « MoSCoW »,
  « assessibilité » → « accessibilité », « Connait » → « Connaît », les trois
  parenthèses non fermées, le guillemet orphelin, le point final d'un
  intitulé. Garde la cellule « Gestion de risque », niveau senior, telle
  qu'elle a été corrigée.
- Régénère `public/captures/matrice/grille-extrait.png` et
  `grille-complete.png` (mêmes dimensions et poids max qu'avant : 1360 px de
  large, extrait ≤ 1450 px de haut, ≤ 400 Ko).
- Produis `public/telechargements/grille-competences-po.pdf` depuis
  `grille-complete.html` avec Edge sans interface (`--print-to-pdf`, profil
  jetable, chemins Windows), en A4 paysage si le rendu le permet (règle
  `@page` dans une copie de la page), sans en-tête ni pied de page du
  navigateur (`--no-pdf-header-footer`). Et une version anglaise
  `grid-skills-po-en.pdf` ? **Non** : la grille existe en français
  seulement ; la page anglaise le dit.
- Passe les pages HTML au vérificateur avec des **chemins Windows**
  (`python ops/hooks/verifier_confidentialite.py <chemin>` depuis le
  portfolio) : il doit se taire. Regarde les deux PNG et la première page du
  PDF (converti en image si besoin) : aucun prénom, aucune évaluation.

## 2. La page, FR puis EN

- `src/contenu/projets/fr/matrice-competences.md` : le texte validé, tel quel
  (en-tête et corps), `date: "2026-01"`, une clé de page nouvelle (par exemple
  `matrice`), et la figure de l'**extrait** à la fin de « Ce que la matrice
  décrit », sur le modèle des figures de `uservoice.md` (lien vers le PNG,
  `width`/`height`, `loading="lazy"`, `decoding="async"`, `alt`, légende finie
  par « Aucune évaluation de personne. » ; la visionneuse les prend toute
  seule).
- `src/contenu/projets/en/skills-matrix.md` : réécriture anglaise (américain,
  pas mot à mot), mêmes faits, mêmes H2 traduits, mêmes règles de la ligne
  éditoriale (`C:\Users\Jean PERRIER\.claude\skills\ligne-editoriale\SKILL.md`,
  section anglaise). La légende précise que la grille est en français.
- Adresses : `/projets/matrice-competences/` et
  `/en/projects/skills-matrix/`, jumelles l'une de l'autre (hreflang,
  bascule FR | EN), avec leur description.
- **« Pour aller plus loin »** : aujourd'hui une section ne porte que des
  points de texte. Étends le schéma (optionnel, `.strict()` gardé) pour
  qu'une section puisse porter une **image** (`src`, `width`, `height`,
  `alt`, `legende`) et un **fichier à télécharger** (`href`, `libelle`,
  `poids` affiché) ; rendus dans le `<details>`, l'image dans le même balisage
  que les figures du corps (la visionneuse doit la prendre : vérifie son
  sélecteur dans `src/components/Visionneuse.astro`, et étends-le à
  `.plus-loin` si besoin, sans rien changer d'autre), le lien avec
  l'attribut `download`. Section « La grille complète » : l'image
  `grille-complete.png` et « Télécharger la grille (PDF, xx Ko) » (EN :
  « Download the grid (PDF, in French, xx KB) »).
- **Accueil** : le projet entre dans `src/contenu/projets.ts` en groupe
  **« a-part »** (après la paire, sans flèche), avec son nom, son fait clé et
  un champ `scene` : mets **`aucune`** pour l'instant (la scène « l'échelle »
  est dessinée par un autre chantier) ; si `Parcelle`/`Scene` n'acceptent pas
  l'absence de scène, fais en sorte que la carte s'affiche proprement sans
  dessin, et dis comment.
- Le lien « projet suivant » en bas des pages : garde le comportement de la
  paire (UserVoice ↔ Audit contenu) ; la page matrice renvoie vers
  UserVoice.

## Les interdits

C1 à C8 du `CONTRAT.md` : aucun prénom, aucune évaluation, aucun niveau
attribué au PO, l'employeur jamais nommé hors « À propos ». Tu **ne touches
pas aux tests** : si un test doit connaître les nouvelles pages (les
jumelles, l'accessibilité suivent une liste de pages), dis-le dans ton
rapport, un autre agent l'écrira. Ne touche pas à `src/components/scene/`
ni à `ops/images/` (un autre chantier dessine la scène), ni à
`src/i18n/publication.ts`.

## La preuve attendue

`npx astro build --force --outDir .dist-0061` puis `DIST=.dist-0061 npm test`
(`fail 0`) ; les deux nouvelles pages dans le build, leur `<head>` (title,
canonical, hreflang, og), la carte à part sur les deux accueils, l'image et
le PDF dans `.dist-0061` ; poids du PDF ; sortie du vérificateur. Vérifie
dans le navigateur intégré (ton propre onglet, `tabs_create`, serveur de dev
sur 4321, vide `.astro/data-store.json` et relance si le schéma a changé et
que la page est en erreur ; si tu dois relancer le serveur, dis-le) que la
visionneuse ouvre l'extrait et la grille complète, et que le lien PDF
télécharge. Supprime `.dist-0061`. Ne commite rien.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
