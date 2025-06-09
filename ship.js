/**
 *
 * @param {number} shipLength - Total number of hits the ship can sustain.
 * @throws {Error} If shipLength is not a number or less than or equal to 0.
 * @returns {{
 *  shipLength: number,
 *  showHits: () => number,
 *  isSunk: () => boolean,
 *  addHit: () => number
 * }}
 * @returns
 */

function Ship(shipLength) {
  let hits = 0;

  // validate shipLength
  if (typeof shipLength !== 'number' || shipLength <= 0) {
    throw new Error('Invalid ship length');
  }

  // return ship hits
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
