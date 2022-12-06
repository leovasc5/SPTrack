-- DESCOMENTE CASO QUEIRA USAR UM BANCO ESPECIFICO --

-- CASO QUEIRA RODAR NO DOCKER --
CREATE USER 'sptrackClient'@'%' IDENTIFIED BY 'urubu100';
GRANT ALL PRIVILEGES ON SPTrack.* TO 'sptrackClient'@'%';

----- CASO QUEIRA RODAR LOCAL ---
--CREATE USER 'sptrackClient'@'localhost' IDENTIFIED BY 'urubu100';
--GRANT ALL PRIVILEGES ON SPTrack.* TO 'sptrackClient'@'localhost';

CREATE DATABASE SPTrack;
USE SPTrack;

CREATE TABLE instituicao(
	idInstituicao INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(120) NOT NULL,
    nomeFantasia VARCHAR(100) NOT NULL,
    cnpj VARCHAR (18) NOT NULL UNIQUE,
    cep CHAR(8) NOT NULL,
    estado VARCHAR (64) NOT NULL,
    complemento VARCHAR(128) NOT NULL,
    cidade VARCHAR(64) NOT NULL,
    bairro VARCHAR(64) NOT NULL,
    logradouro VARCHAR(64) NOT NULL,
    numero CHAR(6) NOT NULL,
    dataRegisto DATETIME NOT NULL
) AUTO_INCREMENT = 1000;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    senha VARCHAR(65) NOT NULL,
    tipoUsuario VARCHAR(45) NOT NULL,
    dataRegisto DATETIME NOT NULL,
	nivelAcesso INT NOT NULL,

    fkInstituicao INT NOT NULL,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao),
    
    fkGestor INT,
    FOREIGN KEY (fkGestor) REFERENCES usuario(IdUsuario)
) AUTO_INCREMENT = 10000;

CREATE TABLE sala(
	idSala INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(64),

    fkInstituicao INT NOT NULL,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao)
) AUTO_INCREMENT = 1;

CREATE TABLE equipamento(
	idEquipamento INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(64),
    sistemaOperacional VARCHAR(64),
    numeroPatrimonio VARCHAR(12) UNIQUE,
    numeroSerial VARCHAR(64) UNIQUE,
    dataRegistro DATETIME,
    
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
) AUTO_INCREMENT = 100000;

CREATE TABLE componente(
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL,
    unidadeMedida VARCHAR(64) NOT NULL,
    capacidade INT NOT NULL,
    tipo VARCHAR(64) NOT NULL,
    
    fkEquipamento INT,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
) AUTO_INCREMENT = 200000;

CREATE TABLE medida(
	idMedida INT PRIMARY KEY AUTO_INCREMENT,
    valor FLOAT NOT NULL,
    dataRegistro DATETIME NOT NULL,
    
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES componente (idComponente)
) AUTO_INCREMENT = 300000;

CREATE TABLE locacao(
	fkEquipamento INT NOT NULL,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento),
    
    fkSala INT NOT NULL,
    FOREIGN KEY (fkSala) REFERENCES sala(idSala),
    
    dtEstadia DATETIME NOT NULL,
    PRIMARY KEY (fkEquipamento, fkSala, dtEstadia)
) AUTO_INCREMENT = 500;

CREATE TABLE historico(
	fkEquipamento INT NOT NULL,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento),
    
    fkSala INT NOT NULL,
    FOREIGN KEY (fkSala) REFERENCES sala(idSala),
    
    dtRegistro DATETIME NOT NULL,
    PRIMARY KEY (fkEquipamento, fkSala, dtRegistro)
);

CREATE TABLE manutencao(
	idManutencao INT PRIMARY KEY AUTO_INCREMENT,
    dtInicio DATETIME NOT NULL,
    dtFim DATETIME,
    situacao VARCHAR(10) CHECK (situacao IN ('Aberto', 'Finalizado')) NOT NULL,
    descricao VARCHAR(128) NOT NULL,

    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    
    fkEquipamento INT,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
) AUTO_INCREMENT = 5000;

CREATE TABLE disponibilidade(
    idDisponibilidade INT PRIMARY KEY AUTO_INCREMENT,
    valor FLOAT NOT NULL,
    dataRegistro DATETIME NOT NULL,
    
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
) AUTO_INCREMENT = 1500;

CREATE TABLE estadoDeUso(
    idEstadoDeUso INT PRIMARY KEY AUTO_INCREMENT,
    mb INT NOT NULL,
    b INT NOT NULL,
    r INT NOT NULL,
    a INT NOT NULL,
    dataRegistro DATETIME NOT NULL,
    
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
) AUTO_INCREMENT = 1500;

CREATE TABLE infoChamados(
    idInfo INT PRIMARY KEY AUTO_INCREMENT,
    quantidadeChamados INT NOT NULL,
    quantidadeChamadosTriagem INT NOT NULL,
    quantidadeChamadosAtendimento INT NOT NULL,
    quantidadeChamadosEscalar INT NOT NULL,
    quantidadeChamadosConcluidos INT NOT NULL,
    quantidadeChamadosAbertos INT NOT NULL,
    quantidadeChamadosArquivados INT NOT NULL,
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
) AUTO_INCREMENT = 3000;


CREATE TABLE tarefa(
    idTarefa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL,
    descricao VARCHAR(256) NOT NULL,
    dataInicio DATETIME NOT NULL,
    dataFim DATETIME,
    isDomingo TINYINT CHECK (isDomingo IN (0, 1)) NOT NULL,
    isSegunda TINYINT CHECK (isSegunda IN (0, 1)) NOT NULL,
    isTerca TINYINT CHECK (isTerca IN (0, 1)) NOT NULL,
    isQuarta TINYINT CHECK (isQuarta IN (0, 1)) NOT NULL,
    isQuinta TINYINT CHECK (isQuinta IN (0, 1)) NOT NULL,
    isSexta TINYINT CHECK (isSexta IN (0, 1)) NOT NULL,
    isSabado TINYINT CHECK (isSabado IN (0, 1)) NOT NULL,

    horarioInicioDomingo TIME,
    horarioFimDomingo TIME,
    horarioInicioSegunda TIME,
    horarioFimSegunda TIME,
    horarioInicioTerca TIME,
    horarioFimTerca TIME,
    horarioInicioQuarta TIME,
    horarioFimQuarta TIME,
    horarioInicioQuinta TIME,
    horarioFimQuinta TIME,
    horarioInicioSexta TIME,
    horarioFimSexta TIME,
    horarioInicioSabado TIME,
    horarioFimSabado TIME,

    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
) AUTO_INCREMENT = 4000;

CREATE TABLE tarefaXequipamento(
    fkTarefa INT NOT NULL,
    fkEquipamento INT NOT NULL,
    PRIMARY KEY(fkTarefa, fkEquipamento),

    FOREIGN KEY (fkTarefa) REFERENCES tarefa(idTarefa),
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
) AUTO_INCREMENT = 50000;

CREATE TABLE medidaTarefa(
    idMedida INT PRIMARY KEY AUTO_INCREMENT,
    valor FLOAT NOT NULL,
    dataRegistro DATETIME NOT NULL,
    
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES componente (idComponente),

    fkTarefa INT,
    FOREIGN KEY (fkTarefa) REFERENCES tarefa (idTarefa)
) AUTO_INCREMENT = 600000;

CREATE TABLE chamado(
	idChamado INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	tipoProblema INT,
	dataChamado DATETIME,
	fkEquipamento INT,
	
	FOREIGN KEY (fkEquipamento) REFERENCES equipamento (idEquipamento)
) AUTO_INCREMENT = 2000000;
create table processos(
	idLeitura int primary key auto_increment,
	so varchar(15),
	arquivos varchar(45),
	tipoProcesso char(9)
	)auto_increment=1;

create table processosMortos(
	id int primary key auto_increment,
	nome varchar(45),
	horas datetime
	)auto_increment=1;
CREATE VIEW `vw_medidasInstituicao` AS
SELECT medida.idMedida, componente.tipo, componente.unidadeMedida, medida.valor, instituicao.idInstituicao, medida.dataRegistro AS dataRegistro
FROM instituicao JOIN equipamento ON equipamento.fkInstituicao = instituicao.idInstituicao 
JOIN componente ON componente.fkEquipamento = equipamento.idEquipamento JOIN medida ON medida.fkComponente = componente.idComponente;

CREATE VIEW `vw_medidasEquipamento` AS
SELECT medida.idMedida, componente.tipo, componente.unidadeMedida, medida.valor, equipamento.idEquipamento, medida.dataRegistro AS dataRegistro
FROM instituicao JOIN equipamento ON equipamento.fkInstituicao = instituicao.idInstituicao 
JOIN componente ON componente.fkEquipamento = equipamento.idEquipamento JOIN medida ON medida.fkComponente = componente.idComponente;

CREATE VIEW `vw_medidas7dias` AS
SELECT equipamento.modelo, componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro, equipamento.idEquipamento
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
WHERE instituicao.idInstituicao = idInstituicao AND medida.dataRegistro >= DATE(NOW() - INTERVAL 7 DAY)
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento AND
equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro;

CREATE VIEW `vw_medida60s` AS
SELECT equipamento.modelo, componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro, equipamento.idEquipamento
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
WHERE instituicao.idInstituicao = idInstituicao AND medida.dataRegistro >= DATE(NOW() - INTERVAL 1 MINUTE)
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento AND
equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro;

CREATE VIEW `vw_manutencao_por_sala` AS
SELECT idSala, nome, COUNT((SELECT count(manutencao.fkEquipamento) 
FROM manutencao WHERE situacao = 'Aberto')) AS qtd FROM sala, locacao, 
manutencao, equipamento, instituicao WHERE idEquipamento = manutencao.fkEquipamento 
AND fkSala = idSala and manutencao.fkEquipamento = locacao.fkEquipamento
GROUP BY idSala;

-------------- ZONA DE TESTES --------------
--------(Executar apenas após cadastro)-------

INSERT INTO equipamento VALUES (NULL, 'HP Prata', 'Windows','3892','BRG383084F', NOW(), 1000);
INSERT INTO componente VALUES (NULL, 'I5 11º Gen', '%', 100, 'Processador', 100000);
INSERT INTO componente VALUES (NULL, 'Pente 4x4 - 8GB', 'GB', 8, 'Memória RAM', 100000);
INSERT INTO componente VALUES (NULL, 'HD SamDisk', 'MB', 100000,'Disco Rígido', 100000);

INSERT INTO equipamento VALUES (NULL, 'Dell Preto', 'Linux','3312','BRG381284F', NOW(), 1000);
INSERT INTO componente VALUES (NULL, 'AMD neon Xtr', '%', 100, 'Processador', 100001);
INSERT INTO componente VALUES (NULL, 'Pente 8x4 - 12GB', 'GB', 12, 'Memória RAM', 100001);
INSERT INTO componente VALUES (NULL, 'SSD 256GB SATA', 'MB', 100000, 'Disco Rígido', 100001);

INSERT INTO equipamento VALUES (NULL, 'Acer Prata', 'Linux','3586','BRG323283F', NOW(), 1000);
INSERT INTO componente VALUES (NULL, 'I7 8º Gen', '%', 100, 'Processador', 100002);
INSERT INTO componente VALUES (NULL, 'Pente 4x4 - 8GB', 'GB', 8, 'Memória RAM', 100002);
INSERT INTO componente VALUES (NULL, 'HD SamDisk', 'MB', 100000, 'Disco Rígido', 100002);

INSERT INTO equipamento VALUES (NULL, 'Samsung Diamante', 'Windows','3526','BRG323433F', NOW(), 1000);
INSERT INTO componente VALUES (NULL, 'I9 11º Gen', '%', 100, 'Processador', 100003);
INSERT INTO componente VALUES (NULL, 'Pente 8x8 - 16GB', 'GB', 16, 'Memória RAM', 100003);
INSERT INTO componente VALUES (NULL, 'SSD 100GB SATA', 'MB', 100000, 'Disco Rígido', 100003);

INSERT INTO equipamento VALUES (NULL, 'Acer 212', 'Windows','3516','BRG213433F', NOW(), 1000);
INSERT INTO componente VALUES (NULL, 'I9 11º Gen', '%', 100, 'Processador', 100004);
INSERT INTO componente VALUES (NULL, 'Pente 8x8 - 16GB', 'GB', 16, 'Memória RAM', 100004);
INSERT INTO componente VALUES (NULL, 'SSD 256GB SATA', 'MB', 256000, 'Disco Rígido', 100004);

INSERT INTO equipamento VALUES (NULL, 'Dell XP22', 'Linux','3515','BRG256433F', NOW(), 1000);
INSERT INTO componente VALUES (NULL, 'I5 11º Gen', '%', 100, 'Processador', 100005);
INSERT INTO componente VALUES (NULL, 'Pente 8x0 - 8GB', 'GB', 8, 'Memória RAM', 100005);
INSERT INTO componente VALUES (NULL, 'SSD 500GB SATA', 'MB', 256000, 'Disco Rígido', 100005);

INSERT INTO manutencao VALUES (NULL, NOW(), '2022-10-18 02:18:25', 'Aberto', 
'O visor da tela da máquina Dell XP22 está ruim', 10000, 100005);

INSERT INTO manutencao VALUES (NULL, NOW(), '2022-10-16 02:18:25', 'Aberto', 
'O aluno destruiu o root', 10000, 100003);

select * from locacao;
INSERT INTO locacao VALUES (100000, 1, NOW());
INSERT INTO locacao VALUES (100001, 1, NOW());

INSERT INTO sala VALUES (NULL, 'Sala de SI', 1000);
INSERT INTO locacao VALUES (100002, 2, NOW());
INSERT INTO locacao VALUES (100003, 2, NOW());

INSERT INTO sala VALUES (NULL, 'Sala de CCO', 1000);
INSERT INTO locacao VALUES (100004, 3, NOW());
INSERT INTO locacao VALUES (100005, 3, NOW());

INSERT INTO disponibilidade VALUES (NULL, 89.5, '2022-11-09 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 82.1, '2022-11-10 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 77.0, '2022-11-11 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 73.6, '2022-11-12 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 81.7, '2022-11-13 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 75.5, '2022-11-14 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 81.5, '2022-11-15 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 81.5, '2022-11-16 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 88.5, '2022-11-17 10:47:41', 1000);

INSERT INTO estadoDeUso VALUES(NULL, 2, 3, 1, 0, '2022-11-05 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 3, 2, 1, 0, '2022-11-06 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 4, 2, 0, 0, '2022-11-07 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 5, 0, 1, 0, '2022-11-08 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 6, 0, 0, 0, '2022-11-09 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 4, 1, 1, 0, '2022-11-10 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 5, 1, 0, 0, '2022-11-11 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 2, 2, 1, 1, '2022-11-12 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 3, 3, 0, 0, '2022-11-13 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 1, 4, 1, 0, '2022-11-14 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 1, 4, 1, 0, '2022-11-15 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 1, 4, 1, 0, '2022-11-16 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 1, 4, 1, 0, '2022-11-17 04:29:11', 1000);


SELECT * FROM usuario;

select * from equipamento;
    
select * from vw_manutencao_por_sala;






INSERT INTO disponibilidade VALUES (NULL, 89.5, '2022-11-18 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 82.1, '2022-11-19 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 77.0, '2022-11-20 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 73.6, '2022-11-21 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 81.7, '2022-11-22 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 75.5, '2022-11-23 10:47:41', 1000);
INSERT INTO disponibilidade VALUES (NULL, 81.5, '2022-11-24 10:47:41', 1000);

INSERT INTO estadoDeUso VALUES(NULL, 4, 1, 1, 0, '2022-11-18 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 5, 1, 0, 0, '2022-11-19 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 2, 2, 1, 1, '2022-11-20 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 3, 3, 0, 0, '2022-11-21 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 1, 4, 1, 0, '2022-11-22 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 1, 4, 1, 0, '2022-11-23 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 1, 4, 1, 0, '2022-11-24 04:29:11', 1000);
INSERT INTO estadoDeUso VALUES(NULL, 1, 4, 1, 0, '2022-11-25 04:29:11', 1000);

INSERT INTO infoChamados VALUES(1,0,0,0,0,0,0,0,1000); 