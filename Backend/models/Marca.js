module.exports = (sequelize, DataTypes) => {
  const Marca = sequelize.define('marcas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Marca;
}