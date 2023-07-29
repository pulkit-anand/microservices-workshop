import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../pgdb";
export const MenuItem = sequelize.define('MenuItem',{
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {timestamps: false});


