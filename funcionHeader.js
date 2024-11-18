function loadHeader() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'disenio.css'; // Cambia la ruta si es necesario

    document.head.appendChild(link);

    const header = document.createElement('header');

    header.innerHTML = `
      <div class="content">
        <div class="menu container">
          <img src="imagenes y videos/Urban_Feet_logo.png" alt="logo" class="imgLogo" />
          <div class="menu-icono" id="menu-icono">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav class="navbar">
            <ul>
              <li><a href="inicio.html">Inicio</a></li>
              <li><a href="Nosotros.html">Nosotros</a></li>
              <li><a href="Contactanos.html">Contacto</a></li>
              <li><a href="RedesSociales.html">Redes</a></li>
              <li><span id="welcomeMessage" style="display:none; color: white;"></span></li>
            </ul>
            <a href="login.html">
            <button id="loginButton" onclick="login()" class="login-button">Iniciar Sesión</button>
            </a>
          </nav>
        </div>
      </div>
    `;

    document.body.prepend(header);


    const menuIcono = document.getElementById('menu-icono');
    const navbar = document.querySelector('.navbar');
    const storedName = localStorage.getItem('name');
    if (storedName) {
      // Actualizar el contenido del elemento welcomeMessage
      document.getElementById('welcomeMessage').textContent = `Hola ${storedName.toUpperCase()}`;
      document.getElementById('welcomeMessage').style.display = 'inline'; // Mostrar el mensaje
      document.getElementById('loginButton').style.display = 'none'; // Ocultar el botón de iniciar sesión
    } else {
      // Si no hay nombre almacenado, mostrar el botón de iniciar sesión
      document.getElementById('loginButton').style.display = 'inline';
      document.getElementById('welcomeMessage').style.display = 'none'; // Ocultar el mensaje de bienvenida
    }
    menuIcono.addEventListener('click', () => {
        navbar.classList.toggle('active'); // Alterna la clase active en el menú
    });

    var isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn) {
        // Reemplaza el botón por el mensaje "Hola Admin"
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("welcomeMessage").style.display = "inline";
    }
}
