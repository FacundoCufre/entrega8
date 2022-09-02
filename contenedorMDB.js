const {options} = require('./mariaDB/conexionMDB')
const knex = require('knex')(options)

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }
    async insertMDB(obj){
        try{
            await knex(this.ruta).insert({
                title: obj.title,
                price: obj.price,
                thumbnail: obj.thumbnail,
            })
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports = Contenedor