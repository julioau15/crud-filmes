/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmeGenero
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')

// inserir novo filmeGenero
const inserirNovoFilmeGenero = async (filmeGenero, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(filmeGenero, contentType)
        if(validar) return validar
        
        let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        filmeGenero.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, filmeGenero)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar filmeGenero
const atualizarFilmeGenero = async (filmeGenero, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(filmeGenero, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarFilmeGenero(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        filmeGenero.id = Number(id)
        let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)
        result.filme = filme.response.filme
        result.genero = genero.response.genero

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, filmeGenero)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar filmeGenero
const listarFilmeGenero = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        let listarFilmeGeneroMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarFilmeGeneroMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar filmeGenero pelo id
const buscarFilmeGenero = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir filmeGenero pelo id
const excluirFilmeGenero = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarFilmeGenero(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await filmeGeneroDAO.deleteFilmeGenero(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar filmes pelo id do Genero
const buscarFilmesIdGenero = async (idGenero) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idGenero)
       if(validarID) return validarID

        let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar generos pelo id do filme
const buscarGenerosIdFilme = async (idFilme) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(idFilme)
       if(validarID) return validarID

        let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir os Generos relacionados com o filme
const excluirGenerosIdFilme = async (idFilme) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)

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

const validarDados = async (filmeGenero, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

     // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415
    
    if(filmeGenero.id_filme == undefined || filmeGenero.id_filme == '' || filmeGenero.id_filme == null || filmeGenero.id_filme <= 0 || isNaN(filmeGenero.id_filme)){
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(filmeGenero.id_genero == undefined || filmeGenero.id_genero == '' || filmeGenero.id_genero == null || filmeGenero.id_genero <= 0 || isNaN(filmeGenero.id_genero)){
        message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.filmeGenero = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovoFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    excluirFilmeGenero,
    buscarFilmesIdGenero,
    buscarGenerosIdFilme,
    excluirGenerosIdFilme
}