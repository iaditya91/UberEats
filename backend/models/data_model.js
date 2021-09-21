const Sequelize = require('sequelize');
const conf = require('../config/config.db');

const sequelize = new Sequelize(conf.DB, conf.USER, conf.PASSWORD,{
    host: conf.HOST,
    port: conf.PORT,
    dialect: conf.dialect,
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    operatorsAliases: false,
});

const customer = sequelize.define('customer',{
    custId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    emailId: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
    },
    passwd: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contactNo: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    country:{
        type: Sequelize.STRING
    },
    profileImg: {
        type: Sequelize.TEXT
    },
    dob: {
        type: Sequelize.DATE 
    },
    nickName: {
        type: Sequelize.STRING
    },
});

module.exports = {
    sequelize,
    customer
};