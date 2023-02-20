'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RelatedProducts extends Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  RelatedProducts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'product_id',
        },
      },
      related_product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'product_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'relatedProducts',
    },
  );
  return RelatedProducts;
};
