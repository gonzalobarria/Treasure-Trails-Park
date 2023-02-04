/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        fondo01: "url('/images/fondo01.jpg')",
        park: "url('/images/park.jpg')",
      },
    },
  },
  plugins: [],
};
