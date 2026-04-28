import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Categorias from './CategoriasModel.js';
import Restaurantes from './RestaurantesModel.js';
import ArquivosCardapio from './ArquivosCardapioModel.js';

const Cardapios = sequelize.define('Cardapios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    nome_prato: {
        type: DataTypes.STRING,
        allowNull: false
    }

},
{
    freezeTableName: true,
    tableName: 'cardapios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Cardapios.belongsTo(Categorias, {
    as: 'categoria',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_categorias',
        allowNull: false,
        field: 'id_categorias'
    }
});

Cardapios.belongsTo(Restaurantes, {
    as: 'restaurante',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'id_restaurantes',
        allowNull: false,
        field: 'id_restaurantes'
    }
});


export default Cardapios;