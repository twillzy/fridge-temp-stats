const {
  groupTemperaturesByFridgeId, enrichDataWithStats, format,
} = require('./index');
const { average, median, mode } = require('../utils/stats');
const { roundTo } = require('../utils/number');

jest.mock('../utils/number', () => ({
  roundTo: jest.fn(),
}));

describe('groupTemperaturesByFridgeId', () => {
  it('transforms fridges temperature data correctly', () => {
    const data = [
      { id: 'a', temperature: 10 },
      { id: 'a', temperature: 11 },
      { id: 'b', temperature: 12 },
      { id: 'c', temperature: 13 },
      { id: 'b', temperature: 14 },
    ];

    expect(groupTemperaturesByFridgeId(data)).toEqual([
      { id: 'a', temperatures: [10, 11] },
      { id: 'b', temperatures: [12, 14] },
      { id: 'c', temperatures: [13] },
    ]);
  });
});

describe('enrichData', () => {
  it('enriches temperatures data with statistics', () => {
    const data = [
      { id: 'a', temperatures: [10, 11] },
    ];
    expect(enrichDataWithStats(data)).toEqual([
      {
        id: 'a',
        temperatures: [10, 11],
        average: average([10, 11]),
        median: median([10, 11]),
        mode: mode([10, 11]),
      },
    ]);
  });
});

describe('format', () => {
  it('omits unwanted keys', () => {
    const data = [{
      id: 'A',
      temperatures: [1],
      average: [1],
      median: 1,
      mode: undefined,
      random: 'RANDOM_KEY',
    }];

    expect(Object.keys(format(data)[0])).toEqual(['id', 'average', 'median', 'mode']);
  });

  it('rounds average to 2 decimal places', () => {
    const data = [{
      id: 'A',
      average: 10.204,
    }];
    format(data);
    expect(roundTo).toBeCalledWith(10.204, 2);
  });

  it('rounds median to 2 decimal places', () => {
    const data = [{
      id: 'A',
      median: 1.2345,
    }];
    format(data);
    expect(roundTo).toHaveBeenLastCalledWith(1.2345, 2);
  });

  it('sorts mode in an ascending order', () => {
    const data = [{
      id: 'A',
      mode: [3, 2, 1],
    }];
    const result = format(data);
    expect(result[0].mode).toEqual([1, 2, 3]);
  });

  it('does not format mode if undefined', () => {
    const data = [{
      id: 'A',
      mode: undefined,
    }];
    const result = format(data);
    expect(result[0].mode).toBeUndefined();
  });
});
