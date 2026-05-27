/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD bo Banco de dados MYSQL na tabela diretor
 * Data: 06/05/2026
 * Autor: Julio Augusto
 * Versão: 1.0.5.26
 * *********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

// insert de diretor
const insertDiretor = async (diretor) => {
    let sql = `INSERT INTO tbl_diretor (nome, data_nascimento, data_falecimento, ativo, biografia, foto)
               VALUES ('${diretor.nome}',
                       '${diretor.data_nascimento}',
                       if('${diretor.data_falecimento}' = '', null, '${diretor.data_falecimento}'),
                       ${diretor.ativo},
                       '${diretor.biografia}',
                       if('${diretor.foto}' = '', null, '${diretor.foto}')
                       )`

    try {
        let response = await knexConex.raw(sql)

        if(response) return response[0].insertId 

    } catch (error) {console.log(error)}

    return false
}

// update de diretor
const updateDiretor = async (diretor) => {
    let sql = `UPDATE tbl_diretor
               SET  nome                = '${diretor.nome}',
                    data_nascimento     = '${diretor.data_nascimento}',
                    data_falecimento    = if('${diretor.data_falecimento}' = '', null, '${diretor.data_falecimento}'),
                    ativo               = ${diretor.ativo},
                    biografia           = '${diretor.biografia}',
                    foto                = if('${diretor.foto}' = '', null, '${diretor.foto}')
               WHERE id  = ${diretor.id}`
    try {
        
        let response = await knexConex.raw(sql)


        if(response) return response

    } catch (error) {console.log(error)}

    return false
}

// select de todas diretors
const selectAllDiretor = async () => {
    let sql = ` SELECT
                id,
                nome, 
                data_nascimento, 
                date_format(data_nascimento, '%d/%m/%Y') as data_nascimento_formatada, 
                data_falecimento, 
                if(data_falecimento = null, null, date_format(data_falecimento, '%d/%m/%Y'))  as data_falecimento_formatada, 
                ativo, 
                biografia, 
                foto
                FROM tbl_diretor
                ORDER BY id
                DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
 
    } catch (error) {console.log(error)}

    return false
}

// select de uma diretor pelo id
const selectByIdDiretor = async (id) => {
    let sql = ` SELECT
                id,
                nome, 
                data_nascimento, 
                date_format(data_nascimento, '%d/%m/%Y') as data_nascimento_formatada, 
                data_falecimento, 
                if(data_falecimento = null, null, date_format(data_falecimento, '%d/%m/%Y'))  as data_falecimento_formatada, 
                ativo, 
                biografia, 
                foto
                FROM tbl_diretor
                WHERE id = ${id}
                ORDER BY id
                DESC`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response[0]
        
    } catch (error) {console.log(error)}

    return false
}

// delete de diretor
const deleteDiretor = async (id) => {
    let sql = `DELETE FROM tbl_diretor
               WHERE id = ${id}`
    try {
        let response = await knexConex.raw(sql)


        if(response) return response
 
    } catch (error) {console.log(error)}

    return false
}

module.exports = {
    insertDiretor,
    updateDiretor,
    selectAllDiretor,
    selectByIdDiretor,
    deleteDiretor
}