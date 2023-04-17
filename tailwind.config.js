/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', 'sans-serif']
      },
      colors: {
        "main": "#FFFFFF",
        "secondary-main": "#FAFAFA",
        "main-dark": "#1E2C5A",
        "secondary-dark": "#2C5790",
        "dark-hover": "#313E67"
      },
    },

  },
  plugins: [],
}