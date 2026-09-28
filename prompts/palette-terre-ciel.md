# Brief — la palette « Terre et ciel » sur trois fonds (registre/0012)

Une **planche de choix** : la palette que Jean a composée, appliquée à trois
fonds, pour qu'il choisisse le fond. Pas une maquette de page.

## La palette, et le sens de chaque couleur

Chaque couleur n'a **qu'un sens**, c'est la règle qui les fait tenir
ensemble :

| Rôle | Hex | Sens, et seulement celui-là |
|---|---|---|
| Encre | #2A1F1A (brun presque noir) | le texte, les traits du bâtiment, les bonhommes |
| Lumière | #F2A33A (ambre safran) | le soleil et les points ; jamais de texte |
| Action | #B9501A (orange) ; #B54E19 sur crème et aube | les boutons et les liens |
| Information | #5E7488 (ardoise claire) | les cadres de capture, les traits de schéma, une étiquette ; en texte, seulement en 24 px et plus |
| Filets | #E6DCCF | séparateurs, sol du bâtiment |

Contrastes déjà calculés : encre 14 à 15,7:1 sur les trois fonds ; orange
#B9501A 4,86:1 sur blanc, #B54E19 4,52:1 sur crème et 4,64:1 sur aube ;
texte blanc sur le bouton orange 4,86:1 ; ardoise 4,74:1 sur blanc, 4,24:1
sur crème, 4,36:1 sur aube (d'où la règle des 24 px) ; ambre 1,8 à 2:1
(décoratif seulement).

## Ce qu'on montre

Trois colonnes, une par fond : **Blanc lumière #FFFCF8**, **Crème
#F6EFE3**, **Aube #FBF1EA**. Dans chaque colonne, de haut en bas, un même
contenu :

1. **Une mini-accroche** (environ 440 × 520) : le soleil ambre qui se lève
   derrière un bâtiment au trait (encre), trois points ambre ; le titre
   « Je bâtis sur des hypothèses : j'écoute, je teste, puis je dose
   l'effort. » ; une ligne de texte ; un bouton principal.
2. **La barre d'actions** : bouton principal (orange plein, texte blanc,
   angles droits), secondaire (contour orange, texte orange), tertiaire
   (lien orange **précédé** d'un point ambre de 8 px). Au survol, le point
   apparaît **devant** le libellé du principal et du secondaire, dans un
   espace déjà réservé (rien ne bouge). Montre le repos et le survol.
3. **Un fragment de page projet** : un libellé « ACTE I · ÉCOUTER », un
   paragraphe, un cadre de capture au trait ardoise avec la légende en
   dessous, un petit schéma de quatre étapes aux traits ardoise, un point
   ambre sur l'étape humaine.
4. **Trois bonhommes** à l'encre, dont le leader aux lunettes rondes
   **orange #B9501A** (vues de profil, un anneau et une branche), qui passe
   un outil à un coéquipier.

Sous chaque colonne, le pourquoi et le pourquoi pas :

- **Blanc lumière.** Pourquoi : le fond s'efface, l'ambre et l'orange
  portent toute la chaleur ; le plus vivant et le plus net avec l'encre
  brune. Pourquoi pas : sans assez de soleil, il retombe dans le sobre.
- **Crème.** Pourquoi : chaleureux d'emblée, accordé à l'encre brune.
  Pourquoi pas : brun sur crème, l'ensemble tire vers le « papier ancien » ;
  c'est aussi le fond réflexe des sites IA.
- **Aube.** Pourquoi : la chaleur d'un lever de soleil, plus lumineuse que le
  crème, en accord avec l'ambre. Pourquoi pas : les écarts avec l'ambre et
  l'orange sont faibles ; il faut un soleil franc.

## Typographie

Titres et « 01 » : **Archivo 800, largeur 108** (axe `wdth`). Texte :
**Atkinson Hyperlegible Next** 400. Libellés : Archivo 700 en capitales
espacées, 13 px. Un seul `<link>` : `Archivo:wdth,wght@62..125,400..900`,
`Atkinson Hyperlegible Next:wght@400;700`, `IBM Plex Sans:wght@400;600`
pour les libellés de la planche.

## Format

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe**, égale au
`$preview` ; flex ou grid avec `gap` ; le bloc `<script type="text/x-dc"
data-dc-script>` toujours présent ; pas d'`innerHTML` ; tout en SVG inline ;
pas d'emoji. Planche neutre : fond #F1F2F4, libellés en IBM Plex Sans gris
foncé, 4,5:1. 1440 de large, hauteur selon le contenu. Le survol peut être
réel (CSS `:hover` dans `<helmet>`) en plus de l'état survolé dessiné.

**Ne publie rien, ne lis rien d'autre, ne démarre aucun serveur, ne fais pas
de capture.** Écris le fichier, puis rends compte : `w` × `h` exacts et tout
écart au brief.
