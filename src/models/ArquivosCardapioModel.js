import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import restaurantes from './RestaurantesModel.js';

const ArquivosCardapio = sequelize.define('arquivos_cardapio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_arquivo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    caminho_arquivo: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    freezeTableName: true,
    tableName: 'arquivos_cardapio',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

ArquivosCardapio.belongsTo(restaurantes, {
    as: 'restaurante',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_restaurante',
        allowNull: false,
        field: 'id_restaurante'
    }
});

export default ArquivosCardapio;