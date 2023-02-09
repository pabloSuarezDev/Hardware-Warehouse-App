module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('categorias', {
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

  return Categoria;
}