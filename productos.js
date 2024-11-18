// Función para cargar los productos desde el JSON
async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar los productos');
        }
        const data = await response.json();
        mostrarProductos(data.productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        mostrarError();
    }
}

// Función para mostrar los productos en el grid
function mostrarProductos(productos) {
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = ''; // Limpiar el contenedor

    productos.forEach(producto => {
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

// Inicializar la carga de productos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', cargarProductos);

// Agregar listener para los filtros (ejemplo básico)
document.querySelectorAll('.filtros input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Aquí puedes agregar la lógica de filtrado
        console.log('Filtro cambiado:', this.parentElement.textContent.trim());
    });
});