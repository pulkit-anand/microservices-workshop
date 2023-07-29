import { DataTypes } from "sequelize";
import sequelize from "../pgdb";
export const Order = sequelize.define('Order',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {timestamps: false});

export const OrderItem = sequelize.define('OrderItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export const items = Order.hasMany(OrderItem, { as: 'items'})
