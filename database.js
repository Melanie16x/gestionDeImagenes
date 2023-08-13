const { Sequelize, DataTypes } = require('sequelize');

//Conexion a la base de datos
const sequelize = new Sequelize(
    
    //NO TOMA LAS VARIABLES DE ENTORNO.
    process.env.DB_NAME || 'gestionimagenesdb', 
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql'
    }
);

const conectarDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Base de datos conectada');
    } catch (error) {
        console.log('ERROR AL CONECTAR DB: ', error);
    }
};

module.exports = {sequelize, DataTypes, conectarDB}