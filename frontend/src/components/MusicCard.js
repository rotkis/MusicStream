import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useAuth } from '../contexts/AuthContext';
import { registrarPlay, getPlaylists, adicionarMusicaPlaylist } from '../services/api';

export default function MusicCard({ musica, allMusicas = [] }) {
  const { play, currentMusic, playing } = usePlayer();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [feedback, setFeedback] = useState('');
  const menuRef = useRef(null);

  const isPlaying = currentMusic?.id === musica.id && playing;

  // Fecha o menu ao clicar fora
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handlePlay = async () => {
    await registrarPlay(musica.id, user?.id).catch(() => {});
    // Gera fila aleatória com as demais músicas
    const outras = allMusicas.filter((m) => m.id !== musica.id);
    const shuffled = [...outras].sort(() => Math.random() - 0.5);
    play(musica, [musica, ...shuffled]);
  };

  const handleOpenMenu = async (e) => {
    e.stopPropagation();
    if (!user?.id) return;
    setMenuOpen((v) => !v);
    if (!menuOpen) {
      setLoadingPlaylists(true);
      try {
        const p = await getPlaylists(user.id);
        setPlaylists(p);
      } catch {
        setPlaylists([]);
      } finally {
        setLoadingPlaylists(false);
      }
    }
  };

  const handleAddToPlaylist = async (e, playlistId) => {
    e.stopPropagation();
    try {
      await adicionarMusicaPlaylist(playlistId, musica.id);
      setFeedback('Adicionada! ✓');
      setTimeout(() => setFeedback(''), 2000);
    } catch {
      setFeedback('Erro ao adicionar');
      setTimeout(() => setFeedback(''), 2000);
    }
    setMenuOpen(false);
  };

  const formatDuration = (secs) => {
    if (!secs) return '';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`music-card${isPlaying ? ' playing' : ''}`} onClick={handlePlay} style={{ position: 'relative' }}>
      <div className="card-cover">
        🎵
        <div className="play-overlay">
          <button>{isPlaying ? '⏸' : '▶'}</button>
        </div>
      </div>
      <div className="card-title">{musica.title}</div>
      <div className="card-sub">
        {musica.artist}
        {musica.durationSeconds ? ` · ${formatDuration(musica.durationSeconds)}` : ''}
      </div>

      {/* Botão + para adicionar à playlist */}
      <div style={{ position: 'relative' }} ref={menuRef}>
        <button
          className="add-to-playlist-btn"
          onClick={handleOpenMenu}
          title="Adicionar à playlist"
          style={{
            position: 'absolute',
            top: -92,
            right: 6,
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(200,241,53,0.4)',
            color: 'var(--accent)',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            lineHeight: 1,
          }}
        >
          +
        </button>

        {feedback && (
          <div style={{
            position: 'absolute',
            top: -115,
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            fontSize: '0.75rem',
            padding: '4px 10px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
            zIndex: 20,
          }}>
            {feedback}
          </div>
        )}

        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: -112,
            right: 34,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            minWidth: 180,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 100,
            overflow: 'hidden',
          }}>
            <div style={{ padding: '8px 14px', fontSize: '0.72rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Adicionar à playlist
            </div>
            {loadingPlaylists && (
              <div style={{ padding: '12px 14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Carregando...</div>
            )}
            {!loadingPlaylists && playlists.length === 0 && (
              <div style={{ padding: '12px 14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Nenhuma playlist criada.</div>
            )}
            {playlists.map((p) => (
              <button
                key={p.id}
                onClick={(e) => handleAddToPlaylist(e, p.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 14px',
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                  background: 'transparent',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,241,53,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                📂 {p.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}