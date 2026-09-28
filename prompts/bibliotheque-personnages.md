# Brief — la bibliothèque de personnages (registre/0018)

Une **planche de référence** : les personnages et leurs poses, dessinés une
fois, pour être réutilisés dans toutes les scènes. Les animations
**échangent des poses figées** (comme en stop-motion) et **déplacent** les
personnages sur la ligne de sol ; elles n'articulent aucun membre. Le seul
élément qui pivote est le marteau, au poignet.

## La morphologie, unique pour tous

- Vue de **profil**, tournée vers la droite (on retourne par `scale(-1,1)`
  si besoin).
- **Tête** : un disque. **Corps** : une gélule verticale. **Bras et
  jambes** : des traits épais aux bouts arrondis. Silhouette pleine à
  l'encre **#2A1F1A**, un fin liseré ivoire #FEFAF2 là où un bras passe
  devant le corps.
- **Unisexe** : même taille pour tous (environ 120 px), pas de cheveux, pas
  de chignon, pas de vêtement distinctif, pas de visage.
- **Jean** : le même personnage, avec des **lunettes rondes orange
  #B54E19** vues de profil (un anneau et une branche, jamais comme des
  yeux). Rien d'autre ne le distingue.
- Adulte et posé, jamais enfantin : proportions d'environ 6 têtes, pas de
  grosse tête.

## Les poses (chacune dessinée seule, dans un cadre de 160 × 200)

1. Debout.
2. Marcher, temps 1.
3. Marcher, temps 2.
4. Penché (vers l'avant, comme au-dessus d'un plan).
5. Bras tendus devant (pour poser le plan).
6. Plan roulé sous le bras.
7. Poutre sur l'épaule.
8. Sautillement d'impatience (debout, talons levés, bras un peu écartés).
9. Taper du marteau, temps 1 (marteau levé).
10. Taper du marteau, temps 2 (marteau abaissé).

Chaque pose porte son numéro et son nom. Les poses 1, 4 et 5 sont aussi
montrées **en version Jean**, avec les lunettes.

## Les objets

Le plan roulé ; le plan déroulé (un rectangle ardoise #5E7488 au trait, avec
trois lignes) ; le tréteau ; la poutre ; le marteau ; la dalle et la ligne
de sol.

## La séquence du script 1, image par image

Sous la bibliothèque, une bande de **cinq vignettes** (environ 256 × 180
chacune) qui montre le script de l'accueil, sans animation, pour vérifier
qu'il tient en 2D :

1. **Repos** : Jean à gauche, près du tréteau, plan roulé sous le bras
   (pose 6). Les trois autres près de la dalle, à droite, l'un avec la
   poutre sur l'épaule (pose 7), les deux autres debout.
2. **Jean pose le plan** (pose 5) ; le plan est déroulé à moitié sur le
   tréteau.
3. **L'équipe s'impatiente** : les deux mains libres en pose 8, le porteur
   reste en pose 7.
4. **Les deux mains libres marchent vers Jean** (poses 2 et 3) ; Jean est
   penché (pose 4).
5. **On regarde ensemble** : Jean et les deux autres penchés sur le plan
   (pose 4), côte à côte, sans se chevaucher ; le porteur se balance (pose
   8) ; un point ambre #F2A33A au-dessus du plan.

Chaque vignette porte une légende d'une ligne et son temps (0 s, 0,6 s,
1,0 s, 1,4 s, 2,2 s).

## Format

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe**, égale au
`$preview` ; flex ou grid avec `gap` ; le bloc `<script type="text/x-dc"
data-dc-script>` toujours présent ; pas d'`innerHTML` ; **un seul**
`<link>` Google Fonts `css2` **dans `<helmet>`** (Atkinson Hyperlegible
Next 400;700, IBM Plex Sans 400;600) ; tout en SVG inline ; pas d'emoji.
Fond de planche #F1F2F4, cadres de pose sur ivoire #FEFAF2, libellés en IBM
Plex Sans gris foncé. 1440 de large, hauteur selon le contenu.

**Chaque pose est un `<g>` SVG autonome avec un `id` clair** (`pose-debout`,
`pose-marche-1`, `jean-penche`…), dessiné autour d'une même origine (les
pieds au point 0,0 du cadre), pour qu'on puisse l'extraire telle quelle dans
le site. **Pas d'animation sur cette planche.**

**Ne publie rien, ne lis rien d'autre, ne démarre aucun serveur, ne fais pas
de capture.** Écris le fichier, puis rends compte : `w` × `h`, la liste des
`id`, et tout écart au brief.
