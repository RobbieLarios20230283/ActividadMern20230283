import { useState } from 'react';
import { useProducts } from '../Hooks/useDataProducts';
import ProductModal from '../Components/ProductModal';

export default function Crud3() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseModal = () => setSelectedProduct(null);

  const handleSubmit = (data, id) => {
    if (id) updateProduct(data, id);
    else createProduct(data);
  };

  return (
    <div className="content-box theme-2">
      <h2>Productos</h2>
      <button className="add-btn" onClick={() => setSelectedProduct({})}>+ Añadir Producto</button>
      {loading ? <p>Cargando...</p> : (
        products.map((prod) => (
          <div className="item-box" key={prod._id}>
            <span>{prod.name}</span>
            <div>
              <button className="see-more-btn" onClick={() => setSelectedProduct(prod)}>Ver más</button>
              <button className="see-more-btn" onClick={() => deleteProduct(prod._id)}>Eliminar</button>
            </div>
          </div>
        ))
      )}
      {selectedProduct && (
        <ProductModal
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          onDelete={deleteProduct}
          product={selectedProduct}
          themeColor="theme-2"
        />
      )}
    </div>
  );
}
