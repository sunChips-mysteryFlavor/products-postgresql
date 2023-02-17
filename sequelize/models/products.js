'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.category, { foreignKey: 'category_id' });
      this.belongsToMany(models.features, {
        through: models.productFeatures,
        foreignKey: 'product_id',
      });
      this.hasMany(models.style, { foreignKey: 'product_id' });
    }
  }
  products.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      slogan: DataTypes.STRING,
      description: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      default_price: DataTypes.DECIMAL(10, 2),
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'products',
    },
  );
  return products;
};
