let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const actualizarAgregados= ()=>{
    const contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
}

actualizarAgregados()



// Elimina un producto del carrito
const eliminarProducto = (indice) => {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarAgregados()
    MostrarCarrito()
};

const renderizarResumenCarrito = () => {
    const resumen = document.getElementById("resumen-carrito");
    resumen.innerHTML = ""; // Limpiar contenido anterior

    if (carrito.length === 0) return; // No mostrar resumen si no hay productos

    // Calcular total
    const cantidadProductos = carrito.length;
    const totalImporte = carrito.reduce((acc, producto) => acc + producto.price, 0);

    // Crear elementos
    const cantidad = document.createElement("p");
    cantidad.classList.add("cantidadProductos");
    cantidad.textContent = `Cantidad de productos: ${cantidadProductos}`;

    const total = document.createElement("p");
    total.classList.add("totalPagar")
    total.textContent = `Importe total: $${totalImporte.toFixed(2)}`;

    const btnFinalizar = document.createElement("button");
    btnFinalizar.textContent = "Finalizar compra";
    btnFinalizar.classList.add("btnFinalizar"); 

    // Evento del botón
    btnFinalizar.addEventListener("click", () => {
        alert("Gracias por tu compra 🎉");
        localStorage.removeItem("carrito");
        carrito = [];
        MostrarCarrito();
        actualizarAgregados()
    });

    // Agregar al DOM
    resumen.appendChild(cantidad);
    resumen.appendChild(total);
    resumen.appendChild(btnFinalizar);
};

MostrarCarrito = ()=>{
    const listadoCompra = document.getElementById("contenedor-carrito");

    listadoCompra.innerHTML = ''; // vacia la caja

    if(carrito.length === 0){
        let carritoVacio = document.createElement("h3");
        carritoVacio.classList.add("carritoVacio");
        carritoVacio.textContent= "Tu carrito está VACIO";
        listadoCompra.appendChild(carritoVacio);

    }else{
                carrito.forEach((producto,indice) => {
                    
                    let tarjetaProducto = document.createElement("article");
                    tarjetaProducto.classList.add("tarjeta-producto");
                
                    let imagenProducto = document.createElement("img");
                    imagenProducto.src = producto.images[0];
                    imagenProducto.alt = producto.description;

                    let tituloProducto = document.createElement("h3");
                    tituloProducto.classList.add("titulo-producto");
                    tituloProducto.textContent = producto.title;

                    let precioProducto = document.createElement("p");
                    precioProducto.textContent = `$${producto.price}`;

                    let btnEliminar = document.createElement("button")
                    btnEliminar.classList.add("btnEliminar");
                    btnEliminar.textContent = "Eliminar"

                    btnEliminar.addEventListener("click", ()=>{
                        const confirmar = confirm(`¿Seguro que querés eliminar "${producto.title}" del carrito?`);
                    if (confirmar) {
                   eliminarProducto(indice);
                   actualizarAgregados();
                  alert(`${producto.title} eliminado del carrito`);
                  } 
                    })

                    tarjetaProducto.appendChild(imagenProducto);
                    tarjetaProducto.appendChild(tituloProducto);
                    tarjetaProducto.appendChild(precioProducto);
                    tarjetaProducto.appendChild(btnEliminar);

                    listadoCompra.appendChild(tarjetaProducto)
        })
    }
    renderizarResumenCarrito();
}

MostrarCarrito()