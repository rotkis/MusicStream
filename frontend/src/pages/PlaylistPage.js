import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import FilaReproducao from '../components/FilaReproducao';
import { getPlaylists, getShuffle, getMusicas, adicionarMusicaPlaylist, deletarPlaylist, removerMusicaPlaylist } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function PlaylistPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [musicas, setMusicas] = useState([]);
  const [todasMusicas, setTodasMusicas] = useState([]);
  const [erro, setErro] = useState(null);
  const [shuffling, setShuffling] = useState(false);

  // Modal de adicionar músicas
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [adicionando, setAdicionando] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    Promise.all([
      getPlaylists(user.id),
      getMusicas(),
    ])
      .then(([lista, musicasData]) => {
        const found = lista.find((p) => p.id === id);
        if (!found) { setErro('Playlist não encontrada.'); return; }
        setPlaylist(found);
        setTodasMusicas(musicasData);
        const resolved = (found.musicIds ?? [])
          .map((mid) => musicasData.find((m) => m.id === mid))
          .filter(Boolean);
        setMusicas(resolved);
      })
      .catch(() => setErro('Erro ao carregar playlist.'));
  }, [id, user]);

  const handleShuffle = async () => {
    setShuffling(true);
    try {
      const shuffled = await getShuffle(id);
      setMusicas(shuffled);
    } catch {
      setErro('Erro ao embaralhar.');
    } finally {
      setShuffling(false);
    }
  };

  const handleAdicionarMusica = async (musicaId) => {
    setAdicionando(musicaId);
    try {
      await adicionarMusicaPlaylist(id, musicaId);
      const musicaObj = todasMusicas.find(m => m.id === musicaId);
      if (musicaObj && !musicas.find(m => m.id === musicaId)) {
        setMusicas(prev => [...prev, musicaObj]);
      }
    } catch {
      setErro('Erro ao adicionar música.');
    } finally {
      setAdicionando(null);
    }
  };

  const handleDeletarPlaylist = async () => {
    if (!window.confirm('Tem certeza que deseja deletar esta playlist?')) return;
    try {
      await deletarPlaylist(id);
      navigate('/minhas-playlists');
    } catch {
      setErro('Erro ao deletar playlist.');
    }
  };

  const handleRemoverMusica = async (musicaId) => {
    try {
      await removerMusicaPlaylist(id, musicaId);
      setMusicas(prev => prev.filter((m) => m.id !== musicaId));
    } catch {
      setErro('Erro ao remover música.');
    }
  };

  const musicasFiltradas = todasMusicas.filter((m) => {
    const jaEsta = musicas.find(pm => pm.id === m.id);
    if (jaEsta) return false;
    if (!busca.trim()) return true;
    const t = busca.toLowerCase();
    return m.title?.toLowerCase().includes(t) || m.artist?.toLowerCase().includes(t);
  });

  return (
    <div className="app">
      <Header showSearch={false} />
      <section className="section">
        <button
          onClick={() => navigate('/minhas-playlists')}
          style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Voltar
        </button>

        {erro && <p className="erro">{erro}</p>}

        {playlist && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: 'linear-gradient(135deg, #1e2a00, #2a3a00)',
                  border: '1px solid rgba(200,241,53,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem'
                }}>📂</div>
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>{playlist.name}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
                    {musicas.length} música{musicas.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setModalAberto(true)}
                  style={{
                    background: 'var(--accent)', color: '#000',
                    fontWeight: 700, fontSize: '0.85rem', padding: '9px 18px',
                    borderRadius: '99px',
                  }}
                >
                  + Adicionar músicas
                </button>

                <button
                  onClick={handleShuffle}
                  disabled={shuffling}
                  style={{
                    background: 'rgba(200,241,53,0.1)', color: 'var(--accent)',
                    fontWeight: 700, fontSize: '0.85rem', padding: '9px 18px',
                    borderRadius: '99px', border: '1px solid rgba(200,241,53,0.2)',
                    opacity: shuffling ? 0.6 : 1,
                  }}
                >
                  {shuffling ? 'Embaralhando...' : '🔀 Aleatório'}
                </button>

                <button
                  onClick={handleDeletarPlaylist}
                  style={{
                    background: 'rgba(255,60,60,0.15)', color: '#ff6b6b',
                    fontWeight: 700, fontSize: '0.85rem', padding: '9px 18px',
                    borderRadius: '99px', border: '1px solid rgba(255,60,60,0.3)',
                  }}
                >
                  🗑 Excluir
                </button>
              </div>
            </div>

            {musicas.length === 0
              ? <p style={{ color: 'var(--text-muted)' }}>Nenhuma música nesta playlist ainda.</p>
              : <div className="cards">
                  {musicas.map((m) => (
                    <div key={m.id} style={{ position: 'relative' }}>
                      <MusicCard musica={m} allMusicas={musicas} />
                      <button
                        onClick={() => handleRemoverMusica(m.id)}
                        title="Remover da playlist"
                        style={{
                          position: 'absolute',
                          top: 4, right: 4,
                          width: 24, height: 24,
                          borderRadius: '50%',
                          background: 'rgba(255,60,60,0.8)',
                          border: 'none',
                          color: '#fff',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          zIndex: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          lineHeight: 1,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
            }
          </>
        )}
      </section>

      {/* Fila de reprodução */}
      <FilaReproducao />

      {/* Modal de adicionar músicas */}
      {modalAberto && (
        <div
          onClick={() => setModalAberto(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              width: '90%',
              maxWidth: 480,
              maxHeight: '75vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            {/* Cabeçalho do modal */}
            <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1rem' }}>Adicionar músicas</h3>
              <button
                onClick={() => setModalAberto(false)}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1 }}
              >×</button>
            </div>

            {/* Busca */}
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
              <input
                className="search-bar"
                style={{ margin: 0, width: '100%' }}
                type="text"
                placeholder="Buscar por título ou artista..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                autoFocus
              />
            </div>

            {/* Lista de músicas */}
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {musicasFiltradas.length === 0 && (
                <p style={{ color: 'var(--text-muted)', padding: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
                  {busca ? 'Nenhuma música encontrada.' : 'Todas as músicas já estão na playlist.'}
                </p>
              )}
              {musicasFiltradas.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 20px',
                    borderBottom: '1px solid var(--border)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,241,53,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(200,241,53,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', flexShrink: 0,
                  }}>🎵</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {m.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {m.artist}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdicionarMusica(m.id)}
                    disabled={adicionando === m.id}
                    style={{
                      background: 'var(--accent)', color: '#000',
                      fontWeight: 700, fontSize: '0.78rem',
                      padding: '6px 14px', borderRadius: 99,
                      flexShrink: 0,
                      opacity: adicionando === m.id ? 0.5 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {adicionando === m.id ? '...' : '+ Add'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}