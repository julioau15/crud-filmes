/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela classificacao
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de classificacao
const insertClassificacao = async (classificacao) => {
    let sql = `INSERT INTO tbl_classificacao (simbolo, classificacao, descricao)
               VALUES ('${classificacao.simbolo}',
                       '${classificacao.classificacao}',
                       '${classificacao.descricao}')`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de classificacao
const updateClassificacao = async (classificacao) => {
    let sql = `UPDATE tbl_classificacao
               SET simbolo         = '${classificacao.simbolo}',
                   classificacao = '${classificacao.classificacao}',
                   descricao     = '${classificacao.descricao}'
               WHERE id  = ${classificacao.id}`
    try {
        
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {}

    return false
}
// select de todas classificacaos
const selectAllClassificacao = async () => {
    let sql = `SELECT * FROM tbl_classificacao ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma classificacao pelo id
const selectByIdClassificacao = async (id) => {
    let sql = `SELECT * FROM tbl_classificacao
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de classificacao
const deleteClassificacao = async (id) => {
    let sql = `DELETE FROM tbl_classificacao
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}