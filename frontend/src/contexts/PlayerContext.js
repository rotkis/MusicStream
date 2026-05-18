// PlayerContext.js
// Adicione `queue` ao estado e atualize a função `play` para aceitar uma fila opcional.
// Substitua o seu PlayerContext existente por este.

import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentMusic, setCurrentMusic] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]); // fila completa incluindo a atual

  // play(musica) — toca uma música sem alterar a fila
  // play(musica, novaFila) — toca e define uma nova fila aleatória
  const play = (musica, novaFila = null) => {
    setCurrentMusic(musica);
    setPlaying(true);
    if (novaFila) {
      setQueue(novaFila);
    } else if (!queue.find((m) => m.id === musica.id)) {
      // Se a música não está na fila, adiciona ela no início
      setQueue((prev) => [musica, ...prev]);
    }
  };

  const togglePlay = () => setPlaying((v) => !v);

  return (
    <PlayerContext.Provider value={{ currentMusic, playing, play, togglePlay, queue, setQueue }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);