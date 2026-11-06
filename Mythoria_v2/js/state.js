import { generateId, formatDate } from "./utils.js";

const LOG_KEY ="mythoria-arena-log"
// Les cartes gardent leurs stats (ATK 1 à 11) : 20 HP donne des parties d'environ 5 à 6 tours.
export const START_HP = 20;
export const MAX_HAND = 5;
export const SLOTS = 10;
export const PENALTY = 0.8;

export const state = {
    player: null, enemy: null, turn: 1, current: "player",
    summoned: false, over: false, winner: null, selected: null, log:[],
};

// Les decks arrivent de cards.js (deck du joueur créé dans la partie 1, deck aléatoire pour le bot).
export function newGame(playerCamp, botCamp, playerDeck, botDeck) {
    const side = (camp, deck) => {
        const s = { camp, hp: START_HP, deck: [...deck], hand: [], field:[] };
        while (s.hand.length < MAX_HAND && s.deck.length) s.hand.push(s.deck.pop());
        return s;
    };
    state.player = side(playerCamp, playerDeck);
    state.enemy = side(botCamp, botDeck);
    Object.assign(state, { turn: 0, current: "player", summoned: false, over: false, winner: null, selected: null, log: [] });
  addItem("Le combat commence.");
}

export function addItem(text) {
  const item = { id: generateId(), text, time: formatDate() };
  state.log.push(item);
  saveItems(state.log);
  return item;
}
export function saveItems(items){
    try{ localStorage.setItem(LOG_KEY, JSON.stringify(items));} catch {/* stockage indisponible */ }
}
export function loadItems() {
    try { return JSON.parse(localStorage.getItem(LOG_KEY)) || [];} catch {return[];}
}
    
