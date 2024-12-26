const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('./database');

const app = express();
const port = 5000; // Porta do backend

// Middleware
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Permite processar JSON

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtém o cabeçalho Authorization
  const token = authHeader && authHeader.split(' ')[1]; // Extrai o token JWT (Bearer <token>)

  if (!token) {
    console.log('Token não fornecido'); // Log adicional para depuração
    return res.sendStatus(401); // Não autorizado
  }

  jwt.verify(token, 'seu_segredo', (err, user) => {
    if (err) {
      console.log('Token inválido:', err); // Log adicional para depuração
      return res.sendStatus(403); // Proibido
    }
    req.user = user; // Armazena os dados do usuário decodificados no request
    next();
  });
};

// Rota para cadastro de usuário
app.post('/api/register', (req, res) => {
  const { login, senha } = req.body;
  const hashedPassword = bcrypt.hashSync(senha, 10); // Criptografa a senha

  database.addUser(db, { login, senha: hashedPassword }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    res.status(201).json(user);
  });
});

// Função para adicionar usuário no banco de dados
database.addUser = (db, user, callback) => {
  db.run('INSERT INTO users (login, senha) VALUES (?, ?)', [user.login, user.senha], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: this.lastID, ...user });
    }
  });
};

// Rota para login
app.post('/api/login', (req, res) => {
  const { login, senha } = req.body;
  database.getUserByLogin(login, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (bcrypt.compareSync(senha, user.senha)) {
      const token = jwt.sign({ login: user.login }, 'seu_segredo'); // Gera um token JWT
      res.json({ token });
    } else {
      res.status(403).json({ error: 'Senha incorreta' });
    }
  });
});

// Função para obter usuário por login
database.getUserByLogin = (login, callback) => {
  db.get('SELECT * FROM users WHERE login = ?', [login], callback);
};

// Conecta ao banco de dados
const db = database.createDatabaseConnection();

// Rotas CRUD para clientes

// Rota para obter todos os clientes (protegida por autenticação)
app.get('/api/customers', authenticateToken, (req, res) => {
  database.getAllCustomers(db, (err, customers) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    } else {
      res.json(customers);
    }
  });
});

// Rota para adicionar um novo cliente (protegida por autenticação)
app.post('/api/customers', authenticateToken, (req, res) => {
  const newCustomer = req.body; // Dados do novo cliente enviados pelo frontend
  database.addCustomer(db, newCustomer, (err, customer) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao adicionar cliente', details: err.message });
    } else {
      res.status(201).json(customer);
    }
  });
});

// Rota para atualizar um cliente existente (protegida por autenticação)
app.put('/api/customers/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id); // ID do cliente a ser atualizado
  const updatedCustomer = req.body; // Dados atualizados do cliente enviados pelo frontend

  database.updateCustomer(db, id, updatedCustomer, (err, customer) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao atualizar cliente', details: err.message });
    } else {
      res.json(customer);
    }
  });
});

// Rota para deletar um cliente (protegida por autenticação)
app.delete('/api/customers/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id); // ID do cliente a ser deletado

  database.deleteCustomer(db, id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao deletar cliente', details: err.message });
    } else {
      res.json({ message: 'Cliente deletado com sucesso', result });
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});