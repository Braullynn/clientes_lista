const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();
const port = 5000;  // Porta do backend

// Middleware
app.use(cors());  // Permite requisições de diferentes origens
app.use(express.json());  // Permite processar JSON

// Conecta ao banco de dados
const db = database.createDatabaseConnection();

// Rotas CRUD
app.get('/api/customers', (req, res) => {
  database.getAllCustomers(db, (err, customers) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    } else {
      res.json(customers);
    }
  });
});

app.post('/api/customers', (req, res) => {
  const newCustomer = req.body;
  database.addCustomer(db, newCustomer, (err, customer) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao adicionar cliente', details: err.message });
    } else {
      res.status(201).json(customer);
    }
  });
});

app.put('/api/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCustomer = req.body;
  
  database.updateCustomer(db, id, updatedCustomer, (err, customer) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao atualizar cliente', details: err.message });
    } else {
      res.json(customer);
    }
  });
});

app.delete('/api/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
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