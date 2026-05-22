/*************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API de Filmes
 * Data: 15/04/2026
 * Autor: Julio Augusto
 * Versão: 1.0.4.26
 * *********************************************************************************/

// IMPORT das dependências para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// IMPORT das funções
const {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
} = require('./controller/filme/controller_filme.js')
const { 
    inserirNovoGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero
} = require('./controller/genero/controller_genero.js')
const { 
    inserirNovaAtividade,
    atualizarAtividade,
    listarAtividade,
    buscarAtividade,
    excluirAtividade
} = require('./controller/atividade/controller_atividade.js')
const { 
    inserirNovaNacionalidade,
    atualizarNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade
} = require('./controller/nacionalidade/controller_nacionalidade.js')
const { 
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao
} = require('./controller/classificacao/controller_classificacao.js')
const { 
    inserirNovoAtor,
    atualizarAtor,
    listarAtor,
    buscarAtor,
    excluirAtor
} = require('./controller/ator/controller_ator.js')
const { 
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretor,
    buscarDiretor,
    excluirDiretor
} = require('./controller/diretor/controller_diretor.js')

// Criando um objeto para manipular o EXPRESS
const app = express()

// Porta onde a API esta rodando
const port = 8080

// Conjuntos de Permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'], // Origem da requisição (quem pode fazer a requisição) podendo ser o IP ou '*'
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Verbos que serão liberados na API
    allowedHeaders: ['Content-type', 'Autorization'] // Permissões de cabeçalho do cors
}

// Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

// Configura as permissões da API através do CORS
app.use(cors(corsOptions))

const DOC_API = {
    project: "Locadora de Filmes",
    description: "API para manipular dados da locadora de filmes",
    date: "2026-04-15",
    version: "1.0.4.26",
    developer: "Julio Augusto",
    endpoints: {

        filme: {
            POST: {
                route: "/v1/senai/locadora/filme",
                description: "Insere um novo filme."
            },
            GET_ALL: {
                route: "/v1/senai/locadora/filme",
                description: "Retorna todos os filmes."
            },
            GET_BY_ID: {
                route: "/v1/senai/locadora/filme/:id",
                description: "Retorna um filme pelo ID."
            },
            PUT: {
                route: "/v1/senai/locadora/filme/:id",
                description: "Atualiza um filme pelo ID."
            },
            DELETE: {
                route: "/v1/senai/locadora/filme/:id",
                description: "Remove um filme pelo ID."
            }
        },

        genero: {
            POST: {
                route: "/v1/senai/locadora/genero",
                description: "Insere um novo gênero."
            },
            GET_ALL: {
                route: "/v1/senai/locadora/genero",
                description: "Retorna todos os gêneros."
            },
            GET_BY_ID: {
                route: "/v1/senai/locadora/genero/:id",
                description: "Retorna um gênero pelo ID."
            },
            PUT: {
                route: "/v1/senai/locadora/genero/:id",
                description: "Atualiza um gênero pelo ID."
            },
            DELETE: {
                route: "/v1/senai/locadora/genero/:id",
                description: "Remove um gênero pelo ID."
            }
        },

        atividade: {
            POST: {
                route: "/v1/senai/locadora/atividade",
                description: "Insere uma nova atividade."
            },
            GET_ALL: {
                route: "/v1/senai/locadora/atividade",
                description: "Retorna todas as atividades."
            },
            GET_BY_ID: {
                route: "/v1/senai/locadora/atividade/:id",
                description: "Retorna uma atividade pelo ID."
            },
            PUT: {
                route: "/v1/senai/locadora/atividade/:id",
                description: "Atualiza uma atividade pelo ID."
            },
            DELETE: {
                route: "/v1/senai/locadora/atividade/:id",
                description: "Remove uma atividade pelo ID."
            }
        },

        nacionalidade: {
            POST: {
                route: "/v1/senai/locadora/nacionalidade",
                description: "Insere uma nova nacionalidade."
            },
            GET_ALL: {
                route: "/v1/senai/locadora/nacionalidade",
                description: "Retorna todas as nacionalidades."
            },
            GET_BY_ID: {
                route: "/v1/senai/locadora/nacionalidade/:id",
                description: "Retorna uma nacionalidade pelo ID."
            },
            PUT: {
                route: "/v1/senai/locadora/nacionalidade/:id",
                description: "Atualiza uma nacionalidade pelo ID."
            },
            DELETE: {
                route: "/v1/senai/locadora/nacionalidade/:id",
                description: "Remove uma nacionalidade pelo ID."
            }
        },

        classificacao: {
            POST: {
                route: "/v1/senai/locadora/classificacao",
                description: "Insere uma nova classificação."
            },
            GET_ALL: {
                route: "/v1/senai/locadora/classificacao",
                description: "Retorna todas as classificações."
            },
            GET_BY_ID: {
                route: "/v1/senai/locadora/classificacao/:id",
                description: "Retorna uma classificação pelo ID."
            },
            PUT: {
                route: "/v1/senai/locadora/classificacao/:id",
                description: "Atualiza uma classificação pelo ID."
            },
            DELETE: {
                route: "/v1/senai/locadora/classificacao/:id",
                description: "Remove uma classificação pelo ID."
            }
        },

        ator: {
            POST: {
                route: "/v1/senai/locadora/ator",
                description: "Insere um novo ator."
            },
            GET_ALL: {
                route: "/v1/senai/locadora/ator",
                description: "Retorna todos os atores."
            },
            GET_BY_ID: {
                route: "/v1/senai/locadora/ator/:id",
                description: "Retorna um ator pelo ID."
            },
            PUT: {
                route: "/v1/senai/locadora/ator/:id",
                description: "Atualiza um ator pelo ID."
            },
            DELETE: {
                route: "/v1/senai/locadora/ator/:id",
                description: "Remove um ator pelo ID."
            }
        },

        diretor: {
            POST: {
                route: "/v1/senai/locadora/diretor",
                description: "Insere um novo diretor."
            },
            GET_ALL: {
                route: "/v1/senai/locadora/diretor",
                description: "Retorna todos os diretores."
            },
            GET_BY_ID: {
                route: "/v1/senai/locadora/diretor/:id",
                description: "Retorna um diretor pelo ID."
            },
            PUT: {
                route: "/v1/senai/locadora/diretor/:id",
                description: "Atualiza um diretor pelo ID."
            },
            DELETE: {
                route: "/v1/senai/locadora/diretor/:id",
                description: "Remove um diretor pelo ID."
            }
        }
    }
}
// Raiz da API
app.get('/help', (req,res) => {
    res.status(200).json(DOC_API)
})

// ---------------- Filme -----------------

// endpoint para inserir filme
app.post('/v1/senai/locadora/filme',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoFilme(dados,contentType)
    res.status(result.status_code).json(result)
})

// endpoint para retornar todos filmes
app.get('/v1/senai/locadora/filme', async (req,res) => {
    let result = await listarFilme()
    res.status(result.status_code).json(result)
})

// endpoint para buscar um filme pelo id
app.get('/v1/senai/locadora/filme/:id', async (req,res) => {
    let id = req.params.id
    let result = await buscarFilme(id)
    res.status(result.status_code).json(result)
})

// endpoint para atualizar um filme pelo id
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async (req,res) => {
    let id          = req.params.id                 // Recebe o id por parametro
    let dados       = req.body                      // Recebe os dados do body da requisição
    let contentType = req.headers['content-type']   // Recebe o ContentType do header da requisição
    
    let result      = await atualizarFilme(dados, id, contentType)
    res.status(result.status_code).json(result)
})

// endpoint para deletar um filme pelo id
app.delete('/v1/senai/locadora/filme/:id', async (req,res) => {
    let id = req.params.id
    let result = await excluirFilme(id)
    res.status(result.status_code).json(result)
})

// ---------------- GENERO -----------------

// endpoint para inserir genero
app.post('/v1/senai/locadora/genero',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoGenero(dados,contentType)
    res.status(result.status_code).json(result)
})

// endpoint para retornar todos filmes
app.get('/v1/senai/locadora/genero', async (req,res) => {
    let result = await listarGenero()
    res.status(result.status_code).json(result)
})

// endpoint para buscar um genero pelo id
app.get('/v1/senai/locadora/genero/:id', async (req,res) => {
    let id = req.params.id
    let result = await buscarGenero(id)
    res.status(result.status_code).json(result)
})

// endpoint para atualizar um genero pelo id
app.put('/v1/senai/locadora/genero/:id', bodyParserJSON, async (req,res) => {
    let id          = req.params.id                 // Recebe o id por parametro
    let dados       = req.body                      // Recebe os dados do body da requisição
    let contentType = req.headers['content-type']   // Recebe o ContentType do header da requisição
    
    let result      = await atualizarGenero(dados, id, contentType)
    res.status(result.status_code).json(result)
})

// endpoint para deletar um genero pelo id
app.delete('/v1/senai/locadora/genero/:id', async (req,res) => {
    let id = req.params.id
    let result = await excluirGenero(id)
    res.status(result.status_code).json(result)
})

// ---------------- Atividade -----------------

// endpoint para inserir atividade
app.post('/v1/senai/locadora/atividade',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovaAtividade(dados,contentType)
    res.status(result.status_code).json(result)
})

// endpoint para retornar todas atividades
app.get('/v1/senai/locadora/atividade', async (req,res) => {
    let result = await listarAtividade()
    res.status(result.status_code).json(result)
})

// endpoint para buscar um atividade pelo id
app.get('/v1/senai/locadora/atividade/:id', async (req,res) => {
    let id = req.params.id
    let result = await buscarAtividade(id)
    res.status(result.status_code).json(result)
})

// endpoint para atualizar uma atividade pelo id
app.put('/v1/senai/locadora/atividade/:id', bodyParserJSON, async (req,res) => {
    let id          = req.params.id                 // Recebe o id por parametro
    let dados       = req.body                      // Recebe os dados do body da requisição
    let contentType = req.headers['content-type']   // Recebe o ContentType do header da requisição
    
    let result      = await atualizarAtividade(dados, id, contentType)
    res.status(result.status_code).json(result)
})

// endpoint para deletar uma atividade pelo id
app.delete('/v1/senai/locadora/atividade/:id', async (req,res) => {
    let id = req.params.id
    let result = await excluirAtividade(id)
    res.status(result.status_code).json(result)
})

// ---------------- Nacionalidade -----------------

// endpoint para inserir nacionalidade
app.post('/v1/senai/locadora/nacionalidade',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovaNacionalidade(dados,contentType)
    res.status(result.status_code).json(result)
})

// endpoint para retornar todas nacionalidades
app.get('/v1/senai/locadora/nacionalidade', async (req,res) => {
    let result = await listarNacionalidade()
    res.status(result.status_code).json(result)
})

// endpoint para buscar um nacionalidade pelo id
app.get('/v1/senai/locadora/nacionalidade/:id', async (req,res) => {
    let id = req.params.id
    let result = await buscarNacionalidade(id)
    res.status(result.status_code).json(result)
})

// endpoint para atualizar uma nacionalidade pelo id
app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async (req,res) => {
    let id          = req.params.id                 // Recebe o id por parametro
    let dados       = req.body                      // Recebe os dados do body da requisição
    let contentType = req.headers['content-type']   // Recebe o ContentType do header da requisição
    
    let result      = await atualizarNacionalidade(dados, id, contentType)
    res.status(result.status_code).json(result)
})

// endpoint para deletar uma nacionalidade pelo id
app.delete('/v1/senai/locadora/nacionalidade/:id', async (req,res) => {
    let id = req.params.id
    let result = await excluirNacionalidade(id)
    res.status(result.status_code).json(result)
})

// ---------------- Classificação -----------------

// endpoint para inserir classificacao
app.post('/v1/senai/locadora/classificacao',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovaClassificacao(dados,contentType)
    res.status(result.status_code).json(result)
})

// endpoint para retornar todas classificacaos
app.get('/v1/senai/locadora/classificacao', async (req,res) => {
    let result = await listarClassificacao()
    res.status(result.status_code).json(result)
})

// endpoint para buscar um classificacao pelo id
app.get('/v1/senai/locadora/classificacao/:id', async (req,res) => {
    let id = req.params.id
    let result = await buscarClassificacao(id)
    res.status(result.status_code).json(result)
})

// endpoint para atualizar uma classificacao pelo id
app.put('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async (req,res) => {
    let id          = req.params.id                 // Recebe o id por parametro
    let dados       = req.body                      // Recebe os dados do body da requisição
    let contentType = req.headers['content-type']   // Recebe o ContentType do header da requisição
    
    let result      = await atualizarClassificacao(dados, id, contentType)
    res.status(result.status_code).json(result)
})

// endpoint para deletar uma classificacao pelo id
app.delete('/v1/senai/locadora/classificacao/:id', async (req,res) => {
    let id = req.params.id
    let result = await excluirClassificacao(id)
    res.status(result.status_code).json(result)
})

// ---------------- Ator -----------------

// endpoint para inserir ator
app.post('/v1/senai/locadora/ator',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoAtor(dados,contentType)
    res.status(result.status_code).json(result)
})

// endpoint para retornar todas ators
app.get('/v1/senai/locadora/ator', async (req,res) => {
    let result = await listarAtor()
    res.status(result.status_code).json(result)
})

// endpoint para buscar um ator pelo id
app.get('/v1/senai/locadora/ator/:id', async (req,res) => {
    let id = req.params.id
    let result = await buscarAtor(id)
    res.status(result.status_code).json(result)
})

// endpoint para atualizar uma ator pelo id
app.put('/v1/senai/locadora/ator/:id', bodyParserJSON, async (req,res) => {
    let id          = req.params.id                 // Recebe o id por parametro
    let dados       = req.body                      // Recebe os dados do body da requisição
    let contentType = req.headers['content-type']   // Recebe o ContentType do header da requisição
    
    let result      = await atualizarAtor(dados, id, contentType)
    res.status(result.status_code).json(result)
})

// endpoint para deletar uma ator pelo id
app.delete('/v1/senai/locadora/ator/:id', async (req,res) => {
    let id = req.params.id
    let result = await excluirAtor(id)
    res.status(result.status_code).json(result)
})

// ---------------- Diretor -----------------

// endpoint para inserir diretor
app.post('/v1/senai/locadora/diretor',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoDiretor(dados,contentType)
    res.status(result.status_code).json(result)
})

// endpoint para retornar todas diretors
app.get('/v1/senai/locadora/diretor', async (req,res) => {
    let result = await listarDiretor()
    res.status(result.status_code).json(result)
})

// endpoint para buscar um diretor pelo id
app.get('/v1/senai/locadora/diretor/:id', async (req,res) => {
    let id = req.params.id
    let result = await buscarDiretor(id)
    res.status(result.status_code).json(result)
})

// endpoint para atualizar uma diretor pelo id
app.put('/v1/senai/locadora/diretor/:id', bodyParserJSON, async (req,res) => {
    let id          = req.params.id                 // Recebe o id por parametro
    let dados       = req.body                      // Recebe os dados do body da requisição
    let contentType = req.headers['content-type']   // Recebe o ContentType do header da requisição
    
    let result      = await atualizarDiretor(dados, id, contentType)
    res.status(result.status_code).json(result)
})

// endpoint para deletar uma diretor pelo id
app.delete('/v1/senai/locadora/diretor/:id', async (req,res) => {
    let id = req.params.id
    let result = await excluirDiretor(id)
    res.status(result.status_code).json(result)
})

// Serve para inicializar a API para receber requisições
app.listen(port, () => {
    console.log(`API filmes rodando em http://localhost:8080`)
})