/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretorAtividade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const diretorAtividadeDAO = require('../../model/DAO/diretor_atividade/diretor_atividade.js')

// inserir novo diretorAtividade
const inserirNovoDiretorAtividade = async (diretorAtividade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(diretorAtividade, contentType)
        if(validar) return validar

        let result = await diretorAtividadeDAO.insertDiretorAtividade(diretorAtividade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        diretorAtividade.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, diretorAtividade)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar diretorAtividade
const atualizarDiretorAtividade = async (diretorAtividade, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(diretorAtividade, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarDiretorAtividade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        diretorAtividade.id = Number(id)
        let result = await diretorAtividadeDAO.updateDiretorAtividade(diretorAtividade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, diretorAtividade)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas diretorAtividadees
const listarDiretorAtividade = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await diretorAtividadeDAO.selectAllDiretorAtividade()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarDiretorAtividadeMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarDiretorAtividadeMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar diretorAtividade pelo id
const buscarDiretorAtividade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await diretorAtividadeDAO.selectByIdDiretorAtividade(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir diretorAtividade pelo id
const excluirDiretorAtividade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarDiretorAtividade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await diretorAtividadeDAO.deleteDiretorAtividade(id)

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

const validarDados = async (diretorAtividade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(diretorAtividade.id_diretor == undefined || diretorAtividade.id_diretor == '' || diretorAtividade.id_diretor == null || diretorAtividade.id_diretor <= 0 || isNaN(diretorAtividade.id_diretor)){
        message.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(diretorAtividade.id_atividade == undefined || diretorAtividade.id_atividade == '' || diretorAtividade.id_atividade == null || diretorAtividade.id_atividade <= 0 || isNaN(diretorAtividade.id_atividade)){
        message.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.diretorAtividade = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoDiretorAtividade,
    atualizarDiretorAtividade,
    listarDiretorAtividade,
    buscarDiretorAtividade,
    excluirDiretorAtividade
}