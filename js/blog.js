
//Esto espera que la página cargue completamente
document.addEventListener("DOMContentLoaded", ()=>{

    //lee del localStorage la clave carrito, la convierte a objeto con JSON.parse, si no existe arranca con un array vacío ([])
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//declarar la función que se responsabiliza de buscar productos desde la API y ponerlos en pantalla.
    const renderizarProductos = ()=>{
        
        //se define la url desde donde se traen los productos
        url= "https://dummyjson.com/products/category/sunglasses";

        // se hace un fetch (petición HTTP) a la API, luego se convierte la respuesta a JSON,dentro del .then(data => {...}) obtiene un objeto con los datos de los productos
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //se declara una variable que agarra del DOM el contenedor donde se van a inyectar las tarjetas de productos
                let contenedorProductos = document.getElementById("contenedor-productos");

                //recorrer los productos que la api devolvio
                for(const producto of data.products){

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

                    let descripcionProducto = document.createElement("p");
                    descripcionProducto.classList.add("descripcion-producto");
                    descripcionProducto.textContent = producto.description;

                    let btnAgregar = document.createElement("button");
                    btnAgregar.classList.add("boton-producto");
                    btnAgregar.textContent = "Agregar";
                    
                    btnAgregar.addEventListener("click", ()=>{
                    const confirmar = confirm(`¿Seguro que querés agregar "${producto.title}" al carrito?`);
                    if (confirmar) {
                   agregarProducto(producto);
                   actualizarAgregados();
                  alert(`${producto.title} agregado al carrito`);
                  } else {
                  alert(`No se agregó "${producto.title}"`);
                  }
                    })

//se agregan los elementos del producto a la tarjeta producto
                    tarjetaProducto.appendChild(imagenProducto);
                    tarjetaProducto.appendChild(tituloProducto);
                    tarjetaProducto.appendChild(precioProducto);
                    tarjetaProducto.appendChild(descripcionProducto);
                    tarjetaProducto.appendChild(btnAgregar);
//y la tarjeta se inyecta en el contenedor producto
                    contenedorProductos.appendChild(tarjetaProducto)
                    
                }

            }) 
            //agarra errores
            .catch(err => console.error("Error: ", err));    
    
    };

	const agregarProducto = (producto)=>{
        //agrega el producto al array carrito
		carrito.push(producto);

        //actualiza el localStorage con el nuevo carrito
		localStorage.setItem("carrito",JSON.stringify(carrito));
	}

	const actualizarAgregados= ()=>{
        // captura en la variable  un elemento con el id="contador-carrito" 
		const contadorCarrito = document.getElementById("contador-carrito");
        //recorre el carrito(la cantidad de productos que hay)y pone el número de productos que cuenta en el carrito
		contadorCarrito.textContent = carrito.length;
	}
    
    //renderiza los productos y actualiza el contador de carrito
	renderizarProductos();
	actualizarAgregados();
});