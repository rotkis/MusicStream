const API_URL = "http://localhost:3000/api";

/* 🎵 Lista todas as músicas */
async function getMusicas() {
    const res = await fetch(`${API_URL}/musicas`);
    return await res.json();
}

/* 🔥 Top mais ouvidas */
async function getTopMusicas() {
    const res = await fetch(`${API_URL}/musicas/top`);
    return await res.json();
}

/* ▶️ Registrar reprodução */
async function registrarPlay(id) {
    await fetch(`${API_URL}/musicas/${id}/play`, {
        method: "POST"
    });
}

/* 📂 Playlists do usuário */
async function getPlaylists(userId) {
    const res = await fetch(`${API_URL}/playlists/${userId}`);
    return await res.json();
}

/* 🔀 Shuffle */
async function getShuffle(playlistId) {
    const res = await fetch(`${API_URL}/playlists/${playlistId}/shuffle`);
    return await res.json();
}