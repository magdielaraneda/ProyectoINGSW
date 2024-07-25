import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eliminarEdificioPorNombre, obtenerEdificioPorNombre } from '../services/edificio.service';
import { showEliminarEdificio } from '../helpers/swaHelper';

function ObtenerEdificioPorNombre() {
  const { nombreEdificio } = useParams();
  const [edificio, setEdificio] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEdificio = async () => {
      try {
        const data = await obtenerEdificioPorNombre(nombreEdificio);
        console.log(data)
        setEdificio(data);
      } catch (error) {
        setError('Error al obtener el edificio.');
        console.error('Error al obtener el edificio:', error);
      }
    };

    if (nombreEdificio) {
      fetchEdificio();
    }
  }, [nombreEdificio]);

  const handleEliminarEdificio = async () => {
    try {
      await eliminarEdificioPorNombre(nombreEdificio);
      showEliminarEdificio ();
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar el edificio:', error);
      alert('Error al eliminar el edificio');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!edificio) {
    return null; 
  }

  return (
    <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg mx-auto my-8">
      <div className="px-4 py-4 mx-auto text-center">
        <h2 className="text-xl font-bold">Información del Edificio</h2>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="nombreEdificio">
            Nombre del Edificio
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            disabled
            id="nombreEdificio"
            value={edificio.nombreEd}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="cantidadSalas">
            Cantidad de Salas
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            disabled
            id="cantidadSalas"
            value={edificio.cantidadSalas}
          />
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={handleEliminarEdificio}
          >
            Eliminar Edificio
          </button>
        </div>
      </div>
    </div>
  );
}

export default ObtenerEdificioPorNombre;
