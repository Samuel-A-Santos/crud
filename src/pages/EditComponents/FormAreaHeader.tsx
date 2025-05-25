import styles from '../../styles/pages/edit.module.css';

interface FormAreaHeaderProps {
  isAddingEmployee: boolean;
  editingEmployee: boolean;
  onBackToList: () => void;
}

export const FormAreaHeader: React.FC<FormAreaHeaderProps> = ({
  isAddingEmployee,
  editingEmployee,
  onBackToList,
}) => {
  return (
    <div className={styles.formHeaderBackground}>
      <div className={styles.formHeaderContent}>
        {isAddingEmployee ? (
          <>
            <button onClick={onBackToList} className={styles.backButton}>
              ←
            </button>
            <h1 className={styles.title}>
              {editingEmployee ? 'Editar Funcionário' : 'Adicionar Funcionário'}
            </h1>
          </>
        ) : (
          <h1 className={styles.title}>Funcionário(s)</h1>
        )}
      </div>
    </div>
  );
};
