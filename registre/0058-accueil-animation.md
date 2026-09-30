# 0058 — L'accueil, étape 3 : les animations par projet

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 140 | 286 | `claude-opus-5-5` |

**Go de Jean (2026-09-30)** sur la planche de 0057
(`ops/images/accueil/planche.png`). On anime :
1. **En-tête, 960 px et plus** : l'équipe (trois ouvriers anonymes) sous le
   soleil, l'impatience actuelle jouée une fois au chargement ; calée sur le
   soleil au-delà de 1280 px ; absente au téléphone.
2. **Carte 01 UserVoice** : Jean seul, plan roulé sous le bras → il le
   déroule sur le tréteau et le regarde (point ambre).
3. **Carte 02 Audit contenu** : Jean penché sur le plan, l'équipe à distance →
   les trois le rejoignent, outils posés, et regardent le plan (point ambre).
4. Cartes : ~0,6 s au survol et au focus sur grand écran ; au téléphone, une
   fois à l'entrée de la carte à l'écran. Mouvement réduit : l'image de repos.

Brief : `prompts/4-accueil-animation.md`.

**Clôture** : `Scene.astro` aiguille trois variantes (`SceneEntete`,
`SceneUservoice`, `SceneAudit`) ; `projets.ts` porte le champ `scene`.
En-tête : équipe absolue sous le soleil à partir de 960 px, sol posé sur la
ligne de base de la phrase ; titre en `flow-root` à partir de 960 px pour
que `text-wrap: balance` s'applique malgré le flottant du soleil. Cartes :
retour au repos à la fin du survol ; au téléphone, un second observateur
joue une scène entièrement visible qui n'atteindra jamais le milieu de
l'écran (sinon la carte 02 ne jouait pas sur 390 × 844). Mesures faites en
figeant `getAnimations()`. Écart : en anglais, la poutre lancée entre de ~5 px
dans l'anneau du soleil à 960-1120 px. Ratio 2,0 : le panneau intégré masqué
a obligé à refaire les captures dans un Chrome sans interface.
**Retouche (Jean, 2026-10-01)** : quatre lignes réservées au titre à partir
de 960 px, quelle que soit la langue (`min-height: calc(4 * 1.08em)`) :
l'équipe a la même place en FR et en EN (mesurée à 980, 1040, 1120, 1280 et
1600 px), la poutre ne touche plus le soleil.
