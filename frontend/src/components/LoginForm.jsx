import 'tailwindcss/tailwind.css';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function LoginForm() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <>
     <div className="min-h-screen bg-blue-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="mt-6 mb-4 text-3xl font-extrabold text-gray-900">Inicio de sesión</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="email"
                  name="email"
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El email es requerido",
                    },
                    pattern: {
                        value: "^[A-Za-z0-9]+@[A-Za-z0-9]+\\.[A-Za-z]+$",
                        message: "Email no válido",
                      },
                    })}
                />
                {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es requerida",
                    }
                    })}
                />
                {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
              </div>
            </div>
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-azul hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default LoginForm;
