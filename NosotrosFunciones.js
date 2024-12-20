function loadVideo(){   
    const main=document.createElement('main');
    main.innerHTML=`
        <div class="video-container">            
            <video muted autoplay loop>
                <source src="imagenes y videos/videoFondo.mp4" type="video/mp4">
            </video>
            <div class="capa"></div>
            <div class="caja-h1">
                <h1>Lo mejor en zapatillas importadas</h1>
            </div>
        </div>        
    `;
    let referenceNode = document.getElementById('1er');
    referenceNode.insertAdjacentElement('afterend', main);
}

function loadQuienesSomos(){    
    const div=document.createElement('div');
    div.innerHTML=`
        <div class="ajus">    
            <section class="espacio">
                <p data-aos="fade-right" class="bodfirst playfair-display-text">
                    Somos emprendedores apasionados dedicados a traerte las últimas tendencias en zapatillas importadas desde nuestro inicio en 2020. Con más de 3 años de experiencia, ofrecemos productos de alta calidad y estilo que combinan diseño exclusivo con comodidad incomparables    
                </p>
                <p data-aos="fade-left" class="bodfirst2do playfair-display-text">
                    En Urban Feet, encontrarás la fusión perfecta entre moda y funcionalidad para destacar en cada paso que des.  opera en el sector minorista de moda, específicamente en la venta de zapatillas de alta gama e importadas. El enfoque de la empresa es el comercio electrónico, con miras a expandirse a tiendas físicas en puntos clave del país. Además de ofrecer productos de calzado, Urban Feet se distingue por su propuesta de valor basada en la personalización de la experiencia de compra, brindando asesoramiento en tendencias, estilo y comodidad.
                </p>
            </section >    
        </div>       
    `;
    let referenceNode = document.getElementById('2do');
    referenceNode.insertAdjacentElement('afterend', div);
}

function loadHistoria(){
    const div=document.createElement('div');
    div.innerHTML=`
        <div class="ajus">
         <section id="sobre-historia" >
            <div class="fondo2">
                <div class="caja-histo1">
                    <div class="caja-histo2">
                      <h2 class="Nosotros" data-aos="zoom-in-down" >Nuestra Historia</h2>
                    </div>
                    <div class="caja-histo3">
                        <div class="informacion-izq">
                            <p class="informacion" style="line-height: 1.2;" data-aos="fade-right">
                                Urban Feet nació en 2020 como el sueño de emprendedores apasionados por la moda y el calzado, quienes reconocieron la necesidad de un espacio donde las últimas tendencias en zapatillas importadas estuvieran al alcance de todos. Inspirados por distintas marcas de las principales ciudades del mundo, comenzaron su viaje ofreciendo una selección exclusiva de zapatillas que reflejaban un equilibrio entre estilo, comodidad y calidad
                              </p>
                              <p class="informacion" style="line-height: 1.2;" data-aos="fade-right">
                                 A través de la atención al detalle y una selección curada de marcas internacionales, Urban Feet se ha convertido en un referente para aquellos que buscan expresarse a través del calzado.
                                
                            </p>
                            <div class="caja-iconos" data-aos="fade-right">
                                <a href="RedesSociales.html"><img src="imagenes y videos/facebook.png" alt="facebook" class="iconos"></a>
                                <a href="RedesSociales.html"><img src="imagenes y videos/whatsapp.png" alt="whatsapp" class="iconos"></a>
                                <a href="RedesSociales.html"><img src="imagenes y videos/instagram.png" alt="instagram" class="iconos"></a>
                                <a href="RedesSociales.html"><img src="imagenes y videos/twiter.png" alt="twiter" class="iconos"></a>
                                <a href="RedesSociales.html"><img src="imagenes y videos/tik-tok.png" alt="tik-tok" class="iconos"></a>
                            </div>
                        </div>
                      <div class="imagen-der" data-aos="fade-left"> 
                        <img src="imagenes y videos/imagen2.jpg" alt="Zapatillas" class="imagen1">
                      </div>
                    </div>
                  </div>
            </div>
        </section>
</div>       
    `;
    let referenceNode = document.getElementById('3ro');
    referenceNode.insertAdjacentElement('afterend', div);
}

function loadMissViss(){
    const div=document.createElement('div');
    div.innerHTML=`
        <div class="mission-vision-container" >        
            <section>
                <h2 data-aos="fade-down-right" >Misión <span class="material-icons">timeline</span></h2>
        
                <p style="font-weight: bold;" data-aos="fade-down-right">
                    ¿Cuáles son las características clave que diferencian su selección de calzado de otras tiendas en línea?  
                </p>
                <p data-aos="fade-down-right">
                    Queremos redefinir la experiencia de compra de calzado en línea, fusionando moda, tecnología y atención personalizada. Ofrecemos una selección curada de zapatillas exclusivas que conectan con el estilo de vida urbano y aspiracional de nuestros clientes, garantizando calidad y confort en cada paso.
                </p>
                <div class="centrarImg" data-aos="zoom-in">
                    <img src="imagenes y videos/misionphoto.png" alt=""/>
                </div>
            </section>
    
            <section >
                <h2 data-aos="fade-down-left">Visión <span class="material-icons">visibility</span></h2>
                <p style="font-weight: bold;" data-aos="fade-down-left">
                    ¿Qué estrategias implementamos para lograr convertirnos en la tienda online líder de calzado urbano de alta gama?
                </p>
                <p data-aos="fade-down-left">
                    Es convertirnos en la tienda online líder de calzado urbano de alta gama, conocida por su innovación digital, servicio excepcional y enfoque sostenible. Queremos expandir nuestra presencia globalmente, siendo una marca que no solo sigue las tendencias, sino que también las define.
                </p>
                <div class="centrarImg" data-aos="zoom-in">
                    <img src="imagenes y videos/visionphoto.png" alt=""/>
                </div>
            </section>
        </div>
    `;
    let referenceNode = document.getElementById('4to');
    referenceNode.insertAdjacentElement('afterend', div);
}