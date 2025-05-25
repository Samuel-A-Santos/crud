import { Button } from "../../components/button";
import styles from "../../styles/pages/edit.module.css";

interface EmployeeListActionsProps {
  onAddEmployee: () => void;
  onShowOnlyActive: (show: boolean) => void;
  showOnlyActive: boolean;
  activeEmployeesCount: number;
  totalEmployeesCount: number;
}

export const EmployeeListActions: React.FC<EmployeeListActionsProps> = ({
  onAddEmployee,
  onShowOnlyActive,
  showOnlyActive,
  activeEmployeesCount,
  totalEmployeesCount,
}) => {
  return (
    <>
      <button className={styles.customButton} onClick={onAddEmployee}>
        + Adicionar Funcionário
      </button>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonGroup}>
          <Button
            onClick={() => onShowOnlyActive(true)}
            disabled={showOnlyActive}
          >
            Ver apenas ativos
          </Button>
          <Button
            onClick={() => onShowOnlyActive(false)}
            disabled={!showOnlyActive}
          >
            Limpar filtros
          </Button>
        </div>
        <p>
          Ativos {activeEmployeesCount}/{totalEmployeesCount}
        </p>
      </div>
    </>
  );
};