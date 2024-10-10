'use strict';

var cardsArray = [
  {
    'name': '1',
    'img': 'img/om/1.jpg'
  }, 
  {
    'name': '2',
    'img': 'img/om/2.jpg'
  }, 
  {
    'name': '3',
    'img': 'img/om/3.jpg'
  }, 
  {
    'name': '4',
    'img': 'img/om/4.jpg'
  }, 
  {
    'name': '5',
    'img': 'img/om/5.jpg'
  },
  {
    'name': '6',
    'img': 'img/om/6.jpg'
  }, 
  {
    'name': '7',
    'img': 'img/om/7.jpg'
  }, 
  {
    'name': '8',
    'img': 'img/om/8.jpg'
  }
];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var matches = 0;
var clickcount = 0;
var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  matches++;
  console.log(matches)
  if(matches == 8){
    congratulate(clickcount)
  }
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

var congratulate = function(clickcount) {
  // Create a div element
  var congratsDiv = document.createElement('div');

  // Set the text content with the congratulations message and the click count
  congratsDiv.textContent = 'Congratulations! Your Score is ' + clickcount;

  // Apply styles for centering the text and flashing colors
  congratsDiv.style.position = 'fixed';
  congratsDiv.style.top = '50%';
  congratsDiv.style.left = '50%';
  congratsDiv.style.transform = 'translate(-50%, -50%)';
  congratsDiv.style.fontSize = '24px';
  congratsDiv.style.fontWeight = 'bold';
  congratsDiv.style.textAlign = 'center';
  congratsDiv.style.animation = 'flash 1s infinite alternate';

  // Append the element to the body
  document.body.appendChild(congratsDiv);

  // Define the keyframes for the flashing animation
  var styleSheet = document.styleSheets[0];
  styleSheet.insertRule('@keyframes flash { 0% { color: red; } 50% { color: blue; } 100% { color: green; } }', 0);
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  clickcount++;
  console.log(clickcount);

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
