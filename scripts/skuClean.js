const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = '../import/skus.csv';
const outputFilePath = '../export/skus_C.csv';

const writer = createCsvWriter({
  path: outputFilePath,
  header: [
    { id: 'id', title: 'sku_id' },
    { id: 'styleId', title: 'style_id' },
    { id: 'size', title: 'size' },
    { id: 'quantity', title: 'quantity' },
  ],
});

const rows = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    rows.push(row);
  })
  .on('end', () => {
    // Write the modified data to a new CSV file
    writer
      .writeRecords(rows)
      .then(() => console.log('The CSV file was written successfully'));
  });
