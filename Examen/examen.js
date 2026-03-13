//1.Node js es un entorno para correr javascript en el servidor y se utiliza para creacion de APis y aplicaciones web
//2. la diferencia esque JavaScript del navegador se utiliza para que las paginas web sean interactivas y javascript con nodejs se usa para manejar datos,bases de datos y la logica
//3.significa que nodejs  hace varias cosas al mismo tiempo por lo tanto es asincrono  y no se bloquea esperando una tarea, sigue adelante aneja otras cosas adelante
//4.sirve para  importar bibliotecas o archivos reutilizandolos
//5.la diferencia es que Var declara una variable con ambito de funcion,let declara una variable con ambito de bloque, const declara una constante  con ambito de bloque no puede sser ni actualizada ni redeclarada
//6.una promise o promesa es un objeto que "promete" dar un resultado mas adelante
//EJERCICIOS
//1.
let edad =25;
if (edad< 18){
    console.log("usted es menor de edad")
}
else if (edad>60){
        console.log ("usted es adulto mayor")
    }

    else {
        console.log("usted es mayor de edad")
    }

//2.
 let saldo= 7000
 saldo>=50000? "puede realizar la compra" : "saldo insuficiente"
 console.log (saldo>=50000? "puede realizar la compra" : "saldo insuficiente")
 //3.
 let numeros=[4,5,6,7,8]
 numeros.forEach(function(numero) {
    console.log(numero*2)
 });
 //4.
 let productos = [
  {nombre: "leche", precio: 4000, cantidad: 2},
  {nombre: "pan", precio: 3000, cantidad: 1},
  {nombre:"huevos",precio:2000, cantidad:5}
  
 ]
 productos.forEach(function(producto){
     console.log("Producto: " + producto.nombre)
    console.log("Total: " + producto.precio * producto.cantidad)
})

//5.
function consultarUsuario() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({id: 1, nombre: "Carlos", activo: true})
        }, 2000)
    })
}
consultarUsuario().then(function(usuario) {
    console.log(usuario)
})
async function obtenerUsuario() {
    let usuario = await consultarUsuario()
    console.log(usuario)
}
obtenerUsuario()
//6.
function procesarPedido(pedido) {
    return new Promise(function(resolve, reject) {
        if (pedido.cantidad > 0) {
            resolve({
                total: pedido.precio * pedido.cantidad
            })
        } else {
            reject("Cantidad inválida")
        }
    })
}

procesarPedido({producto: "Arroz", precio: 3000, cantidad: 2})
    .then(function(resultado) {
        console.log("Total: " + resultado.total)
    })
    .catch(function(error) {
        console.log("Error: " + error)
    })

async function ejecutar() {
    try {
        let resultado = await procesarPedido({producto: "Arroz", precio: 3000, cantidad: 2})
        console.log("Total: " + resultado.total)
    } catch(error) {
        console.log("Error: " + error)
    }
}
ejecutar()


//7.
const pedidos = [
    {producto: "Pan", precio: 2000, cantidad: 2},
    {producto: "Queso", precio: 5000, cantidad: 1},
    {producto: "Café", precio: 3000, cantidad: 4}
]

function procesarPedido(pedido) {
    return new Promise(function(resolve, reject) {
        if (pedido.cantidad > 0) {
            resolve({
                total: pedido.precio * pedido.cantidad
            })
        } else {
            reject("Cantidad inválida")
        }
    })
}

let promesas = pedidos.map(function(pedido) {
    return procesarPedido(pedido)
})

Promise.all(promesas).then(function(resultados) {
    let totalGeneral = 0
    resultados.forEach(function(resultado) {
        totalGeneral = totalGeneral + resultado.total
    })
    console.log("Total general: " + totalGeneral)
})

