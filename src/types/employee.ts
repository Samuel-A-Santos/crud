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