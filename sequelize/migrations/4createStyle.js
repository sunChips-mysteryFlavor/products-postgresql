'use strict';

const style = require('../models/style');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('styles', {
      style_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'product_id' },
      },
      name: {
        type: Sequelize.STRING,
      },
      original_price: {
        type: Sequelize.INTEGER,
      },
      sale_price: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      default: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('styles');
  },
};
