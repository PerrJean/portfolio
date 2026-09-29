# 0026 — Chantier 2b : le socle du site

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 120 | 124 | claude-opus-5-5 |

**Go de Jean (2026-09-29).** Jetons de couleur, police Atkinson par npm
(fin de Google Fonts), gabarit commun (lang, titre, description, canonique,
`hreflang`, Open Graph de base, lien d'évitement, focus visible), en-tête
(logo-lunettes, Projets · À propos, FR | EN, LinkedIn, menu replié au
téléphone), pied de page, bouton en trois variantes avec la règle du point,
les huit pages en squelette, plan du site et `robots.txt`, ménage du
brouillon (la fiche du 7 septembre part dans `matiere/`), build et tests
dans le hook. Deux paquets npm à installer, accord donné par Jean (choix
« npm », `0020`). Brief : `prompts/2b-socle.md`.

**Clos le 2026-09-29.** Preuve rejouée par la session : build réussi (huit
pages et `/labo/scene/`), `npm test` → `29 | pass 28 | fail 0 | todo 1` (le
test d'animations garde son `todo` 2c, il passe déjà) ; les seules adresses
externes du HTML sont le domaine du site et LinkedIn ; police servie par le
site ; **vues dans le navigateur** : accueil FR et page projet EN, en-tête,
bascule, LinkedIn. Le hook construit et teste à chaque commit (vérifié par
ce commit même). Ratio 1,03. Textes provisoires (descriptions, « Content
audit », `en_GB`) à revoir à l'étape 3.
