/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de atorAtividade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const atorAtividadeDAO = require('../../model/DAO/atorAtividade/atorAtividade.js')
const controllerAtividade = require('../atividade/controller_atividade.js')
const controllerAtor = require('../ator/controller_ator.js')

// inserir novo atorAtividade
const inserirNovoAtorAtividade = async (atorAtividade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let atividade = await controllerAtividade.buscarAtividade(atorAtividade.id_atividade)
        if(!atividade.status) return atividade

        let ator = await controllerAtor.buscarAtor(atorAtividade.id_ator)
        if(!ator.status) return ator

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
        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let atividade = await controllerAtividade.buscarAtividade(atorAtividade.id_atividade)
        if(!atividade.status) return atividade

        let ator = await controllerAtor.buscarAtor(atorAtividade.id_ator)
        if(!ator.status) return ator

        let resultBuscarId = await buscarAtorAtividade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        atorAtividade.id = Number(id)
        let result = await atorAtividadeDAO.updateAtorAtividade(atorAtividade)
        result.atividade = atividade.response.atividade
        result.ator = ator.response.ator

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

        for(const atorAtividade of result){
            let atividade = await controllerAtividade.buscarAtividade(atorAtividade.id_atividade)
            let ator = await controllerAtor.buscarAtor(atorAtividade.id_ator)

            if(atividade.status){
                atorAtividade.atividade = atividade.response.atividade
                delete atorAtividade.id_atividade
            }
            if(ator.status) {
                atorAtividade.ator = ator.response.ator
                delete atorAtividade.id_ator
            }
        }

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

        for(const atorAtividade of result){
            let atividade = await controllerAtividade.buscarAtividade(atorAtividade.id_atividade)
            let ator = await controllerAtor.buscarAtor(atorAtividade.id_ator)

            if(atividade.status){
                atorAtividade.atividade = atividade.response.atividade
                delete atorAtividade.id_atividade
            }
            if(ator.status) {
                atorAtividade.ator = ator.response.ator
                delete atorAtividade.id_ator
            }
        }

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

const validarId = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))
    
    if(id == undefined || id == '' || id == null || id <= 0 || isNaN(id)){
        message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
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
    excluirAtorAtividade
}