import { flipCoin, opposite } from "./turns.js";

const SIDES = {
    light: '☀️ Lumière',
    dark: '🌑 Ténèbres',
};

const el ={
    coin: document.getElementById('coin'),
    flipBtn: document.getElementById('flip'),
    flipResult: document.getElementById('flip-result'),
    step2: document.getElementById('step-2'),
    step3: document.getElementById('step-3'),
    chooseLight: document.getElementById('choose-light'),
    chooseDark: document.getElementById('choose-dark'),
    playerSide: document.getElementById('player-side'),
    botSide: document.getElementById('bot-side'),   
    goArena: document.getElementById('go-arena'),
};

['firstPlayer', 'playerSide', 'botSide'].forEach(key=> localStorage.removeItem(key));


function unlock(section) {
    section.classList.remove('opacity-50');
}

el.flipBtn.addEventListener('click', () => {
    el.flipBtn.disabled = true;
    el.flipBtn.classList.add('opacity-40', 'pointer-events-none');
    el.flipResult.textContent = 'La pièce tourne…';
    el.coin.classList.add('animate-spin');

    setTimeout(() =>{
        el.coin.classList.remove('animate-spin');
        
        const first = flipCoin();
        localStorage.setItem('firstPlayer', first);

        if(first === 'player') {
            el.coin.textContent='👤'
            el.flipResult.textContent='Vous commencez ! Choisissez votre camp.';
            enableChoice();
        }else{
            el.coin.textContent='🤖'
            el.flipResult.textContent="L'adversaire commence et choisit son camp…";
            
            setTimeout(()=> {
                const botSide = Math.random() < 0.5 ? 'light' : 'dark';
                assignSides(opposite(botSide), botSide);
            }, 1200);
        }

    }, 1500);
});

function enableChoice(){
    unlock(el.step2)
    el.chooseLight.disabled = false;
    el.chooseDark.disabled = false;
}

el.chooseLight.addEventListener('click', () => assignSides('light', 'dark'));
el.chooseDark.addEventListener('click', () => assignSides('dark', 'light'));

function assignSides(playerSide, botSide) {
    localStorage.setItem('playerSide', playerSide);
    localStorage.setItem('botSide', botSide);

    el.chooseLight.disabled=true;
    el.chooseDark.disabled=true;

    el.playerSide.textContent=SIDES[playerSide];
    el.botSide.textContent=SIDES[botSide];

    unlock(el.step3);
    el.goArena.classList.remove('pointer-events-none', 'opacity-50');
    el.goArena.href = 'arena.html';
}
 

   
