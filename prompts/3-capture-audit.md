# Brief — la capture du carnet de relecture d'Audit contenu (registre/0049)

Le portfolio de Jean montre son projet Audit contenu à des recruteurs. Il
veut une capture du **carnet de relecture** : l'écran où un humain relit une
question auditée (la question, sa réponse, son explication, le verdict, ce
qui lui est reproché, la correction proposée). Elle doit sortir du **vrai
code** d'AuditContenu (`C:\Users\Jean PERRIER\AuditContenu`, en lecture
seule), sur des **questions inventées de toutes pièces**. Même méthode que la
capture UserVoice (registre 0043) : relis ses interdits dans
`prompts/3-captures-uservoice.md`. Ils valent ici, mais la liste de ce que tu
ne lis pas est plus stricte.

## Ce que tu ne lis jamais dans AuditContenu

Ce dépôt contient des contenus réels presque partout. Tu lis **uniquement les
fichiers `.py` à la racine** (en commençant par `carnet_relecture.py` et ce
qu'il importe), et `manifest_lot.schema.json`. Tu n'ouvres **jamais** :
aucun `.html`, aucun `.json` (hors `*.schema.json`), aucun `.md` (même pas le
README), aucun `.sql`, aucun `.cmd`, aucun dossier (`audit_out`, `chunks`,
`envois`, `livraisons`, `sql_out`, `verdicts`, `archive`, `quarantaine`,
`prompts`, `__pycache__`…). Si le code réclame un de ces fichiers en entrée,
fabrique son équivalent inventé dans ton dossier de travail, à partir de ce
que le code attend. Ne modifie rien dans AuditContenu et n'y écris aucun
fichier (`PYTHONDONTWRITEBYTECODE=1`).

## Les données inventées

Travail dans `~/.portfolio/captures-audit/` (hors des deux dépôts). Invente
un petit parcours de 6 à 10 questions d'anglais génériques (compréhension
écrite ou grammaire), écrites par toi, sans nom d'examen, de produit, de
marque, d'entreprise ni de personne, avec des verdicts variés (un bloquant,
un majeur, un mineur, des « rien à corriger »). La question montrée en
premier doit être parlante : une **réponse attendue fausse** ou une
**explication circulaire**, avec la correction proposée.

## Le contrôle, l'image

- Chaque page rendue passe `python ops/hooks/verifier_confidentialite.py`
  (depuis le portfolio) : muet. Aucun nom de table, de champ, d'URL ni
  d'outil interne visible (remplace-les dans ta copie rendue, jamais dans
  AuditContenu). Ne cite aucun terme des listes de `~/.portfolio/`.
- Aucune ressource tierce (retire polices distantes et CDN de ta copie).
- Capture par Edge sans interface, profil jetable. Sortie :
  `public/captures/audit-contenu/carnet-relecture.png`, 1360 px de large,
  ≤ 1450 px de haut, ≤ 300 Ko (`sharp`). Regarde l'image (Read).
- Si le carnet ne se rend pas sans interaction, ou reste illisible réduit à
  850 px de large, arrête-toi et dis-le, avec ce qui serait possible à la
  place.

## Ce que tu rends

Chemin, dimensions, poids ; une légende FR et EN d'une phrase, finie par
« Données synthétiques. » / « Synthetic data. » ; un texte alternatif FR et
EN ; la section d'Audit contenu où elle irait (les H2 sont dans
`src/contenu/projets/fr/audit-contenu.md`, en lecture seule). Ne touche à
aucun fichier de `src/`, ne commite rien : un autre chantier modifie `src/`
en parallèle.

Environnement : Windows, Git Bash, Node par
`export PATH="$APPDATA/fnm/node-versions/v24.20.0/installation:$PATH"`.
