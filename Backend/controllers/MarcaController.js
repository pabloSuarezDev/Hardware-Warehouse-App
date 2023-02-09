const db = require('../models/models');
const Marca = db.marca;

const todas = async(req, res) => {
  let marcas = await Marca.findAll();

  if(marcas.length <= 0) {
    return res.status(500).json({
      status: 'error',
      message: 'No se han encontrado marcas'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Marcas',
    marcas
  });  
};

const una = async(req, res) => {
  let marca_id = req.params.id;
  let { nombre } = await Marca.findByPk(marca_id);

  if(nombre.length <= 0) {
    return res.status(500).json({
      status: 'error',
      message: 'No se ha encontrado la marca'
    });
    
  } 

  return res.status(200).json({
    status: 'success',
    message: `Marca ${marca_id}`,
    nombre
  });
};

module.exports = {
  todas,
  una
}