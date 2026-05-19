import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { user, login, loadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) { setErro('Preencha todos os campos!'); return; }
    setErro('');
    try {
      await login(email, senha);
    } catch (e) {
      setErro(e.message);
    }
  };

  return (
    <div className="login-body">
      <div className="login-box">
        <div className="logo">Vibes</div>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        {erro && <p className="erro">{erro}</p>}
        <button onClick={handleSubmit} disabled={loadingAuth}>
          {loadingAuth ? 'Entrando...' : 'Entrar'}
        </button>
        <p className="register">Não tem conta? <a href="/registro">Criar conta</a></p>
      </div>
    </div>
  );
}