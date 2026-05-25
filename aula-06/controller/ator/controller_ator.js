/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de ator
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

const config_message = require('../module/configMessages.js')
const atorDAO = require('../../model/DAO/ator/ator.js')
const controller_ator_atividade = require('./controller_ator_atividade.js')
const controller_ator_nacionalidade = require('./controller_ator_nacionalidade.js')

// inserir nova ator
const inserirNovoAtor = async (ator, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let validar = await validarDados(ator, contentType)
        if(validar) return validar // 400 ou 415

        let result = await atorDAO.insertAtor(ator)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        ator.id = result

        for (const atividade of ator.atividade || []) {
            let atorAtividade = { id_atividade: atividade.id, id_ator: ator.id }
            let resultInsertAtividade = await controller_ator_atividade.inserirNovoAtorAtividade(atorAtividade, contentType)
            if(!resultInsertAtividade.status) return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        for (const nacionalidade of ator.nacionalidade || []) {
            let atorNacionalidade = { id_nacionalidade: nacionalidade.id, id_ator: ator.id }
            let resultInsertNacionalidade = await controller_ator_nacionalidade.inserirNovoAtorNacionalidade(atorNacionalidade, contentType)
            if(!resultInsertNacionalidade.status) return message.SUCESS_CREATED_ITEM_WARNING // 201
        }

        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, ator) // 201

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// atualizar ator
const atualizarAtor = async (ator, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(ator, contentType)
        if(validar) return validar

        let resultBuscarId = await buscarAtor(id)
        if(!resultBuscarId.status) return resultBuscarId // 400 e 404

        ator.id = Number(id)
        let result = await atorDAO.updateAtor(ator)

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, ator) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

// listar todas ators
const listarAtor = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await atorDAO.selectAllAtor()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // 500

        // verfica se o array é vazio
        if(result.length < 1) return message.ERROR_NOT_FOUND // status_code 404

        for (ator of result) {
            let atividades = await controller_ator_atividade.buscarAtividadesIdAtor(ator.id)
            if(atividades.status) {
                ator.atividade = atividades.response.atorAtividade
            } else {
                ator.atividade = []
            }

            let nacionalidades = await controller_ator_nacionalidade.buscarNacionalidadesIdAtor(ator.id)
            if(nacionalidades.status) {
                ator.nacionalidade = nacionalidades.response.atorNacionalidade
            } else {
                ator.nacionalidade = []
            }
        }

        let listarAtorMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarAtorMessage // status_code 200

    } catch (error) {console.log(error)}
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

        if(result.length <= 0) return config_message.ERROR_NOT_FOUND // 404

        for (ator of result) {
            let atividades = await controller_ator_atividade.buscarAtividadesIdAtor(ator.id)
            if(atividades.status) {
                ator.atividade = atividades.response.atorAtividade
            } else {
                ator.atividade = []
            }

            let nacionalidades = await controller_ator_nacionalidade.buscarNacionalidadesIdAtor(ator.id)
            if(nacionalidades.status) {
                ator.nacionalidade = nacionalidades.response.atorNacionalidade
            } else {
                ator.nacionalidade = []
            }
        }

        return await montarMensagem(message, message.SUCESS_RESPONSE, result)

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

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
}

const validarDados = async (ator, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    if(ator.nome == undefined || ator.nome == null || ator.nome == '' || ator.nome.length > 100 || typeof(ator.nome) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.data_nascimento == undefined || ator.data_nascimento == null || ator.data_nascimento == '' || ator.data_nascimento.length != 10 || typeof(ator.data_nascimento) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[DATA NASCIMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.data_falecimento.length > 10){
        message.ERROR_BAD_REQUEST.field = '[DATA FALECIMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.ativo == null || ator.ativo != 0 && ator.ativo != 1){
        message.ERROR_BAD_REQUEST.field = '[ATIVO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.biografia == undefined || ator.biografia == null || ator.biografia == '' || ator.biografia.length > 250 || typeof(ator.biografia) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    if(ator.foto.length > 255){
        message.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    }

    return false
}

const montarMensagem = async (base,status,response = null) => {
    base.DEFAULT_MESSAGE.status = status.status
    base.DEFAULT_MESSAGE.status_code = status.status_code
    base.DEFAULT_MESSAGE.message = status.message

    if(response != null) base.DEFAULT_MESSAGE.response.ator = response

    return base.DEFAULT_MESSAGE // 200 ou 201
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