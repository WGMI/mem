const images = [
    { 
        primary: 'assets/4.png',  
        hints: ['assets/hints/double-syrum.png', 'assets/hints/rejuvenation.png']
    },
    { 
        primary: 'assets/5.png',  
        hints: ['assets/hints/edelweiss.png', 'assets/hints/protection.png']
    },
    { 
        primary: 'assets/6.png',  
        hints: ['assets/hints/hang-qi.png', 'assets/hints/regeneration.png']
    },
    { 
        primary: 'assets/1.png',  
        hints: ['assets/hints/leaf-of-life.png', 'assets/hints/hydration.png']
    },
    { 
        primary: 'assets/2.png',  
        hints: ['assets/hints/marys-thistle.png', 'assets/hints/nutrition.png']
    },
    { 
        primary: 'assets/3.png',  
        hints: ['assets/hints/teasel.png', 'assets/hints/oxygenation.png']
    }
];

// Variables for tracking game state
const gameBoard = document.getElementById('game-board');
const starImage = 'assets/star.png';
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

// Step 1: Create an array to hold the paired cards with specific hints
let pairedCards = [];
images.forEach(item => {
    // Create two card objects for each hint of the primary image
    pairedCards.push({ primary: item.primary, hint: item.hints[0] });
    pairedCards.push({ primary: item.primary, hint: item.hints[1] });
});

// Step 2: Shuffle the pairedCards array
const shuffledImages = pairedCards.sort(() => 0.5 - Math.random());

// Step 3: Create the game board based on shuffled pairs
function createGameBoard() {
    shuffledImages.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        // Front shows hint
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundImage = `url(${item.hint})`;

        // Back shows primary
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundImage = `url(${item.primary})`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameBoard.appendChild(card);

        card.addEventListener('click', flipCard);
    });
}


// Function to handle card flip
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');
    console.log('Flipped card:', this);

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}


// Check if two flipped cards are a match
function checkForMatch() {
    const isMatch = shuffledImages[firstCard.dataset.index].primary === shuffledImages[secondCard.dataset.index].primary;
    
    if (isMatch) {
        // Matched, leave flipped
        disableCards();
    } else {
        // Not a match, cover with star image
        lockBoard = true;
        setTimeout(() => {
            firstCard.querySelector('.card-back').style.backgroundImage = `url(${starImage})`;
            secondCard.querySelector('.card-back').style.backgroundImage = `url(${starImage})`;
            resetBoard();
        }, 1000);
    }
}

// Disable matched cards and increment matched pairs count
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;
    
    if (matchedPairs === images.length) {
        setTimeout(showResultScreen, 500); // Game complete
    }
    resetBoard();
}

// Reset variables for next turn
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Show result screen at the end of the game
function showResultScreen() {
    document.querySelector('.result-screen').classList.add('show-result');
}

// Initialize game board
createGameBoard();
