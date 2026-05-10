/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de nacionalidade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

// inserir nova nacionalidade
const inserirNovaNacionalidade = async (nacionalidade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(nacionalidade, contentType)
        if(validar) return validar // 400 ou 415

        let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        nacionalidade.id = Number(result)
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, nacionalidade) // 201

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// atualizar nacionalidade
const atualizarNacionalidade = async (nacionalidade, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(nacionalidade, contentType)
        if(validar) return validar // 400 e 415

        let resultBuscarId = await buscarNacionalidade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        nacionalidade.id = Number(id)
        let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, nacionalidade) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas nacionalidades
const listarNacionalidade = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await nacionalidadeDAO.selectAllNacionalidade()
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return message.ERROR_NOT_FOUND // status_code 404

        let listarNacionalidadeMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarNacionalidadeMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar nacionalidade pelo id
const buscarNacionalidade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
       const validarID = await validarId(id)
       if(validarID) return validarID // 400

        let result = await nacionalidadeDAO.selectByIdNacionalidade(id)
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND // 404

        return await montarMensagem(message, message.SUCESS_RESPONSE, result) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir nacionalidade pelo id
const excluirNacionalidade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarId = await buscarNacionalidade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await nacionalidadeDAO.deleteNacionalidade(id)
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (nacionalidade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(nacionalidade.pais == undefined || nacionalidade.pais == null || nacionalidade.pais == '' || nacionalidade.pais.length > 100 || typeof(nacionalidade.pais) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[PAÍS] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(nacionalidade.sigla.length > 5){
        message.ERROR_BAD_REQUEST.field = '[SIGLA] INVÁLIDO'
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

    if(response != null) base.DEFAULT_MESSAGE.response.nacionalidade = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovaNacionalidade,
    atualizarNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade
}