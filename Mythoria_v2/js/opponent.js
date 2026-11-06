// Logique de l'adversaire (bot) : quelle carte jouer, puis attaquer ou défendre avec chaque créature.
import { state, START_HP, SLOTS } from "./state.js";
import { summon, attack, defend, attackDamage, targetsFor, strongest } from "./combat.js";

// Le bot joue sa créature la plus forte ; sinon un sort, seulement s'il lui est utile.
function pickCard(e, p) {
    const creatures = e.hand.filter((c) => c.kind === "creature").sort((x, y) => y.baseAtk - x.baseAtk);
    if (creatures.length && e.field.length < SLOTS) return creatures[0];
    const useful = e.hand.find((c) => {
        if (c.kind !== "spell") return false;
        const k = c.effect.kind;
        if (k === "heal") return e.hp < START_HP;
        if (k === "draw") return e.hp > c.effect.selfDamage && e.deck.length > 0;
        if (k === "wipe") return p.field.length > e.field.length;
        return true;
    });
    // Sans créature sur le terrain, le bot joue quand même un sort plutôt que de le garder
    // pour toujours (même Pacte Interdit s'il en meurt) : sinon la partie pourrait ne jamais finir.
    return useful || (!e.field.length ? e.hand.find((c) => c.kind === "spell") : undefined);
}

// Attaquer ou défendre ? Le bot attaque s'il peut tuer une cible (la plus dangereuse).
// Sinon, il se défend si une créature du joueur pourrait le tuer et que la défense le sauverait.
// Sinon, il attaque la cible la plus dangereuse.
function actWith(c, p) {
    const targets = targetsFor(p.field);
    if (!targets.length) return attack("enemy", c.id, null);

    const killable = targets.filter((t) => attackDamage(c, t) >= t.hp);
    if (killable.length) return attack("enemy", c.id, strongest(killable).id);

    const threatened = p.field.some((x) => x.atk >= c.hp);
    const saved = p.field.every((x) => Math.ceil(x.atk / 2) < c.hp);
    if (threatened && saved) return defend("enemy", c.id);

    return attack("enemy", c.id, strongest(targets).id);
}

export function playBotTurn() {
    const e = state.enemy, p = state.player;
    const card = pickCard(e, p);
    if (card) summon("enemy", card.id);
    for (const c of [...e.field]) {
        if (state.over) break;
        if (e.field.includes(c)) actWith(c, p);
    }
}
