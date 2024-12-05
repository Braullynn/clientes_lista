import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Função para mostrar a notificação
export const notify = (message, type) => {
  // O tipo pode ser 'success' ou 'error'
  toast(message, { type });
};

// Componente de contêiner para as notificações
const Notification = () => {
  return (
    <ToastContainer
      position="top-right" // Posição no canto superior direito
      autoClose={3000} // Duração da notificação em milissegundos
      hideProgressBar={true} // Esconder a barra de progresso
      newestOnTop={true} // Notificações mais novas em cima
      closeOnClick
      rtl={false}
      pauseOnHover
      draggable
      pauseOnFocusLoss
    />
  );
};

export default Notification;