/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de genero
 * Data: 10/06/2026
 * Autor: Julio Augusto
 * Versão: 1.0.4.26
 * *********************************************************************************/

// import do express
const express = require('express')

// Cria um objeto de rota para o arquivo
const router = express.Router()

const bodyParser = require('body-parser')

// Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

const { 
    inserirNovoGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero
} = require('../controller/genero/controller_genero.js')

// ---------------- GENERO -----------------

// endpoint para inserir genero
router.post('/',bodyParserJSON, async (req,res) => {
    // recebe o conteudo dentro do body da requisição
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoGenero(dados,contentType)
    res.status(result.status_code).json(result)
})

// endpoint para retornar todos filmes
router.get('/', async (req,res) => {
    let result = await listarGenero()
    res.status(result.status_code).json(result)
})

// endpoint para buscar um genero pelo id
router.get('/:id', async (req,res) => {
    let id = req.params.id
    let result = await buscarGenero(id)
    res.status(result.status_code).json(result)
})

// endpoint para atualizar um genero pelo id
router.put('/:id', bodyParserJSON, async (req,res) => {
    let id          = req.params.id                 // Recebe o id por parametro
    let dados       = req.body                      // Recebe os dados do body da requisição
    let contentType = req.headers['content-type']   // Recebe o ContentType do header da requisição
    
    let result      = await atualizarGenero(dados, id, contentType)
    res.status(result.status_code).json(result)
})

// endpoint para deletar um genero pelo id
router.delete('/:id', async (req,res) => {
    let id = req.params.id
    let result = await excluirGenero(id)
    res.status(result.status_code).json(result)
})

module.exports = router