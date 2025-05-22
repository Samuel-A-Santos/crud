import { useState } from "react";
import { Header } from "../components/header";
import styles from "../styles/pages/edit.module.css";
import foto from "../assets/Foto.svg";
import { Button } from "../components/button";
import { EmployeeList } from "../components/employeeList";
import { useEmployees } from "../hooks/useEmployee";
import { Toast } from "../components/toast";
import { Switch } from "../components/switch";

export const Edit = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepCompleted, setIsStepCompleted] = useState(false);

  const { employees, deleteEmployee } = useEmployees();
  const [showToast, setShowToast] = useState(false);

  const handleNextStep = () => {
    if (isStepCompleted && currentStep < 9) {
      setCurrentStep((prev) => prev + 1);
      setIsStepCompleted(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDelete = (id: string) => {
    deleteEmployee(id);
    setShowToast(true);
  };

  return (
    <div className={styles.container}>
      <Header currentStep={currentStep} isStepCompleted={isStepCompleted} />
      <main className={styles.content}>
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
              <h1 className={styles.title}>Funcionário(s)</h1>
            </div>
          </div>
          <button className={styles.customButton}>
            + Adicionar Funcionário
          </button>
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonGroup}>
              <Button>Ver apenas ativos</Button>
              <Button>Ver apenas ativos</Button>
            </div>
            <p>Ativos 4/5</p>
          </div>

          <Toast
            message="Usuário excluído com sucesso!"
            isOpen={showToast}
            onClose={() => setShowToast(false)}
          />
          <div className={styles.employeeListContainer}>
            <EmployeeList employees={employees} onDelete={handleDelete} />
          </div>
          <div className={styles.switchContainer}>
            <span>A etapa está concluída? </span>
            <Switch
              checked={isStepCompleted}
              onCheckedChange={setIsStepCompleted}
              checkedLabel="Sim"
              uncheckedLabel="Não"
            />
          </div>
        </div>
      </main>
      <div className={styles.stepsButtonsContainer}>
        <button
          className={`${styles.button} ${
            currentStep === 1 ? styles.buttonDisabled : ""
          }`}
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
        >
          Passo anterior
        </button>
        <button
          className={`${styles.button} ${
            !isStepCompleted ? styles.buttonDisabled : ""
          }`}
          onClick={handleNextStep}
          disabled={!isStepCompleted}
        >
          Próximo passo
        </button>
      </div>
    </div>
  );
};
