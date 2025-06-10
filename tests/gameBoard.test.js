const { GameBoard } = require('../gameBoard.js');

describe('GameBoard', () => {
  test('Game board is initialized with the correct size', () => {
    const gameBoard = GameBoard(10);
    expect(gameBoard).toHaveProperty('getBoard');
    expect(gameBoard.getBoard()).toHaveLength(10);
  });

  // test('');
});
