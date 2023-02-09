const db = require('../models/models');
const Producto = db.producto;

const todos = async (req, res) => {
  let productos = await Producto.findAll();

  if (productos.length <= 0) {
    return res.status(500).json({
      status: 'error',
      message: 'No se han encontrado productos'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Productos',
    productos
  });
};

const uno = async (req, res) => {
  let producto_id = req.params.id;
  let { dataValues } = await Producto.findByPk(producto_id);

  if (Object.keys(dataValues).length <= 0) {
    return res.status(200).json({
      status: 'error',
      message: 'No se ha encontrado el producto'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: `Producto ${producto_id}`,
    producto: dataValues
  });
};

const agregar = async (req, res) => {
  let { nombre, categoriaId, marcaId, precio, stock } = req.body;

  if (nombre.length > 0 && typeof categoriaId === "number" && typeof marcaId === "number" && precio.length > 0 && stock.length > 0) {
    try {
      const producto = await Producto.create({
        id: null,
        nombre,
        categoriaId,
        marcaId,
        precio,
        stock,
        createdAt: null,
        updatedAt: null
      });

      return res.status(200).json({
        status: 'success',
        message: 'Producto añadido exitosamente',
        producto
      });
    } catch (error) { console.log(error); }
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'No se ha podido añadir en producto'
    });
  }
};

const editar = async (req, res) => {
  let producto_id = req.params.id;
  let { nombre, precio, stock } = req.body;

  if (producto_id.length > 0 && nombre.length > 0 && precio.length > 0 && stock.length > 0) {
    try {
      const producto = await Producto.update({
        nombre,
        precio,
        stock
      }, {
        where: { id: producto_id }
      });

      return res.status(200).json({
        status: 'success',
        message: 'Producto actualizado exitosamente',
        producto: {
          id: parseInt(producto_id),
          nombre, 
          precio: parseInt(precio), 
          stock: parseInt(stock)
        }
      });
    } catch (error) { console.log(error); }
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'No se ha podido actualizar el producto'
    });
  }
};

const borrar = async (req, res) => {
  let producto_id = req.params.id;

  if (producto_id.length > 0) {
    try {
      const { dataValues } = await Producto.findByPk(producto_id);

      if (Object.keys(dataValues).length > 0) {
        const producto = await Producto.destroy({where: { id: producto_id }});

        return res.status(200).json({
          status: 'success',
          message: 'Producto borrado exitosamente',
          producto: dataValues
        });
      }
    } catch (error) { console.log(error); }
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'No se ha podido borrado el producto'
    });
  }
};

module.exports = {
  todos,
  uno,
  agregar,
  editar,
  borrar
}