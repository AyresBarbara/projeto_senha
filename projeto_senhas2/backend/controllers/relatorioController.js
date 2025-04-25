const pool = require('../db');

exports.relatorioDiario = async (req, res) => {
  try {
    // Total de senhas emitidas hoje
    const [totalEmitidas] = await pool.query(`
      SELECT COUNT(*) AS total FROM senha WHERE DATE(data_emissao) = CURDATE()
    `);

    // Total atendidas hoje
    const [totalAtendidas] = await pool.query(`
      SELECT COUNT(*) AS total FROM senha 
      WHERE DATE(data_emissao) = CURDATE() AND status = 'ATENDIDA'
    `);

    // Totais por tipo
    const [porTipo] = await pool.query(`
      SELECT tipo,
             COUNT(*) AS emitidas,
             SUM(CASE WHEN status='ATENDIDA' THEN 1 ELSE 0 END) AS atendidas
      FROM senha
      WHERE DATE(data_emissao) = CURDATE()
      GROUP BY tipo
    `);

    // Relatório detalhado
    const [detalhes] = await pool.query(`
      SELECT cod_senha, tipo, data_emissao, data_atendimento, guiche
      FROM senha
      WHERE DATE(data_emissao) = CURDATE()
    `);

    // Média de TM por tipo
    const [tm] = await pool.query(`
      SELECT tipo, ROUND(AVG(tempo_medio), 2) AS tempo_medio
      FROM senha
      WHERE DATE(data_emissao) = CURDATE() AND status = 'ATENDIDA'
      GROUP BY tipo
    `);

    res.json({
      data: new Date().toLocaleDateString(),
      total_emitidas: totalEmitidas[0].total,
      total_atendidas: totalAtendidas[0].total,
      por_tipo: porTipo,
      relatorio_detalhado: detalhes,
      tempo_medio: tm
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
