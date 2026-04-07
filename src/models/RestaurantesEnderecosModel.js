import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Restaurantes from './RestaurantesModel.js';

const RestaurantesEnderecos = sequelize.define(
    'Restaurantes_enderecos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    logradouro: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    freezeTableName: true,
    tableName: 'restaurantes_enderecos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

RestaurantesEnderecos.belongsTo(Restaurantes, {
    as: 'restaurante',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_restaurantes',
        allowNull: false,
        field: 'id_restaurantes'
    }
});

export default RestaurantesEnderecos;