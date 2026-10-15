# Brief — du relief sur l'accueil (registre/0089)

Le portfolio de Jean (site statique Astro 7, FR par défaut, EN en miroir sous
`/en/`) reçoit cinq retouches de relief, **validées par Jean** sur une
maquette. Tu les portes dans le site. Deux fichiers à lire d'abord, hors du
dépôt : la maquette validée, une feuille posée par-dessus `dist/` et le
script de son panneau —
`C:/Users/JEANPE~1/AppData/Local/Temp/claude/C--Users-Jean-PERRIER-AuditContenu/92ad5454-895c-455c-bb53-093f784c6edb/scratchpad/maquette/maquette.css`
et `maquette.js` dans le même dossier. Le registre/0089 dit le pourquoi et
les valeurs retenues.

## Ce que tu construis

La maquette est une **surcouche** (classes `i1`…`i5` sur `<html>`, un
déplacement de nœud en JavaScript). Le site n'en garde que le **résultat**,
sans classe d'activation, sans panneau, sans JavaScript :

1. **La bande du récit** : 03, 04, 05 sur le sable, pleine largeur d'écran
   (sans barre de défilement horizontale). La Matrice sort de la grille du
   trio et passe **sous** la bande, en projet à part, par la structure
   (`src/components/Parcelles.astro`, `src/contenu/projets.ts`) et non par un
   déplacement de nœud. Elle reprend la mise en page `parcelle--a-part`
   existante, sans le filet du haut. La colonne vide à droite de l'Audit
   reste. Au téléphone, la bande enveloppe les trois cartes empilées.
2. **Le pied de page sombre** sur **toutes** les pages
   (`src/components/PiedDePage.astro`, et ce que la bascule FR | EN y
   affiche) : contrôler que le contenu des pages garde un écart avant lui.
3. **Le sol des dessins** : cartes de l'accueil et équipe de l'accroche,
   teinte plus foncée dans la bande.
4. **La surface au survol et au focus** des cartes, sans décaler la mise en
   page (la maquette compense par une marge négative) ; le contour de focus
   clavier existant reste visible.
5. **Les numéros des cartes en ardoise.** L'option « contour » de la
   maquette est écartée : ne la porte pas.

Les nouvelles couleurs entrent dans `src/styles/jetons.css`, **une couleur,
un sens**, commentées comme leurs voisines, et la liste des paires de
`tests/contrastes.test.mjs` doit pouvoir les lire (ne modifie pas ce test :
décris les paires à y ajouter). `prefers-reduced-motion` : la transition du
survol s'efface comme les autres.

## Règles

Aucune bibliothèque, aucune requête tiers, aucun cookie. Module 500 lignes au
plus. Commentaires en français, au ton du code voisin, avec `registre/0089`.
Ne touche à aucun texte du contenu. N'écris **pas les tests** : un autre
agent s'en charge ; décris en fin de réponse ce qu'il doit vérifier.

## Ce que tu rends

`npm run build` et `npm test` passent. Réponse finale : les fichiers touchés,
les écarts à la maquette s'il y en a et pourquoi, la vérification faite dans
`dist/` (pas supposée) que la Matrice est hors de la bande en FR et en EN, et
la liste des vérifications pour l'agent des tests. Ne commite rien, ne laisse
aucun serveur ouvert, pas de `git stash`. Environnement : Windows, Git Bash,
Node par `export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
