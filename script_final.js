/*Coding Steps:
For the final project you will be creating an automated version of the classic card game WAR! There are many 
versions of the game WAR. In this version there are only 2 players.
You do not need to do anything special when there is a tie in a round.
Think about how you would build this project and write your plan down. Consider classes such as: 
        Card, Deck, Player, as well as what properties and methods they may include.
// Four suits to represent the appearance (user interface - ui) for your cards
let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
console.log("Card Suits Example:", cardSuits);

The game itself will automatically play using console.log() to display turns, points, cards used, 
and the outcome of the game. No user input via prompts is required.
The completed project should, when executed, do the following:
Deal 26 Cards to each Player from a Deck of 52 cards.
Iterate through the turns where each Player plays a Card.
The Player who played the higher card is awarded a point.
-Ties result in zero points for both Players.
After all cards have been played, display the score and declare the winner.
*/
//======================================================================================================
/*
 * My Plan:
 * Create a game with only 2 players. 
 * Classes Needed: Player 1 and 2, card, deck
 * Keep track of suits and card names
 * Make sure to display the round, the points of each player, which cards are used and who won the round
 * Run through every round - 26
 * Award 1 point to the winner of each round and have a final count at the end with who the winner was
 *  Per instructions, ties are worth 0
 * Use methods to create the deck and shuffle it
 * --------------------------------------------------
 * I was able to come up with the basics of this game i.e. classes, methods, arrays, constructors,
  I had to look up how to shuffle and deal half the deck.  I used the video walkthrough as well as ChatGPT
  to figure out how to correctly write the syntax for the game play, as well as to help me clean the code up.
  Ultimately, after writing as much as I could, I looked at a few different methods of writing the game 
  and put it together with the options I liked best. 

 */

// Four suits to represent the appearance (user interface - ui) for your cards
const cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];

// Array of Card Values and Ranks 
const cardValues = [
  {name: "2", rank: 2},
  {name: "3", rank: 3},
  {name: "4", rank: 4},
  {name: "5", rank: 5},
  {name: "6", rank: 6},
  {name: "7", rank: 7},
  {name: "8", rank: 8},
  {name: "9", rank: 9},
  {name: "10", rank: 10},
  {name: "J", rank: 11},
  {name: "Q", rank: 12},
  {name: "K", rank: 13},
  {name: "A", rank: 14},
];

// Card Class - Each card has a suit, value, and rank (used for comparing)
class Card {
  constructor(suit, value, rank) {
    this.suit = suit;
    this.value = value;
    this.rank = rank;
  }

  // Returns a string like "K of Hearts ❤️"
  describe() {
    return `${this.value} of ${this.suit}`;
  }
}

// Deck Class - deck creation, shuffling, and dealing
class Deck {
  constructor() {
    this.cards = [];        // Array for all cards in the deck
    this.createDeck();      // Automatically creates cards when instantiated
    this.shuffle();         // Shuffles the deck immediately
  }

  // Method to create the deck with all 52 cards and push into the deck
  createDeck() {
    for (let suit of cardSuits) {
      for (let val of cardValues) {
        this.cards.push(new Card(suit, val.name, val.rank));
      }
    }
  }

  // Method to shuffle cards - had to look up how to do this
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap
    }
  }

  // Deal 26 cards to each player - had to look up how to do this
  dealHalf() {
    return this.cards.splice(0, 26); // Removes and returns first 26 cards
  }
}

// Player Class - Represents each player in the game
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];     // Player's cards (26 cards-half the deck)
    this.score = 0;     // Player's current score
  }

  // Play the top card
  playCard() {
    return this.hand.shift(); // Removes first card from hand
  }

  // Adds one point to the player's score
  addPoint() {
    this.score++;
  }
}

// Game Class - Contains all logic to play the game
class Game {
  constructor() {
    // Create two players
    this.player1 = new Player("Player 1");
    this.player2 = new Player("Player 2");
  }

  // Method to start and run the game
  playGame() {
    // Instantiate a new deck, create a deck and shuffle the deck
    const deck = new Deck();

    // Deal 26 cards to both players
    this.player1.hand = deck.dealHalf();
    this.player2.hand = deck.dealHalf();

    console.log("Let's Play War!!!\n");

    // Play 26 rounds (one for each card in hand)
    for (let i = 0; i < 26; i++) {
      const card1 = this.player1.playCard(); // Player 1 plays a card
      const card2 = this.player2.playCard(); // Player 2 plays a card

      // Show the round and cards played
      console.log(`Round ${i + 1}:`);
      console.log(`${this.player1.name} played: ${card1.describe()}`);
      console.log(`${this.player2.name} played: ${card2.describe()}`);

      // Compare ranks to determine winner of the round
      if (card1.rank > card2.rank) {
        this.player1.addPoint();
        console.log(`${this.player1.name} wins this round! Huzzah!\n`);
      } else if (card2.rank > card1.rank) {
        this.player2.addPoint();
        console.log(`${this.player2.name} wins this round! Yippee!\n`);
      } else {
        // It's a tie – no points awarded
        console.log("It's a tie! No points awarded. Better luck next time!\n");
      }
    }

    // Shows the final scores after all rounds are played
    console.log("~~Who Won?~~");
    console.log(`${this.player1.name}: ${this.player1.score}`);
    console.log(`${this.player2.name}: ${this.player2.score}`);

    // Tells who the final winner is (or tie)
    if (this.player1.score > this.player2.score) {
      console.log(`${this.player1.name} wins our game of WAR! 🏆`);
    } else if (this.player2.score > this.player1.score) {
      console.log(`${this.player2.name} wins our game of WAR! 🏆`);
    } else {
      console.log("It's a tie! Nice Work! 🤝");
    }
  }
}

// Run the Game of WAR
const warGame = new Game();
warGame.playGame();
