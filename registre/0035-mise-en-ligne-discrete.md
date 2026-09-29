# 0035 — Mise en ligne discrète

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `publication` | — | non mesurable (session principale) | claude-opus-5-5 |

**Go de Jean (2026-09-29).** Le site part en ligne sur `jeanperrier.pm` avant
que les textes soient prêts, pour éprouver la chaîne (Pages, DNS, HTTPS,
publication automatique), mais **caché des moteurs** : `noindex, nofollow`
tant que `src/i18n/publication.ts` dit `INDEXE = false`, et Jean ne partage
pas le lien. Publication à chaque envoi sur `main` (tests d'abord).
Dernier contrôle de confidentialité de tout l'historique de `main` avant le
passage en public : aucun terme interdit. Jean a passé le dépôt en public et
choisi « GitHub Actions » comme source de Pages.
