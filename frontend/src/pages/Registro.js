import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { user, registrar, loadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !email || !senha) { setErro('Preencha todos os campos!'); return; }
    if (senha.length < 6) { setErro('Senha deve ter pelo menos 6 caracteres.'); return; }
    setErro('');
    try {
      await registrar(nome, email, senha);
    } catch (e) {
      setErro(e.message);
    }
  };

  return (
    <div className="login-body">
      <div className="login-box">
        <div className="logo">Vibes</div>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha (mín. 6 caracteres)" value={senha} onChange={e => setSenha(e.target.value)} />
        {erro && <p className="erro">{erro}</p>}
        <button onClick={handleSubmit} disabled={loadingAuth}>
          {loadingAuth ? 'Criando conta...' : 'Criar Conta'}
        </button>
        <p className="register">Já tem conta? <a href="/login">Entrar</a></p>
      </div>
    </div>
  );
}