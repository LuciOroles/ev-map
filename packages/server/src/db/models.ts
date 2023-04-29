import { DataTypes } from "sequelize";
import { getDbInstance } from "./index";

const sequelize = getDbInstance();

export const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.CHAR(100),
        allowNull: false,
    },
    // TODO: magic strings
    parent_company_id: {
        type: DataTypes.UUID,
    },
},{
    freezeTableName: true,
})


export const Station  = sequelize.define('Station', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.CHAR(100),
        allowNull: false,
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    address: {
        type: DataTypes.CHAR(100),
        allowNull: false,
    },
}, {
    freezeTableName: true,
})