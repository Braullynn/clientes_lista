import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerCatalog from './components/CustomerCatalog';
import Notification from './components/Notification';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Notification />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/customers" element={<CustomerCatalog />} />
          <Route path="/register" element={<Register />} /> {/* Página de cadastro */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;