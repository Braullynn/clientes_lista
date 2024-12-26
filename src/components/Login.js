import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { login, senha });
      console.log('Token recebido:', response.data.token); // Adicionado para depuração
    localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
    navigate('/customers'); // Redireciona para a página de cadastro de clientes
  } catch (error) {
    alert('Erro ao realizar login');
  }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/register')}>Cadastro</button>
      </form>
    </div>
  );
};

export default Login;