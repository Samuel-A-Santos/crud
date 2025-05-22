import { useState } from 'react';
import styles from '../styles/components/doubleCheck.module.css';

type Gender = 'feminino' | 'masculino' | null;

interface DoubleCheckProps {
  onChange?: (gender: Gender) => void;
  value?: Gender;
}

export const DoubleCheck: React.FC<DoubleCheckProps> = ({ onChange, value: controlledValue }) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<Gender>(null);
  
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleSelect = (gender: Gender) => {
    if (onChange) {
      onChange(gender);
    } else {
      setUncontrolledValue(gender);
    }
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.option} ${value === 'feminino' ? styles.checked : ''}`}
        onClick={() => handleSelect('feminino')}
      >
        <div className={styles.radio}>
          <div className={styles.innerCircle} />
        </div>
        Feminino
      </button>
      
      <button
        type="button"
        className={`${styles.option} ${value === 'masculino' ? styles.checked : ''}`}
        onClick={() => handleSelect('masculino')}
      >
        <div className={styles.radio}>
          <div className={styles.innerCircle} />
        </div>
        Masculino
      </button>
    </div>
  );
};