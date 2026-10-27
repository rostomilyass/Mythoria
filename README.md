# Mythoria — Jeu de cartes à collectionner

Site web officiel de **Mythoria**, un jeu de cartes à collectionner dark fantasy.
Les joueurs découvrent l'univers du jeu, achètent des boosters et gèrent leur panier.

**Site en ligne (Vercel) :** https://mythoria-gilt.vercel.app/
**Planification des tâches :** [GitHub Projects — Mythoria](https://github.com/users/rostomilyass/projects/5) · [Liste des issues](https://github.com/rostomilyass/Mythoria/issues)

---

## Sommaire
1. [Contexte](#contexte)
2. [État d'avancement (livrable du jour 4)](#état-davancement-livrable-du-jour-4)
3. [Technologies](#technologies)
4. [Structure du projet](#structure-du-projet)
5. [Règles du jeu définies dans le projet](#règles-du-jeu-définies-dans-le-projet)
6. [Planification et déroulé des 4 jours](#planification-et-déroulé-des-4-jours)
7. [Prochaines étapes](#prochaines-étapes)
8. [Auteur](#auteur)

---

## Contexte

Le studio souhaite lancer Mythoria, un jeu de cartes dans lequel les joueurs découvrent des créatures, des héros, des serviteurs et des sorts. La mission est de concevoir et développer le site web du jeu : boutique de boosters, ouverture des paquets, collection (grimoire) et création de deck.

## État d'avancement (livrable du jour 4)

| Page | Statut | Détail |
|---|---|---|
| **Home** (`index.html`) | Terminée | Hero, boosters, catégories de cartes, cartes légendaires, navigation |
| **Boutique** (`shop.html`) | Terminée | Liste des boosters, panier fonctionnel, total en temps réel |
| Opening Chamber (`opening.html`) | À venir | Ouverture animée des boosters |
| My Grimoire (`grimoire.html`) | À venir | Collection sous forme de livre |
| My Deck (`deck.html`) | À venir | Création du deck |

### Page d'accueil
- Section **Hero** immersive : nom du jeu, illustration, slogan
- Boutons « **Découvrir les boosters** » (vers la boutique) et « **Ouvrir mon grimoire** » (vers la collection)
- Présentation des **4 catégories de cartes** : Serviteurs de la Lumière, Serviteurs des Ténèbres, Minions, Spells
- Section des **4 boosters** disponibles
- Mise en avant de **cartes légendaires** (Aurelion, Nyxarion, Brasier des Mille Runes, Grimble le Fourbe)
- Navigation vers toutes les pages, avec compteur de panier dans l'en-tête

### Boutique (Booster Shop)
| Booster | Prix |
|---|---|
| Beginner Pack — Pack du débutant | 3,99 € |
| Summoning of the Legends — Invocation des légendes | 9,99 € |
| Dark Summoning — Invocation obscure | 6,99 € |
| Lucky Pack — Pack de la chance | 5,99 € |

Chaque booster affiche son illustration, son nom, sa description et son prix.

### Panier
- [x] Ajouter un booster au panier
- [x] Total du panier mis à jour en temps réel
- [x] Conservation du panier après actualisation (**LocalStorage**)
- [x] Bouton « Commander » (validation simulée, sans paiement réel)
- [x] Choix de la quantité, retrait d'un booster

## Technologies
- **HTML5** et **CSS3** (variables CSS, Flexbox, Grid)
- **JavaScript** (vanilla) : logique du panier
- **Illustrations SVG** originales (dossier `assets/`)
- **Git / GitHub** : versionnement et planification (Projects, Issues, Milestones)
- **Vercel** : hébergement

## Structure du projet

```
mythoria/
├── index.html          # Page d'accueil
├── shop.html           # Boutique + panier
├── css/
│   └── style.css
├── js/                 # Logique JavaScript (panier, etc.)
├── assets/             # Illustrations SVG (boosters, catégories, cartes)
├── PLANNING_ISSUES.md  # Liste des tâches du projet
└── README.md
```

> Adapte cet arbre aux fichiers réels de ton dépôt.

## Règles du jeu définies dans le projet

- Un booster contient **5 cartes**, tirées aléatoirement dans un catalogue défini en JavaScript.
- Les probabilités d'obtention dépendent du type de booster et sont définies dans les données du jeu.
- La **collection** peut contenir plusieurs exemplaires d'une même carte.
- Le **deck** contient **20 cartes maximum**, avec **1 seule copie** de chaque carte unique.
- Le panier, la collection et le deck sont conservés dans le **LocalStorage**.

## Planification et déroulé des 4 jours

La planification est gérée sur GitHub : **Projects** (tableau Kanban), **Issues** (une tâche = une issue) .

| Jour | Travail réalisé |
|---|---|
| Jour 1 | Lecture du brief, choix de la direction artistique (palette dark fantasy, polices), structure du projet, planification GitHub |
| Jour 2 | Maquette et page d'accueil (HTML/CSS), illustrations SVG |
| Jour 3 | Page Boutique : affichage des boosters, premières fonctions du panier |
| Jour 4 | Panier complet (total en temps réel, commande simulée), déploiement sur Vercel, README |

> Ajuste ce tableau à ce que tu as réellement fait chaque jour.

## Prochaines étapes

1. **Données** : catalogue de cartes et probabilités des boosters
2. **Opening Chamber** : tirage aléatoire pondéré et animation de révélation
3. **My Grimoire** : collection en forme de livre, filtres par type et rareté
4. **My Deck** : création du deck, limite de 20 cartes, statistiques
5. **Bonus** : effet holographique, compteur de cartes découvertes, historique, reçu imprimable

## Auteur

Projet réalisé par **Ilyass** dans le cadre de la formation.
