import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import MinhasMusicas from './pages/MinhasMusicas';
import MinhasPlaylists from './pages/MinhasPlaylists';
import Upload from './pages/Upload';
import PlayerPage from './pages/PlayerPage';
import FooterPlayer from './components/FooterPlayer';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/minhas-musicas" element={<MinhasMusicas />} />
            <Route path="/minhas-playlists" element={<MinhasPlaylists />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <FooterPlayer />
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;