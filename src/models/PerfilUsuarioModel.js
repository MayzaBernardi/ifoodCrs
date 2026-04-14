import { sequelize } from '../config/index.js'; 
import { DataTypes } from 'sequelize';
import Pessoas from './PessoasModel.js';
import Restaurantes from './RestaurantesModel.js';

const PerfilUsuario = sequelize.define('perfis_usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    papel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cliente' 
    },
    
    id_pessoa: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'pessoas', 
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    id_restaurante: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: 'restaurantes', 
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, 
{
    freezeTableName: true,
    tableName: 'perfis_usuario', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

Pessoas.hasMany(PerfilUsuario, { foreignKey: 'id_pessoa', as: 'perfis' });
PerfilUsuario.belongsTo(Pessoas, { foreignKey: 'id_pessoa' });
Restaurantes.hasMany(PerfilUsuario, { foreignKey: 'id_restaurante', as: 'perfis' });
PerfilUsuario.belongsTo(Restaurantes, { foreignKey: 'id_restaurante' });

export default PerfilUsuario;