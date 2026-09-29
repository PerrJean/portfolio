// Un plugin rehype local, sans dépendance (registre/0041) : il remplace, dans
// les pages Markdown, un marqueur <div data-schema="nom"></div> par le HTML
// du schéma, dans la langue du fichier (le champ langue de l'en-tête).
// Déclaré dans astro.config.mjs, sous markdown.rehypePlugins.
//
// Astro passe les plugins rehype avant rehype-raw : le HTML brut du Markdown
// est encore un nœud « raw », et le schéma en devient un autre, qu'Astro
// analyse ensuite. Un nom de schéma inconnu ou une langue absente cassent le
// build plutôt que de laisser un marqueur vide.
import { schemaChaineAudit } from './chaine-audit.mjs';

const SCHEMAS = { 'chaine-audit': schemaChaineAudit };

const MARQUEUR = /^\s*<div\s+data-schema="([\w-]+)"\s*>\s*<\/div>\s*$/;

/** La langue du fichier : l'en-tête d'abord, sinon le dossier fr/ ou en/. */
function langueDu(file) {
  const entete = file.data?.astro?.frontmatter?.langue;
  if (typeof entete === 'string') return entete;
  const chemin = String(file.path ?? '').split('\\').join('/');
  return chemin.match(/\/(fr|en)\/[^/]+\.md$/)?.[1];
}

export function rehypeSchemas() {
  return (tree, file) => {
    const remplacer = (noeud) => {
      if (!Array.isArray(noeud.children)) return;
      noeud.children = noeud.children.map((enfant) => {
        const m = enfant.type === 'raw' ? enfant.value.match(MARQUEUR) : null;
        if (!m) {
          remplacer(enfant);
          return enfant;
        }
        const schema = SCHEMAS[m[1]];
        if (!schema) throw new Error(`Schéma « ${m[1]} » inconnu (${file.path}). Connus : ${Object.keys(SCHEMAS).join(', ')}.`);
        const langue = langueDu(file);
        if (!langue) throw new Error(`Schéma « ${m[1]} » : langue du fichier introuvable (${file.path}).`);
        return { type: 'raw', value: schema(langue) };
      });
    };
    remplacer(tree);
  };
}
