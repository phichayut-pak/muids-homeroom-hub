/** @type {import('tailwindcss').Config} */


module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
      keyframes: {
        'like-heart-animation': {
          '0%': { opacity: '0', transform: 'scale(0)', '-webkit-transform': 'scale(0)'},
          '15%': { opacity: '0.9', transform: 'scale(1.2)', '-webkit-transform': 'scale(1.2)'},
          '30%': { opacity: '0.9', transform: 'scale(0.95)', '-webkit-transform': 'scale(0.95)'},
          '45%, 80%': { opacity: '0.9', transform: 'scale(1)', '-webkit-transform': 'scale(1)'},
          '100%': { opacity: '0', transform: 'scale(0)', '-webkit-transform': 'scale(0)'}
        },
        'like-button-animation': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '15%': { opacity: '0.9', transform: 'scale(1.2)'},
          '30%': { transform: 'scale(0.95)'},
          '45%, 80%': { opacity: '0.9', transform: 'scale(1)'}
        },
      },
      animation: {
        'like-heart-animation': 'like-heart-animation 1s ease-in-out forwards alternate',
        'like-button-animation': 'like-button-animation 1s ease-in-out'
      }
    },

  },
  plugins: [],
  mode: 'jit',
}