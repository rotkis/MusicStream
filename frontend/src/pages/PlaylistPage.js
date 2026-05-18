import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getPlaylists, getShuffle } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function PlaylistPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [musicas, setMusicas] = useState([]);
  const [erro, setErro] = useState(null);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    // Busca todas as playlists do usuário e filtra a que bate com o id da URL
    getPlaylists(user.id)
      .then((lista) => {
        const found = lista.find((p) => p.id === id);
        if (!found) { setErro('Playlist não encontrada.'); return; }
        setPlaylist(found);
        // musicIds é a lista de ids das músicas — por ora mostra só os ids
        // quando o backend retornar os objetos Music populados, trocar aqui
        setMusicas(found.musicIds?.map((mid) => ({ id: mid, title: mid, artist: '' })) ?? []);
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
              <button
                onClick={handleShuffle}
                disabled={shuffling}
                style={{
                  background: 'rgba(200,241,53,0.1)', color: 'var(--accent)',
                  fontWeight: 700, fontSize: '0.85rem', padding: '9px 18px',
                  borderRadius: '99px', border: '1px solid rgba(200,241,53,0.2)',
                  transition: 'background 0.2s', opacity: shuffling ? 0.6 : 1
                }}
              >
                {shuffling ? 'Embaralhando...' : '🔀 Aleatório'}
              </button>
            </div>

            {musicas.length === 0
              ? <p style={{ color: 'var(--text-muted)' }}>Nenhuma música nesta playlist ainda.</p>
              : <div className="cards">
                  {musicas.map((m) => <MusicCard key={m.id} musica={m} />)}
                </div>
            }
          </>
        )}
      </section>
    </div>
  );
}
