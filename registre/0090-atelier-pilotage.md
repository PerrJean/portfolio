# 0090 — Un septième projet : l'atelier de pilotage avec cinq clients

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 370 | 1 220 | `claude-opus-5-5` |

**Demande de Jean (2026-10-14)**, sur un brief rédigé avec ChatGPT : un
retour d'expérience de discovery. La direction voulait un tableau de bord
client ; Jean a d'abord réuni cinq clients en atelier (avril 2026). Source
consolidée hors du dépôt : `~/.portfolio/atelier-pilotage/source.md`.

**Pertinence, challengée par Jean** : le projet 01 porte déjà la
discovery, avec un résultat chiffré. On l'ajoute parce qu'il montre ce que
01 ne montre pas (Jean anime lui-même, questionne une demande de la
direction, un produit de données B2B) et parce que le tableau de bord est
en ligne depuis le 25 juin 2026, avec un usage mesuré.

**Spec (questionnaire du 2026-10-14 et du 15, recommandations retenues sauf
mention)** :
- **Place** : 07, à part, sans flèche. Pas de rubrique Articles (CONTRAT :
  hors périmètre).
- **Forme** : le gabarit projet. Encadré : Product Manager par intérim ;
  une Product Designer et deux développeurs ; avril → juin 2026.
- **Fait clé** : « Cinq clients ont réduit un tableau de bord à une donnée,
  le temps passé rapporté à un objectif. En ligne depuis juin, la page est
  déjà ouverte par près d'une organisation cliente active sur trois. »
- **Corps** : le point de départ ; trois risques avant de développer ;
  l'atelier ; ce que les clients ont dit ; ce qui a été construit, puis
  l'adoption (parts et rapports, C2) ; ce que j'en retiens. Épilogue : la
  suite porte sur l'interrogation des données en langage naturel (sans
  « offre premium », sauf accord de Jean).
- **Écarté** : le temps par vue, l'export, les volumes, les noms internes ;
  la saisie de l'objectif présentée comme un frein (Jean : c'est un choix,
  des statistiques sans repère ne font pas sens).
- **Visuels** : trois schémas (frise de l'atelier, de la donnée à la
  décision, les trois niveaux) ; deux captures du tableau de bord, noms,
  e-mails et groupes fictifs, organisation et logo masqués (C3). Agrégats
  réels ou fictifs : à trancher par Jean (C2). Photos de l'atelier si Jean
  en trouve, sans visage, nom ni verbatim lisible.
- **Carte** : tags Facilitation · Data produit · B2B. Le tableau à post-its
  passe à cette carte, avec une nouvelle animation ; les Mises en situation
  prennent une scène neuve, « la conversation » (un apprenant face à un
  écran, des bulles au trait alternent, l'écran tend une seule fiche
  ambre : le retour).

**Rédaction FR (2026-10-15)** : brouillon par un agent, relevé des
lourdeurs par un autre, tri de Jean, puis une passe avec les skills
`ligne-editoriale` et `relecture-non-initie`. Choix de Jean : titre
« Tableau de bord client : écouter cinq clients avant de construire » ;
fait clé sur la méthode, sans chiffre (« Avant de construire un tableau de
bord, j'ai demandé à cinq clients quelles décisions ils devaient prendre, à
quel moment et dans quel but, plutôt que quels graphiques ils voulaient. ») ;
rôle « Head of Product, Product Manager du projet » ; « école » plutôt
qu'« établissement d'enseignement » ; « tableau de bord »
plutôt que « dashboard », comme sur le reste du site ; la page vide sans
objectif n'est pas mentionnée ; le matériel de l'atelier sort de « Pour
aller plus loin ». L'atelier a eu lieu le 8 avril 2026, pendant le
quarterly.

**Anglais (2026-10-15)** : traduction par un agent, relevé par un autre,
quatorze calques corrigés avec l'accord de Jean, qui en fait une règle
(skill `ligne-editoriale`, « Le miroir anglais » : un anglais naturel, pas
une traduction ; relevé anglais par un agent qui n'a pas traduit).

**Photo (2026-10-15)** : Jean seul, de face, devant le mur des paperboards
(référence du fichier dans la source, hors dépôt). Aucun participant, rien
à flouter ; en pleine résolution, aucun post-it ni la feuille tenue en main
ne sont lisibles. L'autre photo (Jean de dos, trois participants de face)
est écartée. Place : section « L'atelier », avant la frise.

**Schémas (2026-10-15)** : trois schémas fixes par un agent
(`prompts/9-schemas-atelier-pilotage.md`, `ops/images/atelier-pilotage/`),
FR et EN, large et étroit, vérificateur muet. Corrigé à la demande de
Jean : niveaux au trait, un point sur les barres qui atteignent
l'objectif. Les versions étroites restent (lecture au téléphone), servies
par un `<picture>` comme la Fusion.

**Intégration (2026-10-15)** : par un agent
(`prompts/9-integration-atelier-pilotage.md`), pages
`/projets/tableau-de-bord-client/` et `/en/projects/client-dashboard/`,
carte 07 « à part » (scène `aucune` en attendant l'animation) ; les cartes
06 et 07 passent à une par ligne au-dessus de 960 px. Tests et revue par un
second agent, en contexte neuf : la page entre dans `JUMELLES`, le lexique
des infobulles la cite (règle 0088), alt distincts pour les deux captures.
`npm run build` 19 pages, `npm test` 193/193. Défaut de session corrigé :
un remplacement d'espaces insécables avait effacé 53 signes de ponctuation
du texte FR, restaurés depuis le cache d'Astro et vérifiés identiques.
Images clés des deux scènes livrées (`ops/images/tableau-de-bord-scene/`,
`ops/images/conversation-scene/`), en attente du go de Jean.

**Découpage** : rédaction FR (~100) → relevé des lourdeurs, tri de Jean →
EN ; schémas FR et EN (~90) ; animations des deux cartes (~60, sans doute
plus avec la scène neuve) ; intégration, captures et tests (~120).

**Animations (2026-10-15)** : images clés validées par Jean, animées par un
agent (`prompts/9-animation-scenes.md`) : `SceneTableauDeBord` (carte 07, les
seize post-its se fondent en un post-it ambre) remplace
`SceneMisesEnSituation` ; `SceneConversation` (carte 01, deux bulles puis la
fiche ambre) est neuve ; pose `assis` ajoutée. 600 ms chacune. Aucun bras
au-dessus de l'épaule, relevé tous les 50 ms à 1280 et 390 px, puis vérifié
par le calcul en revue. La fiche ambre apparaît devant l'écran, fidèle à
l'image validée. Revue en contexte neuf : `tests/scenes.test.mjs` couvre
toutes les variantes au même régime. Description de l'accueil passée à
« sept projets ».

**Numéro** : inscrit d'abord en 0089, renuméroté 0090 au moment du commit,
le 0089 ayant été pris le même jour par le relief de l'accueil, mené dans
une autre session.

**Clos le 2026-10-15** : `npm run build` 19 pages, `npm test` 199/199,
vérificateur de confidentialité muet. **Coût réel ~1 220 k pour 370
estimés (ratio 3,3)**, sous-agents seuls (cette session n'a pas de coût
mesurable) : deux relevés et deux revues, la traduction, et surtout un
périmètre qui a grossi en route (photo, captures, deux scènes au lieu
d'une, tests des scènes). À compter au prochain recalibrage.
