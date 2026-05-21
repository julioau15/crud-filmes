/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmeAtor
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const filmeAtorDAO = require('../../model/DAO/filmeAtor/filmeAtor.js')
const controllerFilme = require('../filme/controller_filme.js')
const controllerAtor = require('../ator/controller_ator.js')

// inserir novo filmeAtor
const inserirNovoFilmeAtor = async (filmeAtor, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let filme = await controllerFilme.buscarFilme(filmeAtor.id_filme)
        if(!filme.status) return filme

        let ator = await controllerAtor.buscarAtor(filmeAtor.id_ator)
        if(!ator.status) return ator

        let result = await filmeAtorDAO.insertFilmeAtor(filmeAtor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        filmeAtor.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, filmeAtor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar filmeAtor
const atualizarFilmeAtor = async (filmeAtor, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let filme = await controllerFilme.buscarFilme(filmeAtor.id_filme)
        if(!filme.status) return filme

        let ator = await controllerAtor.buscarAtor(filmeAtor.id_ator)
        if(!ator.status) return ator

        let resultBuscarId = await buscarFilmeAtor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        filmeAtor.id = Number(id)
        let result = await filmeAtorDAO.updateFilmeAtor(filmeAtor)
        result.filme = filme.response.filme
        result.ator = ator.response.ator

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, filmeAtor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas filmeAtores
const listarFilmeAtor = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeAtorDAO.selectAllFilmeAtor()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        for(const filmeAtor of result){
            let filme = await controllerFilme.buscarFilme(filmeAtor.id_filme)
            let ator = await controllerAtor.buscarAtor(filmeAtor.id_ator)

            if(filme.status){
                filmeAtor.filme = filme.response.filme
                delete filmeAtor.id_filme
            }
            if(ator.status) {
                filmeAtor.ator = ator.response.ator
                delete filmeAtor.id_ator
            }
        }

        let listarFilmeAtorMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarFilmeAtorMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar filmeAtor pelo id
const buscarFilmeAtor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await filmeAtorDAO.selectByIdFilmeAtor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        for(const filmeAtor of result){
            let filme = await controllerFilme.buscarFilme(filmeAtor.id_filme)
            let ator = await controllerAtor.buscarAtor(filmeAtor.id_ator)

            if(filme.status){
                filmeAtor.filme = filme.response.filme
                delete filmeAtor.id_filme
            }
            if(ator.status) {
                filmeAtor.ator = ator.response.ator
                delete filmeAtor.id_ator
            }
        }

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir filmeAtor pelo id
const excluirFilmeAtor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarFilmeAtor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await filmeAtorDAO.deleteFilmeAtor(id)

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

    if(response != null) base.DEFAULT_MESSAGE.response.filmeAtor = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovoFilmeAtor,
    atualizarFilmeAtor,
    listarFilmeAtor,
    buscarFilmeAtor,
    excluirFilmeAtor
}