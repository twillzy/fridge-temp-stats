const { roundTo } = require('./number');

describe('roundTo', () => {
  it('rounds a number to a specified number of decimal places', () => {
    expect(roundTo(1.234, 2)).toEqual(1.23);
    expect(roundTo(1.235, 2)).toEqual(1.24);
    expect(roundTo(1.235, 3)).toEqual(1.235);
  });
});
