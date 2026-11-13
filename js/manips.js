"use strict";
/* Périple — manipulations des escales ajoutées après le pilote.
   Chargé après periple.js. Deux familles :
     - widgets de questionnaire (à côté d'un quiz) : f(zone) renvoie { reveler() } ; enregistrés dans WIDGETS_QUIZ ;
     - manipulations à objectif : f(zone, ok) appelle ok(étoiles) quand l'objectif est atteint ; enregistrées dans MANIPS. */

const sv = (v, d) => v.toFixed(d).replace(".", ",");
/* Écrit x avec d décimales en mettant en gras les chiffres communs avec la valeur exacte. */
function chiffresSurs(x, exact, d = 10) {
  const a = x.toFixed(d), b = exact.toFixed(d); let k = 0;
  while (k < a.length && a[k] === b[k]) k++;
  return `<b>${a.slice(0, k).replace(".", ",")}</b>${a.slice(k).replace(".", ",")}`;
}

/* ---------- Babylone : la moyenne des deux côtés d'un rectangle d'aire 2 ---------- */
function widgetHeron(z) {
  let depart = 1, xs = [1];
  z.innerHTML = `<div class="mcarte heron"><div class="heron-fig"></div><div class="mcol">
    <p class="mtitre">Un rectangle d'aire 2, à rendre carré</p>
    <div class="actions"><button class="btn" id="h-moy">Faire la moyenne des deux côtés</button><button class="btn secondaire" id="h-1">Repartir de 1</button><button class="btn secondaire" id="h-2">Repartir de 2</button></div>
    <table class="donnees mtable"><thead><tr><th>Étape</th><th>Côté</th><th>Autre côté</th><th>Carré du côté</th></tr></thead><tbody></tbody></table>
    <p class="muet">En gras : les chiffres déjà exacts de √2.</p></div></div>`;
  const maj = () => {
    const x = xs[xs.length - 1], y = 2 / x, E = 105;
    $(".heron-fig", z).innerHTML = `<svg viewBox="0 0 240 240" role="img" aria-label="Rectangle de côtés ${sv(x, 4)} et ${sv(y, 4)}"><rect x="12" y="12" width="${E * Math.SQRT2}" height="${E * Math.SQRT2}" class="cible"/><rect x="12" y="12" width="${E * x}" height="${E * y}" class="plein"/><text x="${12 + E * x / 2}" y="${24 + E * y}" class="cote">${sv(x, 4)}</text><text x="${20 + E * x}" y="${16 + E * y / 2}" class="cote g">${sv(y, 4)}</text></svg>`;
    $("tbody", z).innerHTML = xs.map((v, k) => `<tr class="${k === xs.length - 1 ? "ici" : ""}"><td>${k}</td><td>${chiffresSurs(v, Math.SQRT2)}</td><td>${sv(2 / v, 10)}</td><td>${sv(v * v, 10)}</td></tr>`).join("");
    $("#h-moy", z).disabled = xs.length > 6;
  };
  $("#h-moy", z).onclick = () => { const x = xs[xs.length - 1]; xs.push((x + 2 / x) / 2); maj(); };
  $("#h-1", z).onclick = () => { xs = [1]; maj(); }; $("#h-2", z).onclick = () => { xs = [2]; maj(); };
  maj(); return { reveler() {} };
}

/* ---------- Pythagore : chercher une fraction dont le carré vaut 2 ---------- */
function manipChasse(z, ok) {
  const essais = []; let valide = false;
  z.innerHTML = `<div class="mcarte"><div class="mcol">
    <form class="chasse-form"><label>Numérateur <input id="c-p" type="number" min="1" max="99999" value="7"></label><span class="sur">/</span><label>Dénominateur <input id="c-q" type="number" min="1" max="99999" value="5"></label><button class="btn" type="submit">Tester cette fraction</button></form>
    <p class="metat" aria-live="polite">Propose une fraction p/q. On compare p² et 2 × q² : s'ils sont égaux, le carré de la fraction vaut exactement 2.</p>
    <table class="donnees mtable"><thead><tr><th>Fraction</th><th>Valeur</th><th>p²</th><th>2 × q²</th><th>Écart</th></tr></thead><tbody></tbody></table>
    <p class="muet" id="c-reste"></p></div></div>`;
  $("form", z).onsubmit = ev => {
    ev.preventDefault();
    const p = Math.round(+$("#c-p", z).value), q = Math.round(+$("#c-q", z).value), etat = $(".metat", z);
    if (!(p >= 1 && q >= 1 && p < 1e5 && q < 1e5)) { etat.textContent = "Écris deux entiers positifs, inférieurs à 100 000."; return; }
    const e = p * p - 2 * q * q;
    if (!essais.some(t => t.p === p && t.q === q)) essais.push({ p, q, e });
    essais.sort((a, b) => Math.abs(a.p / a.q - Math.SQRT2) - Math.abs(b.p / b.q - Math.SQRT2));
    etat.textContent = Math.abs(e) === 1 ? `${p}/${q} : il ne manque qu'une unité. Si près, et pourtant pas égal.` : e > 0 ? `${p}/${q} est trop grand : p² dépasse 2 × q² de ${e}.` : `${p}/${q} est trop petit : il manque ${-e} à p².`;
    $("tbody", z).innerHTML = essais.map(t => `<tr><td>${t.p}/${t.q}</td><td>${sv(t.p / t.q, 8)}</td><td>${(t.p * t.p).toLocaleString("fr-FR")}</td><td>${(2 * t.q * t.q).toLocaleString("fr-FR")}</td><td>${t.e > 0 ? "+" : "−"}${Math.abs(t.e).toLocaleString("fr-FR")}</td></tr>`).join("");
    $("#c-reste", z).textContent = essais.length < 5 ? `Encore ${5 - essais.length} fraction${5 - essais.length > 1 ? "s" : ""} à tester. Essaie de faire tomber l'écart à zéro.` : "L'écart ne tombe jamais à zéro. Hasard, ou impossibilité ?";
    if (essais.length >= 5 && !valide) { valide = true; ok(3); }
  };
}

/* ---------- Zénon : Achille rejoint la position précédente de la tortue ---------- */
function widgetZenon(z) {
  let k = 0;
  z.innerHTML = `<div class="mcarte"><div class="mcol"><div class="zenon-fig"></div>
    <div class="actions"><button class="btn" id="z-suiv">Étape suivante de Zénon</button><button class="btn secondaire" id="z-raz">Recommencer</button></div>
    <table class="donnees mtable"><thead><tr><th>Étape</th><th>Durée de l'étape</th><th>Temps écoulé</th><th>Achille</th><th>Tortue</th></tr></thead><tbody></tbody></table></div></div>`;
  const temps = n => { let t = 0; for (let j = 0; j < n; j++) t += 10 / 10 ** j; return t; };
  const maj = () => {
    const t = temps(k), a = 10 * t, to = 100 + t, X = v => 20 + (v - 0) * 4.2;
    $(".zenon-fig", z).innerHTML = `<svg viewBox="0 0 560 96" role="img" aria-label="Achille à ${sv(a, 2)} mètres, la tortue à ${sv(to, 2)} mètres"><path d="M20 60H540" class="axe"/>${[0, 25, 50, 75, 100, 120].map(v => `<path d="M${X(v)} 56V64" class="axe"/><text x="${X(v)}" y="82" class="gradu">${v} m</text>`).join("")}
      <circle cx="${X(a)}" cy="46" r="9" class="achille"/><circle cx="${X(to)}" cy="46" r="7" class="tortue"/><text x="${X(a)}" y="26" class="nomf">Achille</text><text x="${X(to) + (to - a < 14 ? 34 : 0)}" y="${to - a < 14 ? 14 : 26}" class="nomf">tortue</text></svg>`;
    $("tbody", z).innerHTML = Array.from({ length: k + 1 }, (_, j) => `<tr class="${j === k ? "ici" : ""}"><td>${j}</td><td>${j ? sv(10 / 10 ** (j - 1), Math.max(0, j - 2)) + " s" : ""}</td><td>${sv(temps(j), Math.max(0, j - 1))} s</td><td>${sv(10 * temps(j), Math.max(0, j - 2))} m</td><td>${sv(100 + temps(j), Math.max(0, j - 1))} m</td></tr>`).join("");
    $("#z-suiv", z).disabled = k >= 7;
  };
  $("#z-suiv", z).onclick = () => { k++; maj(); }; $("#z-raz", z).onclick = () => { k = 0; maj(); };
  maj(); return { reveler() {} };
}

/* ---------- Euclide : retirer d'un rectangle le plus grand carré possible ---------- */
function widgetEuclide(z) {
  const CAS = [[48, 18], [21, 15], [34, 21], [35, 12]], TEINTES = ["var(--p1)", "var(--p2)", "var(--soleil)", "var(--p3)", "var(--ecaille)", "var(--corail)"];
  let A, B, r, carres, journal;
  z.innerHTML = `<div class="mcarte"><div class="mcol"><div class="actions" role="group" aria-label="Choix du rectangle">${CAS.map(([a, b], k) => `<button class="btn secondaire cas" data-k="${k}">${a} × ${b}</button>`).join("")}</div>
    <div class="euclide-fig"></div><div class="actions"><button class="btn" id="e-couper">Retirer le plus grand carré possible</button></div>
    <ol class="mjournal"></ol><p class="metat" aria-live="polite"></p></div></div>`;
  const init = k => { [A, B] = CAS[k]; r = { x: 0, y: 0, w: A, h: B }; carres = []; journal = []; $$(".cas", z).forEach((b, j) => b.setAttribute("aria-pressed", j === k)); maj(); };
  const maj = () => {
    const E = 520 / A, cotes = [...new Set(carres.map(c => c.c))];
    $(".euclide-fig", z).innerHTML = `<svg viewBox="-2 -2 524 ${B * E + 4}" role="img" aria-label="Rectangle de ${A} sur ${B} découpé en carrés"><rect width="${A * E}" height="${B * E}" class="reste"/>${carres.map(c => `<rect x="${c.x * E}" y="${c.y * E}" width="${c.c * E}" height="${c.c * E}" class="carre" style="fill:${TEINTES[cotes.indexOf(c.c) % TEINTES.length]}"/>${c.c * E > 26 ? `<text x="${(c.x + c.c / 2) * E}" y="${(c.y + c.c / 2) * E + 6}" class="cc">${c.c}</text>` : ""}`).join("")}</svg>`;
    $(".mjournal", z).innerHTML = journal.map(l => `<li>${l}</li>`).join("");
    const fini = r.w === 0 || r.h === 0;
    $("#e-couper", z).disabled = fini;
    $(".metat", z).textContent = fini ? `Il ne reste rien. Le dernier carré a pour côté ${carres[carres.length - 1].c} : c'est le plus grand carré qui pave tout le rectangle, le PGCD de ${A} et ${B}.` : `Il reste un rectangle de ${Math.max(r.w, r.h)} sur ${Math.min(r.w, r.h)}.`;
  };
  $("#e-couper", z).onclick = () => {
    const c = Math.min(r.w, r.h), g = Math.max(r.w, r.h), n = Math.floor(g / c);
    for (let j = 0; j < n; j++) { carres.push({ x: r.x, y: r.y, c }); if (r.w >= r.h) { r.x += c; r.w -= c; } else { r.y += c; r.h -= c; } }
    journal.push(`${g} = ${n} × ${c} + ${g - n * c} <span class="muet">(${n} carré${n > 1 ? "s" : ""} de côté ${c})</span>`); maj();
  };
  $$(".cas", z).forEach(b => b.onclick = () => init(+b.dataset.k));
  init(0); return { reveler() {} };
}

/* ---------- Ératosthène : le crible, de 2 à 100 ---------- */
function manipCrible(z, ok) {
  const etat = Array(101).fill("libre"); let erreurs = 0, fini = false;
  z.innerHTML = `<div class="mcarte"><div class="mcol"><p class="metat" aria-live="polite">Clique sur le plus petit nombre encore libre : il est premier, et tous ses multiples seront barrés.</p>
    <div class="crible" role="group" aria-label="Les nombres de 1 à 100">${Array.from({ length: 100 }, (_, k) => `<button data-n="${k + 1}" ${k === 0 ? "disabled class='un'" : ""}>${k + 1}</button>`).join("")}</div>
    <p class="muet" id="cr-compte"></p></div></div>`;
  const plusPetit = () => { for (let n = 2; n <= 100; n++) if (etat[n] === "libre") return n; return 0; };
  const maj = () => {
    $$(".crible button", z).forEach(b => { const n = +b.dataset.n; if (n > 1) b.className = "c-" + etat[n]; });
    const p = etat.filter(e => e === "premier").length;
    $("#cr-compte", z).textContent = `${p} nombre${p > 1 ? "s" : ""} premier${p > 1 ? "s" : ""} trouvé${p > 1 ? "s" : ""}, ${etat.filter(e => e === "barre").length} nombres barrés.`;
  };
  $$(".crible button", z).forEach(b => b.onclick = () => {
    if (fini) return; const n = +b.dataset.n, m = plusPetit(), msg = $(".metat", z);
    if (etat[n] === "barre") { erreurs++; msg.textContent = `${n} est déjà barré : c'est un multiple d'un nombre premier plus petit.`; return; }
    if (etat[n] === "premier") { msg.textContent = `${n} est déjà reconnu comme premier.`; return; }
    if (n !== m) { erreurs++; msg.textContent = `Pas encore : commence par le plus petit nombre libre. Tant que ${m} n'a pas servi, on ne sait pas si ${n} sera barré.`; return; }
    etat[n] = "premier"; let b2 = 0; for (let k = 2 * n; k <= 100; k += n) if (etat[k] === "libre") { etat[k] = "barre"; b2++; }
    const suiv = plusPetit();
    if (suiv * suiv > 100) {
      for (let k = 2; k <= 100; k++) if (etat[k] === "libre") etat[k] = "premier";
      fini = true; msg.textContent = `${n} est premier. Le suivant serait ${suiv}, mais ${suiv} × ${suiv} dépasse 100 : il ne reste plus rien à barrer. Tous les nombres encore libres sont premiers.`;
      maj(); ok(erreurs <= 1 ? 3 : erreurs <= 4 ? 2 : 1); return;
    }
    msg.textContent = `${n} est premier : ${b2} multiple${b2 > 1 ? "s" : ""} barré${b2 > 1 ? "s" : ""}. Quel est maintenant le plus petit nombre libre ?`; maj();
  });
  maj();
}

/* ---------- Brahmagupta : écrire un nombre en colonnes, avec ou sans signe pour le vide ---------- */
function widgetPosition(z) {
  const v = [2, 0, 4], NOMS = ["Centaines", "Dizaines", "Unités"];
  z.innerHTML = `<div class="mcarte"><div class="mcol"><div class="colonnes">${NOMS.map((n, k) => `<div class="colonne"><span class="col-nom">${n}</span><div class="jetons" data-k="${k}"></div><div class="actions"><button class="btn secondaire" data-k="${k}" data-d="-1" aria-label="Retirer un jeton aux ${n.toLowerCase()}">−</button><button class="btn secondaire" data-k="${k}" data-d="1" aria-label="Ajouter un jeton aux ${n.toLowerCase()}">+</button></div></div>`).join("")}</div>
    <dl class="mchiffres"><div><dt>Sans signe pour la colonne vide</dt><dd id="p-sans"></dd></div><div><dt>Avec un signe pour le vide</dt><dd id="p-avec"></dd></div></dl></div></div>`;
  const maj = () => {
    $$(".jetons", z).forEach(j => { const n = v[+j.dataset.k]; j.innerHTML = n ? "<i></i>".repeat(n) : `<span class="vide">vide</span>`; });
    const sans = v.filter(n => n > 0).join(" ");
    $("#p-sans", z).textContent = sans || "(rien à écrire)"; $("#p-avec", z).textContent = String(v[0] * 100 + v[1] * 10 + v[2]);
  };
  $$("button[data-d]", z).forEach(b => b.onclick = () => { const k = +b.dataset.k; v[k] = Math.max(0, Math.min(9, v[k] + +b.dataset.d)); maj(); });
  maj(); return { reveler() {} };
}

/* ---------- Al-Khwarizmi : compléter le carré ---------- */
function widgetCarre(z) {
  const CAS = [[10, 39], [6, 16], [8, 33], [4, 21]]; let b, c, pas;
  z.innerHTML = `<div class="mcarte carre"><div class="carre-fig"></div><div class="mcol">
    <div class="actions" role="group" aria-label="Choix de l'équation">${CAS.map(([B, C], k) => `<button class="btn secondaire cas" data-k="${k}">x² + ${B}x = ${C}</button>`).join("")}</div>
    <p class="metat" aria-live="polite"></p>
    <div class="actions"><button class="btn" id="k-suiv">Étape suivante</button><button class="btn secondaire" id="k-prec">Revenir</button></div></div></div>`;
  const maj = () => {
    const m = b / 2, x = Math.sqrt(c + m * m) - m, T = x + m, E = 200 / T, o = 24, X = x * E, M = m * E;
    $(".carre-fig", z).innerHTML = `<svg viewBox="0 0 250 250" role="img" aria-label="Figure de la complétion du carré, étape ${pas + 1} sur 4">
      <rect x="${o}" y="${o}" width="${X}" height="${X}" class="k-x2"/><text x="${o + X / 2}" y="${o + X / 2 + 6}" class="cc">x²</text>
      ${pas >= 1 ? `<rect x="${o + X}" y="${o}" width="${M}" height="${X}" class="k-bx"/><rect x="${o}" y="${o + X}" width="${X}" height="${M}" class="k-bx"/><text x="${o + X + M / 2}" y="${o + X / 2 + 6}" class="cc">${m}x</text><text x="${o + X / 2}" y="${o + X + M / 2 + 6}" class="cc">${m}x</text>` : ""}
      ${pas >= 2 ? `<rect x="${o + X}" y="${o + X}" width="${M}" height="${M}" class="k-coin"/><text x="${o + X + M / 2}" y="${o + X + M / 2 + 6}" class="cc">${m * m}</text>` : ""}
      <text x="${o + X / 2}" y="${o - 8}" class="cote">${pas >= 3 ? x : "x"}</text>${pas >= 1 ? `<text x="${o + X + M / 2}" y="${o - 8}" class="cote">${m}</text>` : ""}</svg>`;
    $(".metat", z).innerHTML = [
      `Un carré de côté <span class="m">x</span>, que l'on ne connaît pas. Son aire est <span class="m">x</span>².`,
      `On lui ajoute ${b}<span class="m">x</span>, partagé en deux rectangles de côtés ${m} et <span class="m">x</span>. D'après l'équation, l'aire totale vaut ${c}.`,
      `Il manque un coin pour former un grand carré : un petit carré de côté ${m}, donc d'aire ${m * m}.`,
      `Le grand carré a pour aire ${c} + ${m * m} = ${c + m * m} : son côté vaut ${T}. Ce côté mesure aussi <span class="m">x</span> + ${m}, donc <span class="m">x</span> = ${x}.`][pas];
    $("#k-suiv", z).disabled = pas >= 3; $("#k-prec", z).disabled = pas <= 0;
  };
  const init = k => { [b, c] = CAS[k]; pas = 0; $$(".cas", z).forEach((bt, j) => bt.setAttribute("aria-pressed", j === k)); maj(); };
  $("#k-suiv", z).onclick = () => { pas++; maj(); }; $("#k-prec", z).onclick = () => { pas--; maj(); };
  $$(".cas", z).forEach(bt => bt.onclick = () => init(+bt.dataset.k));
  init(0); return { reveler() {} };
}

/* ---------- Fibonacci : chiffres romains, puis lapins ---------- */
function enRomain(n) { let s = ""; [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].forEach(([v, t]) => { while (n >= v) { s += t; n -= v; } }); return s; }
function widgetRomain(z) {
  z.innerHTML = `<div class="mcarte"><div class="mcol"><label for="r-n">Un nombre entre 1 et 3 999</label><div class="rep-ligne"><input id="r-n" type="number" min="1" max="3999" value="1202"></div>
    <dl class="mchiffres"><div><dt>En chiffres romains</dt><dd id="r-rom"></dd></div><div><dt>Nombre de signes</dt><dd id="r-len"></dd></div></dl>
    <p class="muet">Essaie 37, 24, puis leur produit 888. Rien, dans l'écriture romaine, n'aide à passer des deux premiers au troisième.</p></div></div>`;
  const maj = () => { const n = Math.round(+$("#r-n", z).value); const ok = n >= 1 && n <= 3999; $("#r-rom", z).textContent = ok ? enRomain(n) : "Hors limites"; $("#r-len", z).textContent = ok ? `${enRomain(n).length} en chiffres romains, ${String(n).length} en chiffres indo-arabes` : ""; };
  $("#r-n", z).oninput = maj; maj(); return { reveler() {} };
}
function widgetLapins(z) {
  let mois = 0; const etats = [[1, 0]];
  z.innerHTML = `<div class="mcarte"><div class="mcol"><div class="enclos" aria-hidden="true"></div>
    <div class="actions"><button class="btn" id="l-suiv">Mois suivant</button><button class="btn secondaire" id="l-raz">Recommencer</button></div>
    <table class="donnees mtable"><thead><tr><th>Mois</th><th>Couples adultes</th><th>Jeunes couples</th><th>Total</th><th>Total ÷ total précédent</th></tr></thead><tbody></tbody></table>
    <p class="muet">Grand disque : couple adulte, qui donne naissance chaque mois. Petit disque : jeune couple, adulte le mois suivant.</p></div></div>`;
  const maj = () => {
    const [a, j] = etats[mois];
    $(".enclos", z).innerHTML = "<i class='ad'></i>".repeat(a) + "<i class='je'></i>".repeat(j);
    $("tbody", z).innerHTML = etats.slice(0, mois + 1).map(([x, y], k) => `<tr class="${k === mois ? "ici" : ""}"><td>${k}</td><td>${x}</td><td>${y}</td><td>${x + y}</td><td>${k ? sv((x + y) / (etats[k - 1][0] + etats[k - 1][1]), 4) : ""}</td></tr>`).join("");
    $("#l-suiv", z).disabled = mois >= 12;
  };
  $("#l-suiv", z).onclick = () => { const [a, j] = etats[mois]; mois++; etats[mois] = [a + j, a]; maj(); };
  $("#l-raz", z).onclick = () => { mois = 0; etats.length = 1; maj(); };
  maj(); return { reveler() {} };
}

/* ---------- Pascal et Fermat : finir mille fois la partie interrompue ---------- */
function widgetPartis(z) {
  let a = 1, b = 2, n = 0, g = 0, revele = false;
  const exact = (x, y) => x === 0 ? 1 : y === 0 ? 0 : (exact(x - 1, y) + exact(x, y - 1)) / 2;
  z.innerHTML = `<div class="mcarte"><div class="mcol">
    <div class="partis-choix"><label>Manches qui manquent au premier joueur <select id="pa-a"><option>1</option><option>2</option><option>3</option></select></label><label>Manches qui manquent au second <select id="pa-b"><option>1</option><option selected>2</option><option>3</option></select></label></div>
    <div class="actions"><button class="btn" id="pa-jouer">Finir 1 000 fois la partie</button><button class="btn secondaire" id="pa-raz">Remettre à zéro</button></div>
    <div class="partage" aria-hidden="true"><span class="pa-1"></span><span class="pa-2"></span></div>
    <dl class="mchiffres"><div><dt>Parties terminées</dt><dd id="pa-n">0</dd></div><div><dt>Gagnées par le premier joueur</dt><dd id="pa-g">0</dd></div><div><dt>Sa part des 64 pistoles</dt><dd id="pa-part"></dd></div></dl>
    <p class="muet" id="pa-exact"></p></div></div>`;
  const maj = () => {
    const f = n ? g / n : 0.5;
    $(".pa-1", z).style.width = (100 * f) + "%"; $("#pa-n", z).textContent = n.toLocaleString("fr-FR");
    $("#pa-g", z).textContent = n ? `${g.toLocaleString("fr-FR")}, soit ${sv(f, 3)}` : "0"; $("#pa-part", z).textContent = n ? `environ ${sv(64 * f, 1)}` : "à simuler";
    $("#pa-exact", z).textContent = revele ? `Valeur exacte : le premier joueur gagne avec une probabilité de ${sv(exact(a, b), 4)}, soit ${sv(64 * exact(a, b), 0)} pistoles.` : "";
  };
  $("#pa-jouer", z).onclick = () => { for (let k = 0; k < 1000; k++) { let x = a, y = b; while (x && y) Math.random() < 0.5 ? x-- : y--; n++; if (!x) g++; } maj(); };
  const raz = () => { a = +$("#pa-a", z).value; b = +$("#pa-b", z).value; n = g = 0; maj(); };
  $("#pa-raz", z).onclick = raz; $("#pa-a", z).onchange = raz; $("#pa-b", z).onchange = raz;
  maj(); return { reveler() { revele = true; maj(); } };
}

/* ---------- Newton : suivre la tangente jusqu'à l'axe ---------- */
function widgetNewton(z) {
  const f = x => x ** 3 - 2 * x - 5, d = x => 3 * x * x - 2, RACINE = 2.0945514815423265;
  let xs = [3];
  const X0 = 1.4, X1 = 3.3, Y0 = -9, Y1 = 26, W = 520, H = 300, px = x => 30 + (x - X0) / (X1 - X0) * (W - 40), py = y => H - 24 - (y - Y0) / (Y1 - Y0) * (H - 40);
  z.innerHTML = `<div class="mcarte"><div class="mcol"><div class="newton-fig"></div>
    <div class="actions"><button class="btn" id="n-tan">Tracer la tangente et la suivre</button><button class="btn secondaire" id="n-3">Partir de 3</button><button class="btn secondaire" id="n-2">Partir de 2</button></div>
    <table class="donnees mtable"><thead><tr><th>Étape</th><th>x</th><th>f(x)</th></tr></thead><tbody></tbody></table>
    <p class="muet">En gras : les chiffres déjà exacts de la solution.</p></div></div>`;
  const maj = () => {
    let courbe = ""; for (let k = 0; k <= 80; k++) { const x = X0 + (X1 - X0) * k / 80; courbe += `${k ? "L" : "M"}${px(x).toFixed(1)} ${py(f(x)).toFixed(1)}`; }
    const tans = xs.slice(0, -1).map((x, k) => `<path d="M${px(x)} ${py(0)}V${py(f(x))}" class="rappel"/><path d="M${px(x)} ${py(f(x))}L${px(xs[k + 1])} ${py(0)}" class="tangente ${k === xs.length - 2 ? "" : "vieux"}"/>`).join("");
    $(".newton-fig", z).innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Courbe de la fonction et tangentes successives"><path d="M${px(X0)} ${py(0)}H${px(X1)}" class="axe"/>${[1.5, 2, 2.5, 3].map(v => `<path d="M${px(v)} ${py(0) - 4}V${py(0) + 4}" class="axe"/><text x="${px(v)}" y="${py(0) + 18}" class="gradu">${String(v).replace(".", ",")}</text>`).join("")}
      <path d="${courbe}" class="courbe"/>${tans}${xs.map((x, k) => `<circle cx="${px(x)}" cy="${py(0)}" r="${k === xs.length - 1 ? 5.5 : 3.5}" class="pt-x ${k === xs.length - 1 ? "ici" : ""}"/>`).join("")}<circle cx="${px(xs[xs.length - 1])}" cy="${py(f(xs[xs.length - 1]))}" r="4" class="pt-c"/></svg>`;
    $("tbody", z).innerHTML = xs.map((x, k) => `<tr class="${k === xs.length - 1 ? "ici" : ""}"><td>${k}</td><td>${chiffresSurs(x, RACINE)}</td><td>${sv(f(x), 8)}</td></tr>`).join("");
    $("#n-tan", z).disabled = xs.length > 6;
  };
  $("#n-tan", z).onclick = () => { const x = xs[xs.length - 1]; xs.push(x - f(x) / d(x)); maj(); };
  $("#n-3", z).onclick = () => { xs = [3]; maj(); }; $("#n-2", z).onclick = () => { xs = [2]; maj(); };
  maj(); return { reveler() {} };
}

/* ---------- Galois : permuter trois racines ---------- */
function widgetPermutations(z) {
  let arr = [0, 1, 2], coups = []; const vus = new Set(["012"]), NOMS = ["x₁", "x₂", "x₃"];
  const TOUS6 = ["012", "021", "102", "120", "201", "210"];
  z.innerHTML = `<div class="mcarte"><div class="mcol"><div class="jetons-perm" aria-live="polite"></div>
    <div class="actions"><button class="btn" id="g-e">Échanger les deux premières</button><button class="btn" id="g-r">Faire tourner les trois</button><button class="btn secondaire" id="g-raz">Recommencer</button></div>
    <p class="metat" id="g-coups"></p>
    <p class="mtitre">Dispositions rencontrées</p><div class="dispositions"></div></div></div>`;
  const maj = () => {
    $(".jetons-perm", z).innerHTML = arr.map(k => `<span class="jp j${k}">${NOMS[k]}</span>`).join("");
    $("#g-coups", z).textContent = coups.length ? `Mouvements effectués : ${coups.join(", puis ")}.` : "Aucun mouvement pour l'instant.";
    $(".dispositions", z).innerHTML = TOUS6.map(s => `<span class="${vus.has(s) ? "vu" : ""} ${s === arr.join("") ? "ici" : ""}">${[...s].map(c => NOMS[+c]).join(" ")}</span>`).join("");
  };
  const coup = (nom, f) => { arr = f(arr); coups.push(nom); if (coups.length > 6) coups.shift(); vus.add(arr.join("")); maj(); };
  $("#g-e", z).onclick = () => coup("échange", a => [a[1], a[0], a[2]]);
  $("#g-r", z).onclick = () => coup("rotation", a => [a[2], a[0], a[1]]);
  $("#g-raz", z).onclick = () => { arr = [0, 1, 2]; coups = []; maj(); };
  maj(); return { reveler() {} };
}

/* ---------- Cantor : la suite diagonale échappe à toute liste ---------- */
function manipDiagonale(z, ok) {
  const N = 7; let modifs = 0, valide = false;
  const T = Array.from({ length: N }, () => Array.from({ length: N }, () => Math.random() < 0.5 ? 0 : 1));
  z.innerHTML = `<div class="mcarte"><div class="mcol"><div class="diag" role="group" aria-label="Liste de suites de 0 et de 1"></div>
    <p class="metat" aria-live="polite"></p><p class="muet" id="d-reste"></p></div></div>`;
  const maj = () => {
    const d = T.map((l, k) => 1 - l[k]);
    $(".diag", z).innerHTML = T.map((l, i) => `<div class="dl"><span class="dn">Suite ${i + 1}</span>${l.map((v, j) => `<button data-i="${i}" data-j="${j}" class="${i === j ? "dd" : ""}" aria-label="Suite ${i + 1}, terme ${j + 1} : ${v}">${v}</button>`).join("")}<span class="dp">…</span></div>`).join("") +
      `<div class="dl dnouv"><span class="dn">Suite fabriquée</span>${d.map(v => `<span class="dc">${v}</span>`).join("")}<span class="dp">…</span></div>`;
    const egale = T.findIndex(l => l.every((v, j) => v === d[j]));
    $(".metat", z).textContent = egale >= 0 ? "Impossible !" : "La suite fabriquée prend, à chaque rang, le contraire du terme encadré. Elle n'est égale à aucune suite de la liste.";
    $("#d-reste", z).textContent = modifs < 8 ? `Modifie les suites pour faire entrer la suite fabriquée dans la liste. Encore ${8 - modifs} modification${8 - modifs > 1 ? "s" : ""} au moins.` : "Chaque fois que tu corriges une suite pour qu'elle lui ressemble, la suite fabriquée change à son tour.";
    $$(".diag button", z).forEach(b => b.onclick = () => { const i = +b.dataset.i, j = +b.dataset.j; T[i][j] = 1 - T[i][j]; modifs++; maj(); $(`.diag button[data-i="${i}"][data-j="${j}"]`, z).focus({ preventScroll: true }); if (modifs >= 8 && !valide) { valide = true; ok(3); } });
  };
  maj();
}

/* ---------- Hilbert : l'hôtel complet qui a toujours de la place ---------- */
function widgetHotel(z) {
  let ops = [];
  const occupant = m => { let r = m; for (let k = ops.length - 1; k >= 0; k--) { if (ops[k] === "un") { if (r === 1) return { nouveau: true, t: "nouveau client" }; r--; } else { if (r % 2) return { nouveau: true, t: `passager ${(r + 1) / 2} du car` }; r /= 2; } } return { nouveau: false, t: `client de la ${r}` }; };
  z.innerHTML = `<div class="mcarte"><div class="mcol"><div class="hotel" aria-live="polite"></div>
    <div class="actions"><button class="btn" id="ho-un">Un client arrive</button><button class="btn" id="ho-car">Un car infini arrive</button><button class="btn secondaire" id="ho-raz">Recommencer</button></div>
    <p class="metat"></p></div></div>`;
  const maj = () => {
    $(".hotel", z).innerHTML = Array.from({ length: 12 }, (_, k) => { const o = occupant(k + 1); return `<div class="chambre ${o.nouveau ? "nouv" : ""}"><span class="ch-n">${k + 1}</span><span class="ch-o">${o.t}</span></div>`; }).join("") + `<div class="chambre suite"><span class="ch-n">…</span><span class="ch-o">sans fin</span></div>`;
    const d = ops[ops.length - 1];
    $(".metat", z).textContent = !d ? "L'hôtel a une infinité de chambres, numérotées 1, 2, 3… Toutes sont occupées." : d === "un" ? "Chaque client passe de sa chambre n à la chambre n + 1. La chambre 1 se libère." : "Chaque client passe de sa chambre n à la chambre 2n. Toutes les chambres impaires se libèrent.";
    $("#ho-un", z).disabled = $("#ho-car", z).disabled = ops.length >= 4;
  };
  $("#ho-un", z).onclick = () => { ops.push("un"); maj(); }; $("#ho-car", z).onclick = () => { ops.push("car"); maj(); }; $("#ho-raz", z).onclick = () => { ops = []; maj(); };
  maj(); return { reveler() {} };
}

/* ---------- Turing : une machine, un ruban, une table de règles ---------- */
function widgetTuring(z) {
  const PROGS = {
    inverser: { nom: "Inverser les chiffres", depart: "gauche", regles: { "A0": ["1", 1, "A"], "A1": ["0", 1, "A"], "A_": ["_", 0, "FIN"] } },
    ajouter: { nom: "Ajouter 1 en binaire", depart: "droite", regles: { "A1": ["0", -1, "A"], "A0": ["1", 0, "FIN"], "A_": ["1", 0, "FIN"] } },
  };
  let prog = "inverser", mot = "1011", ruban, tete, etat, pas, derniere;
  z.innerHTML = `<div class="mcarte"><div class="mcol">
    <div class="partis-choix"><label>Programme <select id="t-prog"><option value="inverser">Inverser les chiffres</option><option value="ajouter">Ajouter 1 en binaire</option></select></label><label>Ruban de départ <select id="t-mot"><option>1011</option><option>0111</option><option>111</option><option>1000</option></select></label></div>
    <div class="ruban" aria-live="polite"></div>
    <div class="actions"><button class="btn" id="t-pas">Un pas</button><button class="btn secondaire" id="t-tout">Exécuter jusqu'à l'arrêt</button><button class="btn secondaire" id="t-raz">Remettre à zéro</button></div>
    <p class="metat"></p>
    <table class="donnees mtable regles"><thead><tr><th>État</th><th>Symbole lu</th><th>Écrire</th><th>Déplacement</th><th>Nouvel état</th></tr></thead><tbody></tbody></table></div></div>`;
  const init = () => { prog = $("#t-prog", z).value; mot = $("#t-mot", z).value; ruban = ["_", "_", ...mot, "_", "_"]; tete = PROGS[prog].depart === "gauche" ? 2 : 1 + mot.length; etat = "A"; pas = 0; derniere = ""; maj(); };
  const unPas = () => { if (etat === "FIN") return; const cle = etat + ruban[tete], [e, dep, ne] = PROGS[prog].regles[cle]; ruban[tete] = e; tete += dep; etat = ne; pas++; derniere = cle; };
  const maj = () => {
    $(".ruban", z).innerHTML = ruban.map((s, k) => `<span class="case ${k === tete ? "tete" : ""}">${s === "_" ? "" : s}</span>`).join("");
    const lu = ruban[tete];
    $(".metat", z).textContent = etat === "FIN" ? `La machine s'est arrêtée après ${pas} pas. Sur le ruban : ${ruban.join("").replace(/_/g, "")}.` : `État ${etat}, pas n° ${pas}. La tête lit ${lu === "_" ? "une case vide" : "le symbole " + lu}.`;
    $(".regles tbody", z).innerHTML = Object.entries(PROGS[prog].regles).map(([cle, [e, dep, ne]]) => `<tr class="${etat !== "FIN" && cle === etat + lu ? "ici" : ""}"><td>${cle[0]}</td><td>${cle[1] === "_" ? "case vide" : cle[1]}</td><td>${e === "_" ? "rien" : e}</td><td>${dep === 1 ? "à droite" : dep === -1 ? "à gauche" : "aucun"}</td><td>${ne === "FIN" ? "arrêt" : ne}</td></tr>`).join("");
    $("#t-pas", z).disabled = $("#t-tout", z).disabled = etat === "FIN";
  };
  $("#t-pas", z).onclick = () => { unPas(); maj(); }; $("#t-tout", z).onclick = () => { let g = 0; while (etat !== "FIN" && g++ < 50) unPas(); maj(); };
  $("#t-raz", z).onclick = init; $("#t-prog", z).onchange = init; $("#t-mot", z).onchange = init;
  init(); return { reveler() {} };
}

Object.assign(WIDGETS_QUIZ, { heron: widgetHeron, zenon: widgetZenon, euclide: widgetEuclide, position: widgetPosition, carre: widgetCarre, romain: widgetRomain, lapins: widgetLapins, partis: widgetPartis, newton: widgetNewton, permutations: widgetPermutations, hotel: widgetHotel, turing: widgetTuring });
Object.assign(MANIPS, { chasse: manipChasse, crible: manipCrible, diagonale: manipDiagonale });
