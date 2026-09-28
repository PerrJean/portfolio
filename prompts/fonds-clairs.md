# Brief — fonds clairs et contour du bouton secondaire (registre/0013)

Une **planche de choix**, pas une maquette. Jean aime le crème et l'aube,
voudrait une aube plus claire, et demande d'autres teintes voisines. Il se
demande aussi si un contour bleu sur les boutons est une bonne idée.

## La palette « Terre et ciel » (fixée)

| Rôle | Hex | Sens, et seulement celui-là |
|---|---|---|
| Encre | #2A1F1A | texte, traits, bonhommes |
| Lumière | #F2A33A (ambre) | soleil, points ; jamais de texte |
| Action | #B54E19 (orange) | boutons et liens, sur tous les fonds |
| Information | #5E7488 (ardoise) | cadres de capture, schémas |

Police unique : **Atkinson Hyperlegible Next** (800 titres et chiffres, 700
libellés en capitales, 400 texte). Boutons à angles droits. Le point ambre
se place **devant** le libellé : en permanence sur le lien tertiaire, au
survol sur le principal et le secondaire, dans un espace réservé.

## Bloc 1 — Huit fonds

Huit tuiles (grille 4 × 2, environ 330 × 460). Chaque tuile : le fond ; le
soleil ambre et deux points ; un bâtiment au trait fin ; « 01 » en 120 px ;
le titre « Je bâtis sur des hypothèses. » ; deux lignes de texte ; un
bouton principal orange (texte blanc) ; un lien tertiaire précédé du point.
Sous la tuile, le nom, le hex, puis les contrastes (déjà calculés, à écrire
tels quels) : encre / lien orange / ardoise.

1. **Blanc lumière** #FFFCF8, référence — 15,7 / 5,05 / 4,74
2. **Crème** #F6EFE3, référence — 14,0 / 4,52 / 4,24
3. **Aube** #FBF1EA, référence — 14,4 / 4,64 / 4,36
4. **Aube claire** #FDF6F0 — 15,0 / 4,82 / 4,53. « L'aube, en plus
   lumineux. »
5. **Coquille** #FBF8F1 — 15,1 / 4,87 / 4,57. « Un blanc cassé à peine
   chaud, presque neutre. »
6. **Lin** #FAF5EC — 14,8 / 4,75 / 4,47. « Un crème allégé, plus textile
   que papier. »
7. **Ivoire chaud** #FEFAF2 — 15,4 / 4,96 / 4,66. « Entre le blanc et le
   crème, légèrement doré. »
8. **Pêche pâle** #FFF6EF — 15,0 / 4,84 / 4,55. « Une aube encore plus
   claire, un soupçon de rose. »

En pied de bloc, une ligne : « L'ardoise ne porte du texte qu'à partir de
24 px sur les fonds où elle reste sous 4,5:1. »

## Bloc 2 — Le contour du bouton secondaire

Sur fond #FFFCF8, trois barres d'actions identiques (principal orange plein,
secondaire à contour, tertiaire lien avec point), seul le contour et le
texte du secondaire changent. Au repos et au survol.

- **Contour orange** #B54E19. Pourquoi : la même famille que le principal,
  la hiérarchie tient par le plein et le vide. Pourquoi pas : beaucoup
  d'orange quand les deux boutons sont côte à côte.
- **Contour encre** #2A1F1A. Pourquoi : sobre, l'orange reste réservé au
  bouton principal, la hiérarchie devient évidente. Pourquoi pas : moins
  chaleureux.
- **Contour ardoise** #5E7488. Pourquoi : un contrepoint froid, élégant.
  Pourquoi pas : l'ardoise veut dire « information », pas « action » ; un
  bouton bleu rappelle aussi le lien par défaut des navigateurs.

## Format

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe**, égale au
`$preview` ; flex ou grid avec `gap` ; le bloc `<script type="text/x-dc"
data-dc-script>` toujours présent ; pas d'`innerHTML` ; un seul `<link>`
Google Fonts `css2` (Atkinson Hyperlegible Next 400;700;800, IBM Plex Sans
400;600 pour les libellés de la planche) ; tout en SVG inline ; pas
d'emoji. Planche neutre : fond #F1F2F4, libellés IBM Plex Sans gris foncé.
1440 de large, hauteur selon le contenu. Survol réel en CSS `:hover` dans
`<helmet>`, en plus de l'état dessiné.

**Ne publie rien, ne lis rien d'autre, ne démarre aucun serveur, ne fais pas
de capture.** Écris le fichier, puis rends compte : `w` × `h` exacts et tout
écart au brief.
