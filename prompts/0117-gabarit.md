# Brief 0117 — le gabarit des trois temps titrés

Tu codes le gabarit jusqu'au vert de `tests/temps.test.mjs`, écrit par un
autre agent. **Tu ne touches pas aux tests** ; si l'un te semble faux, tu
t'arrêtes et tu dis lequel et pourquoi.

**Dossier de travail** : `C:\Users\Jean PERRIER\Portfolio\.claude\worktrees\chantier-0117-impact-1d2082`
(un worktree git). Tu ne modifies que `src/layouts/Projet.astro` et
`src/i18n/textes.ts`. Rien d'autre : ni `tests/`, ni `src/contenu/`, ni
`registre/`, ni l'accueil (`Parcelle.astro`, `projets.ts`). Interdit :
`git stash`, `git checkout`, `git reset`, `git commit`, `--no-verify`.

## À lire (deux fichiers)

1. `registre/0117-probleme-solution-impact.md`, sections **Tranché** et
   **Spec** : tout ce qui est décidé.
2. `src/layouts/Projet.astro` : le bloc `synthese__phrases` et son CSS, et
   `synthese__cadre`, dont le filet gauche sert de modèle.

`src/i18n/textes.ts` porte les libellés : ajoute `temps: { depart, action,
impact }` au type et aux deux langues, comme `cadre`.

## Repères

- Les commentaires du projet sont en français, courts, et citent le registre
  (`registre/0117`). Mets à jour le commentaire d'en-tête de `Projet.astro`
  (point 1 : « trois phrases » devient les trois temps titrés).
- Contraste : le `dt` est en `--encre` (l'ardoise ne passe qu'en grand
  texte). Taille du `dt` autour de 0,875–0,9375rem, capitales par CSS.
- Le module reste sous 500 lignes.

## Comment vérifier

En Git Bash, dans le worktree :

```
rm -rf .dist-0117 && npx astro build --outDir .dist-0117 && DIST=.dist-0117 node --test tests/temps.test.mjs
```

Puis les tests rapides, sans les passes en navigateur :
`DIST=.dist-0117 node --test $(ls tests/*.test.mjs | grep -v -- '-navigateur\.test\.mjs$')`.
Supprime `.dist-0117` à la fin.

## Ce que tu rends

Le diff résumé (fichiers, lignes), la sortie des deux commandes (`# pass` /
`# fail`), et toute décision prise hors de la spec.
