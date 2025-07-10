import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.scss';
import { BoardProvider } from './context/BoardContext'; // 💡 Importamos el contexto

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <BoardProvider> {/* 💡 Envolvemos App con el Provider */}
      <App />
    </BoardProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
