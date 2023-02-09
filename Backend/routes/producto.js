const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');

router.get('/todos', ProductoController.todos);
router.get('/:id', ProductoController.uno);
router.post('/agregar', ProductoController.agregar);
router.put('/editar/:id', ProductoController.editar);
router.delete('/borrar/:id', ProductoController.borrar);

module.exports = router;