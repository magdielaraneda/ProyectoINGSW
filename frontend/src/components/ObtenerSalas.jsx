import React, { useState, useEffect } from 'react';
import { obtenerSalas } from '../services/sala.service';
import { Link } from 'react-router-dom';

function ObtenerSalas() {
  const [salas, setSalas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const data = await obtenerSalas();
        setSalas(data);
      } catch (error) {
        setError('Error al obtener las salas.');
        console.error('Error al obtener las salas:', error);
      }
    };

    fetchSalas();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {salas.map((sala) => (
          <div key={sala._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold">{sala.nombreSa}</h2>
            <p>Aforo: {sala.aforo}</p>
            <p>Estado: {sala.estado}</p>
            <Link to={`/obtenerSalas/${sala.nombreSa}`} className="text-blue-500 mt-2 block">
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ObtenerSalas;
