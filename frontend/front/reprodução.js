let tocando = false;

/* 🎵 áudio */
const audio = new Audio(
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
);

/* ▶ play/pause */
function togglePlay() {

    const btn =
        document.getElementById("playBtn");

    if (tocando) {

        audio.pause();

        btn.innerHTML = "▶";

    } else {

        audio.play();

        btn.innerHTML = "⏸";

    }

    tocando = !tocando;
}

/* ⏮ */
function anterior() {

    alert("Música anterior");
}

/* ⏭ */
function proxima() {

    alert("Próxima música");
}

/* 🔙 */
function voltar() {

    window.history.back();
}

/* 📈 progresso */
audio.addEventListener(
    "timeupdate",
    () => {

        const progress =
            document.getElementById("progress");

        const tempoAtual =
            document.getElementById("tempo-atual");

        const percentual =
            (audio.currentTime / audio.duration) * 100;

        progress.value =
            percentual || 0;

        tempoAtual.innerText =
            formatarTempo(audio.currentTime);
    }
);

/* ⏱ */
function formatarTempo(segundos) {

    const min =
        Math.floor(segundos / 60);

    const sec =
        Math.floor(segundos % 60);

    return `${min}:${sec
        .toString()
        .padStart(2, "0")}`;
}