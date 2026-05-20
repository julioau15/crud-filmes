/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela filmeAtor
 * Data: 20/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de filmeAtor
const insertFilmeAtor = async (filmeAtor) => {
    let sql = `INSERT INTO tbl_filme_ator (id_filme, id_ator)
               VALUES (${filmeAtor.id_filme}, ${filmeAtor.id_ator})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de filmeAtor
const updateFilmeAtor = async (filmeAtor) => {
    let sql = `UPDATE tbl_filme_ator
               SET id_filme  = ${filmeAtor.id_filme},
                   id_ator = ${filmeAtor.id_ator}
               WHERE id = ${filmeAtor.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}
// select de todas filmeAtors
const selectAllFilmeAtor = async () => {
    let sql = `SELECT * FROM tbl_filme_ator ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma filmeAtor pelo id
const selectByIdFilmeAtor = async (id) => {
    let sql = `SELECT * FROM tbl_filme_ator
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de filmeAtor
const deleteFilmeAtor = async (id) => {
    let sql = `DELETE FROM tbl_filme_ator
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertFilmeAtor,
    updateFilmeAtor,
    selectAllFilmeAtor,
    selectByIdFilmeAtor,
    deleteFilmeAtor
}