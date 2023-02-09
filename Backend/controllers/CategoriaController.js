const db = require('../models/models');
const Categoria = db.categoria;

const todas = async(req, res) => {
  let categorias = await Categoria.findAll();

  if(categorias.length <= 0) {
    return res.status(500).json({
      status: 'error',
      message: 'No se han encontrado categorias'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Categorias',
    categorias
  });
};

const una = async(req, res) => {
  let categoria_id = req.params.id;
  let { nombre } = await Categoria.findByPk(categoria_id);

  return res.status(200).json({
    status: 'success',
    message: `Categoria ${categoria_id}`,
    nombre
  });
};

module.exports = {
  todas,
  una
}