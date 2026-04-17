/*************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API de Filmes
 * Data: 15/04/2026
 * Autor: Julio Augusto
 * Versão: 1.0
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
const port = 8090

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

app.post('/v1/senai/locadora/filme',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let result = await inserirNovoFilme(dados)
    res.json(result)
})

// Serve para inicializar a API para receber requisições
app.listen(port, () => {
    console.log(`API filmes rodando em http://localhost:${port}`)
})