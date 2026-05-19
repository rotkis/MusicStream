import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import PlaylistCard from '../components/PlaylistCard';
import FilaReproducao from '../components/FilaReproducao';
import { getMusicas, getTopMusicas, getPlaylists, resetTopMusicas } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { usePlayer } from '../contexts/PlayerContext';

export default function Home() {
  const [musicas, setMusicas] = useState([]);
  const [top, setTop] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [erro, setErro] = useState(null);
  const [resetando, setResetando] = useState(false);
  const { user } = useAuth();
  const { play } = usePlayer();
  const userId = user?.id;

  const handleResetPlays = async () => {
    if (!window.confirm('Resetar todas as contagens de plays?')) return;
    setResetando(true);
    try {
      await resetTopMusicas();
      setTop([]);
    } catch {
      setErro('Erro ao resetar plays');
    } finally {
      setResetando(false);
    }
  };

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
        const [m, t] = await Promise.all([getMusicas(), getTopMusicas(10, userId)]);
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
          {user?.nome && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 4 }}>Olá, <strong style={{ color: 'var(--accent)' }}>{user.nome}</strong></p>}
          <h1>Escute o que<br /><span>te move</span></h1>
          <button onClick={handlePlayRandom}>▶ Reproduzir Agora</button>
        </div>
      </section>

      {erro && <p className="erro" style={{ padding: '16px 40px' }}>{erro}</p>}

      {/* Seção de próximas músicas (fila de reprodução) */}
      <FilaReproducao />

      {top.length > 0 && (
        <section className="section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <h2 style={{ margin: 0 }}>🔥 Top mais ouvidas</h2>
            <button
              onClick={handleResetPlays}
              disabled={resetando}
              style={{
                background: 'rgba(255,60,60,0.1)',
                color: '#ff6b6b',
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '5px 12px',
                borderRadius: 99,
                border: '1px solid rgba(255,60,60,0.2)',
                opacity: resetando ? 0.5 : 1,
              }}
            >
              {resetando ? 'Resetando...' : 'Resetar'}
            </button>
          </div>
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