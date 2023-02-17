'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('photos', {
      photo_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      style_id: {
        type: Sequelize.INTEGER,
      },
      thumbnail_url: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('photos');
  },
};
