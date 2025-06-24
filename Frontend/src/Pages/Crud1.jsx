import { useState } from 'react';
import EmployeeModal from '../Components/EmployeeModal.jsx';
import { useEmployees } from '../Hooks/useDataEmployees.jsx';

export default function Crud1() {
  const {
    employees,
    loading,
    deleteEmployee,
    createEmployee,
    updateEmployee,
  } = useEmployees();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleOpenCreate = () => setShowCreateModal(true);
  const handleCloseCreate = () => setShowCreateModal(false);

  const handleViewDetails = (employee) => setSelectedEmployee(employee);
  const handleCloseDetails = () => setSelectedEmployee(null);

  const handleUpdate = (id, updatedData) => {
    updateEmployee(id, updatedData);
    handleCloseDetails();
  };

  const handleDelete = (id) => {
    deleteEmployee(id);
    handleCloseDetails();
  };

  return (
    <div className="content-box">
      <h2>Empleados</h2>

      <div className="search-box">
       
        <button className="add-btn" onClick={handleOpenCreate}>
          + Añadir empleado
        </button>
      </div>

      {loading ? (
        <p>Cargando empleados...</p>
      ) : employees.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        employees.map((emp) => (
          <div className="item-box" key={emp._id}>
            <span>{emp.name}</span>
            <div>
              <button className="see-more-btn" onClick={() => handleViewDetails(emp)}>
                Ver más
              </button>
            </div>
          </div>
        ))
      )}

      {showCreateModal && (
        <EmployeeModal
          onClose={handleCloseCreate}
          onSubmit={createEmployee}
          themeColor="theme-0"
        />
      )}

      {selectedEmployee && (
        <EmployeeModal
          onClose={handleCloseDetails}
          onSubmit={(data) => handleUpdate(selectedEmployee._id, data)}
          onDelete={() => handleDelete(selectedEmployee._id)}
          employee={selectedEmployee}
          themeColor="theme-1"
        />
      )}
    </div>
  );
}
