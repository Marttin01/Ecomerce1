let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos (productos);
    })

const botonLista = document.querySelectorAll(".boton-lista");
const tituloPrincipal = document.querySelector("#titulo-principal");
const contenedorProducto = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let numerito = document.querySelector("#numerito")

function cargarProductos (productosElegidos)  {

    contenedorProducto.innerHTML = " ";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("contenedor-producto");
        div.innerHTML = `
        <img class="imagen-producto" src="${producto.imagen}" alt="${producto.titulo}" srcset="">
        <div class="producto-detalles" id="detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar"  id= "${producto.id}">Agregar</button>
        </div>
        `;
        
        contenedorProducto.append(div);
        
    })
    actualizarBotonesAgregar();
    
    
}





//Class active en los botones


botonLista.forEach(boton => {
    boton.addEventListener('click', (e) => {
        
        
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)    
            cargarProductos(productosBoton);
            
        }else {
            cargarProductos(productos);
            tituloPrincipal.innerText = "Todos los productos";
        }

        

        botonLista.forEach(boton => {
            boton.classList.remove("active")
            
        })

        e.currentTarget.classList.add("active")

    })
    
})

//DARK MODE, LIGHT MODE
const colorModeButton = document.querySelector("#color-icon");
const grilla = document.querySelector("#grilla");
const detalles = document.querySelectorAll("#detalles");
const productoAgregar = document.querySelectorAll("#agregar"); //array hecho por el querySelectorAll


colorModeButton.addEventListener("click", cambiarModoColor);

function cambiarModoColor ()  {
    grilla.classList.toggle("dark-mode");

    botonLista.forEach(boton => {
        boton.addEventListener('click', (e) => {
    
            botonLista.forEach(boton => {
                boton.classList.remove("active")
            })
    
            e.currentTarget.classList.toggle("active")
    
        })
        
    })
    
    for (let i = 0; i < botonLista.length; i++) {
        botonLista[i].classList.toggle("dark-mode")
    }
    for(let i = 0; i < detalles.length; i++) {
        detalles[i].classList.toggle("dark-mode")
    }
    for(let i = 0; i < productoAgregar.length; i++) {
        productoAgregar[i].classList.toggle("dark-mode-letter")
    }

    if(grilla.classList.contains("dark-mode")) {
        colorModeButton.classList.remove("bi-moon-fill");
        colorModeButton.classList.add("bi-brightness-high-fill");
    }else {
        colorModeButton.classList.remove("bi-brightness-high-fill");
        colorModeButton.classList.add("bi-moon-fill");
    }
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
    
}

// const productosEncarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
// if (productosEncarritoLS) {
//     let productosEncarrito = productosEncarritoLS
// }

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")
// const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.target.id; 
    const productoAgregado = productos.find (producto => producto.id === idBoton);
   

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarNumerito () {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}