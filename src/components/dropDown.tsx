import { useState } from 'react';
import styles from '../styles/components/dropDown.module.css';

interface DropDown<T> {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  renderOption: (option: T) => string;
  placeholder?: string;
  label?: string;  
}

export function DropDown<T>({ 
  options, 
  value, 
  onChange, 
  renderOption,
  placeholder = "Selecione uma opção",
  label 
}: DropDown<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: T) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.container}>
        <button 
          type="button" 
          className={styles.trigger}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value ? renderOption(value) : placeholder}</span>
          <svg 
            className={`${styles.arrow} ${isOpen ? styles.open : ''}`} 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M7 10L12 15L17 10" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div className={styles.options}>
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                className={styles.option}
                onClick={() => handleSelect(option)}
              >
                {renderOption(option)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}