const express = require('express')
const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 
const {Router} = express

const {options} = require('./mariaDB/conexionMDB')
const {optionssql} = require('./sqlite3/conexionsql3')
const knex = require('knex')(options)
const knexsql = require('knex')(optionssql)

const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./datos.txt")

const Contenedormdb = require("./contenedorMDB")
const contenedormdb = new Contenedormdb('productos')

const Mensajes = require("./mensajes")
const mensajes = new Mensajes('mensajes')

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', async (req, res) => {
    res.sendFile('./index.html', {root: __dirname})
})
app.post('/', async (req, res) => {
    let title = req.body.title
    let price = req.body.price
    let thumbnail = req.body.thumbnail
    const obj = {title: title, price: price, thumbnail: thumbnail}
    await contenedormdb.insertMDB(obj)
    let mensaje = req.body.message
    let mail = req.body.email
    let mensajeMail = {mail: mail, mensaje: mensaje}
    mensajes.save(mensajeMail)
})
httpServer.listen(3000, () => console.log('SERVER ON'))

io.on('connection', async socket => {
    const lista = await knex.from('productos').select('*')
    const mensajeCompleto = await knexsql.from('mensajes').select('*')
    const mensaje = {
        msg: 'Usuario conectado',
        lista: lista,
        mensajeCompleto: mensajeCompleto
    }

    socket.emit('mensaje-servidor', mensaje)

})

  