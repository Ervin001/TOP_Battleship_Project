const { GameBoard } = require('../gameBoard.js');

describe('GameBoard', () => {
  test('Game board is initialized with the correct size', () => {
    const gameBoard = GameBoard(10);
    expect(gameBoard).toHaveProperty('getBoard');
    expect(gameBoard.getBoard()).toHaveLength(10);
  });

  test('Check if board can place a boat', () => {
    const gameBoard = GameBoard();
    const boat = gameBoard.getBoats()[0]; // carrier boat
    const coordinates = { row: 0, col: 0 };

    // Simulate placing a boat on the board
    gameBoard.placeBoat(boat, coordinates, 'horizontal');
    expect(gameBoard.getBoard()[0][0]).toEqual(
      expect.objectContaining({
        boat: boat,
      })
    );
  });

  test('Check that all boats are in the game board and no overlaps', () => {
    const gameBoard = GameBoard(10);
    const boats = gameBoard.getBoats();

    gameBoard.placeBoatsAtRandom(); // place the boats on the board

    const totalBoats = boats.reduce((acc, boat) => acc + boat.shipLength, 0);
    let occupiedCells = 0;

    // loop though the board and count occupied cells
    for (let row = 0; row < gameBoard.getBoard().length; row++) {
      for (let col = 0; col < gameBoard.getBoard()[row].length; col++) {
        const cell = gameBoard.getBoard()[row][col];

        if (cell.boat !== null) {
          occupiedCells++;
        }
      }
    }
    // Validate total number of occupied cells matches total number of boats
    expect(occupiedCells).toBe(totalBoats);
  });

  test('Make sure the boat cannot place ships out of bounds', () => {
    const gameBoard = GameBoard(10);
    const boat = gameBoard.getBoats()[1]; // battle ship
    const coordinates = { row: 9, col: 9 }; // out of bounds for a 10 x 10 board
    gameBoard.placeBoat(boat, coordinates, 'horizontal');

    expect(gameBoard.getBoard()[9][9].boat).toBeNull(); // The boat should not be placed
  });

  test('Check that gameBoard can receive hits', () => {
    const gameBoard = GameBoard(10);

    const coordinates = { row: 0, col: 0 };

    gameBoard.receiveAttack(coordinates);
    expect(gameBoard.getBoard()[0][0].hit).toBe(true);
    expect(gameBoard.getBoard()[0][1].hit).toBe(false); // Ensures other cells are not affected
  });

  test('Check that gameBoard throws an error if coordinates have already been hit', () => {
    const gameBoard = GameBoard(10);
    const coordinates = { row: 0, col: 0 };

    // First attack should succeed
    gameBoard.receiveAttack(coordinates);
    expect(gameBoard.getBoard()[0][0].hit).toBe(true);

    // Second attack on the same coordinates should throw an error
    expect(() => {
      gameBoard.receiveAttack(coordinates);
    }).toThrow('Cell has already been hit');
  });

  test('Check if gameBoard has all boats sunk', () => {
    const gameBoard = GameBoard(10);
    const boats = gameBoard.getBoats();
    // simulate hitting all boats
    boats.forEach((boat) => {
      for (let i = 0; i < boat.shipLength; i++) {
        boat.addHit();
      }
    });

    expect(gameBoard.allBoatsSunk()).toBe(true);
  });

  test('Get the number of boats left', () => {
    const gameBoard = GameBoard(10);
    const boats = gameBoard.getBoats();

    // Simulate hitting all boats except one
    boats.forEach((boat, index) => {
      if (index < boats.length - 1) {
        for (let i = 0; i < boat.shipLength; i++) {
          boat.addHit();
        }
      }
    });

    expect(gameBoard.getRemainingBoats()).toBe(1); // One boat left
  });

  test('Get the number of boats sunk', () => {
    const gameBoard = GameBoard(10);
    const boats = gameBoard.getBoats();

    // Simulate hitting all boats except one
    boats.forEach((boat, index) => {
      if (index < boats.length - 1) {
        for (let i = 0; i < boat.shipLength; i++) {
          boat.addHit();
        }
      }
    });

    expect(gameBoard.getSunkenBoats()).toBe(4); // one boat left
  });
});
