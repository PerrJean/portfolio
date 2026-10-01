# 0082 — Le lancement : le site ouvert aux moteurs

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `arbitrage` | `mise-en-ligne` | — | — | — |

**Décision de Jean (2026-10-01)** : « On lance maintenant. » `INDEXE = true`
(`src/i18n/publication.ts`, registre/0035) : la balise `noindex, nofollow`
sort de toutes les pages ; `robots.txt` autorisait déjà tout et pointe le
sitemap. Jean active Google Search Console par une propriété de domaine,
vérifiée en TXT dans la zone DNS OVH (aucune balise ni script tiers sur le
site, C6). Reste après le lancement : soumettre le sitemap, demander
l'indexation de l'accueil, vérifier l'aperçu LinkedIn (Post Inspector),
la bannière, et le contact (0005).
