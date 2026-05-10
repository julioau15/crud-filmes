/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretor
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const diretorDAO = require('../../model/DAO/diretor/diretor.js')

// inserir nova diretor
const inserirNovoDiretor = async (diretor, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(diretor, contentType)
        if(validar) return validar // 400 ou 415

        let result = await diretorDAO.insertDiretor(diretor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        diretor.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, diretor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar diretor
const atualizarDiretor = async (diretor, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(diretor, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarDiretor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        diretor.id = Number(id)
        let result = await diretorDAO.updateDiretor(diretor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, diretor) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas diretores
const listarDiretor = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await diretorDAO.selectAllDiretor()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarDiretorMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarDiretorMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar diretor pelo id
const buscarDiretor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await diretorDAO.selectByIdDiretor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length <= 0) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir diretor pelo id
const excluirDiretor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarDiretor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await diretorDAO.deleteDiretor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (diretor, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(diretor.nome == undefined || diretor.nome == null || diretor.nome == '' || diretor.nome.length > 100 || typeof(diretor.nome) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(diretor.data_nascimento == undefined || diretor.data_nascimento == null || diretor.data_nascimento == '' || diretor.data_nascimento.length != 10 || typeof(diretor.data_nascimento) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[DATA NASCIMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(diretor.data_falecimento.length > 10){
        message.ERROR_BAD_REQUEST.field = '[DATA FALECIMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(diretor.ativo == null || diretor.ativo != 0 && diretor.ativo != 1){
        message.ERROR_BAD_REQUEST.field = '[ATIVO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(diretor.biografia == undefined || diretor.biografia == null || diretor.biografia == '' || diretor.biografia.length > 250 || typeof(diretor.biografia) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(diretor.foto.length > 255){
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

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.diretor = response

    return base.DEFAULT_MESSAGE
}

module.exports = {
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretor,
    buscarDiretor,
    excluirDiretor
}