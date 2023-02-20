'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('relatedProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'product_id' },
      },
      related_product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'product_id' },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('relatedProducts');
  },
};
