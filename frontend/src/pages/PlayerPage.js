import React, { useRef, useState, useEffect } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { registrarPlay } from '../services/api';
import FilaReproducao from '../components/FilaReproducao';

export default function PlayerPage() {
  const { currentMusic, playing, togglePlay } = usePlayer();
  const { user } = useAuth();
  const audioRef = useRef(new Audio());
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentMusic) return;
    const audio = audioRef.current;
    audio.src = currentMusic.url ?? '';
    audio.load();
    if (playing) {
      audio.play().catch(() => {});
      if (user?.id && currentMusic.id) {
        registrarPlay(currentMusic.id, user.id).catch(() => {});
      }
    }
  }, [currentMusic]); // eslint-disable-line

  useEffect(() => {
    const audio = audioRef.current;
    if (playing) audio.play().catch(() => {});
    else audio.pause();
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(fmt(audio.currentTime));
    };
    const onLoaded = () => setDuration(fmt(audio.duration));
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  const fmt = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    return `${Math.floor(secs / 60)}:${Math.floor(secs % 60).toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration;
  };

  if (!currentMusic) {
    return (
      <div className="player-page">
        <div className="player-header">
          <button onClick={() => navigate(-1)}>←</button>
        </div>
        <p style={{ color: 'var(--text-muted)', marginTop: 80 }}>Nenhuma música selecionada</p>
      </div>
    );
  }

  return (
    <div className="player-page">
      <div className="player-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h2>Tocando Agora</h2>
      </div>

      <div className="player-cover-art">🎵</div>

      <div className="player-info">
        <h1>{currentMusic.title}</h1>
        <p>{currentMusic.artist}</p>
        {currentMusic.album && (
          <p style={{ fontSize: '0.8rem', marginTop: 2 }}>{currentMusic.album}</p>
        )}
      </div>

      <div className="progress-area">
        <span>{currentTime}</span>
        <input type="range" min="0" max="100" value={progress} onChange={handleSeek} />
        <span style={{ textAlign: 'right' }}>{duration}</span>
      </div>

      <div className="player-controls">
        <button className="play-btn" onClick={togglePlay}>
          {playing ? '⏸' : '▶'}
        </button>
      </div>

      <FilaReproducao />
    </div>
  );
}