const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let flipCount = 0;
const maxFlips = 3;




function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
   
    
  }

  secondCard = this;
  checkForMatch();

    // 更新翻牌次数
    flipCount++;
    const flipCountDisplay = document.getElementById('flip-count');
    flipCountDisplay.textContent = flipCount;
  
    checkIfGameLost();
}




function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function checkIfAllCardsFlipped() {
  let flippedCards = Array.from(cards).filter(card => card.classList.contains('flip'));
  if (flippedCards.length == 12) {
    // 所有卡片都已翻转成功
    // 播放音效
    const successSound = document.getElementById('success-sound');
    successSound.play();

      
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  // 播放音效
  const matchSound = document.getElementById('match-sound');
  matchSound.play();

  resetBoard();
  checkIfAllCardsFlipped();
}

function unflipCards() {
  lockBoard = true;

    // 播放音效
    const failSound = document.getElementById('fail-sound');
    failSound.play();

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
    checkIfAllCardsFlipped();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


