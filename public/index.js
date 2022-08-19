const server = io().connect()



server.on('mensaje-servidor', mensaje => {
    listar(mensaje.lista)
    chat(mensaje.mensajeCompleto)
})


const listar = (lista) => {
    let listadoSection = document.getElementById('productsList')
    let html = lista.map(prod => {
        return (`<li>
            <strong>Nombre: ${prod.title}</strong>
            <em>Precio: ${prod.price}</em>
        </li>`)
    })
    listadoSection.innerHTML = html.join(' ')
}

const addProduct= (evt) => {
    const nombre = document.querySelector('#title').value
    const precio = document.querySelector('#price').value

    const producto = {nombre, precio}
    server.emit('producto-nuevo', producto, (id)=>{
        console.log(id)
    })
    return false
}

const chat = (mensajeCompleto) => {
    let chatSection = document.getElementById('chat')
    let html = mensajeCompleto.map(msg => {
        return (`<li>
            <strong>Mail: ${msg.ma}</strong>
            <em>Mensaje: ${msg.me}</em>
        </li>`)
    })
    chatSection.innerHTML = html.join(' ')
}

const addMessage= (evt) => {
    const mail = document.querySelector('#email').value
    const msg = document.querySelector('#message').value

    const mensaje = {mail, msg}
    server.emit('producto-nuevo', mensaje, (id)=>{
        console.log(id)
    })
    return false
}
