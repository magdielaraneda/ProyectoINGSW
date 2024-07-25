/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors:{
        blanco:'#ECF0F1',
        azul:'#3498DB',
        rojo:'#E74C3C',
        negro:'#000000'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
}

