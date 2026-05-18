import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ showSearch = true, onSearch }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <span className="logo" onClick={() => navigate('/home')}>Vibes</span>

      {showSearch && (
        <div className="search-wrap">
          <input
            type="text"
            placeholder="Buscar músicas, artistas..."
            onChange={onSearch}
          />
        </div>
      )}

      <nav className="nav-links">
        <a onClick={() => navigate('/home')}>Início</a>
        <a onClick={() => navigate('/minhas-musicas')}>Músicas</a>
        <a onClick={() => navigate('/minhas-playlists')}>Playlists</a>
      </nav>
    </header>
  );
}