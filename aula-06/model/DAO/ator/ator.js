/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela ator
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de ator
const insertAtor = async (ator) => {
    let sql = `INSERT INTO tbl_ator (nome, data_nascimento, data_falecimento, ativo, biografia, foto)
               VALUES ('${ator.nome}',
                       '${ator.data_nascimento}',
                       if('${ator.data_falecimento}' = '', null, '${ator.data_falecimento}'),
                       ${ator.ativo},
                       '${ator.biografia}',
                       if('${ator.foto}' = '', null, '${ator.foto}')
                       )`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {console.log(error)}

    return false
}

// update de ator
const updateAtor = async (ator) => {
    let sql = `UPDATE tbl_ator
               SET  nome                = '${ator.nome}',
                    data_nascimento     = '${ator.data_nascimento}',
                    data_falecimento    = if('${ator.data_falecimento}' = '', null, '${ator.data_falecimento}'),
                    ativo               = ${ator.ativo},
                    biografia           = '${ator.biografia}',
                    foto                = if('${ator.foto}' = '', null, '${ator.foto}')
               WHERE id  = ${ator.id}`
    try {
        
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {console.log(error)}

    return false
}

// select de todas ators
const selectAllAtor = async () => {
    let sql = `SELECT * FROM tbl_ator ORDER BY id DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {console.log(error)}

    return false
}

// select de uma ator pelo id
const selectByIdAtor = async (id) => {
    let sql = `SELECT * FROM tbl_ator
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// delete de ator
const deleteAtor = async (id) => {
    let sql = `DELETE FROM tbl_ator
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertAtor,
    updateAtor,
    selectAllAtor,
    selectByIdAtor,
    deleteAtor
}