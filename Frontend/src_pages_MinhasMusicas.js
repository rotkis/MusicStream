import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getMusicas } from '../services/api';

export default function MinhasMusicas() {
  const [musicas, setMusicas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);

  useEffect(() => {
    getMusicas().then(setMusicas);
  }, []);

  useEffect(() => {
    setFiltradas(musicas);
  }, [musicas]);

  const handleSearch = (e) => {
    const termo = e.target.value.toLowerCase();
    setFiltradas(musicas.filter(m => m.nome.toLowerCase().includes(termo)));
  };

  return (
    <div className="app">
      <Header showSearch={true} />
      <main className="section">
        <h2>🎵 Minhas Músicas</h2>
        <input type="text" placeholder="Buscar músicas..." onChange={handleSearch} />
        <div className="cards">
          {filtradas.map(m => (
            <MusicCard key={m.id} musica={m} />
          ))}
        </div>
      </main>
    </div>
  );
}

