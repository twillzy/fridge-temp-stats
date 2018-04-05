const { average, median, mode } = require('./stats');

describe('average', () => {
  it('should return itself for just one number', () => {
    expect(average([10])).toEqual(10);
  });

  it('should return the average of a list of numbers', () => {
    expect(average([1, 2, 3])).toEqual(2);
  });
});

describe('median', () => {
  it('should return itself for just one number', () => {
    expect(median([10])).toEqual(10);
  });

  it('should return the median of a list of numbers with odd numbered length', () => {
    expect(median([1, 2, 3])).toEqual(2);
  });

  it('should return the median of a list of numbers with even numbered length', () => {
    expect(median([1, 2, 3, 4])).toEqual(2.5);
  });

  it('should return the median of a list of unordered numbers', () => {
    expect(median([3, 1, 2])).toEqual(2);
  });
});

describe('mode', () => {
  it('should return the number that occurs the most often', () => {
    expect(mode([1, 1, 2])).toEqual([1]);
    expect(mode([1, 2, 2])).toEqual([2]);
    expect(mode([4.13, 4.15, 4.15, 3.88])).toEqual([4.15]);
  });

  it('should return multiple modes if multiple nunmbers occur the most often', () => {
    expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2]);
    expect(mode([1, 1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it('should return undefined if no number is repeated', () => {
    expect(mode([1, 2, 3, 4])).toEqual(undefined);
  });
});
