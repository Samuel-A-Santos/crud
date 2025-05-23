// src/store/employeeThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEmployees as fetchEmployeesApi,
  createEmployee as createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from "../services/api";
import {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setLoading,
  setError,
} from "./employeesSlice";
import type { Employee } from "../types/employee";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading("pending"));
      const employees = await fetchEmployeesApi();
      dispatch(setEmployees(employees));
      dispatch(setLoading("succeeded"));
      return employees;
    } catch (error) {
      dispatch(setLoading("failed"));
      dispatch(setError((error as Error).message));
      throw error;
    }
  }
);

export const createEmployeeThunk = createAsyncThunk(
  "employees/createEmployee",
  async (employee: Employee, { dispatch }) => {
    try {
      dispatch(setLoading("pending"));

      // Ensure health certificate is null
      const employeeToSave = {
        ...employee,
        healthCertificate: null,
      };

      const newEmployee = await createEmployeeApi(employeeToSave);
      dispatch(addEmployee(newEmployee));
      dispatch(setLoading("succeeded"));
      return newEmployee;
    } catch (error) {
      dispatch(setLoading("failed"));
      dispatch(setError((error as Error).message));
      throw error;
    }
  }
);

export const updateEmployeeThunk = createAsyncThunk(
  "employees/updateEmployee",
  async (employee: Employee, { dispatch }) => {
    try {
      dispatch(setLoading("pending"));
      const updatedEmployee = await updateEmployeeApi(employee);
      dispatch(updateEmployee(updatedEmployee));
      dispatch(setLoading("succeeded"));
      return updatedEmployee;
    } catch (error) {
      dispatch(setLoading("failed"));
      dispatch(setError((error as Error).message));
      throw error;
    }
  }
);

export const deleteEmployeeThunk = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoading("pending"));
      await deleteEmployeeApi(id);
      dispatch(deleteEmployee(id));
      dispatch(setLoading("succeeded"));
      return id;
    } catch (error) {
      dispatch(setLoading("failed"));
      dispatch(setError((error as Error).message));
      throw error;
    }
  }
);
