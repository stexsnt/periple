/* PÉRIPLE — escales des Temps modernes et de l'Époque contemporaine ajoutées après le pilote,
   puis assemblage de toutes les escales dans PARCOURS (à la fin du fichier). */

const ESCALES_MOD = [
{
  id: "partis", an: 1654, date: "1654", lieu: "Paris et Toulouse", genre: "figure", niveau: "Dès la Seconde, probabilités en Première",
  titre: "Pascal, Fermat et la partie interrompue", resume: "Un été de lettres, et le hasard devient calculable",
  accroche: "Deux joueurs doivent se séparer avant la fin. Comment partager la mise ? La question traîne depuis cent cinquante ans quand un joueur la pose à Pascal.",
  etapes: [
    { t: "pari", titre: "Partager la mise",
      q: "Deux joueurs misent 32 pistoles chacun. Ils jouent à pile ou face : le premier qui gagne 3 manches emporte les 64 pistoles. La partie est interrompue alors que le premier joueur mène 2 manches à 1. Quel partage te paraît juste ?",
      choix: ["32 chacun : la partie n'est pas finie, donc elle ne compte pas.", "Environ 43 et 21 : proportionnellement aux manches déjà gagnées, deux tiers et un tiers.", "48 et 16.", "64 et 0 : celui qui mène emporte tout."] },
    { t: "quiz", titre: "Finir la partie mille fois", widget: "partis",
      intro: "On ne peut pas finir la vraie partie. Mais on peut imaginer toutes les façons dont elle aurait pu finir. Règle les manches qui manquent à chacun (ici : 1 au premier, 2 au second) et laisse la machine terminer la partie un millier de fois.",
      questions: [
        { q: "Le premier joueur mène 2 à 1 : il lui manque 1 manche, il en manque 2 à son adversaire. Sur un grand nombre de fins de partie, quelle part en gagne-t-il environ ?", choix: ["La moitié", "Les deux tiers", "Les trois quarts", "La totalité"], bon: 2, expl: "Environ 0,75. La part proportionnelle aux manches gagnées (deux tiers) le désavantage : ce qui compte, ce sont les manches qui restent à gagner, pas celles déjà jouées." },
        { q: "Combien de pistoles doit-il donc recevoir sur les 64 ?", choix: ["32", "43", "48", "56"], bon: 2, expl: "Les trois quarts de 64 : 48 pistoles. C'est le résultat de Pascal et de Fermat." },
        { q: "Change les réglages : il manque 1 manche au premier joueur et 3 au second (il mène 2 à 0). Quelle est sa part ?", choix: ["48", "52", "56", "60"], bon: 2, expl: "Il ne perd que si son adversaire gagne trois manches de suite : une chance sur huit. Il lui revient donc les sept huitièmes de 64, soit 56 pistoles." },
        { q: "Et s'il manque autant de manches à chacun ?", choix: ["Le premier joueur reçoit plus.", "Chacun reçoit la moitié.", "On ne peut pas partager."], bon: 1, expl: "La situation est symétrique : 32 pistoles chacun, quel que soit le nombre de manches déjà jouées." },
      ] },
    { t: "lecon", titre: "Deux méthodes pour une réponse",
      texte: `<p>Le problème n'est pas nouveau. En 1494, le moine mathématicien Luca Pacioli propose de partager selon les manches déjà gagnées : c'est la réponse qui te donnait environ 43 et 21. D'autres le contredisent sans convaincre. Personne ne sait raisonner sur ce qui <em>aurait pu</em> arriver.</p>
<p>En 1654, Antoine Gombaud, chevalier de Méré, homme de lettres et joueur, soumet la question à <strong>Blaise Pascal</strong>. Pascal a trente et un ans. Il écrit à <strong>Pierre de Fermat</strong>, magistrat à Toulouse et mathématicien à ses heures. Leurs lettres de l'été 1654 contiennent deux solutions.</p>
<p><strong>Fermat compte.</strong> Il faut au plus deux manches pour finir. Imaginons-les jouées toutes les deux, même si la première suffit. Quatre suites sont possibles, aussi probables les unes que les autres :</p>
<table class="donnees"><thead><tr><th>Manche 4</th><th>Manche 5</th><th>Vainqueur</th></tr></thead><tbody><tr><td>premier joueur</td><td>premier joueur</td><td>premier joueur</td></tr><tr><td>premier joueur</td><td>second joueur</td><td>premier joueur</td></tr><tr><td>second joueur</td><td>premier joueur</td><td>premier joueur</td></tr><tr><td>second joueur</td><td>second joueur</td><td>second joueur</td></tr></tbody></table>
<p>Le premier joueur gagne dans trois cas sur quatre.</p>
<p><strong>Pascal remonte le temps.</strong> Si la manche suivante est gagnée par celui qui mène, il emporte 64 pistoles. Sinon, les joueurs sont à égalité et chacun vaut 32. Il est donc sûr de 32, et l'autre moitié se joue à pile ou face : il lui en revient 16 de plus. Total : 48.</p>
<aside class="contexte"><strong>Une science nouvelle.</strong> Pascal annonce à l'Académie parisienne une « géométrie du hasard ». En 1657, le Hollandais Christiaan Huygens, qui a entendu parler de ces lettres à Paris, publie le premier traité imprimé sur le sujet. En trois ans, le hasard est devenu un objet de calcul.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> Le « triangle de Pascal », dont il se sert pour traiter le cas général, n'est pas de lui : on le trouve en Chine chez Yang Hui en 1261, qui l'attribue à un auteur du XI<sup>e</sup> siècle, et dans le monde persan chez al-Karaji vers l'an 1000. Pascal en donne en revanche la première étude systématique.</aside>` },
    { t: "code", titre: "La méthode de Pascal en Python", d: 3,
      caches: ["chance(2, 2)", "chance(1, 4)", "chance(3, 2)"],
      enonce: `<p>On note <code>chance(a, b)</code> la probabilité que le premier joueur l'emporte quand il lui manque <code>a</code> manches et qu'il en manque <code>b</code> à son adversaire.</p><ul><li>S'il ne lui manque rien (<code>a == 0</code>), il a gagné : la probabilité vaut 1.</li><li>S'il ne manque rien à l'adversaire (<code>b == 0</code>), il a perdu : 0.</li><li>Sinon, on joue une manche : une fois sur deux on passe à <code>chance(a - 1, b)</code>, une fois sur deux à <code>chance(a, b - 1)</code>. La probabilité est la moyenne des deux.</li></ul><p>Écris cette fonction. Elle s'appelle elle-même : c'est une fonction récursive.</p>`,
      depart: `def chance(a, b):
    if a == 0:
        return 1
    if b == 0:
        return 0
    # à compléter : la moyenne des deux situations possibles
    return 0
`,
      solution: `def chance(a, b):
    if a == 0:
        return 1
    if b == 0:
        return 0
    return (chance(a - 1, b) + chance(a, b - 1)) / 2
`,
      tests: [{ appels: [["chance(1, 2)", "0.75"], ["chance(1, 3)", "0.875"], ["chance(2, 3)", "0.6875"], ["chance(1, 1)", "0.5"]] }],
      indices: ["Si le premier joueur gagne la manche, il ne lui en manque plus que a − 1.", "Si c'est l'adversaire, il ne lui en manque plus que b − 1.", "return (chance(a - 1, b) + chance(a, b - 1)) / 2"] },
    { t: "qcm", titre: "Ce qui a changé en 1654",
      q: "Qu'y a-t-il de vraiment nouveau dans le raisonnement de Pascal et de Fermat ?",
      choix: ["Ils sont les premiers à jouer à pile ou face.", "Ils raisonnent sur tous les avenirs possibles, pesés selon leurs chances, au lieu de regarder le passé de la partie.", "Ils prouvent que le hasard n'existe pas."], bon: 1,
      retours: ["Les jeux de hasard sont bien plus anciens que cela.", null, "Au contraire : ils montrent qu'on peut calculer avec le hasard sans le supprimer."],
      expl: "Pacioli regardait les manches jouées. Pascal et Fermat regardent ce qui peut encore arriver, et donnent à chaque issue un poids. Cette idée, que l'on appelle aujourd'hui l'espérance, fonde les assurances, les sondages et une bonne partie de la physique." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Partager équitablement l'enjeu d'un jeu de hasard interrompu avant la fin.</p>
<p><strong>Le principe.</strong> Chacun reçoit une part proportionnelle à ses chances de gagner si la partie continuait.</p>
<p><strong>Deux méthodes.</strong> Fermat dénombre toutes les fins de partie possibles. Pascal raisonne de proche en proche, en partant des situations où le partage est évident.</p>
<p><strong>Le résultat.</strong> À 2 manches contre 1, pour une partie en 3 manches : 48 pistoles et 16.</p>
<p><strong>Le contexte.</strong> Lettres de Pascal et Fermat, été 1654. Traité de Huygens, 1657.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>dénombrer les fins de partie possibles</li><li>calculer un partage équitable dans un cas simple</li><li>expliquer pourquoi le partage selon les manches gagnées est injuste</li><li>situer la naissance du calcul des probabilités</li></ul>` },
  ] },
{
  id: "newton", an: 1669, date: "1669", lieu: "Cambridge, Angleterre", genre: "methode", niveau: "Première (dérivation)",
  titre: "La méthode de Newton", resume: "Suivre la tangente pour trouver la solution",
  accroche: "Une équation que personne ne sait résoudre exactement, et une méthode qui double le nombre de chiffres exacts à chaque étape. Babylone, en plus général.",
  etapes: [
    { t: "lecon", titre: "Une équation sans formule",
      texte: `<p>En 1669, Isaac <strong>Newton</strong> a vingt-six ans. Dans un manuscrit qu'il fait circuler parmi quelques savants, il prend cet exemple :</p>
<p class="formule"><span class="m">x</span>³ − 2<span class="m">x</span> − 5 = 0</p>
<p>Il existe des formules pour le troisième degré, mais elles sont lourdes, et pour la plupart des équations il n'en existe aucune. Newton cherche autre chose : un procédé qui donne la solution avec autant de chiffres qu'on veut.</p>
<p>On voit vite que la solution est proche de 2 : pour <span class="m">x</span> = 2, le membre de gauche vaut −1, et pour <span class="m">x</span> = 3, il vaut 16. Comment faire mieux ?</p>
<p>L'idée, dans sa version moderne : la courbe de la fonction est compliquée, mais près d'un point, elle ressemble à sa tangente. Et savoir où une droite coupe l'axe est facile.</p>` },
    { t: "quiz", titre: "Suivre la tangente", widget: "newton",
      intro: "La courbe est celle de f(x) = x³ − 2x − 5. On part d'une valeur, on trace la tangente en ce point, et on prend comme nouvelle valeur l'endroit où cette tangente coupe l'axe. Puis on recommence.",
      questions: [
        { q: "En partant de 3, où arrive-t-on après une étape ?", choix: ["2", "2,36", "2,64", "2,9"], bon: 1, expl: "En 3, la courbe est à la hauteur 16 et la pente de la tangente vaut 25. La tangente rejoint l'axe 16/25 = 0,64 plus à gauche : en 2,36." },
        { q: "En partant de 2, où arrive-t-on après une étape ?", choix: ["1,9", "2,05", "2,1", "2,5"], bon: 2, expl: "f(2) = −1 et la pente vaut 10 : on avance de 1/10. C'est le premier calcul de Newton dans son manuscrit." },
        { q: "En partant de 2, combien de chiffres après la virgule sont exacts au bout de deux étapes ?", choix: ["Un", "Deux", "Quatre", "Huit"], bon: 2, expl: "2,09456… contre 2,09455… : quatre chiffres exacts. À l'étape suivante, il y en a déjà neuf." },
        { q: "Si la valeur actuelle est x, la pente de la tangente est f'(x). Quelle est la valeur suivante ?", choix: ["x − f(x)", "x − f(x) ÷ f'(x)", "x − f'(x) ÷ f(x)", "f(x) ÷ f'(x)"], bon: 1, expl: "Pour descendre de la hauteur f(x) avec une pente f'(x), il faut reculer de f(x) ÷ f'(x). C'est la formule de la méthode." },
      ] },
    { t: "lecon", titre: "L'année de la peste",
      texte: `<p>En 1665, la peste ferme l'université de Cambridge. Newton, étudiant de vingt-deux ans, rentre dans la ferme familiale de Woolsthorpe. En dix-huit mois d'isolement, il pose les bases du calcul des dérivées et des intégrales, de sa théorie de la lumière et de celle de la gravitation.</p>
<p>Il publie très peu. Le manuscrit de 1669 n'est imprimé qu'en 1711. Entre-temps, Leibniz a découvert de son côté le même calcul et l'a publié le premier : la querelle de priorité qui s'ensuit empoisonne la science européenne pendant des décennies.</p>
<aside class="contexte"><strong>Retour à Babylone.</strong> Applique la méthode à l'équation <span class="m">x</span>² − 2 = 0. La dérivée de <span class="m">x</span>² − 2 est 2<span class="m">x</span>, donc la valeur suivante est <span class="m">x</span> − (<span class="m">x</span>² − 2) ÷ (2<span class="m">x</span>), ce qui se simplifie en (<span class="m">x</span> + 2 ÷ <span class="m">x</span>) ÷ 2. C'est exactement la moyenne des scribes : la méthode de Babylone est un cas particulier de celle de Newton, trente-cinq siècles plus tôt.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> Newton n'a jamais dessiné de tangente pour cette méthode : il manipule des développements algébriques, équation par équation. Joseph Raphson la simplifie en 1690, et c'est Thomas Simpson, en 1740, qui lui donne sa forme actuelle avec la dérivée. Quant à la pomme, Newton a bien raconté, à la fin de sa vie, que la chute d'une pomme l'avait fait réfléchir à la gravitation. Rien ne dit qu'elle lui soit tombée sur la tête.</aside>` },
    { t: "code", titre: "Newton en Python", d: 2,
      caches: ["newton(2, 3)", "newton(3, 4)", "newton(2.5, 1)"],
      enonce: `<p>On cherche la solution de <span class="m">x</span>³ − 2<span class="m">x</span> − 5 = 0. La dérivée de <span class="m">f</span>(<span class="m">x</span>) = <span class="m">x</span>³ − 2<span class="m">x</span> − 5 est <span class="m">f</span>′(<span class="m">x</span>) = 3<span class="m">x</span>² − 2.</p><p>Écris la fonction <code>newton(x, n)</code> qui part de la valeur <code>x</code> et applique <code>n</code> fois la méthode.</p>`,
      depart: `def newton(x, n):
    for i in range(n):
        f = x ** 3 - 2 * x - 5
        pente = 3 * x ** 2 - 2
        # à compléter : la nouvelle valeur de x
    return x
`,
      solution: `def newton(x, n):
    for i in range(n):
        f = x ** 3 - 2 * x - 5
        pente = 3 * x ** 2 - 2
        x = x - f / pente
    return x
`,
      tests: [{ appels: [["newton(2, 0)", "2"], ["newton(2, 1)", "2.1"], ["newton(3, 1)", "2.36"], ["newton(2, 5)", "2.0945514815423265"]] }],
      indices: ["La nouvelle valeur est l'ancienne, moins f divisé par la pente.", "x = x - f / pente"] },
    { t: "qcm", titre: "Quand la méthode déraille",
      q: "Que se passe-t-il si l'on part d'un point où la tangente est horizontale ?",
      choix: ["La méthode donne la solution du premier coup.", "La tangente ne coupe jamais l'axe : la méthode ne peut pas continuer.", "On retombe sur le point de départ."], bon: 1,
      retours: ["Une tangente horizontale reste à la même hauteur : elle ne rejoint pas l'axe.", null, "Il n'y a pas de point suivant du tout."],
      expl: "La pente vaut 0, et la formule demanderait de diviser par 0. Près d'un tel point, la tangente coupe l'axe très loin et la méthode part à la dérive. Il faut donc partir assez près de la solution. Bien employée, elle reste l'une des plus utilisées au monde : c'est elle qui tourne dans ta calculatrice quand tu demandes de résoudre une équation." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Résoudre une équation <span class="m">f</span>(<span class="m">x</span>) = 0 pour laquelle il n'existe pas de formule commode.</p>
<p><strong>La méthode.</strong> Remplacer la courbe par sa tangente et prendre le point où cette tangente coupe l'axe : <span class="m">x</span> − <span class="m">f</span>(<span class="m">x</span>) ÷ <span class="m">f</span>′(<span class="m">x</span>). Recommencer.</p>
<p><strong>La vitesse.</strong> Près de la solution, le nombre de chiffres exacts double à chaque étape.</p>
<p><strong>Le contexte.</strong> Newton, manuscrit de 1669 ; forme actuelle due à Raphson (1690) et Simpson (1740).</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>faire une étape de la méthode à partir de f et de f′</li><li>expliquer le rôle de la tangente</li><li>retrouver la méthode de Babylone comme cas particulier</li><li>dire dans quel cas la méthode échoue</li></ul>` },
  ] },
];

const ESCALES_CONT = [
{
  id: "galois", an: 1832, date: "1832", lieu: "Paris", genre: "figure", niveau: "Dès la Seconde",
  titre: "Évariste Galois", resume: "Vingt ans, une théorie, un duel",
  accroche: "Recalé deux fois à Polytechnique, emprisonné pour ses idées, mort à vingt ans. Ses soixante pages ont changé la façon de faire de l'algèbre.",
  etapes: [
    { t: "lecon", titre: "L'équation qui résiste",
      texte: `<p>Tu connais, ou tu connaîtras bientôt, la formule qui résout toute équation du second degré avec une racine carrée. Les scribes de Babylone savaient déjà s'en passer, et al-Khwarizmi en a fait une théorie.</p>
<p>Au XVI<sup>e</sup> siècle, des mathématiciens italiens trouvent des formules pour le troisième et le quatrième degré. Elles sont longues, elles empilent racines carrées et racines cubiques, mais elles existent. Jérôme Cardan les publie en 1545.</p>
<p>Tout le monde s'attend à ce que le cinquième degré suive. Pendant près de trois siècles, les meilleurs s'y essaient. Aucun n'y parvient.</p>
<p>En 1824, un Norvégien de vingt-deux ans, Niels Abel, démontre l'impensable : <strong>il n'existe aucune formule générale pour le cinquième degré</strong>. Reste une question. Certaines équations de degré 5 se résolvent quand même. Lesquelles, et pourquoi celles-là ? La réponse vient d'un lycéen parisien.</p>` },
    { t: "quiz", titre: "Échanger les racines", widget: "permutations",
      intro: "L'idée de Galois : au lieu de chercher les solutions, regarder de quelles façons on peut les échanger entre elles. Voici trois solutions, notées x₁, x₂ et x₃, et deux mouvements. Explore.",
      questions: [
        { q: "De combien de façons différentes peut-on ranger trois objets ?", choix: ["3", "6", "8", "9"], bon: 1, expl: "Trois choix pour la première place, deux pour la deuxième, un pour la dernière : 3 × 2 × 1 = 6. Avec les deux mouvements proposés, on peut toutes les atteindre." },
        { q: "Combien de fois faut-il faire tourner les trois objets pour revenir à la disposition de départ ?", choix: ["2", "3", "6"], bon: 1, expl: "Trois rotations ramènent chacun à sa place. Pour l'échange, deux suffisent." },
        { q: "Repars du début. Fais « échange puis rotation », note le résultat, recommence et fais « rotation puis échange ». Obtient-on la même disposition ?", choix: ["Oui", "Non"], bon: 1, expl: "Non : l'ordre des mouvements compte. C'est la grande différence avec l'addition ou la multiplication des nombres, où 2 × 3 = 3 × 2." },
        { q: "Une équation de degré 5 a cinq solutions. De combien de façons peut-on les ranger ?", choix: ["25", "32", "120", "3 125"], bon: 2, expl: "5 × 4 × 3 × 2 × 1 = 120. Galois montre que la façon dont ces 120 dispositions se combinent entre elles décide de tout : pour 2, 3 ou 4 solutions, leur structure permet une formule ; pour 5, elle l'interdit." },
      ] },
    { t: "lecon", titre: "Une vie de vingt ans",
      texte: `<p><strong>Évariste Galois</strong> naît en 1811 à Bourg-la-Reine, près de Paris. Au lycée Louis-le-Grand, il découvre les mathématiques à quinze ans et lit en quelques jours des traités destinés aux savants. Ses professeurs le trouvent brillant et insupportable.</p>
<p>Il échoue deux fois au concours de l'École polytechnique. En 1829, son père, maire de Bourg-la-Reine, se suicide après une campagne de calomnies. Évariste entre à l'École préparatoire, la future École normale ; il en est renvoyé après la révolution de 1830 pour avoir attaqué son directeur dans un journal.</p>
<p>Il envoie trois fois ses résultats à l'Académie des sciences. Le premier mémoire est égaré. Le deuxième est confié à Fourier, qui meurt avant de l'avoir lu. Le troisième est rejeté en 1831 : le rapporteur, Poisson, le juge incompréhensible.</p>
<p>Républicain ardent sous le règne de Louis-Philippe, Galois est arrêté deux fois et passe plusieurs mois en prison. Le 30 mai 1832, peu après sa libération, il est blessé au ventre dans un duel au pistolet. Il meurt le lendemain. Il a vingt ans.</p>
<aside class="contexte"><strong>Quatorze ans d'attente.</strong> La veille du duel, Galois écrit à son ami Auguste Chevalier une lettre où il résume ses découvertes et demande qu'on les soumette aux grands mathématiciens d'Allemagne. Ses papiers sont publiés par Joseph Liouville en 1846. Il faut encore une génération pour qu'ils soient compris. La notion de groupe, qu'il a introduite, sert aujourd'hui en chimie, en physique des particules et en cryptographie.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> On lit partout qu'il a rédigé toute sa théorie en une nuit, avant le duel. C'est faux : ses mémoires étaient écrits depuis des mois. Cette nuit-là, il les relit, les annote et rédige sa lettre. Dans une marge, il écrit bien qu'il n'a pas le temps : la phrase est authentique. Les raisons du duel restent obscures. Une histoire d'amour malheureuse est attestée par ses lettres ; la thèse d'un complot politique, souvent reprise, ne repose sur aucune preuve.</aside>` },
    { t: "code", titre: "Compter les dispositions", d: 1,
      caches: ["factorielle(4)", "factorielle(6)", "factorielle(10)"],
      enonce: `<p>Le nombre de façons de ranger <span class="m">n</span> objets est le produit 1 × 2 × 3 × … × <span class="m">n</span>. On l'appelle la factorielle de <span class="m">n</span>.</p><p>Écris la fonction <code>factorielle(n)</code>. Regarde ensuite à quelle vitesse elle grandit : combien de façons de ranger les 35 élèves d'une classe ?</p>`,
      depart: `def factorielle(n):
    produit = 1
    # à compléter
    return produit
`,
      solution: `def factorielle(n):
    produit = 1
    for k in range(1, n + 1):
        produit = produit * k
    return produit
`,
      tests: [{ appels: [["factorielle(1)", "1"], ["factorielle(3)", "6"], ["factorielle(5)", "120"], ["factorielle(20)", "2432902008176640000"]] }],
      interdit: ["import"],
      indices: ["k doit prendre les valeurs 1, 2, …, n : range(1, n + 1).", "À chaque tour : produit = produit * k."] },
    { t: "qcm", titre: "Ce que Galois a changé",
      q: "Pourquoi dit-on que Galois a transformé l'algèbre, au-delà du problème du cinquième degré ?",
      choix: ["Il a trouvé la formule du cinquième degré.", "Il a montré qu'on peut étudier un problème par la structure de ses symétries, sans jamais calculer ses solutions.", "Il a résolu toutes les équations par ordinateur."], bon: 1,
      retours: ["Cette formule n'existe pas : Abel l'a démontré, et Galois explique pourquoi.", null, "Il meurt plus d'un siècle avant le premier ordinateur."],
      expl: "Avant lui, faire de l'algèbre, c'est calculer des solutions. Après lui, c'est étudier des structures : ici, la façon dont les échanges de solutions se combinent. Ce changement de regard gagne ensuite toutes les mathématiques." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Il existe des formules pour résoudre les équations de degré 2, 3 et 4. Pourquoi pas de degré 5 ?</p>
<p><strong>La réponse.</strong> Abel (1824) prouve qu'il n'y a pas de formule générale. Galois explique pourquoi, en étudiant les façons d'échanger les solutions entre elles.</p>
<p><strong>À retenir.</strong> <span class="m">n</span> objets se rangent de 1 × 2 × … × <span class="m">n</span> façons. L'ordre dans lequel on enchaîne deux échanges compte.</p>
<p><strong>Le contexte.</strong> Évariste Galois (1811-1832). Mémoires rejetés de son vivant, publiés en 1846.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>compter les façons de ranger n objets</li><li>montrer sur un exemple que l'ordre de deux échanges compte</li><li>raconter la vie de Galois en séparant les faits de la légende</li><li>dire ce qu'Abel et Galois ont démontré</li></ul>` },
  ] },
{
  id: "cantor", an: 1874, date: "1874", lieu: "Halle, Allemagne", genre: "figure", niveau: "Dès la Seconde",
  titre: "Cantor et les infinis", resume: "Il y a plusieurs tailles d'infini",
  accroche: "Y a-t-il plus de nombres entiers que de nombres pairs ? Cantor prend la question au sérieux, et découvre que certains infinis sont plus grands que d'autres.",
  etapes: [
    { t: "pari", titre: "Pairs et entiers",
      q: "On compare deux collections infinies : tous les entiers 1, 2, 3, 4… et tous les nombres pairs 2, 4, 6, 8… Laquelle contient le plus de nombres ?",
      choix: ["Les entiers : il y en a deux fois plus.", "Autant dans les deux.", "La question n'a pas de sens pour des collections infinies."] },
    { t: "quiz", titre: "Compter sans compter",
      intro: "Pour savoir s'il y a autant de chaises que d'élèves dans une salle, inutile de compter : il suffit de demander à chacun de s'asseoir. S'il ne reste ni chaise vide ni élève debout, il y en a autant. Cantor applique cette idée aux collections infinies.",
      doc: `<table class="donnees"><thead><tr><th>Entier</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>…</td><td><span class="m">n</span></td></tr></thead><tbody><tr><th>Nombre pair associé</th><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td><td>…</td><td>2<span class="m">n</span></td></tr></tbody></table>`,
      questions: [
        { q: "Dans ce tableau, quel nombre pair est associé à l'entier 50 ?", choix: ["25", "50", "100"], bon: 2, expl: "À chaque entier n, on associe son double 2n." },
        { q: "Y a-t-il un nombre pair qui n'est associé à aucun entier ?", choix: ["Oui, les très grands.", "Non : tout nombre pair est le double d'un entier.", "Oui, le nombre 2."], bon: 1, expl: "1 000 000 est associé à 500 000, et ainsi de suite. Aucun nombre pair ne reste seul, aucun entier non plus." },
        { q: "Que faut-il en conclure ?", choix: ["Il y a autant de nombres pairs que d'entiers.", "Il y a deux fois moins de nombres pairs.", "Le tableau est truqué."], bon: 0, expl: "Chaque entier a son nombre pair, chaque nombre pair a son entier. Selon le critère des chaises, il y en a autant. Pour l'infini, une partie peut être aussi grande que le tout." },
      ] },
    { t: "manip", titre: "La suite qui n'est jamais dans la liste", widget: "diagonale",
      intro: `<p>Tous les infinis ont-ils alors la même taille ? Cantor montre que non. Voici une liste de suites de 0 et de 1. Chacune continue sans fin, la liste aussi.</p><p>On fabrique une nouvelle suite en descendant la diagonale : à chaque rang, on prend le <strong>contraire</strong> du terme encadré. Clique sur les cases pour modifier la liste, et essaie de faire en sorte que la suite fabriquée y figure.</p>`,
      expl: "La suite fabriquée diffère de la suite n° 1 au rang 1, de la suite n° 2 au rang 2, et ainsi de suite. Elle ne peut être égale à aucune. Quelle que soit la liste, même infinie, il manque toujours au moins une suite : on ne peut pas numéroter toutes les suites de 0 et de 1. Il y en a strictement plus que d'entiers." },
    { t: "lecon", titre: "Un paradis contesté",
      texte: `<p>Georg <strong>Cantor</strong> naît en 1845 à Saint-Pétersbourg et fait toute sa carrière à l'université de Halle, en Allemagne. En 1874, il publie le résultat qui change tout : on peut numéroter les fractions, 1<sup>re</sup>, 2<sup>e</sup>, 3<sup>e</sup>… sans en oublier une seule, mais on ne peut pas numéroter tous les nombres réels. Il existe donc au moins deux infinis de tailles différentes.</p>
<p>L'argument de la diagonale, que tu viens de manipuler, est une seconde preuve, plus simple, qu'il donne en 1891. Elle s'applique aux nombres réels parce qu'un nombre entre 0 et 1 s'écrit comme une suite infinie de chiffres.</p>
<p>Cantor va plus loin : il construit une échelle sans fin d'infinis de plus en plus grands, et apprend à calculer avec eux.</p>
<aside class="contexte"><strong>Une réception violente.</strong> L'infini « achevé » est alors suspect : depuis Aristote, on admet seulement que l'on peut toujours continuer, pas qu'une collection infinie existe d'un seul bloc. Leopold Kronecker, mathématicien influent de Berlin, combat les idées de Cantor et lui barre l'accès aux postes prestigieux. Cantor traverse à partir de 1884 de graves épisodes de dépression et meurt en 1918 dans une clinique de Halle. À cette date, sa théorie des ensembles est devenue le langage commun des mathématiques. David Hilbert parle du paradis que Cantor a créé, et dont nul ne doit pouvoir chasser les mathématiciens.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> On répète que « les mathématiques ont rendu Cantor fou ». Rien ne l'établit. Les historiens décrivent une maladie dépressive récurrente, que l'hostilité de ses collègues et des deuils familiaux ont sans doute aggravée, mais qu'ils n'expliquent pas. Galilée, dès 1638, avait remarqué qu'il y a autant de carrés parfaits que d'entiers ; il en avait conclu qu'on ne peut pas comparer les infinis. Cantor a osé conclure le contraire.</aside>` },
    { t: "qcm", titre: "Et les fractions ?",
      q: "Entre deux entiers, il y a une infinité de fractions. Y a-t-il plus de fractions que d'entiers ?",
      choix: ["Oui, infiniment plus.", "Non : on peut numéroter toutes les fractions, il y en a autant que d'entiers.", "On ne sait pas."], bon: 1,
      retours: ["C'est ce que tout le monde croit d'abord, Cantor compris.", null, "On le sait depuis 1874."],
      expl: "On range les fractions par « taille » : d'abord celles dont numérateur et dénominateur ont pour somme 2, puis 3, puis 4… Chaque groupe est fini, donc on peut les numéroter l'une après l'autre sans en oublier. Les fractions ne sont pas plus nombreuses que les entiers. Les nombres réels, eux, le sont : ce sont les irrationnels, comme √2 et π, qui font la différence." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Peut-on comparer la taille de deux collections infinies ?</p>
<p><strong>L'idée.</strong> Deux collections ont la même taille si l'on peut associer chaque élément de l'une à un élément de l'autre, sans oubli ni répétition.</p>
<p><strong>Les surprises.</strong> Il y a autant de nombres pairs, et autant de fractions, que d'entiers. Mais il y a strictement plus de nombres réels : aucune liste ne les contient tous.</p>
<p><strong>La preuve.</strong> L'argument de la diagonale fabrique un élément absent de n'importe quelle liste.</p>
<p><strong>Le contexte.</strong> Georg Cantor, Halle, 1874 et 1891.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>montrer qu'il y a autant de nombres pairs que d'entiers</li><li>refaire l'argument de la diagonale sur une liste</li><li>dire quels ensembles de nombres on peut numéroter</li><li>raconter pourquoi les idées de Cantor ont été combattues</li></ul>` },
  ] },
{
  id: "hilbert", an: 1924, date: "1924", lieu: "Göttingen, Allemagne", genre: "paradoxe", niveau: "Dès la Seconde",
  titre: "L'hôtel de Hilbert", resume: "Complet, mais toujours une chambre libre",
  accroche: "Un hôtel affiche complet. Un client arrive, puis un car, puis une infinité de voyageurs. Le réceptionniste trouve une chambre pour chacun.",
  etapes: [
    { t: "pari", titre: "Complet",
      q: "Un hôtel possède une infinité de chambres, numérotées 1, 2, 3, 4… Toutes sont occupées. Un voyageur se présente à la réception. Peut-on le loger sans mettre personne dehors ?",
      choix: ["Non : l'hôtel est complet.", "Oui, dans la dernière chambre.", "Oui, en déplaçant les clients."] },
    { t: "quiz", titre: "À la réception", widget: "hotel",
      intro: "Tu tiens la réception. Fais arriver un client, puis un car qui transporte une infinité de passagers, et regarde où chacun se retrouve.",
      questions: [
        { q: "Un client arrive. Où va le client qui occupait la chambre 7 ?", choix: ["Chambre 6", "Chambre 8", "Chambre 14", "Dehors"], bon: 1, expl: "Chacun passe de sa chambre n à la chambre n + 1. Tout le monde a une chambre suivante, puisque les numéros ne s'arrêtent jamais. La chambre 1 est libre." },
        { q: "Pourquoi la réponse « dans la dernière chambre » ne marche-t-elle pas ?", choix: ["Parce qu'elle est trop loin.", "Parce qu'il n'y a pas de dernière chambre.", "Parce qu'elle est réservée."], bon: 1, expl: "Après chaque chambre, il y en a une autre. C'est précisément ce qui rend le déplacement possible : personne ne se retrouve au bout du couloir." },
        { q: "Recommence, puis fais arriver un car infini. Où va le client qui occupait la chambre 7 ?", choix: ["Chambre 8", "Chambre 14", "Chambre 49", "Dehors"], bon: 1, expl: "Chacun passe de la chambre n à la chambre 2n. Les anciens clients occupent les chambres paires." },
        { q: "Quelles chambres sont alors libres pour les passagers du car ?", choix: ["Aucune", "La chambre 1 seulement", "Toutes les chambres impaires"], bon: 2, expl: "1, 3, 5, 7… : une infinité de chambres libres. Le premier passager prend la 1, le deuxième la 3, le n-ième la chambre 2n − 1." },
      ] },
    { t: "lecon", titre: "Une leçon à Göttingen",
      texte: `<p>David <strong>Hilbert</strong> est, dans les années 1920, le mathématicien le plus influent du monde. À Göttingen, il a fait de l'université le centre des mathématiques mondiales. Pendant l'hiver 1924-1925, il donne un cours sur l'infini et invente cet hôtel pour faire sentir à ses étudiants ce que Cantor a démontré.</p>
<p>Il n'y a là aucun tour de magie. Dire que l'hôtel est complet, c'est dire que chaque chambre a un client. Dire qu'on peut loger quelqu'un de plus, c'est dire qu'il y a autant d'entiers à partir de 2 que d'entiers à partir de 1. Pour une collection finie, « complet » et « plus de place » veulent dire la même chose. Pour une collection infinie, non.</p>
<p>C'est d'ailleurs une façon de définir l'infini : une collection est infinie quand on peut l'associer, élément par élément, à l'une de ses parties.</p>
<aside class="contexte"><strong>La limite de l'hôtel.</strong> L'hôtel absorbe un client, un car infini, et même une infinité de cars infinis. Mais il ne peut pas loger un voyageur par nombre réel : Cantor a montré qu'il y en a trop pour qu'on puisse leur donner à chacun un numéro de chambre.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> Hilbert n'a jamais publié son hôtel. L'histoire est devenue célèbre grâce au physicien George Gamow, qui la raconte en 1947 dans un livre de vulgarisation. Le texte du cours de 1924-1925 n'a été édité qu'en 2013.</aside>` },
    { t: "qcm", titre: "Trois voyageurs d'un coup",
      q: "L'hôtel est de nouveau complet. Trois voyageurs arrivent ensemble. Quelle consigne donner aux clients ?",
      choix: ["Chacun passe de la chambre n à la chambre n + 3.", "Chacun passe de la chambre n à la chambre 3n.", "Les deux consignes conviennent."], bon: 2,
      retours: ["Cela marche, et c'est la consigne la plus économe. Mais l'autre libère aussi assez de chambres.", "Cela marche, mais ce n'est pas la seule possibilité.", null],
      expl: "Avec n + 3, on libère exactement les chambres 1, 2 et 3. Avec 3n, on en libère une infinité, bien plus qu'il n'en faut. Dans les deux cas, personne ne dort dehors." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le paradoxe.</strong> Un hôtel aux chambres en nombre infini, toutes occupées, peut encore accueillir de nouveaux clients.</p>
<p><strong>L'explication.</strong> Un client de plus : chacun passe de <span class="m">n</span> à <span class="m">n</span> + 1. Une infinité de clients : chacun passe de <span class="m">n</span> à 2<span class="m">n</span>, ce qui libère les chambres impaires.</p>
<p><strong>La leçon.</strong> Une collection infinie peut avoir la même taille que l'une de ses parties. Ce qui est vrai du fini ne l'est pas forcément de l'infini.</p>
<p><strong>Le contexte.</strong> David Hilbert, cours de 1924-1925 à Göttingen. Popularisé par George Gamow en 1947.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>loger un client, puis une infinité de clients, dans l'hôtel complet</li><li>expliquer pourquoi il n'y a pas de dernière chambre</li><li>relier l'hôtel aux résultats de Cantor</li><li>dire ce que l'hôtel ne peut pas accueillir</li></ul>` },
  ] },
{
  id: "turing", an: 1936, date: "1936", lieu: "Cambridge, Angleterre", genre: "figure", niveau: "Dès la Seconde",
  titre: "Turing et la machine universelle", resume: "Un ruban, une tête de lecture, et tous les calculs possibles",
  accroche: "Pour répondre à une question de logique, un étudiant de vingt-quatre ans imagine une machine. Elle n'existe que sur le papier. Tu en as une dans la poche.",
  etapes: [
    { t: "lecon", titre: "Qu'est-ce que calculer ?",
      texte: `<p>En 1928, David Hilbert pose une question à tous les mathématiciens : existe-t-il un procédé mécanique, applicable sans réfléchir, qui permette de décider si n'importe quel énoncé mathématique est démontrable ? La question porte un nom allemand : <em>Entscheidungsproblem</em>, le problème de la décision.</p>
<p>Pour y répondre, il faut d'abord dire ce qu'est un « procédé mécanique ». Tout le monde en a une idée vague. Personne n'en a de définition.</p>
<p>En 1936, Alan <strong>Turing</strong>, étudiant à Cambridge, en propose une. Il observe ce que fait une personne qui calcule sur du papier : elle regarde un symbole, elle en écrit un autre, elle déplace son regard, elle change d'état d'esprit selon ce qu'elle vient de lire. Il réduit tout cela à une machine imaginaire d'une simplicité extrême.</p>` },
    { t: "quiz", titre: "Fais tourner la machine", widget: "turing",
      intro: "La machine a un ruban divisé en cases, une tête qui lit une case à la fois, et une table de règles. À chaque pas, elle lit un symbole, en écrit un, se déplace d'une case ou s'arrête. Rien d'autre. Essaie les deux programmes.",
      questions: [
        { q: "Programme « Inverser les chiffres », ruban 1011. Qu'y a-t-il sur le ruban à l'arrêt ?", choix: ["1011", "0100", "1101", "0000"], bon: 1, expl: "Chaque 1 est remplacé par 0 et chaque 0 par 1. La machine s'arrête quand elle lit une case vide." },
        { q: "Combien de pas la machine a-t-elle effectués ?", choix: ["3", "4", "5", "8"], bon: 2, expl: "Quatre pas pour les quatre chiffres, et un cinquième pour lire la case vide et s'arrêter." },
        { q: "Programme « Ajouter 1 en binaire », ruban 1011 (onze en binaire). Quel est le résultat ?", choix: ["1100", "1012", "1010", "0100"], bon: 0, expl: "1100, c'est-à-dire douze. La machine part de la droite, transforme les 1 en 0 tant qu'elle en rencontre (ce sont les retenues), puis transforme le premier 0 en 1 et s'arrête." },
        { q: "Même programme, ruban 111 (sept). Que se passe-t-il ?", choix: ["La machine ne s'arrête jamais.", "Elle écrit 1 dans une case vide à gauche : le ruban porte 1000.", "Elle s'arrête sur 000."], bon: 1, expl: "Les trois 1 deviennent 0, la tête arrive sur une case vide et y écrit 1 : 1000, c'est-à-dire huit. Le ruban s'allonge autant que nécessaire." },
      ] },
    { t: "lecon", titre: "Une machine pour toutes les machines",
      texte: `<p>Avec des tables de règles plus longues, une telle machine peut additionner, multiplier, trier, et faire tout ce que fait un ordinateur d'aujourd'hui. Turing montre davantage : on peut écrire la table d'une machine sur le ruban d'une autre. Il existe donc une machine <strong>universelle</strong>, capable d'imiter toutes les autres pourvu qu'on lui fournisse leur table. Le programme devient une donnée. C'est l'idée de l'ordinateur, dix ans avant sa construction.</p>
<p>Il répond aussi à Hilbert, et la réponse est non. Aucune machine ne peut, en examinant un programme quelconque, dire à coup sûr s'il finira par s'arrêter. Il existe des questions précises qu'aucun calcul ne tranchera jamais. Le logicien américain Alonzo Church arrive la même année à la même conclusion par une autre voie.</p>
<aside class="contexte"><strong>Bletchley Park.</strong> Pendant la Seconde Guerre mondiale, Turing travaille au centre britannique de décryptage. Il y conçoit des machines qui retrouvent chaque jour les réglages d'Enigma, la machine à chiffrer de l'armée allemande, en prolongeant le travail accompli avant-guerre par trois mathématiciens polonais, dont Marian Rejewski. En 1950, il pose une autre question qui n'a pas fini d'occuper le monde : une machine peut-elle penser ?</aside>
<aside class="contexte"><strong>1952.</strong> L'homosexualité est alors un délit au Royaume-Uni. Turing est condamné et contraint à un traitement hormonal. Il meurt en 1954, à quarante et un ans, empoisonné au cyanure ; l'enquête conclut à un suicide. Le gouvernement britannique lui présente des excuses officielles en 2009, et il est gracié à titre posthume en 2013.</aside>
<aside class="legende"><strong>Histoire ou légende ?</strong> La pomme croquée du logo d'Apple serait un hommage à Turing, près duquel on a retrouvé une pomme entamée. Le dessinateur du logo a démenti : la morsure sert seulement à ce qu'on ne prenne pas la pomme pour une cerise. Et Turing n'a pas « cassé Enigma tout seul » : des milliers de personnes travaillaient à Bletchley Park, dont une majorité de femmes.</aside>` },
    { t: "code", titre: "Le premier programme, en Python", d: 1,
      caches: ["inverser('0')", "inverser('1100')", "inverser('')"],
      enonce: `<p>Écris la fonction <code>inverser(ruban)</code> qui fait le travail du premier programme de la machine : elle reçoit une chaîne de 0 et de 1 et renvoie la chaîne où chaque chiffre est remplacé par l'autre.</p>`,
      depart: `def inverser(ruban):
    resultat = ""
    for symbole in ruban:
        # à compléter
        pass
    return resultat
`,
      solution: `def inverser(ruban):
    resultat = ""
    for symbole in ruban:
        if symbole == "0":
            resultat = resultat + "1"
        else:
            resultat = resultat + "0"
    return resultat
`,
      tests: [{ appels: [["inverser('1011')", "'0100'"], ["inverser('000')", "'111'"], ["inverser('1')", "'0'"], ["inverser('0110')", "'1001'"]] }],
      indices: ["La boucle lit le ruban symbole après symbole, comme la tête de la machine.", "Si le symbole est \"0\", on ajoute \"1\" au résultat ; sinon, on ajoute \"0\".", "resultat = resultat + \"1\""] },
    { t: "qcm", titre: "Ce qu'aucune machine ne fera",
      q: "Turing démontre qu'aucun programme ne peut examiner n'importe quel autre programme et dire à coup sûr s'il finira par s'arrêter. Qu'est-ce que cela signifie ?",
      choix: ["Que les ordinateurs de 1936 étaient trop lents.", "Qu'il existe des questions bien posées auxquelles aucun calcul, sur aucune machine, ne peut répondre dans tous les cas.", "Que les programmes ne s'arrêtent jamais."], bon: 1,
      retours: ["Il n'y avait aucun ordinateur en 1936, et le résultat ne dépend pas de la vitesse.", null, "La plupart s'arrêtent très bien. Le problème est de le garantir pour tous à la fois."],
      expl: "Ce n'est pas une question de puissance ou de temps : c'est une impossibilité démontrée, comme l'irrationalité de √2 ou l'absence de formule pour le cinquième degré. En définissant précisément ce qu'est un calcul, Turing a aussi tracé sa frontière." },
    { t: "lecon", synthese: true, titre: "Fiche de l'escale",
      texte: `<p><strong>Le problème.</strong> Définir précisément ce qu'est un calcul, pour savoir si tout problème mathématique peut être résolu mécaniquement.</p>
<p><strong>L'idée.</strong> Une machine imaginaire : un ruban, une tête qui lit et écrit un symbole à la fois, une table de règles.</p>
<p><strong>Deux résultats.</strong> Il existe une machine universelle, qui exécute n'importe quelle table qu'on lui fournit. Et il existe des questions qu'aucune machine ne peut trancher, comme celle de l'arrêt des programmes.</p>
<p><strong>Le contexte.</strong> Alan Turing (1912-1954), Cambridge, article de 1936. Décryptage d'Enigma à Bletchley Park.</p>
<p><strong>Je sais…</strong></p><ul class="je-sais"><li>exécuter pas à pas une machine de Turing simple</li><li>expliquer ce qu'est une machine universelle</li><li>dire ce que signifie le problème de l'arrêt</li><li>raconter la vie de Turing en séparant les faits de la légende</li></ul>` },
  ] },
];

/* ----- Assemblage : les escales rejoignent leur époque, dans l'ordre chronologique ----- */
PARCOURS.splice(1, 0, { id: "moy", titre: "Moyen Âge", sous: "De l'Inde à l'Italie, par Bagdad", chapitres: [] });
[["ant", ESCALES_ANT], ["moy", ESCALES_MOY], ["mod", ESCALES_MOD], ["cont", ESCALES_CONT]].forEach(([id, liste]) => {
  const p = PARCOURS.find(q => q.id === id); p.chapitres.push(...liste); p.chapitres.sort((a, b) => a.an - b.an);
});
const NOMS_COURTS = { babylone: "Babylone et √2", pythagore: "Pythagore", zenon: "Zénon", euclide: "Euclide", archimede: "Archimède", eratosthene: "Ératosthène", brahmagupta: "Brahmagupta", alkhwarizmi: "Al-Khwarizmi", fibonacci: "Fibonacci", partis: "Pascal et Fermat", newton: "Newton", konigsberg: "Euler", galois: "Galois", cantor: "Cantor", hilbert: "Hilbert", turing: "Turing", montyhall: "Monty Hall" };
PARCOURS.flatMap(p => p.chapitres).forEach((c, k) => { c.num = k + 1; c.court = NOMS_COURTS[c.id] || c.titre; });
A_VENIR.length = 0;

/* ----- Lexique des nouvelles escales ----- */
if (typeof LEXIQUE !== "undefined") LEXIQUE.push(
  { t: "Base soixante", c: "babylone", d: "Façon de compter des scribes de Mésopotamie, par paquets de soixante. Il nous en reste les minutes, les secondes et les degrés." },
  { t: "Méthode de Héron", c: "babylone", d: "Pour approcher √a : remplacer plusieurs fois x par la moyenne de x et de a ÷ x. Le nombre de chiffres exacts double à peu près à chaque étape." },
  { t: "YBC 7289", c: "babylone", d: "Tablette d'argile mésopotamienne, vers 1800 av. J.-C., qui porte un carré, ses diagonales et une valeur de √2 exacte à six chiffres." },
  { t: "Nombre rationnel", c: "pythagore", d: "Nombre qui peut s'écrire comme le quotient de deux entiers. Exemples : 3/4, 5, 0,333…" },
  { t: "Nombre irrationnel", c: "pythagore", d: "Nombre qui ne peut pas s'écrire comme le quotient de deux entiers. Exemples : √2, π." },
  { t: "Raisonnement par l'absurde", c: "pythagore", d: "On suppose vrai le contraire de ce que l'on veut prouver, et on en tire une contradiction. L'hypothèse était donc fausse." },
  { t: "Pythagore", c: "pythagore", d: "Penseur grec installé à Crotone vers 530 av. J.-C., fondateur d'une école pour laquelle tout s'explique par des rapports d'entiers. Il n'a laissé aucun écrit." },
  { t: "Suite géométrique", c: "zenon", d: "Suite où l'on passe d'un terme au suivant en multipliant toujours par le même nombre, la raison." },
  { t: "Somme infinie", c: "zenon", d: "Addition d'une infinité de termes. Elle peut être finie (1/2 + 1/4 + 1/8 + … = 1) ou infinie (1 + 1/2 + 1/3 + …)." },
  { t: "Zénon d'Élée", c: "zenon", d: "Philosophe grec (vers 490 à 430 av. J.-C.), élève de Parménide, auteur de paradoxes sur le mouvement connus par Aristote." },
  { t: "PGCD", c: "euclide", d: "Plus grand commun diviseur de deux entiers : le plus grand entier qui les divise tous les deux." },
  { t: "Algorithme d'Euclide", c: "euclide", d: "Pour trouver le PGCD de deux entiers : diviser le grand par le petit, puis le petit par le reste, et continuer. Le PGCD est le dernier reste non nul." },
  { t: "Nombres premiers entre eux", c: "euclide", d: "Deux entiers dont le PGCD vaut 1 : ils n'ont aucun diviseur commun à part 1." },
  { t: "Euclide", c: "euclide", d: "Mathématicien grec d'Alexandrie, vers 300 av. J.-C., auteur des Éléments, manuel de référence pendant plus de deux mille ans." },
  { t: "Nombre premier", c: "eratosthene", d: "Entier qui a exactement deux diviseurs : 1 et lui-même. Les premiers sont 2, 3, 5, 7, 11, 13…" },
  { t: "Crible d'Ératosthène", c: "eratosthene", d: "Procédé pour lister les nombres premiers : garder le plus petit nombre non barré, barrer ses multiples, recommencer." },
  { t: "Ératosthène", c: "eratosthene", d: "Savant grec (vers 276 à 194 av. J.-C.), directeur de la Bibliothèque d'Alexandrie. Il estime le tour de la Terre à partir de l'ombre d'un bâton." },
  { t: "Numération de position", c: "brahmagupta", d: "Écriture des nombres où la valeur d'un chiffre dépend de sa place : dans 204, le 2 vaut deux centaines." },
  { t: "Zéro", c: "brahmagupta", d: "Signe qui marque une place vide dans l'écriture d'un nombre, et nombre à part entière avec ses règles de calcul depuis Brahmagupta." },
  { t: "Brahmagupta", c: "brahmagupta", d: "Astronome et mathématicien indien (598 à 668 environ). En 628, il donne les premières règles de calcul avec le zéro et les nombres négatifs." },
  { t: "Compléter le carré", c: "alkhwarizmi", d: "Ajouter des deux côtés d'une équation ce qu'il faut pour que x² + bx devienne un carré : (x + b/2)². C'est la forme canonique." },
  { t: "Algèbre", c: "alkhwarizmi", d: "Mot venu de l'arabe al-jabr, « la restauration », opération qui fait passer un terme d'un côté à l'autre d'une égalité, dans le titre du livre d'al-Khwarizmi." },
  { t: "Algorithme", c: "alkhwarizmi", d: "Suite d'instructions précises qui mène au résultat. Le mot vient du nom latinisé d'al-Khwarizmi." },
  { t: "Al-Khwarizmi", c: "alkhwarizmi", d: "Savant de Bagdad (vers 780 à 850). Il classe les équations du second degré, donne une méthode pour chaque type et la justifie par une figure." },
  { t: "Chiffres romains", c: "fibonacci", d: "Écriture des nombres où chaque signe a une valeur fixe (I, V, X, L, C, D, M). Commode pour noter, impraticable pour poser une opération." },
  { t: "Suite de Fibonacci", c: "fibonacci", d: "Suite où chaque terme est la somme des deux précédents : 1, 2, 3, 5, 8, 13… Le rapport de deux termes voisins s'approche du nombre d'or." },
  { t: "Léonard de Pise", c: "fibonacci", d: "Mathématicien italien (vers 1170 à 1250), dit Fibonacci. Son Liber abaci (1202) diffuse en Europe les chiffres indo-arabes et le calcul écrit." },
  { t: "Problème des partis", c: "partis", d: "Comment partager équitablement l'enjeu d'un jeu de hasard interrompu ? Réponse de Pascal et Fermat : selon les chances de gagner de chacun." },
  { t: "Blaise Pascal", c: "partis", d: "Mathématicien, physicien et écrivain français (1623-1662). Avec Fermat, il fonde en 1654 le calcul des probabilités." },
  { t: "Pierre de Fermat", c: "partis", d: "Magistrat à Toulouse et mathématicien (vers 1607 à 1665). Il résout le problème des partis en dénombrant les fins de partie possibles." },
  { t: "Tangente", c: "newton", d: "Droite qui frôle une courbe en un point. Près de ce point, la courbe et sa tangente se confondent presque ; la pente de la tangente est le nombre dérivé." },
  { t: "Méthode de Newton", c: "newton", d: "Pour résoudre f(x) = 0 : remplacer plusieurs fois x par x − f(x) ÷ f′(x), le point où la tangente coupe l'axe." },
  { t: "Isaac Newton", c: "newton", d: "Savant anglais (1642-1727). Il invente, en même temps que Leibniz, le calcul des dérivées et des intégrales, et formule la loi de la gravitation." },
  { t: "Factorielle", c: "galois", d: "Produit 1 × 2 × … × n : le nombre de façons de ranger n objets. La factorielle de 5 vaut 120." },
  { t: "Permutation", c: "galois", d: "Façon de ranger des objets dans un certain ordre, ou mouvement qui les échange entre eux." },
  { t: "Évariste Galois", c: "galois", d: "Mathématicien français (1811-1832). Il explique quelles équations se résolvent par une formule en étudiant les échanges possibles entre leurs solutions." },
  { t: "Ensemble dénombrable", c: "cantor", d: "Collection infinie dont on peut numéroter tous les éléments : 1er, 2e, 3e… Les entiers, les nombres pairs et les fractions le sont ; les réels ne le sont pas." },
  { t: "Argument de la diagonale", c: "cantor", d: "Preuve de Cantor : à partir de n'importe quelle liste de suites, on fabrique une suite qui diffère de la n-ième au rang n, donc absente de la liste." },
  { t: "Georg Cantor", c: "cantor", d: "Mathématicien allemand (1845-1918), créateur de la théorie des ensembles. Il montre qu'il existe plusieurs tailles d'infini." },
  { t: "Hôtel de Hilbert", c: "hilbert", d: "Hôtel imaginaire aux chambres en nombre infini, toutes occupées, qui peut pourtant accueillir de nouveaux clients en décalant les anciens." },
  { t: "David Hilbert", c: "hilbert", d: "Mathématicien allemand (1862-1943), figure dominante de son époque. Ses listes de problèmes ont orienté la recherche du XXe siècle." },
  { t: "Machine de Turing", c: "turing", d: "Machine imaginaire : un ruban, une tête qui lit et écrit un symbole à la fois, une table de règles. Elle définit ce qu'est un calcul." },
  { t: "Problème de l'arrêt", c: "turing", d: "Aucun programme ne peut dire, pour tout programme, s'il finira par s'arrêter. Démontré par Turing en 1936." },
  { t: "Alan Turing", c: "turing", d: "Mathématicien britannique (1912-1954). Il définit la notion de calcul, conçoit les machines qui décryptent Enigma et pose la question de l'intelligence des machines." },
);
