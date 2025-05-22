import styles from "../styles/components/header.module.css";
import ItemDesabled from "../assets/Item desbled.svg";
import ItemActive from "../assets/Item active.svg";
import ItemHover from "../assets/Item hover.svg";

interface HeaderProps {
  currentStep: number;
  isStepCompleted: boolean;
}

export const Header = ({
  currentStep,
  isStepCompleted,
}: HeaderProps) => {
  const totalSteps = 9;

  const renderStepIndicator = (step: number) => {
    const isActive = step === currentStep;
    const isCompleted = step < currentStep;

    return (
      <div key={step} className={styles.stepContainer}>
        <div className={styles.stepIndicator}>
          <div className={styles.stepWrapper}>
            <img
              src={isActive ? ItemHover : isCompleted ? ItemActive : ItemDesabled}
              alt={`Step ${step}`}
              className={styles.stepIcon}
            />
            <span className={styles.stepText}>Item {step}</span>
          </div>
        </div>
        {(isCompleted || (isActive && isStepCompleted)) && (
          <span className={styles.completedText}>Concluído</span>
        )}
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <div 
        className={`${styles.stepsContainer} ${currentStep > 1 ? styles.hasCompleted : ''}`}
        style={{"--completed-steps": currentStep - 1} as React.CSSProperties}
      >
        {Array.from({ length: totalSteps }, (_, i) => renderStepIndicator(i + 1))}
      </div>
    </header>
  );
};
