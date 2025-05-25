import { Toast } from '../../components/toast';
import { EmployeeList } from '../../components/employeeList';
import type { Employee } from '../../types/types';
import styles from '../../styles/pages/edit.module.css';

interface EmployeeListSectionProps {
  toastMessage: string;
  showToast: boolean;
  onCloseToast: () => void;
  loadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  employees: Employee[];
  onEditEmployee: (id: string) => void;
  onDeleteEmployee: (id: string) => void;
}

export const EmployeeListSection: React.FC<EmployeeListSectionProps> = ({
  toastMessage,
  showToast,
  onCloseToast,
  loadingStatus,
  employees,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  return (
    <>
      <Toast message={toastMessage} isOpen={showToast} onClose={onCloseToast} />
      {loadingStatus === 'pending' ? (
        <div className={styles.loadingContainer}>Carregando...</div>
      ) : (
        <div className={styles.employeeListContainer}>
          <EmployeeList
            employees={employees}
            onEdit={onEditEmployee}
            onDelete={onDeleteEmployee}
          />
        </div>
      )}
    </>
  );
};
