-- Rodar na aba SQL do phpMyAdmin (ou no MySQL), antes de subir o Spring.

-- Criar o banco de dados
CREATE DATABASE banco CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE banco;

-- Tabela de contas
CREATE TABLE conta (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    cpf VARCHAR(255) UNIQUE,
    senha VARCHAR(255),
    saldo DOUBLE NOT NULL,
    PRIMARY KEY (id)
);

-- Tabela de movimentações (extrato)
CREATE TABLE movimentacao (
    id BIGINT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(255),
    valor DOUBLE NOT NULL,
    data_hora DATETIME(6),
    conta_id BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (conta_id) REFERENCES conta (id)
);
