document.addEventListener("DOMContentLoaded", () => {
    const forms = [
      { id: "formMensajes", storageKey: "historialMensajes", container: "historialMensajes" },
      { id: "formSugerencias", storageKey: "historialSugerencias", container: "historialSugerencias" },
      { id: "formReclamaciones", storageKey: "historialReclamaciones", container: "historialReclamaciones" }
    ];
  
    // Cargar historial desde el almacenamiento
    forms.forEach(formData => {
      const historial = JSON.parse(localStorage.getItem(formData.storageKey)) || [];
      mostrarHistorial(historial, formData.container);
    });
  
    // Manejar el envío de formularios
    forms.forEach(formData => {
      const form = document.getElementById(formData.id);
      form.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // Obtener datos del formulario
        const datos = Object.fromEntries(new FormData(form).entries());
  
        // Guardar datos en el almacenamiento local
        const historial = JSON.parse(localStorage.getItem(formData.storageKey)) || [];
        historial.push(datos);
        localStorage.setItem(formData.storageKey, JSON.stringify(historial));
  
        // Mostrar historial actualizado
        mostrarHistorial(historial, formData.container);
  
        // Limpiar formulario
        form.reset();
      });
    });
  
    // Mostrar historial en la interfaz
    function mostrarHistorial(historial, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = historial
        .map(item => {
          return `<div class="registro">
            <p><strong>Nombre completo:</strong> ${item.nombre || ""} ${item.apellidos || ""}</p>
            <p><strong>Correo:</strong> ${item.email || ""}</p>
            <p><strong>Mensaje:</strong> ${item.mensaje || item.sugerencia || ""}</p>
            ${item.domicilio ? `<p><strong>Domicilio:</strong> ${item.domicilio}</p>` : ""}
            ${item.fecha ? `<p><strong>Fecha:</strong> ${item.fecha}</p>` : ""}
            ${item.dni ? `<p><strong>DNI:</strong> ${item.dni}</p>` : ""}
            ${item.telefono ? `<p><strong>Teléfono:</strong> ${item.telefono}</p>` : ""}
          </div>`;
        })
        .join("");
    }
  });

function eliminarHistorial(historialId, formId) {
    // Identificar la clave de almacenamiento local según el formulario
    const formStorageKey = {
      formMensajes: "historialMensajes",
      formSugerencias: "historialSugerencias",
      formReclamaciones: "historialReclamaciones",
    }[formId];
  
    // Borrar el historial del localStorage
    if (formStorageKey) {
      localStorage.removeItem(formStorageKey);
    }
  
    // Limpiar la visualización del historial
    const historialContainer = document.getElementById(historialId);
    if (historialContainer) {
      historialContainer.innerHTML = "<p>Historial eliminado.</p>";
    }
}
  
function mostrarContenido(opcion) {
    document.querySelectorAll('.contenido').forEach(div => {
      div.classList.remove('activo');
    });
    document.getElementById(opcion).classList.add('activo');
}

window.onload = function() {
    const fechaInput = document.getElementById('fechaInput');
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.value = hoy;

    // Abrir la sección de "Mensajes" automáticamente
    mostrarContenido('contenido1');
};