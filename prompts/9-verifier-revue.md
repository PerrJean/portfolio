# Brief — revue de la commande `verifier` (registre/0107)

Lis `registre/0107-commande-verifier.md` (section **Spec** et critères
d'acceptation), puis le diff du chantier : `git diff main...HEAD` dans le
worktree que te donne la session (hors `registre/` et `prompts/`).

Tu n'as vu s'écrire ni le test ni le code. Lecture seule sur le worktree.

## Ce que tu rends

**PASSE** ou **NE PASSE PAS**, puis la liste des problèmes, chacun avec son
fichier, sa ligne et le scénario qui casse. Regarde en particulier :

- le diff contre la spec, point par point (dont ce qui est fait hors spec) ;
- `deploy.yml` : le site testé est-il bien celui qui part en ligne, un rouge
  bloque-t-il toujours la publication ?
- le hook : décision de vitesse, rouge non bloquant, `REFUS`, alertes de
  rédaction, nettoyage de `.dist-hook` ; rien d'autre n'a bougé ;
- `--garder` : un chemin qui ferait vider autre chose qu'un dossier jetable
  (relatif, absolu, casse, barres obliques inverses, lien) ;
- Windows et Ubuntu : chemins, `spawnSync`, codes de sortie, signaux.

**Casse le code de deux ou trois façons**, puis rétablis-le : une cassure
qu'aucun test ne voit rougir est un problème de la liste. **Uniquement dans
une copie jetable** du worktree, sous `$TEMP` (`git clone` local ou copie
sans `node_modules`, puis un lien ou `npm ci`) : le test lance
`--garder .` et `--garder ..`, et une version cassée du contrôle viderait le
dépôt. Ne lance jamais une version cassée dans le worktree.

## Interdits

Ne modifie rien dans le worktree ; pas de `git stash`, `checkout`, `reset`,
`commit`, `push`. Supprime ta copie jetable à la fin. Rapport de 250 mots au
plus. Environnement : Windows, Git Bash, chemins entre guillemets (le profil
contient une espace).
