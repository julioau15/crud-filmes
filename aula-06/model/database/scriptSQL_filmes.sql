# Cria database do projeto de filmes
CREATE DATABASE IF NOT EXISTS db_filmes_20261_a;

# Ativa o database de filmes
USE db_filmes_20261_a;

DROP TABLE IF EXISTS tbl_filme;

CREATE TABLE IF NOT EXISTS tbl_filme (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(80) NOT NULL,
  data_lancamento date NOT NULL,
  duracao time NOT NULL,
  sinopse text NOT NULL,
  avaliacao decimal(3,2) DEFAULT NULL,
  valor decimal(5,2) NOT NULL DEFAULT '0.00',
  capa varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tbl_filme
	(nome,data_lancamento,duracao,sinopse,avaliacao,valor,capa)
	VALUES
		('Super Mario Galaxy: O Filme',
        '2026-04-02','01:39:00',
        'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
        3.00,
        50.70,
        'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg'),
		('Devoradores de Estrelas',
        '2026-03-19','02:37:00',
        'Devoradores de Estrelas acompanha a jornada inesquecível de um professor de ciências do ensino fundamental chamado Ryland Grace (Ryan Gosling). Um dia, Ryland acorda em uma espaçonave a anos-luz do planeta Terra. Sem memória alguma de quem é ou como foi parar ali, o professor se encontra numa situação inexplicável. Aos poucos, porém, suas lembranças voltam e ele recorda que foi recrutado para uma missão especial chamada Projeto Fim do Mundo na qual ele foi enviado a 11,9 anos-luz da Terra para investigar o motivo pelo qual o Sol está morrendo na Via Láctea. Ryland precisará recorrer aos seus conhecimentos científicos para resolver esse enigma o mais rápido possível e impedir a extinção da humanidade. O que, porém, parecia ser apenas uma trajetória solitária se transforma em uma viagem em companhia de uma amizade inesperada.',
        4.00,
        60.59,
        'https://br.web.img3.acsta.net/c_310_420/img/00/51/0051bc7965f851f46f856d4119741487.jpg'),
		('O Mago do Kremlin',
        '2026-04-09',
        '02:16:00',
        'Em O Mago do Kremlin, um jovem artista russo inesperadamente passa a frequentar o topo da cadeia governamental quando se transforma no conselheiro de Vladimir Putin no início de sua carreira política. Vadim Baranov é o seu nome, um cineasta que se torna produtor de TV e logo um funcionário do escritório de Relações Públicas do governo de Putin. Trabalhando no coração da administração de todo um país, Baranov conduz toda a sociedade como se fosse um grande reality show, mesclando verdades e mentiras, notícias com propagandas. A trama acompanha, então, o publicitário durante os anos finais da União Soviética e o turbulento início da formação da Federação Russa.',
        3.00,
        49.36,
        'https://br.web.img3.acsta.net/c_310_420/img/e5/13/e513d3089fbfc648852bcb6f15fa507f.jpg'),
		('Nuremberg',
        '2026-03-26',
        '02:29:00',
        'Nuremberg se passa no pós-Segunda Guerra, em 1945, na Alemanha, durante os julgamentos homônimos realizados pelas Forças Aliadas contra o regime nazista derrotado. A trama centra-se no psiquiatra americano Douglas Kelley (Rami Malek), designado a avaliar a aptidão mental de 22 oficiais nazistas que se tornaram prisioneiros e aguardam seus julgamentos por crimes de guerra. Ao mesmo tempo, o promotor-chefe dos Aliados Robert H. Jackson (Michael Shannon) fica encarregado da difícil tarefa de garantir que o regime nazista responda pelos horrores sem precedentes do Holocausto. Quando Douglas Kelly se encontra com Hermann Göring (Russell Crowe), o braço direito de Hitler, uma batalha internase inicia, fazendo com que toda a sua inteligência e ideologia sejam deixadas de lado para buscar entender a verdadeira origem e natureza do mal.',
        4.00,
        58.29,
        'https://br.web.img2.acsta.net/c_310_420/img/1d/cd/1dcdf09ac9767c4fb81f3b4ac239b533.jpg'),
		('O Poderoso Chefão',
        '1972-03-04',
        '02:55:00',
        'Don Vito Corleone (Marlon Brando) é o chefe de uma "família" de Nova York que está feliz, pois Connie (Talia Shire), sua filha, se casou com Carlo (Gianni Russo). Porém, durante a festa, Bonasera (Salvatore Corsitto) é visto no escritório de Don Corleone pedindo "justiça", vingança na verdade contra membros de uma quadrilha, que espancaram barbaramente sua filha por ela ter se recusado a fazer sexo para preservar a honra. Vito discute, mas os argumentos de Bonasera o sensibilizam e ele promete que os homens, que maltrataram a filha de Bonasera não serão mortos, pois ela também não foi, mas serão severamente castigados. Vito porém deixa claro que ele pode chamar Bonasera algum dia para devolver o "favor". Do lado de fora, no meio da festa, está o terceiro filho de Vito, Michael (Al Pacino), um capitão da marinha muito decorado que há pouco voltou da 2ª Guerra Mundial. Universitário educado, sensível e perceptivo, ele quase não é notado pela maioria dos presentes, com exceção de uma namorada da faculdade, Kay Adams (Diane Keaton), que não tem descendência italiana mas que ele ama. Em contrapartida há alguém que é bem notado, Johnny Fontane (Al Martino), um cantor de baladas românticas que provoca gritos entre as jovens que beiram a histeria. Don Corleone já o tinha ajudado, quando Johnny ainda estava em começo de carreira e estava preso por um contrato com o líder de uma grande banda, mas a carreira de Johnny deslanchou e ele queria fazer uma carreira solo. Por ser seu padrinho Vito foi procurar o líder da banda e ofereceu 10 mil dólares para deixar Johnny sair, mas teve o pedido recusado. Assim, no dia seguinte Vito voltou acompanhado por Luca Brasi (Lenny Montana), um capanga, e após uma hora ele assinou a liberação por apenas mil dólares, mas havia um detalhe: nas "negociações" Luca colocou uma arma na cabeça do líder da banda. Agora, no meio da alegria da festa, Johnny quer falar algo sério com Vito, pois precisa conseguir o principal papel em um filme para levantar sua carreira, mas o chefe do estúdio, Jack Woltz (John Marley), nem pensa em contratá-lo. Nervoso, Johnny começa a chorar e Vito, irritado, o esbofeteia, mas promete que ele conseguirá o almejado papel. Enquanto a festa continua acontecendo, Don Corleone comunica a Tom Hagen (Robert Duvall), seu filho adotivo que atua como conselheiro, que Carlo terá um emprego mas nada muito importante, e que os "negócios" não devem ser discutidos na sua frente. Os verdadeiros problemas começam para Vito quando Sollozzo (Al Lettieri), um gângster que tem apoio de uma família rival, encabeçada por Phillip Tattaglia (Victor Rendina) e seu filho Bruno (Tony Giorgio). Sollozzo, em uma reunião com Vito, Sonny e outros, conta para a família que ele pretende estabelecer um grande esquema de vendas de narcóticos em Nova York, mas exige permissão e proteção política de Vito para agir. Don Corleone odeia esta idéia, pois está satisfeito em operar com jogo, mulheres e proteção, mas isto será apenas a ponta do iceberg de uma mortal luta entre as "famílias".',
        5.00,
        73.57,
        'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg');

SELECT * FROM tbl_filme ORDER BY id desc;
#SELECT * FROM tbl_filme
#WHERE id = 1
#ORDER BY id DESC;

#TRUNCATE TABLE tbl_filme;


#UPDATE tbl_filme
#	SET nome = '',
#	data_lancamento = 2004-10-20,  
#	duracao = 1.3,
#	sinopse = '',
#	avaliacao = 1, 
#	valor = 1,
#  	capa = ''
#    WHERE id = 9
#    LIMIT 1;