const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');

router.get('/todas', CategoriaController.todas);
router.get('/:id', CategoriaController.una);

module.exports = router;