import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pessoas from './PessoasModel.js';
import Cupons from './CuponsModel.js';
import Entregadores from './EntregadoresModel.js';
import Pagamentos from './PagamentosModel.js';
import Status from './StatusModel.js';
import Enderecos from './EnderecosModel.js';

const Pedidos = sequelize.define('Pedidos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    observacao: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    data_pedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    freezeTableName: true,
    tableName: 'pedidos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Pedidos.belongsTo(Pessoas, {
    as: 'pessoa',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_pessoas',
        allowNull: false,
        field: 'id_pessoas'
    }
});

Pedidos.belongsTo(Cupons, {
    as: 'cupom',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'id_cupons',
        allowNull: true,
        field: 'id_cupons'
    }
});

Pedidos.belongsTo(Entregadores, {
    as: 'entregador',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'id_entregadores',
        allowNull: true,
        field: 'id_entregadores'
    }
});

Pedidos.belongsTo(Pagamentos, {
    as: 'pagamento',
    onDelete: 'SET NULL',           
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'id_pagamento',
        allowNull: true,
        field: 'id_pagamento'
    }
});

Pedidos.belongsTo(Status, {
    as: 'status',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'id_status',
        allowNull: true,
        field: 'id_status'
    }
});

Pedidos.belongsTo(Enderecos, {
    as: 'endereco',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'id_enderecos',
        allowNull: true,
        field: 'id_enderecos'
    }
});

export default Pedidos;