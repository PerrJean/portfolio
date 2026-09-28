@echo off
rem Lance le serveur de développement Astro en ajoutant Node (installé via fnm) au PATH.
set "PATH=%APPDATA%\fnm\node-versions\v24.20.0\installation;%PATH%"
cd /d "%~dp0"
call npm run dev -- --port 4321
