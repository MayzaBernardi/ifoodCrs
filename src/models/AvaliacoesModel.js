import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pedidos from './PedidosModel.js';

const Avaliacoes = sequelize.define('Avaliacoes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
},
{
    freezeTableName: true,
    tableName: 'avaliacoes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Avaliacoes.belongsTo(Pedidos, {
    as: 'pedido',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_pedidos',
        allowNull: false,
        field: 'id_pedidos'
    }
});

export default Avaliacoes;