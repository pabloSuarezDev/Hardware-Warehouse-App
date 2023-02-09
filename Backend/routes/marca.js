const express = require('express');
const router = express.Router();
const MarcaController = require('../controllers/MarcaController');

router.get('/todas', MarcaController.todas);
router.get('/:id', MarcaController.una);

module.exports = router;