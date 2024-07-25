import { useState, useEffect } from 'react';
import { crearSala } from '../services/sala.service';
import { obtenerEdificios } from '../services/edificio.service';
import { showCrearSala, showErrorCrearSala } from '../helpers/swaHelper';

function SalaForm() {
  const [nombreSa, setNombreSa] = useState('');
  const [aforo, setAforo] = useState(0);
  const [estado, setEstado] = useState('habilitada');
  const [nombreEdificio, setNombreEdificio] = useState('');
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    const fetchEdificios = async () => {
      try {
        const data = await obtenerEdificios();
        setEdificios(data);
      } catch (error) {
        console.error('Error al obtener los edificios:', error);
      }
    };

    fetchEdificios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearSala({ nombreSa, aforo, estado, nombreEdificio });
      setNombreSa('');
      setAforo(0);
      setEstado('habilitada');
      setNombreEdificio('');
      showCrearSala();
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error('Error al crear la sala:', error);
      showErrorCrearSala();
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="nombreSa">
            Nombre de la Sala
          </label>
          <input
            type="text"
            id="nombreSa"
            value={nombreSa}
            onChange={(e) => setNombreSa(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="aforo">
            Aforo
          </label>
          <input
            type="number"
            id="aforo"
            value={aforo}
            onChange={(e) => setAforo(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="estado">
            Estado
          </label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="habilitada">Habilitada</option>
            <option value="deshabilitada">Deshabilitada</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="nombreEdificio">
            Nombre del Edificio
          </label>
          <select
            id="nombreEdificio"
            value={nombreEdificio}
            onChange={(e) => setNombreEdificio(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar Edificio</option>
            {edificios.map((edificio) => (
              <option key={edificio._id} value={edificio.nombreEd}>
                {edificio.nombreEd}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Crear Sala
          </button>
        </div>
      </form>
    </div>
  );
}

export default SalaForm;
