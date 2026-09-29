# 0039 — Contrôle d'accessibilité dans le navigateur

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `defaut` | `structure` | — | non mesurable (session principale) | claude-opus-5-5 |

**Question de Jean (2026-09-30) : le site est-il accessible ?** Contrôle mené
par la session, dans le navigateur, sur six pages : contraste réel de chaque
texte visible (calculé sur les styles appliqués) : aucun sous le seuil ; un
seul `h1`, aucune image sans `alt` ; clavier : le lien d'évitement apparaît
à la première tabulation, l'ordre suit la lecture, focus visible (contour
3 px) partout ; nom accessible des parcelles lisible (« 01 UserVoice 1
retour sur 3… »). **Défaut corrigé** : trois cibles sous 24 × 24 px (FR,
EN, LinkedIn du pied de page), agrandies (WCAG 2.2, 2.5.8). **Non vérifié** :
un vrai lecteur d'écran, le zoom à 200 %, le menu du téléphone au clavier.
