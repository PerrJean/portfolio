# 0029 — Les tests sur GitHub, et Dependabot

| nature | etape | cout_estime | cout_reel | modele |
|---|---|---|---|---|
| `chantier` | `publication` | — | non mesurable (session principale) | claude-opus-5-5 |

**Go de Jean (2026-09-29).** `tests.yml` : build et tests à chaque envoi sur
`main` et sur chaque pull request. `deploy.yml` : un job `tester` précède la
construction, rien n'est publié si un test échoue. `dependabot.yml` : npm et
actions, chaque semaine, en pull request. Les listes de termes interdits
passent par deux secrets (`PORTFOLIO_INTERDITS`, `PORTFOLIO_EMPLOYEUR`), à
créer par Jean côté **Actions** et côté **Dependabot** (les pull requests de
Dependabot ne voient pas les secrets Actions). Sans eux, les tests
échouent : c'est voulu.
