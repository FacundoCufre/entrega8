const fs = require('fs')
const {optionssql} = require('./sqlite3/conexionsql3')
const knex = require('knex')(optionssql)

class Mensajes{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try{
            await knex(this.ruta).insert({
                mail: obj.mail,
                mensaje: obj.mensaje
            })
        }
        catch(error){
            console.log(error)
        }
    }
    async getAll(){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            if(!dataParse.length){
                console.log('no hay mensajes')
            }
            else{
                console.log('aaa')
            }
            return dataParse
        }
        catch(error){
            console.log(error )
        }
    }
}

module.exports = Mensajes