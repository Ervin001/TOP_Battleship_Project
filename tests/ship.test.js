const { Ship } = require('../ship.js');

describe('Ship', () => {
  test('If shipLength is not a number, or a number greater than 0, or sunk is not a boolean, it should throw an error', () => {
    expect(() => Ship('three', false)).toThrow('Invalid ship length');
    expect(() => Ship(-2, false)).toThrow('Invalid ship length');
  });

  test('Should return a Ship object with shipLength', () => {
    expect(Ship('s', 3)).toMatchObject({
      shipLength: 3,
    });
  });

  test('Should show the numbers of hits', () => {
    const ship = Ship('s', 3);
    expect(ship.showHits()).toBe(0);
  });

  test('Should show if the ship is sunk', () => {
    const ship = Ship('s', 3);

    expect(ship.isSunk()).toBe(false);
  });

  test('Should update the hits when a hit is registered', () => {
    const ship = Ship('s', 3);

    ship.addHit();
    expect(ship.showHits()).toBe(1);
  });

  test('Ship should have a direction', () => {
    const ship = Ship('s', 3);

    expect(ship).toHaveProperty('getDirection');
  });

  test('Ship should be able to change direction', () => {
    const ship = Ship('s', 3);

    ship.changeDirection('vertical');
    expect(ship.getDirection()).toBe('vertical');
    ship.changeDirection('horizontal');
    expect(ship.getDirection()).toBe('horizontal');
  });
});
