const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'logo': ['Delius Swash Caps']
      },
      colors: {
        finmidyellow: {
          DEFAULT: '#ffde00',
        },
        finmidpurple: {
          light: '#7b74ff',
          DEFAULT: '#615aff',
          dark: '#4841e6',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
