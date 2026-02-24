import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi.js';
import { useEmployeeContext } from '../context/EmployeeContext.jsx';
import { useToastContext } from '../context/ToastContext.jsx';
import Button from '../components/common/Button.jsx';
import EmployeeCard from '../components/list/EmployeeCard.jsx';
import SearchAndSortBar from '../components/list/SearchAndSortBar.jsx';
import SkeletonCard from '../components/common/SkeletonCard.jsx';
import { getEmployeeId, getEmployeeName, getEmployeeCity, getEmployeeSalary } from '../utils/employeeUtils.js';
import { mockEmployees } from '../utils/mockEmployees.js';

// Employee list page with search, sort, and optional pagination
const ListPage = () => {
  const navigate = useNavigate();
  const { employees, setEmployees, addEmployee } = useEmployeeContext();
  const { showToast } = useToastContext();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    emp_name: '',
    city: '',
    salary: '',
    department: '',
    role: ''
  });

  const apiConfig = useMemo(
    () => ({
      url: '/gettabledata.php',
      method: 'POST',
      data: {
        username: 'test',
        password: '123456'
      }
    }),
    []
  );

  const { data, loading, error } = useApi(apiConfig);

  // When API returns data, normalize into employees state
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setEmployees(data);
    } else if (data && Array.isArray(data?.data)) {
      // Some APIs wrap in {data:[]}
      setEmployees(data.data);
    }
  }, [data, setEmployees]);

  useEffect(() => {
    if (error) {
      showToast('API failed, showing demo employee data instead.', 'error');
      if (!employees || employees.length === 0) {
        setEmployees(mockEmployees);
      }
    }
  }, [error, employees, setEmployees, showToast]);

  const filtered = useMemo(() => {
    let list = employees || [];
    if (search) {
      const query = search.toLowerCase();
      list = list.filter((e, index) => {
        const name = getEmployeeName(e, index).toLowerCase();
        const city = getEmployeeCity(e).toLowerCase();
        return name.includes(query) || city.includes(query);
      });
    }

    list = [...list].sort((a, b) => {
      if (sortBy === 'name') {
        return getEmployeeName(a).localeCompare(getEmployeeName(b));
      }
      if (sortBy === 'city') {
        return getEmployeeCity(a).localeCompare(getEmployeeCity(b));
      }
      if (sortBy === 'salary') {
        const sa = getEmployeeSalary(a) ?? 0;
        const sb = getEmployeeSalary(b) ?? 0;
        return sb - sa; // high → low
      }
      return 0;
    });

    return list;
  }, [employees, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

  const handleRowClick = (employee, index) => {
    const id = getEmployeeId(employee, index);
    navigate(`/details/${encodeURIComponent(id)}`);
  };

  const goChart = () => navigate('/chart');
  const goMap = () => navigate('/map');

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.emp_name || !newEmployee.city) {
      showToast('Please fill name and city for the new employee.', 'error');
      return;
    }
    const numericSalary = newEmployee.salary
      ? Number(newEmployee.salary)
      : undefined;
    const idNumber = (employees?.length || 0) + 1;
    const empToAdd = {
      emp_id: `E${String(idNumber).padStart(3, '0')}`,
      ...newEmployee,
      salary: numericSalary
    };
    addEmployee(empToAdd);
    showToast('Employee added locally (in-memory only).', 'success');
    setShowAddModal(false);
    setNewEmployee({
      emp_name: '',
      city: '',
      salary: '',
      department: '',
      role: ''
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Employee Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Search, sort, and explore your team. Click an employee to view full details.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            Add Employee
          </Button>
          <Button variant="outline" size="sm" onClick={goMap}>
            View Map
          </Button>
          <Button size="sm" onClick={goChart}>
            View Salary Chart
          </Button>
        </div>
      </div>

      <SearchAndSortBar
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-700 px-4 py-3 text-sm text-red-700 dark:text-red-200">
          Unable to load employee data. Please check your network connection and
          refresh the page.
        </div>
      )}

      {!loading && !error && paged.length === 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-6 text-center text-sm text-slate-500">
          No employees found. Try clearing the search or adjusting filters.
        </div>
      )}

      {!loading && !error && paged.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {paged.map((employee, idx) => (
              <EmployeeCard
                key={getEmployeeId(employee, idx)}
                employee={employee}
                index={(currentPage - 1) * pageSize + idx}
                onClick={() =>
                  handleRowClick(employee, (currentPage - 1) * pageSize + idx)
                }
              />
            ))}
          </div>

          {/* Simple pagination (bonus) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Add Employee (local demo)
            </h2>
            <form onSubmit={handleAddEmployee} className="space-y-3 text-sm">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-slate-200">
                  Name
                </label>
                <input
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-3 py-2 outline-none text-sm"
                  value={newEmployee.emp_name}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      emp_name: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-slate-200">
                  City
                </label>
                <input
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-3 py-2 outline-none text-sm"
                  value={newEmployee.city}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      city: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-slate-200">
                  Salary (INR)
                </label>
                <input
                  type="number"
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-3 py-2 outline-none text-sm"
                  value={newEmployee.salary}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      salary: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-slate-200">
                  Department
                </label>
                <input
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-3 py-2 outline-none text-sm"
                  value={newEmployee.department}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      department: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700 dark:text-slate-200">
                  Role
                </label>
                <input
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-3 py-2 outline-none text-sm"
                  value={newEmployee.role}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      role: e.target.value
                    }))
                  }
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Note: This insert is in-memory only for demo purposes and is
                not persisted to the backend API.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPage;

