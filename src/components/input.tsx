import { useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from '../styles/components/input.module.css';

interface InputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value: controlledValue,
  onChange,
  error,
  placeholder = '',
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setUncontrolledValue(newValue);
    }
  };

  const value =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
