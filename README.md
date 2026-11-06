# Mythoria — Jeu de cartes à collectionner

Site web officiel de **Mythoria**, un jeu de cartes à collectionner dark fantasy.
Les joueurs achètent des boosters, les ouvrent, remplissent leur grimoire, composent leur deck puis combattent dans l'arène.

**Site en ligne (Vercel) :** https://mythoria-gilt.vercel.app/
**Planification des tâches :** [GitHub Projects — Mythoria](https://github.com/users/rostomilyass/projects/5) · [Liste des issues](https://github.com/rostomilyass/Mythoria/issues)

---

## Sommaire
1. [Contexte](#contexte)
2. [État d'avancement](#état-davancement)
3. [Technologies](#technologies)
4. [Structure du projet](#structure-du-projet)
5. [Lancer le projet en local](#lancer-le-projet-en-local)
6. [Règles du jeu définies dans le projet](#règles-du-jeu-définies-dans-le-projet)
7. [Planification](#planification)
8. [Auteur](#auteur)

---

## Contexte

Le studio souhaite lancer Mythoria, un jeu de cartes dans lequel les joueurs découvrent des créatures, des héros, des serviteurs et des sorts. La mission est de concevoir et développer le site web du jeu : boutique de boosters, ouverture des paquets, collection (grimoire) et création de deck. La partie 2 ajoute une arène de combat contre un bot (voir [`Mythoria_v2/README.md`](Mythoria_v2/README.md)).

## État d'avancement

| Page | Statut | Détail |
|---|---|---|
| **Home** (`index.html`) | Terminée | Hero, boosters, catégories de cartes, cartes légendaires, navigation |
| **Boutique** (`shop.html`) | Terminée | Boosters, contenu de chaque booster, panier, total en temps réel, commande simulée |
| **Opening Chamber** (`opening.html`) | Terminée | Ouverture animée, tirage aléatoire pondéré, message pour les cartes rares |
| **My Grimoire** (`grimoire.html`) | Terminée | Livre à pages, filtres type / rareté, détail d'une carte, état vide |
| **My Deck** (`deck.html`) | Terminée | 20 cartes max, 1 copie par carte, statistiques, sauvegarde |
| **Arène** (`Mythoria_v2/`) | Terminée | Combat contre le bot avec le deck du joueur (partie 2) |

### Page d'accueil
- Section **Hero** immersive : nom du jeu, illustration, slogan
- Boutons « **Découvrir les boosters** » (vers la boutique) et « **Ouvrir mon grimoire** » (vers la collection)
- Présentation des **4 catégories de cartes** : Serviteurs de la Lumière, Serviteurs des Ténèbres, Minions, Sorts
- Section des **4 boosters** disponibles
- **Cartes légendaires** : générées depuis le catalogue (`home.js`), donc uniquement des cartes que l'on peut obtenir (Archange Séraphiel, Vorgath, Cataclysme Astral)
- Navigation vers toutes les pages (dont l'Arène), avec compteur de panier dans l'en-tête

### Boutique (Booster Shop)
| Booster | Prix | Contenu |
|---|---|---|
| Beginner Pack — Pack du débutant | 399 dh | 5 cartes · Lumière, Ténèbres, Minions, Sorts |
| Summoning of the Legends — Invocation des légendes | 999 dh | 5 cartes · toutes catégories · au moins 1 Épique garantie |
| Dark Summoning — Invocation obscure | 699 dh | 5 cartes · Ténèbres, Minions, Sorts · au moins 1 Rare garantie |
| Lucky Pack — Pack de la chance | 599 dh | 5 cartes · toutes catégories · meilleures chances de Légendaire |

Chaque booster affiche son illustration, son nom, sa description, son prix et son contenu (généré depuis les données `BOOSTERS` de `cards.js`).

### Panier
- [x] Ajouter un ou plusieurs boosters, choix de la quantité
- [x] Total du panier mis à jour en temps réel (aussi dans l'en-tête)
- [x] Retirer un booster ou **vider le panier**
- [x] Conservation du panier après actualisation (**LocalStorage**)
- [x] Bouton « Commander » : validation simulée, sans paiement réel ; les boosters achetés deviennent disponibles dans la salle d'ouverture

## Technologies
- **HTML5** sémantique
- **Tailwind CSS v4** (CDN `@tailwindcss/browser@4`) avec un thème personnalisé (`@theme` : couleurs et polices)
- **JavaScript** vanilla, **LocalStorage** (panier, boosters, collection, deck)
- **Illustrations SVG** originales (dossier `assets/`)
- **Git / GitHub** : versionnement et planification (Projects, Issues)
- **Vercel** : hébergement

## Structure du projet

```
Mythoria/
├── index.html        # Accueil
├── shop.html         # Boutique + panier
├── opening.html      # Salle d'ouverture des boosters
├── grimoire.html     # Collection (livre)
├── deck.html         # Création du deck
├── cards.js          # Données du jeu : catalogue des 20 cartes, boosters, probabilités, tirage, LocalStorage
├── packs.js          # Panier (toutes les pages) et contenu des boosters (boutique)
├── home.js           # Cartes légendaires de l'accueil
├── opening.js        # Ouverture et révélation des cartes
├── grimoire.js       # Pages du grimoire, filtres, fiche détaillée
├── deck.js           # Ajout / retrait, limites, statistiques du deck
├── assets/           # Illustrations SVG (hero, boosters, catégories, cartes)
├── Mythoria_v2/      # Partie 2 : l'arène de combat (voir son README)
└── README.md
```

## Lancer le projet en local

Aucune installation : ouvrir le dossier `Mythoria` avec un serveur local (par exemple l'extension **Live Server** de VS Code) et aller sur `index.html`.
Il faut servir **tout le dossier** : l'arène (`Mythoria_v2/`) lit le deck enregistré par `deck.html` dans le LocalStorage, ce qui ne fonctionne que sur le même site.

## Règles du jeu définies dans le projet

- Un booster contient **5 cartes**, tirées aléatoirement dans le catalogue défini en JavaScript (`cards.js`).
- Le type de booster détermine les **catégories éligibles** et les **probabilités** de chaque rareté ; certains boosters garantissent une rareté minimum sur la dernière carte.
- Les cartes sont tirées **au moment de l'ouverture** (pas choisies à l'avance), puis ajoutées automatiquement à la collection.
- La **collection** peut contenir plusieurs exemplaires d'une même carte.
- Le **deck** contient **20 cartes maximum**, avec **1 seule copie** de chaque carte unique.
- Le panier, les boosters achetés, la collection et le deck sont conservés dans le **LocalStorage**.

## Planification

La planification est gérée sur GitHub : **Projects** (tableau Kanban), **Issues** (une tâche = une issue).

## Auteur

Projet réalisé par **Ilyass** dans le cadre de la formation.
