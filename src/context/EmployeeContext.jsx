import React, { createContext, useContext, useState } from 'react';
import { getEmployeeId } from '../utils/employeeUtils.js';
import { mockEmployees } from '../utils/mockEmployees.js';

// Stores employee list so multiple pages can reuse it
const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  // Preload with mock employees so the UI always
  // has data even if the remote API fails.
  const [employees, setEmployees] = useState(mockEmployees);

  const addEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const updateEmployee = (id, updates) => {
    setEmployees((prev) =>
      prev.map((emp, index) => {
        const currentId = getEmployeeId(emp, index);
        if (currentId !== id) return emp;
        const patch = typeof updates === 'function' ? updates(emp) : updates;
        return { ...emp, ...patch };
      })
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) =>
      prev.filter((emp, index) => getEmployeeId(emp, index) !== id)
    );
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, setEmployees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);

