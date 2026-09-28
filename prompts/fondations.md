# Brief — planches de fondation : fonds, polices, personnages (registre/0009)

Ce ne sont pas des maquettes de page : ce sont des **planches de choix**.
Chacune pose côte à côte des candidats pour qu'on tranche d'un coup d'œil.
Le texte d'intention de chaque candidat est donné plus bas : il fait partie
de la planche, écris-le tel quel.

## Ce qu'on sait déjà de la direction

- Mots de Jean : rigoureux · leader · bâtisseur à l'écoute. Ton posé, avec
  une touche de chaleur.
- Du **carré** (les projets, la conduite) et du **rond** (l'humain, le
  management ; Jean porte des lunettes rondes).
- Un **soleil** en aplat orange, discret, et son rappel en **petits points
  orange** dans la page. Un **bâtiment** au trait qui se construit. De
  petits **bonhommes** ronds : l'équipe, l'aventure humaine.
- De **très gros numéros d'étape** (I, II, 01, 02) et de **gros titres**.
- Faible densité, très visuel, vivant. Jamais de fond noir, jamais de
  dégradé, rien d'enfantin, pas l'air d'un site vitrine B2B.
- Le but de fond : **échapper à la standardisation de l'IA**. Les pistes
  précédentes ont toutes convergé seules vers Schibsted Grotesk et un fond
  crème : c'est exactement ce qu'on cherche à éviter.

## Format

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe**, égale au
`$preview` ; flex ou grid avec `gap` ; le bloc `<script type="text/x-dc"
data-dc-script>` toujours présent ; pas d'`innerHTML` ; aucune requête
réseau hors d'**un seul** `<link>` Google Fonts `css2` dans `<helmet>` ;
pas d'image externe ; pas d'emoji. Contraste du texte 4,5:1.

La mise en page des planches elles-mêmes est sobre et neutre (fond blanc
cassé froid, libellés en gris foncé) : c'est le candidat qui doit parler,
pas la planche.

**Ne publie rien, ne lis rien d'autre, ne fais pas de capture.** Écris les
fichiers, puis rends compte : `w` × `h` exacts de chaque fichier, et tout
écart au brief.

---

## Planche A — Fonds (`V3-fonds.dc.html`, 1440 de large)

Six tuiles de même taille (environ 420 × 520), en grille de 3 × 2. Chaque
tuile montre **seulement le fond et ce qui se pose dessus** : le disque de
soleil orange (en aplat), trois ou quatre petits points orange, un très gros
« I » à l'encre, une ligne de titre (« Je bâtis sur des hypothèses. ») et
une ligne de texte courant, pour juger la lisibilité. Même orange, même
encre, mêmes éléments sur les six ; seul le fond change (sauf F5). Sous
chaque tuile, sur la planche : le nom, le hex, puis les deux lignes
d'intention ci-dessous.

- **F1 · Blanc lumière** (#FFFCF8). Pourquoi : le fond s'efface, la chaleur
  vient du soleil et de l'orange, c'est le plus vivant et le moins « IA ».
  Pourquoi pas : sans assez d'orange et d'illustration, il peut retomber
  dans le sobre.
- **F2 · Ciel du matin** (#EAF3F8). Pourquoi : la lumière du jour, le ciel
  derrière le bâtiment ; l'orange y ressort par contraste chaud-froid.
  Pourquoi pas : un bleu, même pâle, refroidit ; à doser pour rester posé.
- **F3 · Crème** (#F6EFE3), pour référence. Pourquoi : chaleureux d'emblée.
  Pourquoi pas : c'est le choix réflexe des IA depuis 2023, et la palette
  d'Anthropic que Jean n'aime pas.
- **F4 · Béton clair** (#EEEEEA). Pourquoi : la matière du chantier, neutre
  et sérieuse ; l'orange y claque comme un signal de chantier. Pourquoi pas :
  le gris peut paraître terne ou administratif.
- **F5 · Blanc et bandeau de ciel** : fond #FFFCF8, avec le tiers haut de la
  tuile en aplat #DCEBF4 (un ciel), le soleil posé à la limite. Pourquoi : un
  moment fort en haut de page, puis une lecture sur blanc. Pourquoi pas : une
  section de couleur demande de la discipline pour ne pas devenir une
  bannière.
- **F6 · Aube** (#FBF1EA), un blanc à peine pêche. Pourquoi : la chaleur d'un
  lever de soleil, plus lumineuse que le crème. Pourquoi pas : c'est un
  cousin du crème ; le risque de cliché n'est pas nul.

Orange du soleil et des points : #EE7A2E. Encre : #1F2430. Si l'orange ne
passe pas 3:1 sur un fond pour un élément graphique, dis-le.

## Planche B — Personnages (`V3-bonhommes.dc.html`, 1440 × 800 environ)

Deux moitiés côte à côte, même petite scène de chantier au trait (un bout de
structure carrée, le soleil, quatre personnes) sur fond #FFFCF8.

- **P-A · L'équipe.** Quatre silhouettes rondes et minimales, adultes, sans
  visage, dans des postures de travail (porter une poutre, lire un plan,
  pointer). Libellé sous la scène : « Pourquoi : l'équipe, sans mettre
  personne en avant. Pourquoi pas : plus neutre, moins mémorable. »
- **P-B · L'équipe et un guide.** Les mêmes, dont l'un porte des **lunettes
  rondes** et revient comme guide (il désigne le chemin). Libellé :
  « Pourquoi : une signature mémorable, Jean dans son équipe, pas devant
  elle. Pourquoi pas : un parti pris fort, qui peut sembler se mettre en
  scène. »

Trait sobre, cohérent avec un bâtiment d'architecte. Rien d'enfantin, pas de
mascotte, pas de visage de dessin animé.

## Planche C — Polices (`V3-polices.dc.html`, 1440 de large)

Six panneaux de même taille, en grille de 2 × 3 (ou 3 × 2), fond #FFFCF8.
Chaque panneau montre, dans la police candidate :

1. « I · II · 01 · 02 » en très grand (au moins 160 px), graisse forte ;
2. le titre « Je bâtis sur des hypothèses : j'écoute, je teste, puis je dose
   l'effort. » en 56 px environ ;
3. un paragraphe en 18 px : « Quatre sources de retours apprenants réunies en
   une seule, qualifiées par l'IA avec un humain là où elle doute. Ça, c'est
   l'œuvre d'une équipe. » (le « ç », le « œ », les accents comptent) ;
4. le nom de la police, puis les deux lignes d'intention ci-dessous.

Charge les six familles dans **un seul** `<link>` Google Fonts `css2`, avec
les graisses nécessaires (et l'axe `wdth` pour Archivo, Anybody et Mona Sans,
en utilisant la syntaxe css2 des axes). Si une famille n'a pas de graisse
assez légère pour le paragraphe, pose le paragraphe dans sa graisse la plus
proche et dis-le.

- **Schibsted Grotesk**, pour référence. Pourquoi : nette, journalistique,
  très lisible. Pourquoi pas : les trois pistes l'ont choisie d'elles-mêmes :
  c'est la preuve même de la standardisation.
- **Big Shoulders Display** (paragraphe en Archivo). Pourquoi : une
  condensée née de la signalétique industrielle de Chicago ; des chiffres
  hauts comme des tours, le bâtiment dans la lettre. Pourquoi pas : froide et
  industrielle si elle est seule ; elle a besoin du rond et de l'orange.
- **Red Hat Display**. Pourquoi : des formes rondes et des détails carrés, le
  carré-rond de Jean dans une seule famille, chaleureuse. Pourquoi pas :
  associée à une marque tech connue, et assez vue dans le logiciel.
- **Archivo**, en largeurs variées. Pourquoi : une grotesque solide dont on
  peut serrer les chiffres (carré) et élargir les titres ; très maîtrisable.
  Pourquoi pas : neutre si on ne pousse pas ses largeurs, elle peut
  redevenir standard.
- **Anybody**, en largeurs variées. Pourquoi : de l'ultra-condensé à
  l'ultra-large dans une famille, un ludique qui pondère la rigueur. Pourquoi
  pas : une pointe rétro, voire « jeu vidéo », qui peut distraire.
- **Mona Sans**, en largeurs variées. Pourquoi : une grotesque humaine et
  précise, variable en largeur et en graisse, crédible pour un profil tech.
  Pourquoi pas : c'est la police de GitHub ; ça peut se lire comme une
  identité empruntée.
