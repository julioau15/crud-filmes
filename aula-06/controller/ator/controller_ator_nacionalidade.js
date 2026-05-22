/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de atorNacionalidade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const atorNacionalidadeDAO = require('../../model/DAO/ator_nacionalidade/ator_nacionalidade.js')

// inserir novo atorNacionalidade
const inserirNovoAtorNacionalidade = async (atorNacionalidade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(atorNacionalidade, contentType)
        if(validar) return validar

        let result = await atorNacionalidadeDAO.insertAtorNacionalidade(atorNacionalidade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        atorNacionalidade.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, atorNacionalidade)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar atorNacionalidade
const atualizarAtorNacionalidade = async (atorNacionalidade, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(atorNacionalidade, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarAtorNacionalidade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        atorNacionalidade.id = Number(id)
        let result = await atorNacionalidadeDAO.updateAtorNacionalidade(atorNacionalidade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, atorNacionalidade)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas atorNacionalidadees
const listarAtorNacionalidade = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await atorNacionalidadeDAO.selectAllAtorNacionalidade()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarAtorNacionalidadeMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarAtorNacionalidadeMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar atorNacionalidade pelo id
const buscarAtorNacionalidade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await atorNacionalidadeDAO.selectByIdAtorNacionalidade(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir atorNacionalidade pelo id
const excluirAtorNacionalidade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarAtorNacionalidade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await atorNacionalidadeDAO.deleteAtorNacionalidade(id)

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

const validarDados = async (atorNacionalidade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(atorNacionalidade.id_ator == undefined || atorNacionalidade.id_ator == '' || atorNacionalidade.id_ator == null || atorNacionalidade.id_ator <= 0 || isNaN(atorNacionalidade.id_ator)){
        message.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(atorNacionalidade.id_nacionalidade == undefined || atorNacionalidade.id_nacionalidade == '' || atorNacionalidade.id_nacionalidade == null || atorNacionalidade.id_nacionalidade <= 0 || isNaN(atorNacionalidade.id_nacionalidade)){
        message.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.atorNacionalidade = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoAtorNacionalidade,
    atualizarAtorNacionalidade,
    listarAtorNacionalidade,
    buscarAtorNacionalidade,
    excluirAtorNacionalidade
}