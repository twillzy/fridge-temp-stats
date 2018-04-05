const fs = require('fs');
const highland = require('highland');
const { transform } = require('./lib/fridgeTemperatureProcessor');

const readFile = highland.wrapCallback(fs.readFile);
const writerStream = fs.createWriteStream('output.json');

readFile(process.argv[2])
  .toArray((data) => {
    const result = transform(JSON.parse(data));
    writerStream.write(JSON.stringify(result), 'UTF8');
    writerStream.end();
  });
