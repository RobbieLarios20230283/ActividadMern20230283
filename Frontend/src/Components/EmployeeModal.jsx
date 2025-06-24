import { useState, useEffect } from 'react';

export default function EmployeeModal({
  onClose,
  onSubmit,
  onDelete,
  employee = null,
  themeColor,
}) {
  const isEditMode = Boolean(employee && employee._id);

  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    telephone: '',
    birthday: '',
    dui: '',
    password: '',
    issnumber: '',
    hireDate: '',
  });

  useEffect(() => {
    if (isEditMode) {
      setForm({
        name: employee.name || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        telephone: employee.telephone || '',
        birthday: employee.birthday?.split('T')[0] || '',
        dui: employee.dui || '',
        password: '',
        issnumber: employee.issnumber || '',
        hireDate: employee.hireDate?.split('T')[0] || '',
      });
    }
  }, [employee, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'telephone') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 8) setForm((prev) => ({ ...prev, telephone: digits }));
      return;
    }

    if (name === 'dui') {
      const digits = value.replace(/\D/g, '');
      let formatted = digits.slice(0, 8);
      if (digits.length > 8) formatted += '-' + digits[8];
      if (formatted.length <= 10) setForm((prev) => ({ ...prev, dui: formatted }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.lastName.trim()) {
      alert('Nombre y Apellido son requeridos');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert('Correo inválido');
      return;
    }

    if (!/^\d{8}-\d$/.test(form.dui)) {
      alert('DUI inválido (formato: 12345678-9)');
      return;
    }

    if (!form.birthday || new Date(form.birthday).getFullYear() < 1970) {
      alert('La fecha de nacimiento debe ser desde 1970 en adelante');
      return;
    }

    if (!form.hireDate || new Date(form.hireDate).getFullYear() < 1970) {
      alert('La fecha de contratación debe ser desde 1970 en adelante');
      return;
    }

    onSubmit(form, employee?._id);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && employee?._id) {
      onDelete(employee._id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-box ${themeColor}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{isEditMode ? 'Detalles del Empleado' : 'Nuevo Empleado'}</h2>
        <div className="modal-icon">👤</div>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Nombre" type="text" value={form.name} onChange={handleChange} required />
          <input name="lastName" placeholder="Apellido" type="text" value={form.lastName} onChange={handleChange} required />
          <input name="email" placeholder="Correo" type="email" value={form.email} onChange={handleChange} required />
          <input name="telephone" placeholder="Teléfono (8 dígitos)" type="text" value={form.telephone} onChange={handleChange} required />
          <input name="dui" placeholder="DUI (12345678-9)" type="text" value={form.dui} onChange={handleChange} required />
          <input name="password" placeholder={isEditMode ? 'Nueva Contraseña (opcional)' : 'Contraseña'} type="password" value={form.password} onChange={handleChange} required={!isEditMode} />
          <input name="issnumber" placeholder="Número de ISS" type="text" value={form.issnumber} onChange={handleChange} required />
          <input name="birthday" type="date" value={form.birthday} onChange={handleChange} min="1970-01-01" required />
          <input name="hireDate" type="date" value={form.hireDate} onChange={handleChange} min="1970-01-01" required />

          <div className="modal-actions">
            {isEditMode && (
              <button type="button" className="btn-cancel" onClick={handleDelete}>
                Eliminar
              </button>
            )}
            <button type="submit" className="btn-ok">
              {isEditMode ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
