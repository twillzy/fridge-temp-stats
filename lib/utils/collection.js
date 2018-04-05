const sortBy = key => collection => collection.slice().sort((a, b) => a[key] - b[key]);

module.exports = {
  sortBy,
};
