'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('features', {
      feature_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      feature: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('features');
  },
};
