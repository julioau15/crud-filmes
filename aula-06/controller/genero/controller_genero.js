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
    /* Criando um clone do objeto JSON para manipular sua 
     * estrutura local sem modificar a estrutura original */
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // valida dados obrigatórios
        let validar = await validarDados(genero)
        if(validar)
            return validar

        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json')
            return message.ERROR_CONTENT_TYPE // Status code 415
        
        // tenta inserir no banco
        let result = await generoDAO.insertGenero(genero)
                
        if(result){
            genero.id = result
            message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response = genero
            return message.DEFAULT_MESSAGE // Status code 201
        }

        return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // Status code 500  
    }
}

// Função para atualizar um genero
const atualizarGenero = async (genero, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Valida se o formato de dados é JSON
        if(String(contentType).toLowerCase() != 'application/json')
            return message.ERROR_CONTENT_TYPE // Status code 415

        let resultBuscarID = await buscarGenero(id)

        // Valida se é possivel encontrar o genero
            // Se o status for true, o genero foi encontrado
            // Se for false, o genero não foi encontrado ou houve um erro de processamento
        if(!resultBuscarID.status)
            return resultBuscarID // Status code 400 ou 404 ou 500

        // valida dados obrigatórios
        let validar = await validarDados(genero)
        if(validar)
            return validar
        
        // adiciona atributo 'id' do genero no JSON para ser enviado no DAO
        genero.id = id
        let result = await generoDAO.updateGenero(genero) // Tenta update no banco
        
        // retorno sucesso
        if(result){
            message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATE_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATE_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATE_ITEM.message
            message.DEFAULT_MESSAGE.response = genero
            return message.DEFAULT_MESSAGE // Status code 200
        }

        // Erro na model
        return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // Status code 500  
    }
}

// Função para retornar Todos generos
const listarGenero = async () => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        // executa a função para retornar todos os generos
        let result = await generoDAO.selectAllGenero()

        if(result){
            // verfica se o array é vazio
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.genero = result
                return message.DEFAULT_MESSAGE // status_code 200
            }

            return message.ERROR_NOT_FOUND // status_code 404

        } else
            return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
    }
    
}

// Função para buscar um genero pelo ID
const buscarGenero = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))
    try {
        // tratamentos dados incorretos
        if (id == undefined || id.trim() == '' || id == null || id < 1 || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // status_code 400
        }
        // executa a função para retornar um genero pelo id
        let result = await generoDAO.selectByIdGenero(id)

        if(result){
            // verfica se o array é vazio
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.genero = result
                return message.DEFAULT_MESSAGE // status_code 200
            }

            return message.ERROR_NOT_FOUND // status_code 404

        } else
            return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
    }
    
}

// Função para excluir um genero
const excluirGenero = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Validaçao do erro 400 e 404
        let resultBuscarID = await buscarGenero(id)

        if(!resultBuscarID.status)
            return resultBuscarID

        // executa a função que deleta um genero pelo id no banco de dados
        let result = await generoDAO.deleteGenero(id)

        if(result){
            message.DEFAULT_MESSAGE.status = message.SUCESS_DELETE_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETE_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCESS_DELETE_ITEM.message
            return message.DEFAULT_MESSAGE // status_code 200
        }
        
        return message.ERROR_INTERNAL_SERVER_MODEL // status_code 500
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
    }
}

// Função para validar todos os dados de genero (Obrigatórios, Quantidade de caracteres, etc)
const validarDados = async (genero) => {
    /* Criando um clone do objeto JSON para manipular sua 
     * estrutura local sem modificar a estrutura original */
    let message = JSON.parse(JSON.stringify(config_message))

    // Validação de dados para os atributos do genero (Status 400)
    if(genero.genero == undefined || genero.genero == null || genero.genero == '' || genero.genero.length > 80){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    return false
}

module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero
}