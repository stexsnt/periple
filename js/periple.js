"use strict";
/* Périple — ce qui est propre à ce site : l'accueil avec sa frise, les étapes « pari » et « manip »,
   et les manipulations (polygones d'Archimède, ponts de Königsberg, portes de Monty Hall).
   Chargé après app.js, dont il utilise les outils ($, $$, h, S, sauver, reussir, bandeauSucces…). */

const GENRES = { methode: "Méthode", paradoxe: "Paradoxe", figure: "Figure" };
const ESCALES = () => PARCOURS.flatMap(p => p.chapitres).sort((a, b) => a.an - b.an);
const fr = (x, d = 4) => x.toFixed(d).replace(".", ",");
const calme = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   Archimède : un cercle de diamètre 1 pris entre deux polygones
   ============================================================ */
const borneInf = n => n * Math.sin(Math.PI / n), borneSup = n => n * Math.tan(Math.PI / n);

function figArchimede(n) {
  const traces = [6, 12, 24].filter(k => k < n);
  const C = 160, R = 118, pts = (r, dec, m = n) => Array.from({ length: m }, (_, k) => {
    const a = -Math.PI / 2 + dec + 2 * Math.PI * k / m; return (C + r * Math.cos(a)).toFixed(2) + "," + (C + r * Math.sin(a)).toFixed(2);
  }).join(" ");
  const ext = pts(R / Math.cos(Math.PI / n), Math.PI / n), int = pts(R, 0);
  return `<svg viewBox="0 0 320 320" class="fig-archi" role="img" aria-label="Un cercle pris entre un polygone inscrit et un polygone circonscrit de ${n} côtés">
    ${traces.map(k => `<polygon points="${pts(R / Math.cos(Math.PI / k), Math.PI / k, k)}" class="circonscrit trace"/><polygon points="${pts(R, 0, k)}" class="inscrit trace"/>`).join("")}
    <path d="M${ext.replace(/ /g, "L")}ZM${int.replace(/ /g, "L")}Z" fill-rule="evenodd" class="etau"/>
    <polygon points="${ext}" class="circonscrit"/><circle cx="${C}" cy="${C}" r="${R}" class="cercle"/><polygon points="${int}" class="inscrit"/>
    <path d="M${C - R} ${C}H${C + R}" class="diametre"/><circle cx="${C}" cy="${C}" r="2.5" class="centre"/><text x="${C}" y="${C - 8}" class="cote">1</text>
  </svg>`;
}

/* Encadrement affiché avec ses chiffres communs mis en avant : ce sont les chiffres certains de π. */
function encadrement(n, d = 5) {
  const a = (Math.floor(borneInf(n) * 10 ** d + 1e-7) / 10 ** d).toFixed(d), b = (Math.ceil(borneSup(n) * 10 ** d - 1e-7) / 10 ** d).toFixed(d);   // 1e-7 : 6 sin(π/6) vaut 2,9999999999999996 en machine
  let k = 0; while (k < a.length && a[k] === b[k]) k++;
  const m = s => `<b>${s.slice(0, k).replace(".", ",")}</b>${s.slice(k).replace(".", ",")}`;
  return { html: `<span class="borne inf">${m(a)}</span> &lt; <span class="m">π</span> &lt; <span class="borne sup">${m(b)}</span>`, surs: Math.max(0, k - 2), a, b };
}

function widgetArchimede(z) {
  let n = 6; const vus = new Set([6]);
  z.innerHTML = `<div class="archi">
    <div class="archi-fig"></div>
    <div class="archi-cmd">
      <p class="archi-n"><span id="archi-n"></span> côtés</p>
      <p class="archi-enc" aria-live="polite"></p>
      <p class="muet" id="archi-surs"></p>
      <div class="actions"><button class="btn secondaire" id="archi-moins">Moitié moins de côtés</button><button class="btn" id="archi-plus">Doubler les côtés</button></div>
      <table class="donnees archi-table"><thead><tr><th>Côtés</th><th>Inscrit</th><th>Circonscrit</th><th>Écart</th></tr></thead><tbody></tbody></table>
      <p class="archi-legende"><span class="l-in">polygone inscrit</span><span class="l-ce">cercle, de périmètre π</span><span class="l-ex">polygone circonscrit</span></p>
    </div></div>`;
  const maj = () => {
    vus.add(n);
    const e = encadrement(n);
    $(".archi-fig", z).innerHTML = figArchimede(n);
    $("#archi-n", z).textContent = n.toLocaleString("fr-FR");
    $(".archi-enc", z).innerHTML = e.html;
    $("#archi-surs", z).textContent = e.surs === 0 ? "Aucun chiffre après la virgule n'est encore certain." : `${e.surs} chiffre${e.surs > 1 ? "s" : ""} après la virgule ${e.surs > 1 ? "sont certains" : "est certain"} : les deux bornes ${e.surs > 1 ? "les" : "le"} partagent.`;
    $("tbody", z).innerHTML = [...vus].sort((a, b) => a - b).map(k => `<tr class="${k === n ? "ici" : ""}"><td>${k.toLocaleString("fr-FR")}</td><td>${fr(borneInf(k))}…</td><td>${fr(borneSup(k))}…</td><td>${fr(borneSup(k) - borneInf(k), 5)}</td></tr>`).join("");
    $("#archi-moins", z).disabled = n <= 6; $("#archi-plus", z).disabled = n >= 6144;
  };
  $("#archi-plus", z).onclick = () => { n *= 2; maj(); };
  $("#archi-moins", z).onclick = () => { n /= 2; maj(); };
  maj();
  return { reveler() {} };
}

/* ============================================================
   Königsberg : quatre zones, sept ponts
   ============================================================ */
const ZONES = { A: { nom: "l'île du Kneiphof", x: 205, y: 172 }, B: { nom: "la rive nord", x: 260, y: 52 }, C: { nom: "la rive sud", x: 260, y: 292 }, D: { nom: "la zone est", x: 440, y: 172 } };
const PONTS = [
  { a: "A", b: "B", d: "M170 98V138" }, { a: "A", b: "B", d: "M240 98V138" },
  { a: "A", b: "C", d: "M170 206V246" }, { a: "A", b: "C", d: "M240 206V246" },
  { a: "A", b: "D", d: "M278 172H342" },
  { a: "B", b: "D", d: "M420 98V134" }, { a: "C", b: "D", d: "M420 210V246" },
];

/* mode "promenade" : essais libres, validé après trois tentatives ;
   mode "sauvetage" : on ferme un pont, puis on doit réussir la promenade ;
   mode "plan"      : plan libre à côté d'un questionnaire, rien à valider. */
function promenade(z, mode, onReussi) {
  let ou = null, faits = [], ferme = -1, tentatives = 0, fini = false, valide = false, degres = false;
  const actifs = () => PONTS.map((p, k) => k).filter(k => k !== ferme);
  const libres = zone => actifs().filter(k => !faits.includes(k) && (PONTS[k].a === zone || PONTS[k].b === zone));
  z.innerHTML = `<div class="ponts">
    <svg viewBox="0 0 520 344" role="group" aria-label="Plan de Königsberg : quatre zones de terre et sept ponts">
      <rect x="0" y="0" width="520" height="344" rx="14" class="terre"/>
      <path d="M0 98H520V246H0Z" class="eau"/>
      <path d="M0 110q20-6 40 0t40 0" class="vague"/><path d="M30 232q20-6 40 0t40 0M300 150q14-5 28 0" class="vague"/>
      <g class="zones">
        <rect data-z="B" x="0" y="0" width="520" height="98" class="zone" tabindex="0" role="button" aria-label="Rive nord (B)"/>
        <rect data-z="C" x="0" y="246" width="520" height="98" class="zone" tabindex="0" role="button" aria-label="Rive sud (C)"/>
        <rect data-z="A" x="130" y="138" width="148" height="68" rx="16" class="zone ile" tabindex="0" role="button" aria-label="Île du Kneiphof (A)"/>
        <path data-z="D" d="M358 134H520V210H358a16 16 0 0 1-16-16v-44a16 16 0 0 1 16-16Z" class="zone ile" tabindex="0" role="button" aria-label="Zone est (D)"/>
      </g>
      <g class="noms"><text x="60" y="58">Rive nord (B)</text><text x="60" y="300">Rive sud (C)</text><text x="146" y="162">A</text><text x="480" y="160">D</text><text x="24" y="178" class="riviere">le Pregel</text></g>
      <g class="les-ponts">${PONTS.map((p, k) => `<g data-k="${k}" class="pont" tabindex="0" role="button"><path d="${p.d}" class="tablier"/><path d="${p.d}" class="voie"/><text class="ordre"></text></g>`).join("")}</g>
      <g class="degres" hidden>${Object.entries(ZONES).map(([id, q]) => `<g transform="translate(${q.x + (id === "A" ? 46 : id === "D" ? -62 : 150)} ${q.y})"><circle r="15"/><text y="5"></text></g>`).join("")}</g>
      <circle class="pion" r="11" hidden/>
    </svg>
    <div class="ponts-cmd"><p class="ponts-etat" aria-live="polite"></p><p class="ponts-compte"></p>
      <div class="actions"><button class="btn secondaire" id="ponts-raz">Recommencer</button></div></div></div>`;
  const svg = $("svg", z), pion = $(".pion", z), etat = $(".ponts-etat", z);
  const finTentative = () => { if (!fini && faits.length) { fini = true; tentatives++; } };
  const maj = () => {
    const total = actifs().length;
    $$(".pont", z).forEach(g => {
      const k = +g.dataset.k, rang = faits.indexOf(k), p = PONTS[k], path = $(".tablier", g);
      g.classList.toggle("fait", rang >= 0); g.classList.toggle("ferme", k === ferme);
      g.classList.toggle("possible", !fini && ou !== null && libres(ou).includes(k));
      g.setAttribute("aria-label", `Pont entre ${p.a} et ${p.b}${k === ferme ? ", fermé" : rang >= 0 ? `, traversé en ${rang + 1}${rang ? "e" : "er"}` : ""}`);
      const t = $(".ordre", g), bb = path.getBBox();
      t.setAttribute("x", bb.x + bb.width / 2); t.setAttribute("y", bb.y + bb.height / 2 + 5); t.textContent = rang >= 0 ? rang + 1 : k === ferme ? "×" : "";
    });
    $$(".zone", z).forEach(r => r.classList.toggle("ici", r.dataset.z === ou));
    pion.toggleAttribute("hidden", ou === null); if (ou) { pion.setAttribute("cx", ZONES[ou].x); pion.setAttribute("cy", ZONES[ou].y); }
    $(".degres", z).toggleAttribute("hidden", !degres);
    if (degres) $$(".degres g", z).forEach((g, j) => { const id = Object.keys(ZONES)[j]; const d = actifs().filter(k => PONTS[k].a === id || PONTS[k].b === id).length; $("text", g).textContent = d; g.classList.toggle("impair", d % 2 === 1); });
    const reste = total - faits.length;
    $(".ponts-compte", z).textContent = `${faits.length} pont${faits.length > 1 ? "s" : ""} sur ${total}` + (mode === "promenade" ? `, ${tentatives} tentative${tentatives > 1 ? "s" : ""} terminée${tentatives > 1 ? "s" : ""}` : "");
    if (mode === "sauvetage" && ferme < 0) etat.textContent = "Choisis le pont à fermer.";
    else if (ou === null) etat.textContent = "Choisis ta zone de départ en cliquant dessus.";
    else if (reste === 0) etat.textContent = `Les ${total} ponts sont traversés, chacun une seule fois.`;
    else if (!libres(ou).length) etat.textContent = `Bloqué sur ${ZONES[ou].nom} : il reste ${reste} pont${reste > 1 ? "s" : ""} à traverser, et plus aucun n'est accessible d'ici.`;
    else etat.textContent = `Tu es sur ${ZONES[ou].nom}. Clique sur un pont pour le traverser.`;
  };
  const apresPas = () => {
    const total = actifs().length;
    if (faits.length === total) { finTentative(); maj(); if (mode === "sauvetage" && !valide) { valide = true; degres = true; maj(); onReussi(tentatives <= 2 ? 3 : tentatives <= 4 ? 2 : 1); } return; }
    if (!libres(ou).length) finTentative();
    maj();
    if (mode === "promenade" && tentatives >= 3 && !valide) { valide = true; onReussi(3); }
  };
  const traverser = k => {
    if (fini || ou === null || !libres(ou).includes(k)) return;
    faits.push(k); ou = PONTS[k].a === ou ? PONTS[k].b : PONTS[k].a; apresPas();
  };
  const clicPont = k => {
    if (mode === "sauvetage" && ou === null && !faits.length) { ferme = ferme === k ? -1 : k; maj(); return; }
    traverser(k);
  };
  const clicZone = id => {
    if (fini) return;
    if (mode === "sauvetage" && ferme < 0) return;
    if (ou === null) { ou = id; maj(); return; }
    const k = libres(ou).find(j => PONTS[j].a === id || PONTS[j].b === id); if (k !== undefined) traverser(k);
  };
  const surActivation = (el, f) => { el.addEventListener("click", f); el.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); f(); } }); };
  $$(".pont", z).forEach(g => surActivation(g, () => clicPont(+g.dataset.k)));
  $$(".zone", z).forEach(r => surActivation(r, () => clicZone(r.dataset.z)));
  $("#ponts-raz", z).onclick = () => { finTentative(); ou = null; faits = []; fini = false; if (mode === "sauvetage" && !valide) ferme = -1; maj(); if (mode === "promenade" && tentatives >= 3 && !valide) { valide = true; onReussi(3); } };
  maj();
  return { reveler() { degres = true; maj(); } };
}

/* ============================================================
   Monty Hall : jouer à la main, puis laisser la machine jouer
   ============================================================ */
const ICONE_VOITURE = `<svg viewBox="0 0 64 40" class="lot voiture" aria-hidden="true"><path d="M6 26v-6l8-2 7-10h20l9 10 8 3v5z"/><path d="M24 11h8v7H19zM35 11h5l6 7H35z" class="vitre"/><circle cx="18" cy="28" r="6"/><circle cx="46" cy="28" r="6"/></svg>`;
const ICONE_CHEVRE = `<svg viewBox="0 0 64 48" class="lot chevre" aria-hidden="true"><path d="M22 18C14 14 12 6 16 2c1 7 5 10 10 12zM42 18c8-4 10-12 6-16-1 7-5 10-10 12z" class="corne"/><path d="M20 16h24l6 4-5 5-3 12c-1 5-5 8-10 8s-9-3-10-8l-3-12-5-5z"/><path d="M29 44l3 4 3-4z"/><circle cx="26" cy="26" r="2" class="oeil"/><circle cx="38" cy="26" r="2" class="oeil"/></svg>`;

function montyJeu(z, onReussi) {
  const T = { garder: [0, 0], changer: [0, 0] }; let voiture, choix, ouverte, phase, valide = false;
  z.innerHTML = `<div class="monty">
    <div class="portes">${[0, 1, 2].map(k => `<button class="porte" data-k="${k}"><span class="derriere"></span><span class="battant"><span class="num">${k + 1}</span><span class="poignee"></span></span></button>`).join("")}</div>
    <p class="monty-etat" aria-live="polite"></p>
    <div class="actions monty-choix"></div>
    <table class="donnees monty-table"><thead><tr><th>Stratégie</th><th>Parties</th><th>Victoires</th></tr></thead><tbody>
      <tr><th>Garder</th><td id="mg-n">0</td><td id="mg-v">0</td></tr><tr><th>Changer</th><td id="mc-n">0</td><td id="mc-v">0</td></tr></tbody></table>
    <p class="muet monty-reste"></p></div>`;
  const portes = $$(".porte", z), etat = $(".monty-etat", z), zc = $(".monty-choix", z);
  const total = () => T.garder[0] + T.changer[0];
  const majTable = () => {
    $("#mg-n", z).textContent = T.garder[0]; $("#mg-v", z).textContent = T.garder[1]; $("#mc-n", z).textContent = T.changer[0]; $("#mc-v", z).textContent = T.changer[1];
    const manque = [];
    if (total() < 10) manque.push(`${10 - total()} partie${10 - total() > 1 ? "s" : ""} à jouer`);
    if (T.garder[0] < 3) manque.push(`${3 - T.garder[0]} en gardant`);
    if (T.changer[0] < 3) manque.push(`${3 - T.changer[0]} en changeant`);
    $(".monty-reste", z).textContent = manque.length ? "Il manque encore : " + manque.join(", ") + "." : "Objectif atteint. Tu peux continuer à jouer.";
  };
  const nouvelle = () => {
    voiture = Math.floor(Math.random() * 3); choix = ouverte = null; phase = "choix";
    portes.forEach(p => { p.className = "porte"; p.disabled = false; $(".derriere", p).innerHTML = ""; p.setAttribute("aria-label", `Porte ${+p.dataset.k + 1}, fermée`); });
    etat.textContent = "Choisis une porte."; zc.innerHTML = "";
  };
  const finir = strategie => {
    const finale = strategie === "garder" ? choix : [0, 1, 2].find(k => k !== choix && k !== ouverte), gagne = finale === voiture;
    T[strategie][0]++; if (gagne) T[strategie][1]++;
    portes.forEach((p, k) => { p.classList.add("ouverte"); p.classList.toggle("choisie", k === finale); p.disabled = true; $(".derriere", p).innerHTML = k === voiture ? ICONE_VOITURE : ICONE_CHEVRE; p.setAttribute("aria-label", `Porte ${k + 1} : ${k === voiture ? "la voiture" : "une chèvre"}`); });
    phase = "fin"; majTable();
    etat.textContent = `Tu as ${strategie === "garder" ? "gardé" : "changé pour"} la porte ${finale + 1} : ${gagne ? "la voiture est à toi." : "une chèvre."}`;
    zc.innerHTML = `<button class="btn" id="monty-suite">Partie suivante</button>`;
    $("#monty-suite", z).onclick = nouvelle; $("#monty-suite", z).focus({ preventScroll: true });
    if (!valide && total() >= 10 && T.garder[0] >= 3 && T.changer[0] >= 3) { valide = true; onReussi(3); }
  };
  portes.forEach(p => p.onclick = () => {
    if (phase !== "choix") return;
    choix = +p.dataset.k; phase = "decision";
    const chevres = [0, 1, 2].filter(k => k !== choix && k !== voiture); ouverte = chevres[Math.floor(Math.random() * chevres.length)];
    const autre = [0, 1, 2].find(k => k !== choix && k !== ouverte);
    portes.forEach((q, k) => { q.classList.toggle("choisie", k === choix); q.disabled = true; });
    portes[ouverte].classList.add("ouverte"); $(".derriere", portes[ouverte]).innerHTML = ICONE_CHEVRE; portes[ouverte].setAttribute("aria-label", `Porte ${ouverte + 1}, ouverte : une chèvre`);
    etat.textContent = `Tu as choisi la porte ${choix + 1}. Le présentateur ouvre la porte ${ouverte + 1} : une chèvre.`;
    zc.innerHTML = `<button class="btn secondaire" id="monty-garder">Garder la porte ${choix + 1}</button><button class="btn secondaire" id="monty-changer">Changer pour la porte ${autre + 1}</button>`;
    $("#monty-garder", z).onclick = () => finir("garder"); $("#monty-changer", z).onclick = () => finir("changer");
  });
  nouvelle(); majTable();
}

function montySim(z) {
  let n = 0, vg = 0, pts = [], revele = false, minuterie = null;
  const pari = (S.paris || {}).montyhall, textes = ["garder ta porte", "changer de porte", "« peu importe, une chance sur deux »"];
  z.innerHTML = `<div class="sim">
    ${pari !== undefined ? `<p class="sim-pari">Ton pari de départ : <strong>${textes[pari]}</strong>.</p>` : ""}
    <svg viewBox="0 0 560 250" role="img" aria-label="Fréquences de victoire des deux stratégies au fil des parties"></svg>
    <dl class="sim-chiffres"><div><dt>Parties jouées</dt><dd id="sim-n">0</dd></div><div class="garder"><dt>Victoires en gardant</dt><dd id="sim-g">0</dd></div><div class="changer"><dt>Victoires en changeant</dt><dd id="sim-c">0</dd></div></dl>
    <div class="actions"><button class="btn" data-n="1000">Jouer 1 000 parties</button><button class="btn secondaire" data-n="100">Jouer 100 parties</button><button class="btn lien" id="sim-raz">Remettre à zéro</button></div></div>`;
  const svg = $("svg", z), X0 = 44, X1 = 548, Y0 = 16, Y1 = 214, y = f => Y1 - f * (Y1 - Y0);
  const dessiner = () => {
    const max = Math.max(100, n), x = k => X0 + (X1 - X0) * k / max;
    const ligne = sel => pts.map(p => `${x(p[0]).toFixed(1)},${y(sel(p)).toFixed(1)}`).join(" ");
    svg.innerHTML = `${[0, 0.25, 0.5, 0.75, 1].map(f => `<path d="M${X0} ${y(f)}H${X1}" class="grille"/><text x="${X0 - 8}" y="${y(f) + 4}" class="gradu">${String(f).replace(".", ",")}</text>`).join("")}
      ${revele ? `<path d="M${X0} ${y(1 / 3)}H${X1}M${X0} ${y(2 / 3)}H${X1}" class="cible"/><text x="${X1}" y="${y(2 / 3) - 6}" class="cible-txt">2/3</text><text x="${X1}" y="${y(1 / 3) - 6}" class="cible-txt">1/3</text>` : ""}
      <text x="${X0}" y="240" class="gradu debut">0</text><text x="${X1}" y="240" class="gradu fin">${max.toLocaleString("fr-FR")} parties</text>
      ${pts.length > 1 ? `<polyline points="${ligne(p => p[1])}" class="c-garder"/><polyline points="${ligne(p => 1 - p[1])}" class="c-changer"/>` : `<text x="${(X0 + X1) / 2}" y="${y(0.5) - 10}" class="vide">Lance des parties pour voir les deux courbes.</text>`}`;
    $("#sim-n", z).textContent = n.toLocaleString("fr-FR");
    $("#sim-g", z).textContent = n ? `${vg.toLocaleString("fr-FR")}, soit ${fr(vg / n, 3)}` : "0";
    $("#sim-c", z).textContent = n ? `${(n - vg).toLocaleString("fr-FR")}, soit ${fr((n - vg) / n, 3)}` : "0";
  };
  const jouer = k => { for (let j = 0; j < k; j++) { n++; if (Math.floor(Math.random() * 3) === Math.floor(Math.random() * 3)) vg++; if (n <= 60 || n % Math.ceil(n / 200) === 0) pts.push([n, vg / n]); } if (pts.length > 700) pts = pts.filter((p, j) => j < 60 || j % 2 === 0); };
  const lancer = total => {
    if (minuterie) return;
    if (calme()) { jouer(total); pts.push([n, vg / n]); dessiner(); return; }
    let reste = total; const lot = Math.max(1, Math.round(total / 50));
    minuterie = setInterval(() => { const k = Math.min(lot, reste); jouer(k); reste -= k; if (!reste) { clearInterval(minuterie); minuterie = null; pts.push([n, vg / n]); } dessiner(); }, 30);
  };
  $$("button[data-n]", z).forEach(b => b.onclick = () => lancer(+b.dataset.n));
  $("#sim-raz", z).onclick = () => { if (minuterie) { clearInterval(minuterie); minuterie = null; } n = vg = 0; pts = []; dessiner(); };
  dessiner();
  return { reveler() { revele = true; dessiner(); } };
}

/* ============================================================
   Étapes propres à Périple
   ============================================================ */
/* Pari : l'élève s'engage avant d'expérimenter. Aucune correction ici, c'est la suite qui tranche. */
function etapePari(z, c, i, e) {
  S.paris = S.paris || {};
  const afficher = () => {
    const fait = S.paris[c.id];
    z.innerHTML = `<h1>${h(e.titre)}</h1><p class="prose question">${h(e.q)}</p>${e.doc || ""}<div class="choix pari">${e.choix.map((x, k) => `<button data-k="${k}" ${fait !== undefined ? "disabled" : ""} class="${fait === k ? "mise" : ""}">${h(x)}</button>`).join("")}</div>
      ${fait !== undefined ? `<div class="succes pari-note" role="status"><div><strong>Pari noté.</strong><p>Pas de correction pour l'instant : c'est l'expérience qui va trancher. Ton pari te sera rappelé au moment du verdict.</p></div><a class="btn" href="${suivant(c, i)}">Continuer</a></div>` : `<p class="muet">Engage-toi : ta réponse est enregistrée et ne pourra plus être modifiée.</p>`}`;
    $$(".choix button", z).forEach(b => b.onclick = () => { S.paris[c.id] = +b.dataset.k; sauver(); const { gain } = reussir(c, i, 3); if (gain) toast(`+${gain} XP`); afficher(); $(".pari-note a", z).focus({ preventScroll: true }); });
  };
  afficher();
}

/* Manipulation : validée quand le widget signale que l'objectif est atteint. */
function etapeManip(z, c, i, e) {
  z.innerHTML = `<h1>${h(e.titre)}</h1><div class="prose">${e.intro || ""}</div><div class="widget"></div>`;
  let fait = false; const ok = etoiles => { if (fait) return; fait = true; if (avancement(c).f === c.etapes.length - 1 && !S.faits[idEtape(c, i)]) confettis(); bandeauSucces(z, c, i, etoiles, e.expl); };
  const zone = $(".widget", z);
  MANIPS[e.widget](zone, ok);
}
const MANIPS = { promenade: (z, ok) => promenade(z, "promenade", ok), sauvetage: (z, ok) => promenade(z, "sauvetage", ok), montyjeu: montyJeu };

const WIDGETS_QUIZ = { archimede: widgetArchimede, konigsberg: z => promenade(z, "plan", () => {}), montysim: montySim };

/* ============================================================
   Accueil : la figure d'Archimède, la frise, les escales
   ============================================================ */
const VIGNETTES = {
  archimede: `<svg viewBox="0 0 120 120" aria-hidden="true"><polygon points="60,6.9 106,33.4 106,86.6 60,113.1 14,86.6 14,33.4" class="v2"/><circle cx="60" cy="60" r="46" class="v0"/><polygon points="60,14 99.8,37 99.8,83 60,106 20.2,83 20.2,37" class="v1"/><circle cx="60" cy="60" r="2.2" class="vp"/></svg>`,
  konigsberg: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M28 60Q28 26 62 16M28 60Q54 48 62 16M28 60Q28 94 62 104M28 60Q54 72 62 104M28 60H100M62 16L100 60M62 104L100 60" class="v0"/><circle cx="28" cy="60" r="6" class="vn"/><circle cx="62" cy="16" r="6" class="vn"/><circle cx="62" cy="104" r="6" class="vn"/><circle cx="100" cy="60" r="6" class="vn"/></svg>`,
  montyhall: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="10" y="26" width="28" height="70" class="v0"/><rect x="46" y="26" width="28" height="70" class="v0"/><path d="M82 26h28v70H82z" class="v2"/><path d="M82 26l16 8v70l-16-8z" class="v1"/><circle cx="32" cy="62" r="2.2" class="vp"/><circle cx="68" cy="62" r="2.2" class="vp"/><path d="M4 96h112" class="v0"/></svg>`,
};

Object.assign(VIGNETTES, {
  babylone: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="12" y="16" width="96" height="88" rx="22" class="v0"/><rect x="34" y="34" width="52" height="52" class="v1"/><path d="M34 34L86 86M86 34L34 86" class="v1"/></svg>`,
  pythagore: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="24" y="24" width="72" height="72" class="v0"/><path d="M24 96L96 24" class="v1"/><circle cx="24" cy="96" r="5" class="vn"/><circle cx="96" cy="24" r="5" class="vn"/></svg>`,
  zenon: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M10 84H110" class="v0"/><path d="M10 84A25 25 0 0 1 60 84A12.5 12.5 0 0 1 85 84A6.2 6.2 0 0 1 97.5 84A3.1 3.1 0 0 1 103.7 84" class="v1"/><circle cx="110" cy="84" r="4.5" class="vn"/></svg>`,
  euclide: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="10" y="36" width="100" height="38" class="v0"/><path d="M48 36V74M86 36V74" class="v1"/><path d="M86 60H110M98 60V74" class="v1"/><rect x="86" y="36" width="24" height="24" class="v2"/></svg>`,
  eratosthene: `<svg viewBox="0 0 120 120" aria-hidden="true">${[0, 1, 2, 3].map(l => [0, 1, 2, 3].map(c => { const n = 2 + l * 4 + c; return `<circle cx="${24 + c * 24}" cy="${24 + l * 24}" r="${[2, 3, 5, 7, 11, 13, 17].includes(n) ? 8 : 4}" class="${[2, 3, 5, 7, 11, 13, 17].includes(n) ? "vn" : "v0"}"/>`; }).join("")).join("")}</svg>`,
  brahmagupta: `<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="60" rx="26" ry="40" class="v1"/><path d="M14 104H106" class="v0"/><circle cx="60" cy="60" r="3" class="vp"/></svg>`,
  alkhwarizmi: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="16" y="16" width="54" height="54" class="v0"/><rect x="70" y="16" width="34" height="54" class="v1"/><rect x="16" y="70" width="54" height="34" class="v1"/><rect x="70" y="70" width="34" height="34" class="v2"/></svg>`,
  fibonacci: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M14 30H110V90H14ZM74 30V90M14 66H74M50 66V90" class="v0" style="opacity:.55"/><path d="M110 90A60 60 0 0 0 50 30A36 36 0 0 0 14 66A24 24 0 0 0 38 90A12 12 0 0 0 50 78" class="v1"/></svg>`,
  partis: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 60V18A42 42 0 1 1 18 60Z" class="v2"/><circle cx="60" cy="60" r="42" class="v0"/><path d="M60 18V60H18" class="v1"/></svg>`,
  newton: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M10 84H110" class="v0"/><path d="M18 100C50 96 80 70 100 14" class="v0"/><path d="M52 104L104 4" class="v1"/><circle cx="90" cy="31" r="5" class="vn"/><circle cx="62.5" cy="84" r="4" class="vp"/></svg>`,
  galois: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 18L100 90H20Z" class="v0"/><path d="M40 34A44 44 0 0 1 80 34M104 70A44 44 0 0 1 78 104M42 104A44 44 0 0 1 16 70" class="v1"/><circle cx="60" cy="18" r="6" class="vn"/><circle cx="100" cy="90" r="6" class="vn"/><circle cx="20" cy="90" r="6" class="vn"/></svg>`,
  cantor: `<svg viewBox="0 0 120 120" aria-hidden="true">${[0, 1, 2, 3].map(k => `<rect x="${16 + 22 * k}" y="${16 + 22 * k}" width="22" height="22" class="v2"/>`).join("")}<path d="M16 16H104V104H16ZM38 16V104M60 16V104M82 16V104M16 38H104M16 60H104M16 82H104" class="v0"/></svg>`,
  hilbert: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M8 96H112" class="v0"/><rect x="12" y="40" width="26" height="56" class="v1"/><rect x="44" y="52" width="20" height="44" class="v0"/><rect x="70" y="62" width="15" height="34" class="v0"/><rect x="90" y="70" width="11" height="26" class="v0"/><circle cx="32" cy="70" r="2.2" class="vp"/><circle cx="106" cy="84" r="1.6" class="vp"/><circle cx="111" cy="86" r="1.2" class="vp"/></svg>`,
  turing: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M4 50H116V78H4M28 50V78M52 50V78M76 50V78M100 50V78" class="v0"/><rect x="52" y="50" width="24" height="28" class="v2"/><path d="M64 44L54 26H74Z" class="v1"/><circle cx="16" cy="64" r="3" class="vp"/><circle cx="88" cy="64" r="3" class="vp"/></svg>`,
});

function frise() {
  const pts = [...ESCALES().map(c => ({ an: c.an, date: c.date, nom: c.court || c.titre, genre: c.genre, c })), ...A_VENIR].sort((a, b) => a.an - b.an);
  const PAS = 64, X0 = 56, W = X0 * 2 + PAS * (pts.length - 1), Y = 96;
  return `<div class="chrono-defile" tabindex="0" role="group" aria-label="Frise chronologique des escales, de Babylone à aujourd'hui"><svg class="chrono" viewBox="0 0 ${W} 192" style="min-width:960px">
    <path d="M${X0 - 34} ${Y}H${W - X0 + 34}" class="axe"/><path d="M${W - X0 + 34} ${Y}l-9-5v10z" class="pointe"/>
    ${pts.map((p, k) => {
      const x = X0 + k * PAS, haut = k % 2 === 0, mots = p.nom.split(" "), lignes = [""];
      mots.forEach(m => { if ((lignes[lignes.length - 1] + " " + m).trim().length > 14) lignes.push(m); else lignes[lignes.length - 1] = (lignes[lignes.length - 1] + " " + m).trim(); });
      const y0 = haut ? Y - 34 - (lignes.length - 1) * 13 : Y + 44;
      const corps = `<path d="M${x} ${Y}V${haut ? Y - 22 : Y + 22}" class="tige"/><circle cx="${x}" cy="${Y}" r="${p.c ? 8 : 5}" class="pt ${p.genre} ${p.c ? (avancement(p.c).fini ? "fait" : "ouvert") : "avenir"}"/>
        <text x="${x}" y="${haut ? Y + 24 : Y - 16}" class="an">${p.an < 0 ? "−" + (-p.an) : p.an}</text>
        <text x="${x}" y="${y0}" class="nom ${p.c ? "" : "avenir"}">${lignes.map((l, j) => `<tspan x="${x}" dy="${j ? 13 : 0}">${h(l)}</tspan>`).join("")}</text>`;
      return p.c ? `<a href="#/c/${p.c.id}/${premierAFaire(p.c)}" aria-label="${h(p.nom)}, ${h(p.date)}">${corps}</a>` : `<g aria-label="${h(p.nom)}, ${h(p.date)}, escale à venir">${corps}</g>`;
    }).join("")}
  </svg></div>`;
}

let heroMinuterie = null;
function vueAccueil() {
  const suite = prochainChapitre(), commence = Object.keys(S.faits).length > 0, liste = ESCALES();
  const lien = suite ? `#/c/${suite.id}/${premierAFaire(suite)}` : "#/profil";
  app().innerHTML = `
  <section class="hero">
    <div class="hero-texte">
      <h1>Refais les gestes qui ont fait les mathématiques.</h1>
      <p>Dix-sept escales, de Babylone à Berkeley. À chaque escale, un problème à affronter, une méthode à essayer de tes mains, puis l'histoire de celles et ceux qui l'ont résolu.</p>
      <div class="hero-actions">
      <a class="btn gros" href="${lien}">${!suite ? "Voir mon profil" : commence ? `Reprendre : ${h(suite.titre)}` : "Commencer le voyage"}</a><a class="btn gros secondaire" href="#/problemes">Tenter un problème</a></div>
    </div>
    <figure class="hero-fig">
      <div class="hero-svg"></div>
      <figcaption><span class="hero-n"></span><span class="hero-enc"></span><span class="hero-leg">Syracuse, vers 250 av. J.-C. Archimède coince π entre deux polygones.</span></figcaption>
    </figure>
  </section>
  <div class="ruban-pi" aria-hidden="true"><div><span>π = 3,1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679… </span><span>π = 3,1415926535 8979323846 2643383279 5028841971 6939937510 5820974944 5923078164 0628620899 8628034825 3421170679… </span></div></div>
  <section class="route" aria-labelledby="t-route">
    <h2 id="t-route">La route</h2>
    <p class="route-intro">Trente-huit siècles de mathématiques. Suis la route dans l'ordre, ou saute directement à l'escale qui t'intrigue.</p>
    ${frise()}
    <p class="chrono-legende"><span class="methode">Méthode</span><span class="paradoxe">Paradoxe</span><span class="figure">Figure en son temps</span>${A_VENIR.length ? `<span class="avenir">À venir</span>` : ""}</p>
  </section>
  <section aria-labelledby="t-escales">
    <h2 id="t-escales" class="sr">Les escales</h2>
    ${PARCOURS.filter(ep => ep.chapitres.length).map(ep => `<h3 class="ep-titre ep-${ep.id}"><span>${h(ep.titre)}</span> ${h(ep.sous)}</h3>
    <ol class="escales">${ep.chapitres.map(c => {
      const a = avancement(c), s = etoilesChap(c);
      return `<li class="${c.genre} ep-${ep.id} ${a.fini ? "fait" : ""}"><a href="#/c/${c.id}/${premierAFaire(c)}">
        <span class="quand"><span class="epoque">${h(ep.titre)}</span><span class="date">${h(c.date).replace("av. J.-C.", '<span class="nb">av. J.-C.</span>')}</span><span class="lieu">${h(c.lieu)}</span></span>
        <span class="quoi"><span class="genre">${GENRES[c.genre]}</span><strong>${h(c.titre)}</strong><span class="accroche">${h(c.accroche)}</span>
          <span class="etat">${a.f > 0 ? `${a.f} étape${a.f > 1 ? "s" : ""} sur ${a.n} ${etoilesHtml(s.n ? Math.max(1, Math.round(3 * s.n / s.max)) : 0)}` : `${a.n} étapes`}<span class="niveau">${h(c.niveau)}</span></span></span>
        <span class="vignette">${VIGNETTES[c.id] || ""}</span></a></li>`;
    }).join("")}</ol>`).join("")}
  </section>`;
  /* Un seul mouvement à l'arrivée : les polygones doublent leurs côtés, comme chez Archimède. */
  clearInterval(heroMinuterie);
  const poser = n => { if (!$(".hero-svg")) return clearInterval(heroMinuterie); $(".hero-svg").innerHTML = figArchimede(n); $(".hero-n").textContent = `${n} côtés`; $(".hero-enc").innerHTML = encadrement(n, 4).html; };
  if (calme()) poser(96);
  else { const suiteN = [6, 12, 24, 48, 96]; let k = 0; poser(6); heroMinuterie = setInterval(() => { k++; poser(suiteN[k]); if (k === suiteN.length - 1) clearInterval(heroMinuterie); }, 1100); }
}

/* ============================================================
   Époques : chaque escale et chaque problème s'ouvre sur un bandeau aux couleurs de son temps
   ============================================================ */
const EPOQUES = { ant: "Antiquité", moy: "Moyen Âge", mod: "Temps modernes", cont: "Époque contemporaine" };
const dateNb = d => h(d).replace("av. J.-C.", '<span class="nb">av. J.-C.</span>');
function bandeEpoque(ep, lieu, date) {
  return `<div class="bande-epoque" role="presentation"><div class="bande-int"><span class="bande-nom">${EPOQUES[ep]}</span><span class="bande-lieu">${h(lieu)}, ${dateNb(date)}</span></div><div class="bande-frise" aria-hidden="true"></div></div>`;
}

/* ============================================================
   Problèmes : des énigmes historiques pour se mesurer aux anciens
   ============================================================ */
const lireNombre = s => {
  const t = String(s).replace(/[\s  ]/g, "").replace(/,/g, ".").replace(/−/g, "-");
  const f = t.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (f) return +f[2] ? +f[1] / +f[2] : NaN;
  return /^-?\d+(?:\.\d+)?$/.test(t) ? +t : NaN;
};

function etapeReponse(z, c, i, e) {
  let essais = 0, aides = 0, fini = false;
  z.innerHTML = `<h1>${h(e.titre)}</h1><div class="prose enonce-pb">${e.enonce}</div>
    <form class="reponse-pb" autocomplete="off"><label for="rep">Ta réponse</label><div class="rep-ligne"><input id="rep" type="text" inputmode="decimal" autocomplete="off" spellcheck="false"><button class="btn" type="submit">Valider</button>${e.indices && e.indices.length ? `<button class="btn secondaire" type="button" id="aide">Un indice</button>` : ""}</div></form>
    <div class="retour-qcm" aria-live="polite"></div><ol class="indices-pb"></ol>`;
  const champ = $("#rep", z), retour = $(".retour-qcm", z);
  if ($("#aide", z)) $("#aide", z).onclick = () => {
    if (aides >= e.indices.length) return;
    $(".indices-pb", z).insertAdjacentHTML("beforeend", `<li>${h(e.indices[aides])}</li>`); aides++;
    if (aides >= e.indices.length) $("#aide", z).disabled = true;
  };
  $("form", z).onsubmit = ev => {
    ev.preventDefault(); if (fini) return;
    const v = lireNombre(champ.value);
    if (Number.isNaN(v)) { retour.textContent = "Écris un nombre : un entier, un décimal à virgule ou une fraction comme 7/3."; return; }
    essais++;
    if (Math.abs(v - e.reponse) <= (e.tol || 1e-9)) {
      fini = true; champ.disabled = true; champ.classList.add("bon"); retour.textContent = "";
      bandeauSucces(z, c, i, Math.max(1, 3 - (aides ? 1 : 0) - (essais > 3 ? 1 : 0)), e.expl);
      if (e.histoire) z.insertAdjacentHTML("beforeend", e.histoire);
    } else retour.textContent = essais >= 3 && e.indices && aides < e.indices.length ? "Ce n'est pas ça. Un indice peut t'aider à repartir." : "Ce n'est pas ça. Vérifie ton raisonnement et réessaie.";
  };
}

function vueProblemes() {
  const jour = DEFIS.etapes.length ? defiDuJour() : -1, faits = DEFIS.etapes.filter((e, i) => S.faits[idEtape(DEFIS, i)]).length;
  app().innerHTML = `<section class="page problemes">
    <header class="pb-tete"><h1>Problèmes</h1><p>Onze énigmes qui ont occupé des scribes, des marchands, des généraux et des académiciens. Pas de leçon ici : un énoncé, ta tête, parfois Python. Chaque problème résolu rapporte 50 points.</p>
    <p class="pb-score"><strong>${faits}</strong> sur ${DEFIS.etapes.length} résolus</p></header>
    <ol class="pb-liste">${DEFIS.etapes.map((e, i) => {
      const f = S.faits[idEtape(DEFIS, i)], duJour = i === jour && S.defiJour !== aujourdhui() && !f;
      return `<li class="ep-${e.ep} ${f ? "fait" : ""}"><a href="#/p/${i}">
        <span class="pb-date">${dateNb(e.date)}</span>
        <strong>${h(e.titre)}</strong>
        <span class="pb-acc">${h(e.accroche)}</span>
        <span class="pb-meta"><span class="pb-diff" aria-label="Difficulté ${e.d} sur 3">${"●".repeat(e.d)}<span class="vide">${"●".repeat(3 - e.d)}</span></span><span>${e.t === "code" ? "En Python" : "À la main"}</span>${f ? etoilesHtml(f.e) : duJour ? `<span class="pb-jour">Problème du jour, points doublés</span>` : ""}</span>
      </a></li>`; }).join("")}</ol></section>`;
}

function vueProbleme(i) {
  const e = DEFIS.etapes[i], n = DEFIS.etapes.length;
  document.body.dataset.epoque = e.ep;
  app().innerHTML = `${bandeEpoque(e.ep, e.origine, e.date)}
  <div class="fil"><a href="#/problemes" class="retour">Problèmes</a><span class="fil-titre">Problème ${i + 1} sur ${n}<span class="pb-diff" aria-label="Difficulté ${e.d} sur 3"> ${"●".repeat(e.d)}<span class="vide">${"●".repeat(3 - e.d)}</span></span></span></div>
  <article class="etape etape-${e.t}"></article>
  <nav class="etape-nav" aria-label="Navigation entre les problèmes">${i > 0 ? `<a href="#/p/${i - 1}">Problème précédent</a>` : "<span></span>"}${i + 1 < n ? `<a href="#/p/${i + 1}">Problème suivant</a>` : `<a href="#/problemes">Tous les problèmes</a>`}</nav>`;
  ({ reponse: etapeReponse, code: etapeCode, qcm: etapeQcm, quiz: etapeQuiz })[e.t]($(".etape"), DEFIS, i, e);
}
