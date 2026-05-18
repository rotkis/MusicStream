import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PlaylistCard from '../components/PlaylistCard';
import { getPlaylists, criarPlaylist } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function MinhasPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [erro, setErro] = useState(null);
  const [criando, setCriando] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [salvando, setSalvando] = useState(false);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    getPlaylists(userId)
      .then(setPlaylists)
      .catch(() => setErro('Não foi possível carregar as playlists.'));
  }, [userId]);

  const handleCriar = async () => {
    if (!novoNome.trim()) return;
    setSalvando(true);
    try {
      const nova = await criarPlaylist(userId, novoNome.trim());
      setPlaylists((prev) => [...prev, nova]);
      setNovoNome('');
      setCriando(false);
    } catch {
      setErro('Erro ao criar playlist.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="app">
      <Header showSearch={false} />
      <section className="section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>📂 Minhas Playlists</h2>
          <button
            onClick={() => setCriando((v) => !v)}
            style={{
              background: 'var(--accent)',
              color: '#000',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.82rem',
              padding: '8px 18px',
              borderRadius: '99px',
              letterSpacing: '0.04em',
              transition: 'opacity 0.2s',
            }}
          >
            + Nova Playlist
          </button>
        </div>

        {/* Formulário inline de criação */}
        {criando && (
          <div style={{
            display: 'flex',
            gap: 10,
            marginBottom: 24,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '14px 16px',
          }}>
            <input
              className="search-bar"
              style={{ margin: 0, flex: 1 }}
              type="text"
              placeholder="Nome da playlist..."
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCriar()}
              autoFocus
            />
            <button
              onClick={handleCriar}
              disabled={salvando || !novoNome.trim()}
              style={{
                background: 'var(--accent)',
                color: '#000',
                fontWeight: 700,
                fontSize: '0.85rem',
                padding: '8px 20px',
                borderRadius: '8px',
                opacity: salvando || !novoNome.trim() ? 0.5 : 1,
              }}
            >
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              onClick={() => { setCriando(false); setNovoNome(''); }}
              style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px 12px' }}
            >
              Cancelar
            </button>
          </div>
        )}

        {erro && <p className="erro">{erro}</p>}

        <div className="playlist-grid">
          {playlists.map((p) => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>

        {playlists.length === 0 && !erro && (
          <p style={{ color: 'var(--text-muted)', marginTop: 24 }}>
            Nenhuma playlist ainda. Crie a primeira!
          </p>
        )}
      </section>
    </div>
  );
}