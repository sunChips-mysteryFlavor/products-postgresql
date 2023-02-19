'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class style extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, { foreignKey: 'product_id' });
      this.hasMany(models.photos, {
        foreignKey: 'style_id',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.sku, {
        foreignKey: 'style_id',
        onDelete: 'CASCADE',
      });
    }
  }
  style.init(
    {
      style_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      original_price: DataTypes.DECIMAL(10, 2),
      sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      default: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'style',
    },
  );
  return style;
};
