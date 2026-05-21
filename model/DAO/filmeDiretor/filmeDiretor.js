/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela filmeDiretor
 * Data: 20/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de filmeDiretor
const insertFilmeDiretor = async (filmeDiretor) => {
    let sql = `INSERT INTO tbl_filme_diretor (id_filme, id_diretor)
               VALUES (${filmeDiretor.id_filme}, ${filmeDiretor.id_diretor})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de filmeDiretor
const updateFilmeDiretor = async (filmeDiretor) => {
    let sql = `UPDATE tbl_filme_diretor
               SET id_filme  = ${filmeDiretor.id_filme},
                   id_diretor = ${filmeDiretor.id_diretor}
               WHERE id = ${filmeDiretor.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}
// select de todas filmeDiretors
const selectAllFilmeDiretor = async () => {
    let sql = `SELECT * FROM tbl_filme_diretor ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma filmeDiretor pelo id
const selectByIdFilmeDiretor = async (id) => {
    let sql = `SELECT * FROM tbl_filme_diretor
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de filmeDiretor
const deleteFilmeDiretor = async (id) => {
    let sql = `DELETE FROM tbl_filme_diretor
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertFilmeDiretor,
    updateFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    deleteFilmeDiretor
}