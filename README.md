# Périple — un voyage dans l'histoire des mathématiques

Site statique pour le lycée. Chaque escale part d'un problème que l'élève tente de résoudre, lui fait refaire
le geste du mathématicien (manipulation interactive, parfois Python), puis raconte le contexte historique.
Aucun serveur, aucun compte, aucune donnée transmise. Le moteur est celui des sites Mue et Synapse.

## Contenu

Dix-sept escales, réparties en quatre époques. Chacune comporte une manipulation interactive, une leçon de contexte
avec un encadré « Histoire ou légende ? », des questions et une fiche ; douze d'entre elles ont un exercice Python.

| Époque | Escales |
|---|---|
| Antiquité | Babylone et √2, Pythagore et les irrationnels, Zénon, Euclide, Archimède et π, Ératosthène |
| Moyen Âge | Brahmagupta et le zéro, al-Khwarizmi, Fibonacci |
| Temps modernes | Pascal et Fermat, Newton, Euler et Königsberg |
| Époque contemporaine | Galois, Cantor, Hilbert, Turing, Monty Hall |

Une section Problèmes propose onze énigmes historiques (réponse à saisir ou programme Python), listées dans `DEFIS`.
Chaque époque a sa couleur et son ornement : on les retrouve dès qu'on entre dans une escale ou un problème.

## Organisation

- `js/contenu.js` : les trois escales du pilote et les problèmes ; le format de chaque type d'étape est décrit en tête de fichier.
- `js/escales-anciennes.js`, `js/escales-modernes.js` : les quatorze autres escales, leur lexique, et l'assemblage par époque.
- `js/periple.js` : l'accueil (figure, frise), les étapes « pari », « manip » et « reponse », les manipulations du pilote.
- `js/manips.js` : les manipulations des autres escales.
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
