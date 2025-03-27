'use strict';
const {
  Model,Sequelize
} = require('sequelize');
const sequelize=require('../../config/database')
module.exports = sequelize.define('messageTable',{
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
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  },
  orderID: {
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:'orderTable',
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  },
  message: {
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
  modelName:'messageTable',
  timestamps:true
})