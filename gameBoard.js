const { Ship } = require('./ship');

function GameBoard(boardSize = 10) {
  const boats = [
    {
      name: 'Carrier',
      length: 5,
      direction: null,
    },
    {
      name: 'Battleship',
      length: 4,
      direction: null,
    },
    {
      name: 'Cruiser',
      length: 3,
      direction: null,
    },
    {
      name: 'Submarine',
      length: 3,
      direction: null,
    },
    {
      name: 'Destroyer',
      length: 2,
      direction: null,
    },
  ].map(({ name, length }) => Ship(name, length));

  // Initialize the game board with a 2D array
  const board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
      boat: null,
      hit: false,
    }))
  );

  // Get random coordinates on the board
  function getRandomCoordinates() {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    return { row, col };
  }

  // check if coordinates are available
  function isCoordinatesAvailable({ row, col }) {
    // Check if the coordinates are within the board bounds
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
      return false;
    }
    // Check if the cell is already occupied
    return board[row][col].boat === null;
  }

  // Place boats on the board
  function placeBoat(boat, { row, col }, direction) {
    let canPlace = true;

    // Check if the boat can be placed in the specified direction
    for (let i = 0; i < boat.shipLength; i++) {
      // check if boat can be placed horizontally
      if (direction === 'horizontal') {
        if (
          col + i >= boardSize ||
          !isCoordinatesAvailable({ row, col: col + i })
        ) {
          canPlace = false;
          break; // if the boat goes out of bounds or overlaps with another boat
        }
      }

      // check if boat can be placed vertically
      if (direction === 'vertical') {
        if (
          row + i >= boardSize ||
          !isCoordinatesAvailable({ row: row + i, col })
        ) {
          canPlace = false;
          break; // if the boat goes out of bounds or overlaps with another boat
        }
      }
    }

    // if the boat can be placed, place it on the board
    if (canPlace) {
      for (let i = 0; i < boat.shipLength; i++) {
        direction === 'horizontal'
          ? (board[row][col + i].boat = boat)
          : (board[row + i][col].boat = boat);
      }
      return true; // return true if the boat can be placed
    }

    return false; // return false if the boat cannot be placed
  }

  // Place all boats at random positions on the board
  function placeBoatsAtRandom() {
    boats.forEach((boat) => {
      let placed = false;
      let attempts = 0; // limit to prevent infinite loops

      while (!placed && attempts < 50) {
        const coordinates = getRandomCoordinates();
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        if (placeBoat(boat, coordinates, direction)) {
          placed = true;
        }
        attempts++; // failed to place the boat
      }
    });
  }

  function getBoard() {
    return board;
  }

  function getBoats() {
    return boats;
  }

  function receiveAttack({ row, col }) {
    // Check if the coordinates are withing the board bounds
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
      throw new Error('Coordinates are out of bounds');
    }

    // Check if the cell has already been hit
    if (board[row][col].hit) {
      throw new Error('Cell has already been hit');
    }

    // Mark the cell as hit
    board[row][col].hit = true;

    //check if there is a boat in the cell
    if (board[row][col].boat) {
      // If there is a boat, register a hit on the boat
      board[row][col].boat.addHit();
      return { hit: true, sunk: board[row][col].boat.isSunk() };
    }

    return { hit: false, sunk: false };
  }

  function allBoatsSunk() {
    return boats.every((boat) => boat.isSunk()); // Check if all boats are sunk
  }

  function getRemainingBoats() {
    return boats.filter((boat) => !boat.isSunk()).length; // Count boats that are not sunk
  }

  function getSunkenBoats() {
    return boats.filter((boat) => boat.isSunk()).length; // Count boats that are sunk
  }

  return {
    getBoard,
    getBoats,
    placeBoat,
    placeBoatsAtRandom,
    receiveAttack,
    allBoatsSunk,
    getRemainingBoats,
    getSunkenBoats,
  };
}

exports.GameBoard = GameBoard;
