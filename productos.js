let paginaActual = 1;
const productosPorPagina = 12;
let productosGlobales = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar los productos');
        }
        const data = await response.json();
        productosGlobales = data.productos;
        mostrarProductos(productosGlobales, paginaActual);
        actualizarPaginacion(productosGlobales.length);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        mostrarError();
    }
}

function mostrarProductos(productos, pagina) {
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = ''; // Limpiar el contenedor

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);

    productosPagina.forEach(producto => {
        const productoHTML = crearProductoHTML(producto);
        productosGrid.innerHTML += productoHTML;
    });
}

function crearProductoHTML(producto) {
    return `
        <div class="producto-item" data-id="${producto.id}">
            <img class="producto-image" 
                 src="${producto.imagen}" 
                 alt="${producto.nombre}" 
                 onerror="this.src='imagenes y videos/placeholder.png'"/>
            <h3>${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion}</p>
            <span class="marca">${producto.marca}</span>
            <span class="precio">S/ ${producto.precio.toFixed(2)}</span>
            <button class="agregar-carrito" data-id="${producto.id}" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        </div>
    `;
}

function agregarAlCarrito(productId) {
    const producto = productosGlobales.find(p => p.id === productId);
    if (producto) {
        const productoEnCarrito = carrito.find(p => p.id === producto.id);
        if (!productoEnCarrito) {
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert('Producto añadido al carrito');
            actualizarCarrito(); // Llama a la función para reflejar los cambios
        } else {
            alert('Este producto ya está en tu carrito.');
        }
    }
}

function actualizarPaginacion(totalProductos) {
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.classList.add('prev');
    prevButton.textContent = '← Previous';
    prevButton.onclick = (e) => {
        e.preventDefault();
        cambiarPagina(paginaActual - 1);
    };
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPaginas; i++) {
        const pageButton = document.createElement('a');
        pageButton.href = '#';
        pageButton.textContent = i;
        pageButton.classList.toggle('active', i === paginaActual);
        pageButton.onclick = (e) => {
            e.preventDefault();
            cambiarPagina(i);
        };
        pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.classList.add('next');
    nextButton.textContent = 'Next →';
    nextButton.onclick = (e) => {
        e.preventDefault();
        cambiarPagina(paginaActual + 1);
    };
    pagination.appendChild(nextButton);
}

function cambiarPagina(pagina) {
    const totalPaginas = Math.ceil(productosGlobales.length / productosPorPagina);
    if (pagina < 1) pagina = 1;
    if (pagina > totalPaginas) pagina = totalPaginas;

    paginaActual = pagina;
    mostrarProductos(productosGlobales, paginaActual);
    actualizarPaginacion(productosGlobales.length);

    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mostrarError() {
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = `
        <div class="error-mensaje">
            <h3>¡Ups! Algo salió mal</h3>
            <p>No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos(); // O cualquier función que inicialice el carrito o productos
});

