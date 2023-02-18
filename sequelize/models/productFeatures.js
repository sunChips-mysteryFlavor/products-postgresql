'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productFeatures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.products, {
        through: 'productFeatures',
        foreignKey: 'feature_id',
      });
      this.belongsToMany(models.features, {
        through: 'productFeatures',
        foreignKey: 'product_id',
      });
    }
  }
  productFeatures.init(
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
      feature_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'features',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'productFeatures',
      indexes: [
        {
          unique: true,
          fields: ['product_id', 'feature_id'],
        },
      ],
    },
  );
  return productFeatures;
};
