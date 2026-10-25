# Brief — révision éditoriale de la présentation DentalSoft (registre/0100)

## En-tête : les contraintes locales, qui priment sur le brief de Jean

- **Un seul fichier** : `public/usecase/dentalsoft/index.html`. Lis aussi
  `.canevas/0096/releve.md` (le relevé cité par Jean comme `releve.md`).
- **Les notes présentateur ont été retirées** (registre/0093, à la demande
  de Jean) : ne les recrée pas. Là où le brief cite les notes, ignore-les.
- **Écran 24** : garde le titre « Trois questions à approfondir avant de
  décider où investir » ; le « Conserver : » du tableau est une consigne.
- **Les infobulles** viennent d'être reprises (registre/0099,
  `.claude/rules/infobulles.md`) : ne touche pas à leur mécanisme ; tu
  peux corriger leur texte.
- **Aucun nom interne de l'employeur actuel de Jean** (hook de
  confidentialité) ; aucune requête vers un tiers.
- La preuve :
  - captures 1600 × 900 et 1280 × 720 de chaque écran **après**
    modification (pas d'avant / après : Jean n'en veut pas), sous
    `.canevas/0100/`, pour vérifier les débordements — Edge sans fenêtre :
    `"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1600,900 --virtual-time-budget=6000 --screenshot=<fichier> "http://localhost:8793/usecase/dentalsoft/#<id>"`
    avec `python -m http.server 8793 --directory public` en arrière-plan ;
    un titre qui déborde ou passe sur trois lignes est un échec ;
  - le grep de chaque **ancien** titre rend 0 dans le fichier (le brief le
    demande : `titre`, `sousTitre`, `court`, `fil`, sommaire,
    `Object.assign`) ;
  - `npx astro build --outDir .dist-100` puis `DIST=.dist-100 npm test` :
    tout vert, le test des infobulles compris. Supprime `.dist-100`.
- Le bilan demandé par la section 12 va dans `.canevas/0100/bilan.md`.
- Ne touche à rien d'autre du dépôt : d'autres chantiers non commités sont
  dans l'arbre (`tests/`, `package*.json`, workflows, `redaction/`,
  `registre/`). Pas de `git stash`, ne commite rien. Rapport de 250 mots au
  plus, renvoyant au bilan. Environnement : Windows, Git Bash.

---

## Le brief de Jean, tel quel

# Dentalsoft — Révision éditoriale finale de la présentation

## 1. Mission

Je prépare un entretien Head of Product chez Dentalsoft.

Je te fournis :

* `index.html` : la dernière version de ma présentation interactive.
* `releve.md` : un audit éditorial contenant 122 observations.
* Éventuellement, une consigne de contre-audit.

Je souhaite que tu **modifies directement le HTML** pour améliorer la précision, la cohérence et la lisibilité du discours.

La présentation est désormais aboutie sur le fond : panorama du marché, trois axes stratégiques, propositions fonctionnelles, prototypes, méthodes produit et conclusion.

Il ne s'agit donc pas de reconstruire la présentation.

**La priorité est de corriger les titres, supprimer les redondances et harmoniser le vocabulaire.**

Les modifications doivent permettre de mieux comprendre chaque écran, y compris lorsque quelqu'un consulte la présentation sans mon commentaire oral.

## 2. Principes éditoriaux

### A. Privilégier la précision à l'effet de style

Je souhaite éviter les formulations :

* Trop générales.
* Artificiellement stratégiques.
* Abstraites sans nécessité.
* Redondantes.
* Trop longues pour exprimer une idée simple.

Chaque titre doit exprimer précisément ce que l'écran montre ou démontre.

Un titre peut être descriptif ou argumentatif selon le contenu.

Ne pas chercher systématiquement à transformer chaque titre en affirmation spectaculaire.

**La priorité est la justesse du propos, pas son effet marketing.**

### B. Conserver le vocabulaire professionnel

Ne pas supprimer systématiquement les termes techniques.

Je m'adresse à des professionnels du produit et du secteur dentaire.

Il est parfaitement pertinent de conserver :

* JTBD.
* Opportunity Solution Tree.
* User Story Mapping.
* Product Discovery.
* Go-to-market.
* Activation.
* Adoption.
* Revenu d'expansion.
* Base installée.
* Packaging.
* MVP.
* Workflows.
* Odontogramme.
* ODF.
* NGAP.
* CCAM.
* INAMI.
* SESAM-Vitale.

Ces termes doivent simplement être employés correctement.

Par exemple, activation et adoption ne sont pas synonymes. Il ne faut pas remplacer les deux par « utilisation » sous prétexte de simplifier.

De même, « base installée » est pertinent dans une réflexion stratégique SaaS B2B.

En revanche, le vocabulaire affiché **dans une interface destinée à un praticien** doit rester adapté à ce praticien.

### C. Éviter les formulations défensives répétitives

Les limites de la recherche sont déjà expliquées dans l'introduction.

Il n'est pas nécessaire de répéter sur chaque écran :

* « À confirmer ».
* « À vérifier ».
* « Hypothèse à valider ».
* « Non exhaustif ».
* « Sans entretien utilisateur ».

Supprimer les mentions répétitives lorsqu'elles n'apportent rien.

Attention cependant à ne pas supprimer les informations réellement importantes.

Par exemple :

* Un statut « Reprise à vérifier » dans Migration Preview est une information métier nécessaire.
* Un statut réglementaire « À revoir » dans Atlas métier peut être indispensable.
* Une capacité revendiquée par un concurrent doit rester distinguée d'une capacité démontrée.

**Il faut supprimer les précautions éditoriales inutiles, pas effacer l'incertitude réelle.**

Lorsque l'existence d'un produit, son appartenance au groupe ou une information factuelle reste incertaine, ne pas transformer cette information en affirmation non sourcée. Si le point est accessoire, supprimer la mention ; sinon, conserver une formulation factuelle limitée à ce qui est établi.

## 3. Première priorité — Revoir les titres des 24 écrans

Analyser les titres actuels, leur sous-titre, leur contenu et leur rôle dans le déroulement de la présentation.

Je propose les orientations suivantes.

Les formulations ci-dessous sont des propositions éditoriales. Tu peux les améliorer si tu trouves une version plus précise, mais ne change pas leur signification.

| Écran                            | Orientation proposée pour le titre                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1 — Introduction                 | **Du panorama du marché à trois axes de croissance pour Dentalsoft**                            |
| 2 — Parcours                     | **Un parcours de soins simplifié pour comparer les pratiques dentaires**                        |
| 3 — Besoins par pratique         | **Des besoins logiciels différents selon les pratiques dentaires**                              |
| 4 — Réserve, étape comparée      | **Une même étape de soins, des besoins différents selon la pratique**                           |
| 5 — Réserve, organisations       | **Des organisations différentes autour des soins dentaires**                                    |
| 6 — Utilisateurs et décideurs    | **Qui utilise, qui recommande et qui décide de l'achat du logiciel ?**                          |
| 7 — Parcours d'achat             | **Le choix d'un logiciel suit un parcours d'achat spécifique**                                  |
| 8 — Réserve, écosystème          | **Le logiciel de cabinet s'inscrit dans un écosystème d'outils spécialisés**                    |
| 9 — Concurrence                  | **Concurrence : orthodontie et omnipratique, deux marchés distincts**                           |
| 10 — Écarts nationaux            | **Les règles nationales modifient certaines étapes du parcours de soins**                       |
| 11 — Comparaison France/Belgique | **France et Belgique : deux parcours administratifs pour démarrer un traitement orthodontique** |
| 12 — Réserve, impacts logiciels  | **Internationaliser un logiciel implique des adaptations métier et techniques**                 |
| 13 — Première opportunité        | **Développer les services proposés aux cabinets orthodontiques déjà clients**                   |
| 14 — Deuxième opportunité        | **L'omnipratique : un marché de conquête**                                                      |
| 15 — Troisième opportunité       | **Les écarts nationaux : un enjeu pour le développement international**                         |
| 16 — Synthèse des axes           | **Trois axes de croissance à explorer pour Dentalsoft**                                         |
| 17 — Axe 1                       | **Renforcer les offres existantes pour développer le revenu par cabinet**                       |
| 18 — Proposition axe 1           | **Un compte rendu préparé depuis le dossier, validé par le praticien**                          |
| 19 — Axe 2                       | **Trois leviers pour conquérir des cabinets d'omnipratique**                                    |
| 20 — Migration Preview           | **Prévisualiser les données à reprendre avant de changer de logiciel**                          |
| 21 — Validation axe 2            | **Vérifier si la migration freine l'acquisition avant d'investir**                              |
| 22 — Axe 3                       | **Trois leviers pour accélérer le développement international**                                 |
| 23 — Atlas métier                | **Atlas métier : un référentiel commun pour les équipes produit et les praticiens**             |
| 24 — Conclusion                  | **Conserver : Trois questions à approfondir avant de décider où investir**                      |

### Points d'attention

**Écran 2 : parcours de soins**

Le terme « protocole clinique » doit disparaître.

La frise représente une simplification du parcours de soins, pas un protocole médical.

La précision « simplifié et non exhaustif » pourra figurer à l'oral ou dans les notes présentateur. Il est inutile de multiplier les avertissements sur l'écran.

**Écrans 13 à 16 : construction des trois axes**

Ces écrans servent à faire apparaître progressivement trois territoires d'opportunité.

Leurs titres doivent s'enchaîner naturellement.

Ne pas les transformer en quatre slides indépendantes ou redondantes.

Conserver leur progression visuelle et leurs animations actuelles.

**Écrans 17, 19 et 22 : présentation des axes**

Ces écrans approfondissent chacun une ambition et plusieurs leviers de croissance.

Ils doivent donc apporter quelque chose de plus que les écrans de transition.

Veiller à ne pas répéter exactement les mêmes formulations.

**Écrans 18, 20 et 23 : propositions fonctionnelles**

Les titres doivent faire comprendre le service illustré, son usage et, lorsque c'est pertinent, sa valeur pour l'utilisateur.

Ne pas modifier les démonstrations elles-mêmes pour les adapter aux nouveaux titres.

## 4. Deuxième priorité — Supprimer les redondances entre titre, sous-titre et contenu

Pour chaque écran, vérifier les quatre niveaux suivants :

1. Titre principal.
2. Sous-titre éventuel.
3. Texte explicatif.
4. Contenu visuel.

Le titre et le sous-titre ne doivent pas reformuler deux fois la même idée.

De même, le texte explicatif ne doit pas simplement répéter ce que le schéma démontre déjà.

### Exemples de corrections attendues

**Écran 2**

Supprimer :

« Huit repères communs, pas un protocole clinique unique. »

Le nouveau titre et la frise suffisent.

**Écran 3**

Remplacer la double négation :

« Une case vide ne veut pas dire que l'étape n'existe pas pour ce métier. »

Par une formulation positive et précise :

« Une case vide signifie qu'aucun besoin spécifique à cette pratique n'est illustré pour cette étape. »

**Écran 7**

Supprimer le sous-titre :

« Un parcours distinct du parcours clinique. »

Le titre exprime déjà cette idée.

**Écran 16**

Supprimer le sous-titre actuel s'il répète simplement les trois axes présentés.

**Écran 17 — Axe 1**

L'écran présente plusieurs fois les mêmes informations « Ambition / Levier / Proposition ».

Il faut conserver cette structure, qui est importante pour mon raisonnement.

En revanche, éviter de répéter intégralement les mêmes formulations dans le bandeau supérieur et les blocs du contenu.

Chercher une hiérarchie plus efficace :

* Le bandeau rappelle succinctement le raisonnement.
* Le contenu développe la montée en gamme, le go-to-market et la proposition fonctionnelle.

Ne pas supprimer la visibilité du go-to-market, qui est un aspect important du poste.

**Écran 22 — Axe 3**

Même attention à la répétition entre le titre, l'ambition affichée et les trois leviers.

### Règle générale

Avant de supprimer un texte, vérifier s'il apporte :

* Une nouvelle information.
* Une précision nécessaire.
* Une distinction conceptuelle.
* Une aide à la compréhension.

Si ce n'est pas le cas, le supprimer ou le raccourcir.

Ne pas supprimer les éléments uniquement pour réduire le nombre de mots.

## 5. Troisième priorité — Harmoniser le vocabulaire stratégique

Stabiliser les noms des trois axes.

### Axe 1

**Développer la valeur des clients existants**

Ambition : augmenter le revenu récurrent par cabinet orthodontique déjà client.

Leviers possibles : renforcer les offres existantes, leur adoption et la montée en gamme.

Proposition illustrative : compte rendu préparé depuis le dossier et validé par le praticien.

### Axe 2

**Conquérir l'omnipratique**

Ambition : acquérir de nouveaux cabinets.

Leviers : profondeur métier, différenciation commerciale, réduction des frictions de migration.

Proposition illustrative : Migration Preview.

### Axe 3

**Accélérer le développement international**

Ambition : adapter et déployer les logiciels sur différents marchés nationaux.

Leviers : adaptation métier et réglementaire, intégrations locales, distribution et déploiement.

Proposition illustrative : Atlas métier.

### Distinctions à préserver

**Axe stratégique** : une direction de développement.

**Ambition** : le résultat économique ou stratégique recherché.

**Levier** : un mécanisme pouvant contribuer à l'ambition.

**Opportunité produit** : un problème ou un besoin utilisateur à explorer.

**Proposition fonctionnelle** : une réponse possible à ce besoin.

Ne pas utiliser ces notions comme des synonymes.

Dans le sommaire et les écrans de transition, privilégier une nomenclature homogène pour les axes.

Ne pas chercher à supprimer le vocabulaire produit lorsqu'il apporte de la précision.

## 6. Quatrième priorité — Harmoniser certains termes métier

### Parcours de soins

Employer « parcours de soins » pour désigner la grille générale.

Ne pas utiliser « parcours utilisateur » ou « protocole » pour cette frise.

Conserver « parcours d'achat » pour l'acquisition d'un logiciel.

### Pratiques dentaires

Employer « pratique » lorsqu'on distingue orthodontie, omnipratique, implantologie, parodontologie, etc.

Conserver « besoin métier » lorsqu'il désigne une exigence fonctionnelle ou opérationnelle propre à une activité.

### Organisations

Harmoniser les principales catégories :

* Cabinet individuel.
* Cabinet associé ou de groupe.
* Centre dentaire.
* Réseau multisite.

Ne pas employer « pluriprofessionnel » comme synonyme de « pluripraticien ».

### Rôles dans l'achat

Remplacer « Prescrit » par « Recommande » lorsque l'on décrit l'influence exercée sur le choix d'un logiciel.

Conserver la distinction entre utilisateur, recommandation, achat et décision.

### Dénominations des entreprises

Ne pas remplacer mécaniquement Dentalsoft, SignalSoft, Orthalis, Ortholeader ou les autres marques par un seul nom.

Ces noms peuvent désigner des réalités différentes.

Employer :

* Dentalsoft pour l'entreprise concernée par l'entretien.
* SignalSoft pour l'ensemble issu du rapprochement, lorsque c'est pertinent.
* Les noms des sociétés, logiciels et marques lorsqu'ils sont directement concernés.

Supprimer les ambiguïtés comme « notre offre », qui pourraient laisser entendre que je travaille déjà dans l'entreprise.

## 7. Cinquième priorité — Vérifier la cohérence du parcours de soins

L'audit relève une incohérence dans les étapes 5 à 8.

Aujourd'hui, la frise distingue :

* Démarrage.
* Contrôles.
* Suivi.
* Contention / long terme.

Cette segmentation convient imparfaitement à la comparaison de plusieurs pratiques.

Je souhaite que tu vérifies si ces étapes permettent réellement de représenter les besoins de l'orthodontie, de l'omnipratique, de l'implantologie et de la parodontologie.

La distinction entre traitement actif, contrôles et suivi à long terme doit rester cohérente.

**Ne modifie pas automatiquement toute la frise.**

Propose une correction minimale si elle est nécessaire, en tenant compte :

* Des besoins affichés dans chaque colonne.
* De la prévention.
* De la maintenance parodontale.
* De la contention orthodontique.
* Du suivi implantaire.
* Des annotations et boucles.

Si une correction de libellé suffit, privilégie-la.

Si une réorganisation plus importante est indispensable mais que sa justesse ne peut pas être établie, ne l'applique pas arbitrairement : conserve la structure actuelle et signale le point dans ton bilan.

Ne présente jamais cette grille simplifiée comme un modèle clinique universel.

## 8. Sixième priorité — Corriger les incohérences éditoriales manifestes

Effectuer une courte passe sur les incohérences à fort impact.

En particulier :

* Remplacer « Prouver que la migration est un frein à l'acquisition » par « Vérifier si la migration freine l'acquisition ».
* Harmoniser les titres des trois axes entre le sommaire, les transitions, les pages stratégiques et les notes présentateur.
* Éviter les formulations artificielles telles que « Les vraies questions » lorsque « Les questions à trancher » suffit.
* Corriger les doubles négations et les phrases inutilement longues.
* Éliminer les précautions éditoriales répétées.
* Harmoniser les titres des boutons « Approfondir » avec les écrans qu'ils ouvrent.
* Vérifier la cohérence des compteurs et des libellés de navigation.

Ne pas entreprendre une réécriture complète du contenu.

### Prototypes

Les trois prototypes ont déjà fait l'objet de plusieurs audits UX et fonctionnels.

**Je ne souhaite pas une nouvelle itération de conception.**

Conserver :

* Les écrans.
* Les interactions.
* Les scénarios.
* Les données.
* Les fonctions.
* Les mécanismes de validation.
* Les recherches réglementaires.

Ne corriger que les incohérences textuelles manifestes ayant un impact immédiat sur la crédibilité.

Par exemple, si la même patiente fictive figure dans deux démonstrations à des stades incompatibles de son traitement, la renommer dans l'une des deux.

Ne pas rouvrir l'ensemble de l'analyse réglementaire française et belge.

Ne pas ajouter de nouvelles fonctionnalités.

## 9. Conclusion

Conserver l'écran final et ses trois grandes interrogations :

1. Sur quelles briques du portefeuille pouvons-nous bâtir ?
2. Où se situe notre différenciation concurrentielle ?
3. Quelles opportunités approfondir selon l'axe de croissance retenu ?

Ces trois questions correspondent à ce que je souhaiterais investiguer en arrivant chez Dentalsoft.

Conserver :

* La grille de diagnostic du portefeuille.
* Les quatre dimensions d'évaluation.
* Le panneau sur les chantiers à piloter.
* La posture de Head of Product.
* L'ouverture vers une discussion avec le jury.

Ne pas transformer cette conclusion en roadmap ou en plan de 90 jours.

Ne pas afficher de priorisation définitive entre les trois axes.

## 10. Contraintes techniques

Modifier directement `index.html`.

Attention : les titres et contenus sont répartis entre plusieurs structures JavaScript et certains sont redéfinis après leur déclaration initiale.

Vérifier notamment :

* `T.vues`.
* Les propriétés `titre`, `sousTitre`, `court` et `fil`.
* Les objets de contenu.
* Les éventuels `Object.assign` qui remplacent des titres.
* Les fonctions de génération HTML.
* Les notes présentateur.
* Les libellés de navigation.
* Le sommaire.

Éviter toute situation dans laquelle un ancien titre reste utilisé à un autre endroit.

Conserver strictement :

* Les 24 écrans existants.
* Le parcours principal et les écrans en réserve.
* La navigation Suivant / Précédent.
* Les révélations progressives.
* Les transitions entre les opportunités.
* Les trois prototypes.
* Les infobulles.
* Les notes.
* Les panneaux secondaires.
* L'identité visuelle.
* Le format 1600 × 900.
* Le fonctionnement mobile et les raccourcis clavier.

Ne pas ajouter de slide.

Ne pas refondre la mise en page.

Ne pas ajouter de nouvelles méthodes produit.

## 11. Vérification du résultat

Après les modifications :

1. Parcourir les 24 écrans, y compris ceux en réserve.
2. Vérifier que chaque titre correspond au contenu effectivement affiché.
3. Vérifier l'absence de répétitions inutiles entre titre, sous-titre et contenu.
4. Vérifier que les noms des trois axes sont cohérents partout.
5. Vérifier les libellés des boutons et du sommaire.
6. Vérifier que les titres ne débordent pas de leur espace.
7. Vérifier les transitions et les révélations.
8. Tester les principaux parcours interactifs pour éviter les régressions.

Contrôler le rendu à 1600 × 900 et à 1280 × 720 si possible.

## 12. Livrable attendu

Fournis le HTML corrigé.

Accompagne-le d'un bilan court :

**A. Titres modifiés**

Tableau :

* Écran.
* Ancien titre.
* Nouveau titre.

**B. Redondances supprimées**

Mentionner les principaux sous-titres et textes retirés.

**C. Harmonisations**

Indiquer les corrections de vocabulaire et de navigation réalisées.

**D. Modifications volontairement écartées**

Signaler les recommandations du relevé qui auraient dégradé la précision métier, déformé le raisonnement ou nécessité une validation supplémentaire.

**E. Vérifications**

Indiquer ce qui a réellement été testé.

## Critère de réussite

La présentation doit devenir plus précise et plus agréable à écouter, sans perdre son niveau d'expertise.

Je dois pouvoir expliquer chaque écran naturellement, sans devoir corriger oralement un titre mal formulé.

**Le travail demandé est principalement éditorial : moins de redondances, des titres plus justes, un vocabulaire cohérent et aucune régression fonctionnelle.**
