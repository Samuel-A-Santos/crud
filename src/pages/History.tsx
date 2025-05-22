import { useState } from 'react';
import { Header } from '../components/header';
import styles from '../styles/pages/history.module.css';

export const History = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepCompleted, setIsStepCompleted] = useState(false);

  const handleCompleteStep = () => {
    setIsStepCompleted(true);
  };

  const handleNextStep = () => {
    if (isStepCompleted && currentStep < 9) {
      setCurrentStep(prev => prev + 1);
      setIsStepCompleted(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <Header
        currentStep={currentStep}
        isStepCompleted={isStepCompleted}
      />
      <main className={styles.content}>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${currentStep === 1 ? styles.buttonDisabled : ""}`}
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
          >
            Passo anterior
          </button>
          <button 
            className={styles.button}
            onClick={handleCompleteStep}
          >
            Etapa concluída
          </button>
          <button
            className={`${styles.button} ${!isStepCompleted ? styles.buttonDisabled : ""}`}
            onClick={handleNextStep}
            disabled={!isStepCompleted}
          >
            Próximo passo
          </button>
        </div>
      </main>
    </div>
  );
};