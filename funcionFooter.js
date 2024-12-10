function loadFooter() {
    const footerHTML = `
      <footer class="footer">
        <div class="footer-box">
          <div class="footerMenu">Redes</div>
          <div>
            <ul class="MenuOpciones">
              <li><a href="https://www.facebook.com/nike" class="white">Facebook</a></li>
              <li><a href="RedesSociales.html" class="white">Instagram</a></li>
              <li><a href="RedesSociales.html" class="white">Twitter</a></li>
              <li><a href="RedesSociales.html" class="white">Tiktok</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-box">
          <div class="footerMenu">Menú</div>
          <div>
            <ul class="MenuOpciones">
              <li><a href="inicio.html" class="white">Inicio</a></li>
              <li><a href="Nosotros.html" class="white">Nosotros</a></li>
              <li><a href="RedesSociales.html" class="white">Redes Sociales</a></li>
              <li><a href="Contactanos.html" class="white">Ubícanos</a></li>
              <li><a href="Contactanos.html" class="white">Contáctanos</a></li>
              <li><a href="Contactanos.html" class="white">Libro de Reclamaciones</a></li>
              <li><a href="carrito.html" class="white">Carrito</a></li>
            </ul>
          </div>
        </div>
  
        <div class="footer-box">
          <div class="footerMenu">Contáctanos</div>
          <div>
            <ul class="MenuOpciones">
              <li class="white">946531247</li>
              <li class="white">contacto@urbanfeet.com</li>
              <li class="white">Horario de atención:</li>
              <li class="white">Lunes a Viernes, 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
      </footer>
      <div class="footer-rights">Copyright © 2024 - UrbanFeet - Todos los derechos reservados</div>
    `;
  
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  