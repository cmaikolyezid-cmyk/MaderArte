// Mostrar la frase al hacer scroll
window.addEventListener("scroll", () => {
    const frase = document.querySelector(".hero-text h1");
    const scrollPos = window.scrollY;
    if (scrollPos > 50) {
        frase.style.opacity = 1;
    } else {
        frase.style.opacity = 0;
    }
});
