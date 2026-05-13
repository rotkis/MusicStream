import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome && email && senha) {
      registrar(nome, email, senha);
      navigate('/home');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div className="login-body">
      <div className="login-box">
        <h1 className="logo">Vibes</h1>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        <button onClick={handleSubmit}>Criar Conta</button>
        <p className="register">Já tem conta? <a href="/login">Entrar</a></p>
      </div>
    </div>
  );
}

