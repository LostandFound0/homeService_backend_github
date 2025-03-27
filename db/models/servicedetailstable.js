'use strict';
const {
  Model,Sequelize
} = require('sequelize');
const sequelize=require('../../config/database')
module.exports = sequelize.define("serviceDetailstable",{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  serviceName: {
    type: Sequelize.STRING,
    allowNull:false
  },
  minPrice: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  maxPrice: {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  serviceDescription: {
    type: Sequelize.STRING,
    allowNull:false
  },
  aboutuserDescription: {
    type: Sequelize.STRING,
    allowNull:false
  },
  diffServices: {
    type: Sequelize.STRING,
    allowNull:false
  },
  qualification: {
    type: Sequelize.STRING,
    allowNull:false
  },
  user_id: {
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
  timestamps: true,
  modelName:"serviceDetailstable"
})