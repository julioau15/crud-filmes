/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de filmeDiretor
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const filmeDiretorDAO = require('../../model/DAO/filmeDiretor/filmeDiretor.js')
const controllerFilme = require('../filme/controller_filme.js')
const controllerDiretor = require('../diretor/controller_diretor.js')

// inserir novo filmeDiretor
const inserirNovoFilmeDiretor = async (filmeDiretor, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let filme = await controllerFilme.buscarFilme(filmeDiretor.id_filme)
        if(!filme.status) return filme

        let diretor = await controllerDiretor.buscarDiretor(filmeDiretor.id_diretor)
        if(!diretor.status) return diretor

        let result = await filmeDiretorDAO.insertFilmeDiretor(filmeDiretor)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL

        filmeDiretor.id = result
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, filmeDiretor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
}

// atualizar filmeDiretor
const atualizarFilmeDiretor = async (filmeDiretor, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let filme = await controllerFilme.buscarFilme(filmeDiretor.id_filme)
        if(!filme.status) return filme

        let diretor = await controllerDiretor.buscarDiretor(filmeDiretor.id_diretor)
        if(!diretor.status) return diretor

        let resultBuscarId = await buscarFilmeDiretor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        filmeDiretor.id = Number(id)
        let result = await filmeDiretorDAO.updateFilmeDiretor(filmeDiretor)
        result.filme = filme.response.filme
        result.diretor = diretor.response.diretor

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, filmeDiretor)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas filmeDiretores
const listarFilmeDiretor = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeDiretorDAO.selectAllFilmeDiretor()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length <= 0) return message.ERROR_NOT_FOUND // status_code 404

        for(const filmeDiretor of result){
            let filme = await controllerFilme.buscarFilme(filmeDiretor.id_filme)
            let diretor = await controllerDiretor.buscarDiretor(filmeDiretor.id_diretor)

            if(filme.status){
                filmeDiretor.filme = filme.response.filme
                delete filmeDiretor.id_filme
            }
            if(diretor.status) {
                filmeDiretor.diretor = diretor.response.diretor
                delete filmeDiretor.id_diretor
            }
        }

        let listarFilmeDiretorMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarFilmeDiretorMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// buscar filmeDiretor pelo id
const buscarFilmeDiretor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

       const validarID = await validarId(id)
       if(validarID) return validarID

        let result = await filmeDiretorDAO.selectByIdFilmeDiretor(id)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        if(result.length < 1) return config_message.ERROR_NOT_FOUND

        for(const filmeDiretor of result){
            let filme = await controllerFilme.buscarFilme(filmeDiretor.id_filme)
            let diretor = await controllerDiretor.buscarDiretor(filmeDiretor.id_diretor)

            if(filme.status){
                filmeDiretor.filme = filme.response.filme
                delete filmeDiretor.id_filme
            }
            if(diretor.status) {
                filmeDiretor.diretor = diretor.response.diretor
                delete filmeDiretor.id_diretor
            }
        }

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// excluir filmeDiretor pelo id
const excluirFilmeDiretor = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarFilmeDiretor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        let result = await filmeDiretorDAO.deleteFilmeDiretor(id)

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

    if(response != null) base.DEFAULT_MESSAGE.response.filmeDiretor = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovoFilmeDiretor,
    atualizarFilmeDiretor,
    listarFilmeDiretor,
    buscarFilmeDiretor,
    excluirFilmeDiretor
}