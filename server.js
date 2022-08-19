const express = require('express')
const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 
const {Router} = express

const Contenedor = require("./contenedor")
const contenedor = new Contenedor("./datos.txt")

const Mensajes = require("./mensajes")
const mensajes = new Mensajes("./msg.txt")

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', async (req, res) => {
    res.sendFile('./index.html', {root: __dirname})
    const lista = await contenedor.getAll()
    
})
app.post('/', async (req, res) => {
    let title = req.body.title
    let price = req.body.price
    let thumbnail = req.body.thumbnail
    let objProducto = {title: title, price: price, thhumbnail: thumbnail,}
    contenedor.save(objProducto)
    let mensaje = req.body.message
    let mail = req.body.email
    let mensajeMail = {ma: mail, me: mensaje}
    mensajes.save(mensajeMail)
    
})
httpServer.listen(3000, () => console.log('SERVER ON'))

io.on('connection', async socket => {
    const lista = await contenedor.getAll()
    const mensajeCompleto = await mensajes.getAll()
    const mensaje = {
        msg: 'Usuario conectado',
        lista: lista,
        mensajeCompleto: mensajeCompleto
    }

    socket.emit('mensaje-servidor', mensaje)

    socket.on('producto-nuevo', (producto, cb) => {
        lista.push(producto)
        const mensaje = {
            mensaje: 'productos insertado',
            lista: lista,
            mensajeCompleto: mensajeCompleto
        }
        const id = new Date().getTime()
        io.sockets.emit('mensaje-servidor', mensaje )
        cb(id)
    })

})

  