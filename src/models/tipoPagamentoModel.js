import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';

const TipoPagamento = sequelize.define('TipoPagamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isIn: [['Cartão de crédito', 'Cartão de débito', 'Pix', 'Dinheiro']]
        }
    }
}, 
{
    freezeTableName: true,
    tableName: 'tipo_pagamento',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default TipoPagamento;