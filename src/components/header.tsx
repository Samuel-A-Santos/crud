import styles from '../styles/components/header.module.css';
import ItemDesabled from '../assets/Item desbled.svg';
import ItemActive from '../assets/Item active.svg';
import ItemHover from '../assets/Item hover.svg';

interface HeaderProps {
  currentStep: number;
  isStepCompleted: boolean;
}

export const Header = ({ currentStep, isStepCompleted }: HeaderProps) => {
  const totalSteps = 9;

  const renderStepIndicator = (step: number) => {
    const isActive = step === currentStep;
    const isPastStep = step < currentStep;

    let iconSrc;
    if (isActive) {
      iconSrc = ItemHover;
    } else if (isPastStep) {
      iconSrc = ItemActive;
    } else {
      if (isStepCompleted) {
        iconSrc = ItemActive;
      } else {
        if (currentStep === 8 && step === 9) {
          iconSrc = ItemActive;
        } else {
          iconSrc = ItemDesabled;
        }
      }
    }

    const shouldShowCompleted = isPastStep || (isActive && isStepCompleted);

    return (
      <div key={step} className={styles.stepContainer}>
        <div className={styles.stepIndicator}>
          <div className={styles.stepWrapper}>
            <img
              src={iconSrc}
              alt={`Step ${step}`}
              className={styles.stepIcon}
            />
            <span className={styles.stepText}>Item {step}</span>
          </div>
        </div>
        <span
          className={`${styles.completedText} ${
            shouldShowCompleted ? styles.visible : ''
          }`}
        >
          Concluído
        </span>
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <div
        className={`${styles.stepsContainer} ${
          currentStep > 1 || isStepCompleted ? styles.hasCompleted : ''
        }`}
        style={
          {
            '--completed-steps': isStepCompleted ? totalSteps : currentStep - 1,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: totalSteps }, (_, i) =>
          renderStepIndicator(i + 1)
        )}
      </div>
    </header>
  );
};
