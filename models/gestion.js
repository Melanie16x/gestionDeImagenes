const { DataTypes, sequelize } = require("./../database.js");

const Gestion = sequelize.define('Gestion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    createdAt: true,
    updatedAt: true,
    tableName: 'imagenes'
})

Gestion.sync();

module.exports = Gestion;