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

// select de todos filmes buscando pelo id do diretor
const selectFilmesByDiretor = async (idDiretor) => {
    let sql = `SELECT tbl_filme.*
               FROM tbl_filme
                    INNER JOIN tbl_filme_diretor
                        ON tbl_filme.id = tbl_filme_diretor.id_filme
                    INNER JOIN tbl_diretor
                        ON tbl_diretor.id = tbl_filme_diretor.id_diretor
               WHERE tbl_diretor.id = ${idDiretor}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// select de todos diretores buscando pelo id do filme
const selectDiretoresByFilme = async (idFilme) => {
    let sql = `SELECT tbl_diretor.*
               FROM tbl_diretor
                    INNER JOIN tbl_filme_diretor
                        ON tbl_diretor.id = tbl_filme_diretor.id_diretor
                    INNER JOIN tbl_filme
                        ON tbl_filme.id = tbl_filme_diretor.id_filme
               WHERE tbl_filme.id = ${idFilme}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// função para excluir os diretores filtrando pelo Id do filme
const deleteDiretoresByIdFilme = async (idFilme) => {
    let sql = `DELETE FROM tbl_filme_diretor
               WHERE id_filme = ${idFilme}`
    try {
        let response = await knexConex.raw(sql)

        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertFilmeDiretor,
    updateFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    deleteFilmeDiretor,
    selectFilmesByDiretor,
    selectDiretoresByFilme,
    deleteDiretoresByIdFilme
}