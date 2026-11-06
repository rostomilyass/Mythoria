// ===== DONNÉES DU JEU =====
const RARETES = ['commune', 'rare', 'epique', 'legendaire']; // du plus faible au plus fort
const LABEL_RARETE = { commune: 'Commune', rare: 'Rare', epique: 'Épique', legendaire: 'Légendaire' };
const LABEL_TYPE = {
  lumiere: 'Serviteur de la Lumière',
  tenebres: 'Serviteur des Ténèbres',
  minion: 'Minion',
  spell: 'Sort',
};


const CARTES = [

  { id: 'l1', nom: 'Garde de l’Aube', type: 'lumiere', rarete: 'commune', icone: '🛡️', atk: 3, pv: 4, image: 'assets/art-aurelion.svg', description: 'Premier rempart des cités solaires, il veille sur les portes jusqu’au lever du jour.' },
  { id: 'l2', nom: 'Archère Solaire', type: 'lumiere', rarete: 'commune', icone: '🏹', atk: 4, pv: 2, description: 'Ses flèches, trempées dans la lumière de l’aube, ne manquent jamais une ombre.' },
  { id: 'l3', nom: 'Prêtresse de Clarté', type: 'lumiere', rarete: 'rare', icone: '🕊️', atk: 3, pv: 5, description: 'Ses prières apaisent les blessés et font reculer les ténèbres.' },
  { id: 'l4', nom: 'Paladin Radieux', type: 'lumiere', rarete: 'epique', icone: '⚜️', atk: 7, pv: 6, description: 'Chevalier béni dont l’armure brille comme un second soleil sur le champ de bataille.' },
  { id: 'l5', nom: 'Archange Séraphiel', type: 'lumiere', rarete: 'legendaire', icone: '👼', atk: 10, pv: 9, image: 'assets/card-seraphine.svg', description: 'Gardien céleste aux six ailes, descendu pour juger les armées de l’ombre.' },

  { id: 't1', nom: 'Goule des Marais', type: 'tenebres', rarete: 'commune', icone: '🧟', atk: 3, pv: 3, description: 'Elle rôde dans la brume des tourbières, affamée de chair et de souvenirs.' },
  { id: 't2', nom: 'Spectre Hurlant', type: 'tenebres', rarete: 'commune', icone: '👻', atk: 4, pv: 2, description: 'Son cri glace le sang des vivants et réveille les morts alentour.' },
  { id: 't3', nom: 'Chevalier Maudit', type: 'tenebres', rarete: 'rare', icone: '🗡️', atk: 6, pv: 4, description: 'Un héros déchu, condamné à servir l’ombre qu’il combattait autrefois.' },
  { id: 't4', nom: 'Vampire des Cryptes', type: 'tenebres', rarete: 'rare', icone: '🦇', atk: 5, pv: 4, description: 'Seigneur des tombeaux oubliés, il se nourrit de la vigueur de ses ennemis.' },
  { id: 't5', nom: 'Liche Ensevelie', type: 'tenebres', rarete: 'epique', icone: '💀', atk: 8, pv: 5, image: 'assets/art-nyxarion.svg', description: 'Un sorcier qui a vaincu la mort, au prix d’une âme enfermée dans un phylactère.' },
  { id: 't6', nom: 'Vorgath, Seigneur Démon', type: 'tenebres', rarete: 'legendaire', icone: '😈', atk: 11, pv: 8, image: 'assets/card-morvath.svg', description: 'Maître des abîmes, sa simple présence fait trembler les deux royaumes.' },

  { id: 'm1', nom: 'Gobelin Fouineur', type: 'minion', rarete: 'commune', icone: '👺', atk: 2, pv: 1, image: 'assets/art-grimble.svg', description: 'Petit, rapide et toujours à l’affût d’un objet brillant à chaparder.' },
  { id: 'm2', nom: 'Esprit Follet', type: 'minion', rarete: 'commune', icone: '✨', atk: 1, pv: 2, description: 'Une lueur espiègle qui guide les voyageurs… ou les égare.' },
  { id: 'm3', nom: 'Golem de Pierre', type: 'minion', rarete: 'rare', icone: '🗿', atk: 4, pv: 6, description: 'Façonné dans la roche des montagnes, il ne connaît ni la peur ni la fatigue.' },
  { id: 'm4', nom: 'Dragonnet Cendré', type: 'minion', rarete: 'epique', icone: '🐲', atk: 6, pv: 4, description: 'Encore jeune, mais son souffle de braises suffit à embraser une armée.' },

  { id: 's1', nom: 'Étincelle', type: 'spell', rarete: 'commune', icone: '🔥', effet: 'Inflige 2 dégâts.', image: 'assets/art-brasier.svg', description: 'Une flamme minuscule, lancée d’un simple claquement de doigts.' },
  { id: 's2', nom: 'Bénédiction', type: 'spell', rarete: 'commune', icone: '🙏', effet: 'Soigne 3 PV.', description: 'Une prière douce qui referme les plaies des fidèles.' },
  { id: 's3', nom: 'Éclair Noir', type: 'spell', rarete: 'rare', icone: '⚡', effet: 'Inflige 5 dégâts.', description: 'La foudre des Ténèbres, qui frappe sans prévenir ni pardonner.' },
  { id: 's4', nom: 'Pacte Interdit', type: 'spell', rarete: 'epique', icone: '📜', effet: 'Pioche 3 cartes, perds 4 PV.', description: 'Un savoir défendu offert par les démons, payé de son propre sang.' },
  { id: 's5', nom: 'Cataclysme Astral', type: 'spell', rarete: 'legendaire', icone: '🌌', effet: 'Détruit toutes les créatures.', image: 'assets/card-eclipse.svg', description: 'Les étoiles s’effondrent et ne laissent derrière elles qu’un champ de cendres.' },
];


const BOOSTERS = {
  beginner: {
    nom: 'Pack du débutant', image: 'assets/booster-beginner-pack.svg', nbCartes: 5,
    types: ['lumiere', 'tenebres', 'minion', 'spell'],
    probas: { commune: 70, rare: 22, epique: 7, legendaire: 1 },
    garantie: null,
  },
  legends: {
    nom: 'Invocation des légendes', image: 'assets/booster-legends-pack.svg', nbCartes: 5,
    types: ['lumiere', 'tenebres', 'minion', 'spell'],
    probas: { commune: 40, rare: 35, epique: 18, legendaire: 7 },
    garantie: 'epique',
  },
  dark: {
    nom: 'Invocation obscure', image: 'assets/booster-dark-pack.svg', nbCartes: 5,
    types: ['tenebres', 'minion', 'spell'],
    probas: { commune: 55, rare: 28, epique: 13, legendaire: 4 },
    garantie: 'rare',
  },
  lucky: {
    nom: 'Pack de la chance', image: 'assets/booster-lucky-pack.svg', nbCartes: 5,
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