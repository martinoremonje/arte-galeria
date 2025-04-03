/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Corrección importante
    "./node_modules/flowbite/**/*.js", // Mantenemos esta línea
  ],
  theme: {
    extend: {keyframes: {
      fadeInDelayed: {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '50%': { opacity: 0, transform: 'translateY(20px)' }, // Añade un punto intermedio para el delay
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
    animation: {
      'fade-in-delayed': 'fadeInDelayed 0.5s ease-in-out 0.3s forwards', // Nombre, duración, easing, delay, fill-mode
    },
  },
  },
  plugins: [require("flowbite/plugin")],
};