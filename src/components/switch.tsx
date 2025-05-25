import { Switch as AntSwitch } from 'antd';
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

  const checked =
    controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

  const handleChange = (checked: boolean) => {
    if (onCheckedChange) {
      onCheckedChange(checked);
    } else {
      setUncontrolledChecked(checked);
    }
  };

  return (
    <div className={styles.switchContainer}>
      <AntSwitch
        checked={checked}
        checkedChildren={checkedLabel}
        unCheckedChildren={uncheckedLabel}
        onChange={handleChange}
        disabled={disabled}
        className={`${styles.antSwitch} ${checked ? styles.checked : ''}`}
      />
    </div>
  );
};
