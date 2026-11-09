@echo off
rem Lance le serveur de développement Astro en ajoutant Node (installé via fnm) au PATH.
rem fnm vit hors d'AppData (FNM_DIR, registre/0121) : visible de tout terminal.
set "PATH=%USERPROFILE%\.local\share\fnm\node-versions\v24.20.0\installation;%PATH%"
cd /d "%~dp0"
call npm run dev -- --port 4321
