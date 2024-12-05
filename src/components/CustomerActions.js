import React from 'react';
import { PlusCircle } from 'lucide-react';

const CustomerActions = ({ onAddClick }) => {
  return (
    <div className="customer-actions">
      <button onClick={onAddClick} className="add-customer-btn">
        <PlusCircle className="btn-icon" /> 
        Adicionar Cliente
      </button>
    </div>
  );
};

export default CustomerActions;