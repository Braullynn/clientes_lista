import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './CustomerTable';
import CustomerModal from './CustomerModal';
import CustomerActions from './CustomerActions';
import SearchBar from './SearchBar'; // Importa o novo componente de busca
import { notify } from './Notification';
import '../styles/CustomerCatalog.css';

const API_URL = 'http://localhost:5000/api/customers';

const CustomerCatalog = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Buscar clientes ao carregar o componente
  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filtra os clientes sempre que o searchTerm muda
    setFilteredCustomers(
      customers.filter(customer =>
        customer.nome.toLowerCase().includes(searchTerm.toLowerCase()) || // Busca pelo nome
        customer.telefone.includes(searchTerm) || // Busca pelo telefone
        customer.id.toString().includes(searchTerm) // Busca pelo ID
      )
    );
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setCustomers(response.data);
      setFilteredCustomers(response.data); // Inicialmente, todos os clientes são mostrados
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar clientes');
      setLoading(false);
    }
  };

  // Método para abrir modal de edição
  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Método para fechar modal
  const closeModal = () => {
    setSelectedCustomer(null);
    setIsModalOpen(false);
  };

  const handleAddCustomer = async (newCustomer) => {
    try {
      const response = await axios.post(API_URL, newCustomer);
      setCustomers([...customers, response.data]);
      notify('Item adicionado', 'success'); // Notificação de sucesso
      closeModal();
    } catch (err) {
      setError('Erro ao adicionar cliente');
    }
  };
  
  const handleEditCustomer = async (updatedCustomer) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedCustomer.id}`, updatedCustomer);
      setCustomers(customers.map(customer => 
        customer.id === updatedCustomer.id ? response.data : customer
      ));
      notify('Item editado', 'success'); // Notificação de sucesso
      closeModal();
    } catch (err) {
      setError('Erro ao atualizar cliente');
    }
  };
  
  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCustomers(customers.filter(customer => customer.id !== id));
      notify('Item deletado', 'error'); // Notificação de erro
    } catch (err) {
      setError('Erro ao deletar cliente');
    }
  };
  

  // Renderização com tratamento de carregamento e erros
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="customer-catalog">
      <h1>Catálogo de Clientes</h1>

      <SearchBar 
        searchTerm={searchTerm} // Passa o termo de busca atual
        onSearchChange={setSearchTerm} // Passa a função para atualizar o termo de busca
      />
      
      <CustomerTable 
        customers={filteredCustomers} // Passa os clientes filtrados para a tabela
        onEdit={openEditModal}
        onDelete={handleDeleteCustomer}
      />

      <CustomerActions 
        onAddClick={() => setIsModalOpen(true)} 
      />

      {isModalOpen && (
        <CustomerModal 
          customer={selectedCustomer}
          onClose={closeModal}
          onAdd={handleAddCustomer}
          onEdit={handleEditCustomer}
        />
      )}
    </div>
  );
};

export default CustomerCatalog;