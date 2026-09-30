---
titre: "UserVoice : écouter les apprenants chaque lundi"
date: "2026-09"
fait: "1 retour négatif sur 3 laissé sur le site concerne le contenu."
synthese:
  probleme: "Une plateforme EdTech reçoit des milliers de retours d’apprenants par an, répartis entre quatre sources, et jamais lus ensemble."
  action: "Je les ai réunis dans une seule table. L’IA classe chaque retour avec un score de confiance et laisse les cas douteux à un humain. Le bilan se lit en cinq minutes, chaque lundi."
  resultat: "On pensait surtout à des bugs. La donnée a désigné le contenu, et l’effort s’est déplacé vers sa qualité."
plusLoin:
  - titre: "Ce que j’ai écarté"
    points:
      - "Une double catégorisation humaine. Seule la signature se saisit ; le reste se déduit des données datées."
      - "Toute écriture dans la source. On la lit, on ne la modifie jamais."
      - "Un rapport organisé par variations statistiques. On n’y voyait pas si un sujet était traité."
  - titre: "Les pièges payés"
    points:
      - "Des formats que les tableurs déformaient, comme les identifiants très longs."
      - "Un tableau de bord figé sans que personne ne s’en aperçoive."
langue: fr
cle: uservoice
---

## Le point de départ

Les retours arrivent par quatre sources : l’enquête NPS, le test de niveau, la fin de parcours, et un formulaire de retour libre présent sur toutes les pages du site.

En septembre 2026, j’ai lancé UserVoice sur les retours accumulés depuis mars. Jusque-là, ils n’étaient pas qualifiés. Chacun restait dans sa source, et les mêmes sujets revenaient sans qu’on sache s’ils étaient déjà traités.

## Écouter chaque lundi

Je suis parti des questions auxquelles je voulais pouvoir répondre chaque semaine. Quels sujets reviennent le plus ? Sont-ils traités ? Un nouveau sujet est-il apparu sans que personne l’ait vu ?

Pour y répondre, il fallait lire les quatre sources ensemble. Dans la table commune, chaque retour garde le contexte du jour où il a été donné, et se relit ainsi des mois plus tard.

Chaque retour est ensuite classé, selon qu’il signale un bug ou qu’il porte sur la satisfaction.

<figure>
  <a href="/captures/uservoice/analyse.png"><img src="/captures/uservoice/analyse.png" width="1360" height="1406" loading="lazy" decoding="async" alt="Capture de la page Analyse de UserVoice : quatre cartes de catégories (explications, ergonomie, exercices, progression), chacune avec la part des commentaires qui la citent et sa courbe sur quatre trimestres face à l’année précédente. Les explications arrivent en tête, avec 22 points de NPS à gagner."></a>
  <figcaption>La page Analyse : pour chaque catégorie, la part des commentaires qui la citent, trimestre par trimestre, face à l’année précédente. Les catégories sont rangées par points de NPS à gagner. Données synthétiques.</figcaption>
</figure>

## Ce que la donnée a montré

De mars à septembre 2026, un retour négatif sur trois laissé dans le formulaire du site concerne le contenu.

L’enquête NPS le confirme. Sur deux mois de l’été 2026, près d’un commentaire sur cinq touche aux explications, aux exercices ou aux traductions. La moitié sont des critiques ou des demandes.

Les bugs restent suivis, signature par signature. Mais la satisfaction se joue d’abord sur la qualité du contenu et de ses explications, et c’est donc là qu’il y a le plus à gagner.

## Bénéfices et impact business

Chaque lundi, le bilan se lit en cinq minutes, les quatre sources réunies. Il fait apparaître des signaux faibles qu’on ne voyait pas avant, quand un sujet encore rare commence à monter. Surtout, l’écoute des apprenants a montré, chiffres à l’appui, que la qualité du contenu pesait le plus ; elle est passée en tête des priorités. Au bilan annuel, une école cliente pointait le même sujet. Le projet Audit contenu part de ce constat.

## Ce que j’ai construit

J’ai construit UserVoice moi-même, avec Claude Code, pour prouver la valeur avant d’y engager l’équipe.

Pour chaque retour, l’IA propose un classement et un score de confiance. Sous un seuil, ou quand deux catégories arrivent trop près l’une de l’autre, le retour part dans une file de validation humaine. Chaque validation enrichit les exemples donnés à l’IA. Des règles mécaniques prennent le relais sur les cas évidents, comme les réponses vides ou les doublons. La file de validation humaine a fondu de 87 % en trois jours.

Au-dessus de la table, le tableau de bord a deux couches : l’une montre ce qui bouge, l’autre avance une explication. Le bilan du lundi croise le volume de chaque sujet et son statut de traitement. C’est lui qui dit, chaque lundi, quels sujets reviennent et s’ils sont traités.

<figure>
  <a href="/captures/uservoice/tableau-nps.png"><img src="/captures/uservoice/tableau-nps.png" width="1360" height="1327" loading="lazy" decoding="async" alt="Capture du baromètre NPS de UserVoice (données synthétiques) : le NPS global de la période, la répartition des notes entre détracteurs, passifs et promoteurs, le taux de réponse, puis une barre de NPS par produit et par marché."></a>
  <figcaption>Le baromètre NPS : le score de la période, la répartition des notes, et chaque segment avec son intervalle de confiance et son niveau de fiabilité. Données synthétiques.</figcaption>
</figure>

Chaque décision est tracée dans un registre et le code est vérifié par des tests. On peut revenir sur un seuil en sachant pourquoi il a été fixé.
