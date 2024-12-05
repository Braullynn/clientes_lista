import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.nome}</td>
            <td>{customer.email}</td>
            <td>{customer.telefone}</td>
            <td>
              <button onClick={() => onEdit(customer)} className="edit-btn">
                <Edit size={20} />
              </button>
              <button onClick={() => onDelete(customer.id)} className="delete-btn">
                <Trash2 size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;