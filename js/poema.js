document.addEventListener('DOMContentLoaded', () => {
    const elementoPoema = document.getElementById('conteudo-poema');
    const btnPular = document.getElementById('btn-pular-animacao');

    if (!elementoPoema) return;

    const textoPoema = `eu quero conhecer você

até nas coisas que ninguém percebe. quero saber como fica teu rosto quando tenta segurar o choro, qual música você escuta escondida, o que te faz sorrir quando o dia foi horrível.

quero aprender teus silêncios, teus medos, até as manias que você acha irritantes.

e quero que você entenda uma coisa. não precisa ser fácil de amar todos os dias. não precisa estar bonita, feliz ou com tudo resolvido.

porque eu não quero uma mulher perfeita. eu quero você.

e se existem mil maneiras
de você ser quem é,
eu quero ter a sorte
de me apaixonar
mil vezes pela mesma mulher.`;

    let index = 0;
    let timer = null;

    function digitar() {
        if (index < textoPoema.length) {
            elementoPoema.textContent = textoPoema.substring(0, index + 1);
            index++;
            timer = setTimeout(digitar, 35);
        } else if (btnPular) {
            btnPular.style.display = 'none';
        }
    }

    function concluirImediatamente() {
        clearTimeout(timer);
        elementoPoema.textContent = textoPoema;
        if (btnPular) btnPular.style.display = 'none';
    }

    digitar();
    if (btnPular) btnPular.addEventListener('click', concluirImediatamente);
});
