import { useState, useEffect } from 'react';
import { crearReserva } from '../services/reserva.service';
import { obtenerSalas } from '../services/sala.service';
import { obtenerEdificios } from '../services/edificio.service';
import { showCrearReserva, showErrorCrearReserva } from '../helpers/swaHelper';

function CrearReserva() {
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [edificio, setEdificio] = useState('');
  const [sala, setSala] = useState('');
  const [docenteNombre, setDocenteNombre] = useState('');
  const [docenteCorreo, setDocenteCorreo] = useState('');
  const [edificios, setEdificios] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const fetchEdificios = async () => {
      try {
        const data = await obtenerEdificios();
        setEdificios(data);
      } catch (error) {
        console.error('Error al obtener los edificios:', error);
      }
    };

    const fetchSalas = async () => {
      try {
        const data = await obtenerSalas();
        setSalas(data);
      } catch (error) {
        console.error('Error al obtener las salas:', error);
      }
    };

    fetchEdificios();
    fetchSalas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearReserva({ fecha, horaInicio, horaFin, edificio, sala, docenteNombre, docenteCorreo });
      setFecha('');
      setHoraInicio('');
      setHoraFin('');
      setEdificio('');
      setSala('');
      setDocenteNombre('');
      setDocenteCorreo('');
      console.log('Creación de reserva exitosa - Estado 200');
      showCrearReserva();
     
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error('Error al crear la reserva:', error);
      showErrorCrearReserva();

    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="fecha">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="horaInicio">
            Hora de inicio
          </label>
          <input
            type="time"
            id="horaInicio"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="horaFin">
            Hora de fin
          </label>
          <input
            type="time"
            id="horaFin"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="edificio">
            Edificio
          </label>
          <select
            id="edificio"
            value={edificio}
            onChange={(e) => setEdificio(e.target.value)}
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="sala">
            Sala
          </label>
          <select
            id="sala"
            value={sala}
            onChange={(e) => setSala(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar Sala</option>
            {salas.map((sala) => (
              <option key={sala._id} value={sala.nombreSa}>
                {sala.nombreSa}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="docenteNombre">
            Nombre del Docente
          </label>
          <input
            type="text"
            id="docenteNombre"
            value={docenteNombre}
            onChange={(e) => setDocenteNombre(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="docenteCorreo">
            Correo Electrónico del Docente
          </label>
          <input
            type="email"
            id="docenteCorreo"
            value={docenteCorreo}
            onChange={(e) => setDocenteCorreo(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Se requiere un correo de la Universidad del Bío-Bío (@alumnos.ubiobio.cl).</p>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Crear Reserva
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearReserva;
