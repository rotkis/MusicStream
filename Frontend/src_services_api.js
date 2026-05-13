const API_URL = "http://localhost:3000/api";

export async function getMusicas() {
  const res = await fetch(`${API_URL}/musicas`);
  return res.json();
}

export async function getTopMusicas() {
  const res = await fetch(`${API_URL}/musicas/top`);
  return res.json();
}

export async function registrarPlay(id) {
  await fetch(`${API_URL}/musicas/${id}/play`, { method: "POST" });
}

export async function getPlaylists(userId) {
  const res = await fetch(`${API_URL}/playlists/${userId}`);
  return res.json();
}

export async function getShuffle(playlistId) {
  const res = await fetch(`${API_URL}/playlists/${playlistId}/shuffle`);
  return res.json();
}

export async function uploadMusica(formData) {
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function criarPlaylist(userId, nome) {
  const res = await fetch(`${API_URL}/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, nome }),
  });
  return res.json();
}