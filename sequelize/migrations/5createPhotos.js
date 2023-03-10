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
        references: { model: 'styles', key: 'style_id' },
      },
      thumbnail_url: {
        type: Sequelize.TEXT,
      },
      url: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('photos');
  },
};
