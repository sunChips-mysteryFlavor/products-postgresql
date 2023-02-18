'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('skus', {
      sku_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      style_id: {
        type: Sequelize.INTEGER,
        references: { model: 'styles', key: 'style_id' },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('skus');
  },
};
