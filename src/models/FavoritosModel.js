import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pessoas from './PessoasModel.js';
import Restaurantes from './RestaurantesModel.js';

const Favoritos = sequelize.define(
    'Favoritos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},
{
    freezeTableName: true,
    tableName: 'favoritos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Favoritos.belongsTo(Pessoas, {
    as: 'pessoa',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_pessoas',
        allowNull: false,
        field: 'id_pessoas'
    }
});

Favoritos.belongsTo(Restaurantes, {
    as: 'restaurante',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_restaurantes',
        allowNull: false,
        field: 'id_restaurantes'
    }
});

export default Favoritos;