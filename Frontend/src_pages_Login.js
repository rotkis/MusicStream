import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && senha) {
      login(email, senha);
      navigate('/home');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div className="login-body">
      <div className="login-box">
        <h1 className="logo">Vibes</h1>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        <button onClick={handleSubmit}>Entrar</button>
        <p className="register">Não tem conta? <a href="/registro">Criar conta</a></p>
      </div>
    </div>
  );
}

