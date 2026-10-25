# Brief — rédiger la page « Mon métier en clair » (registre/0094)

Le portfolio de Jean (Head of Product) s'adresse à des recruteurs. Cette
page vise le **lecteur non initié** : un RH généraliste qui ne connaît ni le
métier du produit ni la technique, et qui lit en deux minutes. Tu rédiges un
brouillon **en français seulement** (l'anglais viendra après le tri de
Jean). Tu ne touches pas au site (`src/`) : un seul fichier,
`redaction/mon-metier.fr.md`.

## Ce que tu lis

1. La spec : `registre/0094-mon-metier-en-clair.md`. Elle fait foi : les
   quatre sections, la comparaison, les faits dictés par Jean, les preuves,
   ce qui n'entre pas.
2. La page voisine, pour ne rien redire : `src/pages/a-propos.astro`.

Applique les skills `ligne-editoriale` et `relecture-non-initie`, en entier.
La question à chaque phrase : un RH qui n'a jamais travaillé dans le produit
la comprend-il du premier coup, et sait-il pourquoi elle est là ?

## Les règles, sans exception

- **C1** : jamais le nom de l'employeur ; « une entreprise EdTech » au
  besoin. Les rôles (CEO, CPO, CTO) se nomment, jamais les personnes.
- **C2** : aucun volume, seulement les parts et ordres de grandeur de la
  spec (« une organisation active sur six », « près d'une sur trois »,
  « 1 question sur 20 », « plusieurs dizaines de milliers d'euros »).
- **C3, C4** : aucun nom de personne, d'outil, de table ni de page interne.
- Jamais « pour les nuls », ni rien qui juge le lecteur.
- Les mots du site : « learning designers », « account managers »
  (expliqués une fois : qui suivent les entreprises clientes), « Product
  Manager », « Product Designer ». Ni « PM », ni « Sales », ni « CSM », ni
  « renew », ni « upsell », ni « analyse coût-intérêt ».
- Un fait manquant devient `[À COMPLÉTER]`, jamais une invention. N'ajoute
  aucun geste ni aucun interlocuteur que la spec ne donne pas.

## La page

Environ 450 mots, quatre sections `##`, dans l'ordre de la spec :

1. **Le métier**, en trois phrases, par la comparaison du réalisateur de
   film (le rôle produit). Il ne tient ni la caméra ni le décor ; il
   travaille chaque jour avec les techniciens et les décorateurs ; il
   choisit pour le public et tranche ; il rend compte au producteur. Fais
   correspondre chaque rôle sans l'alourdir.
2. **Je dirige mon équipe** : un Product Manager et deux Product Designers ;
   les entretiens chaque semaine ; faire grandir et évaluer (la Matrice de
   compétences en preuve, avec son lien) ; déléguer des projets entiers ; le
   recrutement d'une Product Designer, dans l'ordre de la spec ; la posture
   transmise face aux développeurs.
3. **Je travaille avec les autres équipes** : une phrase par interlocuteur
   (CTO et lead développeurs, account managers, learning designers,
   direction), chacune avec son geste.
4. **Trois points forts**, chacun en deux phrases au plus : le point fort,
   puis son résultat reformulé (pas le fait clé mot pour mot) et un lien
   vers le projet qui le prouve.

Fin de page : une ligne qui renvoie vers « À propos » (le parcours) et
LinkedIn. Les liens en Markdown, vers ces adresses : Tableau de bord client
`/projets/tableau-de-bord-client/`, Mises en situation
`/projets/mises-en-situation/`, Audit contenu `/projets/audit-contenu/`,
Matrice `/projets/matrice-competences/`, À propos `/a-propos/`. Chaque lien
dit où il mène.

Titres de section : courts, qui disent ce qui suit, sans question.

## Ce que tu rends

`redaction/mon-metier.fr.md`, avec en tête `titre: "Mon métier en clair"`
et `description:` (une phrase pour les moteurs de recherche, sans le nom de
l'employeur). En commentaire HTML en tête : la ligne-lien de l'accueil telle
que la spec la fixe, et ta proposition si tu en vois une meilleure. En fin
de fichier, en commentaire HTML : le compte de mots, chaque `[À COMPLÉTER]`,
et les phrases de plus de 30 mots s'il en reste.

Rapport de 250 mots au plus. Ne commite rien. Ne touche ni à `public/`, ni
à `src/`, ni aux registres. Environnement : Windows, Git Bash.
