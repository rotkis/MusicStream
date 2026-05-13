import React, { createContext, useContext, useRef, useState } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [currentMusic, setCurrentMusic] = useState(null);
  const [playing, setPlaying] = useState(false);

  const play = (musica) => {
    if (currentMusic?.id === musica.id && playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.src = musica.url;
      audioRef.current.play();
      setCurrentMusic(musica);
      setPlaying(true);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  const resume = () => {
    audioRef.current.play();
    setPlaying(true);
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

