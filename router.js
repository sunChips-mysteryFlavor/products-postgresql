const express = require('express');
const product = require('./sequelize/models/products');

const router = express.Router();

router.get('/products', (req, res) => {
  // console.log(
  //   {
  //     url: req.path,
  //     query: req.query,
  //     header: req.headers,
  //     data: req.data,
  //   },
  //   req,
  // );
  // product.findByPk(req.)
  console.log(req);
});

module.exports = router;
