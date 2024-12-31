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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Login</button>
        <button type="button" onClick={() => navigate('/register')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cadastro</button>
      </form>
    </div>
  );
};

export default Login;
