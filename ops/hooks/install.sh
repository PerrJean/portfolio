#!/bin/sh
# Installe le hook : .git/hooks/pre-commit appelle le script versionne, sans le
# recopier, pour qu'il ne se perime jamais (lecon de UserVoice, registre/0047).
cd "$(git rev-parse --show-toplevel)"
printf '#!/bin/sh\nexec sh "$(git rev-parse --show-toplevel)/ops/hooks/pre-commit" "$@"\n' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
echo "hook pre-commit installe (appelle ops/hooks/pre-commit)"
