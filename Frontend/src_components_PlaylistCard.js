import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getShuffle } from '../services/api';

export default function PlaylistCard({ playlist }) {
  const navigate = useNavigate();

  const handleShuffle = async () => {
    await getShuffle(playlist.id);
    alert('Playlist em modo aleatório 🎵');
  };

  return (
    <div className="card">
      <p>{playlist.nome}</p>
      <button onClick={() => navigate(`/playlist/${playlist.id}`)}>Abrir</button>
      <button onClick={handleShuffle}>🔀</button>
    </div>
  );
}

