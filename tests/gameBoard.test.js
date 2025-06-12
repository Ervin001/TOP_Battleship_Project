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

  test('Check if board can place a boat', () => {
    const gameBoard = GameBoard();
    const boat = gameBoard.boats[0]; // carrier boat
    const coordinates = { row: 0, col: 0 };

    // Simulate placing a boat on the board
    gameBoard.placeBoat(boat, coordinates, 'horizontal');
    expect(gameBoard.getBoard()[0][0]).toBe(boat);
    expect(gameBoard.getBoard()[0][1]).toBe(boat);
    expect(gameBoard.getBoard()[0][2]).toBe(boat);
    expect(gameBoard.getBoard()[0][3]).toBe(boat);
    expect(gameBoard.getBoard()[0][4]).toBe(boat);
  });

  test('Check if board cannot place a boat out of bounds', () => {
    const gameBoard = GameBoard(10);
    const boat = gameBoard.boats[1]; // battle ship
    const coordinates = { row: 9, col: 9 }; // out of bounds for a 10 x 10 board
    gameBoard.placeBoat(boat, coordinates, 'horizontal');
    expect(gameBoard.getBoard()[9][9]).toBeNull(); // The boat should not be placed
  });
});
