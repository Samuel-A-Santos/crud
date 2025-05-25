// import { useState } from 'react';
// import type { Employee } from '../types/employee';

// interface UseEmployeesReturn {
//   employees: Employee[];
//   addEmployee: (employee: Employee) => void;
//   updateEmployee: (employee: Employee) => void;
//   deleteEmployee: (id: string) => void;
// }

// export const useEmployees = (): UseEmployeesReturn => {
//   const [employees, setEmployees] = useState<Employee[]>([
//     {
//       id: '1',
//       name: 'Daniel Alves da Silva',
//       registration: '000.000.000-99',
//       activeStatus: 'Ativ 00',
//       position: 'Cargo 1',
//       isActive: true
//     },
//         {
//       id: '3',
//       name: 'Daniel Alves da Silva',
//       registration: '000.000.000-99',
//       activeStatus: 'Ativ 00',
//       position: 'Cargo 1',
//       isActive: false
//     }
//   ]);

//   const addEmployee = (employee: Employee) => {
//     setEmployees(prev => [...prev, employee]);
//   };

//   const updateEmployee = (updatedEmployee: Employee) => {
//     setEmployees(prev => 
//       prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
//     );
//   };

//   const deleteEmployee = (id: string) => {
//     setEmployees(prev => prev.filter(emp => emp.id !== id));
//   };

//   return { employees, addEmployee, updateEmployee, deleteEmployee };
// };