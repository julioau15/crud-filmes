/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela filme
 * Data: 15/04/2026
 * Autor: Julio Augusto
 * Versão: 1.0
 * *********************************************************************************/

// Import da biblioteca para gerenciar o DB MySQL no node.js
const knex = require('knex')

// Import do arquivo de configuração para conexão com o DB MySQL
const knexConfig = require('../../database_config_knex/knexFile')

// Cria a conexão com o DB MySQL
const knexConex = knex(knexConfig.development)

// Função para inserir dados na tabela de filme
const insertFilme = async (filme) => {
    try {

        let sql = `
                    INSERT INTO tbl_filme (
                        nome,
                        data_lancamento,
                        duracao,
                        sinopse,
                        avaliacao,
                        valor,
                        capa
                    ) 
                    VALUES (
                        '${filme.nome}',
                        '${filme.data_lancamento}',
                        '${filme.duracao}',
                        '${filme.sinopse}',
                        if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                        '${filme.valor}',
                        '${filme.capa}'
                    );`

        // Executa script SQL no banco de dados            
        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para atualizar dados da tabela de filme
const updateFilme = async (filme) => {

}

// Função para retornar todos os dados da tabela de filme
const selectAllFilme = async () => {
    try {
        // script para retornar todos os filmes ondenando pelo id em ordem decrescente
        let sql = `SELECT * FROM tbl_filme ORDER BY id DESC;`
        
        // executa o script para retornar todos filmes no banco
        let result = await knexConex.raw(sql)

        // verifica se o banco retornou um array
        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para retornar os dados do filme filtrando pelo id
const selectByIdFilme = async (id) => {
    try {
        // script para retornar todos os filmes
        let sql = `SELECT * FROM tbl_filme WHERE id = ${id} ORDER BY id DESC;`
        
        // executa o script para retornar todos filmes no banco
        let result = await knexConex.raw(sql)

        // verifica se o banco retornou um array
        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para deletar um filme pelo id
const deleteFilme = async (id) => {
    try {
        // script sql para deletar um filme no banco
        let sql = `DELETE FROM tbl_filme WHERE id = ${id}`

        // executa script sql no banco
        let result = await knexConex.raw(sql)

        if(result){
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}