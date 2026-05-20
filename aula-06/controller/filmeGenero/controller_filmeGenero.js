/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmeGenero
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const filmeGeneroDAO = require('../../model/DAO/filmeGenero/filmeGenero.js')
const controllerFilme = require('../filme/controller_filme.js')
const controllerGenero = require('../genero/controller_genero.js')

// inserir novo filmeGenero
const inserirNovoFilmeGenero = async (filmeGenero, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let filme = await controllerFilme.buscarFilme(filmeGenero.id_filme)
        if(!filme.status) return filme

        let genero = await controllerGenero.buscarGenero(filmeGenero.id_genero)
        if(!genero.status) return genero

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
        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let filme = await controllerFilme.buscarFilme(filmeGenero.id_filme)
        if(!filme.status) return filme

        let genero = await controllerGenero.buscarGenero(filmeGenero.id_genero)
        if(!genero.status) return genero

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

// listar todas filmeGeneroes
const listarFilmeGenero = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        for(const filmeGenero of result){
            let filme = await controllerFilme.buscarFilme(filmeGenero.id_filme)
            let genero = await controllerGenero.buscarGenero(filmeGenero.id_genero)

            if(filme.status){
                filmeGenero.filme = filme.response.filme
                delete filmeGenero.id_filme
            }
            if(genero.status) {
                filmeGenero.genero = genero.response.genero
                delete filmeGenero.id_genero
            }
        }

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

        for(const filmeGenero of result){
            let filme = await controllerFilme.buscarFilme(filmeGenero.id_filme)
            let genero = await controllerGenero.buscarGenero(filmeGenero.id_genero)

            if(filme.status){
                filmeGenero.filme = filme.response.filme
                delete filmeGenero.id_filme
            }
            if(genero.status) {
                filmeGenero.genero = genero.response.genero
                delete filmeGenero.id_genero
            }
        }

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

    if(response != null) base.DEFAULT_MESSAGE.response.filmeGenero = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovoFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    excluirFilmeGenero
}