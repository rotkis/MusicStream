import React, { createContext, useContext, useRef, useState } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [currentMusic, setCurrentMusic] = useState(null);
  const [playing, setPlaying] = useState(false);

  const play = (musica) => {
    // Se clicar na música que já está tocando, pausa/retoma
    if (currentMusic?.id === musica.id) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setPlaying(true);
      }
      return;
    }

    // Música nova: só tenta reproduzir se tiver URL válida
    setCurrentMusic(musica);

    if (musica.url) {
      audioRef.current.src = musica.url;
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      // Sem URL: mostra no player mas não tenta reproduzir áudio
      // (as músicas do banco ainda não têm arquivo de áudio vinculado)
      audioRef.current.src = '';
      setPlaying(false);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  const resume = () => {
    if (currentMusic?.url) {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const togglePlay = () => {
    if (playing) pause();
    else resume();
  };

  return (
    <PlayerContext.Provider value={{ currentMusic, playing, play, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}