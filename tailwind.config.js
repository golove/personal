const colors = require('tailwindcss/colors')
module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      white:'#fff',
      bluegray: '#0D485A',
      blue: colors.sky,
      maintextcolor:'#03A9CD',//#03A9CD'
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      yahei:['微软雅黑'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundImage: theme => ({
        'beauty': "url('/src/assets/img/my.jpg')"
   
       }),
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  variants: {
    extend: {
      justifyContent:['hover','focus'],
    },
  },
  plugins: [],
}
