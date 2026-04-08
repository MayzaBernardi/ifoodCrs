import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Status from './StatusModel.js';
import TipoPagamento from './TipoPagamentoModel.js';

const Pagamentos = sequelize.define('Pagamentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},
{
    freezeTableName: true,
    tableName: 'pagamentos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Pagamentos.belongsTo(Status, {
    as: 'status',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_status',
        allowNull: false,
        field: 'id_status'
    }
})

Pagamentos.belongsTo(TipoPagamento, {
    as: 'tipoPagamento',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_tipo_pagamentos',
        allowNull: false,
        field: 'id_tipo_pagamentos'
    }
})

export default Pagamentos;