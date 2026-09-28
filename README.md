# Portfolio

Le portfolio de Jean Perrier : une histoire en deux actes, pour un recruteur.
Site statique [Astro](https://astro.build), FR par défaut, EN en miroir.

Tout commence par `CLAUDE.md` (les règles), `SPEC.md` (le pourquoi) et
`CONTRAT.md` (ce qui sort, ce qui ne sort jamais). Les décisions sont dans
`registre/`.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:4321. Sous Windows, `dev.cmd` ajoute Node au PATH.

## Avant le premier commit sur un poste

```bash
sh ops/hooks/install.sh
```

Le hook refuse secrets, fichiers de données et termes interdits. Les listes
de termes vivent hors du dépôt, dans `~/.portfolio/` (`interdits.txt`,
`employeur.txt`, un terme par ligne) : sans elles, le hook refuse tout.
