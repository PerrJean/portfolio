// Un plugin local, sans dépendance (registre/0041) : il remplace, dans les
// pages Markdown, un marqueur <div data-schema="nom"></div> par le HTML du
// schéma, dans la langue du fichier (le champ langue de l'en-tête).
// Déclaré dans astro.config.mjs, dans les hastPlugins de satteri().
//
// Depuis Astro 7, le Markdown passe par Sätteri, et non plus par
// remark/rehype (registre/0027) : ce plugin agit sur l'arbre HTML (hast) de
// Sätteri. Le HTML brut du Markdown y est un nœud « raw », et le schéma en
// devient un autre. Un nom de schéma inconnu ou une langue absente cassent le
// build plutôt que de laisser un marqueur vide.
import { fileURLToPath } from 'node:url';
import { schemaChaineAudit } from './chaine-audit.mjs';
import { schemaEchangeOral } from './echange-oral.mjs';

const SCHEMAS = { 'chaine-audit': schemaChaineAudit, 'echange-oral': schemaEchangeOral };

const MARQUEUR = /^\s*<div\s+data-schema="([\w-]+)"\s*>\s*<\/div>\s*$/;

/** La langue du fichier : l'en-tête d'abord, sinon le dossier fr/ ou en/. */
function langueDu(ctx, chemin) {
  const entete = ctx.data?.astro?.frontmatter?.langue;
  if (typeof entete === 'string') return entete;
  return chemin.split('\\').join('/').match(/\/(fr|en)\/[^/]+\.md$/)?.[1];
}

export const rehypeSchemas = {
  name: 'schemas',
  raw(noeud, ctx) {
    const m = noeud.value.match(MARQUEUR);
    if (!m) return;
    const chemin = ctx.fileURL ? fileURLToPath(ctx.fileURL) : '';
    const schema = SCHEMAS[m[1]];
    if (!schema) throw new Error(`Schéma « ${m[1]} » inconnu (${chemin}). Connus : ${Object.keys(SCHEMAS).join(', ')}.`);
    const langue = langueDu(ctx, chemin);
    if (!langue) throw new Error(`Schéma « ${m[1]} » : langue du fichier introuvable (${chemin}).`);
    return { type: 'raw', value: schema(langue) };
  },
};
