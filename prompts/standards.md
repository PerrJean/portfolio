# Brief — planche « Les standards : le réflexe et l'alternative » (registre/0009)

Une **planche de choix**, pas une maquette. Neuf lignes. Sur chaque ligne,
deux vignettes côte à côte, de même taille : à gauche **le réflexe**, le
standard des sites générés par IA ; à droite **l'alternative** proposée pour
Jean. Sous la paire, deux lignes de texte : ce que le standard dit du
candidat, et ce que l'alternative dit de Jean (texte donné plus bas).

## La direction à respecter dans les alternatives

Jean est rigoureux, leader, bâtisseur à l'écoute ; ton posé, avec une
touche de chaleur. Du **carré** (les projets) et du **rond** (l'humain,
ses lunettes rondes). Un **soleil** orange en aplat (#EE7A2E) et son rappel
en petits points orange. Un **bâtiment** au trait qui se construit. De
petits **bonhommes** ronds et adultes. De très gros numéros, de gros titres.
Fond blanc lumière #FFFCF8, encre #1F2430. Jamais de dégradé, de fond noir,
d'emoji, rien d'enfantin.

Les vignettes « réflexe » imitent fidèlement le standard (Inter ou une
grotesque passe-partout, boutons pilules, ombres douces, dégradé discret si
c'est le cas), en gris et bleu génériques. C'est la seule planche où ces
tics sont permis : pour les montrer.

## Les neuf paires

1. **L'accroche.** Réflexe : surtitre, gros titre, sous-titre, deux boutons,
   une capture en biais à droite. Alternative : le titre « Je bâtis sur des
   hypothèses : j'écoute, je teste, puis je dose l'effort. », le soleil qui
   se lève sur un terrain et des fondations au trait, une seule action.
   Texte : « Le réflexe : un produit SaaS de plus. L'alternative : quelqu'un
   qui construit. »
2. **Ce que j'apporte.** Réflexe : trois cartes à icône, titre, deux lignes.
   Alternative : trois pieux de fondation qui portent un même socle, chaque
   pieu nommé (Écouter à l'échelle · Agir sur la qualité · L'IA en
   production). Texte : « Le réflexe : une liste de services. L'alternative :
   ce sur quoi tout repose. »
3. **Les chiffres.** Réflexe : trois tuiles de KPI (grand nombre, petit
   libellé). Alternative : un seul fait décisif, en très grand, avec sa
   phrase : « 1 hypothèse renversée — l'effort est passé des bugs au
   contenu. » Texte : « Le réflexe : des métriques. L'alternative : la
   décision qu'elles ont changée. »
4. **L'étude de cas.** Réflexe : trois colonnes Problème / Solution /
   Résultat. Alternative : la méthode de Jean comme structure, en trois
   étages d'un bâtiment : Hypothèse → Test → Effort dosé. Texte : « Le
   réflexe : un gabarit. L'alternative : sa façon de travailler. »
5. **Les libellés.** Réflexe : petits libellés en police mono, entre
   crochets, numérotés « 01 — ». Alternative : de petites capitales dans la
   police de texte, et un point orange comme repère. Texte : « Le réflexe :
   le tic dev / IA. L'alternative : un repère qui lui appartient. »
6. **Les boutons.** Réflexe : pilules, ombre douce, flèche. Alternative : un
   bouton à angles droits (le carré) précédé d'un petit disque orange (le
   rond). Texte : « Le réflexe : cliquable. L'alternative : carré et rond. »
7. **L'animation.** Réflexe : des blocs qui apparaissent en fondu vers le
   haut (montre trois états figés, avec des flèches de mouvement).
   Alternative : un étage qui se pose sur la structure, en trois états.
   Texte : « Le réflexe : ça bouge. L'alternative : ça se construit. »
8. **L'écriture.** Réflexe, en citation : « Le premier levier n'était pas
   un bug. C'était la qualité du contenu. » Alternative : « Les apprenants
   parlaient d'abord du contenu et de ses explications. J'ai suivi ce
   qu'ils disaient. » Texte : « Le réflexe : le "pas X, mais Y" des textes
   générés. L'alternative : dire ce qui s'est passé. »
9. **L'aperçu LinkedIn.** Réflexe : une carte d'aperçu grise avec le titre
   « Jean Perrier — Portfolio » et l'URL. Alternative : la même carte avec
   une image : le bâtiment au trait, le soleil, et la phrase de Jean.
   Texte : « Le réflexe : un lien. L'alternative : la première impression,
   avant même le clic. »

## Format

1440 de large ; hauteur selon le contenu (vignettes d'environ 620 × 360).
Planche neutre : fond #F1F2F4, libellés en IBM Plex Sans, gris foncé.

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe**, égale au
`$preview` ; flex ou grid avec `gap` ; le bloc `<script type="text/x-dc"
data-dc-script>` toujours présent ; pas d'`innerHTML` ; un seul `<link>`
Google Fonts `css2` dans `<helmet>` ; pas d'image externe (tout en SVG
inline) ; pas d'emoji. Contraste du texte 4,5:1.

**Ne publie rien, ne lis rien d'autre, ne démarre aucun serveur, ne fais pas
de capture.** Écris le fichier, puis rends compte : `w` × `h` exacts et tout
écart au brief.
