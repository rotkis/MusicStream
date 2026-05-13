import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';

export default function FooterPlayer() {
  const { currentMusic, playing, togglePlay } = usePlayer();
  const navigate = useNavigate();

  if (!currentMusic) return null;

  return (
    <footer className="player" onClick={() => navigate('/player')}>
      <div className="music-info">
        <div className="cover"></div>
        <div>
          <p id="nome-musica">{currentMusic.nome}</p>
          <span>{currentMusic.artista}</span>
        </div>
      </div>
      <div className="controls">
        <button onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </footer>
  );
}

