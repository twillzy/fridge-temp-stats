const roundTo = (num, dp) => Math.round(num * (10 ** dp)) / (10 ** dp);

module.exports = {
  roundTo,
};
