import { state, newGame } from "./state.js";
import { summon, attack, defend } from "./combat.js";
import { endTurn, beginGame } from "./turns.js";
import { renderGame, clearForm, setStatus, showBlocker } from "./ui.js";
import { loadCatalog, buildPlayerDeck, buildBotDeck } from "./cards.js";

// Il faut au moins une main complète pour commencer.
const MIN_DECK = 5;

const playerSide = localStorage.getItem("playerSide");
const botSide = localStorage.getItem("botSide");
const first = localStorage.getItem("firstPlayer");

if (!playerSide || !botSide || !first) {
    location.replace("setup.html");
} else {
    let catalog = null;
    try {
        catalog = await loadCatalog();
    } catch {
        showBlocker("Impossible de charger les cartes. Ouvre le jeu via un serveur local (ex. Live Server).");
    }
    if (catalog) {
        const playerDeck = buildPlayerDeck(catalog);
        if (playerDeck.length < MIN_DECK) {
            showBlocker(`Ton deck contient ${playerDeck.length} carte(s). Il en faut au moins ${MIN_DECK} pour combattre.`);
        } else {
            newGame(playerSide, botSide, playerDeck, buildBotDeck(catalog, playerDeck.length));
            beginGame(first);
            clearForm();
            renderGame();
        }
    }
}

document.addEventListener("click", (e)=> {
    const el = e.target.closest("[data-action]");
    if (!el || !state.player) return;
    const { action, id} = el.dataset;
    const needAttacker = "Sélectionnez d'abord une de vos créatures.";
    let err = null;

    if (action === "hand") err = summon("player", id);
    else if (action === "mine") {
        const c = state.player.field.find((x) => x.id === id);
        if(state.over || state.current !== "player") err="vous ne pouvez plus jouer.";
        else if(c.exhausted) err = "Cette créature a déjà agi ce tour.";
        else state.selected = state.selected === id ? null : id;
      } else if (action === "foe" || action === "foe-hero") {
        err = state.selected ? attack("player", state.selected, action === "foe" ? id : null) : needAttacker;
        if (!err) state.selected = null;
      } else if (action === "defend") {
        err = state.selected ? defend("player", state.selected) : needAttacker;
        if (!err) state.selected = null;
      } else if (action === "end") err = endTurn();
 
      setStatus(err);
      renderGame();
});  
    
