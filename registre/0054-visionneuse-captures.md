# 0054 — La visionneuse des captures

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 90 | 142 | `claude-opus-5-5` |

**Constat** (revue 0050, recruteur 0051) : un clic sur une capture ouvre le
PNG brut, hors du site, sans retour ; au téléphone, le texte des captures
fait ~5 px. **Choix de Jean (2026-09-30)** : plein écran dans la page
(`<dialog>` natif, bouton « Fermer », Échap, clic hors de l'image), sans
flèches suivante / précédente ; au téléphone, l'image à sa taille réelle, qui
défile et s'agrandit du doigt ; pas de recadrage dans la page, une mention
« Toucher pour agrandir ». Sans bibliothèque ; sans JavaScript, le lien vers
le PNG reste.
Brief : `prompts/4-visionneuse.md`.

**Clôture** : `src/components/Visionneuse.astro` (`<dialog>` natif, script
local), branché dans `Projet.astro`, libellés dans `textes.ts` ; le schéma
n'est pas pris. Grand écran : image ajustée, un clic la passe à taille
réelle. Téléphone : 1360 px dans une zone qui défile, zoom de page permis.
Fermeture bouton, Échap, clic sur le voile ; focus rendu au lien ; page figée
dessous. Piège : dans un panneau qui ne dessine pas, Chromium retarde
l'événement `close` ; le rangement se fait donc juste après `close()`.
Ratio 1,6.
