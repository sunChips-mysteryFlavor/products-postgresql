const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = '../import/styles.csv';
const outputFilePath = '../export/styles_C.csv';

const writer = createCsvWriter({
  path: outputFilePath,
  header: [
    { id: 'id', title: 'style_id' },
    { id: 'productId', title: 'product_id' },
    { id: 'name', title: 'name' },
    { id: 'default_style', title: 'default_style' },
    { id: 'sale_price', title: 'sale_price' },
    { id: 'original_price', title: 'original_price' },
  ],
});

const rows = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    row.default_style = row.default_style === '1';

    rows.push(row);
  })
  .on('end', () => {
    // Write the modified data to a new CSV file
    writer
      .writeRecords(rows)
      .then(() => console.log('The CSV file was written successfully'));
  });
