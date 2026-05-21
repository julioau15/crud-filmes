/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela diretorAtividade
 * Data: 20/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de diretorAtividade
const insertDiretorAtividade = async (diretorAtividade) => {
    let sql = `INSERT INTO tbl_diretor_atividade (id_atividade, id_diretor)
               VALUES (${diretorAtividade.id_atividade}, ${diretorAtividade.id_diretor})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de diretorAtividade
const updateDiretorAtividade = async (diretorAtividade) => {
    let sql = `UPDATE tbl_diretor_atividade
               SET id_atividade  = ${diretorAtividade.id_atividade},
                   id_diretor = ${diretorAtividade.id_diretor}
               WHERE id = ${diretorAtividade.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}
// select de todas diretorAtividades
const selectAllDiretorAtividade = async () => {
    let sql = `SELECT * FROM tbl_diretor_atividade ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma diretorAtividade pelo id
const selectByIdDiretorAtividade = async (id) => {
    let sql = `SELECT * FROM tbl_diretor_atividade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de diretorAtividade
const deleteDiretorAtividade = async (id) => {
    let sql = `DELETE FROM tbl_diretor_atividade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertDiretorAtividade,
    updateDiretorAtividade,
    selectAllDiretorAtividade,
    selectByIdDiretorAtividade,
    deleteDiretorAtividade
}