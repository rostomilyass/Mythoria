// Gestion des cartes : catalogue, deck du joueur (créé dans la partie 1) et deck du bot.
import { generateId, shuffle } from "./utils.js";

// Clé LocalStorage du deck enregistré par deck.html (liste d'identifiants de cartes).
const DECK_KEY = "deck";

// Camp de chaque type de carte. Les minions et les sorts sont neutres : pas de pénalité.
const CAMP_BY_TYPE = { lumiere: "light", tenebres: "dark", minion: "neutral", spell: "neutral" };

export async function loadCatalog() {
    const res = await fetch("data/cards.json");
    if (!res.ok) throw new Error("Impossible de charger data/cards.json");
    return res.json();
}

// Transforme une carte du grimoire en carte de combat (copie : le grimoire n'est jamais modifié).
export function toBattleCard(card) {
    const base = { id: generateId(), cardId: card.id, name: card.nom, icon: card.icone, camp: CAMP_BY_TYPE[card.type], exhausted: false };
    if (card.type === "spell") {
        const e = card.effect;
        return { ...base, kind: "spell", text: card.effet,
            effect: { ...e, amount: e.amount || 0, selfDamage: e.selfDamage || 0 } };
    }
    // Les stats du combat sont exactement celles de la carte.
    return { ...base, kind: "creature", baseAtk: card.atk, baseHp: card.pv, atk: card.atk, hp: card.pv };
}

// Le deck du joueur : les cartes choisies sur deck.html.
export function buildPlayerDeck(catalog) {
    let ids = [];
    try { ids = JSON.parse(localStorage.getItem(DECK_KEY)) || []; } catch { ids = []; }
    const byId = new Map(catalog.map((c) => [c.id, c]));
    return shuffle(ids.filter((id) => byId.has(id)).map((id) => toBattleCard(byId.get(id))));
}

// Le bot n'a pas de collection : il reçoit des cartes au hasard du catalogue,
// autant que le joueur, une seule copie de chaque (même règle que deck.html).
export function buildBotDeck(catalog, size) {
    return shuffle(catalog).slice(0, size).map(toBattleCard);
}
