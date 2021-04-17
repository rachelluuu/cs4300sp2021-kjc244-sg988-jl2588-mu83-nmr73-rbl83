const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'white': colors.white,
      'gray': colors.trueGray,
      'pink': colors.pink,
      'blueGray': colors.blueGray,
    },
    fontFamily: {
      'sans': ["Segoe UI", 'ui-sans-serif'],
      'customStack': ["Rubik", 'ui-sans-serif']
    },
    extend: {
      backgroundImage: theme => ({
        'hero-custom': "url('https://images.pexels.com/photos/3427774/pexels-photo-3427774.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
