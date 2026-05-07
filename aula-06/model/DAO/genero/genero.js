/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela genero
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

// Import da biblioteca para gerenciar o DB MySQL no node.js
const knex = require('knex')

// Import do arquivo de configuração para conexão com o DB MySQL
const knexConfig = require('../../database_config_knex/knexFile')

// Cria a conexão com o DB MySQL
const knexConex = knex(knexConfig.development)

// Função para inserir dados na tabela de genero
const insertGenero = async (genero) => {
    try {

        let sql = `
                    INSERT INTO tbl_genero (genero) 
                    VALUES ('${genero.genero}');
                  `

        // Executa script SQL no banco de dados            
        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para atualizar dados da tabela de genero
const updateGenero = async (genero) => {
    try {
        let sql = `
        UPDATE tbl_genero
        SET genero = '${genero.genero}'
        WHERE id = ${genero.id}
        `
        // Executa script SQL no banco de dados            
        let result = await knexConex.raw(sql)
        
        if(result)
            return result

        return false

    } catch (error) {
        console.log(error)
        return false
    }
    
}

// Função para retornar todos os dados da tabela de genero
const selectAllGenero = async () => {
    try {
        // script para retornar todos os generos ondenando pelo id em ordem decrescente
        let sql = `SELECT * FROM tbl_genero ORDER BY id DESC;`
        
        // executa o script para retornar todos generos no banco
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

// Função para retornar os dados do genero filtrando pelo id
const selectByIdGenero = async (id) => {
    try {
        // script para retornar todos os generos
        let sql = `SELECT * FROM tbl_genero WHERE id = ${id} ORDER BY id DESC;`
        
        // executa o script para retornar todos generos no banco
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

// Função para deletar um genero pelo id
const deleteGenero = async (id) => {
    try {
        // script sql para deletar um genero no banco
        let sql = `DELETE FROM tbl_genero WHERE id = ${id}`

        // executa script sql no banco
        let result = await knexConex.raw(sql)

        if(result){
            return result
        }
        return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}