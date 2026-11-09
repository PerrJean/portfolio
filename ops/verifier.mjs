// Une seule commande de vérification (registre/0107) : `npm run verifier`.
// Construit le site dans un dossier jetable, lance tous les tests dessus
// (variable DIST), puis supprime le dossier, vert ou rouge. La même commande
// pour Jean, l'agent, le hook de pre-commit et la CI.
//
//   npm run verifier                         build + tous les tests
//   npm run verifier -- --rapide             sans tests/*-navigateur.test.mjs
//   npm run verifier -- --garder <dossier>   construit là, et l'y laisse
//
// Le dossier est vidé avant le build : `--garder` refuse (code 2, avant tout
// build) un dossier hors du dépôt, la racine elle-même, un dossier qui
// contient un fichier suivi par git (ou nouveau, non ignoré), un fichier, ou
// un chemin qui passe par .git, node_modules ou .claude.
// Code de sortie : 0 vert, 1 rouge, 2 refus.
// Ni npx ni shell : node lance astro et `node --test` (Windows et Ubuntu).

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, realpathSync, rmSync, statSync } from 'node:fs';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = resolve(fileURLToPath(new URL('..', import.meta.url)));
const PAR_DEFAUT = '.dist-verifier';
const PROTEGES = ['.git', 'node_modules', '.claude'];

/** Refus d'usage : message, code 2, rien n'a été touché. */
function refuser(message) {
  console.error(`verifier : REFUS, ${message}`);
  process.exit(2);
}

/** Les options de la ligne de commande : { rapide, garder }. */
function lireOptions(args) {
  const options = { rapide: false, garder: null };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--rapide') options.rapide = true;
    else if (a === '--garder') {
      const dossier = args[++i];
      if (dossier === undefined || dossier.startsWith('--')) refuser('--garder attend un dossier.');
      if (options.garder !== null) refuser('--garder donné deux fois.');
      options.garder = dossier;
    } else refuser(`option inconnue « ${a} » (connues : --rapide, --garder <dossier>).`);
  }
  return options;
}

/** Le chemin relatif de `cible` sous `base`, ou null s'il en sort. */
function sous(base, cible) {
  const rel = relative(base, cible);
  return rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel) ? null : rel;
}

/** Le dossier de --garder, contrôlé avant qu'on le vide ; chemin absolu. */
function controlerGarder(nom) {
  const abs = resolve(RACINE, nom);
  const rel = sous(RACINE, abs);
  // Un lien ou une jonction peut mener ailleurs : on juge aussi le chemin réel.
  const reel = rel !== null && existsSync(abs) ? sous(realpathSync(RACINE), realpathSync(abs)) : rel;
  if (rel === null || reel === null) refuser(`« ${nom} » est hors du dépôt.`);
  if (rel === '' || reel === '') refuser(`« ${nom} » est la racine du dépôt.`);
  const segments = [...rel.split(sep), ...reel.split(sep)].map((s) => s.toLowerCase());
  if (segments.some((s) => PROTEGES.includes(s))) {
    refuser(`« ${nom} » passe par un dossier protégé (${PROTEGES.join(', ')}).`);
  }
  const pathspecs = [...new Set([rel, reel])].map((r) => `:(icase,literal)${r.split(sep).join('/')}`);
  // Suivis, ou nouveaux et pas encore ajoutés : seul ce que git ignore peut partir.
  const git = spawnSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', ...pathspecs], {
    cwd: RACINE,
    encoding: 'utf8',
  });
  if (git.error || git.status !== 0) refuser(`git ls-files impossible, « ${nom} » n'est pas contrôlé.`);
  if (git.stdout.length > 0) refuser(`« ${nom} » contient des fichiers suivis par git (ou à ajouter).`);
  if (existsSync(abs) && !statSync(abs).isDirectory()) refuser(`« ${nom} » est un fichier, pas un dossier.`);
  return abs;
}

/** Le script d'astro, lu dans node_modules/astro/package.json (champ bin). */
function binaireAstro() {
  const dossier = join(RACINE, 'node_modules', 'astro');
  const { bin } = JSON.parse(readFileSync(join(dossier, 'package.json'), 'utf8'));
  return join(dossier, typeof bin === 'string' ? bin : bin.astro);
}

/** Tous les tests/**\/*.test.mjs, triés, en chemins relatifs à barres droites. */
function listerTests(rapide) {
  return readdirSync(join(RACINE, 'tests'), { recursive: true })
    .map((f) => `tests/${String(f).split(sep).join('/')}`)
    .filter((f) => f.endsWith('.test.mjs'))
    .filter((f) => !(rapide && f.endsWith('-navigateur.test.mjs')))
    .sort();
}

const secondes = (debut) => `${Math.round((Date.now() - debut) / 1000)} s`;

const options = lireOptions(process.argv.slice(2));
const dossier = options.garder === null ? resolve(RACINE, PAR_DEFAUT) : controlerGarder(options.garder);
const nomDossier = relative(RACINE, dossier).split(sep).join('/');
process.chdir(RACINE);

const debut = Date.now();
const durees = [];
let rouge = null;
try {
  rmSync(dossier, { recursive: true, force: true });
  console.log(`verifier : build dans ${nomDossier}`);
  const debutBuild = Date.now();
  const build = spawnSync(process.execPath, [binaireAstro(), 'build', '--outDir', dossier], {
    cwd: RACINE,
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  durees.push(`build ${secondes(debutBuild)}`);
  if (build.error || build.status !== 0) {
    // Le journal du build ne s'affiche qu'en cas d'échec.
    process.stdout.write(build.stdout || '');
    process.stderr.write(build.stderr || '');
    if (build.error) console.error(build.error.message);
    rouge = 'le build echoue';
  } else {
    const tests = listerTests(options.rapide);
    const vitesse = options.rapide ? ', sans tests/*-navigateur.test.mjs' : '';
    console.log(`verifier : ${tests.length} fichiers de tests${vitesse}`);
    const debutTests = Date.now();
    const run = spawnSync(process.execPath, ['--test', ...tests], {
      cwd: RACINE,
      stdio: 'inherit',
      env: { ...process.env, DIST: dossier },
    });
    durees.push(`tests ${secondes(debutTests)}`);
    if (run.error || run.status !== 0) rouge = 'des tests echouent';
  }
} catch (erreur) {
  console.error(erreur);
  rouge = rouge ?? 'erreur du script';
} finally {
  if (options.garder === null) rmSync(dossier, { recursive: true, force: true });
}

durees.push(`total ${secondes(debut)}`);
const garde = options.garder !== null && existsSync(dossier) ? `, site gardé dans ${nomDossier}` : '';
console.log(`verifier : ${rouge === null ? 'VERT' : `ROUGE (${rouge})`} -- ${durees.join(', ')}${garde}`);
process.exit(rouge === null ? 0 : 1);
