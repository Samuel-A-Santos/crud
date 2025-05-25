import { Checkbox } from "../checkBox";
import { Button } from "../button";
import { EPICard } from "./EPICard";
import styles from "../../styles/components/addEmployee.module.css";
import type { EPI } from "../../types/types";

interface EPIListSectionProps {
  epis: EPI[];
  doesntUseEPI: boolean;
  onDoesntUseEPIChange: (checked: boolean) => void;
  onAddEPI: () => void;
  onUpdateEPI: (index: number, field: keyof EPI, value: string) => void;
  onRemoveEPI: (index: number) => void;
}

export const EPIListSection: React.FC<EPIListSectionProps> = ({
  epis,
  doesntUseEPI,
  onDoesntUseEPIChange,
  onAddEPI,
  onUpdateEPI,
  onRemoveEPI,
}) => {
  return (
    <div className={styles.epiSection}>
      <h3>Quais EPIs o trabalhador usa na atividade?</h3>
      <Checkbox
        checked={doesntUseEPI}
        onCheckedChange={onDoesntUseEPIChange}
        label="O trabalhador não usa EPI."
        id="no-epi-checkbox"
      />

      {!doesntUseEPI && (
        <>
          {epis.map((epi, index) => (
            <EPICard
              key={index}
              epi={epi}
              index={index}
              onUpdateEPI={onUpdateEPI}
              onRemoveEPI={onRemoveEPI}
            />
          ))}
          <Button onClick={onAddEPI} className={styles.addEpiButton}>
            {epis.length > 0
              ? "Adicionar outra atividade"
              : "Adicionar atividade"}
          </Button>
        </>
      )}
    </div>
  );
};