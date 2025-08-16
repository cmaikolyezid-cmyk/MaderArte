// Efecto para que la frase se haga más visible al bajar
window.addEventListener('scroll', () => {
    const frase = document.querySelector('.frase');
    const scrollY = window.scrollY;
    frase.style.opacity = Math.min(1, 0.5 + scrollY / 300);
});

