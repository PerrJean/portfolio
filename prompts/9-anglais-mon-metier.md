# Brief — trois retouches FR, puis la version anglaise de « Mon métier en clair » (0094)

## 1. Trois retouches tranchées par Jean, à appliquer mot pour mot

Dans `redaction/mon-metier.fr.md` :
- Ouverture, troisième phrase. AVANT « Avec eux, je décide de ce qu’on
  construit pour les apprenants et je tranche quand il faut choisir ; la
  direction, comme un producteur, a le dernier mot sur les grands choix. »
  APRÈS « Avec eux, je décide de ce qu’on construit pour les apprenants ;
  comme un producteur, la direction a le dernier mot sur les grands choix. »
- Learning designers. AVANT « …les outils qui leur manquent, comme l’Audit
  contenu, qui vérifie chaque question d’exercice. » APRÈS « …les outils
  qui leur manquent. L’Audit contenu, par exemple, vérifie chaque question
  d’exercice. »
- Mets à jour le compte de mots de la note de fin.

Dans `src/contenu/projets/fr/mises-en-situation.md` : « Les entreprises
clientes veulent voir » devient « Ces entreprises veulent voir ». Dans
`src/contenu/projets/en/speaking-practice.md` : « Client companies want to
see » devient « These companies want to see ».

## 2. La jumelle anglaise (C7)

Le texte français est alors validé par Jean. Tu en fais la jumelle anglaise,
pour un recruteur non initié (RH généraliste) qui lit en deux minutes. Un
seul fichier : `redaction/mon-metier.en.md`. Tu ne touches pas au reste du
site.

Ce que tu lis : `redaction/mon-metier.fr.md` (la note de fin ne se traduit
pas) et, pour la voix anglaise déjà en ligne, `src/pages/en/about.astro`.
Applique le skill `ligne-editoriale`, section « Le miroir anglais », et
`relecture-non-initie`.

- **Un anglais naturel, pas une traduction** : une phrase qu'un anglophone
  n'aurait pas écrite se réécrit, même juste en grammaire. Rien à ajouter,
  rien à retirer.
- Titre : « My job in plain words ». Ligne-lien de l'accueil EN, en
  commentaire de tête : « My job and my strengths, in plain words (2 min) »,
  ou mieux si tu trouves plus naturel ; dis-le.
- La comparaison : « a film director », « the producer ». Les sigles comme
  en français : « Chief Product Officer (CPO) », « CEO », « Chief Technology
  Officer (CTO) » à la première mention.
- Mots du site : « learning designers », « account managers », « Product
  Manager », « Product Designer », « discovery », « role-plays » (comme sur
  la page Speaking practice), « dashboard ». Le résultat : « several tens of
  thousands of euros in additional sales to existing client companies ».
- Liens vers les adresses EN : `/en/projects/client-dashboard/`,
  `/en/projects/speaking-practice/`, `/en/projects/content-audit/`,
  `/en/projects/skills-matrix/`, `/en/about/`.
- Typographie anglaise : guillemets “ ”, apostrophe ’, pas d'espace avant
  `: ; ? !`.
- En-tête : `titre`, `description`, `langue: en`, `cle: monMetier`.

Rapport de 200 mots au plus : les choix de traduction discutables. Ne
commite rien (un test rouge d'un autre chantier bloque le hook).
Environnement : Windows, Git Bash.
