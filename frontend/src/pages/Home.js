import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import PlaylistCard from '../components/PlaylistCard';
import { getMusicas, getTopMusicas, getPlaylists } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const [musicas, setMusicas] = useState([]);
  const [top, setTop] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [erro, setErro] = useState(null);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    async function load() {
      try {
        const [m, t] = await Promise.all([getMusicas(), getTopMusicas()]);
        setMusicas(m);
        setTop(t);
        if (userId) {
          const p = await getPlaylists(userId);
          setPlaylists(p);
        }
      } catch {
        setErro('Não foi possível carregar. Verifique se o backend está rodando na porta 8080.');
      }
    }
    load();
  }, [userId]);

  return (
    <div className="app">
      <Header />

      <section className="banner">
        <div className="banner-content">
          <h1>Escute o que<br /><span>te move</span></h1>
          <button>▶ Reproduzir Agora</button>
        </div>
      </section>

      {erro && <p className="erro" style={{ padding: '16px 40px' }}>{erro}</p>}

      {top.length > 0 && (
        <section className="section">
          <h2>🔥 Top mais ouvidas</h2>
          <div className="cards">
            {top.map((m, i) => (
              <div key={m.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <MusicCard musica={m} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2>🎵 Todas as músicas</h2>
        <div className="cards">
          {musicas.map((m, i) => (
            <div key={m.id} style={{ animationDelay: `${i * 0.03}s` }}>
              <MusicCard musica={m} />
            </div>
          ))}
        </div>
      </section>

      {userId && playlists.length > 0 && (
        <section className="section">
          <h2>📂 Minhas playlists</h2>
          <div className="playlist-grid">
            {playlists.map((p) => (
              <PlaylistCard key={p.id} playlist={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}