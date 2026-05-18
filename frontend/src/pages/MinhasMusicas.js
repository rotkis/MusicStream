import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getMusicas } from '../services/api';

export default function MinhasMusicas() {
  const [musicas, setMusicas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    getMusicas()
      .then((data) => setMusicas(data))
      .catch(() => setErro('Não foi possível carregar as músicas.'));
  }, []);

  useEffect(() => { setFiltradas(musicas); }, [musicas]);

  const handleSearch = (e) => {
    const termo = e.target.value.toLowerCase();
    setFiltradas(
      musicas.filter(
        (m) =>
          m.title.toLowerCase().includes(termo) ||
          m.artist.toLowerCase().includes(termo)
      )
    );
  };

  return (
    <div className="app">
      <Header showSearch={false} />
      <main className="section">
        <h2>🎵 Minhas Músicas</h2>
        {erro && <p className="erro">{erro}</p>}
        <input
          className="search-bar"
          type="text"
          placeholder="Buscar por título ou artista..."
          onChange={handleSearch}
        />
        <div className="cards">
          {filtradas.map((m, i) => (
            <div key={m.id} style={{ animationDelay: `${i * 0.03}s` }}>
              <MusicCard musica={m} />
            </div>
          ))}
        </div>
        {filtradas.length === 0 && !erro && (
          <p style={{ color: 'var(--text-muted)', marginTop: 24 }}>Nenhuma música encontrada.</p>
        )}
      </main>
    </div>
  );
}