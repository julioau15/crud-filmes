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

    } catch (error) {console.log(error)}

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

    } catch (error) {console.log(error)}

    return false
}

// select de todas filmeGeneros
const selectAllFilmeGenero = async () => {
    let sql = `SELECT * FROM tbl_filme_genero ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
 
    } catch (error) {console.log(error)}

    return false
}

// select de uma filmeGenero pelo id
const selectByIdFilmeGenero = async (id) => {
    let sql = `SELECT * FROM tbl_filme_genero
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// delete de filmeGenero
const deleteFilmeGenero = async (id) => {
    let sql = `DELETE FROM tbl_filme_genero
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

// select de todos filmes buscando pelo id do genero
const selectFilmesByIdGenero = async (idGenero) => {
    let sql = `SELECT tbl_filme.*
               FROM tbl_filme
                    INNER JOIN tbl_filme_genero
                        ON tbl_filme.id = tbl_filme_genero.id_filme
                    INNER JOIN tbl_genero
                        ON tbl_genero.id = tbl_filme_genero.id_genero
               WHERE tbl_genero.id = ${idGenero}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos generos buscando pelo id do filme
const selectGenerosByIdFilme = async (idFilme) => {
    let sql = `SELECT tbl_genero.*
               FROM tbl_filme
                    INNER JOIN tbl_filme_genero
                        ON tbl_filme.id = tbl_filme_genero.id_filme
                    INNER JOIN tbl_genero
                        ON tbl_genero.id = tbl_filme_genero.id_genero
               WHERE tbl_filme.id = ${idFilme}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// função para excluir os generos filtrando pelos Ids do filme
const deleteGenerosByIdFilme = async (idFilme) => {
    let sql = `DELETE FROM tbl_filme_genero
               WHERE id_filme = ${idFilme}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectFilmesByIdGenero,
    selectGenerosByIdFilme,
    deleteGenerosByIdFilme
}