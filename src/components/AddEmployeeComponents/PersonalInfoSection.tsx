import { Input } from '../input';
import { DoubleCheck } from '../doubleCheck';
import { DropDown } from '../dropDown';
import styles from '../../styles/components/addEmployee.module.css';
import type { Gender, ValidationErrors } from '../../types/types';

interface PersonalInfoSectionProps {
  name: string;
  onNameChange: (value: string) => void;
  gender: Gender;
  onGenderChange: (value: Gender) => void;
  cpf: string;
  onCpfChange: (value: string) => void;
  birthDate: string;
  onBirthDateChange: (value: string) => void;
  rg: string;
  onRgChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  errors: ValidationErrors;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  name,
  onNameChange,
  gender,
  onGenderChange,
  cpf,
  onCpfChange,
  birthDate,
  onBirthDateChange,
  rg,
  onRgChange,
  role,
  onRoleChange,
  errors,
}) => {
  return (
    <div className={styles.formGrid}>
      <div className={styles.formRow}>
        <Input
          label="Nome"
          value={name}
          onChange={onNameChange}
          error={errors.name}
        />
        <div className={styles.genderContainer}>
          <span>Sexo</span>
          <DoubleCheck
            value={gender}
            onChange={onGenderChange}
            error={errors.gender}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <Input
          label="CPF"
          value={cpf}
          onChange={onCpfChange}
          error={errors.cpf}
          placeholder="000.000.000-00"
        />
        <Input
          label="Data de Nascimento"
          value={birthDate}
          onChange={onBirthDateChange}
          error={errors.birthDate}
          placeholder="DD/MM/AAAA"
        />
      </div>

      <div className={styles.formRow}>
        <Input
          label="RG"
          value={rg}
          onChange={onRgChange}
          error={errors.rg}
          placeholder="00.000.000-0"
        />
        <DropDown
          label="Cargo"
          value={role}
          onChange={onRoleChange}
          options={['Cargo 1', 'Cargo 2', 'Cargo 3']}
          renderOption={option => option}
          //   error={errors.role}
        />
      </div>
    </div>
  );
};
