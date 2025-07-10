import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

type LoginProps = {
  onLogin?: () => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Simular autenticación
    localStorage.setItem('authToken', 'fake-token');

    // Notificar al componente padre (App) que se autenticó
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div style={{
      padding: 20,
      maxWidth: 320,
      margin: '100px auto',
      backgroundColor: '#fff',
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginBottom: 16, textAlign: 'center' }}>Iniciar sesión</h2>
      
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 4, border: '1px solid #ccc' }}
      />
      
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
      />
      
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: 10,
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          fontWeight: 'bold'
        }}
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
