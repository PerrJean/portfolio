---
titre: "UserVoice : écouter les apprenants chaque lundi"
fait: "1 retour sur 3 porte sur le contenu."
synthese: "Une plateforme EdTech reçoit des milliers de retours d'apprenants par an, répartis entre quatre sources et qualifiés à la main avec des semaines de retard. Je les ai réunis dans une seule table, où l'IA classe chaque retour avec un score de confiance et laisse les cas douteux à une validation humaine, pour un bilan qui se lit en cinq minutes chaque lundi. On pensait surtout à des bugs ; la donnée a montré qu'un retour sur trois porte sur le contenu, et l'effort s'est déplacé vers sa qualité."
---

## Le point de départ

Une plateforme EdTech reçoit des milliers de retours d'apprenants par an. Ils arrivent par quatre sources : l'enquête NPS, le test de niveau, la fin de parcours, et un formulaire de retour libre présent sur toutes les pages du site.

Quand j'ai lancé UserVoice, en [À COMPLÉTER : mois et année], ces retours étaient qualifiés à la main dans un tableur, par lots, avec des semaines de décalage. Les mêmes sujets revenaient sans qu'on sache s'ils étaient déjà traités.

L'hypothèse implicite voulait que nos problèmes soient surtout des bugs.

## Écouter chaque lundi

Je suis parti d'une question à laquelle je voulais pouvoir répondre chaque lundi, en cinq minutes. Quels sujets reviennent le plus ? Sont-ils traités ? Un nouveau sujet est-il apparu sans que personne l'ait vu ?

Pour y répondre, il fallait lire les quatre sources ensemble. Je les ai fait converger vers une seule table, où chaque retour garde ses dimensions figées au moment où il est donné. Des mois plus tard, on le relit avec le contexte du jour où il a été écrit.

Chaque retour est ensuite qualifié sur deux axes. S'il signale un bug, il reçoit une signature parmi 35. Sinon, il reçoit un ou plusieurs thèmes de satisfaction parmi 29, puisqu'un même commentaire peut en citer plusieurs.

## Ce que la donnée a montré

Un retour sur trois laissé dans le formulaire présent sur toutes les pages porte sur le contenu (période : [À COMPLÉTER]).

L'enquête NPS pointe dans la même direction par un autre chemin. Sur deux mois de l'été 2026, près d'un commentaire sur cinq touche à la qualité du contenu (explications, qualité des exercices, traductions), et la moitié de ces commentaires sont des critiques ou des demandes.

Les bugs restent suivis, signature par signature. Mais la satisfaction se joue d'abord sur la qualité du contenu et de ses explications, et c'est donc là qu'il y a le plus à gagner.

## Ce que j'ai construit

J'ai mené UserVoice seul, avec Claude Code pour écrire le code.

L'IA classe chaque retour et y joint un score de confiance. Sous un seuil, ou quand deux réponses sont trop proches, le retour part dans une file de validation humaine. Chaque validation enrichit les exemples donnés à l'IA pour les passes suivantes, et des règles mécaniques prennent le relais sur les cas devenus évidents, comme les réponses vides ou les doublons. La file de validation humaine a fondu de 87 % en trois jours.

Au-dessus de la table, le tableau de bord a deux couches : l'une montre ce qui bouge, l'autre avance une explication. Le bilan du lundi croise le volume de chaque sujet et son statut de traitement. C'est lui qui répond à la question de départ.

J'ai ajouté une alerte de fraîcheur, parce que le tableau de bord s'était déjà figé en silence deux fois. Une baisse apparente des retours peut n'être qu'une panne de la source, et l'alerte le signale avant qu'on en tire une conclusion.

Chaque décision est tracée dans un registre et le code est vérifié par des tests. On peut revenir sur un seuil en sachant pourquoi il a été fixé.

## Ce que ça a changé

L'hypothèse de départ parlait de bugs. La donnée a désigné le contenu, et l'effort s'y est déplacé.

[À COMPLÉTER : un effet observé du bilan du lundi, par exemple un sujet repéré tôt ou une décision prise à partir de lui.]

Le second projet de ce portfolio, l'audit qualité du contenu, part de ce constat.

## Pour aller plus loin

### Ce que j'ai écarté

- Une double catégorisation humaine. Seule la signature se saisit ; le reste se déduit des données datées.
- Une classification entièrement automatique. L'humain garde les cas douteux.
- Toute écriture dans la source. On la lit, on ne la modifie jamais.
- Un rapport organisé par variations statistiques. On n'y voyait pas si un sujet était traité, alors le bilan du lundi part du statut de traitement.

### Les pièges payés

- Des identifiants très longs, que les tableurs corrompaient en les passant en notation scientifique.
- Des virgules décimales dans l'une des sources.
- Un tableau de bord figé sans que personne ne s'en aperçoive. D'où l'alerte de fraîcheur.

---

## Audit de la passe 2 (hors texte)

| Extrait | Tic | Réécriture |
|---|---|---|
| « Écouter à l'échelle » (libellé H2 du brief) | Jargon de consultant (« à l'échelle ») | « Écouter chaque lundi » |
| « le premier levier de satisfaction est la qualité du contenu » | Jargon de consultant (« levier ») | « la satisfaction se joue d'abord sur la qualité du contenu » |
| « une question simple à poser, difficile à tenir » | Parallélisme et opposition fabriquée | « une question à laquelle je voulais pouvoir répondre chaque lundi » |
| « Ils arrivent par quatre sources : … » puis « Faute de mesure, une hypothèse tenait lieu de réponse : … » | Deux-points dramatiques en série ; constat formulé en défaut | « L'hypothèse implicite voulait que nos problèmes soient surtout des bugs. » |
| « Un retour de mars se relit en juin avec le contexte de mars. » | Fait inventé (exemple daté) | « Des mois plus tard, on le relit avec le contexte du jour où il a été écrit. » |
| « C'est là que les apprenants attendent le plus » | Généralité sans fait | Supprimé |
| « Je tranche, et chaque validation… » | Fait inventé (qui valide n'est pas établi) | « Chaque validation enrichit les exemples… » |
| « un tableau de bord personnalisé » | Généralité sans fait (personnalisé pour qui ?) | « le tableau de bord a deux couches : l'une montre ce qui bouge, l'autre avance une explication » |
| « Une alerte de fraîcheur complète le tout. » | Ouverture creuse | « J'ai ajouté une alerte de fraîcheur, parce que… » |
| « explications, exercices, traductions » cité deux fois (donnée, puis conclusion) | Triplet réflexe répété | Gardé une seule fois, dans la section donnée, avec les mots de la donnée |
| « UserVoice dit où les apprenants butent ; l'audit cherche pourquoi, exercice par exercice. » | Chute courte, parallélisme, fait inventé sur l'audit | « Le second projet de ce portfolio, l'audit qualité du contenu, part de ce constat. » |
| Synthèse : trois phrases de même longueur | Rythme uniforme | Phrase 2 allongée, phrase 3 coupée par un point-virgule |

Gardés volontairement : le triplet des trois questions du lundi (c'est la question telle que je l'ai posée), une seule chute (« C'est lui qui répond à la question de départ. »). Dans « Ce que la donnée a montré », le chiffre décisif est « un sur trois » ; « près d'un sur cinq » et « la moitié » viennent de l'enquête NPS et ne servent qu'à le corroborer. 35 et 29 décrivent la taille des listes, ce ne sont pas des résultats.

## Reste à compléter

1. Le mois et l'année du lancement d'UserVoice (« Le point de départ »).
2. La période sur laquelle « 1 retour sur 3 » est mesuré (« Ce que la donnée a montré »).
3. Un effet observé du bilan du lundi : un sujet repéré tôt, une décision prise à partir de lui (« Ce que ça a changé »).
