const fs = require('fs');
const csv = require('csv-parser');
const {
  category,
  features,
  photos,
  products,
  style,
  sku,
} = require('../sequelize/models');

const productCSV = '../data/export/product_C.csv';
const featureCSV = '../data/export/feature_C.csv';
const photosCSV = '../data/export/photos_C.csv';
const skusCSV = '../data/export/skus_C.csv';
const stylesCSV = '../data/export/styles_C.csv';

categoryCSVLoad(productCSV)
  .then(() => productCSVLoad(productCSV))
  .then(() => featureCSVLoad(featureCSV))
  .then(() => photosCSVLoad(photosCSV))
  .then(() => SkuCSVLoad(skusCSV))
  .then(() => StyleCSVLoad(stylesCSV))
  .catch((err) => console.log(err));

async function productFeaturesAssociation() {
  const product = await products.findByPk(row.product_id);
  const feature = await features.findByPk(row.feature_id);
  await product.addFeature(feature);
}

//FROM PRODUCTS CSV
//id,name,slogan,description,category,default_price
function categoryCSVLoad(productCSV) {
  fs.createReadStream(productCSV)
    .pipe(csv())
    .on('data', async (row) => {
      await category.findOrCreate({
        where: { name: row.category },
      });
    })
    .on('end', () => {
      console.log('Category load completed');
    });
}

// id,name,slogan,description,category,default_price
function productCSVLoad(productCSV) {
  fs.createReadStream(productCSV)
    .pipe(csv())
    .on('data', async (row) => {
      const [categoryResult] = await category.findOrCreate({
        where: { name: row.category },
      });

      await products.create({
        name: row.name,
        slogan: row.slogan,
        description: row.description,
        default_price: row.default_price,
        categoryId: categoryResult.id,
      });
    })
    .on('end', () => {
      console.log('Products load completed');
    });
}

//id,product_id,feature,value
function featureCSVLoad(featureCSV) {
  fs.createReadStream(featureCSV)
    .pipe(csv())
    .on('data', async (row) => {
      await features.create({
        feature_id: row.id,
        product_id: row.product_id,
        feature: row.feature,
        value: row.value,
      });
      await productFeaturesAssociation(row);
    })
    .on('end', () => {
      console.log('Features load completed');
    });
}

// id	styleId	url	thumbnail_url
function photosCSVLoad(photosCSV) {
  fs.createReadStream(photosCSV)
    .pipe(csv())
    .on('data', async (row) => {
      await photos.create({
        photo_id: row.id,
        style_id: row.styleId,
        thumbnail_url: row.thumbnail_url,
        url: row.url,
      });
    })
    .on('end', () => {
      console.log('Products load completed');
    });
}

//id,styleId,size,quantity
function SkuCSVLoad(skuCSV) {
  fs.createReadStream(skuCSV)
    .pipe(csv())
    .on('data', async (row) => {
      await sku.create({
        sku_id: row.id,
        style_id: row.styleId,
        quantity: row.quantity,
        size: row.size,
      });
    })
    .on('end', () => {
      console.log('Products load completed');
    });
}

//id,productId,name,sale_price,original_price,default_style
function StyleCSVLoad(styleCSV) {
  fs.createReadStream(styleCSV)
    .pipe(csv())
    .on('data', async (row) => {
      await style.create({
        style_id: row.id,
        product_id: row.productId,
        name: row.name,
        sale_price: row.sale_price,
        original_price: row.original_price,
        default: row.default_style,
      });
    })
    .on('end', () => {
      console.log('Products load completed');
    });
}
