import type { Employee, EPI } from '../types/types';

export interface ValidationErrors {
  [key: string]: string;
}

export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Nome é obrigatório';
  return null;
};

export const validateGender = (gender: string | null): string | null => {
  if (!gender) return 'Sexo é obrigatório';
  return null;
};

export const validateCPF = (cpf: string): string | null => {
  if (!cpf.trim()) {
    return 'CPF é obrigatório';
  } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
    return 'CPF inválido (formato: 123.456.789-00)';
  } else if (cpf.length < 14) {
    return 'CPF incompleto';
  }
  return null;
};

export const validateBirthDate = (birthDate: string): string | null => {
  if (!birthDate.trim()) return 'Data de nascimento é obrigatória';

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
    return 'Data inválida (formato: DD/MM/AAAA)';
  }

  const [day, month, year] = birthDate.split('/').map(Number);
  const dateObj = new Date(year, month - 1, day);

  if (
    dateObj.getDate() !== day ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getFullYear() !== year ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    return 'Data de nascimento inválida';
  }

  return null;
};

export const validateRG = (rg: string): string | null => {
  if (!rg.trim()) {
    return 'RG é obrigatório';
  } else if (!/^\d{2}\.\d{3}\.\d{3}-[\dXx]$/.test(rg)) {
    return 'RG inválido (formato: 12.345.678-9)';
  } else if (rg.length < 12) {
    return 'RG incompleto';
  }
  return null;
};

export const validateRole = (role: string): string | null => {
  if (!role.trim()) return 'Cargo é obrigatório';
  return null;
};

export const validateEPIs = (
  doesntUseEPI: boolean,
  epis: EPI[]
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!doesntUseEPI && epis.length === 0) {
    errors.epis = 'Adicione pelo menos um EPI';
    return errors;
  }

  if (!doesntUseEPI) {
    epis.forEach((epi, index) => {
      if (!epi.activity) {
        errors[`epi-${index}-activity`] = 'Atividade é obrigatória';
      }
      if (!epi.type) {
        errors[`epi-${index}-type`] = 'EPI é obrigatório';
      }
      if (!epi.caNumber) {
        errors[`epi-${index}-ca`] = 'Número CA é obrigatório';
      }
    });
  }

  return errors;
};

export const validateEmployee = (
  employee: Partial<Employee>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const nameError = validateName(employee.name || '');
  if (nameError) errors.name = nameError;

  const genderError = validateGender(employee.gender || null);
  if (genderError) errors.gender = genderError;

  const cpfError = validateCPF(employee.cpf || '');
  if (cpfError) errors.cpf = cpfError;

  const birthDateError = validateBirthDate(employee.birthDate || '');
  if (birthDateError) errors.birthDate = birthDateError;

  const rgError = validateRG(employee.rg || '');
  if (rgError) errors.rg = rgError;

  const roleError = validateRole(employee.role || '');
  if (roleError) errors.role = roleError;

  const epiErrors = validateEPIs(
    employee.doesntUseEPI || false,
    employee.epis || []
  );
  Object.assign(errors, epiErrors);

  return errors;
};
