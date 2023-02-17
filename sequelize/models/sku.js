'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.style, { foreignKey: 'style_id' });
    }
  }
  sku.init(
    {
      sku_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      style_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'sku',
    },
  );
  return sku;
};
