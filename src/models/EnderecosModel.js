import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pessoas from './PessoasModel.js';

const Enderecos = sequelize.define('Enderecos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    logradouro: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING(20),     
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    cep: {  
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, 
{
    freezeTableName: true,
    tableName: 'enderecos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Enderecos.belongsTo(Pessoas, {
    as: 'pessoa',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_pessoas',
        allowNull: false,
        field: 'id_pessoas'
    }
})

export default Enderecos;