import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = 'http://localhost:8080/api/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // começa true — ainda não leu o localStorage
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [erroAuth, setErroAuth] = useState(null);

  useEffect(() => {
    // Lê a sessão salva e só depois marca loading=false
    const stored = localStorage.getItem('usuario');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false); // agora o PrivateRoute pode decidir
  }, []);

  const login = async (email, senha) => {
    setLoadingAuth(true);
    setErroAuth(null);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Erro ao fazer login');
      }
      const usuario = await res.json();
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setUser(usuario);
      return usuario;
    } catch (e) {
      setErroAuth(e.message);
      throw e;
    } finally {
      setLoadingAuth(false);
    }
  };

  const registrar = async (nome, email, senha) => {
    setLoadingAuth(true);
    setErroAuth(null);
    try {
      const res = await fetch(`${API_URL}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Erro ao criar conta');
      }
      const usuario = await res.json();
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setUser(usuario);
      return usuario;
    } catch (e) {
      setErroAuth(e.message);
      throw e;
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, registrar, logout, loadingAuth, erroAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}