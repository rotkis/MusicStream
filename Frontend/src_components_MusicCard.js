import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { registrarPlay } from '../services/api';

export default function MusicCard({ musica }) {
  const { play } = usePlayer();

  const handlePlay = async () => {
    await registrarPlay(musica.id);
    play(musica);
  };

  return (
    <div className="card">
      <p>{musica.nome}</p>
      <span>{musica.artista || ""}</span>
      <button onClick={handlePlay}>▶</button>
    </div>
  );
}

