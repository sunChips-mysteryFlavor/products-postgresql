'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.styles, {
        foreignKey: {
          name: 'style_id',
        },
        onDelete: 'CASCADE',
      });
    }
  }
  photos.init(
    {
      photo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      style_id: DataTypes.INTEGER,
      thumbnail_url: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'photos',
    },
  );
  return photos;
};