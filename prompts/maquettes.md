# Brief — trois maquettes de direction visuelle (registre/0003)

Tu fais **une** des trois directions. Le texte est le même pour les trois :
seule la forme se compare. Ne change pas le texte, sauf pour couper s'il ne
tient pas ; dis-le alors dans ton compte rendu.

## Le lecteur, et ce qu'il doit comprendre en 30 secondes

Un recruteur pour un poste de Product Manager, Head of Product, CPO ou AI /
Data PM. Il ouvre souvent le lien depuis LinkedIn, parfois au téléphone, et
n'a pas le temps de tout lire. En 5 secondes : qui est Jean et ce qu'il
apporte. En 30 : l'histoire en deux actes et trois preuves par acte. Le reste
existe pour qui creuse.

Il doit repartir avec quatre idées : **user-first**, **solution-driven**,
**IA appliquée**, **data**. Le cap design : trancher avec le côté très
méthodique des projets pour montrer un vrai goût, **sans desservir le
propos**. La forme sert la hiérarchie, jamais l'inverse.

## Ce que tu livres

Trois artboards `.dc.html`, dans le dossier `project/` que te donne ton
prompt, aux noms qu'il te donne :

1. **Accueil**, desktop, largeur 1440 ; hauteur libre, celle du contenu.
2. **Haut de la page projet UserVoice**, desktop, 1440 de large : jusqu'au
   « Pour aller plus loin » replié compris.
3. **Accueil au téléphone**, 390 × 844 : le premier écran seulement.

Format : les règles de `format.md` (le second fichier de ton prompt). À
retenir absolument : la ligne `<script src="./support.js"></script>`
exacte dans `<head>` ; `<html lang="fr">` ; un `<title>` par artboard ; tous
les éléments fermés, tous les attributs entre guillemets ; une racine à
taille **fixe**, égale au `$preview` ; flex ou grid avec `gap` ; le bloc
`<script type="text/x-dc" data-dc-script>` toujours présent ; pas
d'`innerHTML` ; aucune requête réseau hors d'un `<link>` Google Fonts `css2`
dans `<helmet>` ; pas d'image externe (schémas en SVG inline) ; pas d'emoji ;
icônes en SVG inline au trait. Un ou deux `data-props` au plus (la couleur
d'accent, par exemple), jamais pour du texte.

Accessible comme dessiné : de vrais `<a href>` et `<button>`, contraste
4,5:1 (3:1 au-delà de 24 px), le gris des légendes assombri. La bascule
FR | EN est deux vrais liens, FR marqué comme courant (`aria-current`).

Évite les tics d'IA : dégradés, cartes à bordure gauche colorée, emoji, et
les polices Inter, Roboto, Arial, Fraunces, Space Grotesk. Une à trois
familles, pas plus. Pas de chiffre, de logo ou de témoignage inventé. Pas de
remplissage : si une zone paraît vide, c'est la composition qui doit
répondre.

**Ne publie rien, ne lis rien d'autre, ne vérifie pas par capture.** Écris
les trois fichiers, puis rends compte.

## Compte rendu attendu

- Les trois fichiers, et pour chacun `w` × `h` exacts.
- Polices et palette (hex).
- L'intention en trois lignes : ce que la direction dit de Jean.
- Son principal compromis, honnêtement : ce qu'elle risque.

## Le texte

### Barre du haut

Jean Perrier (à gauche) · Projets · Méthode · À propos · FR | EN (à droite,
FR courant).

### Accroche

- Surtitre : Product · IA appliquée · Data
- Titre : En écoutant les apprenants, j'ai trouvé le premier levier de leur
  satisfaction. Alors j'ai agi dessus.
- Sous-titre : Deux projets menés de bout en bout sur une plateforme EdTech.
  D'abord mesurer ce que disent les utilisateurs, puis corriger ce qui les
  gêne : le contenu et ses explications.
- Action principale (une seule) : Lire l'histoire en deux actes

### Acte I — Écouter

- Nom : UserVoice
- Phrase : Quatre sources de retours apprenants réunies en une seule,
  qualifiées par l'IA avec un humain là où elle doute, pour décider chaque
  semaine quoi traiter.
- Trois chiffres :
  - « 4 → 1 » : sources de retours réunies en une seule table
  - « −87 % » : de file de validation humaine, en trois jours
  - « 4 questions » : de décision dans le bilan hebdomadaire
- Ce qu'il a révélé : Le premier levier de satisfaction n'était pas un bug.
  C'était la qualité du contenu et de ses explications.
- Lien : Voir le projet

### Transition

Alors j'ai agi dessus.

### Acte II — Agir

- Nom : Audit contenu
- Phrase : L'audit qualité de tout un corpus pédagogique, mené par des agents
  IA encadrés, qui livre des corrections prêtes à relire, sans jamais écrire
  en base.
- Trois chiffres :
  - « 6 critères » : par question, de l'énoncé à l'explication
  - « 100 % » : du corpus balayé par des contrôles automatiques
  - « 0 » : écriture directe ; des lots de corrections, relus avant
    application
- Lien : Voir le projet

### Acte III — emplacement discret, pas un bloc de même rang

À venir : faire grandir les équipes. Acculturation à l'IA, référentiel de
compétences produit.

### Ce que j'apporte

1. **Écouter à l'échelle.** Transformer des milliers de retours en quelques
   décisions par semaine, avec le statut de traitement en face.
2. **Agir sur la qualité.** Définir une grille, auditer un corpus entier,
   livrer des corrections qu'une équipe peut relire et appliquer.
3. **L'IA en production, avec des garde-fous.** Agents encadrés, décisions
   tracées, coût mesuré, relecture indépendante : une IA qui tient dans la
   durée.

### Portes (secondaires : elles montrent que ça existe)

- Ma méthode avec l'IA : 25 commandements tirés de 30 millions de tokens
  mesurés.
- Les erreurs que j'ai payées, et la règle que chacune a laissée.
- À propos.

### Pied de page

© 2026 Jean Perrier · LinkedIn · FR | EN

### Page projet UserVoice (haut)

- Fil : Acte I · Écouter
- Titre : UserVoice. Faire décider à partir de ce que disent les apprenants.
- Rôle : Conception, construction et exploitation, en solo avec Claude Code
- Durée : 3 semaines de construction, puis un cycle quotidien
- Outils : Python · SQL · Streamlit · Claude · n8n
- Les trois chiffres de l'acte I, repris.
- Synthèse en quatre blocs :
  - **Le problème.** Des milliers de retours par an, dispersés dans quatre
    outils, qualifiés à la main avec des semaines de retard. Les mêmes sujets
    revenaient sans qu'on sache s'ils étaient déjà traités.
  - **Ce que j'ai fait.** Une table unique pour les quatre sources. Une
    qualification sur deux axes, bugs et thèmes de satisfaction, par l'IA ;
    un humain seulement là où elle doute. Un bilan hebdomadaire qui croise le
    volume et le statut de traitement.
  - **Le résultat.** La file de validation humaine a fondu de 87 % en trois
    jours. Et la donnée a désigné le premier levier de satisfaction : la
    qualité du contenu et de ses explications.
  - **Ce que ça dit de ma façon de travailler.** Je pars de la décision à
    prendre, pas des données disponibles. Chaque saisie humaine est une
    dette : je cherche d'abord à la déduire.
- Schéma (SVG inline, dans le style de ta direction) : quatre sources → une
  table unique → qualification (IA, humain si doute) → priorisation → trois
  vues. Légende : Le cycle quotidien. Une seule étape demande un geste
  humain, et elle se réduit avec le temps.
- « Pour aller plus loin », replié, trois entrées : Les décisions que j'ai
  écartées · L'architecture en quatre étages · Les pièges que j'ai payés.

### Téléphone

Barre du haut réduite (nom, FR | EN, menu), accroche complète, action
principale, et le début de l'acte I qui dépasse en bas de l'écran pour
inviter au défilement.
