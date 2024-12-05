import React from 'react';
import CustomerCatalog from './components/CustomerCatalog';
import Notification from './components/Notification';

function App() {
  return (
    <div className="App">
      <Notification />
      <CustomerCatalog />
    </div>
  );
}

export default App;