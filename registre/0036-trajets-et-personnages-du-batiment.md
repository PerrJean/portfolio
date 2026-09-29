# 0036 — Survol aux trajets raccourcis ; personnages du bâtiment agrandis

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `structure` | 140 | 239 | claude-opus-5-5 |

**Demandes de Jean (2026-09-29).**

- **Survol à 0,7 s** (au lieu de 0,9) par des trajets plus courts : repos
  de A, B et du porteur rapprochés de la table (220, 250, 355). Au passage,
  un défaut de l'ancien repos corrigé : le marteau traversait la poutre
  pendant le tour. Écarts mesurés par un script sur les vraies poses. 119 k.
- **Bâtiment** : personnages 1,8 fois plus grands (Jean reconnaissable,
  lunettes agrandies d'un quart), bras et marteau qui pivotent ensemble à
  l'épaule (nouvelles poses `frappe-1` et `frappe-2`, poses existantes
  intactes) ; bâtiment décalé de 30 px vers la gauche et flèche de la grue
  allongée pour faire la place. 120 k.

Preuve : `npm test` → `pass 29 | fail 0` pour chacun (rejoué par le hook) ;
**vus dans le navigateur** (accueil figé à 0,3 et 0,7 s ; bâtiment en milieu
et en fin de page). Ratio 1,71 : deux passes de géométrie serrée.
À juger par Jean : A et B très proches au repos.

**Le site est en ligne** (`0035`) : `https://jeanperrier.pm` répond en HTTPS
sur les huit pages, `noindex` en place ; DNS OVH basculé par Jean.
