# Brief — itération v4 : palettes, polices de texte, l'équipe et son leader (registre/0010)

Trois **planches de choix**, pas des maquettes. Chaque candidat porte son
« pourquoi » et son « pourquoi pas », écrits sur la planche, tels quels.

## Ce qu'on sait de la direction

Jean : rigoureux, leader, bâtisseur à l'écoute ; ton posé, avec une touche de
chaleur. Du **carré** (les projets) et du **rond** (l'humain ; ses lunettes
rondes). Un **soleil** orange en aplat, et son rappel en petits points
orange. Un **bâtiment** au trait qui se construit. De petits **bonhommes**
ronds et adultes : l'équipe. De très gros numéros, de gros titres. Jamais de
dégradé, de fond noir, d'emoji, rien d'enfantin, pas l'air d'un site vitrine
B2B.

## Format commun

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe**, égale au
`$preview` ; flex ou grid avec `gap` ; le bloc `<script type="text/x-dc"
data-dc-script>` toujours présent ; pas d'`innerHTML` ; un seul `<link>`
Google Fonts `css2` dans `<helmet>` ; pas d'image externe (tout en SVG
inline) ; pas d'emoji. Planche neutre : fond #F1F2F4, libellés en IBM Plex
Sans, gris foncé ; contraste des libellés 4,5:1. 1440 de large, hauteur
selon le contenu.

**Ne publie rien, ne lis rien d'autre, ne démarre aucun serveur, ne fais pas
de capture.** Écris le fichier, puis rends compte : `w` × `h` exacts, tout
écart au brief, et les contrastes calculés quand on te les demande.

---

## Planche 1 — Palettes (`V4-palettes.dc.html`)

Jean est attiré par le **blanc et le crème**, l'**aube** le tente. Le bleu
pâle proposé avant ne s'accordait pas à l'orange : un bleu très clair et
froid à côté d'un orange saturé, c'est un écart de température et de
saturation, pas une harmonie. Chaque palette ci-dessous suit une règle
d'harmonie nommée, et la règle **60 / 30 / 10** (fond / encre et neutres /
accent).

Six palettes. Pour chacune, une tuile d'environ 660 × 560 qui applique la
palette à une **même mini-accroche** : le fond ; un très gros « I » ; le
titre « Je bâtis sur des hypothèses. » ; une ligne de texte ; un lien
« Voir le projet » dans l'orange lisible ; un bouton à angles droits précédé
d'un petit disque orange ; le soleil en aplat ; trois points orange ; un
bâtiment au trait fin dont **une fenêtre ou un pan** porte la couleur
secondaire. Sous la tuile : les pastilles (hex, rôle), la règle d'harmonie,
puis le pourquoi et le pourquoi pas.

**Contrastes à calculer et à écrire sous chaque tuile** : encre sur fond ;
orange lisible sur fond (il doit atteindre **4,5:1**, car c'est un lien : si
le hex donné n'y arrive pas, fonce-le jusqu'à 4,5:1 et écris la valeur
retenue) ; soleil sur fond (décoratif, pas de seuil, mais note-le).

1. **Midi** · complémentaire désaturé. Fond #FFFCF8 · encre #1F2430 (bleu
   nuit) · soleil #EE7A2E · orange lisible #B9501A · secondaire #3E5A73
   (bleu ardoise) · filets #E6DFD4. Pourquoi : l'orange et le bleu sont
   complémentaires ; désaturé et profond, le bleu reste dans la famille de
   l'encre et ne se bat plus avec l'orange. Pourquoi pas : le plus « net »
   des six, la chaleur repose sur le seul orange.
2. **Aube** · analogue chaud. Fond #FBF1EA · encre #2A1F1A (brun presque
   noir) · soleil #F08A3C · orange lisible #A94A17 · secondaire #D9A48F
   (terre rosée) · filets #EBDCD0. Pourquoi : toutes les couleurs sont
   voisines sur le cercle, la lumière d'un lever de soleil ; très chaleureux.
   Pourquoi pas : peu de contraste de teinte, ça peut manquer de relief.
3. **Crème et ardoise** · complémentaire désaturé sur crème. Fond #F6EFE3 ·
   encre #26303A · soleil #E9722A · orange lisible #A8491A · secondaire
   #5E7488 (ardoise claire) · filets #E3D8C6. Pourquoi : le crème que Jean
   aime, tenu par une encre ardoise qui lui retire le côté « papier
   ancien ». Pourquoi pas : le crème reste le fond réflexe des sites IA ; la
   singularité doit venir d'ailleurs.
4. **Blanc et terre** · monochrome chaud. Fond #FFFCF8 · encre #1F1B18 ·
   soleil #EE7A2E · orange lisible #A84A16 (terre cuite) · secondaire
   #E8D5BC (sable) · filets #EDE5DA. Pourquoi : une seule famille, de la
   terre au soleil ; posé, cohérent, facile à décliner. Pourquoi pas : sans
   couleur froide, l'ensemble peut paraître uniforme.
5. **Aube et bleu du soir** · complémentaire adouci. Fond #FBF1EA · encre
   #1E2A3A · soleil #F29140 · orange lisible #B04E18 · secondaire #5B7394
   (bleu du soir) · filets #EADBCF. Pourquoi : le jour qui se lève et le
   soir qui tombe, une journée de chantier ; chaleur et profondeur. Pourquoi
   pas : deux teintes fortes à doser, sinon on retombe dans le contraste
   facile orange-bleu.
6. **Crème et ocre** · analogue doré. Fond #F6EFE3 · encre #2B2520 · soleil
   #E8792F · orange lisible #A44B1A · secondaire #C99A4E (ocre) · filets
   #E4D7C2. Pourquoi : chaud et lumineux, une matière de pierre au soleil.
   Pourquoi pas : le plus proche du « papier » ; risque de daté si le reste
   n'est pas très moderne.

---

## Planche 2 — Polices de texte (`V4-polices-texte.dc.html`)

Jean trouve **Schibsted Grotesk** la plus lisible. On cherche des voisines
aussi lisibles, et l'on teste des accords pour les gros chiffres. Six
panneaux en grille 3 × 2, fond #FFFCF8, encre #1F2430. Chaque panneau : un
paragraphe de 5 à 6 lignes en 18 px (« Quatre sources de retours apprenants
réunies en une seule, qualifiées par l'IA avec un humain là où elle doute.
L'hypothèse de départ : nos problèmes sont des bugs. Ce que la donnée a
montré : le premier levier de satisfaction, c'est la qualité du contenu et
de ses explications. Ça, c'est l'œuvre d'une équipe. ») ; le même en 15 px ;
un titre en 40 px graisse forte ; « 01 · 02 » en 120 px ; puis le nom, et le
pourquoi et le pourquoi pas.

- **Schibsted Grotesk**, référence. Pourquoi : la plus lisible pour Jean.
  Pourquoi pas : choisie d'office par les IA ; pour du texte courant, c'est
  un moindre mal, la singularité peut venir des titres.
- **Atkinson Hyperlegible Next**. Pourquoi : dessinée par le Braille
  Institute pour la lisibilité maximale ; une histoire d'accessibilité qui
  colle à l'écoute. Pourquoi pas : certaines lettres volontairement
  différenciées peuvent sembler atypiques.
- **Host Grotesk**. Pourquoi : récente, encore peu vue, grotesque ouverte.
  Pourquoi pas : peu éprouvée ; à juger sur pièce.
- **Rethink Sans**. Pourquoi : pensée pour l'écran, ronde et nette.
  Pourquoi pas : proche des sans géométriques très répandues.
- **Onest**. Pourquoi : neutre et chaleureuse, confortable en petite
  taille. Pourquoi pas : peu de caractère en titre.
- **Libre Franklin**. Pourquoi : l'héritage de Franklin Gothic, classique,
  solide, de beaux chiffres. Pourquoi pas : un parfum presse ou
  institutionnel.

Sous la grille, une rangée **« Accords pour les gros chiffres »**, trois
vignettes : « 01 » en 200 px suivi d'une ligne de texte en Schibsted
Grotesk. (a) Schibsted Grotesk 800 seule ; (b) chiffres en Big Shoulders
Display 900 ; (c) chiffres en Archivo 800 largeur 62 (axe `wdth`).
Libellés : (a) « Une seule famille : sobre et cohérent. » (b) « Des chiffres
hauts comme des tours : le bâtiment dans la lettre. » (c) « Des chiffres
serrés, carrés : la rigueur. »

---

## Planche 3 — L'équipe et son leader (`V4-leader.dc.html`)

Trois scènes de même taille (environ 440 × 480), en ligne, même chantier au
trait (un bout de structure carrée, le soleil orange), fond #FFFCF8. Quatre
ou cinq personnes rondes, adultes, sans visage, silhouettes pleines à
l'encre. **Le leader porte des lunettes rondes orange** (vues de profil, un
anneau et une branche, jamais comme des yeux) : c'est son seul signe
distinctif. Il n'est **jamais plus grand, jamais devant, jamais en train de
pointer ou de donner un ordre** : il travaille **avec** l'équipe.

- **L-1 · Il porte avec eux.** Le leader tient la même poutre que deux
  coéquipiers, au même niveau. Libellé : « Pourquoi : le leader est dans
  l'effort, pas au-dessus. Pourquoi pas : on le distingue à peine. »
- **L-2 · Il lit le plan avec eux.** Trois personnes penchées sur le même
  plan, le leader au milieu du groupe, pas en bout. Libellé : « Pourquoi :
  décider ensemble, sur la même information. Pourquoi pas : plus statique. »
- **L-3 · Il passe la main.** Le leader tend un outil à un coéquipier qui
  monte sur la structure. Libellé : « Pourquoi : faire grandir, le leader
  qui transmet. Pourquoi pas : un geste plus narratif, à garder lisible en
  petit. »
