import React from 'react';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'danger';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: Variant;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
