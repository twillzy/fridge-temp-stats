const average = numberList =>
  numberList.reduce((acc, n) => acc + n, 0) / numberList.length;

const median = (numberList) => {
  const mid = Math.floor(numberList.length / 2);
  const sortedList = numberList.slice().sort();
  return sortedList.length % 2 === 0
    ? average([sortedList[mid], sortedList[mid - 1]])
    : sortedList[mid];
};

const mode = (numberList) => {
  const groupedByOccurrence = numberList.reduce(
    (acc, n) =>
      (acc[n] ?
        {
          ...acc,
          [n]: acc[n] + 1,
        } :
        {
          ...acc,
          [n]: 1,
        })
    , {},
  );

  const maxOccurrence = Math.max(...Object.values(groupedByOccurrence));

  return maxOccurrence === 1 ?
    undefined :
    Object.keys(groupedByOccurrence)
      .filter(k => groupedByOccurrence[k] === maxOccurrence)
      .map(Number);
};

module.exports = {
  average,
  median,
  mode,
};
