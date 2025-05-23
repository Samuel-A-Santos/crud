import { useState } from 'react';
import styles from '../styles/components/employeeList.module.css';
import type { Employee } from '../types/employee';

interface PopupMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

interface EmployeeListProps {
  employees: Employee[];
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
}

const PopupMenu = ({ onEdit, onDelete }: PopupMenuProps) => {
  return (
    <div className={styles.popup}>
      <button type="button" onClick={onEdit}>Alterar</button>
      <button type="button" onClick={onDelete}>Excluir</button>
    </div>
  );
};

export const EmployeeList = ({ employees, onEdit, onDelete }: EmployeeListProps) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    }
    setActivePopup(null);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setActivePopup(null);
  };

  return (
    <ul className={styles.list}>
      {employees.map((employee) => (
        <li key={employee.id} className={styles.listItem}>
          <article className={employee.isActive ? styles.card : styles.cardInactive}>
            <div className={styles.content}>
              <header className={styles.header}>
                <h2>{employee.name}</h2>
                <ul className={styles.tags}>
                  <li><span className={styles.tag}>{employee.cpf}</span></li>
                  <li><span className={styles.tag}>{employee.isActive ? 'Ativo' : 'Inativo'}</span></li>
                  <li><span className={styles.tag}>{employee.role}</span></li>
                </ul>
              </header>
            </div>
          </article>
          
          <div className={styles.menuWrapper}>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setActivePopup(activePopup === employee.id ? null : employee.id)}
              aria-label="Open menu"
              aria-expanded={activePopup === employee.id}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="6" cy="12" r="2" fill="#FFFFFF" />
                <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
                <circle cx="18" cy="12" r="2" fill="#FFFFFF" />
              </svg>
            </button>
            
            {activePopup === employee.id && (
              <div className={styles.menuContainer}>
                <PopupMenu
                  onEdit={() => handleEdit(employee.id)}
                  onDelete={() => handleDelete(employee.id)}
                />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};