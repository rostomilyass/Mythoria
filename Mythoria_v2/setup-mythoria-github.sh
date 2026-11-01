#!/usr/bin/env bash
set -e

REPO_NAME="mythoria_v2"
OWNER=$(gh api user --jq .login)

# ---------- 1. Git + repository ----------
if [ ! -d .git ]; then
  git init -b main
fi
[ -f README.md ] || cat > README.md <<'EOF'
# Mythoria v2

Dark fantasy collectible card game website: buy boosters, open them, fill your grimoire, build your deck and fight a bot in the arena.

## Pages
- `index.html` : home
- `shop.html` : booster shop + cart
- `opening.html` : opening chamber
- `grimoire.html` : card collection
- `deck.html` : deck builder
- `game.html` : game menu (vs bot / PvP)
- `setup.html` : coin toss + side choice
- `arena.html` : game board

## Stack
HTML, Tailwind CSS v4 (CDN), vanilla JavaScript, LocalStorage.
EOF

git add -A
git commit -m "Initial commit" || true
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

# ---------- 2. GitHub Pages ----------
gh api "repos/$OWNER/$REPO_NAME/pages" -X POST \
  -f "source[branch]=main" -f "source[path]=/" || echo "Pages: enable it manually in Settings > Pages"

# ---------- 3. Labels ----------
label() { gh label create "$1" --color "$2" --description "$3" --force; }
label "page"     "9b6bff" "A new page"
label "feature"  "e0b857" "A game or site feature"
label "design"   "ff79c6" "Visual / Tailwind work"
label "js"       "f1e05a" "JavaScript logic"
label "bug"      "d73a4a" "Something is broken"
label "bonus"    "0e8a16" "Optional bonus feature"

# ---------- 4. Milestones ----------
milestone() { gh api "repos/$OWNER/$REPO_NAME/milestones" -f title="$1" -f description="$2" >/dev/null; }
milestone "1 - Pages & design"       "Static pages with Tailwind, navigation between pages"
milestone "2 - Shop & cart"          "Booster shop, cart, simulated payment"
milestone "3 - Opening & collection" "Booster opening, grimoire, deck"
milestone "4 - Game vs bot"          "Coin toss, side choice, arena gameplay"
milestone "5 - Polish & deploy"      "Responsive, bonuses, GitHub Pages"

# ---------- 5. Project board ----------
PROJECT_NUMBER=$(gh project create --owner "@me" --title "Mythoria v2" --format json --jq .number)
echo "Project #$PROJECT_NUMBER created"

# ---------- 6. Issues ----------
issue() {
  url=$(gh issue create --title "$1" --milestone "$2" --label "$3" --body "$4")
  gh project item-add "$PROJECT_NUMBER" --owner "@me" --url "$url" >/dev/null
  echo "  + $1"
}

M1="1 - Pages & design"
M2="2 - Shop & cart"
M3="3 - Opening & collection"
M4="4 - Game vs bot"
M5="5 - Polish & deploy"

issue "Home page (index.html)"            "$M1" "page,design" "Home page in Tailwind: hero, card categories, legendary cards section, link to game.html."
issue "Game menu page (game.html)"        "$M1" "page,design" "Centered MYTHORIA logo, 'Play vs Bot' button to setup.html, 'Player 1 vs Player 2' button with 'not available yet' alert."
issue "Navigation between all pages"      "$M1" "feature"     "Header/links between index, shop, opening, grimoire, deck and game. Back links on every page."

issue "Booster shop page (shop.html)"     "$M2" "page,design" "4 boosters: Beginner Pack, Summoning of the Legends, Dark Summoning, Lucky Pack, with prices."
issue "Cart logic (packs.js)"             "$M2" "feature,js"  "Quantity, real-time total, remove / empty cart, persistence in LocalStorage."
issue "Simulated checkout"                "$M2" "feature,js"  "Order validation with simulated payment, boosters added to the player's inventory."

issue "Card catalogue and rarity data"    "$M3" "js"          "JS catalogue: id, name, image, description, type, rarity, attack, health (spells: effect). Drop probabilities per booster."
issue "Opening chamber (opening.html)"    "$M3" "page,js"     "Show owned boosters, 'Open booster' button, reveal animation, 5 random cards per booster, special message for rare / epic / legendary."
issue "Grimoire page (grimoire.html)"     "$M3" "page,js"     "Collection as an old book with navigable pages, filters by type and rarity, card detail on click, empty state, LocalStorage."
issue "Deck page (deck.html)"             "$M3" "page,js"     "Build a deck from the collection, saved in LocalStorage."

issue "Setup page layout (setup.html)"    "$M4" "page,design" "3 steps layout: coin toss, side choice, opponent side. Make sure the Tailwind script is loaded."
issue "Coin toss + side choice logic"     "$M4" "feature,js"  "Random draw decides who starts. Starter picks Light or Darkness, opponent gets the opposite side. Save in LocalStorage (playerSide / botSide)."
issue "Arena layout (arena.html)"         "$M4" "page,design" "6x6 board, life points, quit modal centered (native dialog), quit goes back to game.html."
issue "Arena gameplay vs bot"             "$M4" "feature,js"  "Read sides from LocalStorage, turn system, play cards on the board, simple bot AI, win / lose screen."
issue "Quit = defeat"                     "$M4" "feature,js"  "Confirming 'Quitter' during a game counts as a loss."

issue "Responsive pass on all pages"      "$M5" "design"      "Check mobile / tablet / desktop on every page."
issue "Card detail page"                  "$M5" "bonus,page"  "Bonus: detail page for one card."
issue "Holographic effect on hover"       "$M5" "bonus,design" "Bonus: holographic / rarity effects on cards."
issue "Opening history and discovery counter" "$M5" "bonus,js" "Bonus: history of openings and counter of discovered cards."
issue "Deploy on GitHub Pages"            "$M5" "feature"     "Check every link works with relative paths on the published site."

echo ""
echo "Done."
echo "Repo:    https://github.com/$OWNER/$REPO_NAME"
echo "Project: https://github.com/users/$OWNER/projects/$PROJECT_NUMBER"
echo "Site:    https://$OWNER.github.io/$REPO_NAME/  (live after a minute or two)"
