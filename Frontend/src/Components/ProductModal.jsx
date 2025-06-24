import { useState, useEffect } from 'react';

export default function ProductModal({ onClose, onSubmit, onDelete, product = null, themeColor }) {
  const isEdit = Boolean(product && product._id);

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.price || !form.description.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    onSubmit(form, product?._id);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && product?._id) {
      onDelete(product._id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-box ${themeColor}`} onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            placeholder="Precio"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            required
          />
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
