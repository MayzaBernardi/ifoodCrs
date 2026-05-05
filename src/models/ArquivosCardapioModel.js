import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';

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
    },
    id_cardapios: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_restaurantes: { 
        type: DataTypes.INTEGER,
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

export default ArquivosCardapio;