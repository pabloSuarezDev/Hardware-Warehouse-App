const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      max: dbConfig.pool.min,
      max: dbConfig.pool.acquire,
      max: dbConfig.pool.idle
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => console.log(`Error: ${err}`));

const db = {};

db.Sequelize = Sequelize; 
db.sequelize = sequelize;

db.categoria = require('./Categoria')(sequelize, DataTypes);
db.marca = require('./Marca')(sequelize, DataTypes);
db.producto = require('./Producto')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Sincronización completada');
  })
  .catch(error => console.log(`Error ${error}`));

module.exports = db;