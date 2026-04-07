import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';

const Categorias = sequelize.define('Categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeCategoria: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, 
{
    freezeTableName: true,
    tableName: 'categorias',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Categorias;