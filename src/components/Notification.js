import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Função para mostrar a notificação
export const notify = (message, type) => {
  const toastOptions = {
    style: {
      backgroundColor: type === 'error' ? '#c93232' : 'green', // fundo vermelho para erro
      color: 'white', // fonte branca
    },
  };

  toast(message, { type, ...toastOptions });
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