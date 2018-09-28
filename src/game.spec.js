const Should = require('should');
const Game = require('./game.js');

describe('The test environment', function () {
  it('should pass', function () {
    (true).should.equal(true);
  });

  it('should access game', function () {
    Should(Game).not.equal(undefined);
  });
});

describe('Your specs...', function () {
  it('Game not playable 0 players', () => {
    const game = new Game();
    game.isPlayable().should.equal(false);
  });

  it('Game not playable 1 players', () => {
    const game = new Game();

    game.addPlayer('Simon');
    game.isPlayable().should.equal(false);
  });

  it('Game not won at start', () => {
    const game = new Game();

    game.notFinished().should.equal(true);
  });

  it('Game move, category and answers', () => {
    const game = new Game();

    game.addPlayer('Simon');
    game.currentPlayerMovePositions(6);
    game.currentPlayer().location.should.equal(6);
    game.currentCategory().should.equal('Sports');
    game.answerCorrect();
    game.currentPlayer().purse.should.equal(1);
  });

  it('Game cycle turns', () => {
    const game = new Game();

    game.addPlayer('Simon');
    game.addPlayer('Peter');
    game.currentPlayer().name.should.equal('Simon');
    game.nextTurn();
    game.currentPlayer().name.should.equal('Peter');
  })
});
