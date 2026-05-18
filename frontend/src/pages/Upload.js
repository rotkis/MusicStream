import React from 'react';
import Header from '../components/Header';

export default function Upload() {
  return (
    <div className="app">
      <Header showSearch={false} />
      <main className="section">
        <h2>📤 Upload de Música</h2>
        <div className="upload-area">
          <p style={{ fontSize: '2rem', marginBottom: 12 }}>🎵</p>
          <p style={{ color: 'var(--text-mid)' }}>Funcionalidade em desenvolvimento.</p>
        </div>
      </main>
    </div>
  );
}