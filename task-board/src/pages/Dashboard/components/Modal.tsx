import React from "react";
import styles from '../../../styles/Modal.module.scss';


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h2>{title}</h2>}
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
