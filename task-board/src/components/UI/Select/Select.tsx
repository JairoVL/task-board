import React from 'react';
import styles from './Select.module.scss';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  id?: string; 
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

const Select: React.FC<SelectProps> = ({ id, options, value, onChange, className }) => {
  return (
    <select
      id={id} 
      value={value}
      onChange={onChange}
      className={`${styles.select} ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
