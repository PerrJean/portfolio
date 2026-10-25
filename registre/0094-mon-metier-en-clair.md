# 0094 — « Mon métier en clair » : une porte pour le lecteur non initié

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 480 | | `claude-opus-5-5` |

**Demande de Jean (2026-10-25)** : une page « Head of Product pour les nuls »,
sans ce titre, pour les RH généralistes, avec un lien explicite depuis
l'accueil. Suite du regard RH de 0080 : il décrochait dans le « comment »,
ne comprenait pas le métier et se demandait « manager ou faiseur ? ». La
demande n° 5 (fil d'accueil lisible) portait sur l'ordre des projets ; cette
page y répond en partie seulement.

**Spec (questionnaire du 2026-10-25, recommandations retenues sauf la
comparaison)** :
- **Titre** : « Mon métier en clair » (EN « My job in plain words »).
  Adresses `/mon-metier/` et `/en/my-job/`, clé `monMetier` dans les routes.
- **Porte sur l'accueil** : une ligne-lien sous le sous-titre de l'accroche,
  à la taille du sous-titre, pas un bloc : « Mon métier et mes points forts,
  sans jargon (2 min) ». Même ligne sur l'accueil EN. Pas d'entrée de menu.
- **Gabarit** : celui d'« À propos » (colonne de texte, soleil), environ
  450 mots, sans image ni nouveau composant. Quatre sections, dans cet
  ordre (1, puis les deux rôles, puis les preuves) :
  1. **Le métier en trois phrases**, par la comparaison du **réalisateur de
     film** : il ne tient ni la caméra ni le décor, travaille chaque jour avec
     les techniciens et les décorateurs (développeurs, designers), choisit ce
     qu'on tourne pour le public, tranche quand la technique ou le budget
     l'imposent, rend compte au producteur (direction). Écartés : rédacteur
     en chef (éloigne de la technique, Jean), maître d'ouvrage / maître
     d'œuvre (jargon de DSI, ne passe pas en anglais).
  2. **Je dirige mon équipe** (ajout de Jean, 2026-10-25 : manager est un
     autre rôle que le produit, et c'était l'inquiétude du RH, « manager ou
     faiseur ? »). Un Product Manager et deux Product Designers. Quatre
     gestes, tous vrais selon Jean : entretiens individuels réguliers ;
     faire grandir et évaluer (preuve : Matrice de compétences) ; déléguer
     des projets entiers ; recruter. Plus l'accompagnement de l'équipe dans
     son travail avec les développeurs. **Faits dictés par Jean
     (2026-10-25)** :
     - entretiens individuels **toutes les semaines** ;
     - **recrutement d'une Product Designer** : tri des candidatures à
       confier à la RH pour un premier échange, premier entretien, second
       entretien avec cas pratique, puis deux profils proposés au CPO et au
       CEO, avec une préférence motivée ;
     - **la posture transmise à l'équipe** face aux développeurs : porter la
       voix des apprenants ; partir du besoin exprimé et y revenir. Avec le
       Product Manager et les Product Designers (« eux », précisé par Jean),
       Jean propose et valide les livrables utiles à leurs projets de
       discovery. « discovery » garde son infobulle de 0088.
  3. **Je travaille avec les autres équipes**. Interlocuteurs et gestes
     dictés par Jean :
     - **le CTO et les deux lead développeurs** (back et front), au même
       plan (choix de Jean ; avis contraire donné et écarté : Jean travaille
       peu avec le CTO, interlocuteur de son manager le CPO, et un recruteur
       peut le vérifier en entretien). Améliorer ensemble les pratiques de
       travail, repenser les rituels et la collaboration ; avec les
       développeurs, remettre en question le besoin exprimé à la lumière de
       leur regard technique et métier, et peser ce qu'une évolution coûte
       face à ce qu'elle apporte (pas « analyse coût-intérêt ») ; convenir
       des prochains chantiers.
     - **les account managers**, seul mot retenu (pas « CSM » : un mot par
       notion, celui de la page NPS), expliqués une fois : « qui suivent les
       entreprises clientes ». Écouter les retours des clients, leurs
       problèmes et leurs besoins ; simplifier le travail des account
       managers et les outiller, pour la relation commerciale, le
       renouvellement des contrats et les ventes complémentaires (pas
       « renew » ni « upsell »).
     - **les learning designers** (pas « ingé pédago ») : écouter leurs
       besoins et construire avec eux des solutions pédagogiques, par
       exemple l'Audit contenu (dicté par Jean). Le responsable des
       professeurs est retiré (Jean) : aucun geste propre, et un RH se
       demanderait ce que font des professeurs sur une plateforme en ligne.
     - **la direction** : préparer le comité produit et son support, pour
       faire valider les arbitrages importants par le comité, **avec** le
       CEO (« présidé par » écarté, trop pompeux, Jean).
  4. **Trois points forts**, chacun avec un résultat et un lien vers son
     projet : écouter avant de construire (Tableau de bord client : usage
     d'une organisation active sur six à près d'une sur trois) ; faire
     avancer une équipe jusqu'au résultat (Mises en situation : découverte
     confiée à l'équipe, plusieurs dizaines de milliers d'euros de chiffre
     d'affaires nouveau) ; utiliser l'IA et les données là où elles servent
     (Audit contenu : 1 question sur 20 faisait échouer l'apprenant, toutes
     corrigées). Le résultat est reformulé, pas copié du fait clé. La Matrice
     reste la preuve de la section 2, pas d'ici : aucune redite.
- **N'entre pas** : le parcours (employeur, dates, formation : « À propos »,
  et C1) ; le détail des projets ; un lexique (les infobulles de 0088
  suffisent, seuls Product Manager et Product Designer gardent leur bulle) ;
  contact et CV (point 0005). La page finit par un renvoi vers « À propos »
  et LinkedIn.
- **Jumelle EN (C7)** : réécrite en anglais naturel après le tri FR, puis
  relevé anglais par un agent qui ne l'a pas écrite.
- **Mesure** : refaire le regard RH de 0080 avec un agent neuf, mêmes
  conditions (CV, puis site). Réussite s'il trouve la porte depuis l'accueil,
  résume le métier et les trois points forts dans ses mots, et ne relève
  aucun mot incompris sur cette page. Rapport hors du dépôt.

**Étapes** : 1. Jean dicte les faits des sections 2 et 3 ;
2. rédaction FR (sous-agent) ; 3. relevé des lourdeurs par un autre agent,
tri de Jean ; 4. EN et relevé anglais ; 5. intégration (page FR et EN,
routes, ligne-lien des deux accueils), vérifiée à 1280 et 500 px ; 6. tests
par un autre agent ; 7. revue en contexte neuf ; 8. regard RH.

**Coût estimé** : 480 k (rédaction 65, relevé FR 55, EN et relevé 70,
intégration 70, tests 60, revue 60, regard RH 100), calé sur 0088 (ratio
1,4, la revue et les tests en sous-agents séparés pèsent autant que le code).

**Rien ne se développe avant le go de Jean.** Go donné le 2026-10-25.

**Suivi** : rédaction FR 133 k (brief `prompts/9-redaction-mon-metier.md`) ;
relevé 131 k (`prompts/9-releve-mon-metier.md`), 17 remarques dont quatre de
fidélité (la discovery qui « rapporte », le « avec eux » perdu, la hausse
d'usage du tableau de bord attribuée à l'écoute, CPO lu comme Chief People
Officer). Tri de Jean le 2026-10-25 : toutes les recommandations retenues,
dont la comparaison resserrée, les sigles en toutes lettres à la première
mention, « Mettre l'IA au service de la qualité » (redite d'« À propos »
évitée), « en clair » au lieu de « sans jargon » dans la ligne-lien.
Application avec 0098 : `prompts/9-tri-mon-metier.md`.
