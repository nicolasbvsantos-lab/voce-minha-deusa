document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const iconePlay = document.getElementById('icone-play');
    const tempoAtual = document.getElementById('tempo-atual');
    const tempoTotal = document.getElementById('tempo-total');
    const statusAudio = document.getElementById('status-audio');

    // A página pode ser usada sem o player; nesse caso, não inicializa os controles.
    if (!audio || !btnPlayPause || !iconePlay) return;

    function formatarTempo(segundos) {
        if (!Number.isFinite(segundos)) return '0:00';

        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = Math.floor(segundos % 60);

        return `${minutos}:${String(segundosRestantes).padStart(2, '0')}`;
    }

    function atualizarBotao(reproduzindo) {
        iconePlay.textContent = reproduzindo ? '❚❚ Pausar' : '▶ Reproduzir';
        btnPlayPause.setAttribute(
            'aria-label',
            reproduzindo ? 'Pausar música' : 'Reproduzir música'
        );
    }

    function atualizarDuracao() {
        if (tempoTotal) {
            tempoTotal.textContent = formatarTempo(audio.duration);
        }
    }

    audio.addEventListener('loadedmetadata', atualizarDuracao);
    audio.addEventListener('durationchange', atualizarDuracao);

    audio.addEventListener('timeupdate', () => {
        if (tempoAtual) {
            tempoAtual.textContent = formatarTempo(audio.currentTime);
        }
    });

    btnPlayPause.addEventListener('click', async () => {
        if (audio.paused) {
            if (statusAudio) statusAudio.textContent = 'Carregando música...';

            try {
                await audio.play();
                atualizarBotao(true);
                if (statusAudio) statusAudio.textContent = 'Reproduzindo nossa canção.';
            } catch (erro) {
                atualizarBotao(false);
                if (statusAudio) {
                    statusAudio.textContent =
                        'Não foi possível tocar a música. Verifique se o arquivo assets/audio/musica.mp3 existe.';
                }
                console.error('Falha ao reproduzir o áudio:', erro);
            }
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('play', () => atualizarBotao(true));

    audio.addEventListener('pause', () => {
        atualizarBotao(false);
        if (statusAudio && !audio.ended) {
            statusAudio.textContent = 'Música pausada.';
        }
    });

    audio.addEventListener('ended', () => {
        atualizarBotao(false);
        audio.currentTime = 0;
        if (tempoAtual) tempoAtual.textContent = '0:00';
    });

    audio.addEventListener('error', () => {
        atualizarBotao(false);
        if (statusAudio) {
            statusAudio.textContent =
                'Arquivo de música não encontrado. Adicione musica.mp3 na pasta assets/audio/.';
        }
        console.error('Não foi possível carregar assets/audio/musica.mp3.');
    });
});
