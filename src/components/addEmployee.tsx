import { useState, useEffect } from "react";
import { Input } from "./input";
import { DoubleCheck } from "./doubleCheck";
import { Switch } from "./switch";
import { Checkbox } from "./checkBox";
import { Button } from "./button";
import styles from "../styles/components/addEmployee.module.css";
import { DropDown } from "./dropDown";
import { validateEmployee } from "../ultils/validation";
import type { ValidationErrors } from "../ultils/validation";
import { formatCPF, formatBirthDate, formatRG } from "../ultils/formatters";

type Gender = "feminino" | "masculino" | null;

interface AddEmployeeProps {
  onSave?: (employeeData: Employee) => void;
  onCancel?: () => void;
  employee?: Employee | null;
}

export interface Employee {
  id: string;
  isActive: boolean;
  name: string;
  gender: "feminino" | "masculino" | null;
  cpf: string;
  birthDate: string;
  rg: string;
  role: string;
  doesntUseEPI: boolean;
  epis: EPI[];
}

export interface EPI {
  activity: string;
  type: string;
  caNumber: string;
}

export const AddEmployee: React.FC<AddEmployeeProps> = ({
  onSave,
  onCancel,
  employee,
}) => {
  const [isActive, setIsActive] = useState(employee?.isActive ?? true);
  const [name, setName] = useState(employee?.name ?? "");
  const [gender, setGender] = useState<Gender>(employee?.gender ?? null);
  const [cpf, setCpf] = useState(employee?.cpf ?? "");
  const [birthDate, setBirthDate] = useState(employee?.birthDate ?? "");
  const [rg, setRg] = useState(employee?.rg ?? "");
  const [role, setRole] = useState(employee?.role ?? "");
  const [doesntUseEPI, setDoesntUseEPI] = useState(
    employee?.doesntUseEPI ?? false
  );
  const [epis, setEpis] = useState<EPI[]>(employee?.epis ?? []);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const formData = {
      name,
      gender,
      cpf,
      birthDate,
      rg,
      role,
      doesntUseEPI,
      epis,
    };

    const validationErrors = validateEmployee(formData);
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [name, gender, cpf, birthDate, rg, role, doesntUseEPI, epis]);

  const handleSave = () => {
    const formData = {
      name,
      gender,
      cpf,
      birthDate,
      rg,
      role,
      doesntUseEPI,
      epis,
    };

    const validationErrors = validateEmployee(formData);
    setErrors(validationErrors);

    const employeeData: Employee = {
      id: employee?.id ?? crypto.randomUUID(),
      isActive,
      name,
      gender,
      cpf,
      birthDate,
      rg,
      role,
      doesntUseEPI,
      epis: doesntUseEPI ? [] : epis,
    };

    onSave?.(employeeData);
  };

  const handleAddEPI = () => {
    setEpis([...epis, { activity: "", type: "", caNumber: "" }]);
  };

  const handleUpdateEPI = (index: number, field: keyof EPI, value: string) => {
    const updatedEpis = epis.map((epi, i) => {
      if (i === index) {
        return { ...epi, [field]: value };
      }
      return epi;
    });
    setEpis(updatedEpis);
  };

  const handleRemoveEPI = (index: number) => {
    setEpis(epis.filter((_, i) => i !== index));
  };

  const handleCPFChange = (value: string) => {
    const formattedCPF = formatCPF(value);
    setCpf(formattedCPF);
  };

  const handleBirthDateChange = (value: string) => {
    const formattedDate = formatBirthDate(value);
    setBirthDate(formattedDate);
  };

  const handleRGChange = (value: string) => {
    const formattedRG = formatRG(value);
    setRg(formattedRG);
  };

  return (
    <div className={styles.container}>
      <div className={styles.switchContainer}>
        <span>O trabalhador está ativo ou inativo?</span>
        <Switch
          checked={isActive}
          onCheckedChange={setIsActive}
          checkedLabel="Ativo"
          uncheckedLabel="Inativo"
        />
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formRow}>
          <Input
            label="Nome"
            value={name}
            onChange={setName}
            error={errors.name}
          />
          <div className={styles.genderContainer}>
            <span>Sexo</span>
            <DoubleCheck
              value={gender}
              onChange={setGender}
              error={errors.gender}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <Input
            label="CPF"
            value={cpf}
            onChange={handleCPFChange}
            error={errors.cpf}
          />
          <Input
            label="Data de Nascimento"
            value={birthDate}
            onChange={handleBirthDateChange}
            error={errors.birthDate}
            placeholder="DD/MM/AAAA"
          />
        </div>

        <div className={styles.formRow}>
          <Input
            label="RG"
            value={rg}
            onChange={handleRGChange}
            error={errors.rg}
            placeholder="12.345.678-9"
          />
          <DropDown
            label="Cargo"
            value={role}
            onChange={setRole}
            options={["Cargo 1", "Cargo 2", "Cargo 3"]}
            renderOption={(option) => option}
            // error={errors.role}
          />
        </div>
      </div>

      <div className={styles.epiSection}>
        <h3>Quais EPIs o trabalhador usa na atividade?</h3>
        <Checkbox
          checked={doesntUseEPI}
          onCheckedChange={setDoesntUseEPI}
          label="O trabalhador não usa EPI."
          id="no-epi"
        />

        {!doesntUseEPI && (
          <>
            {epis.map((epi, index) => (
              <div key={index} className={styles.epiCard}>
                <div className={styles.epiContent}>
                  <DropDown
                    label="Selecione a atividade:"
                    value={epi.activity}
                    onChange={(value) =>
                      handleUpdateEPI(index, "activity", value)
                    }
                    options={["Atividade 1", "Atividade 2", "Atividade 3"]}
                    renderOption={(option) => option}
                  />
                  <div className={styles.epiRow}>
                    <DropDown
                      label="Selecione o EPI:"
                      value={epi.type}
                      onChange={(value) =>
                        handleUpdateEPI(index, "type", value)
                      }
                      options={["Calçado de segurança", "Capacete", "Luvas"]}
                      renderOption={(option) => option}
                    />
                    <Input
                      label="Informe o número do CA:"
                      value={epi.caNumber}
                      onChange={(value) =>
                        handleUpdateEPI(index, "caNumber", value)
                      }
                    />
                  </div>
                  <div>
                    <Button onClick={() => handleRemoveEPI(index)}>
                      Remover EPI
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={handleAddEPI} className={styles.addEpiButton}>
              {epis.length > 0
                ? "Adicionar outra atividade"
                : "Adicionar atividade"}
            </Button>
          </>
        )}
      </div>

      {!doesntUseEPI && (
        <div className={styles.fileUpload}>
          <h3>Adicione Atestado de Saúde (opcional):</h3>
          <label htmlFor="file-upload" className={styles.fileUploadLabel}>
            Selecionar arquivo
          </label>
          <input id="file-upload" type="file" />
        </div>
      )}

      <div className={styles.buttons}>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button
          onClick={handleSave}
          disabled={!isFormValid}
          className={!isFormValid ? styles.disabledButton : ""}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
};
