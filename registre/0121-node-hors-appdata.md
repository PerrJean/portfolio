# 0121 — Node invisible hors de l'app Claude : fnm sort d'AppData

| nature | etape | statut | cout_estime | cout_reel | modele |
|---|---|---|---|---|---|
| `defaut` | `outil` | `clos 2026-11-09` | — | — | `claude-opus-5-5` |

**Relevé** par 0107 : PowerShell 7 ne trouve pas `node`. **Demande de Jean
(2026-11-09)** : chercher la cause avant de documenter un contournement, puis
corriger le PATH.

**Cause** : fnm (installé par winget) a installé Node 24.20.0 le 2026-09-07
depuis un processus de l'app Claude, qui est un paquet MSIX. Ses écritures
dans `AppData\Roaming\fnm` sont parties dans le cache privé du paquet
(`AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\fnm`). Le
PATH utilisateur citait `AppData\Roaming\fnm\…\installation`, un dossier qui
n'existe pas hors de ce cache : seuls les processus lancés par l'app Claude
(Git Bash compris) voyaient `node` ; PowerShell 7 (lui-même MSIX) et tout
terminal ouvert hors de Claude, non. `dev.cmd` hors de Claude non plus.

**Correction** (session principale, accord de Jean « ok go ») :
- `FNM_DIR` (variable utilisateur) = `C:\Users\Jean PERRIER\.local\share\fnm`,
  hors d'AppData, comme les outils de `uv` ; `fnm install 24.20.0` ;
- dans le PATH utilisateur, l'entrée `AppData\Roaming\fnm\…\installation`
  remplacée par `C:\Users\Jean PERRIER\.local\share\fnm\node-versions\
  v24.20.0\installation` (copie de `HKCU\Environment` prise avant) ;
- `dev.cmd` et le secours de `ops/hooks/pre-commit` pointent le nouveau
  dossier (le secours du hook passe aussi de `$APPDATA`, chemin Windows qui
  casse un PATH POSIX au `:` de `C:`, à `$HOME`).

**Preuve** : dans pwsh 7, PATH rechargé, `Get-Command node` →
`…\.local\share\fnm\…\node.exe`, `node --version` → v24.20.0 ; le registre
porte `FNM_DIR` et la nouvelle entrée ; hook complet vert au commit.
L'ancienne copie reste dans le cache du paquet Claude, sans effet.

**Hors périmètre** : les anciens briefs de `prompts/` qui citent
`$APPDATA/fnm` (historique, non relancés).
