// routes/senhaRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');  // Para gerar um código único

// Emitir Senha
router.post('/emitir', async (req, res) => {
  const { tipo } = req.body;
  
  try {
    // Buscar o tipo de senha no banco de dados
    const [tipoSenha] = await pool.query('SELECT * FROM tipo_senha WHERE codigo = ?', [tipo]);

    if (tipoSenha.length === 0) {
      return res.status(400).json({ error: 'Tipo de senha inválido.' });
    }

    // Gerar código único para a senha
    const codigoSenha = `${tipo}-${uuidv4().slice(0, 8)}`;

    // Inserir a senha no banco de dados
    const [result] = await pool.query(
      'INSERT INTO senha (cod_senha, codigo_tipo) VALUES (?, ?)',
      [codigoSenha, tipo]
    );

    const senhaEmitida = {
      id: result.insertId,
      cod_senha: codigoSenha,
      tipo: tipo,
      emitidaEm: new Date().toISOString(),
      status: 'EMITIDA'
    };

    res.status(201).json(senhaEmitida);
  } catch (error) {
    console.error('Erro ao emitir senha:', error);
    res.status(500).json({ error: 'Erro ao emitir senha.' });
  }
});

// Chamar Senha
router.get('/chamar', async (req, res) => {
  try {
    // Buscar a próxima senha com status 'EMITIDA'
    const [senhas] = await pool.query(
      'SELECT * FROM senha WHERE status = "EMITIDA" ORDER BY data_emissao LIMIT 1'
    );

    if (senhas.length === 0) {
      return res.status(404).json({ message: 'Nenhuma senha pendente' });
    }

    const senhaChamada = senhas[0];

    // Atualizar a senha para o status 'ATENDIDA' e marcar o horário de atendimento
    const [result] = await pool.query(
      'UPDATE senha SET status = "ATENDIDA", data_atendimento = ? WHERE id = ?',
      [new Date().toISOString(), senhaChamada.id]
    );

    senhaChamada.status = 'ATENDIDA';
    senhaChamada.data_atendimento = new Date().toISOString();

    res.json(senhaChamada);
  } catch (error) {
    console.error('Erro ao chamar senha:', error);
    res.status(500).json({ error: 'Erro ao chamar senha.' });
  }
});

module.exports = router;
