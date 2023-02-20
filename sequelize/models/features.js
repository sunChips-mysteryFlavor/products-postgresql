'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class features extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.products, {
        through: models.productFeatures,
        foreignKey: 'feature_id',
        otherKey: 'product_id',
      });
      this.belongsToMany(models.productFeatures, {
        through: models.productFeatures,
        foreignKey: 'feature_id',
        otherKey: 'product_id',
      });
    }
  }
  features.init(
    {
      feature_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'feature',
    },
  );
  return features;
};
