let paginaActual = 1;
const productosPorPagina = 15;
let productosGlobales = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];



// Seleccionamos el slider de precio y el elemento que muestra el valor
const precioSlider = document.getElementById('precioSlider');
const precioValor = document.getElementById('precioValor');
let precioAnterior = precioSlider.value; // Guardamos el valor inicial del slider

// Función para cargar los productos
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

// Función para mostrar los productos en la página
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

// Función para crear HTML de cada producto
function crearProductoHTML(producto) {
    return `
        <div data-aos="zoom-in-down" class="producto-item" data-id="${producto.id}">
            <img class="producto-image" 
                src="${producto.imagen}" 
                alt="${producto.nombre}" 
                onerror="this.src='imagenes y videos/placeholder.png'"/>
            <h3>${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion}</p>
            <span class="marca">${producto.marca}</span>
            <span class="colores">${producto.colores.join(', ')}</span>
            <span class="genero">${producto.genero}</span> <!-- Mostrar el género -->
            <span class="precio">S/ ${producto.precio.toFixed(2)}</span>
            <button class="agregar-carrito" data-id="${producto.id}" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        </div>
    `;
}

// Función para agregar al carrito
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

// Función para actualizar la paginación
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

// Función para cambiar de página
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

// Función para mostrar error
function mostrarError() {
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = `
        <div class="error-mensaje">
            <h3>¡Ups! Algo salió mal</h3>
            <p>No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.</p>
        </div>
    `;
}

// Event listener para mostrar el valor del precio en tiempo real
precioSlider.addEventListener('input', () => {
    const nuevoPrecio = precioSlider.value;
    precioValor.textContent = `S/ ${nuevoPrecio}`; // Actualiza el valor mostrado en tiempo real
});

// Event listener para actualizar los productos solo cuando el usuario termina de mover el slider
precioSlider.addEventListener('change', () => {
    const nuevoPrecio = precioSlider.value;
    // Solo actualizamos los productos si el precio ha cambiado
    if (nuevoPrecio !== precioAnterior) {
        precioAnterior = nuevoPrecio; // Actualizamos el valor anterior
        filtrarProductos(); // Filtramos los productos basados en el nuevo precio
    }
});

// Función para filtrar productos por los filtros seleccionados
function filtrarProductos() {
    const precioMaximo = parseInt(precioSlider.value);

    // Obtener marcas seleccionadas
    const marcasSeleccionadas = obtenerSeleccion('marca');

    // Obtener colores seleccionados
    const coloresSeleccionados = obtenerSeleccion('color');

    // Obtener géneros seleccionados
    const generosSeleccionados = obtenerSeleccion('genero');

    // Filtrar productos
    const productosFiltrados = productosGlobales.filter(producto => {
        const precioValido = producto.precio <= precioMaximo;
        const marcaValida = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(producto.marca);
        const colorValido = coloresSeleccionados.length === 0 || coloresSeleccionados.some(color => producto.colores.includes(color));
        const generoValido = generosSeleccionados.length === 0 || generosSeleccionados.includes(producto.genero);
        
        return precioValido && marcaValida && colorValido && generoValido;
    });

    mostrarProductos(productosFiltrados, paginaActual);
    actualizarPaginacion(productosFiltrados.length);
}

// Función para obtener las opciones seleccionadas de los filtros (marca, color, género)
function obtenerSeleccion(filtro) {
    const checkboxes = document.querySelectorAll(`input[name="${filtro}"]:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Event listener para los filtros de marcas, colores y géneros
const filtrosMarcas = document.querySelectorAll('input[name="marca"]');
const filtrosColores = document.querySelectorAll('input[name="color"]');
const filtrosGeneros = document.querySelectorAll('input[name="genero"]');
filtrosMarcas.forEach(filtro => {
    filtro.addEventListener('change', filtrarProductos);
});
filtrosColores.forEach(filtro => {
    filtro.addEventListener('change', filtrarProductos);
});
filtrosGeneros.forEach(filtro => {
    filtro.addEventListener('change', filtrarProductos);
});

// Cargar los productos al cargar la página
cargarProductos();
