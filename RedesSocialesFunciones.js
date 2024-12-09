function loadPresentacion(){
    const div=document.createElement('div');
    div.innerHTML=`
        <div class="titu">
            <legend class="bebas-neue-regular">
                Nuestras redes sociales
            </legend>        
        </div>
        <div class="rubik">
            <p>👟✨ ¡Descubre tu estilo con nuestras nuevas zapatillas! ✨👟</p>
            <p>¿Buscas comodidad y estilo? Nuestras zapatillas están diseñadas para acompañarte en cada paso.</p>
            <p>Desde el entrenamiento en el gimnasio hasta un paseo por la ciudad, tenemos el par perfecto para ti.</p>
        </div>
    `;
    let referenceNode = document.getElementById('1er');
    referenceNode.insertAdjacentElement('afterend', div);
}