function Ship(shipLength) {
  let hits = 0;

  // validate shipLength
  if (typeof shipLength !== 'number' || shipLength <= 0) {
    throw new Error('Invalid ship length');
  }

  // show num of hits
  function showHits() {
    return hits;
  }

  // check if ship is sunk
  function isSunk() {
    return hits >= shipLength;
  }

  // register a hit
  function addHit() {
    return (hits += 1);
  }

  return { shipLength, showHits, isSunk, addHit };
}

exports.Ship = Ship;
