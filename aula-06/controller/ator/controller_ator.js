/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de ator
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const atorDAO = require('../../model/DAO/ator/ator.js')

// inserir nova ator
const inserirNovoAtor = async (ator, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(ator, contentType)
        if(validar) return validar // 400 ou 415

        let result = await atorDAO.insertAtor(ator)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        ator.id = result
        message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
        message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
        message.DEFAULT_MESSAGE.response = ator

        return message.DEFAULT_MESSAGE // Status code 201

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar ator
const atualizarAtor = async (ator, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(ator, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarAtor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        ator.id = id
        let result = await atorDAO.updateAtor(ator)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATE_ITEM.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATE_ITEM.status_code
        message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATE_ITEM.message
        message.DEFAULT_MESSAGE.response = ator
        
        return message.DEFAULT_MESSAGE // Status code 200

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas ators
const listarAtor = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await atorDAO.selectAllAtor()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
        message.DEFAULT_MESSAGE.response.count = result.length
        message.DEFAULT_MESSAGE.response.ator = result

        return message.DEFAULT_MESSAGE // status_code 200

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar ator pelo id
const buscarAtor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await atorDAO.selectByIdAtor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length <= 0) return config_message.ERROR_NOT_FOUND

        message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
        message.DEFAULT_MESSAGE.response = result
        
        return message.DEFAULT_MESSAGE // Status code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir ator pelo id
const excluirAtor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarAtor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await atorDAO.deleteAtor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        message.DEFAULT_MESSAGE.status = message.SUCESS_DELETE_ITEM.status
        message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETE_ITEM.status_code
        message.DEFAULT_MESSAGE.message = message.SUCESS_DELETE_ITEM.message
        
        return message.DEFAULT_MESSAGE // Status code 200

    } catch (error) {}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (ator, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(ator.nome == undefined || ator.nome == null || ator.nome == '' || ator.nome.length > 100 || !isNaN(ator.nome)){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.data_nascimento == undefined || ator.data_nascimento == null || ator.data_nascimento == '' || ator.data_nascimento.length != 10 || !isNaN(ator.data_nascimento)){
        message.ERROR_BAD_REQUEST.field = '[DATA NASCIMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.data_falecimento.length > 10 || !isNaN(String(ator.data_falecimento))){
        message.ERROR_BAD_REQUEST.field = '[DATA FALECIMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.ativo == undefined || ator.ativo == null || ator.ativo == '' || ator.ativo.length > 1 || isNaN(ator.ativo)){
        message.ERROR_BAD_REQUEST.field = '[ATIVO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.biografia == undefined || ator.biografia == null || ator.biografia == '' || ator.biografia.length > 250 || !isNaN(ator.biografia)){
        message.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.foto.length > 255 || !isNaN(ator.foto)){
        message.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDO'
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

module.exports = {
    inserirNovoAtor,
    atualizarAtor,
    listarAtor,
    buscarAtor,
    excluirAtor
}