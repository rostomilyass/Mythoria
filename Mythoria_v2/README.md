# Mythoria — Partie 2 : l'Arène

Arène de combat stratégique de Mythoria. Le joueur affronte un bot en local avec **le deck qu'il a composé dans la partie 1** (`deck.html`). Pas de multijoueur en ligne.

## Lancer le jeu

Aucune installation ni compilation.

1. Ouvrir le dossier **parent** `Mythoria/` (celui qui contient `index.html`, `deck.html` et `Mythoria_v2/`) avec un serveur local, par exemple l'extension **Live Server** de VS Code.
2. Sur le site, composer un deck d'au moins **5 cartes** (Boutique → Ouverture → Deck).
3. Cliquer sur **Arène** dans le menu, puis **Jouer contre le Bot**.

Pourquoi un serveur local ?
- Le code est découpé en **modules ES6** (`<script type="module">`) et les cartes sont chargées depuis `data/cards.json` avec `fetch` : les navigateurs bloquent les deux en `file://`.
- L'arène lit le deck dans le **LocalStorage** du site. Le site et l'arène doivent donc être servis ensemble (même origine), en local comme sur Vercel.

Une connexion internet est nécessaire pour Tailwind CSS et les polices (CDN).

## Déroulement d'une partie

```
Arène (menu)  →  setup.html  →  arena.html  →  écran de résultat  →  Rejouer
```

**Préparation (`setup.html`)**
1. **Lancer la pièce** : un tirage aléatoire décide qui joue en premier.
2. **Choisir son camp** : celui qui commence choisit Lumière ou Ténèbres (le bot choisit au hasard s'il commence).
3. **Camp adverse** : l'adversaire reçoit automatiquement le camp opposé.

**Interface de l'arène (`arena.html`)**
- En haut : les créatures invoquées par l'adversaire (10 emplacements).
- Au centre : vos créatures (10 emplacements).
- En bas : votre main (5 cartes maximum).
- Sur le côté : les decks (cartes restantes) de chaque joueur.
- Panneau d'informations : PV et camp de chaque joueur, tour actuel, boutons **🛡 Défendre** et **Fin du tour**, historique des actions.

## Règles du jeu

### Points de vie et cartes
- Chaque joueur commence avec **20 PV** et **5 cartes** en main (5 au maximum).
- Les cartes combattent avec **leurs statistiques imprimées** : une carte ATK 4 / PV 6 inflige 4 dégâts et a 6 PV. Le brief propose 3000 PV « par exemple » ; avec des attaques de 1 à 11, 20 PV donnent des parties d'environ 5 à 6 tours (valeur choisie en simulant des milliers de parties).

### Un tour
1. **Pioche** : 1 carte au début du tour, si la main contient moins de 5 cartes.
2. **Jouer une carte** (une seule par tour) : cliquer une carte de la main.
   - Une **créature** est posée sur le terrain.
   - Un **sort** s'applique immédiatement.
3. **Agir avec chaque créature** (une fois par tour) : cliquer une de vos créatures, puis
   - **Attaquer** : cliquer une créature adverse, ou les PV de l'adversaire si son terrain est vide ;
   - ou **🛡 Défendre**.
4. **Fin du tour** : le bot joue automatiquement, puis la main revient au joueur.

### Combat
- Une attaque inflige des dégâts égaux à l'**ATK** de l'attaquant ; ils réduisent les PV de la cible.
- Une créature à **0 PV** quitte le champ de bataille.
- **Attaque directe** : seulement si l'adversaire n'a plus aucune créature.
- **Défense 🛡** : la créature n'attaque pas ce tour. Jusqu'au prochain tour de son camp, elle subit **moitié moins de dégâts** (arrondi au supérieur) et **doit être attaquée en premier**. Elle peut donc protéger des créatures plus fragiles.
- Actions impossibles bloquées (avec un message) : jouer une carte absente de la main, jouer deux cartes dans le même tour, agir deux fois avec la même créature, attaquer une autre cible qu'un défenseur, jouer quand ce n'est pas son tour ou après la fin du combat.

### Compatibilité des camps
- Une créature de **son camp** garde ses statistiques.
- Une créature du **camp opposé** subit **−20 %** d'ATK et de PV, arrondis, avec toujours au moins 1 point de moins (ex. Vorgath 11/8 → 9/6 ; un 2 devient 1).
- Les **minions** et les **sorts** sont **neutres** : aucune pénalité.
- La pénalité s'applique à la copie de combat : les cartes du grimoire ne sont jamais modifiées.

### Sorts
| Sort | Effet |
|---|---|
| 🔥 Étincelle | 2 dégâts à la créature adverse la plus forte, ou à l'adversaire si son terrain est vide |
| ⚡ Éclair Noir | 5 dégâts, même ciblage |
| 🙏 Bénédiction | Soigne 3 PV (maximum 20) |
| 📜 Pacte Interdit | Pioche jusqu'à 3 cartes (main limitée à 5) et perd 4 PV |
| 🌌 Cataclysme Astral | Détruit toutes les créatures des deux camps |

### Fin de partie
- Un joueur à **0 PV** perd.
- **Victoire alternative** : un joueur qui n'a plus aucune carte (deck, main et terrain vides) au début de son tour perd.
- Un écran de résultat (Victoire / Défaite) propose de rejouer.

## L'adversaire (bot)
- Il joue sa **créature la plus forte** ; sinon un **sort utile** (soin seulement s'il est blessé, Cataclysme seulement si vous avez plus de créatures, Pacte seulement s'il y survit). S'il n'a plus rien d'autre à faire, il joue quand même son dernier sort, pour que la partie ne puisse pas durer indéfiniment.
- Pour chaque créature, il **choisit entre attaque et défense** : il attaque s'il peut tuer une cible (la plus dangereuse) ; sinon il se défend si l'une de vos créatures pourrait le tuer et que la défense le sauverait ; sinon il attaque votre créature la plus forte.

## Organisation du code

Le JavaScript est découpé en **modules ES6** (`export` / `import`), chargés avec `<script type="module">`.

| Fichier | Rôle |
|---|---|
| `js/main.js` | Point d'entrée de `arena.html` : charge les cartes, crée la partie, gère les clics |
| `js/ui.js` | Affichage : terrain, main, PV, journal, résultat. Exporte `renderList()`, `clearForm()`, `renderGame()`… |
| `js/state.js` | État de la partie et LocalStorage du journal. Exporte `addItem()`, `loadItems()`, `saveItems()`, `newGame()` |
| `js/utils.js` | Fonctions utilitaires. Exporte `formatDate()`, `generateId()`, `shuffle()` |
| `js/cards.js` | Catalogue, deck du joueur (lu depuis la partie 1) et deck du bot |
| `js/combat.js` | Invocation, attaques, défense, sorts, dégâts, PV et pénalités de faction |
| `js/turns.js` | Tours (pioche, début et fin de tour) et lancer de pièce |
| `js/opponent.js` | Décisions du bot |
| `js/setup.js` | Page de préparation (pièce et choix du camp) |
| `data/cards.json` | Données des 20 cartes (copie du catalogue de la partie 1, avec l'effet de chaque sort) |
| `assets/styles/style.css` | Styles complémentaires à Tailwind (focus clavier, journal, animations réduites) |

```
Mythoria_v2/
├── index.html      # Menu du jeu
├── setup.html      # Pièce + choix du camp
├── arena.html      # Plateau de jeu
├── data/
│   └── cards.json
├── assets/
│   └── styles/
│       └── style.css
├── js/
│   ├── main.js  ui.js  state.js  utils.js
│   ├── cards.js  combat.js  turns.js  opponent.js
│   └── setup.js
└── README.md
```

### Données en LocalStorage
| Clé | Écrite par | Contenu |
|---|---|---|
| `deck` | `deck.html` (partie 1) | Identifiants des cartes du deck |
| `firstPlayer`, `playerSide`, `botSide` | `setup.html` | Qui commence et les camps |
| `mythoria-arena-log` | `state.js` | Historique du combat en cours |

## Technologies
- HTML5, **Tailwind CSS v4** (CDN `@tailwindcss/browser@4`) avec un `@theme` personnalisé
- JavaScript vanilla en modules ES6, `fetch`, LocalStorage
- Élément natif `<dialog>` pour la confirmation « Quitter »
- Google Fonts : Cinzel, Cinzel Decorative, Crimson Pro

## Bonus réalisés
- [x] Adversaire capable de choisir entre attaque et défense
- [x] Victoire alternative quand un joueur n'a plus de cartes
- [x] Historique de combat et écran de résultat
- [ ] Animations de dégâts, d'invocation et de destruction
- [ ] Mode joueur contre joueur (bouton présent, mode « en préparation »)
