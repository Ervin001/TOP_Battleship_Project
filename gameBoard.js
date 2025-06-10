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

  // Place boats on the board randomly

  function getBoard() {
    return board;
  }

  return {
    getBoard,
  };
}

exports.GameBoard = GameBoard;
