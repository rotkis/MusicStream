/* 🔙 navegação */
function voltarHome() {
    window.location.href = "home.html";
}

function irUpload() {
    window.location.href = "upload.html";
}

/* ▶️ tocar */
async function play(id) {
    await registrarPlay(id);
    alert("Tocando música 🎵");
}

/* 🎵 carregar músicas */
async function carregarMusicas() {
    try {
        const musicas = await getMusicas();

        const container = document.getElementById("lista-musicas");
        container.innerHTML = "";

        musicas.forEach(m => {
            container.innerHTML += `
                <div class="music-card">
                    <div class="music-info">
                        <p>${m.nome}</p>
                        <span>${m.artista}</span>
                    </div>

                    <div class="music-actions">
                        <button onclick="play(${m.id})">▶</button>
                    </div>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar músicas:", erro);
    }
}

/* 🔍 busca */
document.getElementById("busca").addEventListener("keyup", async (e) => {
    const texto = e.target.value.toLowerCase();

    const musicas = await getMusicas();

    const filtradas = musicas.filter(m =>
        m.nome.toLowerCase().includes(texto)
    );

    const container = document.getElementById("lista-musicas");
    container.innerHTML = "";

    filtradas.forEach(m => {
        container.innerHTML += `
            <div class="music-card">
                <div class="music-info">
                    <p>${m.nome}</p>
                    <span>${m.artista}</span>
                </div>

                <button onclick="play(${m.id})">▶</button>
            </div>
        `;
    });
});

/* INIT */
carregarMusicas();