import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';

export default function FooterPlayer() {
  const { currentMusic, playing, togglePlay } = usePlayer();
  const navigate = useNavigate();

  if (!currentMusic) return null;

  return (
    <footer className="footer-player" onClick={() => navigate('/player')}>
      <div className="fp-cover">🎵</div>
      <div className="fp-info">
        <div className="fp-title">{currentMusic.title}</div>
        <div className="fp-artist">{currentMusic.artist}</div>
      </div>
      <div className="fp-controls">
        <button
          className="fp-play"
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
        >
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </footer>
  );
}