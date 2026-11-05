#!/bin/sh
# Installe les deux crochets : chacun, dans le dossier des crochets du depot
# (commun aux worktrees), appelle le script versionne de meme nom sans le
# recopier, pour qu'il ne se perime jamais (lecon de UserVoice, registre/0047).
cd "$(git rev-parse --show-toplevel)"
DOSSIER=$(git rev-parse --git-path hooks)
mkdir -p "$DOSSIER"
for nom in pre-commit pre-merge-commit; do
  printf '#!/bin/sh\nexec sh "$(git rev-parse --show-toplevel)/ops/hooks/%s" "$@"\n' "$nom" > "$DOSSIER/$nom"
  chmod +x "$DOSSIER/$nom"
  echo "hook $nom installe (appelle ops/hooks/$nom)"
done
