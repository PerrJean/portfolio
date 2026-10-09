---
titre: "UserVoice : écouter les apprenants chaque lundi"
date: "2026-09"
cadre:
  role: "Conception et développement de l’outil"
  equipe: "Seul, avec l’IA"
  duree: "Septembre 2026"
fait: "1 retour négatif sur 3 laissé sur le site concerne le contenu : sa qualité est passée en tête des priorités."
synthese:
  probleme: "Une plateforme EdTech reçoit des milliers de retours d’apprenants par an, répartis entre quatre sources, et jamais lus ensemble."
  action: "Je les ai réunis en un seul endroit. L’IA classe chaque retour et dit quand elle doute : un humain tranche, et sa réponse aide l’IA à mieux distinguer les cas suivants. Le bilan se lit en cinq minutes, chaque lundi."
  resultat: "On pensait surtout à des bugs. La donnée a désigné le contenu, et l’effort s’est déplacé vers sa qualité."
langue: fr
cle: uservoice
---

## Le point de départ

Les retours arrivent par quatre sources : l’enquête NPS (Net Promoter Score, la note de recommandation), le test de niveau, la fin de parcours, et un formulaire de retour libre présent sur toutes les pages du site.

En septembre 2026, j’ai lancé UserVoice sur les retours accumulés depuis mars. Jusque-là, ils n’étaient pas qualifiés. Chacun restait dans sa source, et les mêmes sujets revenaient sans qu’on sache s’ils étaient déjà traités.

## Écouter chaque lundi

Je suis parti des questions auxquelles je voulais pouvoir répondre chaque semaine. Quels sujets reviennent le plus ? Sont-ils traités ? Un nouveau sujet est-il apparu sans que personne l’ait vu ?

Pour y répondre, il fallait lire les quatre sources ensemble. Dans l’outil commun, chaque retour garde le contexte du jour où il a été donné, et se relit ainsi des mois plus tard.

L’IA classe ensuite chaque retour : bug signalé, ou avis sur la satisfaction.

<figure>
  <a href="/captures/uservoice/analyse.png"><img src="/captures/uservoice/analyse.png" width="1360" height="1406" loading="lazy" decoding="async" alt="Capture de la page Analyse de UserVoice : quatre cartes de catégories (explications, ergonomie, exercices, progression), chacune avec la part des commentaires qui la citent et sa courbe sur quatre trimestres face à l’année précédente. Les explications arrivent en tête, avec 22 points de NPS à gagner."></a>
  <figcaption>La page Analyse : pour chaque catégorie, la part des commentaires qui la citent, trimestre par trimestre, face à l’année précédente. Les catégories sont rangées par points de NPS à gagner. Données synthétiques.</figcaption>
</figure>

## Ce que la donnée a montré

De mars à septembre 2026, un retour négatif sur trois laissé dans le formulaire du site concerne le contenu.

L’enquête NPS le confirme. Sur deux mois de l’été 2026, près d’un commentaire sur cinq touche aux explications, aux exercices ou aux traductions. La moitié sont des critiques ou des demandes.

Les bugs restent suivis, signature par signature. Mais la satisfaction dépend d’abord de la qualité du contenu et de ses explications : c’est là qu’il y a le plus à gagner.

## Bénéfices et impact business

Le bilan du lundi repère un sujet encore rare dès qu’il commence à monter, ce qu’on ne voyait pas avant. Au bilan annuel, une école cliente pointait elle aussi la qualité du contenu. Le projet Audit contenu part de ce constat.

## Ce que j’ai construit

J’ai construit UserVoice moi-même, avec Claude Code, un assistant de programmation par IA, pour prouver son utilité avant d’y engager l’équipe.

Pour chaque retour, l’IA propose une catégorie. Quand elle est peu sûre d’elle, ou qu’elle hésite entre deux catégories proches, elle le signale, et le retour attend la décision d’une personne. Chaque décision rejoint les exemples sur lesquels l’IA s’appuie pour classer les retours suivants. Des règles mécaniques prennent le relais sur les cas évidents, comme les réponses vides ou les doublons. En trois jours, la file des retours en attente de décision a fondu de 87 %.

Le tableau de bord a deux couches : l’une montre ce qui bouge, l’autre avance une explication. Le bilan du lundi croise le volume de chaque sujet et son statut de traitement.

<figure>
  <a href="/captures/uservoice/tableau-nps.png"><img src="/captures/uservoice/tableau-nps.png" width="1360" height="1327" loading="lazy" decoding="async" alt="Capture du baromètre NPS de UserVoice (données synthétiques) : le NPS global de la période, la répartition des notes entre détracteurs, passifs et promoteurs, le taux de réponse, puis une barre de NPS par produit et par marché."></a>
  <figcaption>Le baromètre NPS : le score de la période, la répartition des notes, et chaque segment avec son intervalle de confiance et son niveau de fiabilité. Données synthétiques.</figcaption>
</figure>
