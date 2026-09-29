# Brief — premier jet de la page UserVoice (registre/0031)

Tu écris le **texte** de la page projet UserVoice du portfolio de Jean
Perrier, en français. Pas de code : un fichier Markdown à relire par Jean,
`C:\Users\Jean PERRIER\Portfolio\redaction\uservoice.fr.md`.

Applique **en entier** la ligne éditoriale (le second fichier de ton prompt) :
ses trois passes, sa voix, sa liste de tics. Rends à la fin le tableau
d'audit `extrait | tic | réécriture` de ta propre passe 2.

## Le lecteur

Un recruteur (PM, Head of Product, CPO, AI / Data PM) qui a trente secondes
pour la synthèse et, s'il accroche, deux ou trois minutes pour le reste. Il
cherche : un point de vue produit, une décision, de l'IA appliquée avec
discernement, de la data. Pas long et technique : le détail va dans « Pour
aller plus loin ».

## Les règles qui ne se discutent pas

- **L'employeur n'est jamais nommé** : « une plateforme EdTech », « la
  plateforme ». Aucun nom d'examen, de produit interne, d'outil interne
  nommé par son nom de table ou de champ, aucune URL interne.
- **Chiffres relatifs** seulement : jamais un volume ou un effectif interne.
  Les chiffres sur le travail de Jean lui-même sont permis.
- **Aucune personne** : ni nom, ni verbatim d'apprenant.
- **Le constat se formule en levier**, jamais comme un défaut de
  l'employeur.
- **UserVoice a été mené par Jean seul**, avec Claude Code : « je », jamais
  « l'équipe ».
- Un fait manquant devient `[À COMPLÉTER]`, jamais une invention.

## La matière (ce qui est vrai)

- **Le point de départ.** Des milliers de retours d'apprenants par an,
  dispersés dans quatre sources : l'enquête NPS, le test de niveau, la fin
  de parcours, un formulaire de retour libre présent sur toutes les pages du
  site. Ils étaient qualifiés à la main dans un tableur, par lots, avec des
  semaines de retard. Les mêmes sujets revenaient sans qu'on sache s'ils
  étaient déjà traités. L'hypothèse implicite : nos problèmes sont surtout
  des bugs.
- **La question de Jean** : chaque lundi, en cinq minutes, savoir quels sont
  les sujets les plus récurrents, s'ils sont traités, et s'il y a un
  nouveau sujet que personne n'a vu.
- **Ce qu'il a construit.**
  - Les quatre sources convergent vers **une seule table**, dans laquelle
    chaque retour garde ses dimensions figées au moment où il est donné.
  - Chaque retour est **qualifié sur deux axes** : une signature de bug
    parmi 35, ou des thèmes de satisfaction parmi 29 (un retour peut en
    citer plusieurs).
  - **L'IA classe avec un score de confiance** ; en dessous d'un seuil, ou
    quand deux réponses sont trop proches, le retour va dans une **file de
    validation humaine**. Chaque validation enrichit les exemples des passes
    suivantes, et des règles mécaniques prennent le relais sur les cas
    devenus évidents (réponses vides, doublons). Résultat mesuré : **la file
    de validation humaine a fondu de 87 % en trois jours**.
  - **Un tableau de bord personnalisé**, avec une couche de visualisation et
    une couche d'intelligence (ce qui bouge, et pourquoi), et un **bilan du
    lundi** qui croise le volume et le statut de traitement.
  - **Une alerte de fraîcheur** : le tableau de bord s'était déjà figé en
    silence deux fois ; une baisse apparente peut n'être qu'une panne de la
    source.
- **Ce que la donnée a montré.** **1 retour sur 3** du formulaire présent sur
  toutes les pages porte sur le contenu. Côté NPS, **près d'un verbatim sur
  cinq** touche à la qualité du contenu (explications, qualité des
  exercices, traductions), et la moitié sont des critiques ou des demandes
  (période de deux mois, été 2026). Le premier levier de satisfaction est
  donc la qualité du contenu et de ses explications.
- **Ce que ça a changé.** L'effort s'est déplacé vers le contenu : c'est le
  point de départ du second projet, **l'audit qualité du contenu** (lien
  « Projet suivant »).
- **Ce que Jean a écarté, et pourquoi** (pour « Pour aller plus loin ») :
  une double catégorisation humaine (seule la signature se saisit, le reste
  se déduit des données datées) ; une classification entièrement
  automatique (l'humain garde les cas douteux) ; toute écriture dans la
  source (on ne la modifie jamais) ; un rapport organisé par variations
  statistiques (on n'y voyait pas si un sujet était traité).
- **Les pièges payés** (pour « Pour aller plus loin ») : des identifiants
  très longs corrompus en notation scientifique par les tableurs ; des
  virgules décimales dans une source ; un tableau de bord figé sans que
  personne ne s'en aperçoive.
- **La méthode** : Jean bâtit sur des hypothèses, écoute, teste, puis dose
  l'effort ; chaque décision est tracée dans un registre ; le code est
  vérifié par des tests.

## Ce que tu rends

Un fichier Markdown avec, dans l'ordre :

1. Un en-tête YAML : `titre`, `fait` (« 1 retour sur 3 porte sur le
   contenu. »), `synthese` (**trois phrases**, une par idée : le problème, ce
   que j'ai fait, le résultat).
2. Le corps, sous ces **H2** (tu peux en ajuster le libellé, pas le nombre
   sans le dire) : Le point de départ · Écouter à l'échelle · Ce que la
   donnée a montré · Ce que j'ai construit · Ce que ça a changé. Entre 450
   et 650 mots pour le corps. Des paragraphes courts, un seul chiffre
   décisif par section au plus.
3. Une section `## Pour aller plus loin` : les décisions écartées et les
   pièges payés, en phrases courtes.
4. À la fin, hors du texte, sous un filet : le tableau d'audit de ta passe
   2, puis la liste de ce qui reste `[À COMPLÉTER]`.

Ne modifie aucun autre fichier. Ne commite rien.
