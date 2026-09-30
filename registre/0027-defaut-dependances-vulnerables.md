# 0027 — Dépendances signalées vulnérables

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `outil` | 60 | 221 | `claude-opus-5-5` |

**Relevé le 2026-09-29** par `npm audit` après le chantier 2b : `astro`
(5.18, critique, correctif en version majeure 7), `esbuild` (lecture de
fichiers par le serveur de dev sous Windows), `sharp` (bibliothèques
d'images). Le site publié est statique : ces failles touchent le poste de
développement (serveur de dev) et le traitement d'images, pas les visiteurs.
**À faire avant la mise en ligne** : montée d'Astro en version 7 dans un
chantier dédié, tests à l'appui. Ne pas lancer `npm audit fix --force` à
l'aveugle.

**Lancé le 2026-09-30** à la demande de Jean, dans un worktree (branche
dédiée, fusion après revue). Brief : `prompts/4-astro-7.md`. Coût estimé
revu : 120 (deux versions majeures, 5 → 7, et la comparaison des builds).

**Clôture (2026-10-01)** : astro 5.18.2 → 7.3.5, sharp 0.34 → 0.35 ;
`npm audit` : 3 alertes (dont une critique) → 0. Adaptations imposées par
les guides : plugin des schémas porté vers Sätteri (`@astrojs/markdown-satteri`
déclaré, déjà tiré par astro), `compressHTML: true` (sinon « FR|EN »), `z`
depuis `astro/zod`. Hook de pre-commit rendu compatible avec les worktrees
(fichiers temporaires dans le vrai dossier git), sans contrôle retiré. Neuf
pages comparées à un build Astro 5 : texte, `<head>` et liens identiques.
Ajouté à la fusion : `vite.build.cssTarget` (Safari 14), car Vite 8 écrivait
les media queries en plages, illisibles avant Safari 16.4. Ratio 3,7 contre
l'estimation d'origine (60), 1,8 contre l'estimation revue (120).
