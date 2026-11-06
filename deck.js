(function () {
const MAX = 20, COPIES = 1
const $ = (s) => document.querySelector(s);
const TYPES = { lumiere: ['Lumière', 'text-gold-hi', 'bg-gold-hi'], tenebres: ['Ténèbres', 'text-purple-400', 'bg-violet'],
                  minion: ['Minion', 'text-emerald-400', 'bg-emerald-500'], spell: ['Sort', 'text-sky-400', 'bg-sky-500'] };
const RAR = { commune: ['text-muted', '#8a8478'], rare: ['text-sky-400', '#4a90e2'],
                epique: ['text-purple-400', '#9b6bff'], legendaire: ['text-gold-hi', '#e8c76a'] };

const stock = lire('collection',{});
const cartes = CARTES.filter((c) => stock[c.id] > 0).map((c)=>({...c, n:stock[c.id]}));
const parId = Object.fromEntries(cartes.map((c) => [c.id, c]));
const limite = (c) => Math.min(COPIES, c.n);
const nb = (id) => deck.filter((x)=> x===id).length;
const complet = () => deck.length >= MAX;

let deck = lire('deck', []).filter((id, i, a) => parId[id] && a.slice(0, i + 1).filter((x) => x ===id).length <= limite(parId[id])).slice(0, MAX);

function dire(texte) {
    $('#message').textContent = texte;
    setTimeout(() => ($('#message').textContent=''), 3500);
}

function ajouter(id) {
    if (complet()) return dire('Deck complet : ' + MAX + ' cartes maximum.');
    if (nb(id)>= limite(parId[id])) return dire('Une seule copie de « ' + parId[id].nom + ' » est autorisée.');
    deck.push(id);
    maj();
}

function retirer (id) {
    const i = deck.lastIndexOf(id);
    if (i > -1) deck.splice(i, 1);
    maj();
}

const B = 'mt-auto min-h-10 w-full font-title font-bold text-[.75rem] uppercase tracking-widest rounded-xs transition ';
const bouton = (act, id, cls, txt) => `<button data-act="${act}" data-id="${id}" class="${B}${cls}">${txt}</button>`;

function tuile(c) {
    const [tl, tc] = TYPES[c.type], [rc, couleur] = RAR[c.rarete];
    const bt = !complet() && nb(c.id) < limite(c) ? bouton('add', c.id, 'bg-gold text-bg hover:bg-gold-hi', 'Ajouter')
      : nb(c.id) ? bouton('del', c.id, 'border border-gold text-gold hover:bg-gold hover:text-bg', 'Retirer')
      : `<button disabled class="${B}bg-line text-muted cursor-not-allowed">Deck complet</button>`;
    return `<li class="flex flex-col gap-2 p-3 bg-bg-alt rounded-xs border ${nb(c.id) ? 'border-gold' : 'border-line'}">
      <div class="relative h-28 bg-bg grid place-items-center rounded-xs border-2 text-6xl overflow-hidden" style="border-color:${couleur}">${c.image ? `<img src="${c.image}" alt="" class="h-full w-full object-cover">` : c.icone}
        ${c.n > 1 ? `<span class="absolute top-1 right-1 px-1.5 bg-bg/80 text-gold-hi text-sm font-title">×${c.n}</span>` : ''}</div>
      <p class="font-title font-bold text-gold-hi text-sm leading-tight">${c.nom}</p>
      <p class="text-sm"><span class="${tc}">${tl}</span> · <span class="${rc}">${LABEL_RARETE[c.rarete]}</span></p>
      <p class="text-sm text-muted">${c.effet || `⚔ ${c.atk} · ❤ ${c.pv}`}</p>${bt}</li>`;
}

function afficher () {
    const fT = $('#filtre-type').value, fR = $('#filtre-rarete').value;
    const vues = cartes.filter((c) => (!fT || c.type === fT) && (!fR || c.rarete === fR));
    $('#collection-vide').classList.toggle('hidden', cartes.length>0);
    $('#aucun-resultat').classList.toggle('hidden', !cartes.length || vues.length > 0);
    $('#collection').innerHTML = vues.map(tuile).join('');

    const sel = deck.map((id) => parId[id]), n = sel.length, pct = Math.round((n/MAX)*100);
    $('#compteur').textContent = n;
    $('#max').textContent = MAX;
    $('#barre').style.width = pct + '%';
    $('#barre-wrap').setAttribute('aria-valuenow', pct);
    $('#deck-vide').classList.toggle('hidden', n > 0);
    $('#vider').classList.toggle('hidden', n === 0);
    $('#deck-liste').innerHTML = sel.map((c) => `<li class="flex items-center gap-3 py-2">
        <span class="w-8 text-center text-2xl">${c.icone}</span>
        <span class="flex-1 leading-tight"><span class="block font-title text-sm text-gold-hi">${c.nom}</span>
            <span class="text-xs ${TYPES[c.type][1]}">${TYPES[c.type][0]}</span>
            <span class="text-xs ${RAR[c.rarete][0]}">· ${LABEL_RARETE[c.rarete]}</span></span>
        <button data-act="del" data-id="${c.id}" aria-label="Retirer ${c.nom}" class="text-muted hover:text-red-400 text-xl px-1">✕</button></li>`).join('');

    const crea = sel.filter((c) => c.atk !== undefined);
    const moy = (k) => (crea.length ? (crea.reduce((s, c) => s + c[k], 0) / crea.length).toFixed(1) : '—');
    const kpi = (l, v) => `<div class="bg-bg border border-line rounded-xs p-2 text-center">
      <p class="font-title font-bold text-gold-hi text-xl">${v}</p><p class="text-xs uppercase text-muted">${l}</p></div>`;
    
    const barres = Object.entries(TYPES).map(([k,[l, tc, bg]]) => {
        const x = sel.filter((c) => c.type === k).length;
        return `<div class="flex items-center gap-2 text-sm"><span class="w-20 ${tc}">${l}</span>
        <div class="flex-1 h-1.5 bg-line rounded-full overflow-hidden"><div class="h-full ${bg}" style="width:${n ? (x/n) * 100 : 0}%"></div></div>
        <span class ="w-5 text-right text-muted">${x}</span></div>`;
    }).join('');
    const rars = Object.entries(RAR).map(([k, [cls]]) => `<span class="${cls}">${LABEL_RARETE[k]} ${sel.filter((c)=>c.rarete === k).length}</span>`).join(' · ');
    $('#stats').innerHTML = `<div class="grid grid-cols-3 gap-2 mb-4">${kpi('ATK moy.', moy('atk'))}${kpi('PV moy.', moy('pv'))}${kpi('Sorts', n - crea.length)}</div>
    <div class="space-y-1.5 mb-3">${barres}</div><p class="text-sm">${rars}</p>
    <p class ="text-sm text-muted mt-1">Créatures : ${crea.length} · Places restantes : ${MAX - n}</p>`;
}
function maj() {ecrire('deck', deck); afficher();}

document.addEventListener('click', (e)=> {
    const b = e.target.closest('[data-act]');
    if (b) (b.dataset.act === 'add' ? ajouter : retirer)(b.dataset.id);
});
$('#filtre-type').onchange = $('#filtre-rarete').onchange = afficher;
$('#vider').onclick = () => {if (deck.length && confirm('Vider tout le deck ?')) {deck = []; maj(); } };

$('#regle').textContent = `Règle : ${MAX} cartes maximum, ${COPIES} seule copie de chaque carte unique dans le deck (ta collection peut en contenir plusieurs).`;
maj();
})();