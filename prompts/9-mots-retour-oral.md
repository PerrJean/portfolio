# Brief — les mots du schéma « Mises en situation » (registre/0091)

Les mots du schéma d'un échange viennent de la recherche (« Signal »,
« Indice », « Modèle ») et ne disent pas au lecteur les étapes du parcours
de l'apprenant. Jean a choisi les nouveaux mots : tu les poses, sans en
inventer d'autres. Trois fichiers à modifier, rien d'autre.

## Ce que tu lis

1. `src/components/schemas/echange-oral.mjs` : le schéma, FR et EN.
2. `src/contenu/projets/fr/mises-en-situation.md` et sa jumelle
   `src/contenu/projets/en/speaking-practice.md` (lignes 35-39 et 63).

## Les remplacements

**Schéma, FR** (`TEXTES.fr`) :
- `entree.titre` « L’entrée » → « La consigne » ;
  `conversation.titre` « La conversation » → « L’échange avec l’IA » ;
  `retour.titre` « Le retour en trois temps » → « Le retour ».
  Pas de numéro devant ces titres : les trois temps du retour portent déjà
  1, 2, 3.
- Les trois temps : « Signal » → « Bilan de la mission » ; « Indice » →
  « Une piste pour progresser » ; « Modèle » → « Un exemple de
  formulation ». Les textes des vignettes ne changent pas.
- `lu` (la liste lue par les lecteurs d'écran) suit : « La consigne : … »,
  « L’échange avec l’IA. L’IA : », « Le retour, en trois temps, sur un seul
  critère, le vocabulaire. »

**Schéma, EN** (`TEXTES.en`) : « Getting started » → « The brief » ;
« The conversation » → « The exchange with the AI » ; « Three-step
feedback » → « The feedback » ; « Signal » → « Mission check » ; « Hint » →
« A tip to improve » ; « Model » → « An example phrasing ». `lu` suit.

**Page FR**, les trois puces de « Le retour en trois temps » (le titre de
section reste) :
- « Le bilan de la mission dit si la tâche est accomplie, sans corriger. »
- « La piste pour progresser attire l’attention sur un passage, sans donner
  la solution, pour que l’apprenant trouve lui-même. »
- « L’exemple de formulation reste à la portée de l’apprenant : ce n’est
  pas celle d’un locuteur natif. »
- Ligne 63 : « Il tient en trois temps : un bilan de la mission, une piste
  qui laisse l’apprenant trouver seul, puis un exemple de formulation. »

**Page EN**, même logique : « The mission check says whether the task was
completed, without correcting anything. » ; « The tip to improve draws
attention to one passage… » ; « The example phrasing stays within the
learner’s reach, not the one a native speaker would use. » ; ligne 63 :
« a mission check, a tip that lets learners find the answer themselves,
then an example phrasing. »

Les noms de variables du code (`signal`, `indice`, `modele`) peuvent
rester : ils ne s'affichent pas. Ne renomme rien d'autre.

## La preuve

- `grep` des anciens mots affichés (Signal, Indice, Modèle, Hint, Model,
  « L’entrée », « Getting started ») dans les trois fichiers : il ne reste
  que des noms de variables.
- `npx astro build --outDir .dist-91` puis `DIST=.dist-91 npm test` : vert.
  Supprime `.dist-91` ensuite. Un autre chantier ajoute en même temps une
  page sous `public/usecase/` : un échec qui ne porte que sur `usecase/`
  n'est pas le tien, signale-le sans le corriger.
- La largeur des vignettes : les nouveaux titres sont plus longs. Lance
  `dev.cmd` ou `npm run preview`, regarde le schéma à 375 px et à 1280 px,
  et dis si un titre déborde ou coupe mal.

Ne touche ni à `public/`, ni à `tests/`, ni au registre : un autre chantier
travaille en même temps dans `public/` et `tests/`. Pas de `git stash`. Ne
commite rien. Rapport de 150 mots au plus. Environnement : Windows,
Git Bash.
