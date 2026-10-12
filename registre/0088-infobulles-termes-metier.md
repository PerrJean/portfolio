# 0088 — Des infobulles pour les termes du métier

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 400 | 569 | `claude-opus-5-5` |

**Idée de Jean (2026-10-09)**, pendant le tri du relevé 0087 : les termes de
base du product management (backlog, grooming, epics, user stories,
discovery, delivery) restent dans le texte, parce qu'un recruteur produit
les attend ; pour le lecteur non initié, une infobulle ou un tooltip les
explique. Chantier à part, après la mise en ligne de l'analyse du NPS, à
spécifier en questionnaire (accessibilité au clavier et au téléphone,
aucune requête tiers, FR et EN).

**Spec (questionnaire du 2026-10-12, recommandations retenues)** :
- **Termes** : les six, plus churn (Audit) et Design Sprint (Mises en
  situation). NPS reste expliqué dans le texte.
- **Occurrence** : la première de chaque page, les suivantes restent du texte.
- **Mécanisme** : un vrai `<button>` qui ouvre un popover HTML natif. On
  l'ouvre au clic, au toucher et au clavier (Échap pour fermer). Pas de
  bibliothèque, aucune requête tiers.
- **Marque** : soulignement pointillé, contour visible au survol et au focus.
- **Design Sprint** : l'infobulle remplace la parenthèse qui l'explique
  aujourd'hui.
- **discovery** : infobulle là où le terme est (pages EN), pas sur les
  étiquettes des cartes. C7 porte sur les pages, pas sur chaque terme.
- **Définition** : une phrase de vingt mots au plus, sans jargon. Elle passe
  le relevé des lourdeurs, puis Jean trie.
- **Validation** : une maquette de labo sur le texte réel de la Matrice,
  avec captures ordinateur et téléphone, fermé et ouvert. **Go visuel de
  Jean avant toute intégration** au site.

**Go visuel de Jean (2026-10-12)** sur la maquette (`/labo/infobulles/`, en
dev seul) : pointillé, bulle claire bordée, terme en gras. **Périmètre
élargi** : les métiers (learning designer, Product Designer, lead
développeur) et « scale-up SaaS B2B » (À propos), en une seule infobulle.
Écartés : le vocabulaire du NPS dans la légende de UserVoice, ADR (déjà
glosé). Hors d'atteinte : les textes alternatifs des images, où un bouton
est impossible. Définitions : `redaction/lexique.md`, relevé passé (six « sûrs » appliqués en
bloc, six « à juger » tranchés par Jean ; delivery gardé tel quel).

Étapes : 1. maquette (brief `prompts/8-infobulles-maquette.md`) ; 2. go
visuel ; 3. définitions FR et EN, relevé, tri ; 4. intégration et tests ;
5. revue en contexte neuf.

**Clôture (2026-10-12)** : intégré sur les pages projet et À propos, FR et
EN (`src/components/infobulles/`, `src/styles/infobulles.css`) ; maquette de
labo retirée ; parenthèse du Design Sprint supprimée. Tests écrits par un
autre agent : `tests/infobulles.test.mjs`, 88 tests, 141 au total, et un
test casse bien quand une définition dérive du lexique. Revue en contexte
neuf : rien de grave ; corrigés le contour de survol resté au téléphone et
la bulle qui héritait de l'italique ou des capitales. Laissés, en le sachant :
dans un navigateur sans popover (Safari 16 et avant), le bouton reste dans
l'ordre de tabulation sans rien faire ; la fermeture au toucher ailleurs
n'est pas vérifiée sur un vrai iPhone. Tranché par Jean : pas de bulle sur
l'accroche de l'accueil ; sur la Matrice, « delivery » garde sa bulle dans
« Pour aller plus loin », la légende de la capture ne change pas.
**Coût réel** : 569 k (maquette 128, relevé 79, intégration 129, tests 109,
revue 124), ratio 1,4 sur l'estimé relevé, 2,6 sur l'estimé initial de 220 :
la revue et les tests en sous-agents séparés pèsent autant que le code.
