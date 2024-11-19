const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    updateSlidePosition();
}
function updateSlidePosition() {
    const newPosition = -currentIndex * slider.offsetWidth;
    slider.style.transform = `translateX(${newPosition}px)`;
}
window.addEventListener('resize', updateSlidePosition);
setInterval(nextSlide, 3000); // El slider cambia cada 3 segundos

const wrapper = document.querySelector('.marcas-wrapper');
const items = document.querySelectorAll('.marca-item');

// Clonar el primer elemento para simular el bucle
wrapper.appendChild(items[0].cloneNode(true));

let index = 0;

function moveCarousel() {
    index++;
    wrapper.style.transform = `translateX(-${index * 20 + 7}% )`; // Desplaza un elemento más el margen

    // Reinicia el bucle cuando alcanza el último elemento
    if (index >= items.length) {
        setTimeout(() => {
            wrapper.style.transition = 'none'; // Desactiva la animación temporalmente
            wrapper.style.transform = 'translateX(0)';
            index = 0;
        }, 500); // Espera que termine la animación antes de reiniciar

        setTimeout(() => {
            wrapper.style.transition = 'transform 0.5s ease-in-out'; // Vuelve a activar la animación
        }, 600);
    }
}

// Mueve el carrusel cada 3 segundos
setInterval(moveCarousel, 3000);
