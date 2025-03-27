'use strict';
const {
  Model,Sequelize
} = require('sequelize');
const sequelize=require('../../config/database')
module.exports = sequelize.define('reviewTable',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userID: {
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:'UserTable',
      key:'id'
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  },
  order_ID: {
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:'orderTable',
      key:'id'
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  },
  points: {
    type: Sequelize.STRING
  },
  comment: {
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
  modelName:"reviewTable",
  freezeTableName:true,
  timestamps:true
})