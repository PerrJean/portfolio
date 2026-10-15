# Brief — les trois schémas du projet « atelier de pilotage » (registre/0090)

Le portfolio de Jean prépare un septième projet : un atelier avec cinq
clients avant de construire un tableau de bord. Tu dessines **trois schémas
fixes**, dans le style des schémas de la page Fusion, déjà en ligne. Deux
fichiers à lire d'abord : `redaction/atelier-pilotage.fr.md` (le texte
validé ; les marqueurs `<!-- SCHÉMA … -->` disent où va chaque schéma) et
`ops/images/fusion/planche.mjs` (comment les schémas de la Fusion sont
construits : style, police en chemins, deux dispositions, planche).

## Les trois schémas

1. **La frise de l'atelier.** Trois temps, de gauche à droite :
   - « Explorer » : situations → décisions → données utiles ;
   - « Projeter » : formats → niveau de détail ;
   - « Confronter » : maquettes → retours des clients → hypothèse confirmée.
   Le premier et le troisième ont pris l'essentiel de la séance : ils sont
   **plus larges** que le deuxième, et seuls à porter l'ambre. Le deuxième,
   écourté, est plus étroit, au trait plus léger. **Aucune durée**, aucune
   heure.
2. **De la donnée à la décision.** Trois étapes reliées par des flèches :
   - « Donnée brute » : « Temps passé : 6 h » ;
   - « Donnée comparée » : « Objectif : 10 h », « Réalisé : 6 h », une
     jauge remplie à 60 %, « 60 % de l'objectif » ; l'écart restant est
     l'élément qui compte (l'ambre) ;
   - « Décision » : « Repérer les apprenants et les groupes à accompagner ».
   La mention **« Exemple fictif »** figure sur le schéma.
3. **Les trois niveaux.** Contrat → groupe → apprenant, du plus large au plus
   fin (emboîtement ou descente, à toi de voir ce qui se lit le mieux). À
   chaque niveau, la même lecture : le temps passé face à la ligne de
   l'objectif, et l'écart (l'ambre). Une phrase par niveau : « Contrat : la
   vue d'ensemble », « Groupe : les classes ou équipes en retard »,
   « Apprenant : qui a atteint son objectif ». **Ce n'est pas une capture
   du produit** : aucune ressemblance avec une interface réelle, aucun
   chiffre réel.

## Les règles

- Au trait, fond ivoire `--ivoire`, trait `--encre`, liaisons et flèches
  `--ardoise` ; l'**ambre** `--ambre` comme seule lumière (un aplat ou un
  point sur l'élément qui compte), jamais du texte en ambre ; l'orange est
  réservé aux lunettes de Jean (inutile ici). Texte en Atkinson Hyperlegible
  Next, 15 px au moins à la taille d'affichage (colonne de 736 px).
- **Aucun nom** de marque, d'outil, de client ni de personne ; les seuls
  chiffres sont ceux de l'exemple fictif (10 h, 6 h, 60 %).
- Libellés **FR et EN**. L'anglais est naturel, pas traduit (skill
  `ligne-editoriale`, « Le miroir anglais ») : « Explore », « Project » ne
  convient pas, préfère par exemple « Explore », « Shape », « Test »
  (« Confront » sonne agressif) ; « time spent », « target », « gap ».
  Orthographe des pages anglaises du site (britannique).
- **Deux dispositions par schéma**, comme la Fusion : large (736 px) et
  étroite (350 px, verticale si besoin), lisibles chacune à sa taille.

## Ce que tu rends

Dans `ops/images/atelier-pilotage/` : `frise`, `donnee-decision`, `niveaux`,
chacun en `.fr.svg`, `.en.svg`, `.etroit.fr.svg`, `.etroit.en.svg` ; une
planche `planche.png` (les trois en FR large, et les trois en FR étroit) ;
le script `planche.mjs` (SVG composé puis `sharp`, déjà installé, aucun
paquet ; police en chemins comme la Fusion). **Regarde la planche** (outil
Read) et corrige ce qui se lit mal. Passe chaque SVG au vérificateur avec
des **chemins Windows** (`python ops/hooks/verifier_confidentialite.py
<chemin>` depuis `C:\Users\Jean PERRIER\Portfolio`) : il doit se taire.

Pour chaque schéma, propose aussi son texte alternatif (`alt`) et sa
légende, FR et EN, dans ton rapport. Tu ne touches ni à `src/`, ni aux
tests, ni à `redaction/`, ni à `public/`. Ne commite rien. Rapport de 300
mots au plus.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
