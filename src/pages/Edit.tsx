import { useEffect, useState } from "react";
import { Header } from "../components/header";
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
import type { Employee } from "../types/types";
import styles from "../styles/pages/edit.module.css";
import { PageDescription } from "./EditComponents/PageDescription";
import { FormAreaHeader } from "./EditComponents/FormAreaHeader";
import { EmployeeListActions } from "./EditComponents/EmployeeListActions";
import { EmployeeListSection } from "./EditComponents/EmployeeListSection";
import { StepCompletionSwitch } from "./EditComponents/StepCompletionSwitch";
import { PageNavigation } from "./EditComponents/PageNavigation";

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
      .unwrap()
      .then(() => {
        setToastMessage("Usuário excluído com sucesso!");
        setShowToast(true);
      })
      .catch(() => {
        setToastMessage("Erro ao excluir usuário!");
        setShowToast(true);
      });
  };

  const handleAddEmployeeClick = () => {
    setEditingEmployee(null);
    setIsAddingEmployee(true);
  };

  const handleEditEmployeeClick = (id: string) => {
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
    };

    const thunkAction = editingEmployee
      ? updateEmployeeThunk(employeeToSave)
      : createEmployeeThunk(employeeToSave);

    const successMessage = editingEmployee
      ? "Usuário atualizado com sucesso!"
      : "Usuário adicionado com sucesso!";
    const errorMessage = editingEmployee
      ? "Erro ao atualizar usuário!"
      : "Erro ao adicionar usuário!";

    dispatch(thunkAction)
      .unwrap()
      .then(() => {
        setToastMessage(successMessage);
        setShowToast(true);
        setIsAddingEmployee(false);
        setEditingEmployee(null);
      })
      .catch(() => {
        setToastMessage(errorMessage);
        setShowToast(true);
      });
  };

  const filteredEmployees = showOnlyActive
    ? employees.filter((emp) => emp.isActive)
    : employees;

  const activeEmployeesCount = employees.filter((emp) => emp.isActive).length;

  const renderMainContent = () => {
    if (currentStep > 1) {
      return <EmptyPage />;
    }

    return (
      <>
        <PageDescription />
        <div className={styles.formContainer}>
          <FormAreaHeader
            isAddingEmployee={isAddingEmployee}
            editingEmployee={!!editingEmployee}
            onBackToList={handleBackToList}
          />

          {!isAddingEmployee ? (
            <>
              <EmployeeListActions
                onAddEmployee={handleAddEmployeeClick}
                onShowOnlyActive={setShowOnlyActive}
                showOnlyActive={showOnlyActive}
                activeEmployeesCount={activeEmployeesCount}
                totalEmployeesCount={employees.length}
              />
              <EmployeeListSection
                toastMessage={toastMessage}
                showToast={showToast}
                onCloseToast={() => setShowToast(false)}
                loadingStatus={loading}
                employees={filteredEmployees}
                onEditEmployee={handleEditEmployeeClick}
                onDeleteEmployee={handleDelete}
              />
              <StepCompletionSwitch
                isStepCompleted={isStepCompleted}
                onStepCompletedChange={(checked) =>
                  dispatch(setStepCompleted(checked))
                }
              />
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
      <main className={styles.content}>{renderMainContent()}</main>
      {(!isAddingEmployee || currentStep > 1) && ( 
        <div className={styles.footerContainer}>
          <PageNavigation
            currentStep={currentStep}
            isStepCompleted={isStepCompleted}
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
          />
        </div>
      )}
    </div>
  );
};