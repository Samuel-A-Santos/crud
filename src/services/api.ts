import type { Employee } from '../types/types';

const API_URL = 'http://localhost:3001';

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const getAuthHeaders = (): Record<string, string> => {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_URL}/employees`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }
};
