import React, { useState } from "react";
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from "./Login.module.scss";

type LoginProps = {
  onLogin?: () => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    localStorage.setItem("authToken", "fake-token");

    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Iniciar sesión</h2>

      <Input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin} variant="primary">Entrar</Button>
    </div>
  );
};

export default Login;
