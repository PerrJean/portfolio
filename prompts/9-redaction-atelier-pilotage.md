# Brief — rédiger le projet « atelier de pilotage » (registre/0090)

Le portfolio de Jean (Head of Product) s'adresse à des recruteurs qui lisent
vite. Tu rédiges un **septième projet**, en brouillon et **en français
seulement** (l'anglais viendra après le tri de Jean). Tu ne touches pas au
site (`src/`) : un seul fichier, `redaction/atelier-pilotage.fr.md`.

## Ce que tu lis

1. La source : `C:\Users\Jean PERRIER\.portfolio\atelier-pilotage\source.md`.
   Elle fait foi : faits validés, récit, chiffres bruts et leur formulation
   publiable, ce qui est écarté.
2. Le modèle de forme : `src/contenu/projets/fr/fusion-plateformes.md`
   (en-tête, encadré, synthèse, corps, « Pour aller plus loin »,
   « Ce que j'en retiens » en attaques grasses).
Applique les skills `ligne-editoriale` et `relecture-non-initie`.

## Le récit

La direction voulait donner de l'autonomie aux clients avec un tableau de
bord. Avant de le construire, Jean a nommé trois risques et réuni cinq
clients décideurs en atelier, en partant de leurs situations de décision
(« Quand…, j'ai besoin de…, pour… »), pas des graphiques souhaités. Il en
sort une donnée, le temps passé, qui ne vaut que rapportée à un objectif,
sur trois niveaux. Les maquettes préparées tenaient : la discovery a
conforté l'hypothèse et resserré le périmètre. Le tableau de bord est en
ligne depuis juin 2026 et il est adopté. Le ton : la demande de la direction
était cohérente ; la questionner, c'est s'assurer d'investir au bon endroit
(C8), jamais la dénigrer.

## Les règles, sans exception

- **C1** : jamais le nom de l'employeur ; « une entreprise EdTech » ou
  « une plateforme d'apprentissage des langues ».
- **C2** : aucun volume. Les parts et rapports de la source (« 1 sur 6 »,
  « près d'1 sur 3 », « plus de la moitié ») et rien d'autre.
- **C3** : aucun nom de client, de collègue, aucun verbatim.
- **C4** : aucun nom d'outil, de page ou de rôle technique.
- La liste « Ce que la page n'affirme jamais » de la source. Un fait
  manquant devient `[À COMPLÉTER]`, jamais une invention.
- Les schémas ne sont pas encore dessinés : place un marqueur à l'endroit
  de chacun, `<!-- SCHÉMA : frise de l'atelier -->`, `<!-- SCHÉMA : de la
  donnée à la décision -->`, `<!-- SCHÉMA : les trois niveaux -->`,
  `<!-- CAPTURE : le tableau de bord -->`. L'exemple pédagogique du schéma
  (objectif 10 h, réalisé 6 h, 60 %) est fictif et le dit.

## Ce que tu rends

`redaction/atelier-pilotage.fr.md`, au format exact du modèle : `titre`,
`date: "2026-06"`, `cadre` (rôle : Product Manager par intérim ; équipe :
une Product Designer et deux développeurs ; durée : avril → juin 2026,
puis le suivi de l'usage), `fait` (celui de la source, mot pour mot),
`synthese` (problème, action, résultat), corps en six sections `##`
(900 à 1 200 mots : le point de départ ; trois risques avant de
développer ; l'atelier ; ce que les clients ont dit ; ce qui a été
construit ; ce que j'en retiens), `plusLoin` (« Le déroulé de l'atelier » :
consignes, relances, matériel ; « Ce qu'on ne sait pas encore » si la
source le permet sans écarté), `langue: fr`, `cle: atelierPilotage`.

En tête du fichier, en commentaire HTML, **deux titres au choix** pour la
page. En fin de fichier, en commentaire HTML, la liste des chiffres
convertis (source → publié) et chaque `[À COMPLÉTER]`.

Rapport de 300 mots au plus. Ne commite rien. Environnement : Windows, Git
Bash.
