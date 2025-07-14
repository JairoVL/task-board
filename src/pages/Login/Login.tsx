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

    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <label htmlFor="username" className={styles.label}>Usuario</label>
      <Input
        id="username"
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />

      <label htmlFor="password" className={styles.label}>Contraseña</label>
      <Input
        id="password"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <Button type="submit" variant="primary" className={styles.button}>
        Entrar
      </Button>
    </form>
  </div>
);
};


export default Login;
