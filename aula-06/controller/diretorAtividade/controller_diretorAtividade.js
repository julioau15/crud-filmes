/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretorAtividade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const diretorAtividadeDAO = require('../../model/DAO/diretorAtividade/diretorAtividade.js')
const controllerAtividade = require('../atividade/controller_atividade.js')
const controllerdiretor = require('../diretor/controller_diretor.js')

// inserir novo diretorAtividade
const inserirNovoDiretorAtividade = async (diretorAtividade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let atividade = await controllerAtividade.buscarAtividade(diretorAtividade.id_atividade)
        if(!atividade.status) return atividade

        let diretor = await controllerdiretor.buscarDiretor(diretorAtividade.id_diretor)
        if(!diretor.status) return diretor

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
        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let atividade = await controllerAtividade.buscarAtividade(diretorAtividade.id_atividade)
        if(!atividade.status) return atividade

        let diretor = await controllerdiretor.buscarDiretor(diretorAtividade.id_diretor)
        if(!diretor.status) return diretor

        let resultBuscarId = await buscarDiretorAtividade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        diretorAtividade.id = Number(id)
        let result = await diretorAtividadeDAO.updateDiretorAtividade(diretorAtividade)
        result.atividade = atividade.response.atividade
        result.diretor = diretor.response.diretor

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

        for(const diretorAtividade of result){
            let atividade = await controllerAtividade.buscarAtividade(diretorAtividade.id_atividade)
            let diretor = await controllerdiretor.buscarDiretor(diretorAtividade.id_diretor)

            if(atividade.status){
                diretorAtividade.atividade = atividade.response.atividade
                delete diretorAtividade.id_atividade
            }
            if(diretor.status) {
                diretorAtividade.diretor = diretor.response.diretor
                delete diretorAtividade.id_diretor
            }
        }

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

        for(const diretorAtividade of result){
            let atividade = await controllerAtividade.buscarAtividade(diretorAtividade.id_atividade)
            let diretor = await controllerdiretor.buscarDiretor(diretorAtividade.id_diretor)

            if(atividade.status){
                diretorAtividade.atividade = atividade.response.atividade
                delete diretorAtividade.id_atividade
            }
            if(diretor.status) {
                diretorAtividade.diretor = diretor.response.diretor
                delete diretorAtividade.id_diretor
            }
        }

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