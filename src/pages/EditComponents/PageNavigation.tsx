import styles from "../../styles/pages/edit.module.css";

interface PageNavigationProps {
  currentStep: number;
  isStepCompleted: boolean;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  currentStep,
  isStepCompleted,
  onPreviousStep,
  onNextStep,
}) => {
  const isNextButtonDisabled =
    currentStep === 9 || 
    (currentStep < 8 && !isStepCompleted);

  return (
    <div className={styles.stepsButtonsContainer}>
      <div>
        {currentStep > 1 && (
          <button className={styles.buttonPrevious} onClick={onPreviousStep}>
            Passo anterior
          </button>
        )}
      </div>
      <div>
        <button
          className={`${styles.buttonNext} ${
            currentStep === 9 ? styles.buttonDisabled : ""
          }`}
          onClick={onNextStep}
          disabled={isNextButtonDisabled}
        >
          Próximo passo
        </button>
      </div>
    </div>
  );
};
