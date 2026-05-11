/* 🎵 render genérico */
function renderCards(lista, containerId, tipo = "musica") {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    lista.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <p>${item.nome}</p>
                <span>${item.artista || ""}</span>

                ${
                    tipo === "musica"
                    ? `<button onclick="play(${item.id})">▶</button>`
                    : ""
                }

                ${
                    tipo === "playlist"
                    ? `<button onclick="shuffle(${item.id})">🔀</button>`
                    : ""
                }
            </div>
        `;
    });
}

/* ▶️ tocar música */
async function play(id) {
    await registrarPlay(id);
    alert("Tocando música 🎵");
}

/* 🔀 shuffle playlist */
async function shuffle(id) {
    const musicas = await getShuffle(id);
    renderCards(musicas, "lista-musicas");
}

/* 🚀 carregar tudo */
async function carregarHome() {
    try {
        const musicas = await getMusicas();
        renderCards(musicas, "lista-musicas");

        const top = await getTopMusicas();
        renderCards(top, "top-musicas");

        const userId = 1; // depois vem do login
        const playlists = await getPlaylists(userId);
        renderCards(playlists, "playlists", "playlist");

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

carregarHome();