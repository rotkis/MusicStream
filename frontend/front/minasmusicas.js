const userId = 1;

/* 🔥 carregar playlists */
async function carregarPlaylists() {

    try {

        const playlists = await getPlaylists(userId);

        const container =
            document.getElementById("lista-playlists");

        container.innerHTML = "";

        playlists.forEach(p => {

            container.innerHTML += `
            
                <div class="playlist-card">

                    <div class="playlist-cover"></div>

                    <div class="playlist-info">

                        <h3>${p.nome}</h3>

                        <p>
                            Playlist personalizada
                        </p>

                        <div class="playlist-actions">

                            <button onclick="abrirPlaylist(${p.id})">
                                Abrir
                            </button>

                            <button onclick="shuffle(${p.id})">
                                🔀
                            </button>

                        </div>

                    </div>

                </div>

            `;
        });

    } catch (erro) {

        console.error(
            "Erro ao carregar playlists:",
            erro
        );
    }
}

/* 📂 abrir playlist */
function abrirPlaylist(id) {

    localStorage.setItem(
        "playlistAtual",
        id
    );

    window.location.href =
        "playlist.html";
}

/* 🔀 shuffle */
async function shuffle(id) {

    try {

        const musicas =
            await getShuffle(id);

        console.log(musicas);

        alert(
            "Playlist reproduzida em modo aleatório 🎵"
        );

    } catch (erro) {

        console.error(erro);
    }
}

/* 🔍 busca */
document
.getElementById("busca")
.addEventListener("keyup", async (e) => {

    const texto =
        e.target.value.toLowerCase();

    const playlists =
        await getPlaylists(userId);

    const filtradas =
        playlists.filter(p =>
            p.nome
            .toLowerCase()
            .includes(texto)
        );

    const container =
        document.getElementById("lista-playlists");

    container.innerHTML = "";

    filtradas.forEach(p => {

        container.innerHTML += `
        
            <div class="playlist-card">

                <div class="playlist-cover"></div>

                <div class="playlist-info">

                    <h3>${p.nome}</h3>

                    <div class="playlist-actions">

                        <button onclick="abrirPlaylist(${p.id})">
                            Abrir
                        </button>

                        <button onclick="shuffle(${p.id})">
                            🔀
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
});

/* INIT */
carregarPlaylists();