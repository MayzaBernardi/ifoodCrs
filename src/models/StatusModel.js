import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Status = sequelize.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    situacao: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isIn: [['Em processamento', 'Saiu para entrega', 'Entregue', 'Cancelado', 'Devolvido', 'Aguardando pagamento', 'Pagamento aprovado', 'Pagamento recusado']]
        }
    }
},
{
    freezeTableName: true,
    tableName: 'status',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Status;    