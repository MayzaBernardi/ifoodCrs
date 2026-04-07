import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Cupons = sequelize.define('Cupons', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    condicao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    ativo: {    
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    freezeTableName: true,
    tableName: 'cupons',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Cupons;