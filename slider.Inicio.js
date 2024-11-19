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
