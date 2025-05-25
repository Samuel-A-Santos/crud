export type Gender = "feminino" | "masculino" | null;

export interface EPI {
  activity: string;
  type: string;
  caNumber: string;
}

export interface Employee {
  id: string;
  isActive: boolean;
  name: string;
  gender: Gender;
  cpf: string;
  birthDate: string;
  rg: string;
  role: string;
  doesntUseEPI: boolean;
  epis: EPI[];
}

export interface ValidationErrors {
  name?: string;
  gender?: string;
  cpf?: string;
  birthDate?: string;
  rg?: string;
  role?: string;
  epis?: string;
}

export interface AppState {
  currentStep: number;
  isStepCompleted: boolean;
}