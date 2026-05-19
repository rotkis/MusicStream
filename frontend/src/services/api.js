// CORRIGIDO: porta 8080 (Spring Boot), não 3000 (React)
const API_URL = process.env.REACT_APP_API_URL || '/api';;

export async function getMusicas() {
  const res = await fetch(`${API_URL}/musicas`);
  if (!res.ok) throw new Error("Erro ao buscar músicas");
  return res.json();
}

export async function getTopMusicas(limit = 10, userId = null) {
  let url = `${API_URL}/musicas/top?limit=${limit}`;
  if (userId) url += `&userId=${encodeURIComponent(userId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar top músicas");
  return res.json();
}

// CORRIGIDO: userId é obrigatório no backend (?userId=...)
export async function registrarPlay(musicId, userId) {
  if (!userId) return; // sem usuário logado, não registra
  const res = await fetch(
    `${API_URL}/musicas/${musicId}/play?userId=${encodeURIComponent(userId)}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error("Erro ao registrar play");
}

export async function getPlaylists(userId) {
  const res = await fetch(`${API_URL}/playlists/${userId}`);
  if (!res.ok) throw new Error("Erro ao buscar playlists");
  return res.json();
}

export async function getShuffle(playlistId) {
  const res = await fetch(`${API_URL}/playlists/${playlistId}/shuffle`);
  if (!res.ok) throw new Error("Erro ao buscar shuffle");
  return res.json();
}

export async function criarPlaylist(userId, name) {
  // CORRIGIDO: campo "name" (não "nome") — alinhado com o modelo Playlist.java
  const res = await fetch(`${API_URL}/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name }),
  });
  if (!res.ok) throw new Error("Erro ao criar playlist");
  return res.json();
}

export async function buscarPorArtista(artist) {
  const res = await fetch(`${API_URL}/musicas/search?artist=${encodeURIComponent(artist)}`);
  if (!res.ok) throw new Error("Erro ao buscar por artista");
  return res.json();
}

export async function getMusicasPorGenre(genre) {
  const res = await fetch(`${API_URL}/musicas/genre/${encodeURIComponent(genre)}`);
  if (!res.ok) throw new Error("Erro ao buscar por gênero");
  return res.json();
}

export async function adicionarMusicaPlaylist(playlistId, musicaId) {
  const res = await fetch(`${API_URL}/playlists/${playlistId}/musicas/${musicaId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Erro ao adicionar música à playlist');
  return res.json();
}

export async function deletarPlaylist(playlistId) {
  const res = await fetch(`${API_URL}/playlists/${playlistId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar playlist');
}

export async function resetTopMusicas() {
  const res = await fetch(`${API_URL}/musicas/plays`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao resetar plays');
}

export async function removerMusicaPlaylist(playlistId, musicaId) {
  const res = await fetch(`${API_URL}/playlists/${playlistId}/musicas/${musicaId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao remover música da playlist');
  return res.json();
}
 

// REMOVIDO: uploadMusica — não existe endpoint /api/upload no backend
