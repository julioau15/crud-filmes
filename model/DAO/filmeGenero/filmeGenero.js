/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela filmeGenero
 * Data: 20/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de filmeGenero
const insertFilmeGenero = async (filmeGenero) => {
    let sql = `INSERT INTO tbl_filme_genero (id_filme, id_genero)
               VALUES (${filmeGenero.id_filme}, ${filmeGenero.id_genero})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de filmeGenero
const updateFilmeGenero = async (filmeGenero) => {
    let sql = `UPDATE tbl_filme_genero
               SET id_filme  = ${filmeGenero.id_filme},
                   id_genero = ${filmeGenero.id_genero}
               WHERE id = ${filmeGenero.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}
// select de todas filmeGeneros
const selectAllFilmeGenero = async () => {
    let sql = `SELECT * FROM tbl_filme_genero ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma filmeGenero pelo id
const selectByIdFilmeGenero = async (id) => {
    let sql = `SELECT * FROM tbl_filme_genero
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de filmeGenero
const deleteFilmeGenero = async (id) => {
    let sql = `DELETE FROM tbl_filme_genero
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero
}