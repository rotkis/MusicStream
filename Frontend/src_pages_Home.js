import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getMusicas, getTopMusicas, getPlaylists } from '../services/api';
import MusicCard from '../components/MusicCard';
import PlaylistCard from '../components/PlaylistCard';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const [musicas, setMusicas] = useState([]);
  const [top, setTop] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuth();
  const userId = user?.id || 1;

  useEffect(() => {
    async function load() {
      const m = await getMusicas();
      setMusicas(m);
      const t = await getTopMusicas();
      setTop(t);
      const p = await getPlaylists(userId);
      setPlaylists(p);
    }
    load();
  }, [userId]);

  return (
    <div className="app">
      <Header />
      <section className="banner">
        <div className="banner-content">
          <h1>Escute o que te move</h1>
          <button>▶ Reproduzir Agora</button>
        </div>
      </section>
      <section className="section">
        <h2>🎵 Playlists Populares</h2>
        <div className="cards">
          {playlists.slice(0, 4).map(p => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>
      </section>
      <section className="section">
        <h2>🎵 Todas as músicas</h2>
        <div className="cards">
          {musicas.map(m => (
            <MusicCard key={m.id} musica={m} />
          ))}
        </div>
      </section>
      <section className="section">
        <h2>🔥 Top mais ouvidas</h2>
        <div className="cards">
          {top.map(m => (
            <MusicCard key={m.id} musica={m} />
          ))}
        </div>
      </section>
      <section className="section">
        <h2>📂 Minhas playlists</h2>
        <div className="cards">
          {playlists.map(p => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

