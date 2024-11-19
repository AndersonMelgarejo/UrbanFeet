

function actualizarCarrito() {
    const carritoProductos = document.querySelector('#carrito-productos');
    const subtotalElement = document.querySelector('#subtotal');

    // Limpia el contenedor del carrito
    carritoProductos.innerHTML = '';

    if (carrito.length === 0) {
        carritoProductos.innerHTML = '<p>El carrito está vacío</p>';
        subtotalElement.textContent = 'S/ 0.00';
        return;
    }

    carrito.forEach(producto => {
        const productoCarritoHTML = crearProductoCarritoHTML(producto);
        carritoProductos.innerHTML += productoCarritoHTML;
    });

    actualizarSubtotal();
}

function crearProductoCarritoHTML(producto) {
    return `
        <div class="producto-carrito-item" data-id="${producto.id}">
            <img class="producto-image imag-tamaño-carrito" src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='imagenes y videos/placeholder.png'"/>
            <h3>${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion}</p>
            <span class="precio">S/ ${producto.precio.toFixed(2)}</span>
            <button class="eliminar-carrito" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        </div>
    `;
}

function actualizarSubtotal() {
    const subtotalElement = document.querySelector('#subtotal');
    const subtotal = carrito.reduce((total, producto) => total + producto.precio, 0);
    subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
}

function agregarAlCarrito(productId) {
    const producto = productosGlobales.find(p => p.id === productId);
    if (producto) {
        const productoEnCarrito = carrito.find(p => p.id === producto.id);
        if (!productoEnCarrito) {
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
            alert('Producto añadido al carrito');
        } else {
            alert('Este producto ya está en tu carrito.');
        }
    }
}

function eliminarDelCarrito(productId) {
    carrito = carrito.filter(producto => producto.id !== productId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    carrito = [];
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});
