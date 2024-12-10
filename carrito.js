

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

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  
  function agregarAlCarrito(productId) {
    const producto = productosGlobales.find(p => p.id === productId);
    if (producto) {
        const productoEnCarrito = carrito.find(p => p.id === producto.id);
        if (!productoEnCarrito) {
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();

            // Personaliza completamente el SweetAlert
            Swal.fire({
                toast: true,  // Hace que sea un toast
                position: 'top-end',  // Posición en la esquina superior derecha
                icon: 'success',  // Ícono de éxito
                title: `${producto.nombre} añadido al carrito`,
                showConfirmButton: false,  // Oculta el botón de confirmación
                timer: 1500,  // Desaparece después de 1.5 segundos
                timerProgressBar: true,  // Muestra una barra de progreso
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
        } else {
            // Alerta para producto ya en el carrito
            Swal.fire({
                icon: 'info',
                title: 'Producto ya en el carrito',
                text: 'Este producto ya ha sido añadido anteriormente.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
}
  
  function eliminarDelCarrito(productId) {
      const producto = carrito.find(p => p.id === productId);
      if (producto) {
          swalWithBootstrapButtons.fire({
              title: `¿Estás seguro de que deseas eliminar "${producto.nombre}" del carrito?`,
              text: "Esta acción no se puede deshacer.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'No, cancelar',
              reverseButtons: true
          }).then((result) => {
              if (result.isConfirmed) {
                  // Eliminar el producto del carrito
                  carrito = carrito.filter(p => p.id !== productId);
                  localStorage.setItem('carrito', JSON.stringify(carrito));
                  actualizarCarrito();
  
                  // Alerta de éxito después de la eliminación
                  swalWithBootstrapButtons.fire({
                      title: `"${producto.nombre}" ha sido eliminado del carrito.`,
                      text: '¡Operación completada con éxito!',
                      icon: 'success'
                  });
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // Alerta de cancelación
                  swalWithBootstrapButtons.fire({
                      title: 'Cancelado',
                      text: 'El producto no fue eliminado.',
                      icon: 'error'
                  });
              }
          });
      }
  }
  

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro de que deseas vaciar todo el carrito?",
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('carrito');
            carrito = [];
            actualizarCarrito();
            Swal.fire({
                icon: 'success',
                title: 'El carrito ha sido vaciado.',
                confirmButtonText: 'Cerrar'
            });
        }
    });
}


function procederCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            title: "El carrito está vacío",
            text: "Agrega productos antes de proceder a la compra.",
            icon: 'warning',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    Swal.fire({
        title: "¿Estás seguro de que deseas proceder con la compra?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, proceder',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Aquí podrías agregar la lógica para procesar la compra
            localStorage.removeItem('carrito');
            carrito = [];
            actualizarCarrito();
            Swal.fire({
                icon: 'success',
                title: '¡Gracias por tu compra! El carrito ha sido vaciado.',
                confirmButtonText: 'Cerrar'
            });
        }
    });
}



document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});
