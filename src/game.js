const TILE_TYPES = {
  POP: 'Pop',
  SCIENCE: 'Science',
  SPORTS: 'Sports',
  ROCK: 'Rock'
};

// One Board Cycle
const BOARD_CYCLE = [
  TILE_TYPES.POP,
  TILE_TYPES.SCIENCE,
  TILE_TYPES.SPORTS,
  TILE_TYPES.ROCK,
];

// The default board consists of three cycles.
const BOARD = [...BOARD_CYCLE, ...BOARD_CYCLE, ...BOARD_CYCLE];

const WINNING_PURSE = 6;

function generateQuestionCards(numberOfQuestions) {
  const questions = {};

  for (const tileKey in TILE_TYPES) {
    const cardName = TILE_TYPES[tileKey];

    questions[cardName] = [];

    // Array(n).keys() -> [0, 1, 2, 3, ... n-2, n-1]
    for (const index of Array(numberOfQuestions).keys()) {
      questions[cardName].push(`${cardName} Question ${index}`);
    }
  }

  return questions;
}

class Game {
  constructor(numberOfQuestions = 50) {
    this.players = new Array();
    this.questions = generateQuestionCards(numberOfQuestions);
  }

  isPlayable() {
    return this.players.length >= 2;
  }

  currentPlayer() {
    return this.players[0];
  }

  currentCategory() {
    return BOARD[this.currentPlayer().location];
  }

  notFinished() {
    return this.players.every(player => {
      return player.purse < WINNING_PURSE;
    });
  }

  addPlayer(playerName) {
    const player = {
      name: playerName,
      location: 0,
      purse: 0,
      isInPenaltyBox: false
    };

    this.players.push(player);
    console.log(
      `${playerName} was added.`,
      `\nThere are now ${this.players.length} players in the game.`
    );
  }

  nextTurn() {
    this.players.push(this.players.shift());
  }

  currentPlayerMovePositions(roll) {
    const player = this.currentPlayer();
    console.log(`${player.name} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (player.isInPenaltyBox && roll % 2 === 0) {
      // Not getting out.
      console.log(`${player.name} is not coming out of the penalty box`);
    } else {
      // Got out, or never was in the penalty box in the first place.
      player.isInPenaltyBox = false;
      player.location = (player.location + roll) % BOARD.length;
      console.log(`${player.name}'s new location is ${player.location}`);
      console.log(`The category is ${this.currentCategory()}`);
      console.log(this.questions[this.currentCategory()].shift());
    }
  }

  answerCorrect() {
    const player = this.currentPlayer();
    if (!player.isInPenaltyBox) {
      console.log(`${player.name} answered correctly!!!`);
      player.purse++;
      console.log(`${player.name} now has ${player.purse} Gold Coins.`);
    }

    this.nextTurn();
  }

  answerIncorrect() {
    const player = this.currentPlayer();
    console.log('The question was answered incorrectly.');
    console.log(`${player.name} was sent to the penalty box.`);
    player.isInPenaltyBox = true;

    this.nextTurn();
  }
}

var game = new Game();

game.addPlayer('Chet');
game.addPlayer('Pat');
game.addPlayer('Sue');

do {
  const roll = Math.floor(Math.random() * 6 + 1);
  game.currentPlayerMovePositions(roll);

  if (Math.floor(Math.random() * 10) === 7) {
    game.answerIncorrect();
  } else {
    game.answerCorrect();
  }
} while (game.notFinished());

module.exports = Game;
