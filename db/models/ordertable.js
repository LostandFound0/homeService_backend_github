'use strict';
const {
  Model,Sequelize
} = require('sequelize');
const sequelize=require('../../config/database')
module.exports = sequelize.define('orderTable',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  orderuser_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      Model:'user_table',
      key:'id'
    },
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
  },
  service_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      Model:'serviceDetailstable',
      key:'id'
    },
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue:0
  },
  servicemessage: {
    type: Sequelize.STRING,
    defaultValue:"Request waiting...."
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  paymentstatus:{
    type:Sequelize.STRING,
    defaultValue:0
  }
},{
  freezeTableName:true,
  timestamps: true,
  modelName:'orderTable'
})