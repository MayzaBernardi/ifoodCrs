import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pessoas from './PessoasModel.js';

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
    }
}, 
{
    freezeTableName: true,
    tableName: 'perfis_usuario',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});


Pessoas.hasMany(PerfilUsuario, { foreignKey: 'pessoa_id', as: 'perfis' });

PerfilUsuario.belongsTo(Pessoas, { foreignKey: 'pessoa_id' });

export default PerfilUsuario;