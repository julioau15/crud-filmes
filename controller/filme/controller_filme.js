/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD de Filmes
 * Data: 17/04/2026
 * Autor: Julio Augusto
 * Versão: 1.0.4.26
 * *******************************************************************************************************/

// Import do arquivo de padronização de mensagens
const config_message = require('../module/configMessages.js')

// Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

// Import de arquivos de Controller
const controllerClassificacao = require('../classificacao/controller_classificacao.js')

// Função para inserir um novo filme
const inserirNovoFilme = async (filme, contentType) => {
    // Criando um clone do objeto JSON para manipular sua 
    // Estrutura local sem modificar a estrutura original 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        // Se a função 'validarDados' retornar um JSON de erro, iremos retornar o erro ao app
        let validar = await validarDados(filme, contentType)
        if(validar) return validar // Status code 400
        
        let result = await filmeDAO.insertFilme(filme) // tenta inserir no banco
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500
        
        filme.id = Number(result)
        return await montarMensagem(message, message.SUCESS_CREATED_ITEM, filme) // 201
    
    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // Status code 500  
}

// Função para atualizar um filme
const atualizarFilme = async (filme, id, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarFilme(id)

        // Valida se é possivel encontrar o filme
            // Se o status for true, o filme foi encontrado
            // Se for false, o filme não foi encontrado ou houve um erro de processamento
        if(!resultBuscarID.status) return resultBuscarID // Status code 400 ou 404 ou 500

        // valida dados obrigatórios
        let validar = await validarDados(filme, contentType)
        if(validar) return validar
        
        // adiciona atributo 'id' do filme no JSON para ser enviado no DAO
        filme.id = Number(id)
        let result = await filmeDAO.updateFilme(filme) // Tenta update no banco
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500

        return await montarMensagem(message, message.SUCESS_UPDATE_ITEM, filme) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // Status code 500  
}

// Função para retornar Todos filmes
const listarFilme = async () => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeDAO.selectAllFilme() // executa a função para retornar todos os filmes
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500

        if(result.length < 1) return message.ERROR_NOT_FOUND // status_code 404

        // Percorre o array de filmes para identificar os dados da classificacao
        for (filme of result) {
            let classificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
            if(classificacao.status) {
                filme.classificacao = classificacao.response.classificacao
                delete filme.id_classificacao
            }
        }

        let listarFilmeMessage = await montarMensagem(message, message.SUCESS_RESPONSE, result)
        message.DEFAULT_MESSAGE.response.count = result.length

        return listarFilmeMessage // status_code 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
}

// Função para buscar um filme pelo ID
const buscarFilme = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultValidarId = await validarId(id)
        if (resultValidarId) return resultValidarId
        
        let result = await filmeDAO.selectByIdFilme(id) // executa a função para retornar um filme pelo id
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500

        // verfica se o array é vazio
        if(result.length < 1) return message.ERROR_NOT_FOUND // status_code 404

        // Percorre o array de filmes para identificar os dados da classificacao
        for (filme of result) {
            let classificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
            if(classificacao.status) {
                filme.classificacao = classificacao.response.classificacao
                delete filme.id_classificacao
            }
        }

        return await montarMensagem(message, message.SUCESS_RESPONSE, result) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
}

// Função para excluir um filme
const excluirFilme = async (id) => {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarFilme(id) // Validaçao do erro 400 e 404
        if(!resultBuscarID.status) return resultBuscarID
            
        // executa a função que deleta um filme pelo id no banco de dados
        let result = await filmeDAO.deleteFilme(id)
        if(!result) return message.ERROR_INTERNAL_SERVER_MODEL // Status code 500

        return await montarMensagem(message, message.SUCESS_DELETE_ITEM) // 200

    } catch (error) {console.log(error)}
    return message.ERROR_INTERNAL_SERVER_CONTROLLER // status_code 500
}

// Função para validar todos os dados de filme (Obrigatórios, Quantidade de caracteres, etc)
const validarDados = async (filme, contentType) => {
    let message = JSON.parse(JSON.stringify(config_message))

    // Valida se o formato de dados é JSON
    if(String(contentType).toLowerCase() != 'application/json') return message.ERROR_CONTENT_TYPE // Status code 415

    // Validação de dados para os atributos do filme (Status 400)
    if(filme.nome == undefined || filme.nome == null || filme.nome == '' || filme.nome.length > 80){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    
    if(filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento == '' || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA_LANÇAMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    
    if(filme.duracao == undefined || filme.duracao == null || filme.duracao == '' || filme.duracao.length < 5){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    
    if(filme.sinopse == undefined || filme.sinopse == null || filme.sinopse == ''){
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    
    if(isNaN(filme.avaliacao) || parseFloat(filme.avaliacao).toFixed(2).length > 4){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    
    if(filme.valor == undefined  || isNaN(filme.valor) || filme.valor == null || filme.valor == '' || Number(filme.valor).toFixed(2).length > 6 || isNaN(filme.valor)){
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }
    
    if(filme.capa != null && filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    if(filme.id_classificacao == undefined || filme.id_classificacao == null || isNaN(filme.id_classificacao) || filme.id_classificacao <= 0){
        message.ERROR_BAD_REQUEST.field = '[ID_CLASSIFICACAO] INVÁLIDO'
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

    if(response != null) base.DEFAULT_MESSAGE.response.filme = response

    return base.DEFAULT_MESSAGE // 200 ou 201
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}