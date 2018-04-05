const { sortBy } = require('./collection');

describe('sortBy', () => {
  it('sorts a collection by key name', () => {
    const collection = [
      { id: 1, value: 2 },
      { id: 2, value: 1 },
    ];

    expect(sortBy('value')(collection)).toEqual([
      { id: 2, value: 1 },
      { id: 1, value: 2 },
    ]);
  });
});
