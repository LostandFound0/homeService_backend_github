const {Sequelize}=require('sequelize')
const database_model_env=process.env.DB_NODE||"development"
const config=require('./config')

const sequelize=new Sequelize(config[database_model_env]);


module.exports=sequelize;