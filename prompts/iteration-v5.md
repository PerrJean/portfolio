# Brief — itération v5 : accents, boutons, titres, ratio du bâtiment (registre/0011)

Quatre **planches de choix**, pas des maquettes. Chaque candidat porte son
« pourquoi » et son « pourquoi pas », écrits sur la planche, tels quels.

## Ce qui est décidé

- Jean : rigoureux, leader, bâtisseur à l'écoute ; ton posé, avec une
  touche de chaleur. Du **carré** (les projets, l'action) et du **rond**
  (l'humain).
- **La lisibilité passe avant tout.** Le bâtiment ne s'utilise pas partout :
  seulement là où il ne coûte rien à la lecture.
- **Texte courant : Atkinson Hyperlegible Next.** Gros chiffres : dans la
  police de titre, graisse forte, une seule famille.
- **Titres en gras franc**, comme une grotesque grasse classique : pas de
  maigre, pas de condensé.
- **Libellés** distincts du texte : ils prennent la police de titre, en
  petit.
- Fonds retenus pour comparer : blanc lumière #FFFCF8, crème #F6EFE3,
  aube #FBF1EA. Encre #1F2430.
- Jamais de dégradé, de fond noir, d'emoji ; rien d'enfantin.

## Format commun

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe**, égale au
`$preview` ; flex ou grid avec `gap` ; le bloc `<script type="text/x-dc"
data-dc-script>` toujours présent ; pas d'`innerHTML` ; un seul `<link>`
Google Fonts `css2` dans `<helmet>` ; tout en SVG inline ; pas d'emoji.
Planche neutre : fond #F1F2F4, libellés en IBM Plex Sans, gris foncé,
contraste 4,5:1. 1440 de large, hauteur selon le contenu. Dans les tuiles,
le texte est en Atkinson Hyperlegible Next et les titres en Schibsted
Grotesk 800, sauf sur la planche des titres.

**Ne publie rien, ne lis rien d'autre, ne démarre aucun serveur, ne fais pas
de capture.** Écris les fichiers, puis rends compte : `w` × `h` exacts de
chacun, tout écart au brief, les contrastes calculés quand on les demande.

---

## Planche 1 — Accents (`V5-accents.dc.html`)

Jean demande si le soleil doit être orange. Quatre accents en lignes, trois
fonds en colonnes : **douze tuiles** (environ 400 × 420). Chaque tuile : le
fond ; le disque de soleil dans l'accent ; trois petits points ; « 01 » en
très grand à l'encre ; une ligne de titre ; une ligne de texte ; un lien
« Voir le projet » dans la **version lisible** de l'accent ; un bouton
principal ; un bâtiment au trait fin dont un pan porte l'accent.

**Calcule le contraste** de la version lisible sur chaque fond : il faut
4,5:1 pour un lien. Si le hex ne suffit pas, fonce-le jusqu'à 4,5:1 et écris
la valeur retenue sous la tuile.

En tête de chaque ligne, le nom, les hex, le pourquoi et le pourquoi pas :

- **Orange soleil** · soleil #EE7A2E · lisible #B9501A. Pourquoi : la
  lumière, le plus vivant, le plus « soleil ». Pourquoi pas : l'accent chaud
  le plus vu sur les sites récents.
- **Brique terracotta** · soleil #C0563A · lisible #9E4128. Pourquoi : la
  matière du bâtiment, posée, adulte ; le lien direct avec « bâtisseur ».
  Pourquoi pas : moins lumineux, le soleil devient terre.
- **Ambre safran** · soleil #F2A33A · lisible #9A5A0E. Pourquoi : le plus
  solaire, la lumière du matin, très chaleureux. Pourquoi pas : trop clair
  pour du texte, il vit forcément avec une version foncée.
- **Duo lumière et matière** · soleil et points en ambre #F2A33A · liens et
  boutons en brique #9E4128. Pourquoi : deux voisins chauds, la lumière qui
  éclaire et la matière qui bâtit. Pourquoi pas : deux accents à
  discipliner.

## Planche 2 — Boutons et point orange (`V5-boutons.dc.html`)

Trois blocs, sur fond #FFFCF8, accent provisoire orange #B9501A.

1. **La forme.** Trois boutons principaux côte à côte, au repos : pilule
   (rayon plein), angle doux (rayon 4 px), carré (rayon 0). Libellés :
   pilule « Pourquoi : familier. Pourquoi pas : le standard des sites SaaS,
   et le rond y perd son sens. » ; angle doux « Pourquoi : net sans être
   dur. Pourquoi pas : un compromis qui ne dit rien. » ; carré « Pourquoi :
   le carré, c'est l'action et les projets ; le rond reste réservé à
   l'humain. Pourquoi pas : peut sembler sec sans le point. »
2. **Le point, à l'usage.** Une même barre d'actions (principal, secondaire,
   tertiaire) en trois versions, chacune au repos **et** au survol :
   (a) point sur les trois, toujours ; (b) point sur le tertiaire toujours,
   sur le principal et le secondaire au survol seulement, où il se pose
   sur l'angle ; (c) aucun point, un soulignement au survol. Libellés :
   (a) « Trop : le point ne distingue plus rien. » (b) « Le point devient un
   geste : il apparaît quand on s'approche. » (c) « Sobre, mais sans
   signature. »
3. **La règle du point.** Deux fragments de page côte à côte (une accroche,
   un paragraphe, une liste, des liens) : à gauche, le point partout (puces,
   titres, liens, logo) ; à droite, le point **à un seul sens** : la page ou
   la langue courante, le lien tertiaire, le survol. Libellé : « Le point de
   couleur est devenu un marqueur courant des sites récents. Il ne garde
   une signature que s'il n'a qu'un sens, et pas plus d'un ou deux par
   écran. »

## Planche 3 — Titres (`V5-titres.dc.html`)

Six panneaux (grille 3 × 2), fond #FFFCF8. Chaque panneau : le titre « Je
bâtis sur des hypothèses : j'écoute, je teste, puis je dose l'effort. » en
56 px gras ; « 01 » en 200 px ; un intertitre en 32 px ; un libellé en
petites capitales 13 px espacées (« ACTE I · ÉCOUTER ») dans la police de
titre ; puis un paragraphe de quatre lignes en **Atkinson Hyperlegible
Next** 18 px. Enfin le nom, le pourquoi et le pourquoi pas.

- **Schibsted Grotesk 800.** Pourquoi : celle que Jean lit le mieux ; en
  gras, elle tient les gros titres. Pourquoi pas : choisie d'office par les
  IA, et proche d'Atkinson : deux grotesques voisines peuvent se gêner.
- **Archivo 800, largeur 110.** Pourquoi : un gras large et assis, des
  chiffres carrés ; le contraste avec Atkinson est net. Pourquoi pas : trop
  large, elle fait affiche.
- **Red Hat Display 900.** Pourquoi : du rond et du carré dans la lettre,
  chaleureuse en gras. Pourquoi pas : l'identité d'une marque connue.
- **Host Grotesk 800.** Pourquoi : récente, peu vue, un gras franc.
  Pourquoi pas : peu éprouvée.
- **Libre Franklin 800.** Pourquoi : le gras de Franklin Gothic, une
  autorité posée, de beaux chiffres. Pourquoi pas : un parfum de presse.
- **Atkinson Hyperlegible Next 800, seule.** Pourquoi : une seule famille,
  la cohérence totale, l'accessibilité comme signature. Pourquoi pas : en
  très grand, ses formes différenciées se voient et peuvent surprendre.

Un seul `<link>` : Archivo avec son axe (`Archivo:wdth,wght@62..125,400..900`),
les autres en graisses fixes. Si une graisse manque, prends la plus proche
et dis-le.

## Planche 4 — Ratio du bâtiment (`V5-ratio.dc.html`)

Sur une page projet, le bâtiment vit dans une colonne étroite, **collée** au
défilement, et se construit pendant qu'on lit. Trois vignettes de la même
page projet réduite (environ 440 × 760, soit une page de 1440 à l'échelle),
côte à côte, zone utile 1200 px à l'échelle :

- **1 : 3** — bâtiment 300, contenu 900. « Pourquoi : le bâtiment se lit
  bien, il raconte. Pourquoi pas : il prend un quart de la page. »
- **1 : 4** — bâtiment 240, contenu 960. « Pourquoi : le contenu domine, le
  bâtiment accompagne. Pourquoi pas : les détails du dessin doivent rester
  simples. »
- **1 : 5** — bâtiment 200, contenu 1000. « Pourquoi : le plus de place au
  contenu. Pourquoi pas : le bâtiment devient un pictogramme. »

Dans chaque vignette : un titre, un bloc de texte en lignes grises, une
capture en cadre, le bâtiment au trait dans sa colonne, à mi-construction.

Dessous, **au téléphone** : trois bandeaux de 390 × 120 montrant le bâtiment
devenu **indicateur de lecture** dans l'en-tête (fondations, mi-hauteur,
terminé). Libellé : « Au téléphone, pas de colonne : un petit bâtiment dans
l'en-tête qui grandit avec la lecture. »
