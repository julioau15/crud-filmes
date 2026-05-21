/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela atorAtividade
 * Data: 20/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de atorAtividade
const insertAtorAtividade = async (atorAtividade) => {
    let sql = `INSERT INTO tbl_ator_atividade (id_atividade, id_ator)
               VALUES (${atorAtividade.id_atividade}, ${atorAtividade.id_ator})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de atorAtividade
const updateAtorAtividade = async (atorAtividade) => {
    let sql = `UPDATE tbl_ator_atividade
               SET id_atividade  = ${atorAtividade.id_atividade},
                   id_ator = ${atorAtividade.id_ator}
               WHERE id = ${atorAtividade.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}
// select de todas atorAtividades
const selectAllAtorAtividade = async () => {
    let sql = `SELECT * FROM tbl_ator_atividade ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma atorAtividade pelo id
const selectByIdAtorAtividade = async (id) => {
    let sql = `SELECT * FROM tbl_ator_atividade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de atorAtividade
const deleteAtorAtividade = async (id) => {
    let sql = `DELETE FROM tbl_ator_atividade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertAtorAtividade,
    updateAtorAtividade,
    selectAllAtorAtividade,
    selectByIdAtorAtividade,
    deleteAtorAtividade
}