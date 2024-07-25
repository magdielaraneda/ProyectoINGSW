import { useState } from 'react';
import { crearEdificio } from '../services/edificio.service';
import { showCrearEdificio } from '../helpers/swaHelper';

export default function EdificioForm() {
  const [nombreEd, setNombreEd] = useState('');
  const [cantidadSalas, setCantidadSalas] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await crearEdificio({ nombreEd, cantidadSalas: parseInt(cantidadSalas) });
      setNombreEd('');
      setCantidadSalas('');
      showCrearEdificio();
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      setError('Error al crear el edificio.');
      console.error('Error al crear el edificio:', error);
      showCrearEdificio();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-md shadow-lg">
      <h2 className="text-xl font-bold mb-4">Crear Edificio</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="nombreEd">
            Nombre del Edificio
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            id="nombreEd"
            type="text"
            value={nombreEd}
            onChange={(e) => setNombreEd(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="cantidadSalas">
            Cantidad de Salas
          </label>
          <input
            className="block w-full p-2 border border-gray-300 rounded-md"
            id="cantidadSalas"
            type="number"
            value={cantidadSalas}
            onChange={(e) => setCantidadSalas(e.target.value)}
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Crear Edificio
          </button>
        </div>
      </form>
    </div>
  );
}
