const stats = require('../utils/stats');
const { roundTo } = require('../utils/number');
const pipe = require('../utils/pipe');
const { sortBy } = require('../utils/collection');

/**
 * Creates an array of data grouped by fridge id with the respective list of temperatures
 *
 * @param {Array} The fridge temperature data to iterate over.
 * @returns {Array} Returns the new grouped array.
 * @example
 *
 * const data = [
 *   { id: 'a', timestamp: 1509493645, temperature : 4.63},
 *   { id: 'a', timestamp: 1509493646, temperature : 4.62},
 *   { id: 'b', timestamp: 1509493646, temperature : 4.12},
 *   { id: 'b', timestamp: 1509493646, temperature : 4.13},
 * ];
 *
 * groupTemperaturesByFridgeId(data);
 * // => [ { id: 'a', temperatures: [4.63, 4.62] }, { id: 'b', temperatures: [4.12, 4.13] } ]
 */
const groupTemperaturesByFridgeId = (data) => {
  const groupedByFridgeId = data.reduce((acc, d) => {
    if (acc[d.id]) {
      return {
        ...acc,
        [d.id]: [...acc[d.id], d.temperature],
      };
    }
    return {
      ...acc,
      [d.id]: [d.temperature],
    };
  }, {});

  return Object.keys(groupedByFridgeId).map(k => ({
    id: k,
    temperatures: groupedByFridgeId[k],
  }));
};

/**
 * Creates an array of data enriched with average, median and mode stats
 *
 * @param {Array} The fridge temperature data to iterate over.
 * @returns {Array} Returns the new array with stats.
 * @example
 *
 * const data = [
 *   { id: 'a', temperatures : [1, 2, 2, 3]},
 * ];
 *
 * enrichDataWithStats(data);
 * // => [ { id: 'a', temperatures: [1, 2, 3], average: 2, median: 2, mode: 2 } ]
 */
const enrichDataWithStats = data => data.map(d => ({
  ...d,
  average: stats.average(d.temperatures),
  median: stats.median(d.temperatures),
  mode: stats.mode(d.temperatures),
}));

/**
 * Creates an array of formatted fridge temperature data
 *
 * @param {Array} The fridge temperature data to iterate over.
 * @returns {Array} Returns the new formatted array.
 * @example
 *
 * const data = [
 *   { id: 'a', temperatures: [1, 2, 3], average: 2.125, median: 2.185, mode: [3, 2, 1] }
 * ];
 *
 * format(data);
 * // => [ { id: 'a', average: 2.13, median: 2.19, mode: [1, 2, 3] } ]
 */
const format = data => data.map(({
  id, average, median, mode,
}) => ({
  id,
  average: roundTo(average, 2),
  median: roundTo(median, 2),
  mode: mode && mode.slice().sort(),
}));

const transform = pipe(
  groupTemperaturesByFridgeId,
  enrichDataWithStats,
  format,
  sortBy('average'),
);

module.exports = {
  groupTemperaturesByFridgeId,
  enrichDataWithStats,
  format,
  transform,
};

