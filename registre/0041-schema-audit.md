# 0041 — Le schéma de la chaîne d'Audit contenu

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `contenu` | 90 | 141 | `claude-opus-5-5` |

**Demande de Jean (2026-09-29), choix « a, a, a »** : au trait (encre et
ardoise, ambre sur la seule étape humaine), juste après « Ce que la grille
vérifie », en colonne verticale au téléphone. Parcours → agents IA et
contrôles automatiques → bilan → relecture humaine → lots relus →
préproduction puis production ; « 1 question sur 20 bloquante, toutes
corrigées ». Texte accessible à côté du dessin, FR et EN, sans nouveau
paquet. Brief : `prompts/3-schema-audit.md`.

**Clôture** : plugin rehype local (`src/components/schemas/`), dessin en
HTML et CSS, deux rangées de trois sur grand écran (six étapes ne tiennent
pas sur une ligne de 640 px à 15 px), colonne au téléphone ; liste ordonnée
masquée pour les lecteurs d'écran. Vu à 1280 et 390 px, sans débordement.
Piège : le rendu Markdown est mis en cache (`.astro/data-store.json`), un
changement du plugin seul exige `astro build --force`. Libellés du dessin à
valider par Jean. Ratio 1,6.
