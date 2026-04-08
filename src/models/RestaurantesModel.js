import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Cupons from "./CuponsModel.js";

const Restaurantes = sequelize.define(
    'nome_restaurante', 
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_restaurante: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    cnpj: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    horario_atendimento: {
        type: DataTypes.STRING(150),
        allowNull: false
    }, 
    tempo_entrega: {
        type: DataTypes.TIME,
        allowNull: false    
        }
    },
        {
        freezeTableName: true,
        tableName: 'restaurantes',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        });

    Restaurantes.belongsTo(Cupons, {
        as: 'cupom',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: {
            name: 'id_cupons',
            allowNull: false,
            field: 'id_cupons'
        }
    });

export default Restaurantes;
