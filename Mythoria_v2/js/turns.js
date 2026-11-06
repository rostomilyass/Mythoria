// Gestion des tours et du lancer de pièce.
import { state, addItem, MAX_HAND } from "./state.js";
import { guard, checkEnd, says } from "./combat.js";
import { playBotTurn } from "./opponent.js";

// Lancer de pièce : qui joue en premier ?
export function flipCoin() {
    return Math.random() < 0.5 ? "player" : "bot";
}

// Le camp adverse est toujours l'opposé.
export function opposite(side) {
    return side === "light" ? "dark" : "light";
}

// Début de tour : les créatures se réveillent (et quittent la défense), puis on pioche.
export function startTurn(who) {
    const s = state[who];
    state.turn++;
    s.field.forEach((c) => {
        c.exhausted = false;
        c.defending = false;
    });
    state.summoned = false;
    if (s.hand.length < MAX_HAND && s.deck.length) {
        s.hand.push(s.deck.pop());
        addItem(says(who, "piochez une carte.", "pioche une carte."));
    }
    // Plus de deck, de main ni de créatures : ce joueur ne peut plus combattre et perd.
    if (!s.deck.length && !s.hand.length && !s.field.length) {
        s.hp = 0;
        addItem(says(who, "n'avez plus aucune carte.", "n'a plus aucune carte."));
        checkEnd();
    }
}

// Tour complet du bot, puis la main revient au joueur.
function botRound() {
    state.current = "enemy";
    startTurn("enemy");
    if (!state.over) playBotTurn();
    if (!state.over) {
        state.current = "player";
        startTurn("player");
    }
}

export function beginGame(first) {
    if (first === "bot") botRound();
    else startTurn("player");
}

export function endTurn() {
    const err = guard("player");
    if (err) return err;
    state.selected = null;
    botRound();
    return null;
}
