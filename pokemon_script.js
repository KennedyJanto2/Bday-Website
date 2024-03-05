const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let totalMatches = 0; // Counter for the number of matches
let matchesNeeded = 0; // The total number of matches needed to win

fetch("../data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data]; // Duplicate data to create pairs
    matchesNeeded = data.length; // Set the number of matches needed to win based on unique cards
    shuffleCards(); // Shuffle the cards after they are loaded and duplicated
    generateCards(); // Generate the card elements on the page
  });

function shuffleCards() {
  let currentIndex = cards.length, randomIndex, temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  gridContainer.innerHTML = ""; // Clear existing cards before generating new ones
  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src="${card.image}"/>
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flipped");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
  if (isMatch) {
    totalMatches++;
    if (totalMatches === matchesNeeded) {
      goToNextPage();
    }
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restart() {
  totalMatches = 0;
  cards = []; // Reset cards array
  fetch("../data/cards.json") // Refetch and regenerate cards
    .then(res => res.json())
    .then(data => {
      cards = [...data, ...data];
      matchesNeeded = data.length;
      shuffleCards();
      generateCards();
    });
}

function goToNextPage() {
  const completedMessage = document.getElementById('completedMessage');
  completedMessage.style.display = 'block'; // Show the "Completed!" message

  // Start confetti animation
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Set a timeout for the redirection to allow the confetti and message to show
  setTimeout(() => {
    window.location.href = "crono_puzzle.html"; // Redirect to the next page
  }, 5000); // Adjust the delay as needed
}

