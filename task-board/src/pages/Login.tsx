import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim().length > 0) {
      // Guardar token ficticio
      localStorage.setItem('authToken', 'fake-token');
      navigate('/dashboard');
    } else {
      alert('Por favor, ingresa un nombre de usuario.');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 300, margin: 'auto' }}>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', padding: 10, cursor: 'pointer' }}
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;

