/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de classificacao
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

// inserir nova classificacao
const inserirNovaClassificacao = async (classificacao, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(classificacao, contentType)
        if(validar) return validar // 400 ou 415

        let result = await classificacaoDAO.insertClassificacao(classificacao)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        classificacao.id = Number(result)
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, classificacao)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar classificacao
const atualizarClassificacao = async (classificacao, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(classificacao, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarClassificacao(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        classificacao.id = Number(id)
        let result = await classificacaoDAO.updateClassificacao(classificacao)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, classificacao)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas classificacaos
const listarClassificacao = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await classificacaoDAO.selectAllClassificacao()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarClassificacaoMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarClassificacaoMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar classificacao pelo id
const buscarClassificacao = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await classificacaoDAO.selectByIdClassificacao(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length <= 0) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir classificacao pelo id
const excluirClassificacao = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarClassificacao(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await classificacaoDAO.deleteClassificacao(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (classificacao, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(classificacao.idade == undefined || classificacao.idade == null || classificacao.idade == '' || isNaN(classificacao.idade)){
        message.ERROR_BAD_REQUEST.field = '[IDADE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(classificacao.classificacao == undefined || classificacao.classificacao == null || classificacao.classificacao == '' || classificacao.classificacao.length > 80 || typeof(classificacao.classificacao) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(classificacao.descricao == undefined || classificacao.descricao == null || classificacao.descricao == '' || classificacao.descricao.length > 250 || typeof(classificacao.classificacao) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const validarId = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    if(id == undefined || id == '' || id == null || id <= 0 || isNaN(String(id))){
        message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.classificacao = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao
}