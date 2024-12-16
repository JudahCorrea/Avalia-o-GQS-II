import { DataTypes } from 'sequelize';
import { sequelize } from './database';
import _default from './produto';
const { Produto } = _default;

const Estoque = sequelize.define('Estoque', {
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id',
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'estoque',
    timestamps: false,
});

// Relacionar Estoque com Produto (um estoque está associado a um produto)
Estoque.belongsTo(Produto, { foreignKey: 'produtoId' });

export default {Estoque};
