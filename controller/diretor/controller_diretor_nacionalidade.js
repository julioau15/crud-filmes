/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretorNacionalidade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const diretorNacionalidadeDAO = require('../../model/DAO/diretor_nacionalidade/diretor_nacionalidade.js')

// inserir novo diretorNacionalidade
const inserirNovoDiretorNacionalidade = async (diretorNacionalidade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        let validar = await validarDados(diretorNacionalidade, contentType)
        if(validar) return validar

        let result = await diretorNacionalidadeDAO.insertDiretorNacionalidade(diretorNacionalidade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        diretorNacionalidade.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, diretorNacionalidade)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar diretorNacionalidade
const atualizarDiretorNacionalidade = async (diretorNacionalidade, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(diretorNacionalidade, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarDiretorNacionalidade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        diretorNacionalidade.id = Number(id)
        let result = await diretorNacionalidadeDAO.updateDiretorNacionalidade(diretorNacionalidade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, diretorNacionalidade)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas diretorNacionalidadees
const listarDiretorNacionalidade = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await diretorNacionalidadeDAO.selectAllDiretorNacionalidade()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarDiretorNacionalidadeMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarDiretorNacionalidadeMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar diretorNacionalidade pelo id
const buscarDiretorNacionalidade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await diretorNacionalidadeDAO.selectByIdDiretorNacionalidade(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir diretorNacionalidade pelo id
const excluirDiretorNacionalidade = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarDiretorNacionalidade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await diretorNacionalidadeDAO.deleteDiretorNacionalidade(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar nacionalidades pelo id do diretor
const buscarNacionalidadesIdDiretor = async (idDiretor) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idDiretor)
       if(validarID) return validarID

        let result = await diretorNacionalidadeDAO.selectNacionalidadesByIdDiretor(idDiretor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar diretores pelo id da nacionalidade
const buscarDiretoresIdNacionalidade = async (idNacionalidade) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idNacionalidade)
       if(validarID) return validarID

        let result = await diretorNacionalidadeDAO.selectDiretoresByIdNacionalidade(idNacionalidade)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir nacionalidades relacionadas ao diretor
const excluirNacionalidadesIdDiretor = async (idDiretor) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await diretorNacionalidadeDAO.deletenNacionalidadesByIdDiretor(idDiretor)

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

const validarDados = async (diretorNacionalidade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(diretorNacionalidade.id_diretor == undefined || diretorNacionalidade.id_diretor == '' || diretorNacionalidade.id_diretor == null || diretorNacionalidade.id_diretor <= 0 || isNaN(diretorNacionalidade.id_diretor)){
        message.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(diretorNacionalidade.id_nacionalidade == undefined || diretorNacionalidade.id_nacionalidade == '' || diretorNacionalidade.id_nacionalidade == null || diretorNacionalidade.id_nacionalidade <= 0 || isNaN(diretorNacionalidade.id_nacionalidade)){
        message.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.diretorNacionalidade = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoDiretorNacionalidade,
    atualizarDiretorNacionalidade,
    listarDiretorNacionalidade,
    buscarDiretorNacionalidade,
    excluirDiretorNacionalidade,
    buscarNacionalidadesIdDiretor,
    buscarDiretoresIdNacionalidade,
    excluirNacionalidadesIdDiretor
}