# 0029 — Les tests sur GitHub, et Dependabot

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `chantier` | `publication` | `clos 2026-09-29` | — | non mesurable (session principale) | claude-opus-5-5 |

**Go de Jean (2026-09-29).** `tests.yml` : build et tests à chaque envoi sur
`main` et sur chaque pull request. `deploy.yml` : un job `tester` précède la
construction, rien n'est publié si un test échoue. `dependabot.yml` : npm et
actions, chaque semaine, en pull request. Les listes de termes interdits
passent par deux secrets (`INTERDITS`, `EMPLOYEUR`, noms choisis par Jean), à
créer par Jean côté **Actions** et côté **Dependabot** (les pull requests de
Dependabot ne voient pas les secrets Actions). Sans eux, les tests
échouent : c'est voulu.
