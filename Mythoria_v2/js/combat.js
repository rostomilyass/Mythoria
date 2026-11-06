// Logique de combat : invocation, attaques, défense, sorts, dégâts, PV et pénalités de faction.
import { state, addItem, START_HP, MAX_HAND, SLOTS, PENALTY } from "./state.js";

export const other = (who) => (who === "player" ? "enemy" : "player");
// Phrases du journal avec le bon accord : "Vous piochez…" / "L'adversaire pioche…".
export const says = (who, vous, adversaire) => (who === "player" ? `Vous ${vous}` : `L'adversaire ${adversaire}`);
// Une attaque du camp "who" touche l'autre joueur : "frappe l'adversaire" ou "vous frappe".
const strikes = (who) => (who === "player" ? "frappe l'adversaire" : "vous frappe");

// Empêche de jouer quand la partie est finie ou que ce n'est pas son tour.
export function guard(who) {
    if (state.over) return "Le combat est terminé.";
    if (state.current !== who) return "Ce n'est pas votre tour.";
    return null;
}

export function checkEnd() {
    if (state.player.hp > 0 && state.enemy.hp > 0) return;
    state.over = true;
    state.winner = state.player.hp <= 0 ? "enemy" : "player";
    addItem(state.winner === "player" ? "Victoire !" : "Défaite...");
}

// −20 % arrondi, mais toujours au moins 1 point de moins (sinon un 2 resterait à 2).
function penalized(value) {
    return Math.max(1, Math.min(value - 1, Math.round(value * PENALTY)));
}

// Une créature en défense subit moitié moins de dégâts (arrondi au supérieur).
export function attackDamage(attacker, target) {
    return target.defending ? Math.ceil(attacker.atk / 2) : attacker.atk;
}

// Les créatures en défense doivent être attaquées en premier.
export function targetsFor(field) {
    const defenders = field.filter((c) => c.defending);
    return defenders.length ? defenders : field;
}

// La créature la plus dangereuse (plus forte attaque), ou null.
export function strongest(field) {
    return field.reduce((best, c) => (!best || c.atk > best.atk ? c : best), null);
}

function destroy(side, card) {
    side.field = side.field.filter((c) => c !== card);
    addItem(`${card.name} quitte le champ de bataille 💀.`);
}

// Jouer une carte de la main : une créature est invoquée, un sort est lancé.
// Une seule carte jouée par tour.
export function summon(who, cardId) {
    const err = guard(who);
    if (err) return err;
    const s = state[who];
    const i = s.hand.findIndex((c) => c.id === cardId);
    if (i === -1) return "Cette carte n'est pas dans la main.";
    if (state.summoned) return "Une seule carte jouée par tour.";
    if (s.hand[i].kind === "spell") {
        const [spell] = s.hand.splice(i, 1);
        state.summoned = true;
        castSpell(who, spell);
        return null;
    }
    if (s.field.length >= SLOTS) return "Le champ de bataille est plein.";
    const [card] = s.hand.splice(i, 1);
    // Les minions sont neutres : seule une créature du camp opposé est affaiblie.
    // La pénalité touche la copie de combat, jamais la carte du grimoire.
    const foreign = card.camp !== "neutral" && card.camp !== s.camp;
    if (foreign) {
        card.atk = penalized(card.baseAtk);
        card.hp = penalized(card.baseHp);
    }
    s.field.push(card);
    state.summoned = true;
    addItem(says(who, `invoquez ${card.name}${foreign ? " (−20 %)" : ""}.`, `invoque ${card.name}${foreign ? " (−20 %)" : ""}.`));
    return null;
}

// targetId = null : attaque directe des PV adverses (seulement si le terrain adverse est vide).
export function attack(who, attackerId, targetId) {
    const err = guard(who);
    if (err) return err;
    const me = state[who], foe = state[other(who)];
    const a = me.field.find((c) => c.id === attackerId);
    if (!a) return "Créature introuvable.";
    if (a.exhausted) return "Cette créature a déjà agi ce tour.";

    if (targetId === null) {
        if (foe.field.length) return "Détruisez d'abord les créatures adverses.";
        foe.hp = Math.max(0, foe.hp - a.atk);
        addItem(`${a.name} ${strikes(who)} : −${a.atk} HP.`);
    } else {
        const t = foe.field.find((c) => c.id === targetId);
        if (!t) return "Cible invalide.";
        if (!targetsFor(foe.field).includes(t)) return "Attaquez d'abord les créatures en défense (🛡).";
        const dmg = attackDamage(a, t);
        t.hp -= dmg;
        addItem(`${a.name} attaque ${t.name}${t.defending ? " (🛡 en défense)" : ""} : −${dmg} HP.`);
        if (t.hp <= 0) destroy(foe, t);
    }
    a.exhausted = true;
    checkEnd();
    return null;
}

// Action défensive : la créature n'attaque pas ce tour. Jusqu'au prochain tour de son camp,
// elle subit moitié moins de dégâts et l'adversaire doit l'attaquer en premier.
export function defend(who, creatureId) {
    const err = guard(who);
    if (err) return err;
    const c = state[who].field.find((x) => x.id === creatureId);
    if (!c) return "Créature introuvable.";
    if (c.exhausted) return "Cette créature a déjà agi ce tour.";
    c.defending = true;
    c.exhausted = true;
    addItem(`${c.name} se met en défense 🛡.`);
    return null;
}

function castSpell(who, spell) {
    const me = state[who], foe = state[other(who)];
    const e = spell.effect;
    addItem(says(who, `lancez ${spell.name}.`, `lance ${spell.name}.`));

    if (e.kind === "damage") {
        // Vise la créature adverse la plus forte, sinon le joueur adverse.
        const t = strongest(foe.field);
        if (t) {
            t.hp -= e.amount;
            addItem(`${spell.name} touche ${t.name} : −${e.amount} HP.`);
            if (t.hp <= 0) destroy(foe, t);
        } else {
            foe.hp = Math.max(0, foe.hp - e.amount);
            addItem(`${spell.name} ${strikes(who)} : −${e.amount} HP.`);
        }
    } else if (e.kind === "heal") {
        const healed = Math.min(START_HP, me.hp + e.amount) - me.hp;
        me.hp += healed;
        addItem(says(who, `récupérez ${healed} HP.`, `récupère ${healed} HP.`));
    } else if (e.kind === "draw") {
        let drawn = 0;
        while (drawn < e.cards && me.hand.length < MAX_HAND && me.deck.length) {
            me.hand.push(me.deck.pop());
            drawn++;
        }
        me.hp = Math.max(0, me.hp - e.selfDamage);
        addItem(says(who, `piochez ${drawn} carte(s) et perdez ${e.selfDamage} HP.`, `pioche ${drawn} carte(s) et perd ${e.selfDamage} HP.`));
    } else if (e.kind === "wipe") {
        me.field = [];
        foe.field = [];
        state.selected = null;
        addItem("Toutes les créatures sont détruites.");
    }
    checkEnd();
}
