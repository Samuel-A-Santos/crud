import { useState, useEffect } from 'react';
import styles from '..//styles/components/addEmployee.module.css';
import { validateEmployee } from '../ultils/validation';
import { formatCPF, formatBirthDate, formatRG } from '../ultils/formatters';
import type { Employee, EPI, Gender, ValidationErrors } from '../types/types';
import { EmployeeStatusSwitch } from './AddEmployeeComponents/EmployeeStatusSwitch';
import { PersonalInfoSection } from './AddEmployeeComponents/PersonalInfoSection';
import { EPIListSection } from './AddEmployeeComponents/EPIListSection';
import { HealthCertificateUpload } from './AddEmployeeComponents/HealthCertificateUpload';
import { SaveFormButton } from './AddEmployeeComponents/SaveFormButton';

interface AddEmployeeProps {
  onSave?: (employeeData: Employee) => void;
  onCancel?: () => void;
  employee?: Employee | null;
}

export const AddEmployee: React.FC<AddEmployeeProps> = ({
  onSave,
  employee,
}) => {
  const [isActive, setIsActive] = useState(employee?.isActive ?? true);
  const [name, setName] = useState(employee?.name ?? '');
  const [gender, setGender] = useState<Gender>(employee?.gender ?? null);
  const [cpf, setCpf] = useState(employee?.cpf ?? '');
  const [birthDate, setBirthDate] = useState(employee?.birthDate ?? '');
  const [rg, setRg] = useState(employee?.rg ?? '');
  const [role, setRole] = useState(employee?.role ?? '');
  const [doesntUseEPI, setDoesntUseEPI] = useState(
    employee?.doesntUseEPI ?? false
  );
  const [epis, setEpis] = useState<EPI[]>(employee?.epis ?? []);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const formDataToValidate = {
      name,
      gender,
      cpf,
      birthDate,
      rg,
      role,
      doesntUseEPI,
      epis,
    };
    const validationErrors = validateEmployee(formDataToValidate);
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [name, gender, cpf, birthDate, rg, role, doesntUseEPI, epis]);

  const handleSave = () => {
    const formDataToValidate = {
      name,
      gender,
      cpf,
      birthDate,
      rg,
      role,
      doesntUseEPI,
      epis,
    };
    const validationErrors = validateEmployee(formDataToValidate);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsFormValid(false);
      return;
    }

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
    setEpis([...epis, { activity: '', type: '', caNumber: '' }]);
  };

  const handleUpdateEPI = (index: number, field: keyof EPI, value: string) => {
    const updatedEpis = epis.map((epiItem, i) =>
      i === index ? { ...epiItem, [field]: value } : epiItem
    );
    setEpis(updatedEpis);
  };

  const handleRemoveEPI = (index: number) => {
    setEpis(epis.filter((_, i) => i !== index));
  };

  const handleCPFChange = (value: string) => setCpf(formatCPF(value));
  const handleBirthDateChange = (value: string) =>
    setBirthDate(formatBirthDate(value));
  const handleRGChange = (value: string) => setRg(formatRG(value));

  return (
    <div className={styles.container}>
      <EmployeeStatusSwitch isActive={isActive} onCheckedChange={setIsActive} />
      <PersonalInfoSection
        name={name}
        onNameChange={setName}
        gender={gender}
        onGenderChange={setGender}
        cpf={cpf}
        onCpfChange={handleCPFChange}
        birthDate={birthDate}
        onBirthDateChange={handleBirthDateChange}
        rg={rg}
        onRgChange={handleRGChange}
        role={role}
        onRoleChange={setRole}
        errors={errors}
      />
      <EPIListSection
        epis={epis}
        doesntUseEPI={doesntUseEPI}
        onDoesntUseEPIChange={setDoesntUseEPI}
        onAddEPI={handleAddEPI}
        onUpdateEPI={handleUpdateEPI}
        onRemoveEPI={handleRemoveEPI}
      />
      {!doesntUseEPI && <HealthCertificateUpload />}
      <SaveFormButton onSave={handleSave} disabled={!isFormValid} />
    </div>
  );
};
