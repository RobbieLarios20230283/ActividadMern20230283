import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/employee`);
      if (!res.ok) throw new Error('Error al obtener empleados');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employee) => {
    try {
      const res = await fetch(`${API_URL}/api/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      if (!res.ok) throw new Error('Error al crear empleado');
      await fetchEmployees();
    } catch (err) {
      console.error('Error creating employee:', err);
    }
  };

  const updateEmployee = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/api/employee/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Error al actualizar empleado');
      await fetchEmployees();
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/employee/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar empleado');
      await fetchEmployees();
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
};
