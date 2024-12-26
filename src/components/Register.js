// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { login, senha });
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;