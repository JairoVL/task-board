import React from "react";
import styles from "../styles/Dashboard.module.scss";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.column}>
        <h3>Por hacer</h3>
        <div className={styles.task}>Estudiar React</div>
        <div className={styles.task}>Diseñar wireframe</div>
      </div>

      <div className={styles.column}>
        <h3>En progreso</h3>
        <div className={styles.task}>Maquetar dashboard</div>
      </div>

      <div className={styles.column}>
        <h3>Completado</h3>
        <div className={styles.task}>Crear repositorio</div>
      </div>
    </div>
  );
};

export default Dashboard;

