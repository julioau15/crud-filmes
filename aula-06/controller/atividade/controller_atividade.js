/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de atividade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const atividadeDAO = require('../../model/DAO/atividade/atividade.js')

// inserir nova atividade
const inserirNovaAtividade = async (atividade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(atividade, contentType)
        if(validar) return validar // 400 ou 415

        let result = await atividadeDAO.insertAtividade(atividade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        atividade.id = result
        message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
        message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
        message.DEFAULT_MESSAGE.response = atividade

        return message.DEFAULT_MESSAGE // Status code 201

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar atividade
const atualizarAtividade = async (atividade, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(atividade, contentType)
        if(validar) return validar // 400 ou 415

        const validarID = await validarId(id)
        if(validarID) return validarID

        atividade.id = id
        let result = await atividadeDAO.updateAtividade(atividade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATE_ITEM.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATE_ITEM.status_code
        message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATE_ITEM.message
        message.DEFAULT_MESSAGE.response = atividade
        
        return message.DEFAULT_MESSAGE // Status code 200

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas atividades
const listarAtividade = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await atividadeDAO.selectAllAtividade()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
        message.DEFAULT_MESSAGE.response.count = result.length
        message.DEFAULT_MESSAGE.response.atividade = result

        return message.DEFAULT_MESSAGE // status_code 200

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar atividade pelo id
const buscarAtividade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await atividadeDAO.selectByIdAtividade(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length <= 0) return config_message.ERROR_NOT_FOUND

        message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
        message.DEFAULT_MESSAGE.response = result
        
        return message.DEFAULT_MESSAGE // Status code 200

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir atividade pelo id
const excluirAtividade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarAtividade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await atividadeDAO.deleteAtividade(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        message.DEFAULT_MESSAGE.status = message.SUCESS_DELETE_ITEM.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETE_ITEM.status_code
        message.DEFAULT_MESSAGE.message = message.SUCESS_DELETE_ITEM.message
        
        return message.DEFAULT_MESSAGE // Status code 200

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (atividade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(atividade.nome == undefined || atividade.nome == null || atividade.nome == '' || atividade.nome.length > 100 || !isNaN(atividade.nome)){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const validarId = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))
    
    if(id == undefined || id == '' || id == null || id <= 0 || isNaN(id)){
        message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

module.exports = {
    inserirNovaAtividade,
    atualizarAtividade,
    listarAtividade,
    buscarAtividade,
    excluirAtividade
}