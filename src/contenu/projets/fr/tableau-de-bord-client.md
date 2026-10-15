---
titre: "Tableau de bord client : écouter cinq clients avant de construire"
date: "2026-06"
cadre:
  role: "Head of Product, Product Manager du projet"
  equipe: "Une Product Designer et deux développeurs"
  duree: "Avril → juin 2026, puis le suivi de l’usage"
fait: "Avant de construire un tableau de bord, j’ai demandé à cinq clients quelles décisions ils devaient prendre, à quel moment et dans quel but, plutôt que quels graphiques ils voulaient."
synthese:
  probleme: "Une plateforme EdTech d’apprentissage des langues équipe des entreprises et des écoles. Une fois la plateforme déployée chez un client, il faut que ses apprenants l’adoptent vite, et en nombre. La direction voulait que les clients suivent cela eux-mêmes, avec un tableau de bord."
  action: "Avant de développer, j’ai réuni cinq clients en atelier. Nous sommes partis des décisions qu’ils ont à prendre, puis nous leur avons montré les maquettes de l’équipe."
  resultat: "L’atelier a confirmé les maquettes et resserré le tableau de bord sur une donnée : le temps passé, comparé à un objectif, par contrat, par groupe et par apprenant. En ligne depuis juin, il est adopté : plus de la moitié des organisations venues en septembre sont revenues en octobre."
plusLoin:
  - titre: "Le déroulé de l’atelier"
    points:
      - "La consigne du premier temps : un post-it par situation, sous la forme « Quand…, j’ai besoin de…, pour… ». L’exemple que j’ai donné : « Quand je prépare mon bilan mensuel, j’ai besoin de connaître le niveau d’activité des apprenants pour identifier les groupes qui nécessitent un accompagnement. »"
      - "Les relances, pour faire préciser la situation, l’information et la décision : « pour quoi faire ? », « à quel niveau ? », « pour décider quoi ? ». Un post-it qui disait « score », « progression » ou « tableau de bord », je le faisais reformuler en situation."
      - "Les points d’attention de l’animateur : ne pas passer trop tôt aux solutions, éviter le « je veux des stats », distinguer le besoin, la donnée attendue et la forme sous laquelle la recevoir."
langue: fr
cle: atelierPilotage
---

## Le point de départ

Chez chaque client, le suivi des apprenants reposait en partie sur les account managers, ses interlocuteurs attitrés. Ils analysaient ses données et proposaient des actions pour relancer l’usage.

La direction voulait que les clients fassent ce suivi eux-mêmes, avec un tableau de bord dans l’espace où ils gèrent leurs apprenants. L’idée était cohérente. Je l’ai traitée comme une hypothèse à vérifier avant de développer : les clients ont-ils ce besoin, et quel problème résoudre en premier ?

## Trois risques avant de développer

J’ai nommé trois risques, pour savoir quoi vérifier auprès des clients.

- **Un besoin à confirmer auprès des clients.** Les account managers font déjà certaines analyses pour eux : rien ne dit que les clients veulent, ou peuvent, les faire seuls.
- **Des clients différents.** Une entreprise et une école n’ont pas forcément les mêmes objectifs, ni les mêmes contraintes.
- **Un périmètre qui gonfle.** Un tableau de bord devient vite une accumulation de chiffres, de graphiques, de filtres et d’exports, sans décision claire à servir.

Je voulais donc partir des décisions que les clients prennent pour suivre leurs apprenants, plutôt que d’une liste de fonctionnalités.

## L’atelier

<figure>
  <a href="/captures/atelier-pilotage/photo-atelier.jpg"><img src="/captures/atelier-pilotage/photo-atelier.jpg" width="1600" height="1200" loading="lazy" decoding="async" alt="Jean Perrier debout devant le mur de l’atelier : des paperboards découpés par temps, couverts de post-its"></a>
  <figcaption>Le mur de l’atelier, découpé en trois temps</figcaption>
</figure>

En avril 2026, j’ai animé un atelier avec cinq clients : quatre écoles et une entreprise. Autour de la table, surtout des responsables de formation ou de pédagogie. La frise montre ses trois temps : le premier et le dernier ont pris l’essentiel de la séance.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/atelier-pilotage/frise.fr.svg" width="736" height="251">
    <img src="/illustrations/atelier-pilotage/frise.etroit.fr.svg" width="350" height="361" loading="lazy" decoding="async" alt="Les trois temps de l’atelier, de gauche à droite. Explorer : des situations aux décisions, puis aux données utiles. Projeter, écourté : les formats, puis le niveau de détail. Confronter : les maquettes, les retours des clients, l’hypothèse confirmée. Explorer et Confronter, plus larges et mis en couleur, ont pris l’essentiel de la séance.">
  </picture>
  <figcaption>Les trois temps de l’atelier</figcaption>
</figure>

D’abord, chaque participant notait sur des post-its des situations de son travail, comme la préparation d’un bilan mensuel. La consigne tenait en une phrase : « Quand…, j’ai besoin de…, pour… ». Pour chaque situation, je demandais quelle information il lui fallait, et pour décider quoi.

Le deuxième temps, sur la forme à donner aux chiffres (e-mail, export, tableau de bord), a été écourté.

Enfin, les participants ont découvert les maquettes de l’équipe et une démonstration. Je leur demandais si ces écrans les aidaient à décider, ce qui manquait et ce qu’il fallait enlever.

## Ce que les clients ont dit

Les cinq clients ont cité le même besoin en premier : suivre le temps que leurs apprenants passent sur la plateforme. Seul, ce chiffre ne leur suffisait pas. Ils voulaient le comparer à un objectif qu’ils fixent eux-mêmes.

Le schéma le montre sur un exemple inventé pour la page.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/atelier-pilotage/donnee-decision.fr.svg" width="736" height="202">
    <img src="/illustrations/atelier-pilotage/donnee-decision.etroit.fr.svg" width="350" height="445" loading="lazy" decoding="async" alt="Exemple fictif, en trois étapes. Donnée brute : temps passé, 6 heures. Donnée comparée : objectif de 10 heures, 6 réalisées, soit 60 % de l’objectif ; l’écart restant est mis en couleur. Décision : repérer les apprenants et les groupes à accompagner.">
  </picture>
  <figcaption>Le temps passé ne dit rien seul ; face à un objectif, il montre où agir (exemple fictif)</figcaption>
</figure>

Un apprenant qui vise 10 heures et en a passé 6 a atteint 60 % de son objectif. Seul, le temps passé ne dit pas si un apprenant s’engage ; face à un objectif, il montre qui est en retard, et donc où agir.

Les clients voulaient lire cet écart à trois niveaux : le contrat, pour la vue d’ensemble ; le groupe, pour repérer les classes ou les équipes en retard ; l’apprenant, pour savoir qui a atteint son objectif.

<figure class="schema-dessine">
  <picture>
    <source media="(min-width: 48.5rem)" srcset="/illustrations/atelier-pilotage/niveaux.fr.svg" width="736" height="332">
    <img src="/illustrations/atelier-pilotage/niveaux.etroit.fr.svg" width="350" height="468" loading="lazy" decoding="async" alt="La même lecture à trois niveaux, du plus large au plus fin : le temps passé face à la ligne de l’objectif, l’écart mis en couleur. Contrat : la vue d’ensemble, une seule barre. Groupe : les classes ou équipes en retard, quelques barres. Apprenant : qui a atteint son objectif, une barre par personne, un point au bout de celles qui l’atteignent.">
  </picture>
  <figcaption>Le même écart, du contrat à l’apprenant</figcaption>
</figure>

Les besoins des quatre écoles et de l’entreprise se sont rejoints. Le signal est encourageant, mais une seule entreprise ne permet pas de généraliser.

Les maquettes de l’équipe répondaient déjà à ces attentes, et l’atelier les a confirmées. Surtout, il a fixé ce que la première version contiendrait : une donnée, un objectif, trois niveaux, plutôt que toutes les statistiques possibles.

## Ce qui a été construit

Le tableau de bord est en ligne depuis le 25 juin 2026, à la place de l’ancienne page de statistiques. Il suit à la lettre ce que l’atelier a fait ressortir.

<figure>
  <a href="/captures/atelier-pilotage/capture-graphique.jpg"><img src="/captures/atelier-pilotage/capture-graphique.jpg" width="1026" height="631" loading="lazy" decoding="async" alt="Le haut du tableau de bord : le temps moyen, la part d’apprenants actifs et en bonne voie, puis le temps cumulé face à la ligne de l’objectif. Données fictives."></a>
  <figcaption>Les indicateurs et le temps cumulé face à l’objectif (données fictives)</figcaption>
</figure>

<figure>
  <a href="/captures/atelier-pilotage/capture-tableau.jpg"><img src="/captures/atelier-pilotage/capture-tableau.jpg" width="1026" height="631" loading="lazy" decoding="async" alt="La liste des apprenants, chacun avec son groupe, son temps et sa situation face à l’objectif : en bonne voie, atteint, en retard ou non démarré. Données fictives."></a>
  <figcaption>Le suivi par apprenant (données fictives)</figcaption>
</figure>

En haut, le temps moyen et la part d’apprenants actifs et en bonne voie ; au milieu, le temps cumulé face à la ligne de l’objectif ; en bas, chaque apprenant, avec son avance ou son retard.

L’usage a décollé à la rentrée. En septembre, une organisation cliente active sur six a ouvert le tableau de bord ; lors de la première quinzaine d’octobre, déjà près d’une sur trois. Plus de la moitié des organisations venues en septembre sont revenues en octobre, contre moins d’une sur trois de juillet à août.

Une partie de cette hausse tient à la saison et à la disparition de l’ancienne page : ces chiffres mesurent l’adoption, pas son effet sur les apprenants. Les premiers utilisateurs sont les professeurs, plus que les responsables réunis à l’atelier.

Le tableau de bord est utilisé, et nous n’y avons pas touché depuis. La suite porte sur une autre façon d’interroger les données, en posant sa question par écrit pour obtenir la réponse chiffrée.

## Ce que j’en retiens

**Questionner une demande, même cohérente.** La vérifier avant de développer évite d’investir à l’aveugle. Ici, l’atelier a dit par où commencer.

**Une discovery peut confirmer une hypothèse.** L’atelier a confirmé l’idée de départ au lieu de la renverser. L’équipe a développé en sachant pourquoi elle répondait au besoin, et ce qu’elle pouvait laisser de côté.

**Partir de la décision à prendre.** Je pose d’abord une question : quelle décision le client doit-il prendre, et de quelle information a-t-il besoin ? La liste des statistiques à afficher en découle.
