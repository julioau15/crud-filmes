/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de generos
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *******************************************************************************************************/

// Import do arquivo de padronização de mensagens
const config_message = require('../module/configMessages.js')

// Import do arquivo DAO para fazer o CRUD do genero no banco de dados
const generoDAO = require('../../model/DAO/genero/genero.js')

// Função para inserir um novo genero
const inserirNovoGenero = async (genero, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // valida dados obrigatórios
        let validar = await validarDados(genero, contentType)
        if(validar) return validar // 400 e 415
        
        // tenta inserir no banco
        let result = await generoDAO.insertGenero(genero)
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500
        
        genero.id = Number(result)
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, genero)

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // Status code 500 
}

// Função para atualizar um genero
const atualizarGenero = async (genero, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarGenero(id)
        if(!resultBuscarID.status) return resultBuscarID // Status code 400 ou 404 ou 500

        // valida dados obrigatórios
        let validar = await validarDados(genero, contentType)
        if(validar) return validar  // 400 e 415
    
        genero.id = Number(id)
        let result = await generoDAO.updateGenero(genero) // Tenta update no banco

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500
        
        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, genero) // 200
        
    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // Status code 500  
}

// Função para retornar Todos generos
const listarGenero = async () => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        // executa a função para retornar todos os generos
        let result = await generoDAO.selectAllGenero()

        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500

        if(result.length < 1) return message.ERROR_NOT_FOUND // status_code 404

        let listarGeneroMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        listarGeneroMessage.response.count = result.length
        
        return listarGeneroMessage // status_code 200
            
    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
}

// Função para buscar um genero pelo ID
const buscarGenero = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        let resultValidarId = await validarId(id)
        if(resultValidarId) return resultValidarId // 400

        // executa a função para retornar um genero pelo id
        let result = await generoDAO.selectByIdGenero(id)

        if(!result)  return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500
        if(result.length < 1) return message.ERROR_NOT_FOUND // status_code 404

        return await montarMensagem(message, message.SUCESS_RESPONSE, result) // 200
    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
}

// Função para excluir um genero
const excluirGenero = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarGenero(id)
        if(!resultBuscarID.status) return resultBuscarID // 404 e 400

        // executa a função que deleta um genero pelo id no banco de dados
        let result = await generoDAO.deleteGenero(id)
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM) // 200
    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
}

// Função para validar todos os dados de genero (Obrigatórios, Quantidade de caracteres, etc)
const validarDados = async (genero, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    // Validação de dados para os atributos do genero (Status 400)
    if(genero.genero == undefined || genero.genero == null || genero.genero == '' || genero.genero.length > 80 || typeof(genero.genero) != 'string'){
        message.ERROR_BAD_REQUEST.field = '[GENERO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
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

    if(response != null) base.DEFAULT_MESSAGE.response.genero = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero
}