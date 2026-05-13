import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email, senha) => {
    // Simulação – substituir por chamada real ao backend
    const usuario = { id: 1, nome: "Usuário", email };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUser(usuario);
  };

  const registrar = (nome, email, senha) => {
    const usuario = { id: 1, nome, email };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUser(usuario);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

