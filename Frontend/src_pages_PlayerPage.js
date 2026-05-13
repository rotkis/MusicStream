import React, { useRef, useState, useEffect } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';

export default function PlayerPage() {
  const { currentMusic, playing, togglePlay } = usePlayer();
  const audioRef = useRef(new Audio(currentMusic?.url));
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentMusic) {
      audioRef.current.src = currentMusic.url;
      if (playing) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [currentMusic, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(formatTime(audio.currentTime));
    };
    const setDur = () => setDuration(formatTime(audio.duration));
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setDur);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setDur);
    };
  }, []);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = Math.floor(secs % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const val = e.target.value;
    audioRef.current.currentTime = (val / 100) * audioRef.current.duration;
  };

  if (!currentMusic) return <div className="player-page">Nenhuma música selecionada</div>;

  return (
    <div className="player-page">
      <header className="player-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h2>Tocando Agora</h2>
      </header>
      <div className="player-cover"></div>
      <div className="player-info">
        <h1>{currentMusic.nome}</h1>
        <p>{currentMusic.artista}</p>
      </div>
      <div className="progress-area">
        <span>{currentTime}</span>
        <input type="range" id="progress" value={progress} onChange={handleSeek} />
        <span>{duration}</span>
      </div>
      <div className="controls">
        <button className="play-btn" onClick={togglePlay}>
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  );
}

