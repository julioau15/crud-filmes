/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de atorAtividade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const atorAtividadeDAO = require('../../model/DAO/ator_atividade/ator_atividade.js')

// inserir novo atorAtividade
const inserirNovoAtorAtividade = async (atorAtividade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(atorAtividade, contentType)
        if(validar) return validar

        let result = await atorAtividadeDAO.insertAtorAtividade(atorAtividade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        atorAtividade.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, atorAtividade)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar atorAtividade
const atualizarAtorAtividade = async (atorAtividade, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(atorAtividade, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarAtorAtividade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        atorAtividade.id = Number(id)
        let result = await atorAtividadeDAO.updateAtorAtividade(atorAtividade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, atorAtividade)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas atorAtividadees
const listarAtorAtividade = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await atorAtividadeDAO.selectAllAtorAtividade()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarAtorAtividadeMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarAtorAtividadeMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar atorAtividade pelo id
const buscarAtorAtividade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await atorAtividadeDAO.selectByIdAtorAtividade(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir atorAtividade pelo id
const excluirAtorAtividade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarAtorAtividade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await atorAtividadeDAO.deleteAtorAtividade(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar atividades pelo id do ator
const buscarAtividadesIdAtor = async (idAtor) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idAtor)
       if(validarID) return validarID

        let result = await atorAtividadeDAO.selectAtividadesByIdAtor(idAtor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar atores pelo id da atividade
const buscarAtoresIdAtividade = async (idAtividade) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idAtividade)
       if(validarID) return validarID

        let result = await atorAtividadeDAO.selectAtoresByIdAtividade(idAtividade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir atividades relacionadas ao ator
const excluirAtividadesIdAtor = async (idAtor) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await atorAtividadeDAO.deleteAtividadesByIdAtor(idAtor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}


const validarId = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))
    
    if(id == undefined || id == '' || id == null || id <= 0 || isNaN(id)){
        message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const validarDados = async (atorAtividade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(atorAtividade.id_ator == undefined || atorAtividade.id_ator == '' || atorAtividade.id_ator == null || atorAtividade.id_ator <= 0 || isNaN(atorAtividade.id_ator)){
        message.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(atorAtividade.id_atividade == undefined || atorAtividade.id_atividade == '' || atorAtividade.id_atividade == null || atorAtividade.id_atividade <= 0 || isNaN(atorAtividade.id_atividade)){
        message.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.atorAtividade = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoAtorAtividade,
    atualizarAtorAtividade,
    listarAtorAtividade,
    buscarAtorAtividade,
    excluirAtorAtividade,
    buscarAtividadesIdAtor,
    buscarAtoresIdAtividade,
    excluirAtividadesIdAtor
}