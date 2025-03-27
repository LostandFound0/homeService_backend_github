'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('serviceDetailstable', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serviceName: {
        type: Sequelize.STRING
      },
      minPrice: {
        type: Sequelize.INTEGER
      },
      maxPrice: {
        type: Sequelize.INTEGER
      },
      serviceDescription: {
        type: Sequelize.STRING
      },
      aboutuserDescription: {
        type: Sequelize.STRING
      },
      diffServices: {
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('serviceDetailstable');
  }
};