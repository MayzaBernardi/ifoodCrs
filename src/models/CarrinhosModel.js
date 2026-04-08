import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pedidos from './PedidosModel.js';
import Cardapios from './CardapiosModel.js';

const Carrinhos = sequelize.define('Carrinhos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor_individual: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},
{
    freezeTableName: true,
    tableName: 'carrinhos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Carrinhos.belongsTo(Pedidos, {
    as: 'pedido',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_pedidos',
        allowNull: false,
        field: 'id_pedidos'
    }
});

Carrinhos.belongsTo(Cardapios, {
    as: 'cardapio',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_cardapios',
        allowNull: false,
        field: 'id_cardapios'
    }
});

export default Carrinhos;