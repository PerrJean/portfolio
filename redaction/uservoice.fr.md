---
titre: "UserVoice : écouter les apprenants chaque lundi"
fait: "1 retour sur 3 laissé sur le site concerne le contenu."
synthese: "Une plateforme EdTech reçoit des milliers de retours d’apprenants par an, répartis entre quatre sources, et jamais lus ensemble. Je les ai réunis dans une seule table. L’IA classe chaque retour avec un score de confiance et laisse les cas douteux à un humain. Le bilan se lit en cinq minutes, chaque lundi. On pensait surtout à des bugs. La donnée a désigné le contenu, et l’effort s’est déplacé vers sa qualité."
---

## Le point de départ

Les retours arrivent par quatre sources : l’enquête NPS, le test de niveau, la fin de parcours, et un formulaire de retour libre présent sur toutes les pages du site.

En septembre 2026, j’ai lancé UserVoice sur les retours accumulés depuis mars. Jusque-là, ils n’étaient pas qualifiés. Chacun restait dans sa source, et les mêmes sujets revenaient sans qu’on sache s’ils étaient déjà traités.

## Écouter chaque lundi

Je suis parti des questions auxquelles je voulais pouvoir répondre chaque semaine. Quels sujets reviennent le plus ? Sont-ils traités ? Un nouveau sujet est-il apparu sans que personne l’ait vu ?

Pour y répondre, il fallait lire les quatre sources ensemble. Dans la table commune, chaque retour garde le contexte du jour où il a été donné, et se relit ainsi des mois plus tard.

Chaque retour est ensuite qualifié sur deux axes. S’il signale un bug, il reçoit une signature, parmi une trentaine. Sinon, il reçoit un ou plusieurs thèmes de satisfaction, parmi une trentaine aussi, puisqu’un même commentaire peut en citer plusieurs.

## Ce que la donnée a montré

De mars à septembre 2026, un retour sur trois laissé dans le formulaire du site concerne le contenu.

L’enquête NPS le confirme. Sur deux mois de l’été 2026, près d’un commentaire sur cinq touche aux explications, aux exercices ou aux traductions. La moitié sont des critiques ou des demandes.

Les bugs restent suivis, signature par signature. Mais la satisfaction se joue d’abord sur la qualité du contenu et de ses explications, et c’est donc là qu’il y a le plus à gagner.

## Bénéfices et impact business

Chaque lundi, le bilan se lit en cinq minutes, les quatre sources réunies. Il fait apparaître des signaux faibles qu’on ne voyait pas avant, quand un sujet encore rare commence à monter. Surtout, l’écoute des apprenants a objectivé un point de douleur, la qualité du contenu, qui est passée en tête des priorités. Au bilan annuel, un client B2B, une école, désignait le même point dans ses remontées. Le projet Audit contenu part de ce constat et répond à sa demande.

## Ce que j’ai construit

J’ai construit UserVoice moi-même, avec Claude Code, pour prouver la valeur avant d’y engager l’équipe.

Pour chaque retour, l’IA propose un classement et un score de confiance. Sous un seuil, ou quand deux catégories arrivent trop près l’une de l’autre, le retour part dans une file de validation humaine. Chaque validation enrichit les exemples donnés à l’IA. Des règles mécaniques prennent le relais sur les cas évidents, comme les réponses vides ou les doublons. La file de validation humaine a fondu de 87 % en trois jours.

Au-dessus de la table, le tableau de bord a deux couches : l’une montre ce qui bouge, l’autre avance une explication. Le bilan du lundi croise le volume de chaque sujet et son statut de traitement. C’est lui qui répond à la question de départ.

Chaque décision est tracée dans un registre et le code est vérifié par des tests. On peut revenir sur un seuil en sachant pourquoi il a été fixé.

## Pour aller plus loin

### Ce que j’ai écarté

- Une double catégorisation humaine. Seule la signature se saisit ; le reste se déduit des données datées.
- Toute écriture dans la source. On la lit, on ne la modifie jamais.
- Un rapport organisé par variations statistiques. On n’y voyait pas si un sujet était traité.

### Les pièges payés

- Des formats que les tableurs déformaient, comme les identifiants très longs.
- Un tableau de bord figé sans que personne ne s’en aperçoive.

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
