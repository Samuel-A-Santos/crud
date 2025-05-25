import { useEffect, useState } from "react";
import foto from "../assets/Foto.svg";
import { Header } from "../components/header";
import { Button } from "../components/button";
import { EmployeeList } from "../components/employeeList";
import { Toast } from "../components/toast";
import { Switch } from "../components/switch";
import { AddEmployee } from "../components/addEmployee";
import { EmptyPage } from "../components/emptyPage";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setStepCompleted, nextStep, previousStep } from "../store/appSlice";
import {
  fetchEmployees,
  createEmployeeThunk,
  updateEmployeeThunk,
  deleteEmployeeThunk,
} from "../store/employeeThunks";
import type { Employee } from "../types/employee";
import styles from "../styles/pages/edit.module.css";

export const Edit = () => {
  const dispatch = useAppDispatch();

  const { currentStep, isStepCompleted } = useAppSelector((state) => state.app);
  const { employees, loading } = useAppSelector((state) => state.employees);

  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "Usuário excluído com sucesso!"
  );
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handlePreviousStep = () => {
    dispatch(previousStep());
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEmployeeThunk(id))
      .then(() => {
        setToastMessage("Usuário excluído com sucesso!");
        setShowToast(true);
      })
      .catch(() => {
        setToastMessage("Erro ao excluir usuário!");
        setShowToast(true);
      });
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsAddingEmployee(true);
  };

  const handleEditEmployee = (id: string) => {
    const employee = employees.find((e) => e.id === id) || null;

    setEditingEmployee(employee);
    setIsAddingEmployee(true);
  };

  const handleBackToList = () => {
    setIsAddingEmployee(false);
    setEditingEmployee(null);
  };

  const handleSaveEmployee = (employeeData: Employee) => {
    const employeeToSave = {
      ...employeeData,
      healthCertificate: null,
    };

    if (editingEmployee) {
      dispatch(updateEmployeeThunk(employeeToSave))
        .then(() => {
          setToastMessage("Usuário atualizado com sucesso!");
          setShowToast(true);
        })
        .catch(() => {
          setToastMessage("Erro ao atualizar usuário!");
          setShowToast(true);
        });
    } else {
      dispatch(createEmployeeThunk(employeeToSave))
        .then(() => {
          setToastMessage("Usuário adicionado com sucesso!");
          setShowToast(true);
        })
        .catch(() => {
          setToastMessage("Erro ao adicionar usuário!");
          setShowToast(true);
        });
    }

    setIsAddingEmployee(false);
  };

  const filteredEmployees = showOnlyActive
    ? employees.filter((emp) => emp.isActive)
    : employees;

  const activeEmployees = employees.filter((emp) => emp.isActive);

  const renderContent = () => {
    if (currentStep > 1) {
      return <EmptyPage />;
    }

    return (
      <>
        <div className={styles.description}>
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            repellendus velit soluta magnam optio in quos sed, beatae
            exercitationem sequi facilis ducimus quas omnis dolorem, voluptas
            nulla est molestiae enim. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Veritatis quasi distinctio tempore, quos ullam at
            nemo, assumenda illo iure odit cumque laboriosam error et optio
            ducimus. Nemo esse aut minima!
          </span>
          <img src={foto} alt="" />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formHeaderBackground}>
            <div className={styles.formHeaderContent}>
              {isAddingEmployee ? (
                <>
                  <button
                    onClick={handleBackToList}
                    className={styles.backButton}
                  >
                    ←
                  </button>
                  <h1 className={styles.title}>
                    {editingEmployee
                      ? "Editar Funcionário"
                      : "Adicionar Funcionário"}
                  </h1>
                </>
              ) : (
                <>
                  <h1 className={styles.title}>Funcionário(s)</h1>
                </>
              )}
            </div>
          </div>

          {!isAddingEmployee ? (
            <>
              <button
                className={styles.customButton}
                onClick={handleAddEmployee}
              >
                + Adicionar Funcionário
              </button>
              <div className={styles.buttonsContainer}>
                <div className={styles.buttonGroup}>
                  <Button
                    onClick={() => setShowOnlyActive(true)}
                    disabled={showOnlyActive}
                  >
                    Ver apenas ativos
                  </Button>
                  <Button
                    onClick={() => setShowOnlyActive(false)}
                    disabled={!showOnlyActive}
                  >
                    Limpar filtros
                  </Button>
                </div>
                <p>
                  Ativos {activeEmployees.length}/{employees.length}
                </p>
              </div>

              <Toast
                message={toastMessage}
                isOpen={showToast}
                onClose={() => setShowToast(false)}
              />

              {loading === "pending" ? (
                <div className={styles.loadingContainer}>Carregando...</div>
              ) : (
                <div className={styles.employeeListContainer}>
                  <EmployeeList
                    employees={filteredEmployees}
                    onEdit={handleEditEmployee}
                    onDelete={handleDelete}
                  />
                </div>
              )}

              <div className={styles.switchContainer}>
                <span>A etapa está concluída? </span>
                <Switch
                  checked={isStepCompleted}
                  onCheckedChange={(checked) =>
                    dispatch(setStepCompleted(checked))
                  }
                  checkedLabel="Sim"
                  uncheckedLabel="Não"
                />
              </div>
            </>
          ) : (
            <div className={styles.addEmployeeForm}>
              <AddEmployee
                onSave={handleSaveEmployee}
                onCancel={handleBackToList}
                employee={editingEmployee}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <Header currentStep={currentStep} isStepCompleted={isStepCompleted} />
      <main className={styles.content}>{renderContent()}</main>
      {(!isAddingEmployee || currentStep > 1) && (
        <div className={styles.footerContainer}>
          <div className={styles.stepsButtonsContainer}>
            <div>
              {currentStep > 1 && (
                <button
                  className={styles.buttonPrevious}
                  onClick={handlePreviousStep}
                >
                  Passo anterior
                </button>
              )}
              </div>
              <div>
              <button
                className={`${styles.buttonNext} ${
                  !isStepCompleted ? styles.buttonDisabled : ""
                }`}
                onClick={handleNextStep}
                disabled={!isStepCompleted || currentStep === 9}
              >
                Próximo passo
              </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};
