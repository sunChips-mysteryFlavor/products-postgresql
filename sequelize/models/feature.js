'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Product, {
        through: models.productFeatures,
        foreignKey: 'feature_id',
      });
    }
  }
  feature.init(
    {
      feature_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
  return feature;
};
