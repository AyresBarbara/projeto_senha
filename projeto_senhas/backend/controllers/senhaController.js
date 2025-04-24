const pool = require('../db');

// Gera código da senha
function gerarCodigo(tipo, sequencia) {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth()+1).padStart(2,'0');
  const dd = String(now.getDate()).padStart(2,'0');
  const pp = tipo;
  const sq = String(sequencia).padStart(3,'0');
  return `${yy}${mm}${dd}-${pp}${sq}`;
}

// POST /senhas
exports.gerarSenha = async (req, res) => {
  const { tipo } = req.body;
  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS c FROM senha WHERE DATE(data_emissao)=CURDATE() AND tipo=?`,
      [tipo]
    );
    const seq = rows[0].c + 1;
    const cod = gerarCodigo(tipo, seq);
    await pool.query('INSERT INTO senha (cod_senha, tipo) VALUES (?,?)', [cod, tipo]);
    res.status(201).json({ cod_senha: cod });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /senhas/proxima
exports.proximaSenha = async (req, res) => {
  const prioridades = ['SP','SE','SG'];
  try {
    for (let tipo of prioridades) {
      const [rows] = await pool.query(
        `SELECT * FROM senha WHERE status='EMITIDA' AND tipo=? ORDER BY data_emissao LIMIT 1`,
        [tipo]
      );
      if (rows.length) return res.json(rows[0]);
    }
    res.status(404).json({ message: 'Nenhuma senha disponível' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /senhas/:id/atender
exports.atenderSenha = async (req, res) => {
  const { id } = req.params;
  const { guiche } = req.body;
  try {
    await pool.query(
      `UPDATE senha SET status='ATENDIDA', data_atendimento=NOW(), guiche=? WHERE id=?`,
      [guiche, id]
    );
    res.json({ message: 'Senha atendida' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
