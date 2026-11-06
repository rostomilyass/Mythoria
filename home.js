// Page d'accueil : affiche les cartes légendaires du catalogue (CARTES dans cards.js).
// Comme la liste vient des données du jeu, on ne montre que des cartes que l'on peut vraiment obtenir.
(function () {
  const zone = document.getElementById('legendaires');
  if (!zone) return;

  const FOND = { lumiere: 'bg-yellow-900', tenebres: 'bg-purple-950', minion: 'bg-green-950', spell: 'bg-red-950' };

  zone.innerHTML = CARTES.filter((c) => c.rarete === 'legendaire').map((c) => {
    const illustration = c.image
      ? `<img src="${c.image}" alt="${c.nom}" class="w-full h-44 object-cover my-2 border-2 border-yellow-500">`
      : `<div class="w-full h-44 my-2 border-2 border-yellow-500 grid place-items-center text-7xl" aria-hidden="true">${c.icone}</div>`;
    const stats = c.effet
      ? `<p class="text-sm font-bold text-gold-hi">${c.effet}</p>`
      : `<div class="flex justify-between font-bold">
           <span class="bg-orange-600 rounded-full w-9 h-9 flex items-center justify-center" title="Attaque"><span class="sr-only">Attaque </span>${c.atk}</span>
           <span class="bg-red-700 rounded-full w-9 h-9 flex items-center justify-center" title="Points de vie"><span class="sr-only">Points de vie </span>${c.pv}</span>
         </div>`;
    return `<article class="w-64 flex flex-col ${FOND[c.type]} border-4 border-yellow-500 rounded-xl p-2 hover:scale-105 transition">
        <h3 class="bg-black rounded px-2 py-1 text-yellow-300 font-bold text-sm">${c.nom}</h3>
        ${illustration}
        <p class="text-xs italic text-yellow-400">${LABEL_TYPE[c.type]} · ${LABEL_RARETE[c.rarete]}</p>
        <p class="text-sm my-2 flex-1">${c.description}</p>
        ${stats}
      </article>`;
  }).join('');
})();
