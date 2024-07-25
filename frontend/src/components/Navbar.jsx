import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import 'tailwindcss/tailwind.css';
import { logout } from '../services/auth.service';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate,Link } from 'react-router-dom';

export default function Navbar() {

  const { user } = useAuth();
  const [navigation, setNavigation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(user&&user.roles && user.roles.length > 0){
      switch(user?.roles[0].name){
        case 'admin': 
        setNavigation(navAdmin);
        break;

        case'coordinador': 
        setNavigation(navCoordinador);
        break;
        default:
          setNavigation(null);
      }
    }else{
      setNavigation(null);
    }
  }, [user, user?.roles]);
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navCoordinador = [
    { name: 'Ver todas las reservas', href: 'listarReservas', current: false },
    { name: 'Crear un Reserva', href: 'crearReserva', current: false },
    { name: 'Crear una Sala', href: 'crearSala', current: false },
    { name: 'Mostrar todas las Salas', href: 'obtenerSalas', current: false },
    { name: 'Mostrar Edificios', href: 'obtenerEdificios', current: false },
  ]
  
  const navAdmin = [
    { name: 'Crear Edificio', href: 'CrearEdificio', current: false },
  ]
  
 

  
  return (
    <>
    <Disclosure as="nav" className="bg-blue-900">
      {({ open }) => (
        <>
          <div className="flex- justify-end me-8">
            <div className="ms-6 relative flex h-16 items-center">
              
            <a href="/" className="cursor-pointer ml-auto">
            <svg  id='home-image' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" className="text-white"/>
            </svg>
            </a>

              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-blanco hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                <div className="flex flex-shrink-0 ">
                  
                </div>
                <div className="hidden sm:ml-6 sm:block ">
                  
                  <div className="flex space-x-2">
                    {navigation && navigation.map((item) => (
                      <a
                        id={item.id}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-blanco text-black' : ' text-white hover:text-black',
                          'rounded-md px-4 py-2 text-sm font-medium '
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <img
                        id='profile-image'
                        className="h-8 w-8 rounded-full"
                        src="../../images/Escudo.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            id='profile-link'
                            href="#"
                            className={classNames(active ? 'bg-blanco' : '', 'block px-4 py-2 text-sm text-black')}
                          >
                            Perfil
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-blanco' : '', 'block px-4 py-2 text-sm text-black')}
                            onClick={(handleLogout)}
                          >
                            Cerrar sesión
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation && navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
      
    </Disclosure>
      </>
  )
}