import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getShuffle } from '../services/api';

export default function PlaylistCard({ playlist }) {
  const navigate = useNavigate();

  const handleShuffle = async (e) => {
    e.stopPropagation();
    await getShuffle(playlist.id).catch(() => {});
    alert('Playlist em modo aleatório 🎵');
  };

  return (
    <div className="playlist-card" onClick={() => navigate(`/playlist/${playlist.id}`)}>
      <div className="playlist-icon">📂</div>
      <div className="playlist-name">{playlist.name}</div>
      <div className="playlist-actions">
        <button className="btn-open" onClick={(e) => { e.stopPropagation(); navigate(`/playlist/${playlist.id}`); }}>
          Abrir
        </button>
        <button className="btn-shuffle" onClick={handleShuffle} title="Aleatório">
          🔀
        </button>
      </div>
    </div>
  );
}