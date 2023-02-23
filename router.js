const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

const pool = new Pool({
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: 'products',
  host: '54.88.155.195',
  port: 5432,
});

router.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;
  let output = {};
  pool
    .query(
      `SELECT * FROM products
      WHERE product_id = ${productId}`,
    )
    .then((data) => {
      const getData = data.rows[0];
      output = {
        id: getData.product_id,
        campus: 'hr-rfp',
        name: getData.name,
        slogan: getData.slogan,
        description: getData.description,
        default_price: getData.default_price,
        created_at: getData.created_at,
        updated_at: getData.updated_at,
      };

      return pool.query(
        `SELECT features.feature, features.value
        FROM productFeatures
        INNER JOIN features ON productFeatures.feature_id = features.feature_id
        WHERE productFeatures.product_id = ${productId};`,
      );
    })
    .then((data) => {
      const features = data.rows.map((row) => ({
        feature: row.feature,
        value: row.value,
      }));
      output.features = features;

      return pool.query(`
        SELECT category.name
        FROM category
        JOIN products ON category.product_id = products.product_id
        WHERE products.product_id = ${productId};
      `);
    })
    .then((data) => {
      output.category = data.rows[0].name;
      // console.log(output, 'FULL OUTPUT');
      res.send(output).end();
    })
    .catch((err) => console.error(err));
});

router.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  const output = { product_id: productId };
  const styleArr = [];
  pool
    .query(
      `
    SELECT style_id, name, original_price, sale_price, "default"
    FROM styles
    WHERE product_id = ${productId};
  `,
    )
    .then((data) => {
      const styles = data.rows.map((row) => ({
        style_id: row.style_id,
        name: row.name,
        original_price: row.original_price,
        sale_price: row.sale_price,
        default: row.default,
        photos: [],
      }));
      output.results = styles;

      return Promise.all(
        styles.map((style) => {
          styleArr.push(style.style_id);
          return pool
            .query(
              `SELECT thumbnail_url, url
              FROM photos
              WHERE style_id = ${style.style_id};`,
            )
            .then((data) => {
              style.photos = data.rows;
              return style;
            });
        }),
      );
    })
    .then((styles) => {
      output.results = styles;

      return Promise.all(
        styleArr.map((style_id) => {
          return pool.query(
            `SELECT sku_id, quantity, size
            FROM skus
            WHERE style_id = ${style_id};`,
          );
        }),
      );
    })
    .then((data) => {
      const skus = {};
      data.forEach((result) => {
        result.rows.forEach((sku) => {
          skus[sku.sku_id] = { quantity: sku.quantity, size: sku.size };
        });
      });
      output.skus = skus;
      res.send(output);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

router.get('/products/:product_id/related', (req, res) => {
  const productId = req.params.product_id;
  pool
    .query(
      `SELECT related_product_id FROM relatedproducts WHERE product_id = ${productId}`,
    )
    .then((data) => {
      const relatedProductIds = data.rows.map((row) => row.related_product_id);
      res.send(relatedProductIds);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

module.exports = router;
