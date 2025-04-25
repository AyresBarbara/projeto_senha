CREATE DATABASE controle_atendimento;
USE controle_atendimento;

CREATE TABLE tipo_senha (
  codigo CHAR(2) PRIMARY KEY,           
  descricao VARCHAR(50) NOT NULL,
  prioridade INT NOT NULL,             
  tm_medio_segundos INT NOT NULL,      
  variacao_percent INT NOT NULL        
);

INSERT INTO tipo_senha VALUES
('SP','Prioritária', 1, 15*60, 33),
('SE','Exames', 2, 60, 45),  
('SG','Geral', 3,  5*60, 50);

CREATE TABLE guiche (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(20) NOT NULL
);

INSERT INTO guiche (nome) VALUES ('Guichê 1'),('Guichê 2'),('Guichê 3');

CREATE TABLE senha (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cod_senha VARCHAR(12) NOT NULL UNIQUE,
  codigo_tipo CHAR(2) NOT NULL REFERENCES tipo_senha(codigo),
  data_emissao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_atendimento DATETIME NULL,
  guiche_id INT NULL REFERENCES guiche(id),
  status ENUM('EMITIDA','ATENDIDA','DESCARTADA') NOT NULL DEFAULT 'EMITIDA'
);

SELECT* FROM senha;
ALTER TABLE senha ADD COLUMN tempo_medio INT;


