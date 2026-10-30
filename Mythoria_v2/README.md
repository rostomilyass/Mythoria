# Mythoria v2 - Game

Dark fantasy card game. This part of the project covers the game flow: the menu, the pre-game setup and the arena.

## Pages

| Page | File | Description |
|------|------|-------------|
| Game menu | `index.html` | MYTHORIA logo and the two game modes. **Play vs Bot** goes to the setup. **Player 1 vs Player 2** shows an alert, because this mode is not made yet. |
| Setup | `setup.html` | Three steps before the fight: coin toss to decide who starts, the starter chooses Light or Darkness, the opponent automatically gets the opposite side. |
| Arena | `arena.html` | The game board: 6x6 grid, life points for both players, deck column, and a **Quitter** button that opens a confirmation modal. |

## Game flow

```
index.html  ->   setup.html  ->  arena.html
                   ^                              |
                   |______________ Quitter _______|
```

1. From the home page, the player opens the game menu (`index.html`).
2. **Play vs Bot** leads to `setup.html`.
3. In the setup:
   - **Step 1 - Coin toss:** a random draw decides who plays first.
   - **Step 2 - Choose a side:** the player who starts picks Light or Darkness.
   - **Step 3 - Opponent side:** the opponent receives the opposite side (Light gives Darkness, Darkness gives Light).
4. **Entrer dans l'arène** leads to `arena.html`.
5. In the arena, **Quitter** opens a modal. Confirming counts as a defeat and goes back to `game.html`.

## Tech stack

- HTML5
- [Tailwind CSS v4](https://tailwindcss.com) loaded from the CDN (`@tailwindcss/browser@4`), with a custom `@theme` (colors and fonts)
- Google Fonts: Cinzel, Cinzel Decorative, Crimson Pro
- Vanilla JavaScript (only used for the alert and the quit modal for now)
- Native `<dialog>` element for the quit modal

## Project structure

```
mythoria_v2/
├── index.html
├── setup.html
├── arena.html
└── README.md
```

## Run it locally

No build step needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/mythoria_v2.git
   ```
2. Open `index.html` in your browser (or use the VS Code **Live Server** extension).

An internet connection is needed to load Tailwind and the fonts from their CDNs.

## Design

| Color | Hex | Use |
|-------|-----|-----|
| `gold` | `#e0b857` | Titles, player side |
| `gold-hi` | `#ffd978` | Highlights, light side |
| `violet` | `#9b6bff` | Opponent side, darkness |
| `bg` / `panel` | `#1a1626` / `#241d38` | Backgrounds and cards |
| `text` / `muted` | `#f5f0e1` / `#c9bfa8` | Text |

## Status

- [x] Game menu with the two buttons
- [x] "Not available yet" alert for Player 1 vs Player 2
- [x] Setup page layout (3 steps)
- [x] Arena layout (board, life points, quit modal)
- [ ] Coin toss logic
- [ ] Side choice logic and saving the sides (`localStorage`: `playerSide` / `botSide`)
- [ ] Arena gameplay: turns, playing cards, bot
- [ ] Quit counts as a defeat
- [ ] Player 1 vs Player 2 mode
