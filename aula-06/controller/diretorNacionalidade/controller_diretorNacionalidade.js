/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de diretorNacionalidade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const diretorNacionalidadeDAO = require('../../model/DAO/diretorNacionalidade/diretorNacionalidade.js')
const controllernacionalidade = require('../nacionalidade/controller_nacionalidade.js')
const controllerdiretor = require('../diretor/controller_diretor.js')

// inserir novo diretorNacionalidade
const inserirNovoDiretorNacionalidade = async (diretorNacionalidade, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {

        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let nacionalidade = await controllernacionalidade.buscarNacionalidade(diretorNacionalidade.id_nacionalidade)
        if(!nacionalidade.status) return nacionalidade

        let diretor = await controllerdiretor.buscarDiretor(diretorNacionalidade.id_diretor)
        if(!diretor.status) return diretor

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
        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

        let nacionalidade = await controllernacionalidade.buscarNacionalidade(diretorNacionalidade.id_nacionalidade)
        if(!nacionalidade.status) return nacionalidade

        let diretor = await controllerdiretor.buscarDiretor(diretorNacionalidade.id_diretor)
        if(!diretor.status) return diretor

        let resultBuscarId = await buscarDiretorNacionalidade(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        diretorNacionalidade.id = Number(id)
        let result = await diretorNacionalidadeDAO.updateDiretorNacionalidade(diretorNacionalidade)
        result.nacionalidade = nacionalidade.response.nacionalidade
        result.diretor = diretor.response.diretor

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

        for(const diretorNacionalidade of result){
            let nacionalidade = await controllernacionalidade.buscarNacionalidade(diretorNacionalidade.id_nacionalidade)
            let diretor = await controllerdiretor.buscarDiretor(diretorNacionalidade.id_diretor)

            if(nacionalidade.status){
                diretorNacionalidade.nacionalidade = nacionalidade.response.nacionalidade
                delete diretorNacionalidade.id_nacionalidade
            }
            if(diretor.status) {
                diretorNacionalidade.diretor = diretor.response.diretor
                delete diretorNacionalidade.id_diretor
            }
        }

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

        for(const diretorNacionalidade of result){
            let nacionalidade = await controllernacionalidade.buscarNacionalidade(diretorNacionalidade.id_nacionalidade)
            let diretor = await controllerdiretor.buscarDiretor(diretorNacionalidade.id_diretor)

            if(nacionalidade.status){
                diretorNacionalidade.nacionalidade = nacionalidade.response.nacionalidade
                delete diretorNacionalidade.id_nacionalidade
            }
            if(diretor.status) {
                diretorNacionalidade.diretor = diretor.response.diretor
                delete diretorNacionalidade.id_diretor
            }
        }

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

    if(response != null) base.DEFAULT_MESSAGE.response.diretorNacionalidade = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}


module.exports = {
    inserirNovoDiretorNacionalidade,
    atualizarDiretorNacionalidade,
    listarDiretorNacionalidade,
    buscarDiretorNacionalidade,
    excluirDiretorNacionalidade
}