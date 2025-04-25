const express = require('express');
const router = express.Router();
const relatorioController = require('./relatorioController');

// Rota para relatório diário
router.get('/diario', relatorioController.relatorioDiario);

// Rota para relatório mensal
router.get('/mensal', relatorioController.relatorioMensal);

module.exports = router;
