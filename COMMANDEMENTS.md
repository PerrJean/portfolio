# Les commandements d'un projet vibe codé

**Version 2, 22 septembre 2026.** La v1 sortait des mesures du projet Audit
contenu : 69 modules, 69 555 lignes, 233 points de décision, 30 M de tokens
mesurés sur 4 semaines. La v2 la confronte à la doc officielle de Claude Code,
au standard AGENTS.md, à la pratique spec-driven, et aux deux sources
empiriques de 2026 citées en fin de fichier.

**Usage.** Coller au démarrage d'un projet, ou servir de fichier de règles de
départ. Volontairement court : un fichier de règles qui prêche la sobriété et
pèse 800 lignes ne sera pas suivi. Chaque commandement porte, quand elle
existe, la mesure qui l'a payé.

---

## I. Avant la première ligne

### 1. Fais-toi interviewer, puis écris la spec
Avant de coder, demander à l'agent de mener l'entretien : implémentation, cas
limites, arbitrages, ce qui est hors périmètre. Jusqu'à épuisement du sujet,
puis une spec écrite dans un fichier. **Ensuite, session neuve pour
implémenter**, avec un contexte propre et la spec en référence.
C'est la recommandation officielle, et c'est ce qui remplace l'illusion qu'on
saurait spécifier seul un domaine qu'on découvre.

### 2. Écris le contrat en 100 lignes maximum
Ce qui entre, ce qui sort, ce qui est explicitement hors périmètre. Si le
contrat ne tient pas en 100 lignes, le projet n'est pas prêt : il faut le
découper en projets qui se parlent par fichiers.

### 3. Ouvre git au premier fichier
Deux minutes.
*Payé : 14 jours de travail hors histoire, donc non mesurables.*

### 4. Le paramètre avant le cas particulier
Le premier cas traité, un client, un container, un fichier pilote, n'est jamais
en dur. Il entre dans une table de référence dont le code dérive.

### 5. Une passe de reconnaissance, puis trois tests rouges
D'abord un script jetable qui lit vingt enregistrements réels et affiche leur
structure, champ par champ, sans rien concevoir. Il produit le glossaire : les
noms tels qu'ils sont dans la donnée, pas tels qu'on les suppose.
Ensuite, trois tests qui décrivent les comportements centraux et qui échouent,
écrits sur la donnée réelle, jamais sur une donnée imaginée.
**Toute règle métier que la donnée ne tranche pas devient un test ignoré,
marqué ARBITRAGE, jamais une hypothèse silencieuse.** La liste des tests
ignorés est le carnet d'arbitrages à rendre à l'humain.
*Payé : un nom de champ supposé au lieu d'être lu, trois fois le même jour, et
51 % d'artefacts sur une mesure. Et 21 des 209 points clos étaient des
arbitrages, tous découverts en cours de route.*

---

## II. La forme du code

### 6. Un module plafonne à 500 lignes, 800 en limite dure
Le module qui dépasse se scinde dans le chantier qui l'a fait dépasser. Sans
plafond écrit, l'incitation joue contre toi : pour un agent, ajouter à un
fichier coûte toujours moins cher que d'en créer un.
*Payé : trois modules entre 5 400 et 7 600 lignes, les trois plus réécrits.*

### 7. Une fonction fait une chose, et se teste sans monter le décor
80 lignes est le seuil où l'on se pose la question, pas une loi. Trois cas
dépassent légitimement : une ligne de commande à nombreuses options, une table
de données littérale, une fonction de rendu qui assemble un gabarit.
**Non négociable : la ligne de commande n'orchestre pas.** Elle lit les
arguments, puis appelle une fonction à paramètres explicites.
*Payé : un `main()` de 1 285 lignes et 47 branches qui faisait les deux, et un
défaut de commit non vérifié qui s'y cachait.*

### 8. Les tests vivent à côté du module, pas dedans
*Payé : 14 301 lignes de tests logées dans 61 modules, soit 20 % du volume du
projet mêlé au code qu'il vérifie.*

### 9. Un artefact, un lecteur
Un tableau de bord, un rapport, une page se découpent par question posée et par
personne qui la pose, pas par taille.
*Payé : une page unique de 8,4 Mo, 48 sections, 41 tableaux, régénérée en
entier à chaque changement de détail.*

---

## III. Le contexte, qui est le vrai budget

### 10. Ce qui ne sert que parfois devient un skill, pas un paragraphe
Le fichier de règles est lu en entier à chaque session. Ce qui ne concerne
qu'une famille de tâches part dans un skill, chargé à la demande d'après sa
description. C'est un mécanisme natif, pas une discipline à tenir.
Le fichier principal garde le contrat, le parcours, le point d'entrée, les
règles non négociables, et l'aiguillage.
*Payé : un fichier de règles de 1 306 lignes et 26 000 tokens lu par 46 prompts
sur 70, plus une annexe SQL de 23 000 tokens. Un chantier ouvrait couramment
80 000 tokens de contexte avant de commencer, pour un coût moyen de 237 000
tokens par point.*

### 11. Le fichier de règles plafonne à 300 lignes, et s'imbrique par dossier
Au delà, un fichier par sous-projet, l'agent lisant le plus proche dans
l'arborescence. Le format ouvert `AGENTS.md` fait cela nativement et est lu par
la plupart des outils. Test par ligne : **son retrait ferait-il faire une
erreur ?** Sinon, elle sort.

### 12. Un prompt de chantier ne nomme pas plus de deux fichiers à lire
Si le chantier en exige trois, c'est le découpage du code qui est en cause, pas
le prompt.

### 13. Une règle vérifiable devient un test, une règle de processus devient un hook
Trois destinations, trois natures. Une propriété du code devient un test. Une
règle de processus devient un hook, qui est déterministe là où un paragraphe
n'est qu'indicatif. Ce qui reste est de la doctrine, et seulement cela.
Une règle en prose coûte du contexte à chaque session, pour toujours. Un test
ne coûte rien tant qu'il ne casse pas.
*Payé : sur six formes de défaut déclarées, trois n'avaient aucun garde-fou, et
l'une d'elles est revenue quatre fois.*

### 14. Une leçon vit dans son fichier, datée et mesurée
On ne le lit pas pour agir, on le lit pour changer une règle. Sans lui, une
règle supprimée se repaie.

### 15. Ce qui est décidé et pas fait vit dans un fichier
Une décision qui ne vit que dans une conversation est perdue à la conversation
suivante.

---

## IV. La vérification

### 16. Donne à l'agent de quoi vérifier son propre travail
Un test, un build, une capture à comparer, un script qui diffe une sortie
contre une référence. Sans cela, "ça a l'air fini" est le seul signal
disponible, et c'est toi la boucle de vérification.

### 17. Le relecteur n'est pas l'auteur
La revue d'un chantier se fait dans un contexte neuf, qui ne voit que le diff
et les critères, pas le raisonnement qui a produit le code. Même chose pour les
tests : celui qui écrit le code n'écrit pas les tests qui le valident.
*Payé ailleurs : sur sept projets vibe codés étudiés, les suites de tests
auto-générées ne couvraient que le chemin heureux, et une suite
d'authentification passait au vert avec un login cassé.*

### 18. Exige la preuve, pas l'affirmation
La sortie du test, la commande et son retour, la capture. Relire une preuve est
plus rapide que refaire la vérification, et cela marche pour les sessions que
tu n'as pas regardées.

### 19. Le secret n'entre pas dans le dépôt, l'entrée n'est jamais de confiance
Un scan de secrets et une vérification des entrées, branchés en hook, pas en
intention.
*Payé ailleurs : 970 vulnérabilités sur sept projets vibe codés, dont 801 de
sévérité haute, et plus de 70 % en chemins, secrets en dur et entrées non
validées.*

---

## V. La mesure et les arrêts

### 20. Un chantier s'inscrit avec son coût estimé, et se clôt avec son coût réel
Cinq champs : coût estimé, coût réel, nature (défaut, chantier, arbitrage),
étape, modèle. Ce sont eux qui rendent un retex possible, et rien d'autre.
Un chantier fait en session principale n'a aucun coût mesurable.
**Nuance assumée** : la doc officielle recommande de sauter la procédure quand
le diff tient en une phrase. Tant que la calibration n'existe pas, tout passer
par un sous-agent se défend. Une fois 30 points mesurés, s'autoriser les
correctifs d'une ligne en session.

### 21. Estime, compare, recalibre tous les 30 points
*Payé : ratio réel sur estimé médian de 1,70 et 88 % de dépassements sur 119
points, avec une calibration jamais refaite.*

### 22. Un point de décision, un fichier
*Payé : le registre présent dans 282 des 358 commits, soit 79 %.*

### 23. Construis le rollback avant l'écriture
Registre des lots, rollback vérifié, puis écriture. Dans cet ordre.
*Payé : 21 % du budget et un tiers des défauts concentrés sur cette étape.*

### 24. Budgète l'outil qui sert à faire l'outil
Poste déclaré, plafond à 15 %. Au delà, signal d'arrêt, pas imprévu.
*Payé : 16 % du budget parti dans l'application elle-même.*

### 25. Tous les 30 points clos, trois chiffres et un arrêt possible
Ratio réel sur estimé, part de défauts parmi les points clos, taille du plus
gros module. Seuils : 2, 30 %, et toute croissance continue.
*Payé : les trois viraient au rouge vers le point 150, le ralentissement n'a
été ressenti que vers le point 230.*

---

## Le jour 0, en trente minutes

1. `git init`, premier commit.
2. L'interview, puis `SPEC.md`.
3. `CONTRAT.md`, 100 lignes maximum.
4. Le fichier de règles, 100 lignes au départ, plafond 300.
5. Le registre de décisions, avec les cinq champs, dès le point 1.
6. `tests/` avec trois tests rouges, et les arbitrages en tests ignorés.
7. Un hook qui refuse un commit si les tests ne passent pas, et un scan de
   secrets.

## Les trois questions à se reposer chaque mois

1. Le contrat tient-il toujours en 100 lignes ?
2. Un changement typique demande-t-il de comprendre un seul module ?
3. Puis-je vérifier le résultat sans lire le code ?

Deux non sur trois : le projet a changé de régime. Découper avant de
continuer.

---

## Sources de la v2

- Best practices for Claude Code, doc officielle : https://code.claude.com/docs/en/best-practices
- AGENTS.md, format ouvert : https://agents.md/
- Spec-driven development, Microsoft for Developers : https://developer.microsoft.com/blog/spec-driven-development-ai-native-engineering/
- Vibe Coding in Practice: Flow, Technical Debt (arXiv 2512.11922), retour
  d'expérience qualitatif sur 7 projets : https://arxiv.org/pdf/2512.11922
- Lecture du rapport DORA 2026 et chiffres LinearB sur 8,1 M de pull requests :
  https://ingenire.com/blog/dora-2026-ai-amplifier
