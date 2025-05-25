import type { Employee } from '../types/types';

const API_URL = 'http://localhost:3001';

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Failed to create employee');
  }
  return response.json();
};

export const updateEmployeeApi = async (
  employee: Employee
): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Failed to update employee');
  }
  return response.json();
};

export const deleteEmployeeApi = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }
};
