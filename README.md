# Périple — un voyage dans l'histoire des mathématiques

Site statique pour le lycée. Chaque escale part d'un problème que l'élève tente de résoudre, lui fait refaire
le geste du mathématicien (manipulation interactive, parfois Python), puis raconte le contexte historique.
Aucun serveur, aucun compte, aucune donnée transmise. Le moteur est celui des sites Mue et Synapse.

## État : pilote

Trois escales, une de chaque genre :

| Escale | Genre | Manipulations |
|---|---|---|
| Archimède encercle π (vers 250 av. J.-C.) | Méthode | Polygones inscrits et circonscrits, doublement en Python |
| Euler et les sept ponts de Königsberg (1736) | Figure en son temps | Promenade sur le plan, fermeture d'un pont |
| Le paradoxe de Monty Hall (1975) | Paradoxe | Pari, jeu à la main, simulation de milliers de parties |

Une section Problèmes propose onze énigmes historiques (réponse à saisir ou programme Python), listées dans `DEFIS`.
Chaque époque a sa couleur et son ornement : on les retrouve dès qu'on entre dans une escale ou un problème.

Les escales à venir affichées sur la frise de l'accueil sont listées dans `A_VENIR`, à la fin de `js/contenu.js`.

## Organisation

- `js/contenu.js` : tout le contenu ; le format de chaque type d'étape est décrit en tête de fichier.
- `js/periple.js` : l'accueil (figure, frise), les étapes « pari » et « manip », les trois manipulations.
- `js/lexique.js` : termes et personnages, repris en fiches de révision.
- `js/app.js`, `js/moteur.js`, `js/bilan.js`, `js/prof.js` : moteur commun avec Mue et Synapse.
- `polices/` : polices servies par le site (Computer Modern Unicode, la police de LaTeX, et JetBrains Mono ; licence OFL).

Chaque leçon historique distingue ce qui est attesté de ce qui relève de la légende (encadré « Histoire ou légende ? »).

## Mise en ligne sur GitHub Pages

Déposer le contenu de ce dossier à la racine d'un dépôt public, puis, dans Settings > Pages,
choisir « Deploy from a branch », branche `main`, dossier `/ (root)`.

## Modifier le contenu

Ajouter les nouvelles étapes à la fin d'une escale : la progression est enregistrée par position. Avant de publier :

    cd tests && npm install pyodide && node verifier.js

## Suivi de classe

Dans sa page Profil, l'élève génère un « code pour mon professeur ». La page `prof.html`
(lien « Espace professeur ») range les codes collés par classe (un onglet par classe, comparaison, progrès, export CSV).
