const images = [
    { 
        primary: 'assets/4.png',  
        hints: ['assets/hints/double-syrum.jpeg', 'assets/hints/boosts.jpeg']
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

// Set the initial timer values in seconds (22 minutes and 5 seconds)
let totalTime = 22005;
let matchesFound = 0;

let isFirstFlip = true; // Track if this is the first flip to start the timer

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

    // Show all cards for a half second initially
    setTimeout(() => {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flip'));

        // Flip all cards back after a half second
        setTimeout(() => {
            allCards.forEach(card => card.classList.remove('flip'));
        }, 1500);
    }, 100);
}

// Function to handle card flip
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');
    console.log('Flipped card:', this);

    if (isFirstFlip) {
        startTimer(); // Start the timer on the first card flip
        isFirstFlip = false; // Ensure timer only starts once
    }

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
    matchesFound++; // Increment the number of matches found

    if (matchedPairs === images.length) {
        setTimeout(showResultScreen, 500); // Game complete when all pairs are matched
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
    window.location.href = `result.html?score=${matchesFound}`;
}

// Initialize game board
createGameBoard();

// Function to start the countdown timer
function startTimer() {
    const timerElement = document.querySelector('.timer');

    const countdown = setInterval(() => {
        const seconds = Math.floor(totalTime / 1000);
        const milliseconds = totalTime % 1000;

        // Format and display the timer
        timerElement.textContent = `${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;

        // Check if time has run out
        if (totalTime <= 0) {
            clearInterval(countdown);
            endGame(); // Call the function to handle game end
        } else {
            totalTime -= 5; // Decrement the timer by 5 milliseconds
        }
    }, 5);
}

// Function to handle the end of the game due to timer running out
function endGame() {
    window.location.href = `result.html?score=${matchesFound}`; // Navigate to result page with the score
}