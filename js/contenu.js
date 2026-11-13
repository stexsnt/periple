/* ============================================================
   CONTENU DE PÉRIPLE — un voyage dans l'histoire des mathématiques.

   Chaque escale est un chapitre. Elle part d'un problème que l'élève tente de résoudre,
   lui fait refaire le geste du mathématicien, puis raconte le contexte.

   Champs propres à une escale :
     an (nombre, pour l'ordre chronologique), date (texte), lieu, genre : "methode" | "paradoxe" | "figure",
     niveau (texte), accroche (une phrase pour l'accueil).

   Types d'étapes (moteur de Synapse, plus deux types propres à Périple) :
     lecon   : { t, titre, texte (HTML), code? (exemple exécutable), synthese? }
     qcm     : { t, titre?, q, doc? (HTML), code?, choix:[...], bon | bons:[...], expl, retours?:[...] }
     tri     : { t, titre, q, doc?, categories:[...], items:[{ txt, cat, expl }], expl? }
     ordre   : { t, titre?, q, lignes:[...dans le bon ordre], attendu?, texte?: true, expl? }
     quiz    : { t, titre, intro?, doc?, code?, widget?: "archimede" | "konigsberg" | "montysim", questions:[{ q, choix, bon, expl }] }
     predire : { t, titre?, code, attendu, expl }
     code    : { t, titre, enonce, depart, solution, d, tests, caches?, indices, requis?, interdit? }
     pari    : { t, titre, q, doc?, choix:[...] }
               (l'élève s'engage avant d'expérimenter ; aucune réponse n'est donnée à ce moment-là)
     manip   : { t, titre, intro (HTML), widget: "promenade" | "sauvetage" | "montyjeu", expl }
               (manipulation libre, validée quand l'objectif du widget est atteint)

   Ajoutez les nouvelles étapes À LA FIN d'une escale : la progression est enregistrée par position.
   ============================================================ */

/* ----- Figures fixes ----- */
const FIG_GRAPHE_KONIGSBERG = `<figure class="figure"><svg viewBox="0 0 520 250" role="img" aria-label="À gauche, le plan de la ville. À droite, le même plan réduit à quatre points reliés par sept traits.">
<g class="plan-mini">
  <rect x="10" y="20" width="220" height="210" rx="10" class="terre"/>
  <path d="M10 82H230V168H10Z" class="eau"/>
  <rect x="58" y="104" width="62" height="42" rx="10" class="terre"/>
  <path d="M146 100H230V150H146a12 12 0 0 1-12-12v-26a12 12 0 0 1 12-12Z" class="terre"/>
  <g class="pont"><path d="M74 82V104M104 82V104M74 146V168M104 146V168M120 125H134M180 82V100M180 150V168"/></g>
  <text x="89" y="130">A</text><text x="120" y="56">B</text><text x="120" y="204">C</text><text x="186" y="130">D</text>
</g>
<path d="M246 125h34m-8-6 8 6-8 6" class="fleche"/>
<g class="graphe">
  <path d="M340 125Q340 60 410 36M340 125Q392 104 410 36M340 125Q340 190 410 214M340 125Q392 146 410 214M340 125H490M410 36L490 125M410 214L490 125"/>
  <circle cx="340" cy="125" r="9"/><circle cx="410" cy="36" r="9"/><circle cx="410" cy="214" r="9"/><circle cx="490" cy="125" r="9"/>
  <text x="318" y="130">A</text><text x="410" y="20">B</text><text x="410" y="242">C</text><text x="508" y="130">D</text>
</g></svg><figcaption>Chaque zone de terre devient un point, chaque pont devient un trait. La forme des rives ne compte plus.</figcaption></figure>`;

const FIG_QUATRE_GRAPHES = `<figure class="figure"><svg viewBox="0 0 560 170" role="img" aria-label="Quatre figures numérotées de 1 à 4.">
<g class="graphe">
  <g><path d="M20 30H110V120H20ZM20 120L110 30"/><circle cx="20" cy="30" r="6"/><circle cx="110" cy="30" r="6"/><circle cx="110" cy="120" r="6"/><circle cx="20" cy="120" r="6"/><text x="65" y="158">Figure 1</text></g>
  <g transform="translate(145 0)"><path d="M20 60H110V130H20ZM20 60L110 130M110 60L20 130M20 60L65 16L110 60"/><circle cx="20" cy="60" r="6"/><circle cx="110" cy="60" r="6"/><circle cx="110" cy="130" r="6"/><circle cx="20" cy="130" r="6"/><circle cx="65" cy="16" r="6"/><text x="65" y="158">Figure 2</text></g>
  <g transform="translate(290 0)"><path d="M20 30H110V120H20ZM20 120L110 30M20 30L110 120"/><circle cx="20" cy="30" r="6"/><circle cx="110" cy="30" r="6"/><circle cx="110" cy="120" r="6"/><circle cx="20" cy="120" r="6"/><text x="65" y="158">Figure 3</text></g>
  <g transform="translate(435 0)"><path d="M65 14L116 51L96 111H34L14 51ZM65 14L96 111L14 51H116L34 111Z"/><circle cx="65" cy="14" r="6"/><circle cx="116" cy="51" r="6"/><circle cx="96" cy="111" r="6"/><circle cx="34" cy="111" r="6"/><circle cx="14" cy="51" r="6"/><text x="65" y="158">Figure 4</text></g>
</g></svg><figcaption>Dans la figure 3, les deux diagonales se croisent sans se toucher : il n'y a pas de sommet au centre. Même chose pour les croisements des figures 2 et 4.</figcaption></figure>`;

const TABLE_MONTY = `<table class="donnees"><thead><tr><th>La voiture est derrière…</th><th>Monty ouvre…</th><th>Si tu gardes la porte 1</th><th>Si tu changes</th></tr></thead><tbody>
<tr><td>la porte 1</td><td>la porte 2 ou la porte 3</td><td>gagné</td><td>perdu</td></tr>
<tr><td>la porte 2</td><td>la porte 3 (il n'a pas le choix)</td><td>perdu</td><td>gagné</td></tr>
<tr><td>la porte 3</td><td>la porte 2 (il n'a pas le choix)</td><td>perdu</td><td>gagné</td></tr></tbody></table>`;

const PARCOURS = [
{
  id: "ant", titre: "Antiquité", sous: "De Babylone à Alexandrie",
  chapitres: [
  {
    id: "archimede", num: 1, an: -250, date: "vers 250 av. J.-C.", lieu: "Syracuse, Sicile", genre: "methode", niveau: "Dès la Seconde, Python en fin d'escale",
    titre: "Archimède encercle π", resume: "Coincer un nombre que personne ne peut mesurer",
    accroche: "Personne ne peut mesurer π exactement. Archimède trouve le moyen de le coincer entre deux nombres qu'il sait calculer.",
    etapes: [
      { t: "lecon", titre: "Un nombre qui échappe à la mesure",
        texte: `<p>Prends un cercle de diamètre 1. Son périmètre vaut exactement <span class="m">π</span>. Reste à savoir combien cela fait.</p>
<p>Pendant des siècles, on s'est contenté de mesurer : une corde autour d'une roue, puis une division. Vers 1650 av. J.-C., le scribe égyptien Ahmès utilise une règle qui revient à prendre <span class="m">π</span> ≈ 3,16. Les Babyloniens se servent de 3, ou de 3 + <span class="frac"><span>1</span><span>8</span></span> = 3,125 quand ils veulent mieux.</p>
<p>Ces valeurs sont des recettes : elles marchent à peu près, mais rien ne dit de combien elles se trompent. Vers 250 av. J.-C., à Syracuse, <strong>Archimède</strong> pose la question autrement. Il ne cherche pas une valeur approchée de plus. Il veut deux nombres, un plus petit et un plus grand que <span class="m">π</span>, dont il soit <em>certain</em>.</p>
<p>Son idée tient en une phrase : remplacer le cercle, qu'on ne sait pas mesurer, par des polygones, qu'on sait calculer.</p>` },
      { t: "quiz", titre: "Un premier encadrement, à la main",
        intro: "Le cercle a pour diamètre 1, donc pour rayon 0,5. Son périmètre est π.",
        doc: `<figure class="figure"><svg viewBox="0 0 520 220" role="img" aria-label="À gauche, un hexagone régulier inscrit dans le cercle, découpé en six triangles équilatéraux. À droite, un carré dont les côtés touchent le cercle.">
<g class="construction">
  <circle cx="130" cy="110" r="90" class="cercle"/>
  <path d="M220 110L175 187.9L85 187.9L40 110L85 32.1L175 32.1Z" class="inscrit"/>
  <path d="M40 110H220M85 32.1L175 187.9M175 32.1L85 187.9" class="rayon"/>
  <text x="170" y="104" class="cote">0,5</text><text x="130" y="205" class="cote">?</text>
  <circle cx="390" cy="110" r="90" class="cercle"/>
  <rect x="300" y="20" width="180" height="180" class="circonscrit"/>
  <path d="M300 110H480" class="rayon"/><text x="390" y="104" class="cote">1</text>
</g></svg><figcaption>À gauche, un hexagone régulier inscrit dans le cercle : ses six sommets sont sur le cercle. À droite, un carré circonscrit : ses quatre côtés touchent le cercle.</figcaption></figure>`,
        questions: [
          { q: "L'hexagone est formé de six triangles équilatéraux dont les côtés mesurent 0,5. Quel est son périmètre ?", choix: ["2,5", "3", "3,14", "6"], bon: 1, expl: "Chaque côté de l'hexagone est un côté de triangle équilatéral : il mesure 0,5. Six côtés : 6 × 0,5 = 3." },
          { q: "Pour aller d'un sommet de l'hexagone au suivant, quel chemin est le plus court ?", choix: ["L'arc de cercle", "Le côté de l'hexagone", "Les deux ont la même longueur"], bon: 1, expl: "Le plus court chemin entre deux points est le segment. Chaque côté est plus court que l'arc qu'il sous-tend, donc le périmètre de l'hexagone est plus petit que celui du cercle : 3 < π." },
          { q: "Le carré circonscrit a pour côté le diamètre du cercle. Quel est son périmètre ?", choix: ["2", "3,5", "4", "8"], bon: 2, expl: "Le côté vaut 1, le périmètre 4. Le carré entoure le cercle : son périmètre est plus grand. Archimède le démontre soigneusement, on l'admet ici." },
          { q: "Que sait-on maintenant avec certitude ?", choix: ["π = 3,5", "3 < π < 4", "π est proche de 3", "Rien : il faudrait mesurer"], bon: 1, expl: "π est coincé entre 3 et 4. C'est encore grossier, mais c'est sûr. Pour resserrer l'étau, il faut des polygones qui collent mieux au cercle." },
        ] },
      { t: "quiz", titre: "Resserrer l'étau", widget: "archimede",
        intro: "Archimède part de deux hexagones, l'un inscrit, l'autre circonscrit, puis il double le nombre de côtés : 12, 24, 48, 96. Fais comme lui et lis les encadrements obtenus.",
        questions: [
          { q: "Avec 12 côtés, quel encadrement de π obtient-on ?", choix: ["3 < π < 3,4642", "3,1058 < π < 3,2154", "3,1326 < π < 3,1597", "3,1410 < π < 3,1428"], bon: 1, expl: "Le périmètre du polygone inscrit dépasse 3,1058 et celui du polygone circonscrit reste sous 3,2154." },
          { q: "À partir de combien de côtés est-on certain que π commence par 3,1 ?", choix: ["6", "12", "24", "96"], bon: 2, expl: "Avec 12 côtés, π peut encore commencer par 3,1 ou par 3,2. Avec 24 côtés, les deux bornes commencent par 3,1 : le premier chiffre après la virgule est acquis." },
          { q: "Archimède s'arrête à 96 côtés. Combien de chiffres après la virgule a-t-il alors rendus certains ?", choix: ["Un seul", "Deux", "Quatre", "Six"], bon: 1, expl: "3,1410 < π < 3,1428 : les deux bornes commencent par 3,14. Le chiffre suivant hésite encore entre 1 et 2." },
          { q: "Regarde la colonne « écart ». Quand on double le nombre de côtés, l'écart entre les deux bornes est à peu près…", choix: ["divisé par 2", "divisé par 4", "divisé par 10", "inchangé"], bon: 1, expl: "L'écart est divisé par 4 environ à chaque doublement. Il faut donc doubler deux fois au moins pour gagner un chiffre : la méthode est sûre, mais lente." },
        ] },
      { t: "lecon", titre: "Sans calculatrice, sans virgule, sans sinus",
        texte: `<p>Tu viens de lire les périmètres sur un écran. Archimède, lui, n'a ni calculatrice, ni écriture décimale, ni trigonométrie. Il travaille avec des fractions et des raisonnements de géométrie.</p>
<p>Il lui faut d'abord <span class="m">√3</span>, pour l'hexagone circonscrit. Il annonce, sans dire comment il l'a trouvé :</p>
<p class="formule"><span class="frac"><span>265</span><span>153</span></span> &lt; √3 &lt; <span class="frac"><span>1351</span><span>780</span></span></p>
<p>Puis il passe de 6 à 12 côtés, de 12 à 24, et ainsi de suite, en majorant ou en minorant chaque racine carrée par une fraction, toujours dans le sens qui garde l'encadrement vrai. Au bout de quatre doublements, il conclut dans son traité <em>De la mesure du cercle</em> :</p>
<p class="formule">3 + <span class="frac"><span>10</span><span>71</span></span> &lt; π &lt; 3 + <span class="frac"><span>1</span><span>7</span></span></p>
<p>soit 3,1408 &lt; <span class="m">π</span> &lt; 3,1429. La fraction <span class="frac"><span>22</span><span>7</span></span>, que l'on utilise encore, vient de là.</p>
<aside class="contexte"><strong>Syracuse, III<sup>e</sup> siècle av. J.-C.</strong> Syracuse est alors une riche cité grecque de Sicile, prise entre Rome et Carthage. Archimède y naît vers 287 av. J.-C. Il correspond avec les savants d'Alexandrie, étudie les leviers, les corps flottants, les aires et les volumes. Il meurt en 212 av. J.-C., quand les Romains prennent la ville.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> Le bain et le cri « Eurêka ! », le soldat romain à qui il aurait dit de ne pas déranger ses cercles : ces scènes sont racontées par des auteurs qui ont vécu un à trois siècles après lui. Elles sont peut-être vraies, mais aucun témoin direct ne les rapporte. Ses traités, eux, nous sont parvenus.</aside>` },
      { t: "code", titre: "Doubler comme Archimède", d: 2,
        caches: ["doubler(3.1, 3.3)", "doubler(1, 2)", "doubler(2.5, 5)"],
        enonce: `<p>En notation d'aujourd'hui, le passage de <span class="m">n</span> à <span class="m">2n</span> côtés tient en deux formules. On note <span class="m">p</span> le périmètre du polygone inscrit et <span class="m">P</span> celui du polygone circonscrit.</p>
<p class="formule"><span class="m">P</span><sub>2<span class="m">n</span></sub> = <span class="frac"><span>2 × <span class="m">p</span><sub><span class="m">n</span></sub> × <span class="m">P</span><sub><span class="m">n</span></sub></span><span><span class="m">p</span><sub><span class="m">n</span></sub> + <span class="m">P</span><sub><span class="m">n</span></sub></span></span> &emsp;puis&emsp; <span class="m">p</span><sub>2<span class="m">n</span></sub> = √(<span class="m">p</span><sub><span class="m">n</span></sub> × <span class="m">P</span><sub>2<span class="m">n</span></sub>)</p>
<p>Complète la fonction <code>doubler</code> : elle reçoit les deux périmètres pour <span class="m">n</span> côtés et renvoie les deux périmètres pour <span class="m">2n</span> côtés, le polygone inscrit en premier.</p>`,
        depart: `from math import sqrt

def doubler(p, P):
    # p : périmètre du polygone inscrit à n côtés
    # P : périmètre du polygone circonscrit à n côtés
    P2 = 0    # à remplacer
    p2 = 0    # à remplacer
    return p2, P2
`,
        solution: `from math import sqrt

def doubler(p, P):
    # p : périmètre du polygone inscrit à n côtés
    # P : périmètre du polygone circonscrit à n côtés
    P2 = 2 * p * P / (p + P)
    p2 = sqrt(p * P2)
    return p2, P2
`,
        tests: [{ appels: [["doubler(3, 2 * sqrt(3))", "(3.1058285412302493, 3.215390309173473)"], ["doubler(2 * sqrt(2), 4)", "(3.0614674589207183, 3.313708498984761)"], ["doubler(2, 4)", "(2.309401076758503, 2.6666666666666665)"]] }],
        requis: ["sqrt"],
        indices: ["Calcule P2 en premier : la formule de p2 a besoin de sa valeur.", "P2 = 2 * p * P / (p + P). Attention aux parenthèses autour de la somme.", "p2 = sqrt(p * P2) : c'est le nouveau P2 qu'il faut utiliser, pas l'ancien P."] },
      { t: "lecon", titre: "Et après 96 côtés ?",
        texte: `<p>Rien n'oblige à s'arrêter à 96. Le programme ci-dessous part des hexagones et double tant qu'on le lui demande. Lance-le, puis remplace 96 par un nombre plus grand.</p>
<p>La méthode d'Archimède reste la seule connue pendant près de dix-neuf siècles. Ceux qui veulent plus de chiffres doublent plus longtemps :</p>
<ul>
<li>en Chine, on attribue à <strong>Liu Hui</strong> (263) un calcul poussé jusqu'à 3 072 côtés, qui donne 3,1416 ;</li>
<li>vers 480, <strong>Zu Chongzhi</strong> établit 3,1415926 &lt; <span class="m">π</span> &lt; 3,1415927, un record qui tient près de mille ans ;</li>
<li>à Samarcande, <strong>al-Kashi</strong> (1424) atteint 16 chiffres après la virgule avec un polygone de 3 × 2<sup>28</sup> côtés, soit plus de 800 millions ;</li>
<li>aux Pays-Bas, <strong>Ludolph van Ceulen</strong> y consacre une bonne partie de sa vie et obtient 35 chiffres, publiés après sa mort en 1610.</li>
</ul>
<p>Ensuite, on change d'outil : les sommes infinies, connues en Inde dès le XIV<sup>e</sup> siècle et redécouvertes en Europe au XVII<sup>e</sup>, donnent des chiffres bien plus vite que les polygones.</p>`,
        code: `from math import sqrt

p, P = 3, 2 * sqrt(3)     # les deux hexagones
n = 6
while n <= 96:
    print(n, "côtés :", round(p, 6), "< π <", round(P, 6))
    P = 2 * p * P / (p + P)
    p = sqrt(p * P)
    n = 2 * n
` },
      { t: "qcm", titre: "Ce qui change avec Archimède",
        q: "Les Égyptiens avaient déjà 3,16 et les Babyloniens 3,125. Qu'apporte de nouveau la méthode d'Archimède ?",
        choix: ["Elle donne la valeur exacte de π.", "Elle donne un encadrement démontré, que l'on peut resserrer autant qu'on veut.", "Elle est plus rapide que de mesurer une roue.", "Elle prouve que π vaut 22/7."], bon: 1,
        retours: ["Aucun nombre de côtés ne donne π exactement : il reste toujours un écart entre les deux polygones.", null, "Elle est au contraire bien plus longue. Ce qu'elle apporte est d'une autre nature.", "22/7 est la borne supérieure : π est strictement plus petit."],
        expl: "Une mesure donne une valeur sans dire de combien elle se trompe. Archimède donne deux bornes démontrées, et un procédé pour les rapprocher sans fin. C'est la différence entre « à peu près » et « à coup sûr, entre ceci et cela »." },
      { t: "lecon", synthese: true, titre: "Fiche de l'escale",
        texte: `<p><strong>Le problème.</strong> Connaître le périmètre d'un cercle de diamètre 1, c'est-à-dire <span class="m">π</span>, alors qu'aucune mesure n'est exacte.</p>
<p><strong>La méthode.</strong> Encadrer le cercle par un polygone inscrit (plus court) et un polygone circonscrit (plus long), puis doubler le nombre de côtés pour resserrer l'encadrement.</p>
<p><strong>Le résultat.</strong> Avec 96 côtés : 3 + <span class="frac"><span>10</span><span>71</span></span> &lt; <span class="m">π</span> &lt; 3 + <span class="frac"><span>1</span><span>7</span></span>, soit deux chiffres sûrs après la virgule.</p>
<p><strong>Le contexte.</strong> Archimède, Syracuse, vers 250 av. J.-C., traité <em>De la mesure du cercle</em>. Méthode reprise par Liu Hui, Zu Chongzhi, al-Kashi et van Ceulen.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>expliquer pourquoi le polygone inscrit donne une borne inférieure de π</li><li>lire un encadrement et dire quels chiffres sont certains</li><li>distinguer une valeur approchée d'un encadrement démontré</li><li>situer Archimède dans le temps et dans l'espace</li></ul>` },
    ] },
  ]
},
{
  id: "mod", titre: "Temps modernes", sous: "De la Renaissance aux Lumières",
  chapitres: [
  {
    id: "konigsberg", num: 2, an: 1736, date: "1736", lieu: "Königsberg et Saint-Pétersbourg", genre: "figure", niveau: "Dès la Seconde",
    titre: "Euler et les sept ponts de Königsberg", resume: "Une promenade impossible, et la naissance des graphes",
    accroche: "Une énigme de promeneurs arrive sur le bureau du plus grand mathématicien d'Europe. Il la juge d'abord indigne de lui.",
    etapes: [
      { t: "manip", titre: "La promenade des sept ponts", widget: "promenade",
        intro: `<p>Königsberg, en Prusse, est bâtie sur une rivière, le Pregel, qui entoure une île et se sépare en deux bras. Sept ponts relient les quatre parties de la ville.</p><p>Une question circule parmi les habitants : <strong>peut-on faire une promenade qui traverse chaque pont une fois et une seule ?</strong> On part d'où l'on veut, on arrive où l'on veut.</p><p>Fais au moins trois tentatives.</p>`,
        expl: "Personne n'y est arrivé à Königsberg non plus. Mais ne pas trouver ne prouve rien : il existe des milliers de promenades possibles. Reste à comprendre pourquoi aucune ne convient." },
      { t: "quiz", titre: "Compter au lieu de chercher", widget: "konigsberg",
        intro: "Au lieu d'essayer toutes les promenades, regarde chaque zone de la ville et compte les ponts qui y aboutissent. Le plan reste disponible pour vérifier.",
        questions: [
          { q: "Combien de ponts aboutissent à l'île centrale, le Kneiphof (zone A) ?", choix: ["3", "4", "5", "7"], bon: 2, expl: "Deux ponts vers la rive nord, deux vers la rive sud, un vers l'est : cinq." },
          { q: "Et à chacune des trois autres zones (B, C et D) ?", choix: ["2", "3", "4", "5"], bon: 1, expl: "Trois ponts pour la rive nord, trois pour la rive sud, trois pour la zone est." },
          { q: "Tu traverses une zone sans t'y arrêter : tu y entres par un pont, tu en sors par un autre. Combien de ses ponts as-tu utilisés ?", choix: ["1", "2", "3", "Cela dépend de la zone"], bon: 1, expl: "Un pour entrer, un pour sortir. Chaque passage consomme les ponts de la zone deux par deux." },
          { q: "Une zone qui n'est ni le départ ni l'arrivée voit donc tous ses ponts utilisés deux par deux. Son nombre de ponts doit être…", choix: ["pair", "impair", "égal à 2", "supérieur à 3"], bon: 0, expl: "Si le nombre de ponts est impair, il en reste toujours un : on finit coincé dans la zone, ou bien un pont reste sans être traversé." },
          { q: "Une promenade n'a qu'un départ et qu'une arrivée. Combien de zones, au maximum, peuvent avoir un nombre impair de ponts ?", choix: ["Aucune", "Une", "Deux", "Quatre"], bon: 2, expl: "Seuls le départ et l'arrivée ont droit à un nombre impair de ponts. À Königsberg, les quatre zones sont dans ce cas : la promenade est impossible, et c'est démontré sans avoir essayé une seule promenade de plus." },
        ] },
      { t: "lecon", titre: "Un problème « qui n'a rien de mathématique »",
        texte: `<p>En 1736, Leonhard <strong>Euler</strong> a vingt-neuf ans. Né à Bâle, il travaille à l'Académie des sciences de Saint-Pétersbourg, où la Russie attire des savants de toute l'Europe. C'est Carl Ehler, maire de Dantzig, qui lui soumet par lettre l'énigme des ponts.</p>
<p>Euler répond d'abord que la question ne relève guère des mathématiques : aucun calcul, aucune mesure, aucune figure à tracer. Puis c'est précisément cela qui l'intrigue. Longueur des ponts, largeur de la rivière, forme de l'île : rien de tout cela ne compte. Seul compte <em>ce qui est relié à quoi</em>.</p>
${FIG_GRAPHE_KONIGSBERG}
<p>Son article raisonne sur les zones et les ponts, comme tu viens de le faire. Le dessin en points et en traits n'apparaît qu'au siècle suivant, avec le mot <strong>graphe</strong> : les points sont les <strong>sommets</strong>, les traits sont les <strong>arêtes</strong>, et le nombre d'arêtes qui partent d'un sommet est son <strong>degré</strong>.</p>
<aside class="retenir"><strong>Théorème d'Euler.</strong> Dans un graphe d'un seul tenant, on peut parcourir chaque arête une fois et une seule si, et seulement si, le nombre de sommets de degré impair est 0 ou 2. S'il y en a 2, on part de l'un et on arrive à l'autre. S'il n'y en a aucun, on peut partir de n'importe où et l'on revient à son point de départ.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> On lit souvent qu'Euler a « résolu le problème avec un graphe ». Il n'en a dessiné aucun. On lit aussi qu'il a tout démontré : il prouve que la promenade est impossible quand plus de deux zones ont un nombre impair de ponts, mais la preuve qu'elle existe toujours dans les autres cas est publiée en 1873, d'après les travaux de Carl Hierholzer.</aside>` },
      { t: "quiz", titre: "Sans lever le crayon",
        intro: "Tracer une figure sans lever le crayon et sans repasser sur un trait, c'est le problème des ponts sous un autre habit. Pour chaque figure, compte le degré de chaque sommet.",
        doc: FIG_QUATRE_GRAPHES,
        questions: [
          { q: "Figure 1 : un carré et une diagonale. Peut-on la tracer sans lever le crayon ?", choix: ["Oui, en partant de n'importe quel sommet", "Oui, à condition de partir d'un bout de la diagonale", "Non"], bon: 1, expl: "Les deux bouts de la diagonale sont de degré 3, les deux autres sommets de degré 2. Deux sommets impairs : on part de l'un, on arrive à l'autre." },
          { q: "Figure 2 : la maison. Combien de sommets ont un degré impair ?", choix: ["Aucun", "Deux", "Quatre", "Cinq"], bon: 1, expl: "Les deux sommets du bas sont de degré 3. Les deux sommets du haut du carré sont de degré 4 et le sommet du toit de degré 2. La maison se trace donc sans lever le crayon, en partant d'un coin du bas." },
          { q: "Figure 3 : un carré et ses deux diagonales. Peut-on la tracer sans lever le crayon ?", choix: ["Oui", "Non"], bon: 1, expl: "Les quatre sommets sont de degré 3. Quatre sommets impairs, comme à Königsberg : impossible." },
          { q: "Figure 4 : un pentagone et son étoile. Que peut-on dire ?", choix: ["Impossible à tracer", "Possible, mais seulement en partant du sommet du haut", "Possible en partant de n'importe où, et l'on revient au point de départ"], bon: 2, expl: "Chaque sommet est de degré 4. Aucun sommet impair : on part d'où l'on veut et l'on termine où l'on a commencé." },
        ] },
      { t: "manip", titre: "Sauver la promenade", widget: "sauvetage",
        intro: `<p>Le conseil de la ville te donne le droit de <strong>fermer un pont</strong>, un seul, pour que la promenade devienne possible. Choisis ton pont, choisis ton point de départ, puis traverse les six ponts restants.</p>`,
        expl: "Fermer un pont enlève 1 au degré de ses deux extrémités : deux zones deviennent paires, il reste deux zones impaires. Le théorème dit alors d'où partir : de l'une des deux, pour arriver à l'autre." },
      { t: "code", titre: "Le théorème en une fonction", d: 1,
        caches: ["promenade_possible([4, 4, 2])", "promenade_possible([1, 3, 3, 3, 2])", "promenade_possible([3, 4, 3])"],
        enonce: `<p>On décrit un graphe d'un seul tenant par la liste des degrés de ses sommets. Pour Königsberg : <code>[5, 3, 3, 3]</code>.</p><p>Écris la fonction <code>promenade_possible(degres)</code> qui renvoie <code>True</code> si l'on peut parcourir chaque arête une fois et une seule, et <code>False</code> sinon.</p>`,
        depart: `def promenade_possible(degres):
    impairs = 0
    for d in degres:
        # compte les sommets de degré impair
        pass
    return True
`,
        solution: `def promenade_possible(degres):
    impairs = 0
    for d in degres:
        if d % 2 == 1:
            impairs = impairs + 1
    return impairs == 0 or impairs == 2
`,
        tests: [{ appels: [["promenade_possible([5, 3, 3, 3])", "False"], ["promenade_possible([3, 2, 3, 2])", "True"], ["promenade_possible([4, 4, 4, 4, 4])", "True"], ["promenade_possible([3, 3, 4, 4, 2])", "True"], ["promenade_possible([3, 3, 3, 3])", "False"]] }],
        indices: ["Un entier d est impair quand le reste de sa division par 2 vaut 1 : d % 2 == 1.", "À la fin de la boucle, la promenade est possible si impairs vaut 0 ou 2.", "return impairs == 0 or impairs == 2"] },
      { t: "lecon", titre: "Ce que les ponts sont devenus",
        texte: `<p>Euler pense avoir réglé une curiosité. Il vient d'ouvrir une branche des mathématiques où l'on étudie les liaisons sans s'occuper des distances : la <strong>théorie des graphes</strong>.</p>
<p>Elle est aujourd'hui partout. Un réseau social est un graphe dont les sommets sont des personnes. Un calcul d'itinéraire cherche un chemin dans le graphe des routes. Et la question de Königsberg elle-même se pose chaque matin : un camion de collecte ou une saleuse doit passer dans chaque rue en repassant le moins possible aux mêmes endroits. Ce problème, formulé en 1960 par le mathématicien chinois Guan Meigu, porte le nom de « problème du postier chinois ».</p>
<aside class="contexte"><strong>Königsberg aujourd'hui.</strong> La ville s'appelle Kaliningrad et se trouve en Russie. Deux des sept ponts ont été détruits pendant la Seconde Guerre mondiale, et le plan a encore changé depuis. Avec les cinq ponts qui occupent aujourd'hui les mêmes emplacements, deux zones seulement ont un nombre impair de ponts : la promenade est devenue possible, à condition de ne pas finir là où l'on a commencé.</aside>` },
      { t: "lecon", synthese: true, titre: "Fiche de l'escale",
        texte: `<p><strong>Le problème.</strong> Traverser les sept ponts de Königsberg une fois et une seule chacun.</p>
<p><strong>L'idée.</strong> Oublier les distances et les formes, ne garder que les liaisons : quatre zones, sept ponts. Puis compter les ponts de chaque zone au lieu d'essayer les promenades.</p>
<p><strong>Le vocabulaire.</strong> Graphe, sommet, arête, degré d'un sommet.</p>
<p><strong>Le théorème.</strong> Un graphe d'un seul tenant se parcourt en passant une fois par chaque arête si, et seulement si, il a 0 ou 2 sommets de degré impair.</p>
<p><strong>Le contexte.</strong> Leonhard Euler, Académie de Saint-Pétersbourg, 1736. Preuve complétée en 1873 (Hierholzer).</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>transformer un plan ou une figure en graphe</li><li>calculer le degré d'un sommet</li><li>dire si une figure se trace sans lever le crayon, et d'où partir</li><li>expliquer pourquoi un sommet de passage doit être de degré pair</li></ul>` },
    ] },
  ]
},
{
  id: "cont", titre: "Époque contemporaine", sous: "Du XIXe siècle à nos jours",
  chapitres: [
  {
    id: "montyhall", num: 3, an: 1975, date: "1975", lieu: "Berkeley, Californie", genre: "paradoxe", niveau: "Dès la Seconde, probabilités conditionnelles en Première",
    titre: "Le paradoxe de Monty Hall", resume: "Trois portes, une voiture, et des milliers de lecteurs furieux",
    accroche: "Un jeu télévisé, trois portes, un choix qui paraît sans importance. Des docteurs en mathématiques s'y sont trompés par centaines.",
    etapes: [
      { t: "pari", titre: "Garder ou changer ?",
        q: "Tu participes à un jeu télévisé. Derrière l'une des trois portes se trouve une voiture, derrière les deux autres, une chèvre. Tu choisis la porte 1. Le présentateur, qui sait où est la voiture, ouvre alors la porte 3 : une chèvre. Il te propose de changer pour la porte 2. Que fais-tu ?",
        choix: ["Je garde la porte 1.", "Je change pour la porte 2.", "Peu importe : il reste deux portes, j'ai une chance sur deux."] },
      { t: "manip", titre: "Joue dix parties", widget: "montyjeu",
        intro: `<p>Avant de raisonner, joue. Choisis une porte, laisse le présentateur en ouvrir une autre, puis décide. Le tableau compte tes victoires selon que tu as gardé ou changé.</p><p>Joue au moins dix parties, dont trois au moins avec chaque stratégie.</p>`,
        expl: "Dix parties ne suffisent pas pour conclure : le hasard peut favoriser l'une ou l'autre stratégie sur une courte série. Il faut jouer beaucoup plus, et pour cela demander de l'aide à la machine." },
      { t: "quiz", titre: "Mille parties d'un coup", widget: "montysim",
        intro: "La machine joue pour toi. À chaque partie, elle note ce que donne chacune des deux stratégies. Lance plusieurs milliers de parties et observe les deux fréquences de victoire.",
        questions: [
          { q: "Quand on joue beaucoup de parties, la fréquence de victoire en changeant de porte se rapproche de…", choix: ["1/3", "1/2", "2/3", "1"], bon: 2, expl: "Environ 0,667 : deux parties sur trois. Changer n'est pas indifférent du tout." },
          { q: "Et la fréquence de victoire en gardant sa porte ?", choix: ["1/3", "1/2", "2/3"], bon: 0, expl: "Environ 0,333. Les deux fréquences ont pour somme 1 : à chaque partie, l'une des deux stratégies gagne et l'autre perd." },
          { q: "Si tu gardes ta porte quoi qu'il arrive, tu gagnes exactement quand ton premier choix était…", choix: ["la voiture", "une chèvre", "la porte du milieu"], bon: 0, expl: "Ce que fait le présentateur ensuite n'y change rien : tu gagnes si tu avais visé juste dès le départ, ce qui arrive une fois sur trois." },
          { q: "Si tu changes toujours, tu gagnes exactement quand ton premier choix était…", choix: ["la voiture", "une chèvre"], bon: 1, expl: "Si tu avais choisi une chèvre, le présentateur est obligé d'ouvrir l'autre chèvre : la porte qui reste cache la voiture. Or on choisit une chèvre deux fois sur trois." },
        ] },
      { t: "lecon", titre: "Pourquoi l'intuition se trompe",
        texte: `<p>Deux portes fermées, donc une chance sur deux : l'idée est si naturelle qu'on a du mal à s'en défaire. Elle oublie une chose. <strong>Le présentateur n'ouvre pas une porte au hasard.</strong> Il sait où est la voiture et ne la montre jamais.</p>
<p>Supposons que tu aies choisi la porte 1. Les trois cas ci-dessous ont la même probabilité, un tiers chacun.</p>
${TABLE_MONTY}
<p>Changer fait gagner dans deux cas sur trois. En ouvrant une porte, le présentateur ne t'apprend rien sur la tienne. Il t'apprend en revanche beaucoup sur l'autre : dans deux cas sur trois, c'est lui qui a été forcé de l'éviter.</p>
<aside class="retenir"><strong>À retenir.</strong> Une probabilité dépend de l'information dont on dispose, et de la façon dont cette information a été obtenue. Deux issues possibles ne veut pas dire une chance sur deux.</aside>` },
      { t: "qcm", titre: "Avec cent portes",
        q: "Cent portes, une seule voiture. Tu choisis la porte 1. Le présentateur, qui sait où est la voiture, ouvre 98 autres portes : 98 chèvres. Il reste ta porte et la porte 57. Si tu changes, quelle est ta probabilité de gagner ?",
        choix: ["1/100", "1/2", "98/100", "99/100"], bon: 3,
        retours: ["C'est la probabilité que ton premier choix soit le bon. En changeant, tu gagnes dans tous les autres cas.", "Il reste bien deux portes, mais elles ne jouent pas le même rôle : l'une a été choisie au hasard parmi cent, l'autre a été soigneusement évitée par quelqu'un qui sait.", "Presque : compte les cas où ton premier choix était une chèvre."],
        expl: "Ton premier choix est le bon une fois sur cent. Dans les 99 autres cas, le présentateur a écarté toutes les chèvres sauf la tienne, et la porte qu'il laisse fermée cache la voiture. Avec cent portes, plus personne ne répond « une chance sur deux »." },
      { t: "qcm", titre: "Et si le présentateur ne savait pas ?",
        q: "Nouvelle règle : le présentateur ignore où est la voiture. Il ouvre au hasard l'une des deux portes que tu n'as pas choisies, et il se trouve qu'elle cache une chèvre. Faut-il changer ?",
        choix: ["Oui, on gagne toujours deux fois sur trois en changeant.", "Cette fois, peu importe : c'est bien une chance sur deux.", "Non, il vaut mieux garder sa porte."], bon: 1,
        retours: ["Ce serait vrai si le présentateur avait évité la voiture exprès. Ici, il aurait pu la montrer.", null, "Garder ne fait pas mieux que changer ici. Compare les cas où la chèvre apparaît."],
        expl: "Sur 300 parties, tu choisis la voiture 100 fois, et le présentateur montre alors forcément une chèvre. Tu choisis une chèvre 200 fois, et il montre la voiture une fois sur deux, soit 100 parties à écarter. Restent 200 parties où une chèvre apparaît : 100 où garder gagne, 100 où changer gagne. La même scène, vue de l'extérieur, ne donne pas la même probabilité selon ce que sait celui qui ouvre la porte." },
      { t: "code", titre: "Le jeu en une fonction", d: 1,
        caches: ["gagne(2, 2, False)", "gagne(2, 3, True)", "gagne(3, 3, True)", "gagne(1, 3, False)"],
        enonce: `<p>Les portes sont numérotées 1, 2 et 3. Écris la fonction <code>gagne(voiture, choix, changer)</code> :</p><ul><li><code>voiture</code> est le numéro de la porte qui cache la voiture ;</li><li><code>choix</code> est le numéro de la porte choisie au départ ;</li><li><code>changer</code> vaut <code>True</code> si le joueur change de porte, <code>False</code> s'il garde la sienne.</li></ul><p>La fonction renvoie <code>True</code> si le joueur repart avec la voiture, <code>False</code> sinon. Tu n'as pas besoin de savoir quelle porte le présentateur ouvre : relis les deux dernières questions de l'étape précédente.</p>`,
        depart: `def gagne(voiture, choix, changer):
    if changer:
        return True     # à corriger
    else:
        return True     # à corriger
`,
        solution: `def gagne(voiture, choix, changer):
    if changer:
        return choix != voiture
    else:
        return choix == voiture
`,
        tests: [{ appels: [["gagne(1, 1, False)", "True"], ["gagne(1, 2, False)", "False"], ["gagne(1, 1, True)", "False"], ["gagne(3, 2, True)", "True"], ["gagne(2, 1, True)", "True"]] }],
        indices: ["Sans changer, on gagne quand le premier choix est la bonne porte.", "En changeant, on gagne quand le premier choix n'était pas la bonne porte.", "choix == voiture vaut déjà True ou False : on peut le renvoyer directement."] },
      { t: "lecon", titre: "Simuler en Python",
        texte: `<p>Avec la fonction <code>gagne</code>, la simulation tient en quelques lignes. Lance le programme plusieurs fois : les fréquences changent un peu d'une exécution à l'autre, mais restent proches de 1/3 et de 2/3. Essaie ensuite avec 100 parties, puis avec 100 000.</p>`,
        code: `from random import randint

def gagne(voiture, choix, changer):
    if changer:
        return choix != voiture
    else:
        return choix == voiture

parties = 10000
en_gardant = 0
en_changeant = 0
for i in range(parties):
    voiture = randint(1, 3)
    choix = randint(1, 3)
    if gagne(voiture, choix, False):
        en_gardant = en_gardant + 1
    if gagne(voiture, choix, True):
        en_changeant = en_changeant + 1

print("En gardant   :", en_gardant / parties)
print("En changeant :", en_changeant / parties)
` },
      { t: "lecon", titre: "Dix mille lettres pour une chèvre",
        texte: `<p>En 1975, le statisticien <strong>Steve Selvin</strong>, de l'université de Californie à Berkeley, envoie le problème à une revue de statistique, <em>The American Statistician</em>. Il lui donne le nom de Monty Hall, présentateur du jeu télévisé <em>Let's Make a Deal</em>, où les candidats choisissaient entre des portes depuis 1963.</p>
<p>Le problème reste une affaire de spécialistes jusqu'en septembre 1990. Cette année-là, <strong>Marilyn vos Savant</strong>, qui tient une rubrique de questions de lecteurs dans le magazine <em>Parade</em>, répond qu'il faut changer de porte. Elle raconte avoir reçu environ dix mille lettres, dont près d'un millier signées par des titulaires d'un doctorat. L'immense majorité lui explique, parfois avec mépris, qu'elle se trompe. Elle maintient sa réponse, la réexplique, et propose aux classes du pays de faire l'expérience avec trois gobelets. Les résultats lui donnent raison.</p>
<aside class="contexte"><strong>Un vieux piège.</strong> Le problème a des ancêtres. En 1889, le mathématicien français Joseph Bertrand propose un paradoxe de trois boîtes contenant des pièces d'or et d'argent, qui repose sur la même erreur. En 1959, Martin Gardner publie dans <em>Scientific American</em> l'énigme des trois prisonniers, dont la structure est identique.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> Le vrai Monty Hall ne proposait pas ce marché tel quel : il a expliqué en 1991 qu'il restait libre d'ouvrir une porte ou non, et de faire d'autres offres. Le problème est une version idéalisée de son jeu. On raconte aussi que le mathématicien Paul Erdős n'a été convaincu qu'en voyant une simulation sur ordinateur : l'anecdote vient d'un de ses amis, Andrew Vázsonyi, qui dit en avoir été témoin.</aside>` },
      { t: "lecon", synthese: true, titre: "Fiche de l'escale",
        texte: `<p><strong>Le problème.</strong> Trois portes, une voiture. Le joueur choisit une porte, le présentateur ouvre une autre porte en montrant une chèvre, puis propose de changer.</p>
<p><strong>La réponse.</strong> Garder sa porte fait gagner avec une probabilité de 1/3, changer avec une probabilité de 2/3.</p>
<p><strong>L'explication.</strong> Le premier choix est une chèvre deux fois sur trois. Dans ce cas, le présentateur n'a pas le choix de la porte qu'il ouvre, et la porte restante cache la voiture.</p>
<p><strong>La leçon.</strong> Une probabilité dépend de l'information disponible et de la manière dont elle a été obtenue. Si le présentateur ouvrait une porte au hasard, on retrouverait une chance sur deux.</p>
<p><strong>Le contexte.</strong> Steve Selvin, 1975. Marilyn vos Savant, magazine <em>Parade</em>, 1990.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>simuler une expérience aléatoire pour tester une intuition</li><li>expliquer pourquoi changer de porte fait gagner deux fois sur trois</li><li>dire ce qui change quand le présentateur ne sait rien</li><li>raconter la controverse de 1990</li></ul>` },
    ] },
  ]
}];

/* Frise de l'accueil : les escales ouvertes viennent de PARCOURS, celles-ci sont les escales à venir.
   Quand une escale est écrite, on retire sa ligne d'ici. */
const A_VENIR = [
  { an: -1800, date: "vers 1800 av. J.-C.", nom: "Babylone et √2", genre: "methode" },
  { an: -530, date: "vers 530 av. J.-C.", nom: "Pythagore et les irrationnels", genre: "figure" },
  { an: -450, date: "vers 450 av. J.-C.", nom: "Zénon, Achille et la tortue", genre: "paradoxe" },
  { an: -300, date: "vers 300 av. J.-C.", nom: "L'algorithme d'Euclide", genre: "methode" },
  { an: -240, date: "vers 240 av. J.-C.", nom: "Le crible d'Ératosthène", genre: "methode" },
  { an: 628, date: "628", nom: "Brahmagupta et le zéro", genre: "figure" },
  { an: 820, date: "vers 820", nom: "Al-Khwarizmi complète le carré", genre: "methode" },
  { an: 1202, date: "1202", nom: "Fibonacci et les chiffres arabes", genre: "figure" },
  { an: 1654, date: "1654", nom: "Pascal, Fermat et le problème des partis", genre: "figure" },
  { an: 1669, date: "1669", nom: "La méthode de Newton", genre: "methode" },
  { an: 1832, date: "1832", nom: "Galois", genre: "figure" },
  { an: 1874, date: "1874", nom: "Cantor et les infinis", genre: "figure" },
  { an: 1924, date: "1924", nom: "L'hôtel de Hilbert", genre: "paradoxe" },
  { an: 1936, date: "1936", nom: "Turing et la machine universelle", genre: "figure" },
];

/* ============================================================
   PROBLÈMES — des énigmes célèbres pour se mesurer aux anciens.
   Champs communs : titre, ep ("ant" | "moy" | "mod" | "cont" : ambiance de la page), date, origine, d (difficulté 1 à 3), accroche.
     reponse : { t, enonce (HTML), reponse (nombre), tol?, indices:[...], expl, histoire? (HTML) }
               (réponse saisie au clavier : entier, décimal à virgule ou fraction a/b)
     code    : comme dans les escales.
   Ajoutez les nouveaux problèmes À LA FIN : la progression est enregistrée par position.
   ============================================================ */
const DEFIS = { id: "defis", titre: "Problèmes", resume: "", etapes: [
  { t: "reponse", titre: "Sept maisons, sept chats", ep: "ant", date: "vers 1650 av. J.-C.", origine: "Égypte, papyrus Rhind", d: 1,
    accroche: "Le plus vieux problème de ce recueil a plus de 3 600 ans.",
    enonce: `<p>Le scribe Ahmès note, dans le problème 79 de son papyrus :</p><p>Il y a 7 maisons. Dans chaque maison vivent 7 chats. Chaque chat attrape 7 souris. Chaque souris aurait mangé 7 épis. Chaque épi aurait donné 7 mesures de grain.</p><p><strong>Maisons, chats, souris, épis et mesures de grain : combien cela fait-il en tout ?</strong></p>`,
    reponse: 19607, indices: ["Il y a 7 × 7 = 49 chats, puis 7 fois plus de souris, et ainsi de suite.", "Il faut additionner 7 + 7² + 7³ + 7⁴ + 7⁵."],
    expl: "7 + 49 + 343 + 2 401 + 16 807 = 19 607. Le scribe additionne sans état d'âme des maisons, des chats et du grain : ce qui l'intéresse, c'est la somme des puissances de 7.",
    histoire: `<aside class="contexte"><strong>Le papyrus Rhind.</strong> Ce rouleau de cinq mètres, copié vers 1650 av. J.-C. par le scribe Ahmès, contient plus de 80 problèmes résolus. Il est conservé au British Museum. Une comptine anglaise bien plus tardive, « As I was going to St Ives », repose sur la même idée.</aside>` },
  { t: "reponse", titre: "Achille rattrape la tortue", ep: "ant", date: "vers 450 av. J.-C.", origine: "Élée, Grande-Grèce", d: 2,
    accroche: "Zénon affirme qu'Achille ne rattrapera jamais la tortue. À toi de dire quand il la rattrape.",
    enonce: `<p>Achille court à 10 mètres par seconde, la tortue avance à 1 mètre par seconde. Elle part avec 100 mètres d'avance.</p><p>Zénon d'Élée raisonne ainsi : quand Achille arrive là où était la tortue, elle a avancé un peu ; quand il atteint ce nouveau point, elle a encore avancé ; et ainsi de suite, sans fin. Donc Achille ne la rattrape jamais.</p><p><strong>Au bout de combien de secondes Achille rattrape-t-il pourtant la tortue ?</strong> Donne une valeur exacte ou arrondie au centième.</p>`,
    reponse: 100 / 9, tol: 0.006, indices: ["Appelle t la durée cherchée. Quelle distance a parcourue Achille ? Et la tortue ?", "Achille est à 10t mètres du départ, la tortue à 100 + t mètres. Ils se rejoignent quand ces deux distances sont égales."],
    expl: "10t = 100 + t, donc t = 100/9, soit environ 11,11 secondes. Zénon découpe cette durée en une infinité d'étapes : 10 s, puis 1 s, puis 0,1 s… Leur somme est pourtant finie. Il faudra plus de deux mille ans pour donner un sens rigoureux à une somme infinie.",
    histoire: `<aside class="legende"><strong>Histoire ou légende ?</strong> Aucun écrit de Zénon ne nous est parvenu. Ses paradoxes sont connus par Aristote, qui les expose un siècle plus tard pour les réfuter.</aside>` },
  { t: "reponse", titre: "L'épitaphe de Diophante", ep: "ant", date: "vers 500", origine: "Anthologie grecque", d: 2,
    accroche: "Une tombe qui donne l'âge du défunt, à condition de résoudre une équation.",
    enonce: `<p>Une épigramme grecque raconte la vie du mathématicien Diophante d'Alexandrie :</p><p>Son enfance dura le sixième de sa vie. Sa barbe poussa après un douzième de plus. Il se maria après un septième de plus. Cinq ans plus tard, il eut un fils. Ce fils vécut la moitié de la vie de son père. Diophante mourut quatre ans après son fils.</p><p><strong>À quel âge Diophante est-il mort ?</strong></p>`,
    reponse: 84, indices: ["Appelle x l'âge cherché et additionne toutes les périodes de sa vie : leur somme vaut x.", "x/6 + x/12 + x/7 + 5 + x/2 + 4 = x.", "Sans équation : l'âge doit être divisible par 6, par 12 et par 7."],
    expl: "x/6 + x/12 + x/7 + 5 + x/2 + 4 = x donne 75x/84 + 9 = x, donc 9x/84 = 9 et x = 84. Diophante aurait vécu 84 ans.",
    histoire: `<aside class="legende"><strong>Histoire ou légende ?</strong> L'épigramme figure dans un recueil de devinettes attribué à Métrodore, compilé vers l'an 500, soit environ deux siècles et demi après Diophante. Rien ne prouve qu'elle dise vrai : on ignore à peu près tout de sa vie.</aside>` },
  { t: "reponse", titre: "Le bambou brisé", ep: "moy", date: "Ier siècle", origine: "Chine, Les Neuf Chapitres", d: 2,
    accroche: "Un coup de vent, un bambou cassé, et le théorème de Pythagore sans Pythagore.",
    enonce: `<p>Un bambou haut de 10 <em>chi</em> est brisé par le vent. Il reste attaché à l'endroit de la cassure, et son sommet vient toucher le sol à 3 <em>chi</em> du pied.</p><p><strong>À quelle hauteur le bambou s'est-il cassé ?</strong></p>`,
    reponse: 4.55, tol: 0.006, indices: ["Fais un dessin : la partie restée debout, le sol et la partie couchée forment un triangle rectangle.", "Si la cassure est à la hauteur x, la partie tombée mesure 10 − x.", "x² + 3² = (10 − x)²."],
    expl: "x² + 9 = (10 − x)² = 100 − 20x + x², donc 20x = 91 et x = 4,55 chi. Les mathématiciens chinois connaissaient la relation entre les côtés d'un triangle rectangle sous le nom de règle « gou-gu ».",
    histoire: `<aside class="contexte"><strong>Les Neuf Chapitres sur l'art mathématique.</strong> Ce recueil de 246 problèmes, mis en forme vers le I<sup>er</sup> siècle, a servi de manuel aux fonctionnaires chinois pendant plus de mille ans. Le neuvième chapitre est consacré au triangle rectangle. Le même problème réapparaît en Inde au XII<sup>e</sup> siècle chez Bhaskara.</aside>` },
  { t: "reponse", titre: "Les soldats de Sun Zi", ep: "moy", date: "entre le IIIe et le Ve siècle", origine: "Chine, Sunzi suanjing", d: 2,
    accroche: "Compter une troupe sans la compter : il suffit de la ranger trois fois.",
    enonce: `<p>Maître Sun écrit : « Nous avons des objets dont nous ne connaissons pas le nombre. Comptés par 3, il en reste 2. Comptés par 5, il en reste 3. Comptés par 7, il en reste 2. »</p><p><strong>Quel est le plus petit nombre d'objets possible ?</strong></p>`,
    reponse: 23, indices: ["Écris les nombres qui donnent un reste de 2 quand on les divise par 7 : 2, 9, 16, 23, 30…", "Parmi eux, garde ceux dont le reste dans la division par 5 est 3."],
    expl: "23 = 3 × 7 + 2 = 5 × 4 + 3 = 7 × 3 + 2. Les solutions suivantes sont 128, 233… : on ajoute chaque fois 3 × 5 × 7 = 105. Ce résultat s'appelle aujourd'hui le théorème des restes chinois, et il sert en cryptographie.",
    histoire: `<aside class="legende"><strong>Histoire ou légende ?</strong> On raconte que les généraux chinois comptaient ainsi leurs soldats, en les faisant ranger par 3, par 5 puis par 7. Le traité de Sun Zi, lui, parle seulement d'« objets ».</aside>` },
  { t: "code", titre: "L'échiquier de Sissa", ep: "moy", date: "récit du XIIIe siècle", origine: "Légende indienne", d: 1,
    accroche: "Un grain sur la première case, deux sur la deuxième, quatre sur la troisième…",
    caches: ["total_grains(2)", "total_grains(10)", "total_grains(20)"],
    enonce: `<p>Pour remercier l'inventeur du jeu d'échecs, un roi lui promet ce qu'il voudra. Le sage demande un grain de blé sur la première case de l'échiquier, deux sur la deuxième, quatre sur la troisième, et ainsi de suite en doublant jusqu'à la soixante-quatrième.</p><p>Écris la fonction <code>total_grains(cases)</code> qui renvoie le nombre total de grains posés sur les <code>cases</code> premières cases. Puis exécute <code>print(total_grains(64))</code> pour connaître la dette du roi.</p><aside class="legende"><strong>Histoire ou légende ?</strong> C'est une légende, dont la plus ancienne version connue est rapportée par l'historien Ibn Khallikan au XIII<sup>e</sup> siècle. Le total dépasse 18 milliards de milliards de grains, bien plus que tout le blé récolté dans l'histoire de l'humanité.</aside>`,
    depart: `def total_grains(cases):
    total = 0
    grains = 1      # grains sur la case en cours
    # à compléter
    return total
`,
    solution: `def total_grains(cases):
    total = 0
    grains = 1      # grains sur la case en cours
    for i in range(cases):
        total = total + grains
        grains = grains * 2
    return total
`,
    tests: [{ appels: [["total_grains(1)", "1"], ["total_grains(3)", "7"], ["total_grains(8)", "255"], ["total_grains(64)", "18446744073709551615"]] }],
    indices: ["Une boucle for qui tourne « cases » fois : à chaque tour, on ajoute les grains de la case, puis on double pour la case suivante.", "total = total + grains, puis grains = grains * 2.", "Remarque le résultat pour 3 cases (7) et 8 cases (255) : c'est toujours une puissance de 2, moins 1."] },
  { t: "code", titre: "Les lapins de Fibonacci", ep: "moy", date: "1202", origine: "Pise, Liber abaci", d: 2,
    accroche: "Un couple de lapins dans un enclos. Combien au bout d'un an ?",
    caches: ["lapins(3)", "lapins(7)", "lapins(20)"],
    enonce: `<p>Léonard de Pise, dit Fibonacci, pose ce problème dans son <em>Liber abaci</em> : on place un couple de lapins dans un enclos. Chaque couple donne naissance à un nouveau couple chaque mois, à partir de son deuxième mois d'existence. Aucun lapin ne meurt.</p><p>Au départ, il y a 1 couple. Au bout d'un mois, 2 couples. Ensuite, le nombre de couples d'un mois est la somme des nombres de couples des deux mois précédents.</p><p>Écris la fonction <code>lapins(mois)</code> qui renvoie le nombre de couples au bout de <code>mois</code> mois, avec <code>lapins(0) = 1</code> et <code>lapins(1) = 2</code>. Combien de couples au bout de 12 mois ?</p><aside class="contexte"><strong>Un livre qui change l'Europe.</strong> Le <em>Liber abaci</em> (1202) est surtout célèbre pour autre chose : Fibonacci, qui a grandi à Béjaïa, en Algérie, y présente aux marchands européens les chiffres indo-arabes et le calcul écrit, bien plus efficaces que les chiffres romains.</aside>`,
    depart: `def lapins(mois):
    avant, maintenant = 1, 2     # couples au mois 0 et au mois 1
    # à compléter
    return maintenant
`,
    solution: `def lapins(mois):
    avant, maintenant = 1, 2     # couples au mois 0 et au mois 1
    if mois == 0:
        return avant
    for i in range(mois - 1):
        avant, maintenant = maintenant, avant + maintenant
    return maintenant
`,
    tests: [{ appels: [["lapins(0)", "1"], ["lapins(1)", "2"], ["lapins(2)", "3"], ["lapins(5)", "13"], ["lapins(12)", "377"]] }],
    indices: ["Pour mois = 0, il faut renvoyer 1 : traite ce cas à part.", "Pour passer d'un mois au suivant : avant, maintenant = maintenant, avant + maintenant.", "Pour arriver au mois voulu en partant du mois 1, il faut répéter ce passage mois − 1 fois."] },
  { t: "reponse", titre: "La partie interrompue", ep: "mod", date: "1654", origine: "Paris et Toulouse", d: 3,
    accroche: "Comment partager l'enjeu d'un jeu qu'on n'a pas fini ? Pascal et Fermat inventent les probabilités pour répondre.",
    enonce: `<p>Deux joueurs misent 32 pistoles chacun. Ils jouent à pile ou face, manche après manche : le premier qui gagne 3 manches emporte les 64 pistoles. La partie est interrompue alors que le premier joueur mène 2 manches à 1.</p><p>Blaise Pascal et Pierre de Fermat échangent des lettres à ce sujet pendant l'été 1654. Leur principe : partager l'enjeu selon les chances que chacun avait de gagner si la partie avait continué.</p><p><strong>Combien de pistoles doit recevoir le joueur qui mène ?</strong></p>`,
    reponse: 48, indices: ["Imagine la manche suivante. Si le joueur qui mène la gagne, il emporte tout. Sinon, que vaut la situation ?", "S'il perd la manche suivante, les joueurs sont à 2 partout : chacun devrait alors recevoir 32 pistoles.", "Il est donc sûr d'avoir 32 pistoles, et il a une chance sur deux de gagner les 32 autres."],
    expl: "Le joueur qui mène est sûr de 32 pistoles, et les 32 autres se jouent à une chance sur deux : il lui en revient la moitié, soit 16. Total : 48 pistoles, contre 16 pour son adversaire. C'est le raisonnement de Pascal ; Fermat arrive au même résultat en comptant les suites de manches possibles.",
    histoire: `<aside class="contexte"><strong>La naissance des probabilités.</strong> Le problème des partis circule depuis le XV<sup>e</sup> siècle, et plusieurs mathématiciens italiens s'y sont trompés. Il est soumis à Pascal par Antoine Gombaud, chevalier de Méré, joueur et homme de lettres. La correspondance de 1654 entre Pascal, à Paris, et Fermat, à Toulouse, est considérée comme l'acte de naissance du calcul des probabilités.</aside>` },
  { t: "reponse", titre: "La punition du petit Gauss", ep: "mod", date: "vers 1786", origine: "Brunswick", d: 1,
    accroche: "Additionner tous les entiers de 1 à 1 000 sans y passer la journée.",
    enonce: `<p>On raconte qu'un maître d'école, pour occuper sa classe, demanda à ses élèves d'additionner tous les entiers de 1 à 100. Le jeune Carl Friedrich Gauss, neuf ans, aurait posé son ardoise presque aussitôt, avec la bonne réponse : 5 050.</p><p>Son idée : écrire la somme à l'endroit, puis à l'envers, et additionner terme à terme.</p><p><strong>Combien vaut la somme de tous les entiers de 1 à 1 000 ?</strong></p>`,
    reponse: 500500, indices: ["1 + 1 000 = 1 001. Et 2 + 999 ? Et 3 + 998 ?", "On peut former 500 paires dont la somme vaut 1 001."],
    expl: "500 paires de somme 1 001 : 500 × 1 001 = 500 500. En général, 1 + 2 + … + n = n(n + 1)/2.",
    histoire: `<aside class="legende"><strong>Histoire ou légende ?</strong> L'anecdote vient d'un éloge de Gauss publié en 1856, un an après sa mort, par son ami Wolfgang Sartorius. Ce texte parle d'une suite de nombres à additionner, sans dire lesquels : les nombres de 1 à 100 ont été ajoutés par des auteurs plus tardifs. La formule, elle, était connue depuis l'Antiquité.</aside>` },
  { t: "code", titre: "Le vol de Collatz", ep: "cont", date: "1937", origine: "Hambourg", d: 2,
    accroche: "Une règle qu'un enfant comprend, une question que personne ne sait résoudre.",
    caches: ["duree_vol(2)", "duree_vol(97)", "duree_vol(1000)"],
    enonce: `<p>Choisis un entier positif. S'il est pair, divise-le par 2. S'il est impair, multiplie-le par 3 et ajoute 1. Recommence avec le résultat. En partant de 6 : 6, 3, 10, 5, 16, 8, 4, 2, 1.</p><p>En 1937, Lothar Collatz conjecture que l'on finit toujours par tomber sur 1, quel que soit l'entier de départ. On l'a vérifié par ordinateur pour des milliards de milliards de nombres. <strong>Personne n'a encore réussi à le démontrer.</strong></p><p>Écris la fonction <code>duree_vol(n)</code> qui renvoie le nombre d'étapes nécessaires pour atteindre 1 en partant de <code>n</code>. Pour 6, il faut 8 étapes. Essaie ensuite avec 27.</p>`,
    depart: `def duree_vol(n):
    etapes = 0
    # à compléter
    return etapes
`,
    solution: `def duree_vol(n):
    etapes = 0
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        etapes = etapes + 1
    return etapes
`,
    tests: [{ appels: [["duree_vol(1)", "0"], ["duree_vol(6)", "8"], ["duree_vol(7)", "16"], ["duree_vol(27)", "111"]] }],
    requis: ["while"],
    indices: ["On ne sait pas d'avance combien de tours il faudra : c'est une boucle while n != 1.", "n est pair quand n % 2 == 0. Utilise n // 2 pour garder un entier.", "N'oublie pas de compter : etapes = etapes + 1 à chaque tour de boucle."] },
  { t: "code", titre: "Le paradoxe des anniversaires", ep: "cont", date: "1939", origine: "Richard von Mises", d: 3,
    accroche: "Dans ta classe, deux élèves ont-ils le même anniversaire ? C'est bien plus probable que tu ne le crois.",
    caches: ["meme_anniversaire(3)", "meme_anniversaire(30)", "meme_anniversaire(366)"],
    enonce: `<p>Dans un groupe de <span class="m">n</span> personnes, quelle est la probabilité qu'au moins deux d'entre elles fêtent leur anniversaire le même jour ? On suppose que l'année compte 365 jours, tous aussi probables.</p><p>Il est plus simple de calculer la probabilité que tous les anniversaires soient <em>différents</em> : la deuxième personne doit éviter 1 jour, la troisième 2 jours, et ainsi de suite.</p><p class="formule"><span class="frac"><span>365</span><span>365</span></span> × <span class="frac"><span>364</span><span>365</span></span> × <span class="frac"><span>363</span><span>365</span></span> × … (<span class="m">n</span> facteurs)</p><p>Écris la fonction <code>meme_anniversaire(n)</code> qui renvoie la probabilité qu'au moins deux personnes sur <code>n</code> aient le même anniversaire. Cherche ensuite à partir de quel effectif cette probabilité dépasse 1/2.</p>`,
    depart: `def meme_anniversaire(n):
    tous_differents = 1
    # à compléter
    return tous_differents
`,
    solution: `def meme_anniversaire(n):
    tous_differents = 1
    for k in range(n):
        tous_differents = tous_differents * (365 - k) / 365
    return 1 - tous_differents
`,
    tests: [{ appels: [["meme_anniversaire(1)", "0.0"], ["meme_anniversaire(2)", "0.002739726027397249"], ["meme_anniversaire(23)", "0.5072972343239857"], ["meme_anniversaire(50)", "0.9703735795779884"]] }],
    indices: ["Une boucle for k in range(n) : au tour k, on multiplie par (365 − k) / 365.", "La fonction doit renvoyer la probabilité contraire : 1 − tous_differents.", "Une fois la fonction validée, compare meme_anniversaire(22) et meme_anniversaire(23)."] },
] };
