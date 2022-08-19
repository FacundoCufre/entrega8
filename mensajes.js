const fs = require('fs')

class Mensajes{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(msg){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse = JSON.parse(data)
            if(dataParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataParse, {...msg}] , null, 2) )
            }
            else{
                await fs.promises.writeFile(this.ruta, JSON.stringify( [{...msg}], null, 2) )
            }
            
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