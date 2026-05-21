/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela diretorNacionalidade
 * Data: 20/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de diretorNacionalidade
const insertDiretorNacionalidade = async (diretorNacionalidade) => {
    let sql = `INSERT INTO tbl_diretor_nacionalidade (id_nacionalidade, id_diretor)
               VALUES (${diretorNacionalidade.id_nacionalidade}, ${diretorNacionalidade.id_diretor})`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {}

    return false
}

// update de diretorNacionalidade
const updateDiretorNacionalidade = async (diretorNacionalidade) => {
    let sql = `UPDATE tbl_diretor_nacionalidade
               SET id_nacionalidade  = ${diretorNacionalidade.id_nacionalidade},
                   id_diretor = ${diretorNacionalidade.id_diretor}
               WHERE id = ${diretorNacionalidade.id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response

    } catch (error) {}

    return false
}
// select de todas diretorNacionalidades
const selectAllDiretorNacionalidade = async () => {
    let sql = `SELECT * FROM tbl_diretor_nacionalidade ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {}

    return false
}

// select de uma diretorNacionalidade pelo id
const selectByIdDiretorNacionalidade = async (id) => {
    let sql = `SELECT * FROM tbl_diretor_nacionalidade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {}

    return false
}
// delete de diretorNacionalidade
const deleteDiretorNacionalidade = async (id) => {
    let sql = `DELETE FROM tbl_diretor_nacionalidade
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {}

    return false
}

module.exports = {
    insertDiretorNacionalidade,
    updateDiretorNacionalidade,
    selectAllDiretorNacionalidade,
    selectByIdDiretorNacionalidade,
    deleteDiretorNacionalidade
}