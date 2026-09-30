# Revue complète du site, en contexte neuf (registre/0050)

Relecteur : un agent qui n'a écrit aucune ligne du site. Date : 2026-09-29.
Matière relue : les huit pages construites (`npx astro build --outDir .dist-revue`),
leurs `<head>`, les trois captures et l'aperçu de partage, le site en ligne
(identique octet pour octet au build, vérifié page par page), rendu dans Edge
sans interface à 1280, 1500 et 390 px.

Aucun point **bloquant** trouvé : pas de fuite constatée sur C1 à C6. Les
points ci-dessous sont des majeurs et des mineurs.

## Les cinq points qui comptent le plus avant le lancement

1. **HTTPS n'est pas forcé** : `http://jeanperrier.pm/` répond 200 sans redirection, et `https://www.jeanperrier.pm/` échoue sur une erreur de certificat.
2. **Les contrôles automatiques sont décrits de trois façons incompatibles** : selon le schéma, ils vérifient que « la réponse attendue est la bonne », sans aucun modèle, alors que « Pour aller plus loin » leur donne d'autres contrôles.
3. **Les deux chiffres de tête disent plus que le corps** : « 1 retour sur 3 » ne vaut que pour le formulaire du site, et « empêchait l'apprenant de répondre » signifie en fait « le faisait échouer à tort ».
4. **L'accueil ne dit pas qui est Jean** : ni « Head of Product » ni aucun rôle dans le texte de la page ou dans son `<title>` (« Jean Perrier » seul). Le rôle n'apparaît que sur l'image de partage et dans « À propos ».
5. **Les captures sont illisibles au téléphone** (texte d'environ 5 px à 390 px, environ 10 px dans la colonne à 1280 px). Or le contrat exige « lisible au téléphone ».

---

## Ce qui a été vérifié, et ce qui ne l'a pas été

**Vérifié**
- Le texte des huit pages construites, leurs `<head>`, `robots.txt` et le plan du site.
- Les trois captures et `og/apercu.png`, image par image, métadonnées PNG comprises : ni texte, ni chemin, ni auteur (seul un bloc `pHYs`).
- Les tests du dépôt, lancés sur `.dist-revue` sauf `confidentialite.test.mjs` : 28 réussis sur 28 (accessibilité, animations, contrastes, jumelles, liens, tiers). Le test de confidentialité n'a pas été lancé, pour ne pas lire les listes de `~/.portfolio/`.
- Les contrastes, recalculés : encre 15,4:1, orange 4,96:1, ardoise 4,66:1, texte sur orange 5,05:1.
- Le nom de l'employeur, cherché dans tout le HTML, le CSS et le JS construits : présent seulement dans les deux pages « À propos ».
- Aucune adresse e-mail. Aucune URL absolue hors du site, sauf LinkedIn (lien sortant) et l'espace de noms SVG.
- Le site en ligne : les huit pages sont identiques au build. Aucun `Set-Cookie` dans les en-têtes. Le 404, les redirections, `www` et `http` ont été testés.
- Le rendu à 1280 et 1500 px (Edge sans interface). Le rendu à 390 px dans une iframe de 390 px : Edge impose sa largeur minimale à la fenêtre, pas à l'iframe, donc les requêtes média s'appliquent bien. À cette largeur, aucun débordement horizontal visible.

**Pas vérifié**
- Les termes des listes de `~/.portfolio/` (volontairement non ouvertes). Seul le nom de l'employeur a été cherché, lu sur la page « À propos ».
- Si les captures sont réellement synthétiques. Seuls l'étiquette « Données synthétiques » et l'absence de nom visible ont été vérifiées.
- L'exactitude des faits (dates, pourcentages, rôles) : seule leur cohérence interne a été vérifiée.
- Les animations en défilement réel (bâtiment, scène de l'accueil), l'état ouvert de « Pour aller plus loin » à l'écran, et un vrai téléphone. Les captures sont statiques.
- Les lecteurs d'écran en usage réel. Structure et attributs ont été vérifiés dans le code.
- Le rendu de l'aperçu dans LinkedIn (seules les balises ont été lues).

---

## 1. Le contrat (C1 à C8)

| Constat | Gravité | Preuve | Correction proposée |
|---|---|---|---|
| C1 tenu : l'employeur n'est nommé que dans « À propos » (FR et EN) ; ailleurs, « une plateforme EdTech ». | — | recherche dans `.dist-revue`, HTML, CSS et JS | — |
| C2 : les chiffres du texte sont relatifs (1 sur 3, 1 sur 5, 1 sur 20, 87 %) ou décrivent l'outillage de Jean (25 règles, environ 30 millions de tokens, 233 points, 5 400 à 7 600 lignes). Trois nombres absolus décrivent en revanche la plateforme : 35 signatures, 29 thèmes, six parcours. Ils sont peu sensibles, mais ce sont des nombres internes en absolu. | mineur | `fr/uservoice.md:38`, `fr/audit-contenu.md:46` | À trancher par Jean. Sinon : « une trentaine de signatures », « une trentaine de thèmes », « plusieurs parcours ». |
| C2 et C5 : le texte alternatif de la capture Analyse donne un NPS en absolu (« 22 points de NPS à gagner ») sans dire que la donnée est synthétique. La légende le dit, le texte alternatif non. | mineur | `fr/uservoice.md:41`, `en/uservoice.md:41` | Retirer le chiffre du texte alternatif, ou ajouter « (données synthétiques) ». |
| C5 : la capture NPS affiche des volumes absolus vraisemblables (environ 4 600 notes, 10 700 affichages, 9 400 utilisateurs, effectifs par segment). Ils sont étiquetés synthétiques, mais ils restent dans le même ordre de grandeur que « des milliers de retours par an ». | mineur (à confirmer) | `public/captures/uservoice/tableau-nps.png` | Confirmer que ces volumes ne recopient pas les vrais. Sinon, les arrondir ou les décaler nettement. |
| C4 : la capture du carnet montre un identifiant de question, `q90101`. | mineur (à confirmer) | `public/captures/audit-contenu/carnet-relecture.png`, en-tête de la carte | Vérifier que ce format ne reprend pas celui de la base réelle. Sinon, le masquer. |
| C3 : aucun verbatim, nom ou e-mail de personne. L'onglet « Verbatims » visible sur les captures UserVoice n'est qu'un libellé. | — | captures UserVoice | — |
| C6 tenu : polices servies par le site, aucun script ni aucune image tiers, pas de cookie (en-têtes du site en ligne), seul lien sortant LinkedIn. | — | `tests/tiers.test.mjs` réussi ; `curl -I` | — |
| C7 : les huit jumelles existent et se basculent l'une vers l'autre, mais leur contenu diverge (voir section 2). | majeur | section 2 | — |
| C8 : le point de départ d'UserVoice se lit comme un défaut (« ces retours n'étaient pas qualifiés… sans qu'on sache s'ils étaient déjà traités »). Un piège payé aussi : « Un tableau de bord figé sans que personne ne s'en aperçoive ». | mineur | `fr/uservoice.md:28`, `:19` | En levier : « Les retours existaient dans quatre sources ; les lire ensemble permettait de savoir ce qui revenait et ce qui était traité. » Pour le tableau de bord : « Un tableau de bord qui s'était arrêté ; une alerte de fraîcheur le signale désormais », si c'est le cas. |
| C8 bien tenu sur l'audit : « Son résultat ne présume pas de la qualité du reste du contenu. » | — | `fr/audit-contenu.md:62` | — |

## 2. Les jumelles FR / EN

Les chiffres et les dates sont identiques partout. Ce qui diverge :

| Constat | Gravité | Preuve | Correction proposée |
|---|---|---|---|
| Des phrases n'existent qu'en EN dans l'audit : « We put the effort into the content itself, question by question. », « (line breaks, editorial rules) », « They change how the work gets done. », « I measured them on the project itself ». | majeur | `en/content-audit.md:43`, `:76`, `:78` | Les retirer de l'EN (recommandé : elles n'apportent aucun fait), ou les ajouter en FR. |
| « Pour aller plus loin, Les contrôles automatiques » compte trois points en FR et deux en EN : le contrôle de l'audio est passé dans le corps en EN (« One of them, for example… ») et n'existe pas dans le corps FR. | majeur | `fr/audit-contenu.md:23-27` ; `en/content-audit.md:23-26`, `:53` | Aligner les deux structures (voir section 4 : ce passage est de toute façon à reprendre). |
| UserVoice EN ajoute du sens : « for the next runs », « cases that have become obvious » (règles apprises), alors que le FR dit « les cas évidents ». Et « The NPS survey points the same way from another direction » contre « L'enquête NPS le confirme ». | mineur | `en/uservoice.md:49`, `:57` ; `fr/uservoice.md:49`, `:57` | Revenir au sens du FR, plus court. |
| « The pitfalls we paid for » : un « we » absent du FR (« Les pièges payés »), qui contredit « I ran UserVoice on my own ». | mineur | `en/uservoice.md:15` | « Pitfalls paid for » ou « What it cost to learn ». |
| « À propos » EN ajoute du contexte absent du FR (« for the French government », la mission de l'observatoire). C'est une aide légitime au lecteur étranger, mais une asymétrie. | mineur | `src/pages/en/about.astro:26-27` | Garder, en l'assumant comme adaptation. Ou ajouter une demi-phrase en FR. |
| Les pages EN montrent la capture du carnet et l'image de partage en français (« BLOQUANT », « IA appliquée »). | mineur | `en/content-audit.md:70` ; `src/layouts/Base.astro:26` (une seule image pour toutes les pages) | Produire `apercu-en.png`, choisi selon la langue. Pour la capture, l'annonce « in French » dans le texte alternatif suffit. |

## 3. La ligne éditoriale

La ligne (`SKILL.md`) est écrite pour le français. L'anglais a été relu contre
les mêmes familles de tics.

### Redites entre synthèse, corps et « Pour aller plus loin »

| Constat | Gravité | Preuve | Correction proposée |
|---|---|---|---|
| UserVoice : la synthèse est recopiée dans le corps. « Je les ai réunis dans une seule table » deux fois, mot pour mot. « La donnée a désigné le contenu » deux fois. « On pensait surtout à des bugs » est repris par « L'hypothèse implicite… ». « L'IA classe chaque retour avec un score de confiance » deux fois. « chaque lundi, en cinq minutes » trois fois (titre, synthèse, corps). | majeur | `fr/uservoice.md:7-8` contre `:30`, `:34`, `:36`, `:57`, `:68` | Garder la synthèse, réécrire le corps sans reprendre ses phrases. Supprimer la dernière phrase (`:68`) ou la réduire à « Le second projet part de ce constat. » |
| Audit : « 1 question sur 20 » quatre fois sur la page (fait, légende du schéma, `:60`, et l'accueil). « toutes corrigées » trois fois. « la semaine du 28 septembre » deux fois. « le plus ancien » deux fois. Les six critères décrits dans le corps puis relistés dans « La grille », dans un autre ordre. | majeur | `fr/audit-contenu.md:4`, `:8`, `:46`, `:50`, `:60`, `:62`, `:68`, `:10-17` ; `chaine-audit.mjs` (légende) | Retirer le chiffre de la légende du schéma. Retirer la date de `:68`. Dans le corps, nommer les critères sans les définir, et laisser les définitions à « La grille », dans le même ordre. |
| « Près d'un commentaire NPS sur cinq » est dit dans UserVoice puis redit dans « Pour aller plus loin » de l'audit. | mineur | `fr/uservoice.md:49` ; `fr/audit-contenu.md:30` | Supprimer la section « Ce que disaient les retours » de l'audit. |
| La devise « j'écoute, je teste, puis j'investis » apparaît en H1 de l'accueil, sur l'image de partage et dans « À propos ». C'est le triplet voulu, mais il revient trois fois. | mineur | `src/pages/index.astro:17` ; `src/pages/a-propos.astro:30` | La retirer d'« À propos », ou la reformuler par un fait. |

### Tics, jargon, précision

| Constat | Gravité | Preuve | Correction proposée |
|---|---|---|---|
| Jargon technique opaque pour un recruteur : « fait la recette des échantillons » (et « run acceptance testing »), « en base », « préproduction ». | mineur | `fr/audit-contenu.md:44` ; `chaine-audit.mjs:45-46`, `:86-87` | « a relu et validé un échantillon des corrections ». |
| Un détail sans intérêt pour le lecteur : « sur abonnement, sans API payante ». | mineur | `fr/audit-contenu.md:54` ; `en/content-audit.md:53` | Supprimer. |
| « Je les ai mesurées en tokens… » : des règles « mesurées en tokens » ne veut rien dire. | mineur | `fr/audit-contenu.md:77` | « Le projet a coûté environ 30 millions de tokens en quatre semaines ; chaque décision est tracée. » |
| Généralités sans fait en EN : « They change how the work gets done. », « We put the effort into the content itself ». | mineur | `en/content-audit.md:43`, `:78` | Supprimer (voir section 2). |
| « Des agents IA encadrés » : « encadrés » ne dit pas comment. | mineur | `fr/audit-contenu.md:7` | Dire par quoi : « encadrés par la grille et relus par un second agent ». |
| « quand deux réponses sont trop proches » (UserVoice) : ici, « réponse » désigne les deux classements proposés par l'IA. Le mot entre en conflit avec le sens réservé à « réponse » dans l'audit (la réponse d'une question), et avec « les réponses vides » de la même phrase. | mineur | `fr/uservoice.md:57` | « quand deux catégories arrivent trop près l'une de l'autre ». |
| Phrases de plus de 25 mots : FR, 29 mots (`fr/uservoice.md:26`), 30 (`:42`), 26 (`:51`), 26 (`fr/audit-contenu.md:44`), 27 (`:72`). EN, 28 (`en/uservoice.md:26`), 28 (`:42`), 27 (`:49`), 31 (`:57`). | mineur | lignes citées | Couper en deux à la virgule principale. |
| Typographie incohérente : apostrophes droites (') dans la synthèse, « Pour aller plus loin », l'accueil et « À propos », mais courbes (’) dans le corps Markdown, converti automatiquement. Les deux se côtoient sur la même page. | mineur | `fr/uservoice.md:6-19` (frontmatter) contre le corps construit | Écrire ’ dans le frontmatter et les `.astro`, ou appliquer la même conversion au rendu. |
| Voix : le schéma dit « Jean et la learning designer », alors que la page dit « je ». | mineur | `chaine-audit.mjs:45-46`, `:86-87` | « Relecture humaine : la learning designer et moi… », ou tourner sans sujet. |
| Homonymie : « UserVoice » est aussi le nom d'un outil commercial de recueil de retours. Un recruteur peut croire à l'usage de ce produit. | mineur | titre de la page | Une demi-phrase la première fois : « UserVoice, l'outil que j'ai construit… ». |
| Aucune occurrence de « clé », de tiret cadratin, de mot-emphase ni de jargon de consultant dans le texte des pages. | — | recherche sur le texte extrait | — |

### Cohérence des faits (à confirmer avec Jean)

| Constat | Gravité | Preuve | Correction proposée |
|---|---|---|---|
| Les **contrôles automatiques** ont trois descriptions. Le schéma : « la réponse attendue est-elle la bonne ? l'explication existe-t-elle ? est-elle circulaire ? ». Le corps : « qui ne dépendent d'aucun modèle ». « Pour aller plus loin » : audio, mise en forme, langue. Juger sans modèle qu'une réponse est la bonne n'est pas crédible. La capture montre d'ailleurs un contrôle mécanique d'étiquette (lettre affichée ≠ lettre enregistrée). | majeur | `chaine-audit.mjs:33`, `:37`, `:74`, `:78` ; `fr/audit-contenu.md:23-27`, `:54` | Dans le schéma, décrire ce que font vraiment les contrôles (étiquette de la bonne réponse, explication présente, audio, mise en forme, langue). Laisser « est-ce la bonne réponse ? » aux agents. |
| La **relecture humaine** a trois descriptions. « une personne relit chacun [des lots] avant la préproduction » ; « la personne qui relit juge le cas le moins fiable, et sa décision vaut pour toute la famille » ; « font la recette des échantillons ». Si la relecture se fait par échantillon, « le pire est un lot rejeté » ne tient plus : une erreur hors échantillon peut passer. | majeur | `fr/audit-contenu.md:66`, `:72` ; `chaine-audit.mjs:45` | Une seule description, exacte : ce qui est relu en entier, ce qui est échantillonné, et pourquoi c'est sûr. |
| Les **chiffres de tête** généralisent. « 1 retour sur 3 concerne le contenu » (accueil, fait, synthèse, après « quatre sources ») vaut pour le seul formulaire du site : l'enquête NPS donne près de 1 sur 5. « 1 question sur 20 empêchait l'apprenant de répondre » : le corps dit que l'apprenant « y échouait sans que l'erreur soit la sienne ». | majeur | `fr/uservoice.md:4`, `:47` ; `fr/audit-contenu.md:4`, `:52`, `:60` ; `src/contenu/projets.ts:30`, `:40` | « Dans le formulaire du site, 1 retour sur 3 concerne le contenu. » ; « 1 question sur 20 faisait échouer l'apprenant à tort. » |
| **Chronologie serrée.** UserVoice est « lancé en septembre 2026 ». L'audit « part de ce constat », a duré « quatre semaines » et est en production depuis la semaine du 28 septembre. Les deux pages sont datées « Septembre 2026 ». Le lecteur attentif se demande comment l'un a pu nourrir l'autre, et ce que valent « chaque lundi » après trois lundis. | majeur (à confirmer) | `fr/uservoice.md:28` ; `fr/audit-contenu.md:8`, `:33` | Si UserVoice tournait avant septembre, dater son vrai début. Sinon, dire que l'analyse a porté sur l'historique de mars à septembre. |
| La capture Analyse classe « exercices » (32 %) au-dessus d'« explications » (26 %) en part des citations, mais le texte alternatif dit « les explications arrivent en tête ». C'est juste (le classement se fait sur les points de NPS), mais ça prête à confusion. | mineur | `fr/uservoice.md:41` | « …en tête du classement par points de NPS à gagner ». |

## 4. L'accessibilité

| Constat | Gravité | Preuve | Correction proposée |
|---|---|---|---|
| Captures illisibles au téléphone (environ 5 px de texte à 390 px) et petites à 1280 px (environ 10 px). Le lien vers le PNG et le texte alternatif compensent en partie. | majeur | captures `if-ac-fr` et `ac-fr-1280`, bloc « Corriger sans casser » | Recadrer chaque capture sur la zone qui prouve (une carte, un graphique), à l'échelle 1. Garder l'écran entier derrière le lien. |
| En EN, des noms propres français sans `lang="fr"` (observatoire, dispositif d'avis, programme public) : le lecteur d'écran les prononce à l'anglaise. | mineur | `src/pages/en/about.astro:26-27` | `<span lang="fr">…</span>`. |
| Bascule de langue libellée « FR » / « EN » : un lecteur d'écran l'épelle. | mineur | `src/components/Bascule.astro` | Ajouter `aria-label="Français"` / `aria-label="English"`, ou le mot en texte masqué. |
| Titres (h1 unique, h2, puis h3), lien d'évitement, focus visible (3 px encre), cibles de 24 px au moins, `lang` des pages, dessins en `aria-hidden` : tout est correct. Le schéma a une vraie alternative (liste ordonnée masquée visuellement). | — | HTML construit ; `tests/accessibilite.test.mjs` réussi | — |
| `prefers-reduced-motion` respecté : scène (`Scene.astro:157`, `:248`), bâtiment (`Batiment.astro:239`, `:261`, script `:309`), défilement doux (`base.css:13`). | — | sources citées | — |
| Contrastes conformes (encre 15,4:1 ; orange 4,96:1 ; texte sur orange 5,05:1 ; ardoise 4,66:1, utilisée à 19 px en gras). L'ambre (2:1) ne sert jamais au texte. | — | `jetons.css` ; calcul | — |

## 5. Le rendu (1280, 1500, 390 px)

| Constat | Gravité | Preuve | Correction proposée |
|---|---|---|---|
| Aucun débordement horizontal à 390 px. Le menu se replie derrière « Menu ». Le schéma passe en colonne, lisible. Le bâtiment disparaît sous 960 px, comme prévu. | — | captures dans une iframe de 390 px | — |
| À 1280 et 1500 px : colonne de texte et bâtiment à droite, corrects. Le schéma tient sur deux rangées. | — | captures `*-1280`, `*-1500` | — |
| Accueil : dans chaque parcelle, les numéros « 01 » et « 02 » sont énormes et le fait (le seul contenu probant) est en petit corps. La hiérarchie est inversée pour le lecteur pressé. | mineur | `home-fr-1280` | Remonter le corps du fait (au moins celui du sous-titre de l'accroche). |
| Les deux parcelles de l'accueil portent la même scène, identique. | mineur | `index.html`, deux `svg.scene` identiques | Accepter (choix d'identité) ou différencier la seconde. |

## 6. Les liens, le `<head>` et l'hébergement

| Constat | Gravité | Preuve | Correction proposée |
|---|---|---|---|
| HTTPS non forcé : `http://jeanperrier.pm/` répond 200 ; `http://www…` renvoie 301 vers `http://` (sans « s ») ; `https://www…` échoue (certificat sans `www`, SEC_E_WRONG_PRINCIPAL). | majeur | `curl -sv` | Réglages GitHub Pages : cocher « Enforce HTTPS » ; déclarer `www` (CNAME DNS vers l'hôte GitHub) pour que le certificat le couvre. |
| L'accueil a pour `<title>` et `og:title` « Jean Perrier » seul. Le texte de la page ne mentionne aucun rôle. | majeur | `src/pages/index.astro:11`, `:17` | `<title>` : « Jean Perrier · Head of Product ». Une ligne visible sous le nom ou au-dessus de l'accroche : « Head of Product · IA appliquée · Data ». |
| `noindex, nofollow` sur les huit pages : c'est attendu. L'interrupteur est unique. | — | `src/i18n/publication.ts:6` | Le jour du lancement, `INDEXE = true`, puis vérifier le HTML. |
| La page d'essai `/labo/scene/` est publiée et accessible (200). Elle est en `noindex` et hors du plan du site, mais publique. | mineur | `src/pages/labo/scene.astro` ; `curl` | L'exclure du build de production (la déplacer hors de `src/pages`, ou la conditionner à `import.meta.env.DEV`). |
| Pas de page 404 à soi : GitHub sert sa page par défaut, en anglais, sans lien de retour. | mineur | `curl https://jeanperrier.pm/nexistepas/` | Ajouter `src/pages/404.astro`, bilingue, avec un lien vers l'accueil. |
| Une seule image de partage, en français, pour toutes les pages, EN comprises. | mineur | `src/layouts/Base.astro:26` | Voir section 2. |
| Canonical, hreflang fr/en/x-default, `og:locale` et son alternative, `og:image` 1200×630 avec texte alternatif, `twitter:card` : présents et justes sur les huit pages. Liens internes valides (test réussi). La bascule mène à la jumelle exacte. | — | `<head>` des huit pages ; `tests/liens.test.mjs`, `tests/jumelles.test.mjs` | — |
| Commentaires HTML de travail (annotations des animations) livrés en production : 12 sur l'accueil. Rien de sensible, du poids en trop. | mineur | `index.html` construit | Les passer en commentaires du frontmatter (`{/* */}`), qui ne sont pas rendus. |
