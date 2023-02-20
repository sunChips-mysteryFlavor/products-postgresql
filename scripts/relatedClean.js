const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFilePath = './data/import/related.csv';
const outputFilePath = './data/export/related_C.csv';

const writer = createCsvWriter({
  path: outputFilePath,
  header: [
    { id: 'current_product_id', title: 'product_id' },
    { id: 'related_product_id', title: 'related_product_id' },
  ],
});

const rows = [];
const seenRows = new Set();

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const productId = row.current_product_id;
    const relatedProductId = row.related_product_id;
    if (
      productId &&
      relatedProductId &&
      productId !== '0' &&
      relatedProductId !== '0'
    ) {
      const key = `${productId}_${relatedProductId}`;
      if (!seenRows.has(key)) {
        rows.push({
          current_product_id: productId,
          related_product_id: relatedProductId,
        });
        seenRows.add(key);
      }
    }
  })
  .on('end', () => {
    writer
      .writeRecords(rows)
      .then(() => console.log('The CSV file was written successfully'));
  });
