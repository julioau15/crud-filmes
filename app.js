/*************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API de Filmes
 * Data: 15/04/2026
 * Autor: Julio Augusto
 * Versão: 1.0.4.26
 * *********************************************************************************/

// IMPORT das dependências para criar a API
const express = require('express')
const cors = require('cors')

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

// ******** ROTAS ***********
// Import das rotas
const atividadeRouter = require('./routes/atividade.routes.js')
const atorRouter = require('./routes/ator.routes.js')
const classificacaoRouter = require('./routes/classificacao.routes.js')
const diretorRouter = require('./routes/diretor.routes.js')
const filmeRouter = require('./routes/filme.routes.js')
const generoRouter = require('./routes/genero.routes.js')
const nacionalidadeRouter = require('./routes/nacionalidade.routes.js')

// atividade
app.use('/v1/senai/locadora/atividade', cors(), atividadeRouter)

// ator
app.use('/v1/senai/locadora/ator', cors(), atorRouter)

// classificacao
app.use('/v1/senai/locadora/classificacao', cors(), classificacaoRouter)

// diretor
app.use('/v1/senai/locadora/diretor', cors(), diretorRouter)

// filme
app.use('/v1/senai/locadora/filme', cors(), filmeRouter)

// genero
app.use('/v1/senai/locadora/genero', cors(), generoRouter)

// nacionalidade
app.use('/v1/senai/locadora/nacionalidade', cors(), nacionalidadeRouter)


// Serve para inicializar a API para receber requisições
app.listen(port, () => {
    console.log(`API filmes rodando em http://localhost:8080`)
})