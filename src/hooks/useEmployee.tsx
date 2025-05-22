import { useState } from 'react';
import type { Employee } from '../types/employee';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Daniel Alves da Silva',
      registration: '000.000.000-99',
      activeStatus: 'Ativ 00',
      position: 'Cargo 1',
      isActive: true
    },
        {
      id: '3',
      name: 'Daniel Alves da Silva',
      registration: '000.000.000-99',
      activeStatus: 'Ativ 00',
      position: 'Cargo 1',
      isActive: false
    }
  ]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    setEmployees(prev => [...prev, { ...employee, id: String(Date.now()) }]);
  };

  const updateEmployee = (id: string, employee: Partial<Employee>) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === id ? { ...emp, ...employee } : emp)
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};