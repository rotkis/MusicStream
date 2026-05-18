import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useAuth } from '../contexts/AuthContext';
import { registrarPlay } from '../services/api';

export default function MusicCard({ musica }) {
  const { play, currentMusic, playing } = usePlayer();
  const { user } = useAuth();

  const isPlaying = currentMusic?.id === musica.id && playing;

  const handlePlay = async () => {
    await registrarPlay(musica.id, user?.id).catch(() => {});
    play(musica);
  };

  const formatDuration = (secs) => {
    if (!secs) return '';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`music-card${isPlaying ? ' playing' : ''}`} onClick={handlePlay}>
      <div className="card-cover">
        🎵
        <div className="play-overlay">
          <button>{isPlaying ? '⏸' : '▶'}</button>
        </div>
      </div>
      <div className="card-title">{musica.title}</div>
      <div className="card-sub">
        {musica.artist}
        {musica.durationSeconds ? ` · ${formatDuration(musica.durationSeconds)}` : ''}
      </div>
    </div>
  );
}