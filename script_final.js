/*Coding Steps:
For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
You do not need to do anything special when there is a tie in a round.
Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.
// Four suits to represent the appearance (user interface - ui) for your cards
let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
console.log("Card Suits Example:", cardSuits);

The game itself will automatically play using console.log() to display turns, points, cards used, and the outcome of the game. No user input via prompts is required.
The completed project should, when executed, do the following:
Deal 26 Cards to each Player from a Deck of 52 cards.
Iterate through the turns where each Player plays a Card.
The Player who played the higher card is awarded a point.
-Ties result in zero points for both Players.
After all cards have been played, display the score and declare the winner.
*/
//======================================================================================================

// Four suits to represent the appearance (user interface - ui) for your cards
let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];

// Array of card values and their corresponding ranks for comparison
let cardValues = [
  { name: "2", rank: 2 },
  { name: "3", rank: 3 },
  { name: "4", rank: 4 },
  { name: "5", rank: 5 },
  { name: "6", rank: 6 },
  { name: "7", rank: 7 },
  { name: "8", rank: 8 },
  { name: "9", rank: 9 },
  { name: "10", rank: 10 },
  { name: "J", rank: 11 },
  { name: "Q", rank: 12 },
  { name: "K", rank: 13 },
  { name: "A", rank: 14 },
];

// ==============================
// Card class
// ==============================
class Card {
  constructor(suit, value, rank) {
    this.suit = suit;   // e.g., "Hearts ❤️"
    this.value = value; // e.g., "Q"
    this.rank = rank;   // e.g., 8
  }

  // Returns a string description of the card
  describe() {
    return `${this.value} of ${this.suit}`;
  }
}

// ==============================
// Deck class-Should have: an array to store the cards, a way to generate the cards and a way to shuffle
// ==============================
class Deck {
  constructor() {
    this.cards = []; // Array to hold 52 cards
    this.createDeck(); // Generate all cards
    this.shuffle();    // Shuffle deck after creation
  }
  //Method to create a deck...iterate over rank/suit
  // Creates all 52 cards and adds them to the deck
  createDeck() {
    for (let suit of cardSuits) {
      for (let val of cardValues) {
        this.cards.push(new Card(suit, val.name, val.rank));
      }
    }
  }

  // Shuffles the cards using Fisher-Yates algorithm
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // Deals half the deck (26 cards) to a player
  dealHalf() {
    return this.cards.splice(0, 26);
  }
}

// ==============================
// Player class
// ==============================
class Player {
  constructor(name, cards, hand) {
    this.name = name;     // Player's name
    this.cards = cards;   // Array of 26 cards
    this.score = 0;       // Points earned in the game
  }

  // Plays the top card (removes and returns it)
  playCard() {
    return this.cards.shift();
  }

  // Increments the player's score
  addPoint() {
    this.score += 1;
  }
}

// ==============================
// Game Logic
// ==============================
function playWarGame() {
  console.log("Let's Play WAR!\n");

  // Create and shuffle a new deck
  let deck = new Deck();

  // Deal 26 cards to each player
  let player1 = new Player("Player 1", deck.dealHalf());
  let player2 = new Player("Player 2", deck.dealHalf());

  // Loop through 26 rounds
  for (let i = 0; i < 26; i++) {
    // Each player plays one card
    let card1 = player1.playCard();
    let card2 = player2.playCard();

    console.log(`\nRound ${i + 1}:`);
    console.log(`${player1.name} plays ${card1.describe()}`);
    console.log(`${player2.name} plays ${card2.describe()}`);

    // Compare ranks and award a point to the winner
    if (card1.rank > card2.rank) {
      player1.addPoint();
      console.log(`${player1.name} wins the round! Yipee!`);
    } else if (card2.rank > card1.rank) {
      player2.addPoint();
      console.log(`${player2.name} wins the round! Huzzah!`);
    } else {
      // No points for tie
      console.log("It's a tie! No points awarded. Better luck next time!");
    }
      
  }

  // Final score output
  console.log("\nFinal Scores:");
  console.log(`${player1.name}: ${player1.score}`);
  console.log(`${player2.name}: ${player2.score}`);

  // Declare the overall winner
  if (player1.score > player2.score) {
    console.log(`${player1.name} wins the game!`);
  } else if (player2.score > player1.score) {
    console.log(`${player2.name} wins the game!`);
  } else {
    console.log("The game is a tie!");
  }
}

// Run the game
playWarGame();
