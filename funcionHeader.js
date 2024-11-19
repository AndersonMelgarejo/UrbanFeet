function loadHeader() {
  // Cargar el CSS principal
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'disenio.css';
  document.head.appendChild(link);

  // Crear el header
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="content">
      <div class="menu container">
        <a href="inicio.html"><img src="imagenes y videos/Urban_Feet_logo.png" alt="logo" class="imgLogo" /></a>
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
            <li>
              <a href="login.html">
                <button id="loginButton" onclick="login()" class="login-button">Iniciar Sesión</button>
              </a>
            </li>
            <li>
              <a href="carrito.html">
                <button class="carrito-button">
                  <img src="imagenes y videos/carritoo.png" alt="Carrito de compras" class="carrito-icon">
                </button>
              </a>
            </li>
            <li><span id="welcomeMessage" style="display:none; color: white;"></span></li>
          </ul>
        </nav>
      </div>
    </div>
  `;

  document.body.prepend(header);

  // Lógica de interacción
  const menuIcono = document.getElementById('menu-icono');
  const navbar = document.querySelector('.navbar');
  const storedName = localStorage.getItem('name');

  // Mostrar mensaje de bienvenida si el nombre está almacenado
  if (storedName) {
    document.getElementById('welcomeMessage').textContent = `Hola ${storedName.toUpperCase()}`;
    document.getElementById('welcomeMessage').style.display = 'inline';
    document.getElementById('loginButton').style.display = 'none';
  } else {
    document.getElementById('loginButton').style.display = 'inline';
    document.getElementById('welcomeMessage').style.display = 'none';
  }

  // Toggle de menú en pantallas pequeñas
  menuIcono.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Cerrar el menú si el clic no es sobre el menú ni el icono
  document.addEventListener('click', (event) => { 
    if (!navbar.contains(event.target) && !menuIcono.contains(event.target)) {
      navbar.classList.remove('active');
    }
  });

  // Verificar si el usuario está logueado
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn) {
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("welcomeMessage").style.display = "inline";
  }
}
