import { Switch } from "../../components/switch"; 
import styles from "../../styles/pages/edit.module.css"; 

interface StepCompletionSwitchProps {
  isStepCompleted: boolean;
  onStepCompletedChange: (checked: boolean) => void;
}

export const StepCompletionSwitch: React.FC<StepCompletionSwitchProps> = ({
  isStepCompleted,
  onStepCompletedChange,
}) => {
  return (
    <div className={styles.switchContainer}>
      <span>A etapa está concluída? </span>
      <Switch
        checked={isStepCompleted}
        onCheckedChange={onStepCompletedChange}
        checkedLabel="Sim"
        uncheckedLabel="Não"
      />
    </div>
  );
};