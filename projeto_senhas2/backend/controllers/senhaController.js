let ultimaSenhaAtendida = null; 

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

/// POST /senhas
exports.gerarSenha = async (req, res) => {
  const { tipo } = req.body;
  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS c FROM senha WHERE DATE(data_emissao)=CURDATE() AND tipo=?`,
      [tipo]
    );
    const seq = rows[0].c + 1;
    const cod = gerarCodigo(tipo, seq);

    await pool.query('INSERT INTO senha (cod_senha, tipo, status) VALUES (?, ?, "EMITIDA")', [cod, tipo]);
    res.status(201).json({ cod_senha: cod });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET /senhas/proxima
exports.proximaSenha = async (req, res) => {
  const prioridades = ['SP', 'SE', 'SG'];
  
  try {
    // Tentando buscar as senhas de forma alternada conforme as prioridades
    let ultimaSenha = null;

    for (let tipo of prioridades) {
      // Se ainda existir uma senha "EMITIDA" do tipo atual, a retorna
      const [rows] = await pool.query(
        `SELECT * FROM senha WHERE status='EMITIDA' AND tipo=? ORDER BY data_emissao LIMIT 1`,
        [tipo]
      );
      
      if (rows.length) {
        // Armazena a última senha, para alternar corretamente
        ultimaSenha = rows[0];
        // Atualiza status da senha para "EMITIDA"
        return res.json(ultimaSenha);
      }
    }

    // Se nenhuma senha foi encontrada
    res.status(404).json({ message: 'Nenhuma senha disponível' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /senhas/:id/atender
exports.atenderSenha = async (req, res) => {
  const { id } = req.params;
  const { guiche } = req.body;
  const tipo = req.body.tipo;

  // Calculando o tempo médio de atendimento com base no tipo de senha
  let tm = 0;
  if (tipo === 'SP') {
    tm = Math.floor(Math.random() * (15 + 5 + 1)) + 5; // 5 a 15 minutos
  } else if (tipo === 'SG') {
    tm = Math.floor(Math.random() * (3 + 3 + 1)) + 3; // 3 a 5 minutos
  } else if (tipo === 'SE') {
    tm = Math.floor(Math.random() * (4 + 1)) + 1; // 1 a 5 minutos
  }

  try {
    await pool.query(
      `UPDATE senha SET status='ATENDIDA', data_atendimento=NOW(), guiche=?, tempo_medio=? WHERE id=?`,
      [guiche, tm, id]
    );
    res.json({ message: 'Senha atendida' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
