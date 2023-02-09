module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('productos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categorias',
        key: 'id'
      },
      allowNull: false
    },
    marcaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'marcas',
        key: 'id'
      },
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  return Producto;
}