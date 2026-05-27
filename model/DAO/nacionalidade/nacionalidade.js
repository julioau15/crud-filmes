/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela nacionalidade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de nacionalidade
const insertNacionalidade = async (nacionalidade) => {
    let sql = `INSERT INTO tbl_nacionalidade (pais, sigla)
               VALUES ('${nacionalidade.pais}',
                    if('${nacionalidade.sigla}' = '', null, '${nacionalidade.sigla}'))`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de nacionalidade
const updateNacionalidade = async (nacionalidade) => {
    let sql = `UPDATE tbl_nacionalidade
               SET pais  = '${nacionalidade.pais}',
                   sigla = if('${nacionalidade.sigla}' = '', null, '${nacionalidade.sigla}')
               WHERE id  = ${nacionalidade.id}`
    try {
        
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {}

    return false
}

// select de todas nacionalidades
const selectAllNacionalidade = async () => {
    let sql = `SELECT * FROM tbl_nacionalidade ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma nacionalidade pelo id
const selectByIdNacionalidade = async (id) => {
    let sql = `SELECT * FROM tbl_nacionalidade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}

// delete de nacionalidade
const deleteNacionalidade = async (id) => {
    let sql = `DELETE FROM tbl_nacionalidade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}