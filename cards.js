// ===== DONNÉES DU JEU =====
const RARETES = ['commune', 'rare', 'epique', 'legendaire']; // du plus faible au plus fort
const LABEL_RARETE = { commune: 'Commune', rare: 'Rare', epique: 'Épique', legendaire: 'Légendaire' };
const LABEL_TYPE = {
  lumiere: 'Serviteur de la Lumière',
  tenebres: 'Serviteur des Ténèbres',
  minion: 'Minion',
  spell: 'Sort',
};

// Catalogue prédéfini. Remplace `icone` par `image: 'assets/cards/xxx.png'` quand tu auras les illustrations.
const CARTES = [
  { id: 'l1', nom: 'Garde de l’Aube', type: 'lumiere', rarete: 'commune', icone: '🛡️', atk: 3, def: 4 },
  { id: 'l2', nom: 'Archère Solaire', type: 'lumiere', rarete: 'commune', icone: '🏹', atk: 4, def: 2 },
  { id: 'l3', nom: 'Prêtresse de Clarté', type: 'lumiere', rarete: 'rare', icone: '🕊️', atk: 3, def: 5 },
  { id: 'l4', nom: 'Paladin Radieux', type: 'lumiere', rarete: 'epique', icone: '⚜️', atk: 7, def: 6 },
  { id: 'l5', nom: 'Archange Séraphiel', type: 'lumiere', rarete: 'legendaire', icone: '👼', atk: 10, def: 9 },

  { id: 't1', nom: 'Goule des Marais', type: 'tenebres', rarete: 'commune', icone: '🧟', atk: 3, def: 3 },
  { id: 't2', nom: 'Spectre Hurlant', type: 'tenebres', rarete: 'commune', icone: '👻', atk: 4, def: 2 },
  { id: 't3', nom: 'Chevalier Maudit', type: 'tenebres', rarete: 'rare', icone: '🗡️', atk: 6, def: 4 },
  { id: 't4', nom: 'Vampire des Cryptes', type: 'tenebres', rarete: 'rare', icone: '🦇', atk: 5, def: 4 },
  { id: 't5', nom: 'Liche Ensevelie', type: 'tenebres', rarete: 'epique', icone: '💀', atk: 8, def: 5 },
  { id: 't6', nom: 'Vorgath, Seigneur Démon', type: 'tenebres', rarete: 'legendaire', icone: '😈', atk: 11, def: 8 },

  { id: 'm1', nom: 'Gobelin Fouineur', type: 'minion', rarete: 'commune', icone: '👺', atk: 2, def: 1 },
  { id: 'm2', nom: 'Esprit Follet', type: 'minion', rarete: 'commune', icone: '✨', atk: 1, def: 2 },
  { id: 'm3', nom: 'Golem de Pierre', type: 'minion', rarete: 'rare', icone: '🗿', atk: 4, def: 6 },
  { id: 'm4', nom: 'Dragonnet Cendré', type: 'minion', rarete: 'epique', icone: '🐲', atk: 6, def: 4 },

  { id: 's1', nom: 'Étincelle', type: 'spell', rarete: 'commune', icone: '🔥', effet: 'Inflige 2 dégâts.' },
  { id: 's2', nom: 'Bénédiction', type: 'spell', rarete: 'commune', icone: '🙏', effet: 'Soigne 3 PV.' },
  { id: 's3', nom: 'Éclair Noir', type: 'spell', rarete: 'rare', icone: '⚡', effet: 'Inflige 5 dégâts.' },
  { id: 's4', nom: 'Pacte Interdit', type: 'spell', rarete: 'epique', icone: '📜', effet: 'Pioche 3 cartes, perds 4 PV.' },
  { id: 's5', nom: 'Cataclysme Astral', type: 'spell', rarete: 'legendaire', icone: '🌌', effet: 'Détruit toutes les créatures.' },
];

// Les probabilités sont des poids (somme = 100 ici) : c'est la fonction tirerCarte() qui les applique.
// `types` = types de cartes éligibles. `garantie` = rareté minimale de la dernière carte.
const BOOSTERS = {
  beginner: {
    nom: 'Pack du débutant', image: 'assets/booster-beginner (1).svg', nbCartes: 5,
    types: ['lumiere', 'tenebres', 'minion', 'spell'],
    probas: { commune: 70, rare: 22, epique: 7, legendaire: 1 },
    garantie: null,
  },
  legends: {
    nom: 'Invocation des légendes', image: 'assets/booster-legends (1).svg', nbCartes: 5,
    types: ['lumiere', 'tenebres', 'minion', 'spell'],
    probas: { commune: 40, rare: 35, epique: 18, legendaire: 7 },
    garantie: 'epique',
  },
  dark: {
    nom: 'Invocation obscure', image: 'assets/booster-dark (1).svg', nbCartes: 5,
    types: ['tenebres', 'minion', 'spell'],
    probas: { commune: 55, rare: 28, epique: 13, legendaire: 4 },
    garantie: 'rare',
  },
  lucky: {
    nom: 'Pack de la chance', image: 'assets/booster-lucky (1).svg', nbCartes: 5,
    types: ['lumiere', 'tenebres', 'minion', 'spell'],
    probas: { commune: 60, rare: 15, epique: 15, legendaire: 10 },
    garantie: null,
  },
};

// ===== FONCTIONS DE TIRAGE =====
function tirerRarete(probas) {
  const total = Object.values(probas).reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (const [rarete, poids] of Object.entries(probas)) {
    r -= poids;
    if (r < 0) return rarete;
  }
  return RARETES[0];
}

function tirerCarte(booster, rareteMin = null) {
  let rarete = tirerRarete(booster.probas);
  if (rareteMin && RARETES.indexOf(rarete) < RARETES.indexOf(rareteMin)) rarete = rareteMin;

  let pool = CARTES.filter((c) => c.rarete === rarete && booster.types.includes(c.type));
  // Si aucune carte éligible à cette rareté, on descend d'un cran
  while (pool.length === 0 && RARETES.indexOf(rarete) > 0) {
    rarete = RARETES[RARETES.indexOf(rarete) - 1];
    pool = CARTES.filter((c) => c.rarete === rarete && booster.types.includes(c.type));
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function ouvrirBooster(id) {
  const booster = BOOSTERS[id];
  const cartes = [];
  for (let i = 0; i < booster.nbCartes; i++) {
    const dernier = i === booster.nbCartes - 1;
    cartes.push(tirerCarte(booster, dernier ? booster.garantie : null));
  }
  return cartes;
}

// ===== LOCALSTORAGE =====
function lire(cle, defaut) {
  try { return JSON.parse(localStorage.getItem(cle)) || defaut; } catch { return defaut; }
}
function ecrire(cle, valeur) {
  localStorage.setItem(cle, JSON.stringify(valeur));
}