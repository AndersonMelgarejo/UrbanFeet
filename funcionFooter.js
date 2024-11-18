function loadFooter() {
    const footerHTML = `
      <footer class="footer">
        <div class="footer-box">
          <div class="footerMenu">Redes</div>
          <div>
            <ul class="MenuOpciones">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Tiktok</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-box">
          <div class="footerMenu">Menú</div>
          <div>
            <ul class="MenuOpciones">
              <li>Inicio</li>
              <li>Nosotros</li>
              <li>Redes Sociales</li>
              <li>Ubícanos</li>
              <li>Contáctanos</li>
              <li>Libro de Reclamaciones</li>
              <li>Carrito</li>
            </ul>
          </div>
        </div>
  
        <div class="footer-box">
          <div class="footerMenu">Contáctanos</div>
          <div>
            <ul class="MenuOpciones">
              <li>946531247</li>
              <li>contacto@urbanfeet.com</li>
              <li>Horario de atención:</li>
              <li>Lunes a Viernes, 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
      </footer>
      <div class="footer-rights">Copyright © 2024 - UrbanFeet - Todos los derechos reservados</div>
    `;
  
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  