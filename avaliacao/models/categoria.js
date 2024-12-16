import { DataTypes } from 'sequelize';
import _default from './database';
const { sequelize } = _default;

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categorias',
    timestamps: false, // Desativa createdAt e updatedAt
});

export default {Categoria};
