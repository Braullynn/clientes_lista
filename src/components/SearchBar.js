// src/components/SearchBar.js
import React from 'react';

// Componente SearchBar que recebe uma função para lidar com a busca
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por nome, número ou ID..."
        value={searchTerm} // O valor do input é controlado pelo estado do componente pai
        onChange={(e) => onSearchChange(e.target.value)} // Chama a função onSearchChange quando o texto muda
      />
    </div>
  );
};

export default SearchBar;// src/components/SearchBar.js