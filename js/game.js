const images = [
    'assets/1.png', 'assets/2.png', 'assets/3.png', 'assets/4.png', 'assets/5.png', 'assets/6.png',
    'assets/1.png', 'assets/2.png', 'assets/3.png', 'assets/4.png', 'assets/5.png', 'assets/6.png'
];

let firstCard, secondCard;
let lockBoard = false;
let hasFlippedCard = false;
let matchesFound = 0;
let timerStarted = false;
let timeRemaining = 22.05; // 22.05 seconds for the game
let timerInterval;

// Shuffle the images and generate the game board when the page loads
window.onload = () => {
    shuffleImages();
    generateBoard();
};

function shuffleImages() {
    images.sort(() => Math.random() - 0.5);
}

function generateBoard() {
    const board = document.querySelector('.game-board');
    board.innerHTML = ''; // Clear any existing content

    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back" style="background-image: url('${image}')"></div>
        </div>
      `;

        card.addEventListener('click', flipCard);
        board.appendChild(card);

        // Flip all cards initially to show images
        setTimeout(() => {
            card.classList.add('flip');
        }, 0); // Immediately flip cards
    });

    // Hide all cards after 2 seconds
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('flip');
        });
    }, 2000); // 2000 ms = 2 seconds
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; // Prevent double click on the same card

    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First card flipped
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        disableCards();
        matchesFound += 2; // Two cards matched
        if (matchesFound === images.length) {
            clearInterval(timerInterval);
            showResultScreen('You win! All matches found.');
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 750);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function startTimer() {
    const timerElement = document.querySelector('.timer');
    timerInterval = setInterval(() => {
        timeRemaining -= 0.01; // Decrease time by 0.01 seconds (10 ms)
        timerElement.textContent = timeRemaining.toFixed(2); // Update timer display

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showResultScreen(`You got ${matchesFound / 2}! Time ran out.`);
        } 
    }, 10); // Update the timer every 10 ms (0.01 seconds)
}


function resetGame() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    matchesFound = 0;
    timerStarted = false;
    timeRemaining = 22.05;
    document.querySelector('.timer').textContent = '22.05';
    shuffleImages();
}

function showResultScreen(message) {
    console.log(matchesFound);
    window.location.href = ('result.html?score=' + (matchesFound / 2));
    return
    if((matchesFound / 2) >= 3){
        console.log('prize');
        document.getElementById('prize').style.display = 'inline';
    }else{
        console.log('try again');
    }
    // Display the result message and score
    const resultScreen = document.querySelector('.result-screen');
    const resultScore = document.querySelector('.result-score');
    resultScore.textContent = message;

    // Fade in the result screen by adding the show-result class
    resultScreen.classList.add('show-result');
}

function restartGame() {
    const resultScreen = document.querySelector('.result-screen');
    resultScreen.classList.remove('show-result');

    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    matchesFound = 0;
    timerStarted = false;
    timeRemaining = 22.05;
    document.querySelector('.timer').textContent = '22.05';
    shuffleImages();
}

