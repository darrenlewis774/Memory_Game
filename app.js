const cardArray = [
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
  },
  {
    name: 'fries',
    img: 'images/fries.png'
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png'
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'images/pizza.png'
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
  },
  {
    name: 'fries',
    img: 'images/fries.png'
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png'
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'images/pizza.png'
  }
]

/* Sort elements in cardArray into random order. This is done by randomly assigning each element a value of 
more than or less than 0.5, and then sorting the array depending on these values.*/
cardArray.sort(() => 0.5 - Math.random())

// Assign HTML div element's IDs to const variables.
const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const completed = document.querySelector('#completed')
const timeDisplay = document.querySelector('#timeTaken')

let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []
let currentTime = 0
let timerId = setInterval(timer, 1000)

createBoard()

function createBoard() {
  /* Create image element (assigned to const variable 'card') for each object contained within 'cardArray'. Each card's
   source attribute is set to display a blank image, a data-id of the current loop variable, and lastly assigned an
    event listener to listen for a mouse click. The newly created card is then appended to the 'gridDisplay' element. */
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'images/blank.png')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card)
  }
  // The text content for the 'resultDisplay' element is set to the current length of the 'cardsWon' Array.
  resultDisplay.innerHTML = cardsWon.length
  /* The 'completed' element, that displays a message informing that the game has been completed, is initially set to
   be hidden */
  completed.style.display = "none"
}

function flipCard() {
  /* This function is invoked when a card created by function 'createBoard' is clicked on. The data id attribute for 
  this card is assigned to const variable cardId */
  const cardId = this.getAttribute('data-id')
  // The name property of the clicked card, within the 'cardArray' array, is added to the 'cardsChosen' array.
  cardsChosen.push(cardArray[cardId].name)
  // The card ID, contained within 'cardId' variable, is added to the 'cardsChosenIds' array.
  cardsChosenIds.push(cardId)
  /* Set source for clicked card to the image property corresponding to the card ID for this card, contained within
   the 'cardArray' array. */
  this.setAttribute('src', cardArray[cardId].img)
  /* When the length of the 'cardsChosen' array is 2, meaning that 2 cards have been clicked, invoke function 'checkMatch' 
  after 500 milliseconds. */
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500)
  }
}

function checkMatch() {
  // Assign all img elements to const variable 'cards'.
  const cards = document.querySelectorAll('img')
  // Assign content of first element contained within 'cardsChosenIds' array to const variable 'optionOneId'.
  const optionOneId = cardsChosenIds[0]
  // Assign content of second element contained within 'cardsChosenIds' array to const variable 'optionTwoId'.
  const optionTwoId = cardsChosenIds[1]
  // Compare the values of 'optionOneId' and 'optionTwoId'
  if (optionOneId == optionTwoId) {
    /* If these values are identical, the same card has been clicked twice. An alert is generated outlining this.
     Also the source attribute for the card with this card ID is reset to the 'blank.png' image. */
    alert('You have clicked the same image!')
    cards[optionOneId].setAttribute('src', 'images/blank.png')
    cards[optionTwoId].setAttribute('src', 'images/blank.png')
  /* If two different cards are clicked, these name properties (pushed into 'cardsChosen') are compared. If they
    are identical, meaning they are a match, their source attributes are set to 'white.png'. Also their event
    listeners are removed, as they no longer need to be clicked. Finally, these name properties are pushed into the
     'cardsWon' array */
  } else if (cardsChosen[0] == cardsChosen[1]) {
    cards[optionOneId].setAttribute('src', 'images/white.png')
    cards[optionTwoId].setAttribute('src', 'images/white.png')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
  /* If the name properties of the cards (pushed into 'cardsChosen') are not identical, their source attributes are
   reset to 'blank.png' */
  } else {
    cards[optionOneId].setAttribute('src', 'images/blank.png')
    cards[optionTwoId].setAttribute('src', 'images/blank.png')
  }
  // Text content of 'resultDisplay' updated to display length of 'cardsWon' array, thus being current score.
  resultDisplay.innerHTML = cardsWon.length
  // 'cardsChosen' and 'cardsChosenIds' arrays cleared.
  cardsChosen = []
  cardsChosenIds = []

  /* If the length of the 'cardsWon' array is equal to half that of the 'cardArray' array, this means that all of the
   matches have been located. The 'completed' element is then unhidden, outlining that the game has been completed. */
  if (cardsWon.length == cardArray.length / 2) {
    clearInterval(timerId)
    completed.style.display = "block"
  }
}

function timer() {
  // Increments 'currentTime' and displays to 'timeDisplay' each time function is invoked.
  currentTime++
  timeDisplay.innerHTML = currentTime
}

