'use strict';
const {
  Model,Sequelize
} = require('sequelize');
const sequelize=require('../../config/database')
module.exports = sequelize.define('subscription',{
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
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      Model:'UserTable',
      key:'id'
    },
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
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
  timestamps:true,
  modelName:'subscription'
})