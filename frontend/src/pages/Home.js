import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import PlaylistCard from '../components/PlaylistCard';
import FilaReproducao from '../components/FilaReproducao';
import { getMusicas, getTopMusicas, getPlaylists } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { usePlayer } from '../contexts/PlayerContext';

export default function Home() {
  const [musicas, setMusicas] = useState([]);
  const [top, setTop] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [erro, setErro] = useState(null);
  const { user } = useAuth();
  const { play } = usePlayer();
  const userId = user?.id;

  const handlePlayRandom = () => {
    const lista = musicas.length > 0 ? musicas : top;
    if (lista.length === 0) return;
    const randomIndex = Math.floor(Math.random() * lista.length);
    const chosen = lista[randomIndex];
    const outras = lista.filter((m) => m.id !== chosen.id);
    const shuffled = [...outras].sort(() => Math.random() - 0.5);
    play(chosen, [chosen, ...shuffled]);
  };

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

  // Lista completa para gerar fila aleatória ao tocar
  const todasMusicas = [...new Map([...top, ...musicas].map(m => [m.id, m])).values()];

  return (
    <div className="app">
      <Header />

      <section className="banner">
        <div className="banner-content">
          <h1>Escute o que<br /><span>te move</span></h1>
          <button onClick={handlePlayRandom}>▶ Reproduzir Agora</button>
        </div>
      </section>

      {erro && <p className="erro" style={{ padding: '16px 40px' }}>{erro}</p>}

      {/* Seção de próximas músicas (fila de reprodução) */}
      <FilaReproducao />

      {top.length > 0 && (
        <section className="section">
          <h2>🔥 Top mais ouvidas</h2>
          <div className="cards">
            {top.map((m, i) => (
              <div key={m.id} style={{ position: 'relative', animationDelay: `${i * 0.05}s` }}>
                <MusicCard musica={m} allMusicas={todasMusicas} />
                <div style={{
                  position: 'absolute',
                  top: 6, left: 6,
                  background: 'rgba(200,241,53,0.15)',
                  color: 'var(--accent)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 99,
                  border: '1px solid rgba(200,241,53,0.25)',
                  backdropFilter: 'blur(4px)',
                }}>
                  {m.playCount} plays
                </div>
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
              <MusicCard musica={m} allMusicas={todasMusicas} />
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