import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerEdificios } from '../services/edificio.service';

const ObtenerEdificios = () => {
  const [edificios, setEdificios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEdificios = async () => {
      try {
        const data = await obtenerEdificios();
        console.log (data, "cualquier texto largo que se diferencie")
        setEdificios(data);
      } catch (error) {
        setError('Error al obtener los edificios.');
        console.error('Error al obtener los edificios:', error.message);
      }
    };

    fetchEdificios();
  }, []);

  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  console.log (edificios, " los mismo en edificios ")
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold my-8">Lista de Edificios</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {edificios.map((edificio) => (
          <div
            key={edificio._id}
            className="bg-white rounded-lg shadow-lg p-4 border border-gray-300"
          >
            <h3 className="text-xl font-semibold">{edificio.nombreEd}</h3>
            <p className="text-gray-700">Cantidad de Salas: {edificio.cantidadSalas}</p>
            <Link to={`/obtenerEdificios/${edificio.nombreEd}`} className="text-blue-500 mt-2 block">
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObtenerEdificios;
