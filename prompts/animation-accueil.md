# Brief — l'accueil : l'équipe se met au travail au survol (registre/0017)

La première animation retenue, la plus simple : une esquisse fidèle au
système, prête à être portée dans Astro.

## Le système visuel (fixé)

- Fond **ivoire chaud #FEFAF2**. Encre **#2A1F1A** (texte, traits,
  bonhommes). Lumière **ambre #F2A33A** (soleil, points ; jamais de texte).
  Action **orange #B54E19** (boutons, liens, et les lunettes de Jean).
  Information **ardoise #5E7488**.
- Police unique **Atkinson Hyperlegible Next** : 800 titres et gros
  chiffres, 700 libellés en capitales espacées, 400 texte.
- **Soleil sans animation** : un quart de disque coupé par le coin haut
  droit de la page, entouré de trois ou quatre **anneaux en aplats** qui vont
  de l'ambre vers l'orange, paliers nets, **aucun dégradé continu**.
- **Bonhommes** : ronds, adultes, sans visage, silhouettes pleines à
  l'encre. **Jean** porte des lunettes rondes orange (anneau et branche, de
  profil). Il n'est jamais plus grand, jamais devant, ne pointe jamais : il
  travaille avec l'équipe.
- Boutons à angles droits ; le point ambre se place devant le libellé.

## Ce qu'on montre

Un artboard **interactif** de 1440 × 900. À gauche (environ 1040 px), un
fragment de l'accueil : le soleil dans le coin, puis **deux parcelles** côte
à côte, reliées par une flèche au trait qui porte « Alors j'ai agi
dessus. ».

Chaque parcelle est un vrai lien (`<a href>`) vers sa page projet :
- le numéro en très grand (« 01 », « 02 »), Atkinson 800 ;
- le nom (« UserVoice », « Audit contenu ») ;
- le fait clé, provisoire :
  - 01 : « 1 retour sur 3 porte sur le contenu. »
  - 02 : « Sur le premier parcours audité, 1 question sur 20 empêchait
    l'apprenant de répondre. Toutes ont été corrigées. »
- en bas, un terrain au trait avec ses **fondations** (dalle, semelles) et
  **quatre bonhommes**, dont Jean.

**Au repos, rien ne bouge.** Au **survol** d'une parcelle (et au focus
clavier, `:focus-visible` / `:focus-within`), son équipe se met au travail
pendant environ 3 s, **une seule fois**, puis s'arrête :
- deux coéquipiers soulèvent une poutre et la posent sur la dalle ;
- un troisième déroule un plan ;
- Jean tend un outil à un coéquipier, qui le prend.

Une seule chose bouge à la fois, sans rebond. Sous `prefers-reduced-motion:
reduce`, rien ne bouge et la scène finale est affichée.

Pour qu'on puisse juger sur le canevas sans souris, un vrai bouton
« Simuler le survol » sous chaque parcelle déclenche la même animation (état
par `setState`, qui ajoute une classe à la parcelle).

À droite (environ 360 px), une fiche sobre en IBM Plex Sans : **Ce que ça
raconte** (deux lignes), **Où ça vit**, **Comment ça se code** (animations
CSS déclenchées par `:hover` et `:focus-within` ; au téléphone, un
`IntersectionObserver` joue l'animation une fois quand la parcelle entre à
l'écran ; environ 30 lignes de CSS et 10 de JS), **Complexité : faible**,
**Sans animation**.

## Format

Les règles de `format.md` (le second fichier de ton prompt). À retenir
absolument : la ligne `<script src="./support.js"></script>` exacte dans
`<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments fermés,
tous les attributs entre guillemets ; une racine à taille **fixe** 1440 ×
900, égale au `$preview` ; flex ou grid avec `gap` ; le bloc `<script
type="text/x-dc" data-dc-script>` toujours présent (`class Component extends
DCLogic`) ; pas d'`innerHTML` ; **un seul** `<link>` Google Fonts `css2`
**dans `<helmet>`** (Atkinson Hyperlegible Next 400;700;800, IBM Plex Sans
400;600) ; `@keyframes` dans `<helmet><style>` ; tout en SVG inline ; pas
d'emoji ; pas de bibliothèque.

**Ne publie rien, ne lis rien d'autre, ne démarre aucun serveur, ne fais pas
de capture.** Écris le fichier, puis rends compte : `w` × `h`, et tout écart
au brief.
