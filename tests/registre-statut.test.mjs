// Chaque fiche du registre écrit son statut (registre/0000 : « toujours
// écrit, jamais déduit » ; registre/0110). Ne demande pas le site construit.
//
// Fiches lues : registre/NNNN-*.md, sauf 0000 (la convention elle-même).
// Le statut se lit dans le premier tableau de la fiche, colonne « statut »,
// accents graves retirés. Valeurs permises : ouvert, en cours, gelé,
// clos AAAA-MM-JJ, écarté AAAA-MM-JJ, remplacé par NNNN (dont la fiche NNNN
// doit exister).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RACINE } from './outils.mjs';

const REGISTRE = join(RACINE, 'registre');
const STATUT = /^(ouvert|en cours|gelé|(clos|écarté) \d{4}-\d{2}-\d{2}|remplacé par (\d{4}))$/;

const cellules = (ligne) => ligne.split('|').slice(1, -1).map((c) => c.trim());

/** Le statut écrit dans le premier tableau, ou une raison de refus. */
function statutDe(texte) {
  const lignes = texte.split(/\r?\n/);
  const debut = lignes.findIndex((l) => l.startsWith('|'));
  if (debut < 0 || !lignes[debut + 2]?.startsWith('|')) return { refus: 'pas de tableau en tête' };
  const colonnes = cellules(lignes[debut]);
  const i = colonnes.indexOf('statut');
  if (i < 0) return { refus: 'pas de colonne statut' };
  const valeur = (cellules(lignes[debut + 2])[i] ?? '').replace(/`/g, '').trim();
  return { valeur };
}

const fiches = readdirSync(REGISTRE)
  .filter((f) => /^\d{4}-.+\.md$/.test(f) && !f.startsWith('0000'))
  .sort();
const numeros = new Set(fiches.map((f) => f.slice(0, 4)));

test('le registre a des fiches', () => {
  assert.ok(fiches.length > 100, `${fiches.length} fiches seulement`);
});

test('chaque fiche du registre écrit un statut permis', () => {
  const fautes = [];
  for (const f of fiches) {
    const { refus, valeur } = statutDe(readFileSync(join(REGISTRE, f), 'utf8'));
    if (refus) { fautes.push(`${f} : ${refus}`); continue; }
    const m = STATUT.exec(valeur);
    if (!m) fautes.push(`${f} : statut « ${valeur} » hors des valeurs de registre/0000`);
    else if (m[3] && !numeros.has(m[3])) fautes.push(`${f} : remplacé par ${m[3]}, fiche absente`);
  }
  assert.deepEqual(fautes, [], `\n${fautes.join('\n')}`);
});
