/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela atorNacionalidade
 * Data: 20/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de atorNacionalidade
const insertAtorNacionalidade = async (atorNacionalidade) => {
    let sql = `INSERT INTO tbl_ator_nacionalidade (id_nacionalidade, id_ator)
               VALUES (${atorNacionalidade.id_nacionalidade}, ${atorNacionalidade.id_ator})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de atorNacionalidade
const updateAtorNacionalidade = async (atorNacionalidade) => {
    let sql = `UPDATE tbl_ator_nacionalidade
               SET id_nacionalidade  = ${atorNacionalidade.id_nacionalidade},
                   id_ator = ${atorNacionalidade.id_ator}
               WHERE id = ${atorNacionalidade.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}
// select de todas atorNacionalidades
const selectAllAtorNacionalidade = async () => {
    let sql = `SELECT * FROM tbl_ator_nacionalidade ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma atorNacionalidade pelo id
const selectByIdAtorNacionalidade = async (id) => {
    let sql = `SELECT * FROM tbl_ator_nacionalidade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de atorNacionalidade
const deleteAtorNacionalidade = async (id) => {
    let sql = `DELETE FROM tbl_ator_nacionalidade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertAtorNacionalidade,
    updateAtorNacionalidade,
    selectAllAtorNacionalidade,
    selectByIdAtorNacionalidade,
    deleteAtorNacionalidade
}