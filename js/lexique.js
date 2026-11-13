/* Lexique de Périple : un terme ou un nom, sa définition, l'identifiant de l'escale où il apparaît.
   Sert à la page Lexique et aux fiches de révision. Ajouter une ligne suffit à créer une fiche. */
const LEXIQUE = [
  // Archimède encercle π
  { t: "π (pi)", c: "archimede", d: "Périmètre d'un cercle de diamètre 1. Plus généralement, rapport entre le périmètre d'un cercle et son diamètre." },
  { t: "Encadrement", c: "archimede", d: "Deux nombres, l'un plus petit et l'autre plus grand que la valeur cherchée. Plus ils sont proches, plus l'encadrement est précis." },
  { t: "Polygone inscrit", c: "archimede", d: "Polygone dont tous les sommets sont sur le cercle. Son périmètre est plus petit que celui du cercle." },
  { t: "Polygone circonscrit", c: "archimede", d: "Polygone dont tous les côtés touchent le cercle. Son périmètre est plus grand que celui du cercle." },
  { t: "Valeur approchée et encadrement", c: "archimede", d: "Une valeur approchée ne dit pas de combien elle se trompe. Un encadrement donne deux bornes sûres entre lesquelles se trouve la valeur exacte." },
  { t: "Archimède", c: "archimede", d: "Savant grec de Syracuse, en Sicile (vers 287 à 212 av. J.-C.). Dans « De la mesure du cercle », il encadre π entre 3 + 10/71 et 3 + 1/7 avec des polygones de 96 côtés." },
  { t: "22/7", c: "archimede", d: "Borne supérieure de π obtenue par Archimède, soit environ 3,1429. Ce n'est pas la valeur de π, qui est légèrement plus petit." },
  { t: "Al-Kashi", c: "archimede", d: "Mathématicien et astronome de Samarcande. En 1424, il calcule 16 chiffres de π après la virgule avec la méthode des polygones, poussée à 3 × 2^28 côtés." },
  { t: "Zu Chongzhi", c: "archimede", d: "Mathématicien chinois du Ve siècle. Il établit que π est compris entre 3,1415926 et 3,1415927." },
  // Euler et les ponts de Königsberg
  { t: "Graphe", c: "konigsberg", d: "Ensemble de points, les sommets, dont certains sont reliés par des traits, les arêtes. Seules les liaisons comptent, pas les distances ni les formes." },
  { t: "Sommet", c: "konigsberg", d: "Point d'un graphe. À Königsberg, chaque zone de terre est un sommet." },
  { t: "Arête", c: "konigsberg", d: "Trait reliant deux sommets d'un graphe. À Königsberg, chaque pont est une arête." },
  { t: "Degré d'un sommet", c: "konigsberg", d: "Nombre d'arêtes qui aboutissent à ce sommet." },
  { t: "Théorème d'Euler", c: "konigsberg", d: "Un graphe d'un seul tenant peut être parcouru en passant une fois et une seule par chaque arête si, et seulement si, il possède 0 ou 2 sommets de degré impair." },
  { t: "Leonhard Euler", c: "konigsberg", d: "Mathématicien né à Bâle (1707-1783), membre des académies de Saint-Pétersbourg et de Berlin. Sa solution du problème des ponts, en 1736, est considérée comme le point de départ de la théorie des graphes." },
  { t: "Königsberg", c: "konigsberg", d: "Ville de Prusse traversée par le Pregel, aujourd'hui Kaliningrad, en Russie. Sept ponts y reliaient quatre zones de terre." },
  { t: "Carl Hierholzer", c: "konigsberg", d: "Mathématicien allemand (1840-1871). On lui doit la preuve, publiée en 1873, que la promenade existe toujours quand le graphe a 0 ou 2 sommets de degré impair." },
  // Le paradoxe de Monty Hall
  { t: "Paradoxe", c: "montyhall", d: "Résultat qui heurte l'intuition. Certains paradoxes sont des résultats vrais mais surprenants, comme celui de Monty Hall ; d'autres révèlent une contradiction dans un raisonnement." },
  { t: "Problème de Monty Hall", c: "montyhall", d: "Trois portes, une voiture. Après le choix du joueur, le présentateur ouvre une porte perdante et propose de changer. Changer fait gagner avec une probabilité de 2/3." },
  { t: "Fréquence", c: "montyhall", d: "Nombre de fois où un résultat se produit, divisé par le nombre total d'essais. Sur un grand nombre d'essais, elle se rapproche de la probabilité." },
  { t: "Simulation", c: "montyhall", d: "Reproduction d'une expérience aléatoire un grand nombre de fois, à la main ou par un programme, pour estimer une probabilité." },
  { t: "Marilyn vos Savant", c: "montyhall", d: "Chroniqueuse américaine. En 1990, dans le magazine Parade, elle répond qu'il faut changer de porte et maintient sa réponse malgré des milliers de lettres de protestation." },
  { t: "Steve Selvin", c: "montyhall", d: "Statisticien de l'université de Californie à Berkeley. Il pose et résout le problème en 1975 dans la revue The American Statistician, et lui donne le nom de Monty Hall." },
];
