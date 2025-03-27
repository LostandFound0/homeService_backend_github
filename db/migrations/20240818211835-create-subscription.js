'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscription', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cardFullname: {
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
      cvv: {
        type: Sequelize.STRING
      },
      amount:{
        type:Sequelize.STRING
      },
      workCertificate:{
        type:Sequelize.STRING
      },
      drugtest:{
        type:Sequelize.STRING
      },
      idproof:{
        type:Sequelize.STRING
      },
      backGround_Check:{
        type:Sequelize.STRING
      },
      criminalRecord:{
        type:Sequelize.STRING
      },
      healthBAckground:{
        type:Sequelize.STRING
      },
      gender:{
        type:Sequelize.STRING
      },
      race:{
        type:Sequelize.STRING
      },
      termsandCondition:{
        type:Sequelize.STRING
      },
      userID: {
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
    await queryInterface.dropTable('subscription');
  }
};