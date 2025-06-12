function GameBoard(boardSize = 10) {
  const boats = [
    {
      name: 'Carrier;',
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
  ];

  // Initialize the game board with a 2D array
  const board = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(null)
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
    return board[row][col] === null;
  }

  // Place boats on the board randomly
  function placeBoat(boat, { row, col }, direction) {
    let canPlace = true;

    // Check if the boat can be placed in the specified direction
    for (let i = 0; i < boat.length; i++) {
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
      for (let i = 0; i < boat.length; i++) {
        direction === 'horizontal'
          ? (board[row][col + i] = boat)
          : (board[row + i][col] = boat);
      }
    }
  }

  function getBoard() {
    return board;
  }

  return {
    getBoard,
    boats,
    getRandomCoordinates,
    isCoordinatesAvailable,
    placeBoat,
  };
}

exports.GameBoard = GameBoard;
