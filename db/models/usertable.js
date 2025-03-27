'use strict';
const {
  Model,Sequelize
} = require('sequelize');

const sequelize = require('../../config/database')

module.exports = sequelize.define('UserTable',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstname: {
    allowNull:false,
    type: Sequelize.STRING
  },
  lastname: {
    allowNull:false,
    type: Sequelize.STRING
  },
  email: {
    allowNull:false,
    type: Sequelize.STRING,
    unique:true
  },
  phonenumber: {
    allowNull:false,
    type: Sequelize.STRING,
    unique:true
  },
  password: {
    allowNull:false,
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  },
  updatetoken:{
    type: Sequelize.STRING
  },
  usertype:{
    type:Sequelize.ENUM('0','1','2'),
    defaultValue:'0'
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
  modelName:'UserTable',
  timestamps: true
})