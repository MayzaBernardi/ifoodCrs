import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pessoas from './PessoasModel.js';

const Entregadores = sequelize.define('Entregadores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    }, 
    {
    freezeTableName: true,
    tableName: 'entregadores',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
);

Entregadores.belongsTo(Pessoas, {
    as: 'pessoa',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_pessoas',
        allowNull: false,
        field: 'id_pessoas'
    }
})

export default Entregadores;


