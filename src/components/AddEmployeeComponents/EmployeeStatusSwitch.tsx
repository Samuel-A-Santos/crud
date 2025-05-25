import { Switch } from "../switch";
import styles from "../../styles/components/addEmployee.module.css";

interface EmployeeStatusSwitchProps {
  isActive: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const EmployeeStatusSwitch: React.FC<EmployeeStatusSwitchProps> = ({
  isActive,
  onCheckedChange,
}) => {
  return (
    <div className={styles.switchContainer}>
      <span>O trabalhador está ativo ou inativo?</span>
      <Switch
        checked={isActive}
        onCheckedChange={onCheckedChange}
        checkedLabel="Ativo"
        uncheckedLabel="Inativo"
      />
    </div>
  );
};