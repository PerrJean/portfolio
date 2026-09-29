# Brief — la scène, troisième passe (registre/0024)

Retouches de Jean après avoir vu la scène (`src/components/scene/Scene.astro`
et `src/components/scene/poses.ts`, les deux fichiers de ton prompt). Mêmes
règles qu'avant : poses figées échangées et déplacements, une chose à la
fois, sans rebond ; seul le marteau pivote ; couleurs en variables CSS ;
`prefers-reduced-motion` coupe tout ; 500 lignes au plus par fichier.

## Les personnages

1. **Plus d'effet « jupe ».** La silhouette ne doit jamais évoquer une robe :
   le corps s'arrête nettement aux hanches, sans s'évaser, et les deux
   jambes partent **séparées** dès les hanches, avec un petit espace entre
   elles en haut des cuisses. Vérifie aussi que le liseré ivoire des bras ne
   dessine pas un contour de jupe. Applique la correction à **toutes** les
   poses, Jean compris, sans changer leur taille ni leur origine aux pieds.
2. **Une nouvelle pose, « lancer la poutre »** : les deux bras levés au-dessus
   de l'épaule, mains ouvertes, comme juste après avoir poussé la poutre vers
   le haut. Même morphologie que les autres.

## L'impatience (par défaut, environ 2 s, une fois)

1. **Le sauteur A regarde vers la droite** au début, comme B, vers le reste de
   l'équipe. Il se retourne vers Jean seulement quand il se met à marcher
   (séquence 2), par bascule de miroir.
2. **Le marteau de B, un peu plus petit** : environ 1,2 fois la taille
   d'origine au lieu de 1,4. **Le tour se termine sur une position logique :
   la tête du marteau vers le haut**, le manche dans la main, comme un outil
   qu'on tient droit. Au repos aussi, le marteau est tenu tête en haut.
3. **Le porteur lance sa poutre plus haut** (environ 24 px au lieu de 12) et
   **son bras bouge** : il passe en pose « lancer la poutre » pendant
   l'envol, puis revient en pose « poutre sur l'épaule » au moment où il la
   rattrape.

## Au survol : on regarde le plan

Le porteur ne pose plus sa poutre sur la dalle en restant sur place :
1. Il **lance la poutre à côté de lui** (pose « lancer », la poutre retombe au
   sol, à plat, près de lui, sur la dalle ou juste à côté).
2. Puis il **marche jusqu'à la table**, et se place **derrière le coéquipier
   au marteau**, penché lui aussi vers le plan (pose penché), sans
   chevaucher personne de façon illisible.

Les autres positions finales ne changent pas (Jean penché à gauche, A
derrière le tréteau, B en face de Jean) ; le point ambre se pose toujours sur
le plan, en dernier. Garde l'ordre : Jean ouvre le plan, les deux mains
libres arrivent, le porteur lance sa poutre puis arrive, point ambre.
Allonge la séquence de 0,5 s au plus si nécessaire.

## La preuve attendue

`npx astro build --outDir .dist-v3` réussit ; `DIST=.dist-v3 npm test` :
rends les deux sorties (aucun `fail`). Supprime `.dist-v3`. Ne touche à aucun
autre fichier, ne commite rien, n'ouvre aucun navigateur. Liste les poses
modifiées et la nouvelle.

Environnement : Windows, Git Bash ; Node s'ajoute au PATH par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
