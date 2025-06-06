const { ship } = require('./ship');

describe('ship', () => {
  test('Should be a function', () => {
    expect(ship).toBeInstanceOf(Function);
  });
});
