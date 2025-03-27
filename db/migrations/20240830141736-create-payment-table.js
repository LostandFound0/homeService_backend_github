'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paymentTable', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderID: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      cardName: {
        type: Sequelize.STRING
      },
      cardNumber: {
        type: Sequelize.STRING
      },
      expMonth: {
        type: Sequelize.STRING
      },
      expYear: {
        type: Sequelize.STRING
      },
      paymentAmount: {
        type: Sequelize.STRING
      },
      paymentAddress: {
        type: Sequelize.STRING
      },
      paymentCity: {
        type: Sequelize.STRING
      },
      paymentState: {
        type: Sequelize.STRING
      },
      paymentPostalcode: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('paymentTable');
  }
};