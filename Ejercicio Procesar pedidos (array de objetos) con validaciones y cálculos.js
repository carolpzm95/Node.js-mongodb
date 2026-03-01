const pedidos = [
  { id: 1, cliente: "Ana", items: [{ sku: "A1", precio: 12000, cantidad: 2 }, { sku: "B1", precio: 8000, cantidad: 1 }], cupon: "DESC10" },
  { id: 2, cliente: "Luis", items: [{ sku: "A1", precio: 12000, cantidad: 1 }, { sku: "C1", precio: 20000, cantidad: 3 }], cupon: null },
  { id: 3, cliente: "Sofi", items: [{ sku: "D1", precio: 5000, cantidad: 0 }], cupon: "DESC20" }, 
  { id: 4, cliente: "Juan", items: [], cupon: "DESC10" }, 
];
const cupones = {
  DESC10: 0.10,
  DESC20: 0.20,
};

function validarPedido(pedido) {
  return new Promise((resolve, reject) => {
     if (!Array.isArray(pedido.items) || pedido.items.length === 0) {
  return reject(new Error("el pedido no tiene items"))
   
}
if (pedido.items.some(item => item.cantidad <= 0)) {
  return reject(new Error("la cantidad debe ser mayor a 0"));
}
if(pedido.items.some(item=>item.precio<=0)){
    return reject(new Error("el precio del item debe ser mayor a 0"));
}
 resolve(pedido);
  });
}
 function calcularSubtotal(pedido){
    return new Promise((resolve)=> {
const subtotal=pedido.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
resolve ({ ...pedido, subtotal });
    });
 }
 function aplicarDescuento(pedido,cupones){
    return new Promise((resolve)=>{
        let descuento=0;
if (pedido.cupon && cupones[pedido.cupon]) {
  const porcentaje = cupones[pedido.cupon];
  descuento = pedido.subtotal * porcentaje;
}
const total =pedido.subtotal - descuento
resolve({...pedido, descuento, total });

  });
}

function procesarPedidos (pedidos,cupones){
     const pedidosOK = [];
const pedidosError = [];
const promesas = pedidos.map(pedido =>
  validarPedido(pedido)
    .then(calcularSubtotal)
    .then(p => aplicarDescuento(p, cupones))
    .catch(error => pedidosError.push({ id: pedido.id, cliente: pedido.cliente, error: error.message }))
  
);
Promise.allSettled(promesas).then(resultados => {
    resultados.forEach(resultado => {
  if (resultado.status === "fulfilled" && resultado.value?.total) {
    pedidosOK.push(resultado.value);
  }
  });
const resumenClientes = pedidosOK.reduce((acc, pedido) => {
  acc[pedido.cliente] = (acc[pedido.cliente] || 0) + pedido.total;
  return acc;
  }, {});
const totalGeneral = pedidosOK.reduce((acc, pedido) => acc + pedido.total, 0);
console.log({ pedidosOK, pedidosError, resumenClientes, totalGeneral });
});
}
procesarPedidos(pedidos, cupones);