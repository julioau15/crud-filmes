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
const inserirNovoFilme = async (filme, contentType) => {
    /* Criando um clone do objeto JSON para manipular sua 
     * estrutura local sem modificar a estrutura original */
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json')
            return message.ERROR_CONTENT_TYPE // Status code 415

        let validar = await validarDados(filme)

        // Se a função 'validarDados' retornar um JSON de erro, iremos retornar o erro ao app
        if(validar){
            return validar // Status code 400

        }else { 
            // tenta inserir no banco
            let result = await filmeDAO.insertFilme(filme)
                
            if(result){ 
                message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.response = message.SUCESS_CREATED_ITEM.message
                return message.DEFAULT_MESSAGE // Status code 201

            } 
            return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // Status code 500  
    }
}

// Função para atualizar um filme
const atualizarFilme = async (filme) => {
    
}

// Função para retornar Todos filmes
const listarFilme = async () => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        // executa a função para retornar todos os filmes
        let result = await filmeDAO.selectAllFilme()

        if(result){
            // verfica se o array é vazio
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme = result
                return message.DEFAULT_MESSAGE // status_code 200
            }

            return message.ERROR_NOT_FOUND // status_code 404

        } else
            return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
    }
    
}

// Função para buscar um filme pelo ID
const buscarFilme = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        // tratamentos dados incorretos
        if (id.trim() == '' || id == null || id == undefined || id < 1 || isNaN(id)){
            message.DEFAULT_MESSAGE.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // status_code 400
        }
        // executa a função para retornar um filme pelo id
        let result = await filmeDAO.selectByIdFilme(id)

        if(result){
            // verfica se o array é vazio
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme = result
                return message.DEFAULT_MESSAGE // status_code 200
            }

            return message.ERROR_NOT_FOUND // status_code 404

        } else
            return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
    }
    
}

// Função para excluir um filme
const excluirFilme = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // tratamentos dados incorretos
        if (id.trim() == '' || id == null || id == undefined || id < 1 || isNaN(id)){
            message.DEFAULT_MESSAGE.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // status_code 400
        }

        // executa a função que deleta um filme pelo id no banco de dados
        let result = await filmeDAO.deleteFilme(id)

        if(result){
            return message.SUCESS_RESPONSE // status_code 200
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
    }
}

// Função para validar todos os dados de filme (Obrigatórios, Quantidade de caracteres, etc)
const validarDados = async (filme) => {
    /* Criando um clone do objeto JSON para manipular sua 
     * estrutura local sem modificar a estrutura original */
    let message = JSON.parse(JSON.stringify(config_message))

    // Validação de dados para os atributos do filme (Status 400)
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA_LANÇAMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(filme.sinopse == '' || filme.sinopse == null || filme.duracao == undefined){
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(isNaN(filme.avaliacao) || parseFloat(filme.avaliacao).toFixed(2).length > 4){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(isNaN(filme.valor) || filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.toFixed(2).length > 6 || isNaN(filme.valor)){
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else{
        return false
        
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}