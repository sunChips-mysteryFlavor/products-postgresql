const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = '../import/product.csv';
const outputFilePath = '../export/product_C.csv';

const writer = createCsvWriter({
  path: outputFilePath,
  header: [
    { id: 'id', title: 'product_id' },
    { id: 'name', title: 'name' },
    { id: 'slogan', title: 'slogan' },
    { id: 'description', title: 'description' },
    { id: 'category', title: 'category' },
    { id: 'default_price', title: 'default_price' },
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
