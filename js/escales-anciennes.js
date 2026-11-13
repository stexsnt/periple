/* PÉRIPLE — escales de l'Antiquité et du Moyen Âge ajoutées après le pilote.
   Même format que js/contenu.js (décrit en tête de ce fichier). L'assemblage dans PARCOURS se fait à la fin de js/escales-modernes.js. */

const ESCALES_ANT = [
{
  id: "babylone", an: -1800, date: "vers 1800 av. J.-C.", lieu: "Mésopotamie", genre: "methode", niveau: "Dès la Seconde",
  titre: "Babylone et la racine de 2", resume: "Une tablette d'argile, six chiffres exacts",
  accroche: "Sur une tablette grande comme la paume, un apprenti scribe a noté √2 avec six chiffres exacts. Mille ans avant Pythagore.",
  etapes: [
    { t: "lecon", titre: "La diagonale du carré",
      texte: `<p>Trace un carré de côté 1. Sa diagonale mesure le nombre dont le carré vaut 2 : on l'écrit aujourd'hui <span class="m">√2</span>. Combien cela fait-il ?</p>
<p>Vers 1800 av. J.-C., en Mésopotamie, un élève scribe trace ce carré dans une boulette d'argile fraîche et note la réponse le long de la diagonale. La tablette existe toujours : elle porte le numéro YBC 7289 et tient dans le creux de la main.</p>
<p>Le nombre qu'il a inscrit vaut 1,414213, alors que <span class="m">√2</span> = 1,4142135… Six chiffres exacts, sans calculatrice et sans écriture décimale.</p>
<p>On ignore comment il a fait. Mais une méthode très simple donne exactement ce résultat, et les scribes avaient tout ce qu'il faut pour l'appliquer. Tu vas la refaire.</p>` },
    { t: "quiz", titre: "Rendre un rectangle carré", widget: "heron",
      intro: "On cherche un carré d'aire 2. On part d'un rectangle d'aire 2 : côtés 1 et 2. Il est trop allongé. On remplace alors un côté par la moyenne des deux côtés, et on calcule l'autre pour que l'aire reste égale à 2. Recommence plusieurs fois.",
      questions: [
        { q: "En partant de 1, quel est le côté après une étape ?", choix: ["1,25", "1,5", "1,75", "2"], bon: 1, expl: "La moyenne de 1 et de 2 est 1,5. L'autre côté devient 2 ÷ 1,5 ≈ 1,3333 pour que l'aire reste 2." },
        { q: "Après deux étapes, combien de chiffres après la virgule sont déjà ceux de √2 ?", choix: ["Aucun", "Deux", "Cinq", "Dix"], bon: 1, expl: "On obtient 1,41666… et √2 = 1,41421… : les deux premiers chiffres après la virgule sont bons." },
        { q: "Et après trois étapes ?", choix: ["Deux", "Trois", "Cinq", "Dix"], bon: 2, expl: "1,4142156… contre 1,4142135… : cinq chiffres exacts après la virgule. C'est la précision de la tablette." },
        { q: "D'une étape à la suivante, le nombre de chiffres exacts…", choix: ["augmente de 1", "double à peu près", "reste le même", "diminue"], bon: 1, expl: "Deux, puis cinq, puis onze : le nombre de chiffres exacts double à peu près à chaque étape. Archimède, avec ses polygones, devra doubler ses côtés deux fois pour gagner un seul chiffre." },
      ] },
    { t: "lecon", titre: "Compter par soixante",
      texte: `<p>Les scribes de Mésopotamie n'écrivent pas en base dix, mais en base soixante. Sur la tablette, la diagonale porte quatre nombres : 1, 24, 51 et 10. Il faut lire :</p>
<p class="formule">1 + <span class="frac"><span>24</span><span>60</span></span> + <span class="frac"><span>51</span><span>60²</span></span> + <span class="frac"><span>10</span><span>60³</span></span> ≈ 1,414213</p>
<p>Il nous reste quelque chose de cette façon de compter : une heure fait 60 minutes, une minute 60 secondes, et un tour complet 360 degrés.</p>
<aside class="contexte"><strong>Les écoles de scribes.</strong> Au temps du roi Hammurabi, les futurs scribes apprennent à lire, à écrire et à calculer dans des écoles appelées « maisons des tablettes ». Ils recopient des tables de multiplication, d'inverses et de carrés. On a retrouvé des milliers de leurs exercices : l'argile, une fois sèche, traverse les millénaires.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> On appelle souvent ce procédé « méthode babylonienne ». Aucune tablette ne le décrit : c'est une reconstitution plausible. La première description écrite date du I<sup>er</sup> siècle de notre ère, chez Héron d'Alexandrie, d'où son autre nom de « méthode de Héron ».</aside>` },
    { t: "qcm", titre: "Lire une tablette",
      q: "Dans l'écriture des scribes, un nombre noté « 1 ; 30 » se lit 1 + 30/60. Combien vaut-il en écriture décimale ?",
      choix: ["1,3", "1,30", "1,5", "90"], bon: 2,
      retours: ["30 soixantièmes ne font pas 3 dixièmes.", "30 soixantièmes ne font pas 30 centièmes.", null, "90 serait la lecture 1 × 60 + 30. Ici, le 30 compte des soixantièmes."],
      expl: "30/60 = 1/2, donc 1 ; 30 = 1,5. La même écriture pouvait aussi se lire 90 : les scribes ne notaient pas la virgule, et c'est le contexte qui tranchait." },
    { t: "code", titre: "La méthode en Python", d: 2,
      caches: ["heron(2, 4)", "heron(16, 6)", "heron(5, 2)"],
      enonce: `<p>Pour approcher <span class="m">√a</span>, on part de 1 et on remplace plusieurs fois <span class="m">x</span> par la moyenne de <span class="m">x</span> et de <span class="m">a</span> ÷ <span class="m">x</span>.</p><p>Écris la fonction <code>heron(a, n)</code> qui renvoie la valeur obtenue après <code>n</code> étapes.</p>`,
      depart: `def heron(a, n):
    x = 1
    # à compléter : répéter n fois la moyenne
    return x
`,
      solution: `def heron(a, n):
    x = 1
    for i in range(n):
        x = (x + a / x) / 2
    return x
`,
      tests: [{ appels: [["heron(2, 0)", "1"], ["heron(2, 1)", "1.5"], ["heron(2, 3)", "1.4142156862745097"], ["heron(9, 4)", "3.00009155413138"]] }],
      indices: ["Une boucle for i in range(n) répète n fois.", "À chaque tour : x = (x + a / x) / 2.", "Attention aux parenthèses : la somme d'abord, la division par 2 ensuite."] },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Trouver la longueur de la diagonale d'un carré de côté 1, c'est-à-dire <span class="m">√2</span>.</p>
<p><strong>La méthode.</strong> Partir d'un rectangle d'aire 2 et remplacer un côté par la moyenne des deux côtés. Le rectangle se rapproche d'un carré, et le nombre de chiffres exacts double à peu près à chaque étape.</p>
<p><strong>Le contexte.</strong> Tablette YBC 7289, Mésopotamie, vers 1800 av. J.-C. Numération en base soixante, dont il nous reste les minutes et les secondes.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>appliquer la méthode pour approcher une racine carrée</li><li>expliquer pourquoi on garde l'aire égale à 2</li><li>convertir un nombre simple de la base soixante vers l'écriture décimale</li><li>distinguer ce que montre la tablette de ce que l'on suppose</li></ul>` },
  ] },
{
  id: "pythagore", an: -530, date: "vers 530 av. J.-C.", lieu: "Crotone, Grande-Grèce", genre: "figure", niveau: "Dès la Seconde",
  titre: "Pythagore et le scandale des irrationnels", resume: "Un nombre qui n'est le quotient d'aucun entier",
  accroche: "Pour les pythagoriciens, tout est rapport de nombres entiers. Jusqu'au jour où la diagonale du carré refuse d'obéir.",
  etapes: [
    { t: "manip", titre: "La chasse à la fraction", widget: "chasse",
      intro: `<p>À Babylone, on savait approcher <span class="m">√2</span> d'aussi près qu'on voulait. Les Grecs posent une autre question : existe-t-il une fraction qui vaut <em>exactement</em> <span class="m">√2</span> ?</p><p>Une fraction <span class="m">p/q</span> convient si son carré vaut 2, autrement dit si <span class="m">p</span>² = 2 × <span class="m">q</span>². Cherche-la. Teste au moins cinq fractions.</p>`,
      expl: "7/5, 17/12, 41/29, 99/70 : chaque fois, il manque ou il reste une unité. On peut approcher 2 d'aussi près qu'on veut, jamais l'atteindre. Reste à prouver que ce n'est pas une question de patience." },
    { t: "quiz", titre: "La preuve par le pair et l'impair",
      intro: "Supposons qu'une fraction p/q convienne, et qu'on l'ait simplifiée au maximum : p et q ne sont pas tous les deux pairs. On a donc p² = 2 × q².",
      questions: [
        { q: "p² est le double de q². Que peut-on dire de p² ?", choix: ["Il est pair.", "Il est impair.", "On ne peut rien dire."], bon: 0, expl: "Le double d'un entier est toujours pair." },
        { q: "Le carré d'un nombre impair est toujours impair (3² = 9, 5² = 25…). Puisque p² est pair, que peut-on dire de p ?", choix: ["p est impair.", "p est pair.", "p vaut 2."], bon: 1, expl: "Si p était impair, son carré le serait aussi. Donc p est pair : on peut écrire p = 2k." },
        { q: "On remplace p par 2k dans p² = 2 × q². On obtient 4k² = 2 × q², donc q² = 2k². Que peut-on dire de q ?", choix: ["q est impair.", "q est pair.", "q vaut k."], bon: 1, expl: "q² est le double d'un entier, donc pair, donc q est pair par le même raisonnement que pour p." },
        { q: "p et q sont tous les deux pairs. Or on avait simplifié la fraction au maximum. Que faut-il en conclure ?", choix: ["Il faut simplifier encore une fois.", "La fraction cherchée n'existe pas.", "Le raisonnement contient une erreur."], bon: 1, expl: "On arrive à une contradiction : une fraction simplifiée au maximum qui se simplifie encore par 2. L'hypothèse de départ est donc fausse. Aucune fraction n'a pour carré 2 : on dit que √2 est irrationnel." },
      ] },
    { t: "lecon", titre: "Tout est nombre",
      texte: `<p>Vers 530 av. J.-C., <strong>Pythagore</strong> quitte l'île de Samos et s'installe à Crotone, dans le sud de l'Italie. Il y fonde une communauté qui tient à la fois de l'école, de la confrérie religieuse et du parti politique. On y partage ses biens, on y suit des règles de vie strictes, on y étudie les nombres, la musique et les astres.</p>
<p>Les pythagoriciens ont une conviction : le monde s'explique par des rapports de nombres entiers. Deux cordes dont les longueurs sont dans le rapport 2 à 1 sonnent à l'octave ; 3 à 2, à la quinte. Si tout est rapport d'entiers, toute longueur doit s'écrire comme une fraction.</p>
<p>La diagonale du carré ruine cette idée. Elle existe, on peut la tracer, et aucune fraction ne la mesure. Il faudra plus de deux mille ans pour définir proprement ces nombres, que l'on appelle aujourd'hui irrationnels.</p>
<aside class="legende"><strong>Histoire ou légende ?</strong> On raconte que le pythagoricien Hippase de Métaponte fut jeté à la mer pour avoir révélé la découverte. Le récit vient de Jamblique, qui écrit environ huit cents ans après les faits, et il en donne lui-même plusieurs versions. Pythagore n'a laissé aucun écrit, et l'on ne sait pas qui a trouvé la preuve. Quant au théorème qui porte son nom, les scribes de Babylone l'utilisaient déjà mille ans plus tôt.</aside>` },
    { t: "tri", titre: "Fraction ou pas ?",
      q: "Chacun de ces nombres peut-il s'écrire comme le quotient de deux entiers ?",
      categories: ["Rationnel", "Irrationnel"],
      items: [
        { txt: "0,75", cat: 0, expl: "0,75 = 3/4." },
        { txt: "√9", cat: 0, expl: "√9 = 3, un entier." },
        { txt: "√2", cat: 1, expl: "C'est le résultat que tu viens de démontrer." },
        { txt: "22/7", cat: 0, expl: "C'est une fraction. Ce n'est pas π, qui est seulement proche de 22/7." },
        { txt: "π", cat: 1, expl: "π est irrationnel. La preuve est bien plus difficile : elle date de 1761, par Jean-Henri Lambert." },
        { txt: "0,333… (des 3 à l'infini)", cat: 0, expl: "0,333… = 1/3. Une écriture décimale infinie mais périodique correspond toujours à une fraction." },
        { txt: "√5", cat: 1, expl: "La racine carrée d'un entier qui n'est pas un carré parfait est toujours irrationnelle." },
      ] },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> La diagonale du carré de côté 1 peut-elle s'écrire comme une fraction ?</p>
<p><strong>La réponse.</strong> Non. Si <span class="m">p</span>² = 2<span class="m">q</span>², alors <span class="m">p</span> est pair, puis <span class="m">q</span> aussi : la fraction ne peut pas être simplifiée au maximum. C'est un raisonnement par l'absurde.</p>
<p><strong>Le vocabulaire.</strong> Un nombre rationnel est le quotient de deux entiers. Les autres sont irrationnels.</p>
<p><strong>Le contexte.</strong> École pythagoricienne, Crotone, VI<sup>e</sup> et V<sup>e</sup> siècles av. J.-C. La preuve par le pair et l'impair est citée par Aristote.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>refaire la preuve de l'irrationalité de √2</li><li>expliquer ce qu'est un raisonnement par l'absurde</li><li>reconnaître un nombre rationnel</li><li>distinguer une approximation d'une égalité</li></ul>` },
  ] },
{
  id: "zenon", an: -450, date: "vers 450 av. J.-C.", lieu: "Élée, Grande-Grèce", genre: "paradoxe", niveau: "Dès la Seconde, suites en Première",
  titre: "Zénon, Achille et la tortue", resume: "Une infinité d'étapes en un temps fini",
  accroche: "Achille court dix fois plus vite que la tortue. Zénon démontre qu'il ne la rattrapera jamais. Où est l'erreur ?",
  etapes: [
    { t: "pari", titre: "Une infinité de durées",
      q: "On additionne une infinité de durées, toutes strictement positives : une première, puis une deuxième, puis une troisième, sans jamais s'arrêter. Que vaut le total ?",
      choix: ["Il est forcément infini.", "Il peut être fini.", "Cela n'a aucun sens : on ne peut pas additionner une infinité de nombres."] },
    { t: "quiz", titre: "La course, étape par étape", widget: "zenon",
      intro: "Achille court à 10 m/s, la tortue avance à 1 m/s et part avec 100 m d'avance. À chaque étape de Zénon, Achille rejoint l'endroit où se trouvait la tortue. Pendant ce temps, elle a un peu avancé.",
      questions: [
        { q: "Combien de temps dure la première étape ?", choix: ["1 s", "10 s", "100 s"], bon: 1, expl: "Achille doit parcourir 100 m à 10 m/s : 10 secondes. Pendant ce temps, la tortue avance de 10 m." },
        { q: "Et la deuxième étape ?", choix: ["0,1 s", "1 s", "10 s"], bon: 1, expl: "Il reste 10 m à combler : 1 seconde. Chaque étape dure dix fois moins que la précédente." },
        { q: "Quel temps s'est écoulé au bout de quatre étapes ?", choix: ["11 s", "11,1 s", "11,11 s", "40 s"], bon: 2, expl: "10 + 1 + 0,1 + 0,01 = 11,11 secondes." },
        { q: "En continuant indéfiniment, le temps écoulé dépassera-t-il 12 secondes ?", choix: ["Oui, il suffit d'attendre assez d'étapes.", "Non, jamais.", "On ne peut pas le savoir."], bon: 1, expl: "11,1 puis 11,11 puis 11,111… : le total grandit toujours, mais reste sous 11,12. Une infinité d'étapes tient dans un temps fini, 100/9 de seconde. Passé cet instant, Achille est devant." },
      ] },
    { t: "lecon", titre: "Le philosophe qui niait le mouvement",
      texte: `<p><strong>Zénon</strong> naît vers 490 av. J.-C. à Élée, cité grecque du sud de l'Italie. Il est l'élève de Parménide, qui soutient une thèse radicale : le changement et le mouvement ne sont que des apparences. Pour défendre son maître, Zénon invente des raisonnements qui partent d'une évidence et aboutissent à une absurdité.</p>
<p>Celui d'Achille est le plus célèbre. Zénon a raison sur un point : il y a bien une infinité d'étapes. Son erreur est de croire qu'une infinité d'étapes demande un temps infini.</p>
<p>En notation d'aujourd'hui, les durées forment une suite géométrique : chacune vaut la précédente multipliée par <span class="m">q</span> = 1/10. Quand <span class="m">q</span> est compris entre 0 et 1, la somme de toutes les durées est finie :</p>
<p class="formule"><span class="m">a</span> + <span class="m">aq</span> + <span class="m">aq</span>² + <span class="m">aq</span>³ + … = <span class="frac"><span><span class="m">a</span></span><span>1 − <span class="m">q</span></span></span></p>
<p>Ici : 10 ÷ (1 − 0,1) = 100/9 ≈ 11,11 secondes.</p>
<aside class="contexte"><strong>Deux mille ans d'embarras.</strong> Aristote discute les arguments de Zénon sans parvenir à les réfuter complètement. En 1647, le jésuite Grégoire de Saint-Vincent calcule l'instant du dépassement à l'aide d'une somme infinie. La notion de limite, qui donne un sens rigoureux à ces sommes, est fixée par Augustin Cauchy en 1821.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> Aucun texte de Zénon ne nous est parvenu. Nous connaissons ses paradoxes par Aristote, qui les résume un siècle plus tard, et pour les contredire. Le choix d'Achille et d'une tortue vient peut-être des commentateurs.</aside>` },
    { t: "quiz", titre: "Un autre paradoxe : la moitié du chemin",
      intro: "Pour traverser une pièce, il faut d'abord en parcourir la moitié, puis la moitié de ce qui reste, puis encore la moitié du reste… On additionne donc 1/2 + 1/4 + 1/8 + 1/16 + …",
      questions: [
        { q: "Que vaut 1/2 + 1/4 + 1/8 ?", choix: ["3/4", "7/8", "1", "3/14"], bon: 1, expl: "4/8 + 2/8 + 1/8 = 7/8. Il manque 1/8, c'est-à-dire exactement le dernier terme ajouté." },
        { q: "Après avoir ajouté dix termes, que reste-t-il à parcourir ?", choix: ["1/10", "1/20", "1/1024", "Rien"], bon: 2, expl: "Il reste toujours le dernier terme ajouté : 1/2¹⁰ = 1/1024." },
        { q: "Vers quoi la somme se rapproche-t-elle quand on ajoute de plus en plus de termes ?", choix: ["Vers 1", "Vers 2", "Vers l'infini"], bon: 0, expl: "La distance qui reste est divisée par 2 à chaque étape : elle devient aussi petite qu'on veut. La somme vaut 1, la longueur de la pièce." },
      ] },
    { t: "code", titre: "Additionner sans fin, ou presque", d: 1,
      caches: ["somme_geometrique(0.5, 5)", "somme_geometrique(0.1, 4)", "somme_geometrique(3, 3)"],
      enonce: `<p>Écris la fonction <code>somme_geometrique(q, n)</code> qui renvoie la somme <span class="m">q</span> + <span class="m">q</span>² + <span class="m">q</span>³ + … + <span class="m">q</span><sup><span class="m">n</span></sup>.</p><p>Essaie ensuite <code>print(somme_geometrique(0.5, 50))</code>, puis remplace 0.5 par 2.</p>`,
      depart: `def somme_geometrique(q, n):
    total = 0
    # à compléter
    return total
`,
      solution: `def somme_geometrique(q, n):
    total = 0
    for k in range(1, n + 1):
        total = total + q ** k
    return total
`,
      tests: [{ appels: [["somme_geometrique(0.5, 3)", "0.875"], ["somme_geometrique(0.5, 10)", "0.9990234375"], ["somme_geometrique(0.1, 2)", "0.11000000000000001"], ["somme_geometrique(2, 4)", "30"]] }],
      indices: ["k doit prendre les valeurs 1, 2, …, n : range(1, n + 1).", "q puissance k s'écrit q ** k.", "À chaque tour : total = total + q ** k."] },
    { t: "qcm", titre: "Attention aux sommes infinies",
      q: "Les termes de la somme 1 + 1/2 + 1/3 + 1/4 + 1/5 + … deviennent aussi petits qu'on veut. Cette somme est-elle finie ?",
      choix: ["Oui : des termes qui tendent vers 0 donnent toujours une somme finie.", "Non : elle dépasse n'importe quel nombre, à condition d'ajouter assez de termes.", "Elle vaut exactement 2."], bon: 1,
      retours: ["C'est l'intuition naturelle, et elle est fausse. Les termes doivent diminuer assez vite.", null, "C'est la somme 1 + 1/2 + 1/4 + 1/8 + … qui vaut 2."],
      expl: "Vers 1350, Nicole Oresme regroupe les termes : 1/3 + 1/4 dépasse 1/2, 1/5 + 1/6 + 1/7 + 1/8 dépasse 1/2, et ainsi de suite. On ajoute donc une infinité de fois plus de 1/2. Zénon avait tort pour Achille, mais sa méfiance n'était pas absurde : certaines sommes infinies sont bel et bien infinies." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le paradoxe.</strong> Achille doit franchir une infinité d'étapes pour rattraper la tortue, donc il ne la rattrape jamais.</p>
<p><strong>L'erreur.</strong> Une infinité de durées peut avoir une somme finie. Ici : 10 + 1 + 0,1 + … = 100/9 secondes.</p>
<p><strong>L'outil.</strong> Somme d'une suite géométrique de raison <span class="m">q</span> entre 0 et 1 : <span class="m">a</span> ÷ (1 − <span class="m">q</span>).</p>
<p><strong>La prudence.</strong> Toutes les sommes infinies ne sont pas finies : 1 + 1/2 + 1/3 + … dépasse tout nombre.</p>
<p><strong>Le contexte.</strong> Zénon d'Élée, vers 450 av. J.-C., connu par Aristote. Notion de limite : Cauchy, 1821.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>expliquer où le raisonnement de Zénon se trompe</li><li>calculer l'instant où Achille rattrape la tortue</li><li>additionner les premiers termes d'une suite géométrique</li><li>donner un exemple de somme infinie qui n'est pas finie</li></ul>` },
  ] },
{
  id: "euclide", an: -300, date: "vers 300 av. J.-C.", lieu: "Alexandrie, Égypte", genre: "methode", niveau: "Dès la Seconde",
  titre: "L'algorithme d'Euclide", resume: "Le plus vieil algorithme encore en service",
  accroche: "Il a vingt-trois siècles et il tourne chaque fois que tu ouvres une page web sécurisée. On peut le comprendre avec un rectangle et des carrés.",
  etapes: [
    { t: "lecon", titre: "Le carreleur d'Alexandrie",
      texte: `<p>Tu dois carreler une pièce rectangulaire de 48 sur 18 avec des carreaux carrés, tous identiques, sans en couper un seul. Tu veux les carreaux <strong>les plus grands possible</strong>. Quel côté choisir ?</p>
<p>Le côté du carreau doit tomber juste dans 48 et dans 18 : c'est un diviseur commun aux deux nombres. Le plus grand s'appelle le <strong>PGCD</strong>, plus grand commun diviseur.</p>
<p>On pourrait écrire tous les diviseurs de 48 et tous ceux de 18, puis comparer. Avec de grands nombres, ce serait interminable. Vers 300 av. J.-C., <strong>Euclide</strong> décrit un procédé qui n'a besoin d'aucune liste : retirer du rectangle le plus grand carré possible, et recommencer avec ce qui reste.</p>` },
    { t: "quiz", titre: "Découper en carrés", widget: "euclide",
      intro: "Retire chaque fois le plus grand carré qui tient dans le rectangle restant. Commence par le rectangle 48 × 18, puis essaie les autres.",
      questions: [
        { q: "Rectangle 48 × 18 : combien de carrés de côté 18 peut-on retirer d'abord ?", choix: ["1", "2", "3"], bon: 1, expl: "48 = 2 × 18 + 12 : deux carrés de côté 18, et il reste un rectangle de 18 sur 12." },
        { q: "Quel est le côté du dernier carré, celui qui termine le découpage ?", choix: ["2", "3", "6", "12"], bon: 2, expl: "18 = 1 × 12 + 6, puis 12 = 2 × 6 + 0. Le dernier carré a pour côté 6." },
        { q: "Pourquoi ce dernier carré pave-t-il tout le rectangle de départ ?", choix: ["Parce qu'il est le plus petit.", "Parce que son côté tombe juste dans tous les carrés précédents.", "C'est un hasard propre à cet exemple."], bon: 1, expl: "6 tombe juste dans 12, donc dans 18 = 12 + 6, donc dans 48 = 2 × 18 + 12. Et aucun carré plus grand ne convient. Le PGCD de 48 et 18 est 6." },
        { q: "Essaie le rectangle 34 × 21. Que vaut le PGCD ?", choix: ["1", "3", "7", "13"], bon: 0, expl: "On descend jusqu'au carré de côté 1 : 34 et 21 n'ont aucun diviseur commun à part 1. On dit qu'ils sont premiers entre eux. Ici, on ne retire qu'un carré à chaque fois : c'est le cas le plus lent." },
      ] },
    { t: "lecon", titre: "Les Éléments",
      texte: `<p>Retirer deux carrés de côté 18 dans une longueur de 48 et constater qu'il reste 12, c'est faire une division : 48 = 2 × 18 + 12. L'algorithme d'Euclide s'écrit donc comme une suite de divisions, où l'on remplace chaque fois le grand nombre par le petit, et le petit par le reste. Le PGCD est le dernier reste non nul.</p>
<p>Ce procédé ouvre le livre VII des <em>Éléments</em>, treize livres où Euclide rassemble et ordonne les mathématiques grecques. Tout y est démontré à partir de quelques définitions et de quelques principes admis au départ. Pendant plus de deux mille ans, c'est le manuel de référence, et l'ouvrage scientifique le plus recopié puis le plus imprimé.</p>
<aside class="contexte"><strong>Alexandrie.</strong> Fondée par Alexandre le Grand en 331 av. J.-C., la ville devient sous les Ptolémées la capitale savante de la Méditerranée. Le Musée accueille des savants payés pour chercher, et la Bibliothèque veut réunir tous les livres du monde. Euclide, Ératosthène et plus tard Héron y travaillent ; Archimède correspond avec eux.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> D'Euclide lui-même, on ne sait presque rien, pas même ses dates. Au roi Ptolémée qui demandait un chemin plus court que les <em>Éléments</em>, il aurait répondu qu'il n'existe pas de voie royale en géométrie. L'anecdote est rapportée par Proclus, sept siècles plus tard.</aside>` },
    { t: "ordre", texte: true, titre: "Dérouler l'algorithme",
      q: "On cherche le PGCD de 1 071 et 462. Remets les lignes du calcul dans l'ordre.",
      lignes: ["1 071 = 2 × 462 + 147", "462 = 3 × 147 + 21", "147 = 7 × 21 + 0", "Le PGCD est 21, le dernier reste non nul."],
      expl: "À chaque ligne, le diviseur devient le nombre à diviser, et le reste devient le diviseur. Trois divisions suffisent, alors que 1 071 a douze diviseurs et 462 en a seize." },
    { t: "code", titre: "Vingt-trois siècles plus tard", d: 2,
      caches: ["pgcd(21, 15)", "pgcd(34, 21)", "pgcd(1000, 360)"],
      enonce: `<p>Écris la fonction <code>pgcd(a, b)</code> avec l'algorithme d'Euclide : tant que <code>b</code> n'est pas nul, on remplace <code>a</code> par <code>b</code>, et <code>b</code> par le reste de la division de <code>a</code> par <code>b</code>.</p><p>En Python, le reste de la division de <code>a</code> par <code>b</code> s'écrit <code>a % b</code>.</p>`,
      depart: `def pgcd(a, b):
    # à compléter
    return a
`,
      solution: `def pgcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
`,
      tests: [{ appels: [["pgcd(48, 18)", "6"], ["pgcd(1071, 462)", "21"], ["pgcd(17, 5)", "1"], ["pgcd(100, 75)", "25"]] }],
      requis: ["while"], interdit: ["gcd"],
      indices: ["On ne connaît pas d'avance le nombre de divisions : c'est une boucle while b != 0.", "Les deux remplacements doivent se faire en même temps : a, b = b, a % b.", "Quand b vaut 0, le PGCD est dans a."] },
    { t: "qcm", titre: "Encore en service",
      q: "Pourquoi l'algorithme d'Euclide est-il toujours utilisé, notamment pour sécuriser les échanges sur Internet ?",
      choix: ["Parce qu'il reste très rapide même sur des nombres de plusieurs centaines de chiffres.", "Parce qu'aucun autre moyen de calculer un PGCD n'est connu.", "Par tradition."], bon: 0,
      retours: [null, "On peut aussi décomposer les deux nombres en facteurs premiers. Le problème est ailleurs.", "Les ingénieurs ne gardent pas un algorithme par nostalgie."],
      expl: "Décomposer un nombre de 300 chiffres en facteurs premiers est hors de portée des ordinateurs actuels, et c'est même ce qui protège le chiffrement RSA. L'algorithme d'Euclide, lui, traite de tels nombres en une fraction de seconde. Il sert à fabriquer les clés." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Trouver le plus grand diviseur commun à deux entiers, sans dresser la liste de leurs diviseurs.</p>
<p><strong>La méthode.</strong> Diviser le grand par le petit, puis le petit par le reste, et ainsi de suite. Le PGCD est le dernier reste non nul.</p>
<p><strong>L'image.</strong> Retirer d'un rectangle le plus grand carré possible, jusqu'à ce qu'il ne reste rien.</p>
<p><strong>Le contexte.</strong> Euclide, <em>Éléments</em>, livre VII, Alexandrie, vers 300 av. J.-C.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>calculer un PGCD par divisions successives</li><li>reconnaître deux nombres premiers entre eux</li><li>programmer l'algorithme avec une boucle while</li><li>expliquer pourquoi le dernier carré pave tout le rectangle</li></ul>` },
  ] },
{
  id: "eratosthene", an: -240, date: "vers 240 av. J.-C.", lieu: "Alexandrie, Égypte", genre: "methode", niveau: "Dès la Seconde",
  titre: "Le crible d'Ératosthène", resume: "Tamiser les nombres pour garder les premiers",
  accroche: "Le bibliothécaire d'Alexandrie a mesuré la Terre avec un bâton et une ombre. Il a aussi inventé un tamis à nombres premiers.",
  etapes: [
    { t: "manip", titre: "Passe les nombres au tamis", widget: "crible",
      intro: `<p>Un nombre premier est un entier qui a exactement deux diviseurs : 1 et lui-même. Comment trouver tous ceux qui sont inférieurs à 100 sans tester chaque nombre un par un ?</p><p>Ératosthène propose un tamis. On prend le plus petit nombre encore libre : il est premier. On barre tous ses multiples. Et on recommence.</p>`,
      expl: "Quatre passages ont suffi : 2, 3, 5 et 7. Tout nombre non premier inférieur à 100 a un diviseur premier inférieur à 10, donc il a été barré. Les 25 nombres restants sont premiers." },
    { t: "quiz", titre: "Pourquoi le tamis s'arrête si tôt",
      questions: [
        { q: "Quand on passe au nombre 7, quel est le premier de ses multiples qui n'est pas encore barré ?", choix: ["14", "21", "35", "49"], bon: 3, expl: "14 a été barré comme multiple de 2, 21 comme multiple de 3, 35 comme multiple de 5. Le premier multiple de 7 encore libre est 7 × 7 = 49." },
        { q: "Pourquoi est-il inutile de barrer les multiples de 11 quand on s'arrête à 100 ?", choix: ["Parce que 11 n'est pas premier.", "Parce que 11 × 11 dépasse 100 : ses multiples plus petits sont déjà barrés.", "Parce que 11 n'a pas de multiple inférieur à 100."], bon: 1, expl: "22, 33, 44… sont des multiples de 2, 3, 2… déjà barrés. Le premier multiple de 11 qui ne serait pas barré est 11 × 11 = 121, trop grand." },
        { q: "91 est-il premier ?", choix: ["Oui", "Non"], bon: 1, expl: "91 = 7 × 13. C'est l'un des pièges classiques : il n'est divisible ni par 2, ni par 3, ni par 5, et il « a l'air » premier." },
        { q: "Pour trouver tous les nombres premiers jusqu'à 400, jusqu'à quel nombre premier faut-il aller dans le tamis ?", choix: ["7", "19", "23", "199"], bon: 1, expl: "Il faut barrer les multiples des nombres premiers jusqu'à √400 = 20 : le dernier est 19." },
      ] },
    { t: "lecon", titre: "Le bibliothécaire qui mesura la Terre",
      texte: `<p><strong>Ératosthène</strong> naît vers 276 av. J.-C. à Cyrène, dans l'actuelle Libye. Vers 245 av. J.-C., le roi Ptolémée III l'appelle à Alexandrie pour diriger la Bibliothèque. Il s'occupe de géographie, d'astronomie, de chronologie, de poésie et de mathématiques.</p>
<p>Son exploit le plus célèbre n'est pas le crible. À Syène, dans le sud de l'Égypte, le Soleil éclaire le fond des puits à midi, le jour du solstice d'été : il est à la verticale. Au même moment, à Alexandrie, un bâton planté droit fait une ombre : les rayons y sont inclinés d'un cinquantième de tour. Si les rayons du Soleil sont parallèles, cela signifie que la distance entre les deux villes est le cinquantième du tour de la Terre.</p>
<p>La distance est estimée à 5 000 stades. Le tour de la Terre ferait donc 250 000 stades, soit, selon la longueur que l'on donne au stade, entre 39 000 et 46 000 kilomètres. La vraie valeur est d'environ 40 000 kilomètres.</p>
<aside class="legende"><strong>Histoire ou légende ?</strong> Les livres d'Ératosthène sont perdus. Sa mesure de la Terre est racontée par Cléomède, plusieurs siècles plus tard, et le crible est décrit par Nicomaque de Gérase vers l'an 100. Ses collègues le surnommaient « Bêta », la deuxième lettre de l'alphabet : bon partout, premier nulle part, disaient-ils. La postérité a été plus généreuse.</aside>` },
    { t: "qcm", titre: "Refaire le calcul",
      q: "L'angle mesuré à Alexandrie est de 7,2 degrés. On estime la distance entre Syène et Alexandrie à 800 km. Quelle circonférence obtient-on pour la Terre ?",
      choix: ["5 760 km", "28 800 km", "40 000 km", "57 600 km"], bon: 2,
      retours: ["Tu as multiplié 800 par 7,2. Il faut chercher combien de fois 7,2° tient dans un tour.", "Vérifie combien de fois 7,2° tient dans 360°.", null, "Vérifie combien de fois 7,2° tient dans 360°."],
      expl: "360 ÷ 7,2 = 50 : l'arc entre les deux villes est le cinquantième du tour. 50 × 800 = 40 000 km." },
    { t: "code", titre: "Le tamis en Python", d: 3,
      caches: ["crible(2)", "crible(50)", "len(crible(1000))"],
      enonce: `<p>Écris la fonction <code>crible(n)</code> qui renvoie la liste des nombres premiers inférieurs ou égaux à <code>n</code>, dans l'ordre croissant.</p><p>Le code de départ crée une liste <code>libre</code> : <code>libre[k]</code> vaut <code>True</code> tant que <code>k</code> n'a pas été barré.</p>`,
      depart: `def crible(n):
    libre = [True] * (n + 1)
    premiers = []
    for p in range(2, n + 1):
        if libre[p]:
            premiers.append(p)
            # à compléter : barrer les multiples de p
    return premiers
`,
      solution: `def crible(n):
    libre = [True] * (n + 1)
    premiers = []
    for p in range(2, n + 1):
        if libre[p]:
            premiers.append(p)
            for m in range(2 * p, n + 1, p):
                libre[m] = False
    return premiers
`,
      tests: [{ appels: [["crible(10)", "[2, 3, 5, 7]"], ["crible(30)", "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]"], ["len(crible(100))", "25"], ["crible(1)", "[]"]] }],
      indices: ["Les multiples de p sont 2p, 3p, 4p… jusqu'à n.", "range(2 * p, n + 1, p) parcourt ces multiples : le troisième nombre est le pas.", "Pour barrer m : libre[m] = False."] },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Dresser la liste des nombres premiers jusqu'à un entier donné.</p>
<p><strong>La méthode.</strong> Prendre le plus petit nombre non barré : il est premier. Barrer ses multiples. Recommencer. On s'arrête dès que le carré du nombre dépasse la limite.</p>
<p><strong>Le résultat.</strong> 25 nombres premiers jusqu'à 100, obtenus avec les seuls multiples de 2, 3, 5 et 7.</p>
<p><strong>Le contexte.</strong> Ératosthène de Cyrène, directeur de la Bibliothèque d'Alexandrie, vers 240 av. J.-C. Il estime aussi le tour de la Terre.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>appliquer le crible à la main</li><li>expliquer pourquoi on s'arrête à la racine carrée de la limite</li><li>dire si un nombre inférieur à 100 est premier</li><li>refaire le calcul du tour de la Terre</li></ul>` },
  ] },
];

const ESCALES_MOY = [
{
  id: "brahmagupta", an: 628, date: "628", lieu: "Bhinmal, Inde", genre: "figure", niveau: "Dès la Seconde",
  titre: "Brahmagupta et le zéro", resume: "Faire de « rien » un nombre",
  accroche: "Écrire qu'il n'y a rien : l'idée paraît évidente. Il a fallu des siècles pour l'avoir, et un astronome indien pour oser calculer avec.",
  etapes: [
    { t: "lecon", titre: "La colonne vide",
      texte: `<p>Pour écrire deux cent quatre, tu traces trois signes : 2, 0, 4. Le 2 vaut deux centaines parce qu'il est en troisième position. C'est la <strong>numération de position</strong> : la valeur d'un chiffre dépend de sa place.</p>
<p>Ce système a un point faible. Dans deux cent quatre, il n'y a pas de dizaines. Si l'on n'écrit rien à cet endroit, on obtient « 2 4 », que rien ne distingue de vingt-quatre.</p>
<p>Il faut donc un signe pour dire « ici, rien ». Et une fois ce signe inventé, une question plus audacieuse se pose : est-ce seulement une marque de place vide, ou un nombre comme les autres, que l'on peut additionner et multiplier ?</p>` },
    { t: "quiz", titre: "Écrire le vide", widget: "position",
      intro: "Le tableau a trois colonnes : centaines, dizaines, unités. Ajoute ou retire des jetons et compare les deux écritures.",
      questions: [
        { q: "Le tableau montre 2 centaines, aucune dizaine et 4 unités. Sans signe pour la colonne vide, qu'écrit-on ?", choix: ["2 4", "2 0 4", "24 0"], bon: 0, expl: "On n'écrit que les colonnes occupées : 2, puis 4." },
        { q: "Cette écriture « 2 4 » peut aussi correspondre à d'autres tableaux. Lesquels ?", choix: ["Seulement 2 dizaines et 4 unités.", "2 dizaines et 4 unités, ou 2 centaines et 4 dizaines.", "Aucun autre."], bon: 1, expl: "24, 204 et 240 s'écrivent tous « 2 4 ». Les scribes de Babylone ont vécu avec cette ambiguïté pendant plus de mille ans : le contexte devait suffire." },
        { q: "Que fait le signe « 0 » dans 204 ?", choix: ["Il ajoute une quantité.", "Il occupe la place des dizaines pour que le 2 reste à la place des centaines.", "Il sert de décoration."], bon: 1, expl: "Le zéro tient la place. Les Babyloniens tardifs, les Mayas et les Indiens ont chacun inventé un tel signe. Les Indiens sont allés plus loin." },
      ] },
    { t: "lecon", titre: "Fortunes, dettes et néant",
      texte: `<p>En 628, à Bhinmal, dans le nord-ouest de l'Inde, l'astronome <strong>Brahmagupta</strong> achève à trente ans un grand traité en vers. Dans un chapitre de calcul, il fait ce que personne n'avait fait avant lui : il donne des règles pour calculer avec le zéro, qu'il appelle <em>śūnya</em>, « le vide ».</p>
<p>Il traite du même coup les nombres négatifs, qu'il appelle des dettes, par opposition aux fortunes. Une dette moins zéro est une dette. Zéro moins une dette est une fortune. Le produit de deux dettes est une fortune. Le produit de zéro par n'importe quoi est zéro.</p>
<p>Le zéro cesse d'être une marque de place vide : c'est un nombre, avec lequel on calcule.</p>
<aside class="contexte"><strong>Un long voyage.</strong> Les chiffres indiens et le zéro gagnent Bagdad au VIII<sup>e</sup> siècle, où al-Khwarizmi leur consacre un livre. Le mot <em>śūnya</em> est traduit en arabe par <em>ṣifr</em>. En passant au latin puis à l'italien, <em>ṣifr</em> donne à la fois « zéro » et « chiffre ».</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> « Les Indiens ont inventé le zéro » : la phrase mélange deux choses. Un signe pour la place vide existait à Babylone vers 300 av. J.-C. et, indépendamment, chez les Mayas. Ce qui vient d'Inde, c'est le zéro traité comme un nombre. La date des plus anciens zéros écrits en Inde fait encore débat entre spécialistes ; le texte de Brahmagupta, lui, est daté sans ambiguïté.</aside>` },
    { t: "tri", titre: "Brahmagupta avait-il raison ?",
      q: "Voici des règles tirées de son traité. Sont-elles encore justes aujourd'hui ?",
      categories: ["Toujours juste", "Faux aujourd'hui"],
      items: [
        { txt: "Une dette moins zéro est une dette.", cat: 0, expl: "Par exemple : (−5) − 0 = −5." },
        { txt: "Zéro moins une dette est une fortune.", cat: 0, expl: "0 − (−5) = 5." },
        { txt: "Le produit de deux dettes est une fortune.", cat: 0, expl: "(−3) × (−4) = 12 : c'est la règle des signes." },
        { txt: "Zéro divisé par zéro est zéro.", cat: 1, expl: "C'est l'erreur de Brahmagupta. Aujourd'hui, 0 ÷ 0 n'est pas défini : n'importe quel nombre multiplié par 0 donne 0, donc aucun quotient ne s'impose." },
        { txt: "Le produit de zéro par une dette ou une fortune est zéro.", cat: 0, expl: "0 × a = 0 pour tout nombre a." },
        { txt: "Le carré d'une dette est une fortune.", cat: 0, expl: "(−3)² = 9. Un carré n'est jamais négatif." },
      ] },
    { t: "qcm", titre: "Diviser par zéro",
      q: "Pour un nombre divisé par zéro, Brahmagupta se contente de dire qu'on obtient « une fraction qui a zéro pour dénominateur ». Cinq siècles plus tard, Bhaskara affirme que le résultat est infini. Qu'en dit-on aujourd'hui ?",
      choix: ["Le résultat est 0.", "Le résultat est infini.", "La division par zéro n'est pas définie."], bon: 2,
      retours: ["Si 6 ÷ 0 valait 0, on aurait 0 × 0 = 6.", "L'infini n'est pas un nombre avec lequel on calcule comme avec les autres. Et faudrait-il choisir +∞ ou −∞ ?", null],
      expl: "Diviser 6 par 0, ce serait trouver un nombre qui, multiplié par 0, donne 6. Il n'y en a pas. Les fondateurs ont hésité, et leur hésitation montre que la question était loin d'être simple." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Dans une numération de position, comment noter une colonne vide ? Et peut-on calculer avec ce « rien » ?</p>
<p><strong>L'idée.</strong> Faire du zéro un nombre à part entière, avec ses règles : <span class="m">a</span> + 0 = <span class="m">a</span>, <span class="m">a</span> × 0 = 0.</p>
<p><strong>Dans le même texte.</strong> Les nombres négatifs (« dettes ») et la règle des signes.</p>
<p><strong>La limite.</strong> Brahmagupta pose 0 ÷ 0 = 0. La division par zéro n'est pas définie.</p>
<p><strong>Le contexte.</strong> Brahmagupta, Bhinmal, 628. Transmission par Bagdad, puis par l'Italie.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>expliquer à quoi sert le zéro dans l'écriture d'un nombre</li><li>distinguer le zéro marque de place et le zéro nombre</li><li>appliquer la règle des signes</li><li>expliquer pourquoi on ne divise pas par zéro</li></ul>` },
  ] },
{
  id: "alkhwarizmi", an: 820, date: "vers 820", lieu: "Bagdad", genre: "methode", niveau: "Dès la Seconde, forme canonique en Première",
  titre: "Al-Khwarizmi complète le carré", resume: "Résoudre une équation avec des ciseaux et de la colle",
  accroche: "Son livre a donné le mot « algèbre », son nom a donné le mot « algorithme ». Sa méthode tient dans un dessin.",
  etapes: [
    { t: "lecon", titre: "Un carré et dix racines",
      texte: `<p>Vers 820, à Bagdad, le savant <strong>al-Khwarizmi</strong> pose ce problème :</p>
<p><em>Un carré et dix de ses racines font trente-neuf. Quel est ce carré ?</em></p>
<p>Il n'écrit ni <span class="m">x</span>, ni signe égal, ni signe plus : ces notations n'existent pas encore. Tout est rédigé en phrases. Dans notre écriture, il s'agit de résoudre :</p>
<p class="formule"><span class="m">x</span>² + 10<span class="m">x</span> = 39</p>
<p>Tu peux chercher à tâtons. Al-Khwarizmi veut mieux : une méthode qui marche à tous les coups, et une preuve que la méthode est juste. Sa preuve est une figure.</p>` },
    { t: "quiz", titre: "Compléter le carré", widget: "carre",
      intro: "Avance étape par étape et observe la figure. Essaie ensuite les autres équations.",
      questions: [
        { q: "Pour x² + 10x = 39, quelle est l'aire du petit carré qui manque dans le coin ?", choix: ["5", "10", "25", "39"], bon: 2, expl: "Les deux rectangles ont pour largeur 5, la moitié de 10. Le coin est un carré de côté 5, d'aire 25." },
        { q: "Quelle est alors l'aire du grand carré complété ?", choix: ["39", "49", "64", "100"], bon: 2, expl: "39 + 25 = 64. On a ajouté 25 des deux côtés de l'équation." },
        { q: "Le grand carré a pour côté 8, et ce côté mesure x + 5. Combien vaut x ?", choix: ["3", "5", "8", "13"], bon: 0, expl: "x + 5 = 8, donc x = 3. Vérification : 3² + 10 × 3 = 9 + 30 = 39." },
        { q: "Pour x² + 6x = 16, quelle aire faut-il ajouter pour compléter le carré ?", choix: ["3", "6", "9", "36"], bon: 2, expl: "La moitié de 6 est 3, et 3² = 9. Le grand carré a pour aire 16 + 9 = 25, son côté vaut 5, donc x = 2." },
      ] },
    { t: "lecon", titre: "La Maison de la sagesse",
      texte: `<p>Bagdad, fondée en 762, est alors l'une des plus grandes villes du monde. Le calife al-Ma'mun y soutient une institution savante, la Maison de la sagesse, où l'on traduit en arabe les textes grecs, indiens et persans, et où l'on fait de l'astronomie, de la géographie et des mathématiques.</p>
<p>Al-Khwarizmi y écrit un <em>Abrégé du calcul par la restauration et la comparaison</em>. « Restauration » se dit <em>al-jabr</em> : c'est l'opération qui consiste à faire passer un terme d'un côté à l'autre de l'égalité. Le mot est devenu <strong>algèbre</strong>.</p>
<p>Son livre vise des usages précis : partager un héritage selon le droit musulman, régler un litige commercial, mesurer un terrain, creuser un canal.</p>
<p>Un autre de ses ouvrages présente le calcul indien avec les dix chiffres. Traduit en latin, il commence par les mots <em>Dixit Algorizmi</em>, « al-Khwarizmi a dit ». De son nom déformé vient le mot <strong>algorithme</strong>.</p>
<aside class="legende"><strong>Histoire ou légende ?</strong> « Al-Khwarizmi a inventé l'algèbre » : il faut nuancer. Les scribes de Babylone, Diophante et Brahmagupta résolvaient déjà des équations de ce genre. La nouveauté est ailleurs : il classe toutes les équations du second degré en six types, donne pour chacun une méthode générale, et la justifie par une figure. C'est la première théorie des équations.</aside>` },
    { t: "qcm", titre: "La solution oubliée",
      q: "L'équation x² + 10x = 39 a une autre solution que 3 : le nombre −13. Pourquoi al-Khwarizmi ne la mentionne-t-il pas ?",
      choix: ["Il s'est trompé dans ses calculs.", "Pour lui, x est une longueur : un nombre négatif n'aurait aucun sens.", "Les nombres négatifs étaient interdits par la religion."], bon: 1,
      retours: ["Sa méthode est juste. Vérifie plutôt ce que représente x dans sa figure.", null, "Rien de tel. Regarde ce que représente x sur la figure."],
      expl: "x est le côté d'un carré. Les nombres négatifs, connus en Inde, ne sont pas admis dans la tradition qu'il fonde. C'est aussi pour cela qu'il a besoin de six types d'équations : x² + 10x = 39 et x² + 39 = 10x sont pour lui deux problèmes différents, puisqu'il ne peut pas écrire de coefficient négatif. Vérifie tout de même : (−13)² + 10 × (−13) = 169 − 130 = 39." },
    { t: "code", titre: "La méthode en une ligne", d: 2,
      caches: ["racine_positive(4, 21)", "racine_positive(12, 13)", "racine_positive(1, 1)"],
      enonce: `<p>La méthode d'al-Khwarizmi pour résoudre <span class="m">x</span>² + <span class="m">bx</span> = <span class="m">c</span> : prendre la moitié de <span class="m">b</span>, la mettre au carré, ajouter <span class="m">c</span>, prendre la racine carrée, puis retrancher la moitié de <span class="m">b</span>.</p><p>Écris la fonction <code>racine_positive(b, c)</code> qui applique cette recette.</p>`,
      depart: `from math import sqrt

def racine_positive(b, c):
    moitie = b / 2
    # à compléter
    return 0
`,
      solution: `from math import sqrt

def racine_positive(b, c):
    moitie = b / 2
    return sqrt(c + moitie ** 2) - moitie
`,
      tests: [{ appels: [["racine_positive(10, 39)", "3.0"], ["racine_positive(6, 16)", "2.0"], ["racine_positive(8, 33)", "3.0"], ["racine_positive(2, 1)", "0.41421356237309515"]] }],
      requis: ["sqrt"],
      indices: ["L'aire du grand carré est c + moitie ** 2.", "Son côté est sqrt(c + moitie ** 2).", "Ce côté mesure x + moitie : il reste à retrancher moitie."] },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Résoudre <span class="m">x</span>² + 10<span class="m">x</span> = 39 par une méthode générale et démontrée.</p>
<p><strong>La méthode.</strong> Ajouter des deux côtés le carré de la moitié du coefficient de <span class="m">x</span>. Le membre de gauche devient un carré : (<span class="m">x</span> + 5)² = 64.</p>
<p><strong>Le lien avec le lycée.</strong> C'est la mise sous forme canonique d'un trinôme du second degré.</p>
<p><strong>Le contexte.</strong> Al-Khwarizmi, Maison de la sagesse, Bagdad, vers 820. Origine des mots « algèbre » et « algorithme ».</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>compléter un carré sur une figure</li><li>résoudre une équation du type x² + bx = c</li><li>expliquer d'où viennent les mots algèbre et algorithme</li><li>dire pourquoi la solution négative est absente du traité</li></ul>` },
  ] },
{
  id: "fibonacci", an: 1202, date: "1202", lieu: "Pise et Béjaïa", genre: "figure", niveau: "Dès la Seconde",
  titre: "Fibonacci et les chiffres venus d'ailleurs", resume: "Comment l'Europe a appris à compter",
  accroche: "Un fils de marchand apprend à calculer en Algérie et rentre à Pise avec dix signes qui vont remplacer les chiffres romains.",
  etapes: [
    { t: "lecon", titre: "Trente-sept fois vingt-quatre",
      texte: `<p>Tu es marchand à Pise vers 1200. Tu vends 37 pièces de drap à 24 deniers l'une. Combien te doit-on ?</p>
<p>Tes livres de comptes sont en chiffres romains : XXXVII pièces, XXIV deniers. Ces chiffres conviennent pour noter un résultat, pas pour l'obtenir. Personne ne pose une multiplication en chiffres romains : on calcule avec des jetons sur une table à colonnes, l'abaque, puis on recopie le résultat.</p>
<p>De l'autre côté de la Méditerranée, les marchands font autrement. Ils écrivent leurs nombres avec dix signes et calculent directement sur le papier, à la plume.</p>` },
    { t: "quiz", titre: "Compter en romain", widget: "romain",
      intro: "Convertis quelques nombres et observe leur écriture.",
      questions: [
        { q: "Comment s'écrit 1202 en chiffres romains ?", choix: ["MCCII", "MMCII", "MCII", "MCCXX"], bon: 0, expl: "M pour mille, CC pour deux cents, II pour deux. Rien pour les dizaines : les chiffres romains n'ont pas besoin de zéro, parce que chaque signe porte sa propre valeur." },
        { q: "Combien de signes faut-il pour écrire 888 en chiffres romains ?", choix: ["3", "6", "9", "12"], bon: 3, expl: "DCCCLXXXVIII : douze signes. Un nombre plus grand n'est pas forcément plus long : 1000 s'écrit M." },
        { q: "Pourquoi poser une multiplication est-il impraticable en chiffres romains ?", choix: ["Parce que les Romains ne connaissaient pas la multiplication.", "Parce que la valeur d'un signe ne dépend pas de sa position : on ne peut pas aligner des colonnes d'unités, de dizaines, de centaines.", "Parce qu'il manque un signe pour le nombre 5."], bon: 1, expl: "Nos techniques de calcul posé reposent sur la position : on multiplie chiffre par chiffre, on décale d'un rang, on additionne les colonnes. Rien de tel avec XXXVII et XXIV." },
      ] },
    { t: "lecon", titre: "Le Livre du calcul",
      texte: `<p><strong>Léonard de Pise</strong> naît vers 1170. Son père représente les marchands pisans à Béjaïa, sur la côte de l'actuelle Algérie, et l'y fait venir pour qu'il apprenne le métier. Un maître lui enseigne le calcul « à la manière des Indiens ». Léonard voyage ensuite en Égypte, en Syrie, en Sicile, et compare les méthodes de tous les marchands qu'il rencontre.</p>
<p>En 1202, il publie le <em>Liber abaci</em>, le « Livre du calcul ». Dès la première page, il présente les neuf chiffres indiens et le signe 0, qu'il appelle <em>zephirum</em>. Le reste de l'ouvrage est un manuel pratique : conversions de monnaies, calculs d'intérêts, partages de bénéfices, alliages.</p>
<aside class="contexte"><strong>Trois siècles de résistance.</strong> Les nouveaux chiffres ne s'imposent pas tout de suite. En 1299, à Florence, la corporation des changeurs interdit à ses membres de les utiliser dans leurs registres : on juge trop facile de transformer un 0 en 6 ou en 9. Les chiffres romains restent en usage dans les comptes jusqu'au XVI<sup>e</sup> siècle.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> Léonard ne s'est jamais appelé Fibonacci. Ce surnom, contraction de <em>filius Bonacci</em>, « fils de Bonaccio », a été popularisé au XIX<sup>e</sup> siècle. Et il n'a pas « introduit » seul les chiffres indo-arabes en Europe : ils y circulaient déjà dans quelques cercles savants. Son livre les a mis entre les mains des marchands.</aside>` },
    { t: "quiz", titre: "Le problème des lapins", widget: "lapins",
      intro: "Au milieu du livre, entre deux problèmes de commerce, se trouve une devinette. Un couple de lapins est placé dans un enclos. Chaque couple adulte donne naissance à un nouveau couple chaque mois, et un jeune couple devient adulte au bout d'un mois. Combien de couples au fil des mois ?",
      questions: [
        { q: "Combien y a-t-il de couples au bout de 5 mois ?", choix: ["8", "10", "13", "32"], bon: 2, expl: "1, 2, 3, 5, 8, 13 : au cinquième mois, 13 couples." },
        { q: "Comment obtient-on le total d'un mois à partir des précédents ?", choix: ["On double le total du mois précédent.", "On additionne les totaux des deux mois précédents.", "On ajoute 2 au total précédent."], bon: 1, expl: "Les adultes d'un mois sont tous les couples du mois précédent ; les jeunes sont aussi nombreux que les adultes du mois précédent, c'est-à-dire le total d'il y a deux mois." },
        { q: "Regarde la dernière colonne. Le rapport entre un total et le précédent se rapproche de…", choix: ["1,5", "1,618", "2", "3,14"], bon: 1, expl: "Environ 1,618 : c'est le nombre d'or, (1 + √5) ÷ 2. Fibonacci ne le remarque pas ; l'observation est faite au XVIIᵉ siècle." },
      ] },
    { t: "qcm", titre: "Une suite plus ancienne que son nom",
      q: "La suite 1, 2, 3, 5, 8, 13… porte le nom de Fibonacci depuis le XIXᵉ siècle. Était-il le premier à l'étudier ?",
      choix: ["Oui, il l'a inventée pour ce problème.", "Non : des savants indiens l'avaient décrite plusieurs siècles avant lui, en étudiant les rythmes de la poésie.", "Non : elle figure déjà dans les Éléments d'Euclide."], bon: 1,
      retours: ["Le problème des lapins est de lui, mais la suite est plus ancienne.", null, "Euclide étudie le partage qui mène au nombre d'or, pas cette suite."],
      expl: "En sanskrit, un vers se compose de syllabes brèves (un temps) et longues (deux temps). Combien de rythmes différents pour une durée totale donnée ? La réponse est cette même suite, décrite par Virahanka vers 700 et par Hemachandra vers 1150. Le nom d'une découverte dit souvent qui l'a fait connaître, pas qui l'a faite." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Calculer vite et sûrement pour le commerce, alors que les chiffres romains ne permettent pas de poser une opération.</p>
<p><strong>La solution.</strong> Dix signes et la numération de position, venus d'Inde par le monde arabe : chaque chiffre vaut selon sa place, et l'on calcule colonne par colonne.</p>
<p><strong>La devinette.</strong> Les lapins : chaque terme est la somme des deux précédents. Le rapport de deux termes voisins s'approche du nombre d'or.</p>
<p><strong>Le contexte.</strong> Léonard de Pise, <em>Liber abaci</em>, 1202. Adoption lente, sur trois siècles.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>lire et écrire un nombre en chiffres romains</li><li>expliquer l'avantage de la numération de position pour calculer</li><li>calculer les premiers termes de la suite de Fibonacci</li><li>raconter par où les chiffres indo-arabes sont arrivés en Europe</li></ul>` },
  ] },
];
