const { Sequelize } = require("sequelize");
const sequelize = require("../pgdb");
const Order = sequelize.define('Order',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    orderId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    total: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
}, { sequelize, timestamps: false});

const OrderItem = sequelize.define('OrderItem', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const items = Order.hasMany(OrderItem, { as: 'items'})

module.exports = {Order, OrderItem, items};
