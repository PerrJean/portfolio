# Brief — appliquer le tri de « Mon métier en clair » (0094) et corriger 0098

Jean a trié le relevé des lourdeurs de `redaction/mon-metier.fr.md`. Tu
appliques ses choix **à la lettre**, sans réécrire autre chose, puis tu
corriges un fait sur la page Mises en situation (0098). Deux fichiers à lire :
`redaction/mon-metier.fr.md` et `registre/0098-mises-en-situation-ventes-complementaires.md`.
Charge les skills `ligne-editoriale` et `relecture-non-initie` pour les
seules retouches de liaison que l'assemblage impose.

## 1. Le tri, dans `redaction/mon-metier.fr.md`

Remplace chaque passage par le texte APRÈS ; les crochets sont les liens
existants, garde leurs adresses.

- **Ouverture** (section 1, en entier) : « Je suis Head of Product d’une
  plateforme d’apprentissage des langues en ligne, un rôle proche de celui
  d’un réalisateur de film. Je ne tiens pas la caméra : les développeurs
  construisent le produit, les designers dessinent les écrans. Avec eux, je
  décide de ce qu’on construit pour les apprenants et je tranche quand il
  faut choisir ; la direction, comme un producteur, valide les choix
  importants. »
- **Matrice** : « Je les aide à progresser et je les évalue. Avec le
  Product Manager, j’ai relu une [matrice de compétences] pour que nous
  ayons la même idée de ce que veut dire « devenir senior ». »
- **Recrutement** (« Je leur confie des projets entiers » quitte ce
  paragraphe) : « Quand j’ai recruté une Product Designer, j’ai trié les
  candidatures et indiqué aux ressources humaines celles à appeler en
  premier. J’ai mené deux entretiens, le second avec un cas pratique. J’ai
  ensuite présenté deux profils au directeur produit (CPO), mon manager, et
  au directeur général (CEO), avec ma préférence argumentée. »
- **Posture** : « Je leur confie des projets entiers, et je leur apprends à
  travailler avec les développeurs en portant la voix des apprenants :
  partir du besoin exprimé, et y revenir. Sur leurs projets de discovery, je
  choisis avec eux ce qu’il est utile de produire, et nous le validons
  ensemble. »
- **CTO et lead développeurs** : « Avec le directeur technique (CTO) et les
  deux développeurs qui encadrent les autres, j’ajuste notre façon de
  travailler, réunions comprises. Ensemble, nous décidons des prochains
  chantiers. »
- **Développeurs** : « Je soumets chaque demande aux développeurs, et nous
  pesons ensemble ce qu’un changement coûte face à ce qu’il apporte. »
- **Account managers** : « Les account managers suivent les entreprises
  clientes et me rapportent leurs problèmes et leurs besoins. En retour, je
  leur donne des outils pour renouveler les contrats et vendre davantage. »
- **Learning designers** : « Avec les learning designers, qui conçoivent
  les contenus pédagogiques, je pars de leurs besoins et nous construisons
  ensemble les outils qui leur manquent, comme l’Audit contenu, qui vérifie
  chaque question d’exercice. »
- **Direction** : « Avec le CEO, je prépare le comité produit, la réunion
  où la direction valide les choix importants, et sa présentation. »
- **Point fort 1** : « **Écouter avant de construire.** Avant de développer
  le [tableau de bord client], j’ai réuni cinq clients en atelier, pour
  partir des décisions qu’ils ont à prendre. En ligne depuis juin, il est
  adopté : plus de la moitié des organisations qui l’ont ouvert en septembre
  y sont revenues en octobre. »
- **Point fort 2** (titre gardé) : « **Faire avancer une équipe jusqu’au
  résultat.** Dans les [mises en situation orales], une IA joue
  l’interlocuteur de l’apprenant. J’ai cadré la méthode, puis le Product
  Manager et la Product Designer ont interrogé les clients. Le projet a
  apporté plusieurs dizaines de milliers d’euros de ventes complémentaires
  auprès des entreprises déjà clientes. »
- **Point fort 3** : « **Mettre l’IA au service de la qualité.** Avec une
  learning designer, j’ai fait vérifier par une IA chaque question
  d’exercice d’un premier parcours, dans l’[Audit contenu]. Une sur 20
  empêchait l’apprenant d’avoir juste, et toutes ont été corrigées. »
- **Description** (en-tête) : « Ce que fait Jean Perrier, Head of Product,
  expliqué en clair : l’équipe qu’il dirige, les équipes avec lesquelles il
  travaille et ses points forts. »
- **Ligne-lien de l'accueil** (commentaire de tête) : retenue
  « Mon métier et mes points forts, en clair (2 min) ».

Puis, acceptées par Jean sans autre tri :
- espaces insécables avant « : » et « ; », comme dans les pages projet ;
- dans « Je travaille avec les autres équipes », ordonne les paragraphes
  pour que deux paragraphes voisins ne s'ouvrent pas de la même façon,
  **sans changer les phrases** ;
- l'ouverture et la phrase du comité disent toutes deux que la direction
  valide les choix importants : garde la phrase du comité entière et
  allège la fin de l'ouverture, sans changer le fait (par exemple « la
  direction, comme un producteur, a le dernier mot sur les grands choix ») ;
- « Mon équipe compte un Product Manager et deux Product Designers » reste.

Mets à jour la note de fin : compte de mots, phrases de plus de 30 mots,
et remplace la liste « À trancher » par « Tri de Jean appliqué le
2026-10-25 ».

## 2. Le fait corrigé (0098)

Dans `src/contenu/projets/fr/mises-en-situation.md`, deux endroits : le
champ `resultat` (« …plusieurs dizaines de milliers d’euros de chiffre
d’affaires auprès de nouveaux clients ») et la phrase de « Bénéfices et
impact business » (« …plusieurs dizaines de milliers d’euros de chiffre
d’affaires nouveau »). Les deux deviennent « plusieurs dizaines de milliers
d’euros de ventes complémentaires auprès des entreprises déjà clientes »,
la phrase raccordée à son contexte. Mêmes endroits dans
`src/contenu/projets/en/speaking-practice.md` : « several tens of thousands
of euros in additional sales to existing client companies ». Vérifie que la
phrase suivante (« Les entreprises clientes veulent… ») ne fait pas
redite ; si oui, signale-le sans corriger.

Ne touche à rien d'autre. Lance `npm run build` pour vérifier que le site se
construit. **Ne commite pas** : un test rouge d'un autre chantier bloque le
hook. Rapport de 200 mots au plus, avec le diff des deux pages projet.
Environnement : Windows, Git Bash.
