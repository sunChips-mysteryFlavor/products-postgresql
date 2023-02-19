// CREATE TABLE productFeatures (
//   product_id INTEGER REFERENCES products(product_id),
//   feature_id INTEGER REFERENCES features(feature_id),
//   PRIMARY KEY (product_id, feature_id)
// );

// INSERT INTO productFeatures(product_id, feature_id)
// SELECT p.product_id, f.feature_id
// FROM products p, features f;

// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('productFeatures', {
//       feature_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         references: { model: 'features', key: 'feature_id' },
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE',
//       },
//       product_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         references: { model: 'products', key: 'product_id' },
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE',
//       },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('productFeatures');
//   },
// };
