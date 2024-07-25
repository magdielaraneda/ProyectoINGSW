import 'tailwindcss/tailwind.css';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const [navigation, setNavigation] = useState(null);

  useEffect(() => {
    if (user && user.roles && user.roles.length > 0) {
      switch (user?.roles[0].name) {
        case 'admin':
          setNavigation(calloutsAdmin);
          break;

        case 'coordinador':
          setNavigation(calloutsCoordinador);
          break;

        default:
          setNavigation(null);
      }
    } else {
      setNavigation(null);
    }
  }, [user, user?.roles]);

  const calloutsCoordinador = [
    {
      id: 'image-reservas',
      name: 'Reservas',
      description: 'Apartado para crear Reservas',
      imageSrc: '../../images/ReservaN.png',
      imageAlt: 'Imagen de gestión de reservas',
      href: '/crearReserva',
    },
    {
      id: 'image-salas',
      name: 'Salas',
      description: 'Apartado para crear Salas',
      imageSrc: '../../images/SalaN.png',
      imageAlt: 'Imagen de gestión de salas',
      href: '/crearSala',
    },
    {
      id: 'image-edificios',
      name: 'Edificios',
      description: 'Apartado ver los Edificios',
      imageSrc: '../../images/EdificioN.png',
      imageAlt: 'Imagen de gestión de edificios',
      href: '/obtenerEdificios',
    },
  ];

  const calloutsAdmin = [
    {
      id: 'image-create-edificio',
      name: 'Edificios',
      description: 'Apartado que Gestiona Edificios.',
      imageSrc: '../../images/EdificioN.png',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: 'CrearEdificio',
    },
  ];

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Página principal</h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {navigation &&
              navigation.map((callout) => (
                <div key={callout.name} className="group relative flex flex-col items-center">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-80 w-full object-cover object-center"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a id={callout.id} href={callout.href} className="text-center">
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900 text-center">{callout.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
