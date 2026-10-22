const catalogue = document.querySelector('#catalogue');
const panier = document.querySelector('#panier');
const totalSpan = document.querySelector('#total');
const cartCount = document.querySelector('#cart-count');

function majPanier() {
  let total = 0;
  let nombre = 0;

  panier.querySelectorAll('li').forEach((li) => {
    total += parseFloat(li.dataset.prix) * parseInt(li.dataset.qte, 10);
    nombre += parseInt(li.dataset.qte, 10);
  });

  totalSpan.textContent = total.toFixed(2) + ' €';
  cartCount.textContent = nombre;
}

function ajouterProduit(titre, prix, qte) {
  const li = document.createElement('li');
  li.dataset.prix = prix;
  li.dataset.qte = qte;
  li.className = 'flex items-center gap-3 py-1';

  const texte = document.createElement('span');
  texte.textContent = `${titre} × ${qte} — ${(prix * qte).toFixed(2)} €`;

  const btn = document.createElement('button');
  btn.textContent = 'supprimer';
  btn.className = 'supprimer text-gold hover:text-gold-hi underline';

  li.append(texte, btn);
  panier.appendChild(li);
  majPanier();
}

catalogue.addEventListener('click', (e) => {
  if (!e.target.classList.contains('ajouter')) return;

  const li = e.target.closest('.produit');
  const titre = li.querySelector('.titre').textContent;
  const prix = parseFloat(
    li.querySelector('.prix').textContent.replace('€', '').replace(',', '.').trim()
  );

  const input = li.querySelector('.quantite');
  let qte = parseInt(input.value, 10);
  if (isNaN(qte) || qte < 1) qte = 1;

  ajouterProduit(titre, prix, qte);
  input.value = 1;
});

panier.addEventListener('click', (e) => {
  if (!e.target.classList.contains('supprimer')) return;
  e.target.closest('li').remove();
  majPanier();
});