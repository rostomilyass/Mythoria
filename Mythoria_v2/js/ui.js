import {state, START_HP} from "./state.js";

const CAMP = { light : "☀️ Lumière", dark:"🌑 Ténèbres", neutral: "⚪ Neutre"};
const TINT = {light : "bg-gold/30", dark:"bg-violet/40", neutral: "bg-emerald-500/25"};

const arena = document.getElementById("arena");
const cells = [... arena.children].slice(0, 30);
const [enemyDeckEl, playerDeckEl] = arena.lastElementChild.children;
const panel = arena.nextElementSibling;
const [enemyHpEl, playerHpEl] =  panel.querySelectorAll("p.text-2xl");
const enemyBox = enemyHpEl.parentElement;
const playerBox = playerHpEl.parentElement;
const [enemyLabel, playerLabel] = [enemyBox.querySelector("p"), playerBox.querySelector("p")];
enemyBox.dataset.action = "foe-hero"
enemyBox.classList.add("cursor-pointer");
// La zone des PV adverses sert aussi de cible : on la rend utilisable au clavier.
enemyBox.setAttribute("role", "button");
enemyBox.setAttribute("tabindex", "0");
enemyBox.setAttribute("aria-label", "Attaquer directement l'adversaire (si son terrain est vide)");
enemyBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enemyBox.click();
    }
});

const ENEMY = [0,10];
const PLAYER = [15, 25];
const HAND = [25,30];

const controls = document.createElement("div");
controls.className="flex flex-col gap-3 w-64 flex-1 min-h-0";
controls.innerHTML = `
    <p id="turn" class="font-title text-gold-hi"></p>
    <p id="status" class="min-h-6 text-red-400" role="alert"></p>
    <button id="defend" data-action="defend" type="button" title="La créature sélectionnée n'attaque pas : jusqu'à votre prochain tour, elle subit moitié moins de dégâts et doit être attaquée en premier."
        class="rounded-lg border border-sky-400 bg-sky-500/20 px-6 py-2 font-title uppercase tracking-widest text-sky-200 transition hover:bg-sky-500/40 disabled:opacity-40 disabled:pointer-events-none">🛡 Défendre</button>
    <button id="end-turn" data-action="end" type="button"
        class="rounded-lg border border-gold bg-gold/20 px-6 py-3 font-title uppercase tracking-widest text-gold-hi transition hover:bg-gold/40 disabled:opacity-40 disabled:pointer-events-none">Fin du tour</button>
    <ul id="log" class="flex-1 max-h-60 xl:max-h-none overflow-y-auto p-3 bg-panel border border-line rounded-lg text-sm text-left space-y-1"></ul>`;
    panel.insertBefore(controls, panel.lastElementChild);

const result = document.createElement("div")
result.className = "hidden fixed inset-0 z-20 bg-bg/90 items-center justify-center flex-col gap-6";
result.innerHTML = `<p id="result-text" class="font-logo text-5xl text-gold-hi"></p>
    <a href="setup.html" class="rounded-lg border border-gold bg-gold/20 px-6 py-3 font-title uppercase tracking-widest text-gold-hi hover:bg-gold/40">Rejouer</a>
    <a href="index.html" class="text-sm text-muted hover:text-gold">← Menu</a>`;
document.body.appendChild(result);

const $ = (id) => document.getElementById(id);

export function renderList (items, container) {
    container.innerHTML = [...items].reverse()
    .map((i) => `<li><span class ="text-muted">${i.time}</span> ${i.text} </li>`).join("");
}

export function setStatus(message) {
    $("status").textContent = message || "";
}

export function clearForm() {
    state.selected = null;
    setStatus("");
}

// Affiche un message à la place du combat (deck trop petit, cartes introuvables...).
export function showBlocker(message) {
    result.innerHTML = `<p class="max-w-md px-6 text-center font-title text-xl text-gold-hi">${message}</p>
    <a href="../deck.html" class="rounded-lg border border-gold bg-gold/20 px-6 py-3 font-title uppercase tracking-widest text-gold-hi hover:bg-gold/40">Composer mon deck</a>
    <a href="index.html" class="text-sm text-muted hover:text-gold">← Menu</a>`;
    result.classList.remove("hidden");
    result.classList.add("flex");
}

// Effet court d'un sort, affiché sur la carte à la place de ⚔/❤.
function spellLabel(e) {
    if (e.kind === "damage") return `💥 ${e.amount} dégâts`;
    if (e.kind === "heal") return `❤ +${e.amount} PV`;
    if (e.kind === "draw") return `+${e.cards} cartes · −${e.selfDamage} PV`;
    if (e.kind === "wipe") return "☠ Tout détruit";
    return "✦ Sort";
}

function cardHTML(c, action) {
    const spell = c.kind === "spell";
    const weak = !spell && c.atk !== c.baseAtk;
    const ring = state.selected === c.id ? "ring-2 ring-gold-hi ring-inset" : c.defending ? "ring-2 ring-sky-400 ring-inset" : "";
    const tint = spell ? "bg-sky-500/25" : TINT[c.camp];
    const info = spell ? `Sort : ${c.text}` : `${CAMP[c.camp]} · ATK ${c.atk} · PV ${c.hp}${c.defending ? " · 🛡 En défense (dégâts ÷2)" : ""}`;
    const stats = spell ? spellLabel(c.effect) : `${c.defending ? "🛡" : "⚔"}${c.atk} ❤${c.hp}`;
    return `<button data-action="${action}" data-id="${c.id}" title="${info}" aria-label="${c.name}. ${info}"
    class="h-full w-full overflow-hidden rounded ${tint} ${ring} ${c.exhausted && !c.defending ? "opacity-50" : ""}
        p-1 flex flex-col items-center justify-between text-center cursor-pointer hover:brightness-125 transition">
        <span class="text-lg leading-none" aria-hidden="true">${c.icon}</span>
        <span class ="font-title text-[9px] leading-tight text-text">${c.name}</span>
        <span class="text-[10px] ${weak ? "text-red-400" : "text-text"}">${stats}</span></button>`;
}

function fill([from, to], cards, action) {
    for (let i =from; i< to; i++){
        const card = cards[i - from]
        cells[i].classList.add("min-h-0", "overflow-hidden");
        cells[i].innerHTML = card ? cardHTML(card, action) : "";
    }
}

export function renderGame() {
    if (!state.player) return;
    const { player: p, enemy: e } = state;
    const canHit = state.selected && !e.field.length && !state.over;

    fill(ENEMY, e.field, "foe");
    fill(PLAYER, p.field, "mine");
    fill(HAND, p.hand, "hand");

    enemyDeckEl.textContent = `Deck ${e.deck.length}`;
    playerDeckEl.textContent = `Deck ${p.deck.length}`;
    enemyHpEl.textContent = `❤ ${e.hp} / ${START_HP}`;
    playerHpEl.textContent = `❤ ${p.hp} / ${START_HP}`;
    enemyLabel.textContent = `L'adversaire · ${CAMP[e.camp]}`;
    playerLabel.textContent = `Vous · ${CAMP[p.camp]}`;
    enemyBox.classList.toggle("ring-2", !!canHit);
    enemyBox.classList.toggle("ring-gold-hi", !!canHit);

    $("turn").textContent = `Tour ${state.turn} · ${state.current === "player" ? "à vous" : "adversaire"} · ${CAMP[p.camp]}`;
    $("end-turn").disabled = state.over || state.current !== "player";
    $("defend").disabled = !state.selected || state.over || state.current !== "player";
    renderList(state.log, $("log"));

    result.classList.toggle("hidden", !state.over);
    result.classList.toggle("flex", state.over)
    $("result-text").textContent = state.winner === "player" ? "Victoire !" : "Défaite...";

}
    

