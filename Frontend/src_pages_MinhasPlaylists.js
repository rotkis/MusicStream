import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PlaylistCard from '../components/PlaylistCard';
import { getPlaylists } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function MinhasPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuth();
  const userId = user?.id || 1;

  useEffect(() => {
    getPlaylists(userId).then(setPlaylists);
  }, [userId]);

  return (
    <div className="app">
      <Header showSearch={false} />
      <section className="section">
        <h1>📂 Minhas Playlists</h1>
        <div className="playlist-grid">
          {playlists.map(p => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

