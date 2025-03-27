'use strict';
const {
  Model,Sequelize
} = require('sequelize');
const sequelize=require('../../config/database')
module.exports = sequelize.define('paymentTable',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  orderID: {
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:'orderTable',
      key:'id'
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  },
  userId:{
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:'UserTable',
      key:'id'
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
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
},{
  freezeTableName:true,
  modelName:'paymentTable',
  timestamps:true
})