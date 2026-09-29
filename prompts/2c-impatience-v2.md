# Brief — l'impatience, rendue lisible (registre/0023)

Retouche du composant `src/components/scene/Scene.astro` (et, si besoin,
`src/components/scene/poses.ts`), les deux fichiers de ton prompt. Vue dans
le navigateur, l'impatience actuelle ne se lit pas : le sautillement se
limite à des talons levés, le marteau est trop petit, et 1,2 s passe
inaperçu. La séquence 2 (« on regarde le plan », au survol) ne change pas,
sauf les distances de marche (voir plus bas).

## La nouvelle impatience (environ 2 s, jouée une seule fois)

Une seule chose bouge à la fois, sans rebond élastique :

1. **0 à 0,6 s — le coéquipier A saute deux fois.** Il quitte vraiment le
   sol : la pose de sautillement **et** une translation verticale d'environ
   8 px vers le haut, deux fois, retour au sol entre les deux.
2. **0,6 à 1,3 s — le coéquipier B fait tourner son marteau.** B est
   désormais **tourné vers le porteur** (vers la droite), plus vers Jean :
   ils jouent ensemble. Le marteau est **plus grand** (environ 1,4 fois) et
   fait un tour complet autour du poignet, bien visible. Pendant le tour, un
   **arc de mouvement** (un trait courbe fin, encre à faible opacité, qui
   suit la tête du marteau) apparaît puis s'efface : l'ombre du geste.
3. **1,3 à 1,9 s — le porteur lance un peu sa poutre.** Il la soulève de son
   épaule d'environ 12 px, avec une légère rotation (quelques degrés), puis
   la rattrape sur l'épaule. Si la poutre fait partie du dessin de la pose,
   sépare-la en objet à part pour pouvoir l'animer, sans changer son
   apparence au repos.

## Les positions

- **Au repos, les deux coéquipiers A et B sont écartés** d'environ 12 à
  16 px de plus qu'aujourd'hui, pour ne plus se toucher ; le porteur se
  décale d'autant si besoin. Rien ne se chevauche.
- **La séquence 2 garde exactement ses positions finales** (A derrière le
  tréteau, B en face de Jean, la poutre sur la dalle) : recalcule seulement
  les distances de marche depuis les nouvelles positions de départ. B, qui
  regarde maintenant vers la droite au repos, se retourne vers Jean au début
  de sa marche (bascule de miroir, sans animation).

## Ce qui ne change pas

Déclenchement (la classe `joue` au chargement et à chaque entrée à l'écran,
jamais en boucle ; le script ajuste sa durée à la nouvelle impatience), la
règle `prefers-reduced-motion` (rien ne bouge), les couleurs en variables
CSS, `aria-hidden` sur le SVG, 500 lignes au plus par fichier.

## La preuve attendue

`npx astro build --outDir .dist-imp` réussit ; puis `DIST=.dist-imp npm
test` : rends les deux commandes et leurs sorties (les tests `todo` restent
`todo`, aucun `fail`). Supprime `.dist-imp`. Ne touche à aucun autre fichier,
ne commite rien, n'ouvre aucun navigateur.

Environnement : Windows, Git Bash ; Node s'ajoute au PATH par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
