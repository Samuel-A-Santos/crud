import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import styles from '../styles/components/checkbox.module.css';
import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  label,
  id,
}) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <CheckboxPrimitive.Root
        className={styles.root}
        checked={checked}
        onCheckedChange={onCheckedChange}
        id={id}
      >
        <CheckboxPrimitive.Indicator className={styles.indicator}>
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};
