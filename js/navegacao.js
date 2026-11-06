document.addEventListener('DOMContentLoaded', () => {
    const linksMenu = document.querySelectorAll('.item-menu');
    const caminhoAtual = window.location.pathname;

    linksMenu.forEach(link => {
        const href = link.getAttribute('href');
        if (caminhoAtual.endsWith(href) || (caminhoAtual.endsWith('/') && href === 'index.html')) {
            link.classList.add('ativo');
            link.setAttribute('aria-current', 'page');
        }
    });
});
