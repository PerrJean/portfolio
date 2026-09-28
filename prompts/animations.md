# Brief — trois esquisses d'animation (registre/0014)

Trois **esquisses**, pas des animations finies : assez pour que Jean sente
le mouvement et juge la complexité. Chacune doit rester **simple à intégrer**
ensuite dans un site statique Astro.

## Le système visuel (fixé)

- Fond **ivoire chaud #FEFAF2**. Encre **#2A1F1A** (texte, traits,
  bonhommes). Lumière **ambre #F2A33A** (soleil, points, jamais de texte).
  Action **orange #B54E19** (boutons, liens). Information **ardoise
  #5E7488** (cadres de capture, schémas).
- Police unique **Atkinson Hyperlegible Next** : 800 titres et chiffres,
  700 libellés en capitales, 400 texte.
- **Bâtiment au trait fin** (1,5 px, encre), géométrique : fondations,
  étages carrés, un étage en pointillés au sommet. Sur les pages projet, il
  vit dans une colonne **1 : 4** (environ 240 px pour 960 de contenu),
  collée à l'écran pendant la lecture.
- **Bonhommes** ronds, adultes, sans visage, silhouettes pleines à l'encre.
  Le leader porte des **lunettes rondes** (anneau et branche, de profil) ;
  il n'est jamais plus grand, jamais devant, ne pointe jamais : il porte
  avec l'équipe, décide au milieu d'elle, passe la main.
- Mouvement **posé** : lent, sûr, une seule chose bouge à la fois ; pas de
  rebond élastique, pas de clignotement. Tout s'arrête sous
  `prefers-reduced-motion: reduce`, qui montre l'état final.

## Ce que chaque esquisse contient

Un artboard de **1440 × 900** : à gauche (environ 1000 px), la scène animée ;
à droite (environ 360 px), une fiche sobre en IBM Plex Sans :

- **Ce que ça raconte** (deux lignes) ;
- **Où ça vit** (quelle page, à quel moment) ;
- **Comment ça se code** : la technique, un ordre de grandeur de lignes, et
  la dépendance éventuelle ;
- **Complexité** : faible, moyenne ou élevée, avec une phrase de pourquoi ;
- **Sans animation** : ce que voit la personne qui a coupé les animations.

Si l'animation dépend du défilement, l'artboard est **interactif** : un vrai
curseur `<input type="range">` avec son `<label>` « Progression de
lecture », qui pilote l'état par `setState`, et un bouton « Rejouer ». Si
elle se joue au chargement, une animation CSS en boucle lente (pause de 2 s
entre deux passages) et un bouton « Rejouer ».

## Format

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe** 1440 ×
900, égale au `$preview` ; flex ou grid avec `gap` ; le bloc `<script
type="text/x-dc" data-dc-script>` toujours présent, classe `Component
extends DCLogic` ; les valeurs pilotées par l'état passent par
`renderVals()` (un trou `{{ }}` de style est permis pour une valeur vivante) ;
pas d'`innerHTML` ; **un seul** `<link>` Google Fonts `css2` **dans
`<helmet>`** (Atkinson Hyperlegible Next 400;700;800, IBM Plex Sans
400;600) ; animations en CSS `@keyframes` dans `<helmet><style>` ; tout en
SVG inline ; pas d'emoji ; pas de bibliothèque externe.

**Ne publie rien, ne lis rien d'autre, ne démarre aucun serveur, ne fais pas
de capture.** Écris le fichier, puis rends compte : `w` × `h`, si
l'artboard est interactif, et tout écart au brief.
