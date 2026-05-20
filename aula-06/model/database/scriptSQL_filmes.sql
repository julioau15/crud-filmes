DROP DATABASE IF EXISTS db_filmes_20261_a;

# Cria database do projeto de filmes
CREATE DATABASE IF NOT EXISTS db_filmes_20261_a;

# Ativa o database de filmes
USE db_filmes_20261_a;

# Cria tabela tbl_genero
CREATE TABLE IF NOT EXISTS tbl_genero (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    genero VARCHAR(50) NOT NULL
);

# Cria tabela tbl_classificacao
CREATE TABLE IF NOT EXISTS tbl_classificacao (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    simbolo VARCHAR(3) NOT NULL,
    classificacao VARCHAR(80) NOT NULL,
    descricao VARCHAR(250) NOT NULL
);

# Cria tabela tbl_nacionalidade
CREATE TABLE IF NOT EXISTS tbl_nacionalidade (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pais VARCHAR(100) NOT NULL,
    sigla VARCHAR(5)
);

# Cria tabela tbl_atividade
CREATE TABLE IF NOT EXISTS tbl_atividade (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

# Cria tabela tbl_diretor
CREATE TABLE IF NOT EXISTS tbl_diretor (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_falecimento DATE,
    ativo BOOLEAN NOT NULL,
    biografia VARCHAR(250) NOT NULL,
    foto VARCHAR(255)
);

# Cria tabela tbl_ator
CREATE TABLE IF NOT EXISTS tbl_ator (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_falecimento DATE,
    ativo BOOLEAN NOT NULL,
    biografia VARCHAR(250) NOT NULL,
    foto VARCHAR(255)
);

# Cria tabela tbl_filme
CREATE TABLE IF NOT EXISTS tbl_filme (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    data_lancamento DATE NOT NULL,
    duracao TIME NOT NULL,
    sinopse TEXT NOT NULL,
    avaliacao DECIMAL(3,2) DEFAULT NULL,
    valor DECIMAL(5,2) NOT NULL DEFAULT '0.00',
    capa VARCHAR(255) DEFAULT NULL,
    id_classificacao INT NOT NULL,
    
    CONSTRAINT FK_CLASSIFICACAO_FILME
    FOREIGN KEY (id_classificacao)
    REFERENCES tbl_classificacao (id)
);

# Cria tabela tbl_filme_genero
CREATE TABLE IF NOT EXISTS tbl_filme_genero (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    id_genero INT NOT NULL,
    
    CONSTRAINT FK_FILME_FILMEGENERO
    FOREIGN KEY (id_filme)
    REFERENCES tbl_filme (id),
    
    CONSTRAINT FK_GENERO_FILMEGENERO
    FOREIGN KEY (id_genero)
    REFERENCES tbl_genero (id)
);

# Cria tabela tbl_filme_ator
CREATE TABLE IF NOT EXISTS tbl_filme_ator (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    id_ator INT NOT NULL,
    
    CONSTRAINT FK_FILME_FILMEATOR
    FOREIGN KEY (id_filme)
    REFERENCES tbl_filme (id),
    
    CONSTRAINT FK_ATOR_FILMEATOR
    FOREIGN KEY (id_ator)
    REFERENCES tbl_ator (id)
);

# Cria tabela tbl_filme_diretor
CREATE TABLE IF NOT EXISTS tbl_filme_diretor (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    id_diretor INT NOT NULL,
    
    CONSTRAINT FK_FILME_FILMEDIRETOR
    FOREIGN KEY (id_filme)
    REFERENCES tbl_filme (id),
    
    CONSTRAINT FK_DIRETOR_FILMEDIRETOR
    FOREIGN KEY (id_diretor)
    REFERENCES tbl_diretor (id)
);

# Cria tabela tbl_diretor_nacionalidade
CREATE TABLE IF NOT EXISTS tbl_diretor_nacionalidade (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_diretor INT NOT NULL,
    id_nacionalidade INT NOT NULL,
    
    CONSTRAINT FK_DIRETOR_DIRETORNACIONALIDADE
    FOREIGN KEY (id_diretor)
    REFERENCES tbl_diretor (id),
    
    CONSTRAINT FK_NACIONALIDADE_DIRETORNACIONALIDADE
    FOREIGN KEY (id_nacionalidade)
    REFERENCES tbl_nacionalidade (id)
);

# Cria tabela tbl_ator_nacionalidade
CREATE TABLE IF NOT EXISTS tbl_ator_nacionalidade (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ator INT NOT NULL,
    id_nacionalidade INT NOT NULL,
    
    CONSTRAINT FK_ATOR_ATORNACIONALIDADE
    FOREIGN KEY (id_ator)
    REFERENCES tbl_ator (id),
    
    CONSTRAINT FK_NACIONALIDADE_ATORNACIONALIDADE
    FOREIGN KEY (id_nacionalidade)
    REFERENCES tbl_nacionalidade (id)
);

# Cria tabela tbl_ator_atividade
CREATE TABLE IF NOT EXISTS tbl_ator_atividade (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ator INT NOT NULL,
    id_atividade INT NOT NULL,
    
    CONSTRAINT FK_ATOR_ATORATIVIDADE
    FOREIGN KEY (id_ator)
    REFERENCES tbl_ator (id),
    
    CONSTRAINT FK_ATIVIDADE_ATORATIVIDADE
    FOREIGN KEY (id_atividade)
    REFERENCES tbl_atividade (id)
);

# Cria tabela tbl_diretor_atividade
CREATE TABLE IF NOT EXISTS tbl_diretor_atividade (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_diretor INT NOT NULL,
    id_atividade INT NOT NULL,
    
    CONSTRAINT FK_DIRETOR_DIRETORATIVIDADE
    FOREIGN KEY (id_diretor)
    REFERENCES tbl_diretor (id),
    
    CONSTRAINT FK_ATIVIDADE_DIRETORATIVIDADE
    FOREIGN KEY (id_atividade)
    REFERENCES tbl_atividade (id)
);

# INSERTS tbl_classificacao
INSERT INTO tbl_classificacao (simbolo, classificacao, descricao) VALUES
('L', 'Livre para todas as idades', 'Conteúdo livre para todos os públicos.'),
('10', 'Não recomendado para menores de 10 anos', 'Violência leve e linguagem imprópria.'),
('12', 'Não recomendado para menores de 12 anos', 'Cenas de tensão moderada.'),
('14', 'Não recomendado para menores de 14 anos', 'Temas sensíveis e violência moderada.'),
('16', 'Não recomendado para menores de 16 anos', 'Violência intensa e drogas lícitas.'),
('18', 'Não recomendado para menores de 18 anos', 'Conteúdo adulto e violência extrema.');

# INSERTS tbl_genero
INSERT INTO tbl_genero (genero) VALUES
('Ação'),
('Comédia'),
('Drama'),
('Ficção Científica'),
('Terror'),
('Romance'),
('Suspense'),
('Fantasia'),
('Animação'),
('Documentário'),
('Aventura'),
('Musical'),
('Guerra'),
('Crime'),
('Mistério');

# INSERTS tbl_nacionalidade
INSERT INTO tbl_nacionalidade (pais, sigla) VALUES
('Brasil', 'BR'),
('Estados Unidos', 'US'),
('Canadá', 'CA'),
('Japão', 'JP'),
('França', 'FR'),
('Alemanha', 'DE'),
('Itália', 'IT'),
('Espanha', 'ES'),
('Coreia do Sul', 'KR'),
('China', 'CN'),
('México', 'MX'),
('Argentina', 'AR'),
('Portugal', 'PT'),
('Austrália', 'AU'),
('Reino Unido', 'UK');

# INSERTS tbl_atividade
INSERT INTO tbl_atividade (nome) VALUES
('Ator'),
('Diretor'),
('Produtor'),
('Roteirista'),
('Dublador'),
('Cineasta'),
('Editor'),
('Fotógrafo'),
('Compositor'),
('Animador');

# INSERTS tbl_diretor
INSERT INTO tbl_diretor
(nome, data_nascimento, data_falecimento, ativo, biografia, foto)
VALUES
('Christopher Nolan', '1970-07-30', NULL, true, 'Diretor britânico conhecido por filmes complexos.', 'https://exemplo.com/nolan.jpg'),
('Steven Spielberg', '1946-12-18', NULL, true, 'Diretor renomado de Hollywood.', 'https://exemplo.com/spielberg.jpg'),
('Quentin Tarantino', '1963-03-27', NULL, true, 'Diretor famoso por violência estilizada.', 'https://exemplo.com/tarantino.jpg'),
('Hayao Miyazaki', '1941-01-05', NULL, true, 'Criador de animações japonesas famosas.', 'https://exemplo.com/miyazaki.jpg'),
('James Cameron', '1954-08-16', NULL, true, 'Diretor de Titanic e Avatar.', 'https://exemplo.com/cameron.jpg');

# INSERTS tbl_ator
INSERT INTO tbl_ator
(nome, data_nascimento, data_falecimento, ativo, biografia, foto)
VALUES
('Leonardo DiCaprio', '1974-11-11', NULL, true, 'Ator vencedor do Oscar.', 'https://exemplo.com/dicaprio.jpg'),
('Scarlett Johansson', '1984-11-22', NULL, true, 'Atriz famosa da Marvel.', 'https://exemplo.com/scarlett.jpg'),
('Tom Hanks', '1956-07-09', NULL, true, 'Ator premiado de dramas.', 'https://exemplo.com/tomhanks.jpg'),
('Keanu Reeves', '1964-09-02', NULL, true, 'Ator de Matrix.', 'https://exemplo.com/keanu.jpg'),
('Emma Watson', '1990-04-15', NULL, true, 'Atriz de Harry Potter.', 'https://exemplo.com/emma.jpg');

# INSERTS tbl_filme
INSERT INTO tbl_filme
(nome, data_lancamento, duracao, sinopse, avaliacao, valor, capa, id_classificacao)
VALUES
('Interestelar', '2014-11-06', '02:49:00', 'A humanidade busca um novo lar entre as estrelas.', 5.00, 45.90, 'https://exemplo.com/interestelar.jpg', 4),
('Titanic', '1997-12-19', '03:14:00', 'Romance trágico a bordo do Titanic.', 5.00, 39.99, 'https://exemplo.com/titanic.jpg', 4),
('Avatar', '2009-12-18', '02:42:00', 'Exploração do planeta Pandora.', 4.50, 55.50, 'https://exemplo.com/avatar.jpg', 3),
('Matrix', '1999-03-31', '02:16:00', 'Um hacker descobre a verdade sobre a realidade.', 5.00, 37.90, 'https://exemplo.com/matrix.jpg', 5),
('Harry Potter e a Pedra Filosofal', '2001-11-16', '02:32:00', 'Um garoto descobre ser um bruxo.', 4.90, 41.80, 'https://exemplo.com/harrypotter.jpg', 2);

# INSERTS tbl_filme_genero
INSERT INTO tbl_filme_genero
(id_filme, id_genero)
VALUES
(1, 4),
(1, 11),
(2, 6),
(2, 3),
(3, 4),
(3, 11),
(4, 4),
(4, 1),
(5, 8),
(5, 11);

# INSERTS tbl_filme_ator
INSERT INTO tbl_filme_ator
(id_filme, id_ator)
VALUES
(1, 1),
(2, 3),
(3, 2),
(4, 4),
(5, 5);

# INSERTS tbl_filme_diretor
INSERT INTO tbl_filme_diretor
(id_filme, id_diretor)
VALUES
(1, 1),
(2, 5),
(3, 5),
(4, 1),
(5, 2);

# INSERTS tbl_diretor_nacionalidade
INSERT INTO tbl_diretor_nacionalidade
(id_diretor, id_nacionalidade)
VALUES
(1, 15),
(2, 2),
(3, 2),
(4, 4),
(5, 3);

# INSERTS tbl_ator_nacionalidade
INSERT INTO tbl_ator_nacionalidade
(id_ator, id_nacionalidade)
VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 3),
(5, 15);

# INSERTS tbl_ator_atividade
INSERT INTO tbl_ator_atividade
(id_ator, id_atividade)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 5);

# INSERTS tbl_diretor_atividade
INSERT INTO tbl_diretor_atividade
(id_diretor, id_atividade)
VALUES
(1, 2),
(2, 2),
(3, 4),
(4, 10),
(5, 3);

SELECT * FROM tbl_filme order by id desc;