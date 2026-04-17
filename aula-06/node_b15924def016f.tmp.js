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
// const {
//     inserirNovoFilme,
//     atualizarFilme,
//     listarFilme,
//     buscarFilme,
//     excluirFilme
// } = require('./controller/filme/controller_filme.js')

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

// Configura as permissões da API através do CORS
app.use(cors(corsOptions))

// Raiz da API
app.get('/v1/senai/locadora/help', (req,res) => {
    res.status(200).json({})
})

app.post('/v1/senai/locadora/filme', async (req,res) => {
    res.json()
})


// Serve para inicializar a API para receber requisições
app.listen(port, () => {
    console.log(`API filmes rodando em http://localhost:${port}`)
})