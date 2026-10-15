// Test 13 — Le relief de l'accueil (registre/0089) : la bande du récit, le
// pied de page sombre, le sol des dessins, la surface au survol, les numéros
// en ardoise. Lu dans le CSS de dist/ tel que chaque page le charge ; les
// couleurs sont résolues par les jetons de :root, pour juger le rendu et non
// l'écriture d'un sélecteur. L'ordre des cartes et la place de la Matrice :
// projets.test.mjs ; les contrastes et les jetons : contrastes.test.mjs.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exigerDist, pagesHtml, feuillesCss, lire, contenus, elements, liste } from './outils.mjs';
import {
  regles, reglesDe, valeur, cssDePage, racine, resoudre, enPx, cotes, decouper, deplier, fermer,
  specificite, compSpec,
} from './css.mjs';

const ACCUEILS = ['index.html', 'en/index.html'];
const SANS_PREFERENCE = /prefers-reduced-motion\s*:\s*no-preference/;
const LONGUEUR = /^-?\d*\.?\d+(?:px|rem|em)?$/;
const STYLES_DE_TRAIT = /^(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|auto)$/;

/** Tout le CSS du site : chaque feuille, et les <style> de chaque page. */
const toutLeCss = () => [
  ...feuillesCss().map((f) => [f, regles(lire(f))]),
  ...pagesHtml().map((f) => [`${f} (<style>)`, regles(contenus(lire(f), 'style').join('\n'))]),
];

/** Le dernier compose d'un sélecteur normalisé (celui qui désigne l'élément). */
const sujet = (sel) => decouper(sel.replace(/[>+~]/g, ' '), ' ').pop() ?? '';
const viseUneCarte = (sel) => /\.parcelle(?:--[\w-]+)?(?=[.:[#]|$)/.test(sujet(sel));

/** Les déclarations des règles visant ces sélecteurs, dans l'ordre de la cascade. */
function cascade(css, sels) {
  const rangees = [];
  for (const r of css)
    for (const [s, brut] of r.paires) if (sels.includes(s)) rangees.push({ r, spec: specificite(brut) });
  rangees.sort((x, y) => compSpec(x.spec, y.spec) || x.r.rang - y.r.rang);
  const fin = {};
  for (const { r } of rangees) for (const [p, v] of r.decl) fin[p] = v;
  return fin;
}

/** Couleur d'un fond : background-color, ou la couleur d'un raccourci background. */
const fond = (d) => d['background-color'] ?? d.background;

/** Un trait (outline, border-top) : { largeur, style, couleur } depuis raccourci et longues. */
function trait(d, prefixe) {
  const t = { largeur: undefined, style: undefined, couleur: undefined };
  for (const mot of decouper(d[prefixe] ?? '', ' ')) {
    if (LONGUEUR.test(mot)) t.largeur = mot;
    else if (STYLES_DE_TRAIT.test(mot)) t.style = mot;
    else t.couleur = mot;
  }
  t.largeur = d[`${prefixe}-width`] ?? t.largeur;
  t.style = d[`${prefixe}-style`] ?? t.style;
  t.couleur = d[`${prefixe}-color`] ?? t.couleur;
  return t;
}

/** Les ombres d'une valeur box-shadow : [{ longueurs: [px…] }]. */
const ombres = (v) =>
  decouper(v, ',').map((o) => ({ longueurs: decouper(o, ' ').filter((m) => LONGUEUR.test(m)).map(enPx) }));

/** Le premier linear-gradient d'une valeur : { direction, arrets: [{ couleur, positions }] }. */
function degrade(v = '') {
  const i = v.indexOf('linear-gradient(');
  if (i < 0) return null;
  const args = decouper(v.slice(i + 16, fermer(v, i + 15) - 1), ',');
  const direction = /^(?:to\s|-?[\d.]+(?:deg|turn|rad|grad)$)/.test(args[0]) ? args.shift() : 'to bottom';
  return { direction, arrets: args.map((a) => ({ couleur: decouper(a, ' ')[0], positions: decouper(a, ' ').slice(1) })) };
}

/** Fautes d'un sol : transparent au-dessus, la couleur dessous, coupé net à 87,5 %. */
function fautesDeSol(v, ou) {
  const g = degrade(v);
  if (!g) return [`${ou} : pas de linear-gradient (« ${v ?? 'aucun fond'} »)`];
  const fautes = [];
  if (!['to bottom', '180deg', '0.5turn'].includes(g.direction)) fautes.push(`${ou} : dégradé « ${g.direction} », attendu de haut en bas`);
  const [haut, bas] = g.arrets;
  if (g.arrets.length !== 2) fautes.push(`${ou} : ${g.arrets.length} arrêts de couleur, attendu deux`);
  else {
    const fin = parseFloat(haut.positions.at(-1));
    const debut = parseFloat(bas.positions[0]);
    if (haut.couleur !== 'transparent') fautes.push(`${ou} : le haut vaut « ${haut.couleur} », attendu transparent`);
    if (fin !== 87.5 || !haut.positions.at(-1)?.endsWith('%')) fautes.push(`${ou} : le haut s'arrête à « ${haut.positions.at(-1) ?? 'rien'} », attendu 87.5%`);
    if (!(debut <= fin)) fautes.push(`${ou} : le sol commence à « ${bas.positions[0] ?? 'rien'} », attendu au plus ${fin}% (coupe nette)`);
  }
  return fautes;
}

for (const page of ACCUEILS) {
  test(`relief : ${page}, la bande du récit est une image de bordure de sable, aucune règle ne vise un enfant du trio qui n'existe pas`, () => {
    exigerDist();
    const els = elements(lire(page));
    const trio = els.find((e) => e.classes.includes('parcelles--trio'));
    assert.ok(trio, `${page} : aucun élément de classe « parcelles--trio ».`);
    const n = els.filter((e) => e.parent === trio).length;
    const css = cssDePage(page);
    const j = racine(css);
    const fautes = [];

    for (const r of css)
      for (const s of r.selecteurs) {
        const m = /\.parcelles--trio>[^\s>+~]*:nth-(?:last-)?child\((\d+)\)/.exec(s);
        if (m && Number(m[1]) > n) fautes.push(`« ${s} » vise l'enfant ${m[1]} du trio, qui n'en a que ${n}`);
      }

    const d = cascade(css, ['.parcelles--trio']);
    const [source = '', , outset = ''] = decouper(d['border-image'] ?? '', '/');
    const image = d['border-image-source'] ?? source;
    const remplie = /\bfill\b/.test(d['border-image-slice'] ?? source);
    const debords = decouper(d['border-image-outset'] ?? outset, ' ').filter((m) => LONGUEUR.test(m) || /vw$/.test(m));
    const horizontal = debords[1] ?? debords[0] ?? '';
    if (!resoudre(image, j).includes(j['--sable'])) fautes.push(`l'image de bordure du trio (« ${image} ») n'est pas peinte en --sable`);
    if (!remplie) fautes.push("l'image de bordure du trio n'a pas « fill » : elle ne peint pas sous le trio");
    if (!(/vw$/.test(horizontal) && parseFloat(horizontal) >= 100))
      fautes.push(`le débord horizontal de la bande vaut « ${horizontal} » : attendu 100vw au moins, de bord à bord de l'écran`);

    assert.equal(fautes.length, 0, `Bande du récit, ${page} :\n${liste(fautes)}`);
  });
}

test('relief : aucun pseudo-élément de 100vw, aucun overflow-x posé sur html ni body', () => {
  exigerDist();
  const fautes = [];
  for (const [ou, css] of toutLeCss())
    for (const r of css) {
      if (r.bruts.some((s) => /::?(?:before|after)\b/i.test(s)) && r.decl.some(([, v]) => /\b100vw\b/.test(v)))
        fautes.push(`${ou} : « ${r.bruts.join(', ')} » est un pseudo-élément de 100vw (barre de défilement horizontale)`);
      for (const s of r.selecteurs) {
        const m = /^(?:html|body|:root)(.*)$/.exec(sujet(s));
        if (!m) continue;
        for (const [p, v] of r.decl)
          if (p === 'overflow-x' || p === 'overflow-inline' || (p === 'overflow' && m[1] === '' && /hidden|clip/.test(v)))
            fautes.push(`${ou} : « ${s} » pose ${p}: ${v}, ce qui masque un débordement au lieu de l'éviter`);
      }
    }
  assert.equal(fautes.length, 0, `Débordements :\n${liste(fautes)}`);
});

// --- Le pied de page sombre, sur toutes les pages ---------------------------

const ETATS_DYNAMIQUES = /^(?:hover|focus|focus-visible|focus-within|active|visited|target)$/;
const PARTIE = /\.([\w-]+)|#([\w-]+)|\[\s*([\w:-]+)\s*(?:([~|^$*]?=)\s*(?:"([^"]*)"|'([^']*)'|([^\]\s]*)))?\s*\w?\s*\]|:([\w-]+)(\((?:[^()]|\([^()]*\))*\))?/y;

/** Un compose peut-il viser cet élément, dans cet état (« repos », « focus », « tout ») ? */
function compose(c, el, etat) {
  const t = /^(\*|[a-zA-Z][\w-]*)/.exec(c);
  if (t && t[1] !== '*' && t[1].toLowerCase() !== el.nom) return false;
  PARTIE.lastIndex = t ? t[0].length : 0;
  let m;
  while (PARTIE.lastIndex < c.length && (m = PARTIE.exec(c))) {
    if (m[1] && !el.classes.includes(m[1])) return false;
    if (m[2] && el.attrs.id !== m[2]) return false;
    if (m[3]) {
      const v = el.attrs[m[3].toLowerCase()];
      if (v === undefined || (m[4] === '=' && v !== (m[5] ?? m[6] ?? m[7]))) return false;
    }
    if (m[8]) {
      const nom = m[8].toLowerCase();
      if (nom === 'root' && el.nom !== 'html') return false;
      if (ETATS_DYNAMIQUES.test(nom) && etat !== 'tout' && !(etat === 'focus' && nom.startsWith('focus'))) return false;
    }
  }
  return true; // :not(), :nth-child()… ignorés : on surestime ce qui peut viser.
}

/** Un sélecteur brut peut-il viser cet élément ? (frères traités comme ancêtres : on surestime.) */
const peutViser = (brut, el, etat) =>
  !/::|:(?:before|after|first-line|first-letter)\b/i.test(brut) &&
  deplier(brut).some((sel) => {
    const composes = decouper(sel.replace(/\s*[>+~]\s*/g, ' '), ' ');
    if (!compose(composes.pop(), el, etat)) return false;
    let k = 0;
    for (let i = composes.length - 1; i >= 0; i--) {
      while (k < el.ancetres.length && !compose(composes[i], el.ancetres[k], 'tout')) k++;
      if (k++ >= el.ancetres.length) return false;
    }
    return true;
  });

/** La déclaration qui l'emporte sur l'élément pour ces propriétés : { valeur, brut } ou null. */
function gagnant(css, el, props, etat) {
  let meilleur = null;
  for (const r of css) {
    if (r.medias.some((m) => /\bprint\b/.test(m))) continue;
    const d = r.decl.filter(([p]) => props.includes(p)).pop();
    if (!d) continue;
    for (const brut of r.bruts) {
      if (!peutViser(brut, el, etat)) continue;
      const spec = specificite(brut);
      if (!meilleur || compSpec(spec, meilleur.spec) >= 0) meilleur = { spec, prop: d[0], valeur: d[1], brut };
    }
  }
  return meilleur;
}

const nomDe = (el) => `<${el.nom}${el.classes.length ? `.${el.classes.join('.')}` : ''}> « ${el.texte().slice(0, 20)} »`;

for (const page of pagesHtml()) {
  test(`pied : ${page} a un pied sombre (encre, filet ambre de 4 px, marge au-dessus), liens ivoire soulignés, focus ivoire`, () => {
    exigerDist();
    const els = elements(lire(page));
    const pieds = els.filter((e) => e.nom === 'footer' && e.classes.includes('pied'));
    assert.equal(pieds.length, 1, `${page} : ${pieds.length} <footer class="pied"> : attendu exactement un.`);
    const css = cssDePage(page);
    const j = racine(css);
    const ivoire = j['--ivoire'];
    const fautes = [];

    const d = cascade(css, ['.pied', 'footer.pied']);
    const b = trait(d, 'border-top');
    const marge = d['margin-top'] ?? d['margin-block-start'] ?? decouper(d['margin-block'] ?? '', ' ')[0] ?? (d.margin && cotes(d.margin)[0]);
    if (resoudre(fond(d), j) !== j['--encre']) fautes.push(`le fond du pied vaut « ${fond(d) ?? 'rien'} », attendu --encre`);
    if (resoudre(d.color, j) !== ivoire) fautes.push(`le texte du pied vaut « ${d.color ?? 'rien'} », attendu --ivoire`);
    if (enPx(b.largeur ?? '') !== 4 || b.style !== 'solid' || resoudre(b.couleur, j) !== j['--ambre'])
      fautes.push(`le filet du haut vaut « ${b.largeur} ${b.style} ${b.couleur} », attendu 4px solid --ambre`);
    if (!(enPx(resoudre(marge, j)) > 0)) fautes.push(`la marge au-dessus du pied vaut « ${marge ?? 'rien'} », attendu non nulle`);

    const dedans = els.filter((e) => e.ancetres.includes(pieds[0]) && e.nom !== 'svg' && !e.ancetres.some((a) => a.nom === 'svg'));
    for (const el of dedans) {
      const c = gagnant(css, el, ['color'], 'repos');
      if (c && !/^(?:inherit|currentcolor)$/i.test(c.valeur) && resoudre(c.valeur, j) !== ivoire)
        fautes.push(`${nomDe(el)} : couleur « ${c.valeur} » (« ${c.brut} »), attendu ivoire ou inherit`);
    }
    for (const a of dedans.filter((e) => e.nom === 'a')) {
      const s = gagnant(css, a, ['text-decoration', 'text-decoration-line'], 'repos');
      if (s && !/\bunderline\b/.test(s.valeur)) fautes.push(`${nomDe(a)} : non souligné (« ${s.brut} » : ${s.prop}: ${s.valeur})`);
      const f = gagnant(css, a, ['outline', 'outline-color'], 'focus');
      const couleur = f && (f.prop === 'outline' ? trait({ outline: f.valeur }, 'outline').couleur : f.valeur);
      if (!f || !(couleur === undefined || /^currentcolor$/i.test(couleur) || resoudre(couleur, j) === ivoire))
        fautes.push(`${nomDe(a)} : contour de focus « ${couleur ?? 'aucun'} »${f ? ` (« ${f.brut} »)` : ''}, attendu ivoire`);
    }

    assert.equal(fautes.length, 0, `Pied de page, ${page} :\n${liste(fautes)}`);
  });
}

// --- Les cartes de l'accueil : surface, focus, numéros, sol -----------------

const TRIO = (s = '') => [`.parcelles--trio>.parcelle${s}`, `.parcelles--trio .parcelle${s}`];

/** Les quatre états d'une carte : où elle est, si on la survole, et ce qui la cascade. */
const ETATS = (s) => [
  { nom: `hors de la bande, au repos`, sels: ['.parcelle'], bande: false },
  { nom: `hors de la bande, ${s}`, sels: ['.parcelle', `.parcelle:${s}`], bande: false },
  { nom: `dans la bande, au repos`, sels: ['.parcelle', ...TRIO()], bande: true },
  { nom: `dans la bande, ${s}`, sels: ['.parcelle', `.parcelle:${s}`, ...TRIO(), ...TRIO(`:${s}`)], bande: true },
];

for (const page of ACCUEILS) {
  test(`cartes : ${page}, au survol et au focus une surface sans ombre, qui ne bouge pas la mise en page, animée seulement sans réduction de mouvement`, () => {
    exigerDist();
    const css = cssDePage(page);
    const j = racine(css);
    const fautes = [];

    for (const s of ['hover', 'focus-visible']) {
      const hors = cascade(css, ['.parcelle', `.parcelle:${s}`]);
      const dans = cascade(css, ['.parcelle', `.parcelle:${s}`, ...TRIO(), ...TRIO(`:${s}`)]);
      if (resoudre(fond(hors), j) !== j['--sable']) fautes.push(`:${s} hors de la bande : fond « ${fond(hors) ?? 'aucun'} », attendu --sable`);
      if (resoudre(fond(dans), j) !== j['--ivoire']) fautes.push(`:${s} dans la bande : fond « ${fond(dans) ?? 'aucun'} », attendu --ivoire`);
      const filet = ombres(hors['box-shadow'] ?? '');
      if (!filet.some(({ longueurs: [x, y, flou, etendue] }) => x === 0 && y === 0 && (flou ?? 0) === 0 && etendue === 1))
        fautes.push(`:${s} : box-shadow « ${hors['box-shadow'] ?? 'aucun'} », attendu un filet 0 0 0 1px`);
    }

    for (const r of css) {
      if (!r.selecteurs.some(viseUneCarte)) continue;
      const ombre = valeur(r, 'box-shadow');
      if (ombre && ombres(ombre).some(({ longueurs: [x = 0, y = 0, flou = 0] }) => x !== 0 || y !== 0 || flou !== 0))
        fautes.push(`« ${r.bruts.join(', ')} » pose une ombre portée : « ${ombre} »`);
      if (r.decl.some(([p]) => p.startsWith('transition')) && !r.medias.some((m) => SANS_PREFERENCE.test(m)))
        fautes.push(`« ${r.bruts.join(', ')} » pose une transition hors de @media (prefers-reduced-motion: no-preference)`);
    }

    const base = css.filter((r) => r.medias.length === 0 && r.selecteurs.includes('.parcelle'));
    const locales = Object.fromEntries(base.flatMap((r) => r.decl.filter(([p]) => p.startsWith('--'))));
    const cote = (prop) => {
      const v = [0, 0, 0, 0].map(() => undefined);
      for (const r of base)
        for (const [p, val] of r.decl) {
          if (p === prop) cotes(val).forEach((x, i) => (v[i] = x));
          ['top', 'right', 'bottom', 'left'].forEach((c, i) => p === `${prop}-${c}` && (v[i] = val));
        }
      return v.map((x) => enPx(resoudre(x ?? '0', locales, j)));
    };
    const [marge, interieure] = [cote('margin'), cote('padding')];
    ['haut', 'droite', 'bas', 'gauche'].forEach((c, i) => {
      if (!(interieure[i] > 0) || marge[i] !== -interieure[i])
        fautes.push(`.parcelle, côté ${c} : marge ${marge[i]}px pour une marge intérieure de ${interieure[i]}px, attendu l'opposé`);
    });

    assert.equal(fautes.length, 0, `Surface des cartes, ${page} :\n${liste(fautes)}`);
  });

  test(`cartes : ${page}, le focus garde un contour de 3 px en encre, le numéro est en ardoise, sans contour de lettre`, () => {
    exigerDist();
    const css = cssDePage(page);
    const j = racine(css);
    const fautes = [];

    for (const etat of ETATS('focus-visible').filter((e) => !e.nom.endsWith('repos'))) {
      const o = trait(cascade(css, etat.sels), 'outline');
      if (enPx(o.largeur ?? '') !== 3 || resoudre(o.couleur, j) !== j['--encre'] || ['none', 'hidden', undefined].includes(o.style))
        fautes.push(`focus ${etat.nom} : contour « ${o.largeur} ${o.style} ${o.couleur} », attendu 3px en --encre`);
    }

    const numeros = css.filter((r) => r.selecteurs.some((s) => sujet(s).includes('.parcelle__numero')) && valeur(r, 'color'));
    if (numeros.length === 0) fautes.push('aucune règle ne donne sa couleur à .parcelle__numero');
    for (const r of numeros)
      if (resoudre(valeur(r, 'color'), j) !== j['--ardoise'])
        fautes.push(`« ${r.bruts.join(', ')} » colore le numéro en « ${valeur(r, 'color')} », attendu --ardoise`);
    for (const r of css)
      if (r.selecteurs.some((s) => s.includes('parcelle')) && r.decl.some(([p]) => /text-stroke/.test(p)))
        fautes.push(`« ${r.bruts.join(', ')} » pose un contour de lettre (text-stroke), option écartée`);

    assert.equal(fautes.length, 0, `Focus et numéros, ${page} :\n${liste(fautes)}`);
  });

  test(`sol : ${page}, la bande sous la ligne de sol est coupée net à 87,5 %, --sol sur l'ivoire, --sol-sur-sable sur le sable`, () => {
    exigerDist();
    const css = cssDePage(page);
    const j = racine(css);
    const fautes = [];
    const solDe = (surface) => (surface === j['--sable'] ? j['--sol-sur-sable'] : j['--sol']);
    const page_ = resoudre(fond(cascade(css, ['body'])), j);

    const scene = cascade(css, ['.parcelle__scene svg', '.parcelle__scene>svg']);
    const vScene = scene['background-image'] ?? scene.background;
    fautes.push(...fautesDeSol(vScene, '.parcelle__scene svg'));
    const couleur = degrade(vScene)?.arrets[1]?.couleur;
    if (couleur)
      for (const etat of [...ETATS('hover'), ...ETATS('focus-visible').filter((e) => !e.nom.endsWith('repos'))]) {
        const d = cascade(css, etat.sels);
        const surface = resoudre(fond(d), j) || (etat.bande ? j['--sable'] : page_);
        const sol = resoudre(couleur, d, j);
        if (sol !== solDe(surface))
          fautes.push(`carte ${etat.nom} : sol ${sol} sur une surface ${surface}, attendu ${solDe(surface)}`);
      }

    const equipe = cascade(css, ['.accroche__equipe']);
    const vEquipe = equipe['background-image'] ?? equipe.background;
    fautes.push(...fautesDeSol(vEquipe, '.accroche__equipe'));
    const solEquipe = resoudre(degrade(vEquipe)?.arrets[1]?.couleur, equipe, j);
    if (solEquipe !== solDe(page_)) fautes.push(`.accroche__equipe : sol ${solEquipe} sur ${page_}, attendu ${solDe(page_)}`);

    assert.equal(fautes.length, 0, `Sol des dessins, ${page} :\n${liste(fautes)}`);
  });
}
