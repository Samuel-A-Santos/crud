import { DropDown } from "../dropDown";
import { Input } from "../input";
import { Button } from "../button";
import styles from "../../styles/components/addEmployee.module.css";
import type { EPI } from "../../types/types";

interface EPICardProps {
  epi: EPI;
  index: number;
  onUpdateEPI: (index: number, field: keyof EPI, value: string) => void;
  onRemoveEPI: (index: number) => void;
}

export const EPICard: React.FC<EPICardProps> = ({
  epi,
  index,
  onUpdateEPI,
  onRemoveEPI,
}) => {
  return (
    <div className={styles.epiCard}>
      <div className={styles.epiContent}>
        <DropDown
          label="Selecione a atividade:"
          value={epi.activity}
          onChange={(value) => onUpdateEPI(index, "activity", value)}
          options={["Atividade 1", "Atividade 2", "Atividade 3"]}
          renderOption={(option) => option}
        />
        <div className={styles.epiRow}>
          <DropDown
            label="Selecione o EPI:"
            value={epi.type}
            onChange={(value) => onUpdateEPI(index, "type", value)}
            options={["Calçado de segurança", "Capacete", "Luvas"]}
            renderOption={(option) => option}
          />
          <Input
            label="Informe o número do CA:"
            value={epi.caNumber}
            onChange={(value) => onUpdateEPI(index, "caNumber", value)}
          />
        </div>
        <div>
          <Button onClick={() => onRemoveEPI(index)}>
            Remover EPI
          </Button>
        </div>
      </div>
    </div>
  );
};