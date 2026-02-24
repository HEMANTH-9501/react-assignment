// These helpers safely extract common fields even if API keys differ.

/**
 * Derive a stable employee id from various possible fields.
 */
export const getEmployeeId = (employee, index = 0) =>
  employee.emp_id ||
  employee.employee_id ||
  employee.id ||
  employee.ID ||
  String(index);

/**
 * Derive display name from typical API fields.
 */
export const getEmployeeName = (employee) =>
  employee.emp_name ||
  employee.employee_name ||
  employee.name ||
  `${employee.first_name || ''} ${employee.last_name || ''}`.trim() ||
  'Unknown';

/**
 * Derive city/location string.
 */
export const getEmployeeCity = (employee) =>
  employee.city || employee.location || employee.emp_city || employee.address_city || 'Unknown';

/**
 * Try to read numeric salary from multiple keys.
 */
export const getEmployeeSalary = (employee) => {
  const possible =
    employee.salary ||
    employee.basic_salary ||
    employee.ctc ||
    employee.annual_salary ||
    employee.monthly_salary;

  const salaryNumber = Number(possible);
  return Number.isFinite(salaryNumber) ? salaryNumber : null;
};

