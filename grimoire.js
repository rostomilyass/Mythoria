const livre = document.getElementById('livre')
const pages = document.getElementById('pages')
const pageG = document.getElementById('page-gauche')
const pageD = document.getElementById('page-droite')
const videTotal = document.getElementById('vide-total')
const compteur = document.getElementById('compteur')
const indicateur = document.getElementById('indicateur')
const boutonPrec = document.getElementById('precedent')
const boutonSuiv = document.getElementById('suivant')
const selectType = document.getElementById('filtre-type')
const selectRarete = document.getElementById('filtre-rarete')
const dialogue = document.getElementById('detail')

const PAR_PAGE = 4;
let spread = 0;

const COULEURS = { commune: '#8a8478' , rare: '#4a90e2' , epique: '#9b6bff' , legendaire: '#e8c76a' };

function nombrePossedees() {
    const collection = lire('collection', {} );
    let n = 0;
    for (let i=0;i<CARTES.length; i++) {
        if (collection[CARTES[i].id] > 0) {
            n=n+1;
        }
    }
    return n;
}

function cartesFiltrees() {
    const collection = lire('collection', {})
    const liste = [];
    for(let i=0; i<CARTES.length; i++){
        const c = CARTES[i];
        if (!collection[c.id]) continue;
        if (selectType.value !== 'tous' && c.type !== selectType.value) continue;
        if (selectRarete.value !== 'toutes' && c.rarete !== selectRarete.value) continue;
        liste.push(c);
    }
    return liste;
}

function creerPage(liste, collection, numero) {
    let html = '<div class="grid-grid-cols-2 gap-3 flex-1">';
    
    for(let i=0;i<liste.length; i++){
        const c = liste[i];
        const qte = collection[c.id];

        let illustration = c.icone;
        if (c.image) {
            illustration = '<img src="' + c.image + '" alt="" class="h-full">';
        }
        let stats = 'Sort'
        if (!c.effet) {
            stats = 'ATK ' + c.atk + ' . PV' + c.pv;
        }
        let badge = '';
        if (qte > 1) {
            badge = '<span class="absolute top-1 right-1 bg-gold text-bg text-[.75rem] font-bold px-1.5 rounded-full">x' + qte +'</span>';
        }
        html += '<button data-id="' + c.id + '" class="tuile relative flex flex-col items-center justify-center gap-1 p-2 rounded-lg border-2 bg-panel text-text cursor-pointer transition hover:-translate-y-1 hover:shadow-lg" style="border-color:' + COULEURS[c.rarete] + '">' + badge +
            '<span class ="h-14 flex items-center text-4xl">' + illustration + '</span>' +
            '<strong class="text-gold-hi text-center text-[.9rem] leading-tight">'+ c.nom + '</strong>' +
            '<span class="text-[.75rem]" style="color:' + COULEURS[c.rarete] + '">' + LABEL_RARETE[c.rarete] + '</span>' +
            '<span class="text-[.75rem] text-muted">' + stats + '</span>' + 
            '</button>';
    }
    html += '</div><p class = "text-center text-[.85rem] mt-3">-' + numero + ' -</p>';
    return html;
}

function afficher() {
    const collection = lire('collection', {} );
    const possedees = nombrePossedees();

    compteur.textContent = possedees + '/' + CARTES.length + ' cartes découvertes';

    if (possedees === 0) {
        livre.hidden = true;
        videTotal.hidden = false;
        return;
    }
    livre.hidden = false;
    videTotal.hidden = true;

    const liste = cartesFiltrees();
    const parSpread = PAR_PAGE*2;
    let nbSpreads = Math.ceil(liste.length / parSpread);
    if (nbSpreads < 1) nbSpreads=1;
    if (spread > nbSpreads -1) spread = nbSpreads-1;

    const debut = spread * parSpread;
    const numG = spread * 2 +1;

    if (liste.length === 0) {
        pageG.innerHTML = '<p class="m-auto text-center italic text-xl">Aucune carte ne correspond à ces filteres.</p>';
        pageD.innerHTML = '';
    } else {
        pageG.innerHTML = creerPage(liste.slice(debut, debut + PAR_PAGE), collection, numG);
        pageD.innerHTML = creerPage(liste.slice(debut + PAR_PAGE, debut + parSpread), collection, numG + 1);
    }

    indicateur.textContent = 'Pages' + numG + '-' + (numG + 1) + '/' +(nbSpreads*2);
    boutonPrec.disabled = (spread === 0);
    boutonSuiv.disabled = (spread>= nbSpreads - 1);
}

function tourner () {
    pages.classList.remove('animate-tourne');
    void pages.offsetWidth;
    pages.classList.add('animate-tourne');
}

function ouvrirDetail(id) {
    let c = null;
    for (let i = 0; i < CARTES.length; i++) {
        if (CARTES[i].id === id) c= CARTES[i];
    }
    if (c === null) return;

    const qte = lire('collection' , {})[id];
    const couleur = COULEURS[c.rarete];

    let illustration = c.icone;
    if (c.image) {
        illustration = '<img src="' + c.image + '" alt="" class="h-full">';
    }

    let stats = '';
    if (c.effet) {
        stats = '<p class="text-center"><strong class="text-gold">Effet :</strong> ' + c.effet + '</p>';   
    } else {
        stats = '<div class="flex justify-around font-title font-bold text-xl">' + 
            '<span>⚔️ ATK ' + c.atk + '</span><span>❤️ PV ' + c.pv + '</span></div>';
    }

    dialogue.innerHTML = 
        '<div class="flex flex-col items-center gap-3 p-6 rounded-lg border-4 bg-panel" style="border-color:' + couleur + '">' +
        '<div class="h-32 flex items-center text-8xl">' + illustration + '</div>' +
        '<h2 class="font-title font-bold text-2xl text-gold-hi text-center">' + c.nom + '</h2>' +
        '<p class="font-title text-[.85rem] tracking-[.14em] uppercase">' + LABEL_TYPE[c.type] +
            ' · <span style="color:' + couleur + '">' + LABEL_RARETE[c.rarete] + '</span></p>' +
        '<p class="italic text-center text-muted">' + c.description + '</p>' +
        stats +
        '<p class="text-[.9rem] text-muted">Exemplaires possédés : ' + qte + ' ·N° ' + c.id +'</p>' +
        '<button class="fermer min-h-12 px-7 font-title font-bold text-[.9rem] tracking-widest rounded-xs bg-gold text-bg hover:bg-gold-hi">Fermer</button>' +
        '</div>';

        dialogue.showModal();
}    

pages.addEventListener('click', function(e) {
    const tuile = e.target.closest('.tuile')
    if(tuile) {
        ouvrirDetail(tuile.dataset.id)
    }
})

dialogue.addEventListener('click', function(e){
    if (e.target === dialogue || e.target.classList.contains('fermer')) {
        dialogue.close();
    }
});

boutonPrec.addEventListener('click', function () {
    spread = spread -1;
    afficher()
    tourner()
});

boutonSuiv.addEventListener('click', function () {
    spread = spread +1;
    afficher()
    tourner()
});

selectType.addEventListener('change', function() {
    spread = 0;
    afficher();
});

selectRarete.addEventListener('change', function(){
    spread = 0;
    afficher();
});

document.addEventListener('keydown', function(e) {
    if (dialogue.open || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowLeft' && !boutonPrec.disabled) boutonPrec.click();
    if (e.key === 'ArrowRight' && !boutonSuiv.disabled) boutonSuiv.click();
});

afficher();