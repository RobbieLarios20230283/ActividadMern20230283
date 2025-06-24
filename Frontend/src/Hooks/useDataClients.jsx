
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/customers`);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (data, id) => {
  try {
    const res = await fetch(`${API_URL}/api/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error actualizando cliente');
    await fetchClients();
  } catch (err) {
    console.error('Error updating client:', err);
  }
};


  const createClient = async (client) => {
    try {
      await fetch(`${API_URL}/api/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      fetchClients();
    } catch (err) {
      console.error('Error creating client:', err);
    }
  };

  const deleteClient = async (id) => {
    try {
      await fetch(`${API_URL}/api/customers/${id}`, {
        method: 'DELETE',
      });
      fetchClients();
    } catch (err) {
      console.error('Error deleting client:', err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, loading, createClient, deleteClient, updateClient};
};
