import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import MinhasMusicas from './pages/MinhasMusicas';
import MinhasPlaylists from './pages/MinhasPlaylists';
import PlaylistPage from './pages/PlaylistPage';
import Upload from './pages/Upload';
import PlayerPage from './pages/PlayerPage';
import FooterPlayer from './components/FooterPlayer';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Ainda lendo o localStorage — não redireciona ainda
  if (loading) return null;

  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/home"             element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/minhas-musicas"   element={<PrivateRoute><MinhasMusicas /></PrivateRoute>} />
        <Route path="/minhas-playlists" element={<PrivateRoute><MinhasPlaylists /></PrivateRoute>} />
        <Route path="/playlist/:id"     element={<PrivateRoute><PlaylistPage /></PrivateRoute>} />
        <Route path="/upload"           element={<PrivateRoute><Upload /></PrivateRoute>} />
        <Route path="/player"           element={<PrivateRoute><PlayerPage /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <FooterPlayer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <AppRoutes />
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}