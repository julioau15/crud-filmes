/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela atividade
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de atividade
const insertAtividade = async (atividade) => {
    let sql = `INSERT INTO tbl_atividade (nome)
               VALUES ('${atividade.nome}')`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de atividade
const updateAtividade = async (atividade) => {
    let sql = `UPDATE tbl_atividade
               SET nome = '${atividade.nome}'
               WHERE id = ${atividade.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}
// select de todas atividades
const selectAllAtividade = async () => {
    let sql = `SELECT * FROM tbl_atividade ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma atividade pelo id
const selectByIdAtividade = async (id) => {
    let sql = `SELECT * FROM tbl_atividade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de atividade
const deleteAtividade = async (id) => {
    let sql = `DELETE FROM tbl_atividade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertAtividade,
    updateAtividade,
    selectAllAtividade,
    selectByIdAtividade,
    deleteAtividade
}