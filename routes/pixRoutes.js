const express = require('express');
const router = express.Router();
const { criarPix, simularPagamento, checarStatus } = require('../controllers/pixController');

router.post('/criar-pix', criarPix);
router.post('/simular-pagamento', simularPagamento);
router.get('/status-pagamento/:id', checarStatus);

module.exports = router; 