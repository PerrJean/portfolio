# 0028 — Chantier 2c : la vraie page d'accueil

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 100 | 157 | claude-opus-5-5 |

**Go de Jean (2026-09-29).** Accueil FR et EN : soleil fixe en anneaux dans
le coin haut droit, accroche, section des projets, parcelles-liens (01
UserVoice, 02 Audit contenu, reliées par « Alors j'ai agi dessus. »,
variante `a-part` prévue), scène agrandie dans chaque parcelle, données des
projets dans un seul fichier. Ordre de l'impatience gardé (de gauche à
droite), Jean jugera sur le site. Brief : `prompts/2c-accueil.md`.

**Clos le 2026-09-29.** `Soleil.astro`, `Parcelle.astro`, `Parcelles.astro`
(grille et flèche), `src/contenu/projets.ts` (pas `data/`, ignoré par le
`.gitignore`) ; accueil FR et EN réécrits. Preuve : `npm test` → `29 | pass
29 | fail 0 | todo 0` (rejoué par le hook au commit). **Vu dans le
navigateur** à 1 280 px et au téléphone : accroche, soleil dans le coin du
contenu (sous l'en-tête, pour ne pas gêner la navigation), parcelles, flèche,
scène qui réagit au survol. Faits clés EN alignés à la main sur les pages
projet. Ratio 1,57. La scène n'est agrandie que de 12 % sur grand écran
(limite du conteneur) : à juger par Jean.
