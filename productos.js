let paginaActual = 1;
const productosPorPagina = 12;
let productosGlobales = [];

// Función para cargar los productos desde el JSON
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

// Función para mostrar los productos de acuerdo con la página actual
function mostrarProductos(productos, pagina) {
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = ''; // Limpiar el contenedor

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin); // Obtener solo los productos correspondientes a la página

    productosPagina.forEach(producto => {
        const productoHTML = crearProductoHTML(producto);
        productosGrid.innerHTML += productoHTML;
    });
}

// Función para crear el HTML de cada producto

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
            <!-- Moved the button below the price -->
            <button class="agregar-carrito" data-id="${producto.id}" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        </div>
    `;
}


// Función para mostrar un mensaje de error
function mostrarError() {
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = `
        <div class="error-mensaje">
            <h3>¡Ups! Algo salió mal</h3>
            <p>No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.</p>
        </div>
    `;
}

// Función para actualizar los botones de paginación
function actualizarPaginacion(totalProductos) {
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''; // Limpiar los botones de paginación

    // Botón de 'anterior'
    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.classList.add('prev');
    prevButton.textContent = '← Previous';
    prevButton.onclick = (e) => {
        e.preventDefault();
        cambiarPagina(paginaActual - 1);
    };
    pagination.appendChild(prevButton);

    // Botones de páginas
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

    // Botón de 'siguiente'
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

// Función para cambiar la página
function cambiarPagina(pagina) {
    const totalPaginas = Math.ceil(productosGlobales.length / productosPorPagina);
    if (pagina < 1) pagina = 1;
    if (pagina > totalPaginas) pagina = totalPaginas;

    paginaActual = pagina;
    mostrarProductos(productosGlobales, paginaActual);
    actualizarPaginacion(productosGlobales.length);

    // Desplazar el contenedor de productos hacia la parte superior
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}




document.addEventListener('DOMContentLoaded', cargarProductos);


document.querySelectorAll('.filtros input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {

        console.log('Filtro cambiado:', this.parentElement.textContent.trim());
    });
});


