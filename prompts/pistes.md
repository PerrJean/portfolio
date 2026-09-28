# Brief — trois pistes courtes (registre/0008)

Tu fais **une** des trois pistes. Une piste est courte : l'accueil seulement,
le premier écran et le début des deux actes. Le but est de faire réagir Jean
sur une ambiance, pas de livrer une page. Le texte est le même pour les trois
pistes : seule la forme se compare.

## Qui est Jean, et ce que le site doit dégager

Le site doit être **congruent** avec Jean, pour convertir le recruteur (PM,
Head of Product, CPO, AI / Data PM) qui cherche quelqu'un comme lui. Pas pour
plaire à tous.

- **Ses mots** : rigoureux · leader · bâtisseur à l'écoute. Ton **posé, avec
  une touche de chaleur**.
- **Ses lignes** : du **carré** pour les projets et la façon de les conduire,
  du **rond** pour le management et l'humain (il porte des lunettes rondes,
  pour casser son côté carré).
- **Ses métaphores** : la **lumière du soleil**, qui réchauffe ; le
  **bâtiment** comme trame d'illustration ; l'**aventure humaine** d'un
  projet numérique.
- **Ce qu'il aime** : le calme premium de Mercury, avec plus de chaleur ; la
  faible densité et le côté très visuel de Linear, mais **sur fond clair**,
  vivant ; les animations de Stripe (son soleil), sans ses dégradés ; le
  ludique de Josh Comeau pour pondérer la rigueur, sans rien d'enfantin ;
  l'épure d'un site de photographe : grande grotesque, image centrée,
  beaucoup d'air.
- **Ce qu'il rejette** : trop sobre ou trop minimal ; trop éditorial ; froid ;
  junior ou scrapbook ; journal perso ; fond noir ; **dégradés « ère de
  l'IA »** ; site vitrine B2B ; nuages et ludique enfantin.
- **À reprendre des maquettes précédentes** : un petit sommaire I / II dans
  l'accroche, qui rend l'histoire en deux actes lisible d'un coup d'œil ; une
  flèche dessinée entre les deux actes, qui porte « Alors j'ai agi dessus. »

Jean veut **plus d'images** : illustrations et captures d'écran. Les captures
n'existent pas encore : dessine un cadre de capture soigné avec, au centre,
un libellé discret entre crochets (par exemple « [Capture : bilan
hebdomadaire, données synthétiques] »). Une illustration se dessine en SVG
inline.

## Ce que tu livres

**Un seul artboard** `.dc.html`, 1440 × 2000, dans le dossier et au nom que
te donne ton prompt. Si le contenu demande plus ou moins de hauteur, ajuste
et dis-le, entre 1600 et 2400.

Format : les règles de `format.md` (le second fichier de ton prompt). À
retenir absolument : la ligne `<script src="./support.js"></script>` exacte
dans `<head>` ; `<html lang="fr">` ; un `<title>` ; tous les éléments
fermés, tous les attributs entre guillemets ; une racine à taille **fixe**,
égale au `$preview` ; flex ou grid avec `gap` ; le bloc `<script
type="text/x-dc" data-dc-script>` toujours présent ; pas d'`innerHTML` ;
aucune requête réseau hors d'un `<link>` Google Fonts `css2` dans
`<helmet>` ; pas d'image externe ; pas d'emoji ; un ou deux `data-props` au
plus, jamais pour du texte.

**Une animation est bienvenue** : une seule, bien orchestrée (CSS
`@keyframes` dans `<helmet><style>`), coupée sous `@media
(prefers-reduced-motion: reduce)`.

Accessible comme dessiné : vrais `<a href>` et `<button>`, contraste 4,5:1
(3:1 au-delà de 24 px). La bascule FR | EN est deux vrais liens, FR marqué
`aria-current="page"`.

Évite : dégradés, cartes à bordure gauche colorée, emoji ; les polices Inter,
Roboto, Arial, Fraunces, Space Grotesk, Instrument Serif, Bricolage
Grotesque, Caveat (déjà vues ou trop courues). Une à trois familles. Rien
d'inventé : ni chiffre, ni logo, ni témoignage.

**Ne publie rien, ne lis rien d'autre, ne fais pas de capture.** Écris le
fichier, puis rends compte : `w` × `h` exacts, polices, palette en hex,
l'intention en trois lignes, le principal compromis.

## Le texte

- **Barre du haut** : Jean Perrier · Projets · Méthode · À propos · FR | EN
- **Surtitre** : Product · IA appliquée · Data
- **Titre** : Je bâtis sur des hypothèses : j'écoute, je teste, puis je dose
  l'effort.
- **Sous-titre** : Deux projets menés de bout en bout sur une plateforme
  EdTech. Écouter des milliers d'apprenants, puis corriger ce qui les gêne
  vraiment.
- **Sommaire** : I · Écouter : UserVoice — II · Agir : Audit contenu
- **Action principale** (une seule) : Lire l'histoire en deux actes
- **Acte I · Écouter — UserVoice.** Quatre sources de retours apprenants
  réunies en une seule, qualifiées par l'IA avec un humain là où elle doute.
  L'hypothèse de départ : nos problèmes sont des bugs. Ce que la donnée a
  montré : le premier levier de satisfaction, c'est la qualité du contenu et
  de ses explications. Lien : Voir le projet. Un cadre de capture.
- **Flèche entre les actes** : Alors j'ai agi dessus.
- **Acte II · Agir — Audit contenu.** L'audit qualité de tout un corpus
  pédagogique, mené par des agents IA encadrés, qui livre des corrections
  prêtes à relire, sans jamais écrire en base. Lien : Voir le projet. Un
  cadre de capture.

Pas de chiffres clés dans cette piste : ils sont en cours de révision.
