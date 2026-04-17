/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de Filmes
 * Data: 17/04/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *******************************************************************************************************/

// Import do arquivo de padronização de mensagens
const config_message = require('../module/configMessages.js')

// Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

// Função para inserir um novo filme
const inserirNovoFilme = async (filme) => {
    /* Criando um clone do objeto JSON para manipular sua 
     * estrutura local sem modificar a estrutura original */
    let message = JSON.parse(JSON.stringify(config_message))

    // Validação de dados para os atributos do filme (Status 400)
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA_LANÇAMENTO] INVÁLIDO'
    }else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.lenght < 5){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
    }else if(filme.sinopse == '' || filme.sinopse == null || filme.duracao == undefined){
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
    }else if(isNaN(filme.avaliacao) || filme.avaliacao.lenght > 3){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
    }else if(filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.lenght > 5 || isNaN(filme.valor)){
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    }else if(filme.capa.lenght > 255){
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
    }else{
        let result = await filmeDAO.insertFilme(filme)
        
        if(result){ // Status code 201
            message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.response = message.SUCESS_CREATED_ITEM.message
        }else{ // Status code 400
            message.DEFAULT_MESSAGE.status = message.ERROR_BAD_REQUEST.status
            message.DEFAULT_MESSAGE.status_code = message.ERROR_BAD_REQUEST.status_code
            message.DEFAULT_MESSAGE.response = message.ERROR_BAD_REQUEST.message
            message.DEFAULT_MESSAGE.field = message.ERROR_BAD_REQUEST.field
        }
    }

    return message.DEFAULT_MESSAGE
}

// Função para atualizar um filme
const atualizarFilme = async (filme) => {
    
}

// Função para retornar Todos filmes
const listarFilme = async () => {
    
}

// Função para buscar um filme pelo ID
const buscarFilme = async (id) => {
    
}

// Função para excluir um filme
const excluirFilme = async (id) => {
    
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}