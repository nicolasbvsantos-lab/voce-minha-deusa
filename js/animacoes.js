document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-coracao');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function redimensionar() {
        const escala = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * escala;
        canvas.height = canvas.offsetHeight * escala;
        ctx.setTransform(escala, 0, 0, escala, 0, 0);
    }
    redimensionar();
    window.addEventListener('resize', redimensionar);

    const particulas = [];
    const quantidade = 40;

    for (let i = 0; i < quantidade; i++) {
        particulas.push({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            raio: Math.random() * 3 + 1,
            velocidadeY: Math.random() * -1 - 0.5,
            opacidade: Math.random()
        });
    }

    function desenhar() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        particulas.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 115, 0, ${p.opacidade})`;
            ctx.fill();

            p.y += p.velocidadeY;
            if (p.y < 0) {
                p.y = canvas.offsetHeight;
                p.x = Math.random() * canvas.offsetWidth;
            }
        });
        requestAnimationFrame(desenhar);
    }
    desenhar();
});
