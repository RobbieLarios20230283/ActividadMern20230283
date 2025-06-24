import { useState } from 'react';
import { useClients } from '../Hooks/useDataClients';
import ClientModal from '../Components/ClientModal';

export default function Crud2() {
  const { clients, loading, createClient, updateClient, deleteClient } = useClients();
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCloseModal = () => setSelectedClient(null);

  const handleSubmit = (data, id) => {
    if (id) updateClient(data, id);
    else createClient(data);
  };

  return (
    <div className="content-box theme-1">
      <h2>Clientes</h2>
      <button className="add-btn" onClick={() => setSelectedClient({})}>+ Añadir Cliente</button>
      {loading ? <p>Cargando...</p> : (
        clients.map((cli) => (
          <div className="item-box" key={cli._id}>
            <span>{cli.name}</span>
            <div>
              <button className="see-more-btn" onClick={() => setSelectedClient(cli)}>Ver más</button>
              <button className="see-more-btn" onClick={() => deleteClient(cli._id)}>Eliminar</button>
            </div>
          </div>
        ))
      )}
      {selectedClient && (
        <ClientModal
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          onDelete={deleteClient}
          client={selectedClient}
          themeColor="theme-1"
        />
      )}
    </div>
  );
}
