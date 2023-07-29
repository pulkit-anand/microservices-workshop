const { Sequelize, Model } = require("sequelize");
const sequelize = require("../pgdb");
const MenuItem = require("./menu-item");

const Restaurant = sequelize.define('Restaurant', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {sequelize, timestamps: false});
const menuItems = Restaurant.hasMany(MenuItem, {as: 'menu'});
module.exports = {Restaurant, menuItems};