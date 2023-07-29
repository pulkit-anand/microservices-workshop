const { Sequelize, Model } = require("sequelize");
const sequelize = require("../pgdb");
const MenuItem = sequelize.define('MenuItem',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
}, { sequelize, timestamps: false});

module.exports = MenuItem;
