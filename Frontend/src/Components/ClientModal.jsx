import { useState, useEffect } from 'react';

export default function ClientModal({ onClose, onSubmit, onDelete, client = null, themeColor }) {
  const isEdit = Boolean(client && client._id);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      alert('Todos los campos son requeridos');
      return;
    }

    onSubmit(form, client?._id);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && client?._id) {
      onDelete(client._id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-box ${themeColor}`} onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />

          <div className="modal-actions">
            {isEdit && (
              <button type="button" className="btn-cancel" onClick={handleDelete}>
                Eliminar
              </button>
            )}
            <button type="submit" className="btn-ok">
              {isEdit ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
