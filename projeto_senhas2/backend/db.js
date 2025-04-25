const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Bemvindo@digital',
  database: 'controle_atendimento',
  waitForConnections: true,
  connectionLimit: 10
});

// Função para verificar a conexão
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão bem-sucedida!');
    connection.release(); // Liberar a conexão após o teste
  } catch (error) {
    console.error('Erro ao conectar ao MySQL:', error.message);
  }
}

testConnection();

module.exports = pool;
