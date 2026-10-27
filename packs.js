const catalogue = document.querySelector('#catalogue');
const panier = document.querySelector('#panier');
const totalSpan = document.querySelector('#total');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const commander = document.querySelector('#commander');


let cart = [];
try {
  cart = JSON.parse(localStorage.getItem('panier')) || [];
} catch {
  cart = [];
}

function sauvegarder() {
  localStorage.setItem('panier', JSON.stringify(cart));
}

function render() {
  const nombre = cart.reduce((s, p) => s + p.qte, 0);
  const total = cart.reduce((s, p) => s + p.prix * p.qte, 0);

  // Header (live total + count)
  cartCount.textContent = nombre;
  if (cartTotal) cartTotal.textContent = total + ' dh';

  // Cart section (shop page only)
  if (panier) {
    panier.innerHTML = '';

    if (cart.length === 0) {
      const vide = document.createElement('li');
      vide.className = 'py-3 text-muted italic text-center';
      vide.textContent = 'Votre panier est vide.';
      panier.appendChild(vide);
    }

    cart.forEach((p, i) => {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-3 py-2';

      const texte = document.createElement('span');
      texte.className = 'flex-1';
      texte.textContent = `${p.titre} × ${p.qte} — ${p.prix * p.qte} dh`;

      const btn = document.createElement('button');
      btn.textContent = 'supprimer';
      btn.dataset.index = i;
      btn.className = 'supprimer text-gold hover:text-gold-hi underline';

      li.append(texte, btn);
      panier.appendChild(li);
    });

    totalSpan.textContent = total + ' dh';
  }

  if (commander) commander.disabled = cart.length === 0;
  sauvegarder();
}

// Add to cart
if (catalogue) {
  catalogue.addEventListener('click', (e) => {
    if (!e.target.classList.contains('ajouter')) return;

    const li = e.target.closest('.produit');
    const id = li.dataset.id;                       // NEW: beginner / legends / dark / lucky
    const titre = li.querySelector('.titre').textContent;
    const prix = parseFloat(li.querySelector('.prix').textContent);
    const input = li.querySelector('.quantite');
    let qte = parseInt(input.value, 10);
    if (isNaN(qte) || qte < 1) qte = 1;

    const existant = cart.find((p) => p.id === id); // NEW: match on id instead of titre
    if (existant) existant.qte += qte;
    else cart.push({ id, titre, prix, qte });       // NEW: id stored

    input.value = 1;
    render();
  });
}

// Remove a line
if (panier) {
  panier.addEventListener('click', (e) => {
    if (!e.target.classList.contains('supprimer')) return;
    cart.splice(Number(e.target.dataset.index), 1);
    render();
  });
}


if (commander) {
  commander.addEventListener('click', () => {
    if (cart.length === 0) return;

    const total = cart.reduce((s, p) => s + p.prix * p.qte, 0);
    const commande = {
      numero: 'MYT-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleString('fr-FR'),
      articles: cart,
      total,
    };

    // Order history
    const historique = JSON.parse(localStorage.getItem('commandes')) || [];
    historique.push(commande);
    localStorage.setItem('commandes', JSON.stringify(historique));

    // NEW: purchased boosters go into the stock used by opening.html
    const stock = JSON.parse(localStorage.getItem('boosters')) || {};
    cart.forEach((p) => {
      if (p.id) stock[p.id] = (stock[p.id] || 0) + p.qte;
    });
    localStorage.setItem('boosters', JSON.stringify(stock));

    alert(`Commande ${commande.numero} validée !\nTotal : ${total} dh\n(Paiement simulé, aucun débit réel.)`);

    cart = [];
    render();
  });
}

render(); // shows the saved cart as soon as the page loads