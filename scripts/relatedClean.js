const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = './data/import/related.csv';
const outputFilePath = './data/export/related_C.csv';

const writer = createCsvWriter({
  path: outputFilePath,
  header: [
    { id: 'id', title: 'id' },
    { id: 'current_product_id', title: 'product_id' },
    { id: 'related_product_id', title: 'related_product_id' },
  ],
});

const rows = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    if (row.related_product_id !== '0') {
      row.default_style = row.default_style === '1';
      if (row.sale_price === 'null') row.sale_price = '';
      rows.push(row);
    }
  })
  .on('end', () => {
    writer
      .writeRecords(rows)
      .then(() => console.log('The CSV file was written successfully'));
  });
