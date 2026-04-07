import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Pessoas = sequelize.define('Pessoas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    dataNascimento: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, 
{
    freezeTableName: true,
    tableName: 'pessoas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


export default Pessoas;
