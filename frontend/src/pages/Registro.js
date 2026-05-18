import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { registrar, loadingAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !email || !senha) { setErro('Preencha todos os campos!'); return; }
    if (senha.length < 6) { setErro('Senha deve ter pelo menos 6 caracteres.'); return; }
    setErro('');
    try {
      await registrar(nome, email, senha);
      navigate('/home');
    } catch (e) {
      setErro(e.message); // ex: "Email já cadastrado"
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