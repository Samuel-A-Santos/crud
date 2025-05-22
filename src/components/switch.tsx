import { useState } from 'react';
import styles from '../styles/components/switch.module.css';

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  checkedLabel?: string;
  uncheckedLabel?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  onCheckedChange,
  disabled = false,
  checkedLabel = 'Sim',
  uncheckedLabel = 'Não',
}) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(false);

  const checked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

  const handleClick = () => {
    if (disabled) return;
    
    if (onCheckedChange) {
      onCheckedChange(!checked);
    } else {
      setUncontrolledChecked(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={`${styles.switch} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
    >
      <span className={styles.thumb} />
      <span className={styles.label}>
        {checked ? checkedLabel : uncheckedLabel}
      </span>
    </button>
  );
};