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
    "project": "Estados e Cidades",
    "description":"API para manipular dados de Cidades e Estados",
    "date": "2026-04-29",
    "version": "1.0.4.26",
    "developer": "Julio Augusto",
    "end-points": [
        {
            "id": 1,
            "route 1": '/v1/senai/locadora/filme',
            "method": 'POST',
            "description":"Insere um novo filme no banco."
        },
        {
            "id": 2,
            "route 2": '/v1/senai/locadora/filme',
            "method": 'GET',
            "description":"Retorna todos os filmes do banco."
        },
        {
            "id": 3,
            "route 3": '/v1/senai/locadora/filme/1',
            "method": 'GET',
            "description":"Retorna um filme do banco filtrando por id."
        },
        {
            "id": 4,
            "route 4": '/v1/senai/locadora/filme',
            "method": 'PUT',
            "description":"Atualiza um filme existente no banco com o id."
        },
        {
            "id": 5,
            "route 5": '/v1/senai/locadora/filme',
            "method": 'DELETE',
            "description":"Deleta um filme existente no banco com o id."
        }
    ]
}

// Raiz da API
app.get('/help', (req,res) => {
    res.status(200).json(DOC_API)
})

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

// Serve para inicializar a API para receber requisições
app.listen(port, () => {
    console.log(`API filmes rodando em http://localhost:${port}`)
})