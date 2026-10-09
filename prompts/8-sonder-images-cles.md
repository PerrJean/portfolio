# Brief — les images clés de la scène « sonder le terrain » (registre/0085)

Sur l'accueil du portfolio, chaque carte de projet a sa scène au trait,
animée au survol. La carte **UserVoice** (Jean a construit une « sonde » qui
réunit et classe les retours des apprenants) reçoit une nouvelle scène : **le
carottage**. Tu dessines ses **images clés fixes**, aucune animation, aucune
modification de `src/`. Deux fichiers à lire d'abord :
`src/components/scene/poses.ts` (poses et objets) et
`ops/images/fusion-scene/planche.mjs` (méthode, échelle, style d'une planche
validée).

## Le scénario (choix de Jean)

- **Repos** : Jean (lunettes rondes orange, voir `LUNETTES`) debout, une
  **longue tige de sondage** tenue à deux mains, verticale, pointe posée sur
  la ligne de sol. Sous la ligne de sol, **trois couches de terrain** en
  traits fins (lignes ondulées ou horizontales espacées), visibles en coupe.
- **Temps 1** : il enfonce la tige ; ses mains descendent sur la tige.
- **Temps 2** : la tige traverse les trois couches.
- **Temps 3** : il remonte la tige, au bout une **carotte** (un cylindre au
  trait, découpé en trois bandes qui reprennent les couches).
- **Fin** : il tient la carotte **à l'horizontale, à deux mains**, devant
  lui ; le **point ambre** se pose sur une des bandes (le sujet qui compte).

## Règles

- **Jamais un seul bras levé au-dessus de l'épaule**, à aucune image (deux
  mains pour tenir, bras à l'horizontale ou plus bas).
- Même trait, mêmes épaisseurs, même ligne de sol et même dalle que les
  autres cartes ; couleurs par les jetons ; décoratif.
- Ajoute les poses et objets nouveaux (tige, carotte, couches) dans le script
  de planche, sous une forme qu'on pourra reporter dans `poses.ts` ensuite.

## Ce que tu rends

`ops/images/uservoice-sonde/` : `planche.mjs`, une image SVG par temps
(`repos.svg`, `t1.svg`, `t2.svg`, `t3.svg`, `fin.svg`) et `planche.png`
(les cinq côte à côte, légendées). Regarde la planche avant de rendre.
Réponse finale : le chemin de la planche et deux lignes sur les choix faits.
Ne commite rien. Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
