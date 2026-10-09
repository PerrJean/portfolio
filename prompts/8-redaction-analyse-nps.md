# Brief — rédiger le projet « Comprendre la chute du NPS » (registre/0084)

Le portfolio de Jean (Head of Product) s'adresse à des recruteurs qui lisent
vite. Tu rédiges un **sixième projet**, en brouillon, à partir de sa source.
Tu ne touches pas au site (`src/`) : seulement deux fichiers dans
`redaction/`.

## Ce que tu lis

1. La source : `C:\Users\Jean PERRIER\UserVoice\data\imports\portfolio_uservoice_source.md`,
   sections « Deuxième temps », « Les méthodes », « Ce qui en est sorti »,
   « Ce que j'en retiens » (le premier temps a déjà sa page). Ne lis aucun
   autre fichier de ce dossier.
2. Le modèle de forme : `src/contenu/projets/fr/uservoice.md` (en-tête,
   encadré, synthèse, corps, volet « Pour aller plus loin »).
Applique le skill `ligne-editoriale`.

## Le récit

UserVoice a construit la sonde. À la rentrée 2026, le NPS des apprenants
chute d'une vingtaine de points en un mois. Jean écrit l'analyse avant les
pages, en cascade (ce qui bouge, qui répond, ce qu'on peut changer), fait
tester ses hypothèses par des agents IA (son rôle : formuler l'hypothèse,
dire la décision à éclairer, contester la méthode, vérifier les chiffres).
Conclusion : la satisfaction dépend d'abord du public et de la façon dont
l'outil est déployé chez le client, pas du produit. L'épisode de
l'hypothèse 14 (le signal net du questionnaire aux account managers,
démenti par les données réelles, la diapositive corrigée avant d'être
montrée). Ce qui en sort : deux leviers, trois priorités produit, une autre
lecture du NPS, et ce qui a été décidé le 9 octobre 2026 : une enquête
qualitative auprès des apprenants à qui l'outil est imposé, dans les
organisations ciblées ; la poursuite des corrections du contenu (le projet
Audit contenu) ; une présentation à la direction commerciale B2B.

## Les règles, sans exception

- **C1** : jamais le nom de l'employeur ; « une plateforme EdTech ».
- **C2** : aucun NPS en valeur, aucun effectif interne en absolu. Des écarts
  et des ordres de grandeur : « une vingtaine de points perdus en un mois »,
  « jusqu'à 45 points d'écart entre publics », « 23 points sur 27 viennent du
  changement de public », « plusieurs milliers d'apprenants suivis », « des
  dizaines de milliers de sollicitations », « plusieurs centaines de
  volontaires ». Pourcentages, rapports et corrélations peuvent rester.
- **C3** : aucun nom de client, d'école ni de personne, aucun verbatim.
- **C4** : aucun nom d'outil interne ni d'éditeur (pas « Hotjar » : « l'ancien
  outil de questionnaire » ; pas « CRM » nommé, « les données commerciales »).
- **C8** : le constat se formule en levier, jamais en défaut du client ni de
  l'employeur (« le produit convainc ceux qui l'ont choisi ; chez ceux à qui
  on l'impose, le levier est le déploiement »).
- Rôles : « je » pour Jean, « les account managers », « l'équipe produit »,
  « la direction ». Pas d'invention : un fait manquant devient
  `[À COMPLÉTER]`.

## Ce que tu rends

- `redaction/analyse-nps.fr.md` puis `redaction/analyse-nps.en.md`, au
  format exact de `uservoice.md` : `titre`, `date: "2026-10"`, `cadre`
  (rôle : conception et pilotage de l'analyse, avec des agents IA ; équipe :
  seul pour l'analyse, les account managers et l'équipe produit pour les
  questionnaires et la restitution ; durée : octobre 2026, en cours),
  `fait`, `synthese` (problème, action, résultat), corps en sections `##`
  (800 à 1 100 mots), `plusLoin` (une section « Les hypothèses, une à une »
  avec les plus parlantes, chacune en une ligne : l'hypothèse, le test, le
  verdict ; une section « Les méthodes »), `langue`, `cle: analyseNps`.
- En tête de chaque fichier, en commentaire HTML, **trois faits clés au
  choix**, d'une phrase chacun.
- En fin de fichier FR, en commentaire HTML, la liste des chiffres convertis
  (source → publié).
Ne commite rien. Environnement : Windows, Git Bash.
