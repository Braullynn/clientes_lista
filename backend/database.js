const sqlite3 = require('sqlite3').verbose();

// Função para criar conexão com o banco de dados
function createDatabaseConnection() {
  const db = new sqlite3.Database('./backend/customers.db', (err) => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados:', err.message);
    } else {
      console.log('Conexão com o banco de dados SQLite estabelecida com sucesso!.');
      createTable(db);
    }
  });
  return db;
}

// Função para criar tabela de clientes se não existir
function createTable(db) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      telefone TEXT
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      console.log('Tabela de clientes criada ou já existente.');
      // Opcional: Inserir dados iniciais se a tabela estiver vazia
      checkAndInsertInitialData(db);
    }
  });
}

// Função para inserir dados iniciais
function checkAndInsertInitialData(db) {
  db.get('SELECT COUNT(*) AS count FROM customers', (err, row) => {
    if (err) {
      console.error('Erro ao verificar dados:', err.message);
      return;
    }

    if (row.count === 0) {
      const initialCustomers = [
        { nome: 'João Silva', email: 'joao@exemplo.com', telefone: '(11) 98765-4321' },
        { nome: 'Maria Souza', email: 'maria@exemplo.com', telefone: '(21) 97654-3210' }
      ];

      const stmt = db.prepare('INSERT INTO customers (nome, email, telefone) VALUES (?, ?, ?)');
      
      initialCustomers.forEach((customer) => {
        stmt.run(customer.nome, customer.email, customer.telefone, (err) => {
          if (err) {
            console.error('Erro ao inserir cliente inicial:', err.message);
          }
        });
      });
      
      stmt.finalize();
    }
  });
}

// Funções para operações CRUD
function getAllCustomers(db, callback) {
  db.all('SELECT * FROM customers', [], callback);
}

function addCustomer(db, customer, callback) {
  const { nome, email, telefone } = customer;
  db.run(
    'INSERT INTO customers (nome, email, telefone) VALUES (?, ?, ?)', 
    [nome, email, telefone], 
    function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...customer });
      }
    }
  );
}

function updateCustomer(db, id, customer, callback) {
  const { nome, email, telefone } = customer;
  db.run(
    'UPDATE customers SET nome = ?, email = ?, telefone = ? WHERE id = ?',
    [nome, email, telefone, id],
    function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id, ...customer });
      }
    }
  );
}

function deleteCustomer(db, id, callback) {
  db.run('DELETE FROM customers WHERE id = ?', [id], function(err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { deletedRows: this.changes });
    }
  });
}

module.exports = {
  createDatabaseConnection,
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
};