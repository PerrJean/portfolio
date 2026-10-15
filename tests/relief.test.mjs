// Test 13 — Le relief de l'accueil (registre/0089) : la bande du récit, le
// pied de page sombre, le sol des dessins, la surface au survol, les numéros
// en ardoise. L'ordre des cartes et la place de la Matrice : projets.test.mjs ;
// les contrastes et les jetons : contrastes.test.mjs.
//
// Comment on juge : chaque règle du CSS que la page charge est confrontée aux
// éléments réels de la page (tests/css.mjs, calcule), à deux largeurs d'écran
// (375 px, téléphone sans survol ; 1440 px, ordinateur), dans un état donné
// (repos, survol, focus). Une règle qui passerait sous @media (min-width: …)
// manquerait donc au téléphone, et @media print n'est jamais retenu.
//
// Le couplage qui reste, dit ici plutôt que caché :
// - au balisage, pour trouver les éléments : la carte est un lien de classe
//   « parcelle », le trio « parcelles--trio », le bloc à part
//   « parcelles--a-part », la scène « parcelle__scene », le numéro
//   « parcelle__numero », l'équipe de l'accroche « accroche__equipe », le pied
//   un <footer class="pied"> ; un lien de langue est un lien qui porte
//   l'attribut lang, la langue courante porte aria-current ;
// - aux noms des jetons (--sable, --sol, --sol-sur-sable, --encre…), lus dans
//   :root : renommer un jeton demande de renommer ici ;
// - deux gardes lisent des sélecteurs et non le DOM : la règle morte sur un
//   enfant du trio, et le pseudo-élément de 100vw.
// Le reste ne dépend pas de l'écriture d'un sélecteur.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exigerDist, pagesHtml, feuillesCss, lire, contenus, elements, liste } from './outils.mjs';
import { regles, cssDePage, racine, resoudreSur, calcule, herite, enPx, decouper, fermer } from './css.mjs';

const ACCUEILS = ['index.html', 'en/index.html'];
const ECRANS = [
  { nom: '375 px', largeur: 375, survol: false },
  { nom: '1440 px', largeur: 1440, survol: true },
];
const LONGUEUR = /^-?\d*\.?\d+(?:px|rem|em)?$/;
const CID = (el) => Object.keys(el?.attrs ?? {}).find((a) => a.startsWith('data-astro-cid-')) ?? '';

/** La page lue : ses éléments, son CSS, ses jetons. */
function charger(rel) {
  const css = cssDePage(rel);
  return { els: elements(lire(rel)), css, j: racine(css) };
}

/** La couleur du texte, héritage compris, résolue en hex. */
function couleur(css, el, etat, ecran) {
  const h = herite(css, el, 'color', etat, ecran);
  return h ? resoudreSur(css, h.valeur, h.el, etat, ecran) : 'canvastext';
}

/** Une couleur de fond résolue ('transparent' si rien ne la pose). */
const fondDe = (css, el, etat, ecran) =>
  resoudreSur(css, calcule(css, el, 'background-color', etat, ecran)?.valeur ?? 'transparent', el, etat, ecran);

/** Une propriété en px (0 si rien ne la pose). */
const px = (css, el, prop, etat, ecran) =>
  enPx(resoudreSur(css, calcule(css, el, prop, etat, ecran)?.valeur ?? '0', el, etat, ecran));

/** Le premier linear-gradient d'une valeur : { direction, arrets: [{ couleur, positions }] }. */
function degrade(v = '') {
  const i = v.indexOf('linear-gradient(');
  if (i < 0) return null;
  const args = decouper(v.slice(i + 16, fermer(v, i + 15) - 1), ',');
  const direction = /^(?:to\s|-?[\d.]+(?:deg|turn|rad|grad)$)/.test(args[0]) ? args.shift() : 'to bottom';
  return { direction, arrets: args.map((a) => ({ couleur: decouper(a, ' ')[0], positions: decouper(a, ' ').slice(1) })) };
}

/** La surface visible sous l'élément : le premier fond opaque en remontant, image de bordure remplie comprise. */
function surfaceSous(css, el, etat, ecran) {
  for (const n of [el, ...el.ancetres]) {
    const fond = fondDe(css, n, etat, ecran);
    if (fond !== 'transparent') return fond;
    const source = calcule(css, n, 'border-image-source', etat, ecran)?.valeur;
    const tranche = calcule(css, n, 'border-image-slice', etat, ecran)?.valeur ?? '';
    const g = source && /\bfill\b/.test(tranche) && degrade(resoudreSur(css, source, n, etat, ecran));
    if (g) return g.arrets[0].couleur;
  }
  return undefined;
}

/** Les ombres d'une valeur box-shadow, en px : [[x, y, flou, étendue]]. */
const ombres = (v) =>
  !v || v === 'none' ? [] : decouper(v, ',').map((o) => decouper(o, ' ').filter((m) => LONGUEUR.test(m)).map(enPx));

/** Fautes d'un sol : transparent au-dessus, une couleur dessous, coupé net à 87,5 %. */
function fautesDeSol(v, ou) {
  const g = degrade(v);
  if (!g) return [`${ou} : pas de linear-gradient (« ${v ?? 'aucun fond'} »)`];
  const fautes = [];
  if (!['to bottom', '180deg', '0.5turn'].includes(g.direction)) fautes.push(`${ou} : dégradé « ${g.direction} », attendu de haut en bas`);
  if (g.arrets.length !== 2) return [...fautes, `${ou} : ${g.arrets.length} arrêts de couleur, attendu deux`];
  const [haut, bas] = g.arrets;
  const fin = parseFloat(haut.positions.at(-1));
  if (haut.couleur !== 'transparent') fautes.push(`${ou} : le haut vaut « ${haut.couleur} », attendu transparent`);
  if (fin !== 87.5 || !haut.positions.at(-1)?.endsWith('%'))
    fautes.push(`${ou} : le haut s'arrête à « ${haut.positions.at(-1) ?? 'rien'} », attendu 87.5%`);
  if (!(parseFloat(bas.positions[0]) <= fin))
    fautes.push(`${ou} : le sol commence à « ${bas.positions[0] ?? 'rien'} », attendu au plus ${fin}% (coupe nette)`);
  return fautes;
}

const cartesDe = (els) => els.filter((e) => e.nom === 'a' && e.classes.includes('parcelle'));
const nomDe = (el) => `<${el.nom}${el.classes.length ? `.${el.classes.join('.')}` : ''}> « ${el.texte().slice(0, 24)} »`;
const etatsDe = (el) => [
  { nom: 'au repos', etat: {} },
  { nom: 'au survol', etat: { survol: el } },
  { nom: 'au focus', etat: { focus: el } },
];

// --- La bande du récit -------------------------------------------------------

for (const page of ACCUEILS) {
  test(`bande : ${page}, à 375 et 1440 px le trio est peint en sable de bord à bord par une image de bordure ; aucune règle ne vise un enfant du trio qui n'existe pas`, () => {
    exigerDist();
    const { els, css, j } = charger(page);
    const trio = els.find((e) => e.classes.includes('parcelles--trio'));
    assert.ok(trio, `${page} : aucun élément de classe « parcelles--trio ».`);
    const fautes = [];

    for (const ecran of ECRANS) {
      const source = calcule(css, trio, 'border-image-source', {}, ecran)?.valeur ?? 'none';
      const tranche = calcule(css, trio, 'border-image-slice', {}, ecran)?.valeur ?? '';
      const debords = decouper(calcule(css, trio, 'border-image-outset', {}, ecran)?.valeur ?? '0', ' ');
      const horizontal = debords[1] ?? debords[0];
      if (!resoudreSur(css, source, trio, {}, ecran).includes(j['--sable']))
        fautes.push(`${ecran.nom} : l'image de bordure du trio (« ${source} ») n'est pas peinte en --sable`);
      if (!/\bfill\b/.test(tranche)) fautes.push(`${ecran.nom} : l'image de bordure du trio n'a pas « fill » : elle ne peint pas sous le trio`);
      if (!(/vw$/.test(horizontal) && parseFloat(horizontal) >= 100))
        fautes.push(`${ecran.nom} : le débord horizontal de la bande vaut « ${horizontal} », attendu 100vw au moins`);
    }

    // Garde de sélecteur : une règle sur un enfant que le trio n'a pas est
    // morte, comme l'était celle du 6ᵉ enfant (la Matrice) avant 0089.
    const n = els.filter((e) => e.parent === trio).length;
    for (const r of css)
      for (const s of r.selecteurs) {
        const m = /\.parcelles--trio>[^\s>+~]*:nth-(?:last-)?child\((\d+)\)/.exec(s);
        if (m && Number(m[1]) > n) fautes.push(`« ${s} » vise l'enfant ${m[1]} du trio, qui n'en a que ${n}`);
      }

    assert.equal(fautes.length, 0, `Bande du récit, ${page} :\n${liste(fautes)}`);
  });
}

// Garde-fou, pas preuve : la maquette peignait la bande par un pseudo-élément
// de 100vw, qui crée une barre de défilement horizontale (la barre verticale
// comprise). Ce test empêche d'y revenir ; il ne prouve pas l'absence de tout
// débordement : la revue l'a mesurée dans un navigateur, à 375, 760, 960 et 1440 px.
test('garde-fou : aucun pseudo-élément de 100vw, la solution de la maquette écartée pour la bande', () => {
  exigerDist();
  const fautes = [];
  const unites = [
    ...feuillesCss().map((f) => [f, regles(lire(f))]),
    ...pagesHtml().map((f) => [`${f} (<style>)`, regles(contenus(lire(f), 'style').join('\n'))]),
  ];
  for (const [ou, css] of unites)
    for (const r of css)
      if (r.bruts.some((s) => /::?(?:before|after)\b/i.test(s)) && r.decl.some(([, v]) => /\b100vw\b/.test(v)))
        fautes.push(`${ou} : « ${r.bruts.join(', ')} » est un pseudo-élément de 100vw`);
  assert.equal(fautes.length, 0, `Pseudo-éléments de 100vw :\n${liste(fautes)}`);
});

// --- html, body, le pied de page --------------------------------------------

test("html et body, sur toutes les pages, à 375 et 1440 px : encre sous html (le rebond d'iOS prolonge le pied), ivoire sur body, aucun overflow-x", () => {
  exigerDist();
  const fautes = [];
  for (const page of pagesHtml()) {
    const { els, css, j } = charger(page);
    const html = els.find((e) => e.nom === 'html');
    const body = els.find((e) => e.nom === 'body');
    for (const ecran of ECRANS) {
      const [sousHtml, surBody] = [fondDe(css, html, {}, ecran), fondDe(css, body, {}, ecran)];
      if (sousHtml !== j['--encre']) fautes.push(`${page}, ${ecran.nom} : le fond de html vaut ${sousHtml}, attendu --encre`);
      if (surBody !== j['--ivoire']) fautes.push(`${page}, ${ecran.nom} : le fond de body vaut ${surBody}, attendu --ivoire`);
      for (const el of [html, body]) {
        const o = calcule(css, el, 'overflow-x', {}, ecran);
        if (o && o.valeur !== 'visible')
          fautes.push(`${page}, ${ecran.nom} : <${el.nom}> a overflow-x: ${o.valeur} (« ${o.brut} »), qui masque un débordement au lieu de l'éviter`);
      }
    }
  }
  assert.equal(fautes.length, 0, `html et body :\n${liste(fautes)}`);
});

for (const page of pagesHtml()) {
  test(`pied : ${page}, un pied sombre (encre, filet ambre de 4 px, marge au-dessus), texte et focus ivoire ; LinkedIn et la langue courante soulignés, l'autre langue au survol et au focus seulement`, () => {
    exigerDist();
    const { els, css, j } = charger(page);
    const pieds = els.filter((e) => e.nom === 'footer' && e.classes.includes('pied'));
    assert.equal(pieds.length, 1, `${page} : ${pieds.length} <footer class="pied"> : attendu exactement un.`);
    const [pied] = pieds;
    const dedans = els.filter((e) => e.ancetres.includes(pied) && e.nom !== 'svg' && !e.ancetres.some((a) => a.nom === 'svg'));
    const fautes = [];

    for (const ecran of ECRANS) {
      const ou = ecran.nom;
      const filet = ['width', 'style', 'color'].map((k) => calcule(css, pied, `border-top-${k}`, {}, ecran)?.valeur);
      if (fondDe(css, pied, {}, ecran) !== j['--encre']) fautes.push(`${ou} : le fond du pied vaut ${fondDe(css, pied, {}, ecran)}, attendu --encre`);
      if (enPx(filet[0] ?? '') !== 4 || filet[1] !== 'solid' || resoudreSur(css, filet[2] ?? '', pied, {}, ecran) !== j['--ambre'])
        fautes.push(`${ou} : le filet du haut vaut « ${filet.join(' ')} », attendu 4px solid --ambre`);
      if (!(px(css, pied, 'margin-top', {}, ecran) > 0)) fautes.push(`${ou} : aucune marge au-dessus du pied`);

      for (const el of [pied, ...dedans]) {
        const c = couleur(css, el, {}, ecran);
        if (c !== j['--ivoire']) fautes.push(`${ou}, ${nomDe(el)} : couleur ${c}, attendu --ivoire`);
      }

      for (const a of dedans.filter((e) => e.nom === 'a')) {
        // Sans règle, un lien est souligné (valeur du navigateur).
        const souligne = (etat) => /\bunderline\b/.test(calcule(css, a, 'text-decoration-line', etat, ecran)?.valeur ?? 'underline');
        const langue = a.attrs.lang !== undefined;
        const courante = langue && a.attrs['aria-current'] !== undefined;
        if (!langue || courante) {
          if (!souligne({})) fautes.push(`${ou}, ${nomDe(a)} : non souligné au repos`);
          const epaisseur = calcule(css, a, 'text-decoration-thickness', {}, ecran)?.valeur ?? 'auto';
          if (courante && enPx(epaisseur) !== 2) fautes.push(`${ou}, ${nomDe(a)} (langue courante) : trait de « ${epaisseur} », attendu 2px`);
        } else {
          if (souligne({})) fautes.push(`${ou}, ${nomDe(a)} (autre langue) : souligné au repos, attendu au survol et au focus seulement`);
          if (!souligne({ survol: a })) fautes.push(`${ou}, ${nomDe(a)} (autre langue) : non souligné au survol`);
          if (!souligne({ focus: a })) fautes.push(`${ou}, ${nomDe(a)} (autre langue) : non souligné au focus`);
        }
        for (const { nom, etat } of etatsDe(a).slice(1)) {
          const c = couleur(css, a, etat, ecran);
          if (c !== j['--ivoire']) fautes.push(`${ou}, ${nomDe(a)} ${nom} : couleur ${c}, attendu --ivoire`);
        }
        const focus = { focus: a };
        const style = calcule(css, a, 'outline-style', focus, ecran)?.valeur ?? 'none';
        const brut = calcule(css, a, 'outline-color', focus, ecran)?.valeur ?? 'currentcolor';
        const contour = /^currentcolor$/i.test(brut) ? couleur(css, a, focus, ecran) : resoudreSur(css, brut, a, focus, ecran);
        if (style === 'none' || contour !== j['--ivoire'])
          fautes.push(`${ou}, ${nomDe(a)} : contour de focus « ${style} ${contour} », attendu visible et ivoire`);
      }
    }

    assert.equal(fautes.length, 0, `Pied de page, ${page} :\n${liste(fautes)}`);
  });
}

// --- Les cartes de l'accueil -------------------------------------------------

/** La marge négative de la carte rend exactement sa marge intérieure, et la carte ne porte aucun filet. */
function fautesDeCarte(css, carte, ecran) {
  const fautes = [];
  for (const cote of ['top', 'right', 'bottom', 'left']) {
    const marge = px(css, carte, `margin-${cote}`, {}, ecran);
    const interieure = px(css, carte, `padding-${cote}`, {}, ecran);
    if (!(interieure > 0) || marge !== -interieure)
      fautes.push(`${ecran.nom}, ${nomDe(carte)}, ${cote} : marge ${marge}px pour une marge intérieure de ${interieure}px, attendu l'opposé`);
    const style = calcule(css, carte, `border-${cote}-style`, {}, ecran);
    if (style && !/^(?:none|hidden)$/.test(style.valeur))
      fautes.push(`${ecran.nom}, ${nomDe(carte)} : filet ${cote} (« ${style.brut} »), attendu aucun`);
  }
  return fautes;
}

/**
 * Une transition qui anime vraiment : une durée d'au moins 1 ms
 * (transition-property seule n'anime rien ; le repli global du site pour
 * le mouvement réduit ramène toute durée à 0,01 ms, imperceptible).
 */
const anime = (t) =>
  Boolean(t) &&
  t.prop !== 'transition-property' &&
  decouper(t.valeur.replace(/,/g, ' '), ' ').some((x) => /^\d*\.?\d+m?s$/.test(x) && parseFloat(x) * (x.endsWith('ms') ? 1 : 1000) >= 1);

for (const page of ACCUEILS) {
  test(`cartes : ${page}, au survol et au focus une surface (sable sur l'ivoire, ivoire sur le sable) bordée d'un filet sans ombre, sans transition si le mouvement est réduit`, () => {
    exigerDist();
    const { els, css, j } = charger(page);
    const cartes = cartesDe(els);
    assert.ok(cartes.length > 0, `${page} : aucune carte (lien de classe « parcelle »).`);
    const fautes = [];

    for (const ecran of ECRANS)
      for (const carte of cartes) {
        const dessous = surfaceSous(css, carte.parent, {}, ecran);
        const attendu = dessous === j['--sable'] ? j['--ivoire'] : j['--sable'];
        if (![j['--ivoire'], j['--sable']].includes(dessous)) fautes.push(`${ecran.nom}, ${nomDe(carte)} : posée sur ${dessous}, attendu ivoire ou sable`);
        for (const { nom, etat } of etatsDe(carte)) {
          const traits = ombres(calcule(css, carte, 'box-shadow', etat, ecran)?.valeur);
          if (traits.some(([x = 0, y = 0, flou = 0]) => x !== 0 || y !== 0 || flou !== 0)) fautes.push(`${ecran.nom}, ${nomDe(carte)} ${nom} : ombre portée`);
          if (nom === 'au repos') continue;
          const fond = fondDe(css, carte, etat, ecran);
          if (fond !== attendu) fautes.push(`${ecran.nom}, ${nomDe(carte)} ${nom} : fond ${fond} sur ${dessous}, attendu ${attendu}`);
          if (!traits.some(([x, y, flou, etendue]) => x === 0 && y === 0 && (flou ?? 0) === 0 && etendue === 1))
            fautes.push(`${ecran.nom}, ${nomDe(carte)} ${nom} : pas de filet 0 0 0 1px`);
        }
        const t = calcule(css, carte, 'transition', { survol: carte }, { ...ecran, reduit: true });
        if (anime(t)) fautes.push(`${ecran.nom}, ${nomDe(carte)} : transition « ${t.valeur} » malgré prefers-reduced-motion: reduce (« ${t.brut} »)`);
      }

    assert.equal(fautes.length, 0, `Surface des cartes, ${page} :\n${liste(fautes)}`);
  });

  test(`cartes : ${page}, aucune carte ne porte de filet ni de marge non compensée ; le filet du projet à part est sur le bloc, seulement sans bande`, () => {
    exigerDist();
    const { els, css } = charger(page);
    const cartes = cartesDe(els);
    const fautes = [];
    for (const ecran of ECRANS) for (const carte of cartes) fautes.push(...fautesDeCarte(css, carte, ecran));

    // Sous la bande, le bloc à part n'a pas de filet : la bande sépare.
    const trio = els.find((e) => e.classes.includes('parcelles--trio'));
    const bloc = els.find((e) => e.classes.includes('parcelles--a-part'));
    assert.ok(trio && bloc, `${page} : le trio ou le bloc à part manque.`);
    for (const ecran of ECRANS) {
      const style = calcule(css, bloc, 'border-top-style', {}, ecran);
      if (style && style.valeur !== 'none') fautes.push(`${ecran.nom} : sous la bande, le bloc à part porte un filet (« ${style.brut} »)`);
    }

    // Sans bande (une simple paire, puis le projet à part), le filet revient,
    // sur le bloc et pas sur la carte. Aucune page ne le montre aujourd'hui :
    // on le juge sur un fragment fait des mêmes classes et attributs de portée.
    const carte = cartes.find((c) => c.classes.includes('parcelle--a-part')) ?? cartes[0];
    const fragment = elements(
      `<html><body><main><div class="parcelles parcelles--paire" ${CID(trio)}></div>` +
        `<div class="parcelles parcelles--a-part" ${CID(trio)}><a class="parcelle parcelle--a-part" href="/x/" ${CID(carte)}></a></div></main></body></html>`,
    );
    const blocSeul = fragment.find((e) => e.classes.includes('parcelles--a-part'));
    const [carteSeule] = cartesDe(fragment);
    for (const ecran of ECRANS) {
      if ((calcule(css, blocSeul, 'border-top-style', {}, ecran)?.valeur ?? 'none') === 'none')
        fautes.push(`${ecran.nom} : sans bande, le bloc à part n'est pas séparé de la paire par un filet`);
      fautes.push(...fautesDeCarte(css, carteSeule, ecran).map((f) => `sans bande, ${f}`));
    }

    assert.equal(fautes.length, 0, `Filets et marges des cartes, ${page} :\n${liste(fautes)}`);
  });

  test(`cartes : ${page}, le focus garde un contour de 3 px en encre, décalé entre −(marge de la carte) et 0 ; le numéro est en ardoise, sans contour de lettre`, () => {
    exigerDist();
    const { els, css, j } = charger(page);
    const fautes = [];

    for (const ecran of ECRANS)
      for (const carte of cartesDe(els)) {
        const focus = { focus: carte };
        const largeur = calcule(css, carte, 'outline-width', focus, ecran)?.valeur ?? 'medium';
        const style = calcule(css, carte, 'outline-style', focus, ecran)?.valeur ?? 'none';
        const brut = calcule(css, carte, 'outline-color', focus, ecran)?.valeur ?? 'currentcolor';
        const teinte = /^currentcolor$/i.test(brut) ? couleur(css, carte, focus, ecran) : resoudreSur(css, brut, carte, focus, ecran);
        if (enPx(largeur) !== 3 || style === 'none' || teinte !== j['--encre'])
          fautes.push(`${ecran.nom}, ${nomDe(carte)} : contour « ${largeur} ${style} ${teinte} », attendu 3px en --encre`);
        // Au téléphone, la surface touche le bord de l'écran : décalé au-dehors
        // (> 0), le contour y serait coupé ; au-delà de −marge, il mordrait
        // sur le contenu.
        const decalage = px(css, carte, 'outline-offset', focus, ecran);
        const marge = px(css, carte, 'padding-left', {}, ecran);
        if (!(decalage <= 0 && decalage >= -marge))
          fautes.push(`${ecran.nom}, ${nomDe(carte)} : contour décalé de ${decalage}px, attendu entre −${marge}px et 0`);

        for (const numero of els.filter((e) => e.ancetres.includes(carte) && e.classes.includes('parcelle__numero'))) {
          for (const { nom, etat } of etatsDe(carte)) {
            const c = couleur(css, numero, etat, ecran);
            if (c !== j['--ardoise']) fautes.push(`${ecran.nom}, numéro ${numero.texte()} ${nom} : couleur ${c}, attendu --ardoise`);
          }
          for (const p of ['-webkit-text-stroke', '-webkit-text-stroke-width', 'text-stroke']) {
            const v = calcule(css, numero, p, { survol: carte }, ecran);
            if (v && !/^0(?:px)?\b/.test(v.valeur)) fautes.push(`${ecran.nom}, numéro ${numero.texte()} : ${p} « ${v.valeur} », option écartée`);
          }
        }
      }

    assert.equal(fautes.length, 0, `Focus et numéros, ${page} :\n${liste(fautes)}`);
  });

  test(`sol : ${page}, la bande sous la ligne de sol est coupée net à 87,5 %, --sol sur l'ivoire, --sol-sur-sable sur le sable, au repos, au survol et au focus`, () => {
    exigerDist();
    const { els, css, j } = charger(page);
    const fautes = [];
    const solDe = (surface) => (surface === j['--sable'] ? j['--sol-sur-sable'] : j['--sol']);
    const juger = (dessin, etat, ecran, ou) => {
      const v = calcule(css, dessin, 'background-image', etat, ecran)?.valeur;
      const avant = fautesDeSol(v, ou);
      if (avant.length) return fautes.push(...avant);
      const sol = resoudreSur(css, degrade(v).arrets[1].couleur, dessin, etat, ecran);
      const surface = surfaceSous(css, dessin, etat, ecran);
      if (sol !== solDe(surface)) fautes.push(`${ou} : sol ${sol} sur une surface ${surface}, attendu ${solDe(surface)}`);
    };

    const scenes = els.filter((e) => e.classes.includes('parcelle__scene'));
    if (scenes.length === 0) fautes.push('aucune scène de carte (classe « parcelle__scene »)');
    for (const ecran of ECRANS)
      for (const scene of scenes) {
        const carte = scene.ancetres.find((a) => a.classes.includes('parcelle'));
        const dessin = els.find((e) => e.nom === 'svg' && e.ancetres.includes(scene));
        if (!carte || !dessin) {
          fautes.push(`une scène sans carte ou sans dessin (${carte ? nomDe(carte) : 'hors carte'})`);
          continue;
        }
        for (const { nom, etat } of etatsDe(carte)) juger(dessin, etat, ecran, `${ecran.nom}, ${nomDe(carte)} ${nom}`);
      }

    const equipe = els.find((e) => e.classes.includes('accroche__equipe'));
    if (!equipe) fautes.push("aucune équipe dans l'accroche (classe « accroche__equipe »)");
    else for (const ecran of ECRANS) juger(equipe, {}, ecran, `${ecran.nom}, l'équipe de l'accroche`);

    assert.equal(fautes.length, 0, `Sol des dessins, ${page} :\n${liste(fautes)}`);
  });
}
