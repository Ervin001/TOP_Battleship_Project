const { GameBoard } = require('../gameBoard.js');

describe('GameBoard', () => {
  test('Game board is initialized with the correct size', () => {
    const gameBoard = GameBoard(10);
    expect(gameBoard).toHaveProperty('getBoard');
    expect(gameBoard.getBoard()).toHaveLength(10);
  });

  test('Check if coordinates are available', () => {
    const gameBoard = GameBoard(10);
    const coordinates = { row: 0, col: 0 };
    expect(gameBoard.isCoordinatesAvailable(coordinates)).toBe(true);
  });

  test('Check if coordinates are not available', () => {
    const gameBoard = GameBoard(10);
    const coordinates = { row: 0, col: 0 };
    gameBoard.getBoard()[0][0] = 'Ship'; // Simulate a ship placed at (0, 0)
    expect(gameBoard.isCoordinatesAvailable(coordinates)).toBe(false);
  });

  test('Check if randomly generated coordinates are available', () => {
    const gameBoard = GameBoard(10);
    const randomCoordinates = gameBoard.getRandomCoordinates(); // returns an object with row and col
    expect(gameBoard.isCoordinatesAvailable(randomCoordinates));
  });

  // test('Generate a random available position', () => {
  //   const gameBoard = GameBoard(10);
  //   const position =
  // });
});
