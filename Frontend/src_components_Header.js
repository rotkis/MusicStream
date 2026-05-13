import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ showSearch = true }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo-area">
        <span className="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Vibes</span>
        <button className="upload-btn" onClick={() => navigate('/upload')}>Upload</button>
      </div>
      {showSearch && <input type="text" placeholder="Buscar músicas, artistas..." id="busca" />}
      <div className="user" onClick={() => navigate('/minhas-musicas')}>👤</div>
    </header>
  );
}

