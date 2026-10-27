// ===== Les éléments de la page =====
var stockUl = document.getElementById('stock');
var scene = document.getElementById('scene');
var annonce = document.getElementById('annonce');
var boutonTout = document.getElementById('tout-reveler');

var cartesRestantes = 0; // nombre de cartes pas encore retournées

// classes Tailwind selon la rareté
var bordures = {
  commune: 'border-[#8a8478]',
  rare: 'border-[#4a90e2]',
  epique: 'border-[#9b6bff]',
  legendaire: 'border-[#e8c76a]'
};
var lueurs = {
  commune: '',
  rare: 'shadow-[0_0_20px_#4a90e2]',
  epique: 'shadow-[0_0_20px_#9b6bff]',
  legendaire: 'shadow-[0_0_30px_#e8c76a]'
};

// ===== 1. Afficher les boosters du joueur =====
function afficherStock() {
  var stock = lire('boosters', {});
  var total = 0;
  stockUl.innerHTML = '';

  for (var id in BOOSTERS) {
    var quantite = stock[id] || 0;
    if (quantite > 0) {
      total = total + quantite;
      stockUl.innerHTML += '<li class="flex items-center gap-4 border border-line bg-bg-alt p-3">' +
        '<img src="' + BOOSTERS[id].image + '" alt="" class="h-20 w-auto">' +
        '<div class="flex-1"><p class="text-gold-hi font-bold">' + BOOSTERS[id].nom + '</p>' +
        '<p class="text-muted">' + quantite + ' disponible(s)</p></div>' +
        '<button data-id="' + id + '" class="ouvrir min-h-12 px-5 font-title font-bold bg-gold text-bg hover:bg-gold-hi">Ouvrir le booster</button>' +
        '</li>';
    }
  }

  if (total === 0) {
    stockUl.innerHTML = '<li class="text-muted italic">Aucun booster. <a href="shop.html" class="text-gold underline">Va à la boutique</a> pour en acheter.</li>';
  }
}

// ===== 2. Ouvrir un booster =====
function ouvrir(id) {
  if (cartesRestantes > 0) {
    alert('Retourne d\'abord toutes les cartes !');
    return;
  }

  var stock = lire('boosters', {});
  if (!stock[id] || stock[id] < 1) {
    return;
  }

  // on enlève un booster du stock
  stock[id] = stock[id] - 1;
  ecrire('boosters', stock);

  // tirage aléatoire (la fonction est dans cards.js)
  var cartes = ouvrirBooster(id);

  // on ajoute les cartes à la collection tout de suite
  var collection = lire('collection', {});
  for (var i = 0; i < cartes.length; i++) {
    var idCarte = cartes[i].id;
    if (collection[idCarte]) {
      collection[idCarte] = collection[idCarte] + 1;
    } else {
      collection[idCarte] = 1;
    }
  }
  ecrire('collection', collection);

  afficherStock();

  // animation : le booster tremble, puis les cartes arrivent
  annonce.textContent = '';
  boutonTout.hidden = true;
  scene.innerHTML = '<img src="' + BOOSTERS[id].image + '" alt="" class="animate-secoue motion-reduce:animate-none h-64 w-auto">';

  setTimeout(function () {
    afficherCartes(cartes);
  }, 1000);
}

// ===== 3. Afficher les cartes face cachée =====
function afficherCartes(cartes) {
  var html = '';

  for (var i = 0; i < cartes.length; i++) {
    var c = cartes[i];

    var illustration = c.icone;
    if (c.image) {
      illustration = '<img src="' + c.image + '" alt="" class="h-full">';
    }

    var stats = '';
    if (c.effet) {
      stats = c.effet;
    } else {
      stats = 'ATK ' + c.atk + ' / DEF ' + c.def;
    }

    html += '<div class="carte w-44 h-64 perspective-[900px] cursor-pointer animate-apparition motion-reduce:animate-none" data-index="' + i + '" style="animation-delay:' + (i * 0.15) + 's">' +
      '<div class="inner relative w-full h-full transition-transform duration-700 transform-3d motion-reduce:transition-none">' +
        '<div class="absolute inset-0 backface-hidden flex items-center justify-center rounded-lg border-2 border-gold bg-panel text-5xl text-gold">✦</div>' +
        '<div class="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center gap-1 p-2 rounded-lg border-2 bg-panel ' + bordures[c.rarete] + ' ' + lueurs[c.rarete] + '">' +
          '<div class="h-24 flex items-center text-5xl">' + illustration + '</div>' +
          '<strong class="text-gold-hi text-center leading-tight">' + c.nom + '</strong>' +
          '<span class="text-[.8rem] text-muted">' + LABEL_TYPE[c.type] + '</span>' +
          '<span class="text-[.8rem] text-muted">' + LABEL_RARETE[c.rarete] + '</span>' +
          '<span>' + stats + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  scene.innerHTML = html;
  cartesRestantes = cartes.length;
  boutonTout.hidden = false;

  // chaque carte réagit au clic
  var divs = scene.querySelectorAll('.carte');
  for (var j = 0; j < divs.length; j++) {
    divs[j].onclick = function () {
      retourner(this, cartes[this.dataset.index]);
    };
  }
}

// ===== 4. Retourner une carte =====
function retourner(div, carte) {
  if (div.classList.contains('revelee')) {
    return; // déjà retournée
  }

  div.classList.add('revelee');
  div.querySelector('.inner').classList.add('rotate-y-180'); // la carte se retourne
  cartesRestantes = cartesRestantes - 1;

  // message spécial pour les cartes rares
  if (carte.rarete === 'rare') {
    annonce.style.color = '#4a90e2';
    annonce.textContent = 'Carte rare découverte : ' + carte.nom;
  } else if (carte.rarete === 'epique') {
    annonce.style.color = '#9b6bff';
    annonce.textContent = 'Carte épique ! ' + carte.nom;
  } else if (carte.rarete === 'legendaire') {
    annonce.style.color = '#e8c76a';
    annonce.textContent = 'LÉGENDAIRE ! ' + carte.nom;
  }

  if (cartesRestantes === 0) {
    boutonTout.hidden = true;
  }
}

// ===== 5. Les boutons =====
stockUl.addEventListener('click', function (e) {
  if (e.target.classList.contains('ouvrir')) {
    ouvrir(e.target.dataset.id);
  }
});

boutonTout.addEventListener('click', function () {
  var divs = scene.querySelectorAll('.carte');
  divs.forEach(function (div, i) {
    setTimeout(function () {
      div.click();
    }, i * 300);
  });
});

afficherStock();