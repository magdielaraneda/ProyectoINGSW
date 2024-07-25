import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eliminarSalaPorNombre, obtenerSalaPorNombre } from '../services/sala.service';
import { showEliminarSala } from '../helpers/swaHelper';

function ObtenerSalaPorNombre() {
  const { nombreSala } = useParams();
  const [sala, setSala] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSala = async () => {
      try {
        const data = await obtenerSalaPorNombre(nombreSala);
        setSala(data);
      } catch (error) {
        setError('Error al obtener la sala.');
        console.error('Error al obtener la sala:', error);
      }
    };

    if (nombreSala) {
      fetchSala();
    }
  }, [nombreSala]);

  const handleEliminarSala = async () => {
    try {
      await eliminarSalaPorNombre(nombreSala);
      showEliminarSala();
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar la sala:', error);
      alert('Error al eliminar la sala');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!sala) {
    return null; // Aquí podrías mostrar un indicador de carga si lo deseas
  }

  return (
    <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg mx-auto my-8">
      <div className="px-4 py-4 mx-auto text-center">
        <h2 className="text-xl font-bold">Información de la Sala</h2>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="nombreSala">
            Nombre de la Sala
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            disabled
            id="nombreSala"
            value={sala.nombreSa}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="aforo">
            Aforo
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            disabled
            id="aforo"
            value={sala.aforo}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="estado">
            Estado
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            disabled
            id="estado"
            value={sala.estado}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="estado">
            Edificio
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            disabled
            id="estado"
            value={sala.edificio.nombreEd}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={handleEliminarSala}
          >
            Eliminar Sala
          </button>
        </div>
      </div>
    </div>
  );
}

export default ObtenerSalaPorNombre;
